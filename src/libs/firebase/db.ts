import { loadFirebase } from "libs/firebase";
import { Diary, AuthState, Profile } from "interfaces/index";
import { getDaysInMonth } from "date-fns";
import { getDiaryId, sortByDiaryData } from "libs/diaries";
import { setDiaryInLitener } from "context/slices/diary";
import { Dispatch } from "@reduxjs/toolkit";

const { firebase } = loadFirebase();
const db = firebase.firestore();

type GetProp = {
	userId: string;
	diaryId: string;
	firestore?: any;
};
export const getDiary = async ({ userId, diaryId }: GetProp) => {
	const doc = await db
		.collection("database")
		.doc("version1.0")
		.collection("diaries")
		.doc(userId)
		.get();
	if (!doc.exists) return null
	const data = doc.data()
	if (!data) return null
	const diary = data[diaryId] as Diary | null
	return diary;
};

type ListenProp = {
	userId: string;
	diaryId: string;
	dispatch: Dispatch<any>;
};
export const useDiaryListener = ({ userId, diaryId, dispatch }: ListenProp) => {
	const docRef = db
		.collection("database")
		.doc("version1.0")
		.collection("diaries")
		.doc(userId)
	const unsubscribe = docRef.onSnapshot((docSnapshot: any) => {
		const data = docSnapshot.data()
		if (!data) return
		const diary = data[diaryId] as Diary | null
		if (!diary) return
		dispatch(setDiaryInLitener(diary))
	}, (error) => {
		console.log(`Encountered error: ${error}`);
	})
	return unsubscribe;
};

type GetOldestProp = {
	userId: string;
	firestore?: any;
};
export const getOldestDiary = async ({ userId }: GetOldestProp) => {
	const doc = await db
		.collection("database")
		.doc("version1.0")
		.collection("diaries")
		.doc(userId)
		.get();
	if (!doc.exists) return null
	const diariesObj = doc.data()
	if (!diariesObj) return
	const diaries = Object.values(diariesObj).map(diary => {
		return diary as Diary
	})
	const sortedDiaries = await sortByDiaryData(diaries)
	return sortedDiaries[sortedDiaries.length - 1];
};
type getNumProp = {
	userId: string;
	howMany: number;
};
export const getDiaries = async ({ userId, howMany }: getNumProp) => {
	const doc = await db
		.collection("database")
		.doc("version1.0")
		.collection("diaries")
		.doc(userId)
		.get();
	if (!doc.exists) return []
	const diariesObj = doc.data()
	if (!diariesObj) return []
	const diaries = Object.values(diariesObj).map(diary => {
		return diary as Diary
	})
	const sortedDiaries = await sortByDiaryData(diaries)
	const slicedDiaries = sortedDiaries.slice(0, howMany)
	return slicedDiaries;
};


type getMoreNumProp = {
	userId: string;
	howMany: number;
	lastDate: number;
};
export const getMoreDiaries = async ({
	userId,
	howMany,
	lastDate,
}: getMoreNumProp) => {
	const doc = await db
		.collection("database")
		.doc("version1.0")
		.collection("diaries")
		.doc(userId)
		.get();
	if (!doc.exists) return []
	const diariesObj = doc.data()
	if (!diariesObj) return []
	const diaries = Object.values(diariesObj).map(diary => {
		return diary as Diary
	})
	const sortedDiaries = await sortByDiaryData(diaries)
	const lastIndex = sortedDiaries.findIndex(diary => diary.date.seconds === lastDate)

	if (lastIndex < 0) return []
	const slicedDiaries = sortedDiaries.slice(lastIndex + 1, howMany)
	return slicedDiaries;
};

type GetMonthProp = {
	userId: string;
	year: number;
	month: number;
};
export const getDiariesByMonth = async ({
	userId,
	year,
	month,
}: GetMonthProp) => {
	const start = new Date(year, month - 1, 1);
	const startSeconds = start.getTime() / 1000;
	const maxDay = getDaysInMonth(start);
	const end = new Date(year, month - 1, maxDay);
	const endSeconds = end.getTime() / 1000;

	const doc = await db
		.collection("database")
		.doc("version1.0")
		.collection("diaries")
		.doc(userId)
		.get();
	if (!doc.exists) return []
	const diariesObj = doc.data()
	if (!diariesObj) return []
	const diaries = Object.values(diariesObj).map(diary => {
		return diary as Diary
	})
	const sortedDiaries = await sortByDiaryData(diaries)
	const betweenDiaries = sortedDiaries.filter(diary => {
		const sec = diary.date.seconds
		return startSeconds <= sec && sec <= endSeconds
	})
	return betweenDiaries;
};

type SetProp = {
	userId: string;
	diaryId: string;
	diary: Diary;
};
export const setDiary = async ({
	userId,
	diaryId,
	diary,
}: SetProp) => {
	if (!userId || !diaryId) throw new Error("can't setDiary with no userId and DiaryId");
	if (diaryId !== await getDiaryId(diary))
		throw new Error("can't setDiary with unmatch diary.date => dairy" + diary + "/diaryId :" + diaryId);
	const docRef = await db
		.collection("database")
		.doc("version1.0")
		.collection("diaries")
		.doc(userId)
	const doc = await docRef.get()
	if (!doc.exists) {
		return docRef.set({ [diaryId]: diary })
	} else {
		return docRef.update({ [diaryId]: diary });
	}
};

type SetsProp = {
	userId: string;
	diaries: Diary[];
};
export const setDiaries = async ({ userId, diaries }: SetsProp) => {
	if (!userId || !diaries.length) throw new Error("can't setDiaries with no userId and Diary");
	const docRef = await db
		.collection("database")
		.doc("version1.0")
		.collection("diaries")
		.doc(userId)
	const doc = await docRef.get()
	if (!doc.exists) {
		const diariesObj = {} as { [k: string]: Diary }
		diaries.forEach(diary => {
			const diaryId = getDiaryId(diary)
			diariesObj[diaryId] = diary
		})
		return docRef.set(diariesObj)
	}
};

type deleteProp = {
	userId: string;
	diaryId: string;
	firestore?: any;
};
export const deleteDiary = async ({
	userId,
	diaryId,
	firestore = db,
}: deleteProp) => {
	try {
		const docRef = await firestore
			.collection("database")
			.doc("version1.0")
			.collection("diaries")
			.doc(userId)
		const doc = await docRef.get();
		if (!doc.exists) return "there is no such a document"
		const diariesObj = doc.data()
		if (!diariesObj) return "there is no diary Object"
		delete diariesObj[diaryId]
		await docRef.set(diariesObj)
		return "successfully deleted";
	} catch (error) {
		return "couldn't delete " + error;
	}
};

export const getUserProfile = async (
	userId: string
): Promise<Profile | null> => {
	const doc = await db.collection("database")
		.doc("version1.0")
		.collection("users").doc(userId).get();
	const data = doc.data();
	if (!data) return null
	data.createdAt = new Date(data.createdAt.seconds * 1000).toISOString()
	const profile = data as Profile
	return profile;
};

type NewProfile = {
	name: string,
	createdAt: Date | string,
	isFirstLogin: boolean
}
export const setNewProfile = async (authState: AuthState, doneDemo: boolean) => {
	const now = new Date() as Date
	const newProfile: NewProfile = {
		name: authState.user.name || authState.user.email || "no name",
		createdAt: now,
		isFirstLogin: !doneDemo
	};
	db.collection("database")
		.doc("version1.0")
		.collection("users").doc(authState.user.uid).set(newProfile);
	newProfile.createdAt = now.toISOString()
	const profile = newProfile as Profile
	return profile;
};

export const setIsFirstLoginFalse = async (userId: string) => {
	await db
		.collection("database")
		.doc("version1.0")
		.collection("users")
		.doc(userId)
		.update({
			isFirstLogin: false
		});
}

export const deleteAccountInfo = async (userId: string) => {
	await db.collection("database").doc("version1.0").collection("users").doc(userId).delete()
	await db.collection("database").doc("version1.0").collection("diaries").doc(userId).delete()
}





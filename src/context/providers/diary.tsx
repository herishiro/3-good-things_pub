import React, { useEffect } from "react";
import { useBeforeunload } from "react-beforeunload";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectStatus, selectUid } from "context/slices/user";
import {
	fetchDiary,
	initDiaryState,
	selectDiary,
	setDiaryToDB,
	syncUpdateEventsStatus,
} from "context/slices/diary";
import { pushUpdatedDiary } from "context/slices/diaries";
import {
	setCurrentTurialStatus,
	selectInputDrawerStatus,
	selectIsInputDrawerOpened,
	selectToYeasterday,
	setTutorialStatus,
	setToYesterday,
} from "context/slices/ui";
import { Diary } from "interfaces";
import { useDiaryListener } from "libs/firebase/db";
import { format } from "date-fns";

// provider
export const DiaryProvider = ({ children }: { children: JSX.Element }) => {
	const { query, pathname, push } = useRouter();
	const dispatch = useDispatch();
	const diary = useSelector(selectDiary);
	let diaryId: string;
	if (pathname === "/input/[...date]") {
		const { date } = query as { date: string[] };
		diaryId = date.join("-");
	}
	const userId = useSelector(selectUid);
	const userStatus = useSelector(selectStatus);
	const status = useSelector(selectInputDrawerStatus);
	const isInputDrawerOpened = useSelector(selectIsInputDrawerOpened);
	const toYeasterday = useSelector(selectToYeasterday);
	const inDemo = pathname.includes("/demo/");

	// useEffect return内からstateを参照するため
	const DiaryRef = React.useRef(diary);
	DiaryRef.current = diary;
	useEffect(() => {
		if (userStatus !== "succeeded" || inDemo) return;
		if (pathname !== "/input/[...date]") {
			dispatch(initDiaryState());
		}
		//ページ移動時更新 other or another input -> this input
		if (!diaryId || !userId) return;
		const year = Number(diaryId.split("-")[0]);
		const today = format(new Date(), "yyyy/MM/dd");

		if (year < 1900 && !inDemo) push(`/input/${today}`);
		dispatch(fetchDiary({ userId, diaryId }));
		const unsubscribe = useDiaryListener({ userId, diaryId, dispatch });

		return () => {
			// ページ移動時保存 this input -> other or another input
			if (unsubscribe) unsubscribe();
			if (!DiaryRef.current) return;
			dispatch(setDiaryToDB({ diaryId, userId }));
			dispatch(pushUpdatedDiary({ updatedDiary: DiaryRef.current }));
		};
	}, [userStatus, query]);
	// ページリロード時保存
	useBeforeunload(() => {
		if (!diaryId || !userId) return;
		dispatch(setDiaryToDB({ diaryId, userId }));
	});

	React.useEffect(() => {
		if (status === "close") {
			if (!diaryId || !userId) return;
			dispatch(setDiaryToDB({ diaryId, userId }));
		}
	}, [status]);

	// diary取得時にチュートリアルの情報を判断
	const prevRef = React.useRef<Diary | null>(null);
	React.useEffect(() => {
		if (pathname === "/") return;
		if (!prevRef.current && diary) {
			if (toYeasterday) {
				dispatch(setTutorialStatus("firstClick"));
				dispatch(setToYesterday(false));
			} else {
				dispatch(setCurrentTurialStatus(undefined));
				prevRef.current = null;
			}
		}
		prevRef.current = diary;
	}, [diary]);
	React.useEffect(() => {
		if (pathname === "/") return;
		if (toYeasterday) {
			dispatch(setTutorialStatus("firstClick"));
			dispatch(setToYesterday(false));
		} else {
			dispatch(setCurrentTurialStatus(undefined));
		}
	}, [query]);

	// inputDrawerに入力ない時にボタンをdisableにする
	React.useEffect(() => {
		if (isInputDrawerOpened || !diary) return;
		dispatch(syncUpdateEventsStatus());
	}, [isInputDrawerOpened]);
	return <>{children}</>;
};

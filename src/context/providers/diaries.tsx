import React, { useEffect } from "react";
import { flattenToDiaries } from "libs/diaries";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchDiaries,
	fetchMoreDiaries,
	fetchOldestDiary,
	selectDiariesState,
	syncUpdatedDiaries,
} from "context/slices/diaries";
import { selectStatus, selectUid } from "context/slices/user";
import { useRouter } from "next/router";

// provider
export const DiariesProvider = ({ children }: { children: JSX.Element }) => {
	const dispatch = useDispatch();
	const { pathname, query } = useRouter();
	const userId = useSelector(selectUid);
	const diariesState = useSelector(selectDiariesState);
	const userStatus = useSelector(selectStatus);

	// other -> log 移動時にDiariesState状態更新
	useEffect(() => {
		if (!userId || pathname !== "/log") return;
		dispatch(fetchOldestDiary({ userId }));
		if (!diariesState.dividedDiariesByMonth.length) {
			dispatch(fetchDiaries({ userId, howMany: 10 }));
		}
		if (diariesState.initialDiaries.length) {
			dispatch(syncUpdatedDiaries());
		}
	}, [userStatus, query]);

	// DiariesStateの状態更新後、削除された数の日記を補填
	useEffect(() => {
		if (pathname !== "/log") return;
		const afterSyncUpdatedDiaries =
			!diariesState.updatedDiaries.length &&
			diariesState.dividedDiariesByMonth.length;
		if (afterSyncUpdatedDiaries) {
			const flattenedDiaries = flattenToDiaries(
				diariesState.dividedDiariesByMonth
			);
			const deletedCount =
				diariesState.initialDiaries.length - flattenedDiaries.length;
			if (deletedCount > 0 && userId) {
				dispatch(fetchMoreDiaries({ howMany: deletedCount, userId }));
			}
		}
	}, [diariesState.updatedDiaries]);
	return <>{children}</>;
};

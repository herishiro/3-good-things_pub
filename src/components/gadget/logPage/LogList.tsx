import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "components/elements/List";
import MonthList from "components/modules/logPage/logList/MonthList";
import MonthHeader from "components/modules/logPage/logList/MonthHeader";
import NoLogDisplay from "components/modules/logPage/logList/NoLogDisplay";
import { Diary } from "interfaces";
import { flattenToDiaries, getDiaryDateObj } from "libs/diaries";
import {
	fetchMoreDiaries,
	setHasMore,
	selectHasMore,
	selectDevidedDiaries,
	selectSelectedPeriod,
	selectInitialDiaries,
	selectDiariesStatus,
} from "context/slices/diaries";
import { useDispatch, useSelector } from "react-redux";
import { selectUid } from "context/slices/user";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		moreLoader: {
			color: theme.palette.secondary.main,
		},
		initialLoader: {
			display: "flex",
			justifyContent: "center",
			marginTop: 20,
		},
	})
);

export default function LogListWrapper() {
	const classes = useStyles();
	const userId = useSelector(selectUid);
	const dividedDiariesByMonth = useSelector(selectDevidedDiaries);
	const selectedPeriod = useSelector(selectSelectedPeriod);
	const initialDiaries = useSelector(selectInitialDiaries);
	const status = useSelector(selectDiariesStatus);
	const [year, month] = selectedPeriod.split("/");
	const { pathname } = useRouter();

	const hasMore = useSelector(selectHasMore);
	const dispatch = useDispatch();

	useEffect(() => {
		if (pathname.includes("/demo/")) return;
		dispatch(setHasMore(true));
	}, [selectedPeriod]);

	const onLoadMore = () => {
		const diaries = flattenToDiaries(dividedDiariesByMonth);
		if (diaries.length < initialDiaries.length) return;
		if (!userId) return;
		dispatch(fetchMoreDiaries({ userId, howMany: 5 }));
	};
	const hasNolog = !dividedDiariesByMonth.length && status === "succeeded";
	return (
		<>
			{status === "loading" ? (
				<div className={classes.initialLoader}>
					<CircularProgress color="secondary" />
				</div>
			) : hasNolog ? (
				<div>
					<MonthHeader year={year} month={month} />
					<NoLogDisplay />
				</div>
			) : selectedPeriod === "all" ? (
				<InfiniteScroll
					pageStart={0}
					loadMore={onLoadMore}
					hasMore={hasMore}
					loader={
						<div className={classes.moreLoader} key={0}>
							Loading ...
						</div>
					}
				>
					<LogList dividedDiariesByMonth={dividedDiariesByMonth} />
				</InfiniteScroll>
			) : (
				<LogList dividedDiariesByMonth={dividedDiariesByMonth} />
			)}
		</>
	);
}

type Prop3 = {
	dividedDiariesByMonth: Diary[][];
};
const LogList = ({ dividedDiariesByMonth }: Prop3) => {
	return (
		<>
			<List>
				{dividedDiariesByMonth.map((diariesInMonth) => (
					<div key={`logItem-${diariesInMonth[0].date.seconds}`}>
						<LogItem diariesInMonth={diariesInMonth} />
					</div>
				))}
			</List>
		</>
	);
};
const LogItem = ({ diariesInMonth }: { diariesInMonth: Diary[] }) => {
	const { year, month } = getDiaryDateObj(diariesInMonth[0]).str;
	return (
		<>
			<MonthHeader year={year} month={month} />
			<MonthList diariesInMonth={diariesInMonth} />
		</>
	);
};

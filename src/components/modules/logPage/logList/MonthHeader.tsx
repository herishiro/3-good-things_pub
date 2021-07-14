import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import {
	selectDevidedDiaries,
	selectSelectedPeriod,
} from "context/slices/diaries";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		header: {
			height: 25,
			padding: "1px 10px",
			fontSize: theme.typography.pxToRem(20),
			backgroundColor: theme.palette.secondary.main,
			color: "#fff",
			fontWeight: theme.typography.fontWeightRegular,
		},
		smText: {
			fontSize: theme.typography.pxToRem(12),
		},
	})
);

type Prop = {
	year: string;
	month: string;
};
export default function MonthHeader({ year, month }: Prop) {
	const classes = useStyles();
	const dividedDiariesByMonth = useSelector(selectDevidedDiaries);
	const selectedPeriod = useSelector(selectSelectedPeriod);

	return (
		<>
			{selectedPeriod !== "all" || dividedDiariesByMonth.length ? (
				<div className={classes.header}>
					{year}
					<span className={classes.smText}>年</span>
					{Number(month).toString()}
					<span className={classes.smText}>月</span>
				</div>
			) : (
				<div className={classes.header}></div>
			)}
		</>
	);
}

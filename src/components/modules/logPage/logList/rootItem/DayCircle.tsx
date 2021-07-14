import React from "react";
import clsx from "clsx";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { getDiaryDateObj } from "libs/diaries";
import { Diary } from "interfaces/index";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		bese: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			borderRadius: "50%",
			fontWeight: theme.typography.fontWeightBold,
			color: "#fff",
		},
		default: {
			backgroundColor: theme.palette.secondary.dark,
		},
		selected: {
			backgroundColor: theme.palette.primary.dark,
		},
	})
);

type Prop = {
	diary: Diary;
	open: boolean;
};
function DayCircle({ diary, open }: Prop) {
	const classes = useStyles();
	const circleClass = clsx(
		classes.bese,
		open ? classes.selected : classes.default
	);
	const { day } = getDiaryDateObj(diary).num;
	return (
		<ListItemAvatar>
			<Avatar className={circleClass}>
				<span>{day}</span>
			</Avatar>
		</ListItemAvatar>
	);
}

export default DayCircle;

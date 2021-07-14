import React from "react";
import Link from "next/link";
import clsx from "clsx";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import OpenInNewRoundedIcon from "@material-ui/icons/OpenInNewRounded";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Diary } from "interfaces";
import { getDiaryDateObj } from "libs/diaries";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		default: {
			color: theme.palette.secondary.main,
		},
		selected: {
			color: theme.palette.primary.main,
		},
	})
);

type Prop = {
	open: boolean;
	diary: Diary;
};
function EditButton({ open, diary }: Prop) {
	const classes = useStyles();
	const iconClass = clsx(open ? classes.selected : classes.default);
	const { year, month, day } = getDiaryDateObj(diary).str;
	const { pathname } = useRouter();
	const inputPath = pathname.includes("/demo/log") ? "/demo/input" : "/input";
	return (
		<ListItemSecondaryAction>
			<Link href={`${inputPath}/${year}/${month}/${day}`}>
				<a>
					<IconButton edge="end" aria-label="comments" className={iconClass}>
						<OpenInNewRoundedIcon />
					</IconButton>
				</a>
			</Link>
		</ListItemSecondaryAction>
	);
}

export default EditButton;

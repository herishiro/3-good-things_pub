import React from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { getFilledEventCount } from "libs/diaries";
import { Diary } from "interfaces";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			fontSize: theme.typography.h5.fontSize,
			fontWeight: theme.typography.fontWeightBold,
			color: theme.palette.secondary.main,
		},
		suffix: {
			fontSize: theme.typography.h6.fontSize,
		},
		oneGood: {
			color: theme.palette.secondary.light,
		},
		twoGood: {
			color: theme.palette.secondary.dark,
		},
		threeGood: {
			color: theme.palette.secondary.main,
		},
		zeroGood: {
			color: theme.palette.grey[400],
		},
		selected: {
			color: theme.palette.primary.main,
		},
	})
);

type Prop = {
	diary: Diary;
	open: boolean;
};
function GoodCount({ diary, open }: Prop) {
	const classes = useStyles();
	const count = getFilledEventCount(diary);

	const getElement = (text: string[], className: string) => {
		const rootClass = clsx(classes.root, open ? classes.selected : className);
		return (
			<Typography className={rootClass}>
				{text[0]} <span className={classes.suffix}> {text[1]}</span>
			</Typography>
		);
	};

	let text;
	switch (count) {
		case 0:
			text = getElement(["0", "Good"], classes.zeroGood);
			break;
		case 1:
			text = getElement(["1", "Good!"], classes.oneGood);
			break;
		case 2:
			text = getElement(["2", "Good!!"], classes.twoGood);
			break;
		case 3:
			text = getElement(["3", "Good!!!"], classes.threeGood);
			break;
		default:
			throw new Error();
	}
	return <>{text}</>;
}

export default GoodCount;

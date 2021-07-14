import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { selectDiary, selectEventStatus } from "context/slices/diary";
import clsx from "clsx";

type Props = {
	index: number;
};

const useStyles = makeStyles((theme) => ({
	button: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
		left: "1px",
		width: "40px",
		height: "35px",
		minWidth: "auto",
		flexShrink: 0,
		padding: 0,
		textAlign: "center",
		backgroundColor: "#fff",
		borderRadius: "4px 0 0 4px",
		border: "1px solid",
		borderColor: theme.palette.grey["300"],
		fontSize: theme.typography.pxToRem(19),
		boxSizing: "border-box",
	},
	emptyButton: {
		left: 2,
		border: "2px solid",
		borderColor: theme.palette.primary.main,
		color: theme.palette.primary.main,
	},
}));

const CategoryIconDisplay = ({ index }: Props) => {
	const classes = useStyles();
	const diary = useSelector(selectDiary);
	if (!diary) {
		return <></>;
	}
	const eventsStatus = useSelector(selectEventStatus);
	const empty = eventsStatus[index] === "empty";
	const buttonClass = clsx(classes.button, empty && classes.emptyButton);
	const currentCategory = diary.events[index].category;
	const category = currentCategory || {
		emoji: "☺",
		name: "Happiness Category",
		id: -1,
		examples: [],
	};
	return (
		<>
			<div aria-haspopup="true" className={buttonClass}>
				{category.emoji}
			</div>
		</>
	);
};

export default CategoryIconDisplay;

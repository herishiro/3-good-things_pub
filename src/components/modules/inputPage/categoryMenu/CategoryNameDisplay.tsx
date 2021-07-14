import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { selectDiary, selectEventStatus } from "context/slices/diary";
import React from "react";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
	field: {
		backgroundColor: "#fff",
		borderRadius: "4px",
		[`& fieldset`]: {
			borderColor: theme.palette.grey["300"],
			borderWidth: "1px",
			borderRadius: "0 4px 4px 0",
		},
	},
	form: {
		display: "flex",
		alignItems: "center",
		flexBasis: "100%",
		height: "35px",
		boxSizing: "border-box",
		paddingLeft: 10,
		backgroundColor: "#fff",
		borderRadius: "0 4px 4px 0",
		border: "1px solid",
		borderColor: theme.palette.grey["300"],
		fontSize: theme.typography.pxToRem(18),
		color: theme.palette.grey[700],
	},
	emptyStatus: {
		border: "2px solid",
		borderColor: theme.palette.primary.main,
		color: theme.palette.primary.main,
	},
}));

type Props = {
	index: number;
};
const CategoryNameDisplay: React.FC<Props> = ({ index }) => {
	const diary = useSelector(selectDiary);
	const classes = useStyles();
	if (!diary) {
		return <></>;
	}
	const eventsStatus = useSelector(selectEventStatus);
	const empty = eventsStatus[index] === "empty";
	const formClass = clsx(classes.form, empty && classes.emptyStatus);
	const currentCategory = diary.events[index].category;
	const category = currentCategory || {
		emoji: "☺",
		name: "Happiness Category",
		id: -1,
		examples: [],
	};
	return <div className={formClass}>{category.name}</div>;
};

export default CategoryNameDisplay;

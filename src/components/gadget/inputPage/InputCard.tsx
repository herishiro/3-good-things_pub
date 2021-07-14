import React from "react";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { selectDiary } from "context/slices/diary";
import { EventDetailAccordion } from "components/modules/inputPage/eventDetail/EventDetailAccordion";
import CategoryNameDisplay from "components/modules/inputPage/categoryMenu/CategoryNameDisplay";
import CategoryIconDisplay from "components/modules/inputPage/categoryMenu/CategoryIconDisplay";
import { setOpenInputDrawer } from "context/slices/ui";

const useStyles = makeStyles((theme) => ({
	card: {
		position: "relative",
		"box-shadow": "none",
		backgroundColor: theme.palette.primary.light,
		borderRadius: 0,
		["&:not(:first-child)"]: {
			marginTop: "40px",
		},
		[theme.breakpoints.up("sm")]: {
			borderRadius: 4,
		},
	},
	contentWrapper: {
		margin: "auto",
		padding: "20px 0 30px",
		width: "90%",
		maxWidth: 450,
	},
	header: {
		display: "flex",
		cursor: "pointer",
	},
	eventDetail: {
		marginTop: "10px",
	},
	mainFieldDisplay: {
		minHeight: "130px",
		marginTop: 20,
		padding: 10,
		boxSizing: "border-box",
		border: `1px solid ${theme.palette.grey[300]}`,
		borderRadius: 4,
		backgroundColor: "#fff",
		whiteSpace: "pre-line",
		lineBreak: "anywhere",
	},
	mainFieldSkelton: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		minHeight: "130px",
		marginTop: 20,
		boxSizing: "border-box",
		fontFamily: ["Nunito", theme.typography.fontFamily].join(","),
		color: "#fff",
		border: "3px solid #fff",
		borderRadius: 4,
	},
	number: {
		fontSize: theme.typography.pxToRem(60),
		lineHeight: "100%",
	},
	text: {
		fontSize: theme.typography.pxToRem(30),
	},
}));

type Props = {
	index: number;
};
export default function InputCard({ index }: Props) {
	const diary = useSelector(selectDiary);
	if (!diary) return <></>;
	const classes = useStyles();
	const dispatch = useDispatch();
	const hasCategory = diary.events[index].category;
	const onClickedCategory = () => {
		dispatch(setOpenInputDrawer({ status: "category", index }));
	};
	const onClickedText = () => {
		dispatch(setOpenInputDrawer({ status: "text", index }));
	};
	return (
		<Card className={classes.card}>
			<div className={classes.contentWrapper}>
				<div className={classes.header} onClick={onClickedCategory}>
					<CategoryIconDisplay index={index} />
					<CategoryNameDisplay index={index} />
				</div>
				{hasCategory ? (
					<div style={{ cursor: "pointer" }} onClick={onClickedText}>
						<MainFieldDisplay index={index} />
					</div>
				) : (
					<MainFieldSkelton index={index} />
				)}
				<EventDetailAccordion index={index} />
			</div>
		</Card>
	);
}

export const MainFieldDisplay = ({ index }: { index: number }) => {
	const classes = useStyles();
	const diary = useSelector(selectDiary);
	if (!diary) return <></>;
	const text = diary.events[index].textFields[0].value;
	return <div className={classes.mainFieldDisplay}>{text}</div>;
};

export const MainFieldSkelton = ({ index }: { index: number }) => {
	const classes = useStyles();
	const contents = ["is Good!", "is Great!!", "is Perfect!!!"];
	return (
		<div className={classes.mainFieldSkelton}>
			<div className={classes.number}>{index + 1}</div>
			<div className={classes.text}>{contents[index]}</div>
		</div>
	);
};

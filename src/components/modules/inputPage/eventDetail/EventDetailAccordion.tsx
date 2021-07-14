import MuiAccordion from "@material-ui/core/Accordion";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import EventDetailList from "components/modules/inputPage/eventDetail/List";
import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectEventStatus } from "context/slices/diary";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
	summary: {
		minHeight: "auto",
		padding: 0,
		["&.Mui-expanded"]: {
			minHeight: "auto",
		},
	},
	summaryCnt: {
		height: 20,
		justifyContent: "center",
		border: "1px solid",
		borderColor: theme.palette.primary.main,
		color: theme.palette.primary.main,
		fontSize: theme.typography.pxToRem(14),
		paddingTop: 2,
		margin: "12px 0 0",
		fontWeight: "bold",

		["&.Mui-expanded"]: {
			margin: "12px 0",
		},
	},
	summaryDisabled: {
		borderColor: "#fff",
		color: "#fff",
	},
	eventDetail: {
		marginTop: "10px",
	},
}));

const Accordion = withStyles((theme: Theme) => ({
	root: {
		margin: 0,
		boxShadow: "none",
		border: "none",
		backgroundColor: "rgba(0,0,0,0)",
		"&::before": {
			backgroundColor: "inherit",
		},
		"&$expanded": {
			margin: 0,
		},
		"&$disabled": {
			backgroundColor: "inherit",
		},
	},
	expanded: {},
	disabled: {
		["& .MuiAccordionSummary-root"]: {
			opacity: 1,
		},
	},
}))(MuiAccordion);

export const EventDetailAccordion = ({ index }: { index: number }) => {
	const classes = useStyles();
	const ruouter = useRouter();
	const [text, setText] = React.useState("");
	const eventsStatus = useSelector(selectEventStatus);
	const textFilled = eventsStatus[index] === "textFilled";
	const onChange = (event: object, expanded: boolean) => {
		if (expanded) {
			setText("▲ 詳細を折りたたむ");
		} else {
			textFilled ? setText("▼ もっと詳しく書く") : setText("");
		}
	};

	React.useEffect(() => {
		if (eventsStatus[index] === "textFilled") {
			setText("▼ もっと詳しく書く");
		} else if (
			eventsStatus[index] === "categoryFilled" ||
			eventsStatus[index] === "empty"
		) {
			setText("");
		}
	}, [eventsStatus, ruouter.asPath]);
	const summaryCntClass = clsx(
		classes.summaryCnt,
		!textFilled && classes.summaryDisabled
	);

	return (
		<div className={classes.eventDetail}>
			<Accordion onChange={onChange} disabled={!textFilled}>
				<AccordionSummary
					className={classes.summary}
					classes={{ content: summaryCntClass }}
				>
					{text}
				</AccordionSummary>
				<AccordionDetails style={{ flexDirection: "column", padding: 0 }}>
					<EventDetailList index={index} />
				</AccordionDetails>
			</Accordion>
		</div>
	);
};

import React from "react";
import { Theme, makeStyles, withStyles } from "@material-ui/core/styles";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import EventDetailIcons from "components/modules/inputPage/eventDetail/EventDetailIcons";

const useStyles = makeStyles((theme: Theme) => ({
	headingText: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightBold,
		color: theme.palette.grey["700"],
	},
}));

const AccordionSummary = withStyles({
	root: {
		marginBottom: -1,
		minHeight: 25,
		"&$expanded": {
			minHeight: 25,
		},
	},
	content: {
		display: "flex",
		"&$expanded": {
			margin: "8px 0 0",
		},
	},
	expanded: {},
})(MuiAccordionSummary);

type Prop = {
	label: string;
	status: "selected" | "filled" | "empty";
};

export default function ItemHeader({ label, status }: Prop) {
	const classes = useStyles();
	return (
		<AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
			<EventDetailIcons status={status} />
			<Typography className={classes.headingText}>{label}</Typography>
		</AccordionSummary>
	);
}

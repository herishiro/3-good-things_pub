import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import NestedListItem from "components/elements/NestedListItem";
import { Event } from "interfaces";
import { isTextFilledEvent, getEventValue } from "libs/diaries";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		itemWrap: {
			display: "flex",
			alignItems: "flex-start",
			fontSize: theme.typography.pxToRem(16),
		},
		category: {
			paddingRight: 10,
		},
		title: {
			color: theme.palette.grey[700],
			fontWeight: theme.typography.fontWeightBold,
			lineBreak: "anywhere",
		},
		item: {
			alignItems: "flex-start",
			paddingTop: 0,
			paddingBottom: 2,
			paddingLeft: 23,
			paddingRight: 0,
			["&:not(:first-child)"]: {
				paddingTop: 10,
			},
			["&:not(:last-child) > div"]: {
				border: "2px solid",
				borderColor: theme.palette.primary.light,
				borderRight: "none",
				borderTop: "none",
				borderLeft: "none",
			},
		},
		expandMore: {
			fill: theme.palette.primary.dark,
			marginRight: 10,
			marginTop: 5,
		},
		expandLess: {
			fill: theme.palette.primary.main,
			marginRight: 10,
			marginTop: 5,
		},
	})
);

type Prop = {
	children: JSX.Element;
	event: Event;
};
function EventItem({ event, children }: Prop) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	if (!isTextFilledEvent(event)) {
		return <></>;
	}
	const title = getEventValue(event, "title");
	const eventTitle = title || "タイトルなし";
	const eventItem = (
		<div className={classes.itemWrap}>
			<div className={classes.category}>
				{event.category ? event.category.emoji : "☺"}
			</div>
			<div className={classes.title}> {eventTitle}</div>
		</div>
	);
	return (
		<NestedListItem
			label={eventItem}
			key={event.id}
			open={open}
			setOpen={setOpen}
			classes={classes}
		>
			{children}
		</NestedListItem>
	);
}

export default EventItem;

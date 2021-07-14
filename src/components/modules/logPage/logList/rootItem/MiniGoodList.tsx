import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextTruncate from "react-text-truncate";
import { Diary } from "interfaces";
import { isTextFilledEvent } from "libs/diaries";
import List from "components/elements/List";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
		},
		item: {
			height: 23,
			color: theme.palette.grey[600],
			fontSize: theme.typography.pxToRem(15),
			overflow: "hidden",
			display: "flex",
			width: "100%",
			boxSizing: "border-box",
			lineBreak: "anywhere",
			[`& > div`]: {
				width: "100%",
			},
		},
		category: {
			paddingRight: 10,
		},
	})
);

type Prop = {
	diary: Diary;
};
function MiniGoodList({ diary }: Prop) {
	const classes = useStyles();
	const filledEvents = diary.events.filter((event) => isTextFilledEvent(event));
	return (
		<div className={classes.root}>
			<List>
				{filledEvents.map((event) => (
					<li className={classes.item} key={event.id}>
						<span className={classes.category}>
							{event.category ? event.category.emoji : "☺"}
						</span>{" "}
						<TextTruncate
							line={1}
							element="div"
							truncateText="…"
							text={event.textFields[0].value || "タイトルなし"}
						/>
					</li>
				))}
			</List>
		</div>
	);
}

export default MiniGoodList;

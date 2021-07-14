import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import NestedListItem from "components/elements/NestedListItem";
import { Diary } from "interfaces";
import DayCircle from "components/modules/logPage/logList/rootItem/DayCircle";
import EditButton from "components/modules/logPage/logList/rootItem/EditButton";
import GoodCount from "components/modules/logPage/logList/rootItem/GoodCount";
import MiniGoodList from "components/modules/logPage/logList/rootItem/MiniGoodList";
import { useRouter } from "next/router";
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		wrapper: {
			display: "flex",
			alignItems: "center",
			paddingRight: 30,
		},
		count: {
			flexShrink: 0,
			flexBasis: 100,
		},
		list: {
			display: "flex",
			alignItems: "center",
			minHeight: 50,
			width: "100%",
		},
	})
);
const useDefaultStyles = makeStyles((theme: Theme) =>
	createStyles({
		item: {
			borderBottom: "1px solid",
			borderBottomColor: theme.palette.grey[300],
			height: 110,
			transition: "all 0.1s ease-in-out",
		},
		expandLess: {},
		expandMore: {},
	})
);
const useSelectedStyle = makeStyles((theme: Theme) =>
	createStyles({
		item: {
			borderBottom: "none",
			borderBottomColor: theme.palette.grey[300],
			height: 70,
			transition: "all 0.2s ease-in-out",
		},
		expandLess: {},
		expandMore: {},
	})
);

type Prop = {
	children: JSX.Element;
	diary: Diary;
};
function RootItem({ children, diary }: Prop) {
	const classes = useStyles();
	const defaultClasses = useDefaultStyles();
	const selsectedClasses = useSelectedStyle();
	const [open, setOpen] = React.useState(false);

	const itemClasses = open ? selsectedClasses : defaultClasses;

	const mainConstent = (
		<div className={classes.wrapper}>
			<div className={classes.count}>
				<GoodCount diary={diary} open={open} />
			</div>
			{open ? (
				<></>
			) : (
				<div className={classes.list}>
					<MiniGoodList diary={diary} />
				</div>
			)}
		</div>
	);
	return (
		<NestedListItem
			avater={<DayCircle diary={diary} open={open} />}
			actionBtn={<EditButton open={open} diary={diary} />}
			label={mainConstent}
			classes={itemClasses}
			open={open}
			setOpen={setOpen}
		>
			{children}
		</NestedListItem>
	);
}

export default RootItem;

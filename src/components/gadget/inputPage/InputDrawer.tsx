import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CategoryMenuList from "components/modules/inputPage/categoryMenu/CategoryList";
import CategoryIconDisplay from "components/modules/inputPage/categoryMenu/CategoryIconDisplay";
import CategoryNameDisplay from "components/modules/inputPage/categoryMenu/CategoryNameDisplay";
import {
	selectInputDrawerIndex,
	selectInputDrawerStatus,
	selectIsInputDrawerOpened,
	setOpenInputDrawer,
} from "context/slices/ui";
import { useDispatch, useSelector } from "react-redux";
import EventMainField from "components/modules/inputPage/EventMainField";
import { HappinessExampleSelect } from "components/modules/inputPage/inputDrawer/HappinessExampleSelect";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		swiperRoot: {
			position: "fixed",
			top: theme.spacing(0),
			right: theme.spacing(0),
			marginTop: 60,
			padding: 6,
			[theme.breakpoints.up("sm")]: {
				position: "absolute",
				padding: 12,
			},
		},
		drawer: {
			["& .MuiDrawer-paper"]: {
				display: "block",
			},
		},
		paper: {
			position: "absolute",
			bottom: 0,
			maxWidth: 552,
			margin: "auto",
			backgroundColor: theme.palette.primary.light,
			borderRadius: "6vw 6vw 0 0",
			overflow: "visible",
			[theme.breakpoints.up(350)]: {
				borderRadius: "40px 40px 0 0",
			},
			[theme.breakpoints.up("sm")]: {
				left: -12,
			},
		},
		inputDrawer: {
			paddingBottom: 71,
			paddingTop: 30,
			width: "90%",
			margin: "auto",
		},
		header: {
			display: "flex",
		},
		field: {
			minHeight: "130px",
			[`& fieldset`]: {
				minHeight: "calc(130px + 4px)",
			},
			[`& textarea`]: {
				minHeight: "calc(110px + 4px)",
			},
		},
	})
);

export default function InputDrawer() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const isInputDrawerOpened = useSelector(selectIsInputDrawerOpened);
	const inputDrawerStatus = useSelector(selectInputDrawerStatus);
	const index = useSelector(selectInputDrawerIndex);
	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event &&
				event.type === "keydown" &&
				((event as React.KeyboardEvent).key === "Tab" ||
					(event as React.KeyboardEvent).key === "Shift")
			) {
				return;
			}
			const status = open ? "category" : "close";
			dispatch(setOpenInputDrawer({ status, index }));
		};
	const inCategoryInputMode =
		isInputDrawerOpened && inputDrawerStatus === "category";
	return (
		<div className={classes.swiperRoot}>
			<React.Fragment>
				<SwipeableDrawer
					anchor="bottom"
					open={isInputDrawerOpened}
					onClose={toggleDrawer(false)}
					onOpen={toggleDrawer(true)}
					className={classes.drawer}
					classes={{ paperAnchorBottom: classes.paper }}
				>
					<div className={classes.inputDrawer}>
						{inCategoryInputMode ? (
							<CategoryInputMode index={index} />
						) : (
							<TextInputMode index={index} />
						)}
					</div>
				</SwipeableDrawer>
			</React.Fragment>
		</div>
	);
}

export const CategoryInputMode = ({ index }: { index: number }) => {
	const classes = useStyles();
	return (
		<>
			<div className={classes.header}>
				<CategoryIconDisplay index={index} />
				<CategoryNameDisplay index={index} />
			</div>
			<CategoryMenuList index={index} />
		</>
	);
};

export const TextInputMode = ({ index }: { index: number }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const onClickedCategory = () => {
		dispatch(setOpenInputDrawer({ status: "category", index }));
	};
	return (
		<>
			<div style={{ marginBottom: 40 }}>
				<div
					className={classes.header}
					style={{ cursor: "pointer" }}
					onClick={onClickedCategory}
				>
					<CategoryIconDisplay index={index} />
					<CategoryNameDisplay index={index} />
				</div>
				<EventMainField index={index} />
				<HappinessExampleSelect index={index} />
			</div>
		</>
	);
};

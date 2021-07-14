import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import {
	LogOut,
	AboutApp,
	ToDemoPage,
	ToAccountConfig,
	ContactItem,
} from "components/modules/internalPages/SettingDrawer/MenuItems";
import Image from "next/image";
import ListItem from "@material-ui/core/ListItem";
import { ListItemIcon, ListItemText } from "@material-ui/core";
import clsx from "clsx";
import { AccountConfig } from "components/modules/internalPages/SettingDrawer/AccountConfig";
import { selectAuthState } from "context/slices/user";
import { useSelector } from "react-redux";
import { isIOS } from "react-device-detect";

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
		paper: {
			width: "auto",
			minWidth: 0,
		},
		moreExpand: {
			minWidth: "100%",
			transition: "225ms !important",
		},
		listWrapper: {
			height: "100%",
		},
		list: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			height: "90%",
			width: 250,
		},
		iconButton: {
			padding: 2,
		},
		avatar: {
			boxShadow: "0px 0px 0 2px #fff",
		},
		closeButton: {
			display: "block",
			marginTop: 5,
			marginLeft: "auto",
			marginRight: 5,
		},
		addHomeBase: {
			width: "90%",
			margin: "auto",
			padding: "10px",
			boxSizing: "border-box",
			border: `3px solid ${theme.palette.primary.main}`,
			borderRadius: 7,
		},
		addHomeTitle: {
			fontWeight: "bold",
			color: theme.palette.primary.main,
		},
		addHomeText: {
			fontSize: theme.typography.pxToRem(14),
			lineHeight: "180%",
			marginBottom: 10,
		},
	})
);

interface Props {
	state: boolean;
	setState: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function SettingDrawer({ state, setState }: Props) {
	const classes = useStyles();
	const [expand, setExpand] = React.useState(false);

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
			setState(open);
			if (!open) setExpand(false);
		};

	const list = () => (
		<List className={classes.list} role="presentation">
			<div>
				<ToAccountConfig setExpand={setExpand} />
				<div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
					<AboutApp />
					<ToDemoPage />
				</div>
				<ContactItem />
			</div>
			{isIOS && <AddHomeNotification />}
			<div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
				<LogOut />
			</div>
		</List>
	);

	return (
		<div className={classes.swiperRoot}>
			<React.Fragment>
				<SwipeableDrawer
					anchor="right"
					open={state}
					onClose={toggleDrawer(false)}
					onOpen={toggleDrawer(true)}
					style={{ zIndex: 1302 }}
					classes={{
						paper: clsx(classes.paper, expand && classes.moreExpand),
					}}
				>
					<IconButton
						onClick={toggleDrawer(false)}
						className={classes.closeButton}
					>
						<CloseRoundedIcon />
					</IconButton>
					{expand ? (
						<>
							<AccountConfig />
						</>
					) : (
						list()
					)}
				</SwipeableDrawer>
			</React.Fragment>
		</div>
	);
}

export const CurrentUserDisplay = () => {
	const authState = useSelector(selectAuthState);
	const classes = useStyles();
	return (
		<ListItem disableGutters>
			<ListItemIcon>
				<Avatar
					className={classes.avatar}
					src={authState?.user.photoUrl || ""}
				/>
			</ListItemIcon>
			<ListItemText primary={authState?.user.name} />
		</ListItem>
	);
};

export const AddHomeNotification = () => {
	const classes = useStyles();
	return (
		<div className={classes.addHomeBase}>
			<div className={classes.addHomeTitle}>スマホアプリとして使う</div>
			<div className={classes.addHomeText}>
				safariブラウザの 「
				<Image src="/images/ios-share.svg" width={25} height={25} />
				」アイコン
				を押した先に表示される「ホーム画面に追加」を押すことでスマホアプリとして使用できます！
			</div>
			<Image src="/images/addHome-image.jpg" width={828} height={248} />
		</div>
	);
};

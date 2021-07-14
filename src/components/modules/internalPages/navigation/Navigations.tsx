import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { format } from "date-fns";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AppsRoundedIcon from "@material-ui/icons/AppsRounded";
import LibraryBooksRoundedIcon from "@material-ui/icons/LibraryBooksRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import { useDispatch, useSelector } from "react-redux";
import {
	selectInputDrawerIndex,
	selectIsInputDrawerOpened,
	setOpenInputDrawer,
} from "context/slices/ui";
import { selectEventStatus } from "context/slices/diary";
import { getNextEventAndDrawerStatus } from "libs/diaries";
import { IconButton, Tooltip } from "@material-ui/core";
import { InputButtonWithFab } from "components/modules/internalPages/navigation/InputButtonWithFab";
import { useRouter } from "next/router";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		position: "fixed",
		bottom: 0,
		left: 0,
		right: 0,
		margin: "auto",
		paddingBottom: 15,
		boxShadow: "1px 3px 8px 2px rgba(0,0,0,0.4);",
		zIndex: 1301, //inputDrawer 1300/ settingDrawer 1302,
		[theme.breakpoints.up("sm")]: {
		},
	},
	inputButton: {
		position: "relative",
		top: "-20px",
		["& span[class*='MuiTouchRipple']"]: {
			display: "none",
		},
	},
	mq: {
		[theme.breakpoints.down("xs")]: {
			padding: 0,
		},
	},
	tooltip: {
		padding: 10,
		backgroundColor: "#fff",
		border: `2px solid ${theme.palette.primary.main}`,
		color: theme.palette.grey[900],
		textAlign: "center",
		fontSize: theme.typography.pxToRem(16),
		lineHeight: "200%",
	},
	arrow: {
		color: theme.palette.primary.main,
	},
	closeButton: {
		position: "fixed",
		bottom: 27,
		left: 20,
		width: 34,
		height: 34,
		padding: 3,
		zIndex: 5000,
		border: `2px solid ${theme.palette.grey[500]}`,
		borderRadius: 7,
		[theme.breakpoints.up("sm")]: {
			position: "fixed",
			left: 0,
			right: 0,
			margin: "auto",
			transform: "translateX(-250px)",
		},
	},
}));

interface NaviProps {
	value: string;
	onChange: (event: React.ChangeEvent<{}>, newValue: string) => void;
}
interface NaviInProp extends NaviProps {
	disabled: boolean;
}
export const NavigationInDrawer = ({
	value,
	onChange,
	disabled,
}: NaviInProp) => {
	const classes = useStyles();
	const today = format(new Date(), "yyyy/MM/dd");
	const dispatch = useDispatch();
	const index = useSelector(selectInputDrawerIndex);
	const closeDrawer = () => {
		dispatch(setOpenInputDrawer({ status: "close", index }));
	};
	return (
		<>
			<IconButton
				onClick={closeDrawer}
				className={classes.closeButton}
				title="閉じる"
			>
				<CloseRoundedIcon />
			</IconButton>
			<BottomNavigation
				value={value}
				onChange={onChange}
				showLabels
				className={classes.root}
			>
				<BottomNavigationAction
					icon={<InputButtonWithFab />}
					value={`/input/${today}`}
					className={classes.inputButton}
					disabled={disabled}
				/>
			</BottomNavigation>
		</>
	);
};

export const NavigationOutDrawer = ({ value, onChange }: NaviProps) => {
	const classes = useStyles();
	const router = useRouter();
	const today = format(new Date(), "yyyy/MM/dd");
	const inDemo = router.pathname.includes("/demo/");
	const [open, setOpen] = React.useState(false);
	const isInputDrawerOpened = useSelector(selectIsInputDrawerOpened);
	const eventStatus = useSelector(selectEventStatus);
	const next = getNextEventAndDrawerStatus(eventStatus);
	const isAllEventFilled = next.index < 0 && !isInputDrawerOpened;
	const handleTooltipClose = () => {
		setOpen(false);
	};
	const handleTooltipOpen = () => {
		setOpen(true);
	};
	return (
		<BottomNavigation
			value={value}
			onChange={onChange}
			showLabels
			className={classes.root}
		>
			<BottomNavigationAction
				icon={<LibraryBooksRoundedIcon />}
				value="/log"
				id="toLogPage"
			/>
			{isAllEventFilled ? (
				<Tooltip
					title={<ToolTipDisplay />}
					arrow
					open={open}
					onClose={handleTooltipClose}
					classes={{
						tooltipArrow: classes.tooltip,
						arrow: classes.arrow,
					}}
				>
					<BottomNavigationAction
						icon={<InputButtonWithFab />}
						value={`/input/${today}`}
						className={classes.inputButton}
						onClick={handleTooltipOpen}
					/>
				</Tooltip>
			) : (
				<BottomNavigationAction
					icon={<InputButtonWithFab />}
					value={`/input/${today}`}
					className={classes.inputButton}
				/>
			)}
			{!inDemo ? (
				<BottomNavigationAction
					icon={<AppsRoundedIcon />}
					value="settingOpen"
					id="settingButton"
				/>
			) : (
				<BottomNavigationAction
					icon={<HomeRoundedIcon />}
					value="settingOpen"
				/>
			)}
		</BottomNavigation>
	);
};

const ToolTipDisplay = () => {
	return (
		<div>
			今日も良い一日でしたね😊
			<br />
			おやすみなさい、良い夢を🌙
		</div>
	);
};

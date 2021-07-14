import React from "react";
import { useRouter } from "next/router";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import DoneOutlineRoundedIcon from "@material-ui/icons/DoneOutlineRounded";
import ThumbUpAltRoundedIcon from "@material-ui/icons/ThumbUpAltRounded";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import clsx from "clsx";
import { useSelector } from "react-redux";
import {
	selectInputButtonDisabled,
	selectIsInputDrawerOpened,
} from "context/slices/ui";
import { selectEventStatus } from "context/slices/diary";
import { getNextEventAndDrawerStatus } from "libs/diaries";
const useStyles = makeStyles((theme) => ({
	fab: {
		border: "3px #fff solid",
		width: 60,
		height: 60,
		boxShadow: "0px 3px 5px -1px rgb(0 0 0 / 0%)",
	},
	fabDone: {
		backgroundColor: "#fff",
		color: theme.palette.secondary.main,
		border: `4px solid ${theme.palette.secondary.main}`,
		[`&:active`]: {
			backgroundColor: "#fff",
		},
		[`&:hover`]: {
			backgroundColor: "#fff",
		},
	},
	fabAllDone: {
		backgroundColor: "#fff",
		color: theme.palette.primary.main,
		border: `4px solid ${theme.palette.primary.main}`,
		[`&:active`]: {
			backgroundColor: "#fff",
		},
		[`&:hover`]: {
			backgroundColor: "#fff",
		},
	},
	fabDoneDisabled: {
		color: theme.palette.grey[500],
		border: `4px solid ${theme.palette.grey[500]}`,
	},
}));

export const InputButtonWithFab = () => {
	const { pathname } = useRouter();
	const classes = useStyles();
	const theme = useTheme();
	const isInputDrawerOpened = useSelector(selectIsInputDrawerOpened);
	const disabled = useSelector(selectInputButtonDisabled);
	const eventStatus = useSelector(selectEventStatus);
	const next = getNextEventAndDrawerStatus(eventStatus);
	const [value, setValue] = React.useState(0);
	const inputPath = pathname.includes("/demo/") ? "/demo/input" : "/input";

	React.useEffect(() => {
		if (pathname !== `${inputPath}/[...date]`) {
			setValue(1);
			return;
		}
		if (next.index < 0 && !isInputDrawerOpened) {
			setValue(3);
			return;
		}
		if (isInputDrawerOpened) {
			setValue(2);
		} else {
			setValue(0);
		}
	}, [pathname, isInputDrawerOpened]);

	const transitionDuration = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen,
	};

	const fabs = [
		{
			color: "secondary" as "secondary",
			className: classes.fab,
			icon: <AddRoundedIcon fontSize="large" />,
			label: "create",
		},
		{
			color: "primary" as "primary",
			className: classes.fab,
			icon: <CreateRoundedIcon fontSize="large" />,
			label: "link",
		},
		{
			color: "secondary" as "secondary",
			className: clsx(
				classes.fab,
				isInputDrawerOpened && classes.fabDone,
				disabled && classes.fabDoneDisabled
			),
			icon: <DoneOutlineRoundedIcon fontSize="large" />,
			label: "submit",
		},
		{
			color: "primary" as "primary",
			className: clsx(classes.fab, classes.fabAllDone),
			icon: <ThumbUpAltRoundedIcon fontSize="large" />,
			label: "allDone",
		},
	];

	return (
		<>
			{fabs.map((fab, index) => (
				<Zoom
					key={fab.label}
					in={value === index}
					timeout={transitionDuration}
					style={{
						transitionDelay: `${
							value === index ? transitionDuration.exit : 0
						}ms`,
					}}
					unmountOnExit
				>
					<Fab
						aria-label={fab.label}
						className={fab.className}
						color={fab.color}
						component="div"
					>
						{fab.icon}
					</Fab>
				</Zoom>
			))}
		</>
	);
};

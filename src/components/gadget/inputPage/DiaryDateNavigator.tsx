import "date-fns";
import { add, format, sub } from "date-fns";
import jaLocale from "date-fns/locale/ja";
import React, { Fragment, useState, useEffect } from "react";
import { NextRouter, useRouter } from "next/router";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import EventNoteRoundedIcon from "@material-ui/icons/EventNoteRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import HistoryRoundedIcon from "@material-ui/icons/HistoryRounded";
import IconButton from "@material-ui/core/IconButton";
import { useSelector } from "react-redux";
import { selectDiary } from "context/slices/diary";
import { inTodayPage } from "./YesterdayDialog";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		flexWrap: "nowrap",
		width: "100%",
		height: 60,
		backgroundColor: "#fff",
		boxShadow: "1px 3px 5px 2px rgba(175,219,222,1);",
		color: theme.palette.primary.main,
		[theme.breakpoints.up("sm")]: {
			borderRadius: "0 0 4px 4px",
			padding: "0 20px",
		},
	},
	datePicker: {
		borderRadius: "4px",
		border: "2px solid",
		["& input"]: {
			display: "none",
		},
		["&:hover"]: {
			backgroundColor: "#eceff1",
		},
		["& button"]: {
			transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		},
		["& button:hover"]: {
			backgroundColor: "transparent ",
		},
		["& *:after"]: {
			border: "none",
		},
		["& *:before"]: {
			border: "none",
		},
		["& *:hover:not(.Mui-disabled):before"]: {
			border: "none",
		},
	},
	buttonWrapper: {
		display: "flex",
		flexBasis: "25%",
		justifyContent: "space-between",
		marginLeft: 5,
		[theme.breakpoints.up("sm")]: {
			flexBasis: "20%",
		},
	},
	datePickerIcon: {
		color: theme.palette.primary.main,
		borderColor: theme.palette.primary.main,
		padding: 7,
	},
	goToday: {
		color: theme.palette.primary.main,
		border: "2px solid",
		borderColor: theme.palette.primary.main,
		borderRadius: "4px",
		padding: 7,
		marginLeft: 5,
	},
	directionIcon: {
		color: theme.palette.primary.main,
	},
}));

export default function DiaryDateNavigator() {
	const diary = useSelector(selectDiary);
	if (!diary) return <></>;
	const router = useRouter();
	const date = new Date(diary.date.seconds * 1000);
	const classes = useStyles();
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
			<Fragment>
				<Grid container className={classes.root}>
					<LinkToNextDiaryIcon
						date={date}
						router={router}
						direction="yesterday"
					/>
					<DateDisplay date={date} />
					<div className={classes.buttonWrapper}>
						<DatePickerWrapper date={date} />
						<GoTodayIcon router={router} />
					</div>
					<LinkToNextDiaryIcon
						date={date}
						router={router}
						direction="tomorrow"
					/>
				</Grid>
			</Fragment>
		</MuiPickersUtilsProvider>
	);
}

export const DatePickerWrapper = ({ date }: { date: Date }) => {
	const diary = useSelector(selectDiary);
	if (!diary) return <></>;
	const classes = useStyles();
	const router = useRouter();
	const [selectedDate, setSelectedDate] = useState<Date | null>(date);
	const inputPath = router.pathname.includes("/demo/")
		? "/demo/input"
		: "/input";

	useEffect(() => {
		const date = new Date(diary.date.seconds * 1000);
		setSelectedDate(date);
	}, [diary.date.seconds]);
	const handleDateChange = (date: Date | null) => {
		setSelectedDate(date);
		if (!date) return;
		const dateString = format(date, "yyyy/MM/dd");
		router.push(`${inputPath}/${dateString}`);
	};
	return (
		<DatePicker
			disableToolbar
			variant="dialog"
			id="date-picker-inline"
			value={selectedDate}
			onChange={handleDateChange}
			autoOk={true}
			className={classes.datePicker}
			title="別の日付に移動"
			InputProps={{
				endAdornment: (
					<IconButton className={classes.datePickerIcon}>
						<EventNoteRoundedIcon />
					</IconButton>
				),
			}}
		/>
	);
};

export const DateDisplay = ({ date }: { date: Date }) => {
	const yearStr = format(date, "yyyy年");
	const dateStr = format(date, "M月d日");
	const weekDayStr = format(date, "EEEE", { locale: jaLocale });
	return (
		<div style={{ fontWeight: "bold", lineHeight: "100%", flexShrink: 0 }}>
			<div>{yearStr}</div>
			<div style={{ display: "flex", alignItems: "flex-end", marginTop: 7 }}>
				<div style={{ fontSize: "20px" }}>{dateStr}</div>
				<div style={{ paddingLeft: 10 }}>{weekDayStr}</div>
			</div>
		</div>
	);
};

interface props {
	date: Date;
	direction: "yesterday" | "tomorrow";
	router: NextRouter;
}
export const LinkToNextDiaryIcon = ({ date, router, direction }: props) => {
	const classes = useStyles();
	const nextDay =
		direction === "yesterday" ? sub(date, { days: 1 }) : add(date, { days: 1 });
	const onclick = () => {
		const dateStr = format(nextDay, "yyyy/MM/dd");
		if (!router.pathname.includes("/demo/")) {
			router.push(`/input/${dateStr}`);
		} else {
			router.push(`/demo/input/${dateStr}`);
		}
	};
	return (
		<IconButton
			aria-label={direction}
			onClick={onclick}
			className={classes.directionIcon}
		>
			{direction === "yesterday" ? (
				<ArrowBackIosRoundedIcon />
			) : (
				<ArrowForwardIosRoundedIcon />
			)}
		</IconButton>
	);
};

export const GoTodayIcon = ({ router }: { router: NextRouter }) => {
	const classes = useStyles();
	const inputPath = router.pathname.includes("/demo/")
		? "/demo/input"
		: "/input";
	const onclick = () => {
		const dateStr = format(new Date(), "yyyy/MM/dd");
		router.push(`${inputPath}/${dateStr}`);
	};
	const query = router.query as { date: string[] };
	const disabled = inTodayPage(query);

	return (
		<IconButton
			aria-label="go today"
			onClick={onclick}
			className={classes.goToday}
			title="今日の入力画面へ"
			disabled={disabled}
			style={disabled ? { borderColor: "#ccc" } : {}}
		>
			<HistoryRoundedIcon />
		</IconButton>
	);
};

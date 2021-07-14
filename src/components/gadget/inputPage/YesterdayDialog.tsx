import React from "react";
import { useRouter, NextRouter } from "next/router";
import { isWithinInterval, set, format, sub } from "date-fns";
import ja from "date-fns/locale/ja";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogButton from "components/modules/internalPages/DialogButton";
import {
	selectTutorialStatus,
	setToYesterday,
	setTutorialStatus,
} from "context/slices/ui";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile } from "context/slices/user";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		dialogPaper: {
			[theme.breakpoints.down(350)]: {
				margin: 10,
			},
		},
		dialogTitle: {
			padding: "16px 5px",
			textAlign: "center",
			fontWeight: "bold",
			fontSize: "5vw",
			[theme.breakpoints.up("sm")]: {
				fontSize: theme.typography.h5.fontSize,
			},
		},
		dialogText: {
			textAlign: "center",
			fontWeight: "bold",
			["& br"]: {
				[theme.breakpoints.up("sm")]: {
					display: "none",
				},
			},
		},
		dialogContent: {
			padding: "0px 12px 24px",
			[theme.breakpoints.up(350)]: {
				padding: "0px 24px 24px",
			},
		},
		dateString: {
			display: "block",
			fontSize: "0.8em",
			[theme.breakpoints.up("sm")]: {
				fontSize: "0.9em",
				display: "inline",
				marginLeft: 10,
			},
		},
	})
);

export default function YesterdayDialog() {
	const router = useRouter();
	if (!router.isReady) {
		return <></>;
	}
	const now = new Date();
	const query = router.query as { date: string[] };
	const profile = useSelector(selectProfile);
	const tutorialStatus = useSelector(selectTutorialStatus);
	const openCondition = isJustAfterMidnight(now) && inTodayPage(query);

	const [open, setOpen] = React.useState(openCondition);
	React.useEffect(() => {
		const inTurial =
			!!profile?.isFirstLogin && tutorialStatus === "welcome" && openCondition;
		if (inTurial) setOpen(true);
	}, [tutorialStatus]);
	const handleClose = () => {
		setOpen(false);
	};
	return <SimpleDialog open={open} onClose={handleClose} router={router} />;
}

export interface SimpleDialogProps {
	open: boolean;
	onClose: () => void;
	router: NextRouter;
}
function SimpleDialog(props: SimpleDialogProps) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { onClose, open, router } = props;
	const todayDateString = format(new Date(), "yyyy年M月d日 E曜日", {
		locale: ja,
	});
	const todayLabel = (
		<span>
			今日
			<span className={classes.dateString}>（{todayDateString}）</span>
		</span>
	);
	const yesterdayDate = sub(new Date(), { days: 1 });
	const yesterdayRoute = format(yesterdayDate, "yyyy/MM/dd");
	const yesterdayDateString = format(yesterdayDate, "yyyy年M月d日 E曜日", {
		locale: ja,
	});
	const yesterdayLabel = (
		<span>
			昨日
			<span className={classes.dateString}>（{yesterdayDateString}）</span>
		</span>
	);
	const handleClose = () => {
		dispatch(setTutorialStatus("firstClick"));
		onClose();
	};
	const onClickFunc = () => {
		dispatch(setToYesterday(true));
		router.push(`/input/${yesterdayRoute}`);
	};
	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="simple-dialog-title"
			open={open}
			id="yesterday-dialog"
			classes={{
				paper: classes.dialogPaper,
			}}
		>
			<DialogTitle disableTypography className={classes.dialogTitle}>
				🌙 深夜12時を回っています 🌃
			</DialogTitle>
			<DialogContent className={classes.dialogContent}>
				<DialogContentText className={classes.dialogText}>
					今日と昨日の分、
					<br />
					どちらを入力しますか？
				</DialogContentText>
				<DialogButton
					label={yesterdayLabel}
					color="secondary"
					onClickFunc={onClickFunc}
				/>
				<DialogButton
					label={todayLabel}
					color="secondary"
					style="outlined"
					onClickFunc={handleClose}
				/>
			</DialogContent>
		</Dialog>
	);
}

export const isJustAfterMidnight = (now: Date) => {
	const startDate = set(now, { hours: 0 });
	const endDate = set(now, { hours: 6 });
	return isWithinInterval(now, {
		start: startDate,
		end: endDate,
	});
};

export const inTodayPage = (query: { date: string[] }) => {
	const { date } = query;
	const routerDateString = date.join("-");
	const todayString = format(new Date(), "yyyy-MM-dd");
	return routerDateString === todayString;
};

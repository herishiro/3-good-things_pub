import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogButton from "components/modules/internalPages/DialogButton";
import { useWelcomeContext } from "context/providers/demo";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
	goNextTutorial,
	selectToYeasterday,
	selectTutorialStatus,
} from "context/slices/ui";
import { isJustAfterMidnight, inTodayPage } from "../inputPage/YesterdayDialog";
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
				fontSize: theme.typography.pxToRem(20),
			},
		},
		dialogText: {
			textAlign: "center",
			fontWeight: "bold",
			fontSize: "4.4vw",
			color: theme.palette.grey[900],
			[theme.breakpoints.up("sm")]: {
				fontSize: theme.typography.pxToRem(16),
			},
			["& br"]: {
				display: "none",
				[theme.breakpoints.up("sm")]: {
					display: "block",
				},
			},
		},
		dialogSubText: {
			textAlign: "center",
			margin: "20px auto",
			width: "90%",
			fontWeight: "normal",
			fontSize: "3.5vw",
			lineHeight: "180%",
			color: theme.palette.grey[900],
			[theme.breakpoints.up("sm")]: {
				fontSize: theme.typography.pxToRem(16),
			},
		},
		dialogContent: {
			padding: "0px 12px 24px",
			[theme.breakpoints.up(350)]: {
				padding: "0px 24px 24px",
			},
		},
	})
);

export default function WelcomeDialog() {
	const router = useRouter();
	const inDemo = router.pathname.includes("/demo/");
	const dispatch = useDispatch();
	const tutorialStatus = useSelector(selectTutorialStatus);
	const toYeasterday = useSelector(selectToYeasterday);
	const profile = useSelector(selectProfile);

	let open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	if (inDemo) {
		const { openWelcome, setOpenWelcome } = useWelcomeContext();
		open = openWelcome;
		setOpen = setOpenWelcome;
	} else {
		const [openWelcome, setOpenWelcome] = React.useState(false);
		open = openWelcome;
		setOpen = setOpenWelcome;
	}
	React.useEffect(() => {
		if (!profile?.isFirstLogin && !inDemo) return;
		if (tutorialStatus !== "welcome") return;
		setOpen(true);
	}, [tutorialStatus]);

	React.useEffect(() => {
		if (!toYeasterday) return;
		if (!profile?.isFirstLogin) return;
		setOpen(false);
	}, [toYeasterday]);

	const now = new Date();
	const query = router.query as { date: string[] };
	const isYesterdayDialogOpend = isJustAfterMidnight(now) && inTodayPage(query);
	const handleClose = () => {
		setOpen(false);
		if (!isYesterdayDialogOpend) {
			dispatch(goNextTutorial());
		}
	};
	return <SimpleDialog open={open} handleClose={handleClose} />;
}

export interface SimpleDialogProps {
	open: boolean;
	handleClose: () => void;
}
function SimpleDialog(props: SimpleDialogProps) {
	const classes = useStyles();
	const { handleClose, open } = props;
	const router = useRouter();
	const inDemo = router.pathname.includes("/demo/");

	return (
		<Dialog
			aria-labelledby="simple-dialog-title"
			open={open}
			onClose={handleClose}
			id="welcome-dialog"
			classes={{
				paper: classes.dialogPaper,
			}}
			style={{
				zIndex: 4000,
			}}
		>
			{inDemo ? (
				<>
					<DialogTitle disableTypography className={classes.dialogTitle}>
						???? 3 Good Things! ??????????????????????
					</DialogTitle>
					<DialogContent className={classes.dialogContent}>
						<DialogContentText className={classes.dialogText}>
							??????????????????????????????
							<br />
							??????????????????????????????????????????????????????????????????
						</DialogContentText>
						<DialogButton
							label={"???????????????"}
							color="secondary"
							onClickFunc={handleClose}
						/>
					</DialogContent>
				</>
			) : (
				<>
					<DialogTitle disableTypography className={classes.dialogTitle}>
						???? 3 Good Things! ??????????????????????
					</DialogTitle>
					<DialogContent className={classes.dialogContent}>
						<DialogContentText className={classes.dialogText}>
							?????????????????????????????????????????????
						</DialogContentText>
						<DialogContentText className={classes.dialogSubText}>
							?????????????????????????????????????????????????????????????????????????????? ???Three Good
							Things?????????????????????????????????5???????????????????????????????????????????????????????????????????????????????????????
						</DialogContentText>
						<DialogContentText className={classes.dialogText}>
							?????????????????????????????????3????????????????????????????????????
						</DialogContentText>
						<DialogButton
							label={"????????????"}
							color="primary"
							onClickFunc={handleClose}
						/>
					</DialogContent>
				</>
			)}
		</Dialog>
	);
}

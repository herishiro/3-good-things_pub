import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogButton from "components/modules/internalPages/DialogButton";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { completeTutorial, selectUid } from "context/slices/user";
import { setIsFirstLoginFalse } from "libs/firebase/db";
import { setTutorialStatus } from "context/slices/ui";
import clsx from "clsx";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		dialogRoot: {
			pointerEvents: "none",
		},
		dialogPaper: {
			maxWidth: 400,
			pointerEvents: "auto",
			overflow: "visible",
			color: theme.palette.secondary.main,
			[theme.breakpoints.down(350)]: {
				margin: 10,
			},
		},
		dialogTitle: {
			padding: "16px 15px",
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
			color: theme.palette.grey[700],
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
			padding: "0px 12px 12px",
			[theme.breakpoints.up(350)]: {
				padding: "0px 24px 24px",
			},
		},
		cancelRoot: {
			position: "fixed",
			top: "5vw",
			right: 10,
			display: "flex",
			alignItems: "center",
			padding: "5px 10px 5px 5px",
			zIndex: 4001,
			color: "#fff",
			fontWeight: "bold",
			backgroundColor: "rgba(0,0,0,0.56)",
			border: "none",
			borderRadius: 50,
			cursor: "pointer",
			[theme.breakpoints.up("sm")]: {
				top: 20,
				right: 25,
			},
		},
	})
);

export interface SimpleDialogProps {
	dialog: {
		open: boolean;
		setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	};
}
export const CancelTutorialButton = (props: SimpleDialogProps) => {
	const classes = useStyles();
	const { dialog } = props;

	const onClick = () => {
		dialog.setOpen(true);
	};
	return (
		<>
			<button className={classes.cancelRoot} onClick={onClick}>
				<CancelRoundedIcon />
				<span style={{ marginLeft: 5 }}>チュートリアル終了</span>
			</button>
			<CancelDialog open={dialog.open} setOpen={dialog.setOpen} />
		</>
	);
};

interface DialogProps2 {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CancelDialog = (props: DialogProps2) => {
	const classes = useStyles();
	const router = useRouter();
	const dialogPaperClass = clsx(classes.dialogPaper);
	const userId = useSelector(selectUid);
	const dispatch = useDispatch();
	const { open, setOpen } = props;
	const inDemo = router.pathname.includes("/demo/");
	const handleClose = () => {
		dispatch(setTutorialStatus("unshown"));
		if (userId) {
			dispatch(completeTutorial());
			setIsFirstLoginFalse(userId);
		}
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			classes={{
				paper: dialogPaperClass,
			}}
		>
			<DialogTitle disableTypography className={classes.dialogTitle}>
				チュートリアルを終了します
			</DialogTitle>
			<DialogContent className={classes.dialogContent}>
				<DialogContentText className={classes.dialogSubText}>
					{inDemo
						? "もう一度見たい場合は一度デモを出て、再入場してください"
						: "もう一度見たい場合は、右下のメニュー「操作説明デモ」からいつでも見ることが出来ます。"}
				</DialogContentText>
				<DialogButton
					label={"閉じる"}
					color="secondary"
					style="outlined"
					onClickFunc={handleClose}
				/>
			</DialogContent>
		</Dialog>
	);
};

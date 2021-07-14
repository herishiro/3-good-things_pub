import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogButton from "components/modules/internalPages/DialogButton";
import { useDispatch, useSelector } from "react-redux";
import { completeTutorial, selectUid } from "context/slices/user";
import { setIsFirstLoginFalse } from "libs/firebase/db";
import { selectEventStatus } from "context/slices/diary";
import {
	selectInputDrawerIndex,
	selectInputDrawerStatus,
	selectIsListOpened,
} from "context/slices/ui";
import clsx from "clsx";
import { useRouter } from "next/router";
import SignupWithDemo from "./SignupWithDemo";
import {
	selectDevidedDiaries,
	setDiaryInDiaries,
} from "context/slices/diaries";
import { createDummyDiaries } from "context/providers/demo";
import { Diary } from "interfaces";
import { flattenToDiaries } from "libs/diaries";
import {
	selectSignupWithDemo,
	setNewDiariesInDemo,
	setSignupWithDemo,
} from "context/slices/demo";
import { useReactCookies } from "context/providers/user";

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
		dialogArrow: {
			[`&::before`]: {
				content: "''",
				position: "absolute",
				top: "100%",
				left: "50%",
				transform: "translateX(-50%)",
				borderTop: "15px solid #fff",
				borderRight: "15px solid transparent",
				borderLeft: "15px solid transparent",
			},
		},
		dialogPaper1: {
			position: "absolute",
			bottom: 100,
			right: 0,
			left: 0,
			[theme.breakpoints.up("sm")]: {
				margin: "20px auto",
			},
		},
		dialogPaper2: {
			position: "absolute",
			bottom: "400px",
			right: 0,
			left: 0,
			[theme.breakpoints.up("sm")]: {
				bottom: "460px",
				margin: "20px auto",
			},
		},
		dialogPaper4: {
			position: "relative",
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
		hidden: {
			display: "none",
		},
	})
);

export interface SimpleDialogProps {
	open: boolean;
}
export const FirstClickDialog = (props: SimpleDialogProps) => {
	const classes = useStyles();
	const dialogPaperClass = clsx(
		classes.dialogPaper,
		classes.dialogPaper1,
		classes.dialogArrow
	);
	const { open } = props;
	return (
		<Dialog
			open={open}
			classes={{
				paper: dialogPaperClass,
			}}
		>
			<DialogTitle disableTypography className={classes.dialogTitle}>
				このボタンから入力開始です！
			</DialogTitle>
		</Dialog>
	);
};

export const CategorySelectDialog = (props: SimpleDialogProps) => {
	const classes = useStyles();
	const dialogPaperClass = clsx(
		classes.dialogPaper,
		classes.dialogPaper2,
		classes.dialogArrow
	);
	const inputDrawerIndex = useSelector(selectInputDrawerIndex);
	const messages = [
		"例えばお昼ご飯が美味しかったら「食事」を選んでくださいね😊",
		"思いつかない時は適当なカテゴリを選択して幸せリストを眺めるのも良いですね😊",
		"自分の中のハードルを下げて、ちょっとした幸せを日常に見つけましょう😊",
	];

	const { open } = props;
	return (
		<Dialog
			open={open}
			hideBackdrop
			classes={{
				root: classes.dialogRoot,
				paper: dialogPaperClass,
			}}
		>
			<DialogTitle disableTypography className={classes.dialogTitle}>
				良かったことの種類を選びましょう
			</DialogTitle>
			<DialogContent className={classes.dialogContent}>
				<DialogContentText className={classes.dialogText}>
					{messages[inputDrawerIndex]}
				</DialogContentText>
			</DialogContent>
		</Dialog>
	);
};

export const TextInputDialog = (props: SimpleDialogProps) => {
	const classes = useStyles();

	const { open } = props;
	const inputDrawerStatus = useSelector(selectInputDrawerStatus);
	const eventsStatus = useSelector(selectEventStatus);
	const inputDrawerIndex = useSelector(selectInputDrawerIndex);
	const isListOpened = useSelector(selectIsListOpened);
	const dialogPaperClass = clsx(
		classes.dialogPaper,
		classes.dialogPaper2,
		classes.dialogArrow,
		isListOpened && classes.hidden
	);
	const messages = [
		"入力欄下の「幸せリスト」から、定型文を選んで入力することも出来ます🧐",
		"思い出すことが大事なので、書く量は気にしなくて大丈夫ですよ🧐",
		"幸せリストから入力したとき、もう一度押すと入力内容をキャンセルできます🧐",
	];

	// tabindexを無効にしないとその下のテキストが入力できないため
	React.useEffect(() => {
		if (inputDrawerStatus !== "text") return;
		setTimeout(() => {
			const containers = document.querySelectorAll(".MuiDialog-container");
			if (containers.length) {
				const elm = containers[containers.length - 1];
				elm.setAttribute("tabindex", "");
			}
		}, 500);
	}, [inputDrawerStatus, eventsStatus, isListOpened]);

	return (
		<Dialog
			open={open}
			hideBackdrop
			classes={{
				root: classes.dialogRoot,
				paper: dialogPaperClass,
			}}
		>
			<DialogTitle disableTypography className={classes.dialogTitle}>
				良かったことを書いてみましょう
			</DialogTitle>
			<DialogContent className={classes.dialogContent}>
				<DialogContentText className={classes.dialogText}>
					{messages[inputDrawerIndex]}
				</DialogContentText>
			</DialogContent>
		</Dialog>
	);
};

export interface SimpleDialogProps2 {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const FirstCompleteDialog = (props: SimpleDialogProps2) => {
	const classes = useStyles();
	const dialogPaperClass = clsx(classes.dialogPaper, classes.dialogPaper4);
	const { open, setOpen } = props;

	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			classes={{
				paper: dialogPaperClass,
			}}
		>
			<DialogTitle disableTypography className={classes.dialogTitle}>
				👍 1個目の良かったこと 👍
				<br />
				入力完了！
			</DialogTitle>
			<DialogContent className={classes.dialogContent}>
				<DialogContentText className={classes.dialogText}>
					ナイスです！
				</DialogContentText>
				<DialogContentText className={classes.dialogSubText}>
					なお良かったことをもっと詳細に書きたい時は、
					記入した内容が表示されている欄の下の「▼もっと詳しく書く」をクリックしてください
				</DialogContentText>
				<DialogButton
					label={"YAY!🙌"}
					color="secondary"
					onClickFunc={() => setOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	);
};

export const SecondClickDialog = (props: SimpleDialogProps) => {
	const classes = useStyles();
	const dialogPaperClass = clsx(
		classes.dialogPaper,
		classes.dialogPaper1,
		classes.dialogArrow
	);
	const { open } = props;
	return (
		<Dialog
			open={open}
			classes={{
				paper: dialogPaperClass,
			}}
		>
			<DialogTitle disableTypography className={classes.dialogTitle}>
				またこのボタンを押して、2個目を記入していきましょう✌
			</DialogTitle>
		</Dialog>
	);
};

export const ThirdClickDialog = (props: SimpleDialogProps) => {
	const classes = useStyles();
	const dialogPaperClass = clsx(
		classes.dialogPaper,
		classes.dialogPaper1,
		classes.dialogArrow
	);
	const { open } = props;
	return (
		<Dialog
			open={open}
			classes={{
				paper: dialogPaperClass,
			}}
		>
			<DialogTitle disableTypography className={classes.dialogTitle}>
				順調ですね、クリアまであと1個！😆
			</DialogTitle>
		</Dialog>
	);
};

export const FullCompleteDialog = (props: SimpleDialogProps2) => {
	const classes = useStyles();
	const router = useRouter();
	const dialogPaperClass = clsx(classes.dialogPaper, classes.dialogPaper4);
	const { cookies } = useReactCookies();
	const { open, setOpen } = props;
	const dispatch = useDispatch();
	const userId = useSelector(selectUid);
	const inDemo = router.pathname.includes("/demo/");
	const initialDiaries = createDummyDiaries();
	const devidedDiaries = useSelector(selectDevidedDiaries);
	const signupWithDemo = useSelector(selectSignupWithDemo);
	const isLoggedIn = !!parseInt(cookies.isLoggedIn, 10);

	React.useEffect(() => {
		if (!open) return;
		dispatch(setDiaryInDiaries(undefined));
		dispatch(setSignupWithDemo(true));
	}, [open]);

	const handleClose = () => {
		setOpen(false);
		if (userId) {
			setIsFirstLoginFalse(userId);
			dispatch(completeTutorial());
		}
	};
	const goSignup = () => {
		if (signupWithDemo) {
			const flattenedDiaries = flattenToDiaries(devidedDiaries);
			const newAddedDiaries = getNewAddedDiaries(
				initialDiaries,
				flattenedDiaries
			);
			dispatch(setNewDiariesInDemo(newAddedDiaries));
		}
		router.push("/signup");
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
				🎆 入力完了！お疲れ様です！ 🎆
			</DialogTitle>
			{!isLoggedIn && inDemo ? (
				<DialogContent className={classes.dialogContent}>
					<DialogContentText className={classes.dialogSubText}>
						three good thingsメソッドは1週間ほどから効果が出ると言われています。
						<br />
						登録して今日から始めてみませんか？
					</DialogContentText>

					<DialogButton
						label={"アカウント新規登録"}
						color="secondary"
						onClickFunc={goSignup}
					/>
					<SignupWithDemo />
					<div style={{ marginTop: 10 }}></div>
					<DialogButton
						label={"閉じる"}
						color="secondary"
						style="outlined"
						onClickFunc={handleClose}
					/>
				</DialogContent>
			) : (
				<DialogContent className={classes.dialogContent}>
					<DialogContentText className={classes.dialogText}>
						今日も良い一日でしたね😊
					</DialogContentText>
					<DialogContentText className={classes.dialogSubText}>
						three good thingsメソッドは1週間ほどから効果が出ると言われています。
						<br />
						画面左下のボタンから一覧も見れるので、続けて毎日の彩りを集めていきましょう🎨
					</DialogContentText>
					<DialogButton
						label={"チュートリアル終了"}
						color="secondary"
						onClickFunc={handleClose}
					/>
				</DialogContent>
			)}
		</Dialog>
	);
};

export const getNewAddedDiaries = (
	initialDiaries: Diary[],
	devidedDiaries: Diary[]
) => {
	const newAddedDiaries = devidedDiaries.filter((newDiary) => {
		return !initialDiaries.some(
			(oldDiary) => JSON.stringify(oldDiary) === JSON.stringify(newDiary)
		);
	});
	return newAddedDiaries;
};

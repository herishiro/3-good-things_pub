import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogButton from "components/modules/internalPages/DialogButton";
import { useDispatch } from "react-redux";
import { logout } from "context/slices/user";

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

export default function LogoutDialog() {
	const [open, setOpen] = React.useState(true);
	const handleClose = () => {
		setOpen(false);
	};
	return <SimpleDialog open={open} onClose={handleClose} />;
}

export interface SimpleDialogProps {
	open: boolean;
	onClose: () => void;
}
function SimpleDialog(props: SimpleDialogProps) {
	const classes = useStyles();
	const { onClose, open } = props;
	const dispatch = useDispatch();

	const onClickFunc = () => {
		dispatch(logout());
		onClose();
	};
	return (
		<Dialog
			aria-labelledby="simple-dialog-title"
			open={open}
			id="yesterday-dialog"
			classes={{
				paper: classes.dialogPaper,
			}}
		>
			<DialogTitle disableTypography className={classes.dialogTitle}>
				⚠️ログインセッション切れ
			</DialogTitle>
			<DialogContent className={classes.dialogContent}>
				<DialogContentText className={classes.dialogText}>
					お手数ですが再ログインをお願いいたします。
				</DialogContentText>
				<DialogButton
					label={"TOPへ戻る"}
					color="secondary"
					onClickFunc={onClickFunc}
				/>
			</DialogContent>
		</Dialog>
	);
}

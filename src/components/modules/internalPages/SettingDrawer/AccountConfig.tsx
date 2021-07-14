import { makeStyles, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { CurrentUserDisplay } from "components/gadget/internalPages/SettingDrawer";
import { clearError, deleteUser, selectError } from "context/slices/user";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogButton from "components/modules/internalPages/DialogButton";
import ErrorTextDisplay from "components/modules/externalPages/formSection/ErrorTextDisplay";

const useStyles = makeStyles((theme) => ({
	button: {
		padding: "3px 10px",
		marginTop: 15,
		fontWeight: "bold",
		fontSize: theme.typography.pxToRem(16),
	},
	outlined: {
		borderWidth: 2,
		["&:hover"]: {
			borderWidth: 2,
		},
	},
	dialogPaper: {
		[theme.breakpoints.down(350)]: {
			margin: 10,
		},
	},
	dialogTitle: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: "4.2vw",
		color: theme.palette.secondary.main,
		[theme.breakpoints.up("sm")]: {
			fontSize: theme.typography.h6.fontSize,
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
}));

export const AccountConfig = () => {
	const classes = useStyles();
	const [dialogOpen, setDialogOpen] = React.useState(false);
	return (
		<Container maxWidth="sm">
			<DeleteAccountDialog open={dialogOpen} setOpen={setDialogOpen} />
			<Typography variant="h5" color="primary">
				アカウント管理
			</Typography>
			<div style={{ marginTop: 30 }}>
				<CurrentUserDisplay />
				<Divider />
				<Button
					variant="outlined"
					color="secondary"
					disableElevation
					className={classes.button}
					onClick={() => setDialogOpen(true)}
					classes={{ outlined: classes.outlined }}
				>
					アカウントを削除
				</Button>
			</div>
		</Container>
	);
};

export interface SimpleDialogProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function DeleteAccountDialog(props: SimpleDialogProps) {
	const classes = useStyles();
	const { setOpen, open } = props;
	const dispatch = useDispatch();
	const userError = useSelector(selectError);

	const onDeleteButton = async () => {
		await dispatch(deleteUser());
	};
	const handleClose = () => {
		dispatch(clearError());
		setOpen(false);
	};
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			classes={{
				paper: classes.dialogPaper,
			}}
			style={{ zIndex: 9999 }}
		>
			<DialogTitle disableTypography className={classes.dialogTitle}>
				⚠️アカウントを削除すると
				<br />
				今まで入力したデータも全て削除されます
			</DialogTitle>
			<DialogContent className={classes.dialogContent}>
				<DialogContentText className={classes.dialogText}>
					後からの復旧は出来ませんのでご注意ください。
				</DialogContentText>
				<DialogButton
					label={"アカウントを削除する"}
					color="secondary"
					style="outlined"
					onClickFunc={onDeleteButton}
				/>
				{userError && (
					<div style={{ marginTop: 10 }}>
						<ErrorTextDisplay
							errorMsg={
								userError.includes("この操作は重要なため")
									? userError
									: "エラー：お手数ですが少し時間を置いて再度実行してください"
							}
						/>
					</div>
				)}
				<DialogButton
					label={"削除しない"}
					color="primary"
					style="outlined"
					onClickFunc={handleClose}
				/>
			</DialogContent>
		</Dialog>
	);
}

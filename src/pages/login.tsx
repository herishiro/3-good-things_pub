import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import LoginForm from "components/gadget/externalPages/LoginForm";
import FormLayout from "components/gadget/externalPages/FormLayout";
import AppTitle from "components/modules/externalPages/externalHeader/AppTitle";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		base: {
			backgroundColor: theme.palette.primary.light,
			height: "100%",
		},
		root: {
			padding: "3px 16px",
			fontWeight: "bold",
			fontSize: theme.typography.pxToRem(16),
			[theme.breakpoints.up("sm")]: {
				fontSize: theme.typography.pxToRem(20),
			},
		},
		anchorWrap: {
			display: "block",
			textAlign: "center",
		},
		anchor: {
			color: theme.palette.primary.main,
			textDecoration: "underline",
			fontSize: theme.typography.pxToRem(19),
		},
		title: {
			marginTop: 20,
		},
	})
);

export default function LoginPage() {
	const classes = useStyles();
	const headerNode = (
		<>
			<div className={classes.title}>
				<AppTitle />
			</div>
		</>
	);
	const formNode = (
		<>
			<LoginForm />
		</>
	);
	return (
		<div className={classes.base}>
			<FormLayout
				title="ログイン画面"
				headerNode={headerNode}
				formNode={formNode}
			/>
		</div>
	);
}

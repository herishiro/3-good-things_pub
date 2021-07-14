import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { SecondaryThemeProvider } from "styles/theme";
import FormLayout from "components/gadget/externalPages/FormLayout";
import SignupForm from "components/gadget/externalPages/SignupForm";
import AppTitle from "components/modules/externalPages/externalHeader/AppTitle";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		base: {
			backgroundColor: theme.palette.secondary.light,
			height: "100%",
		},
		title: {
			marginTop: 20,
		},
	})
);

export default function SigninPage() {
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
			<SignupForm />
		</>
	);
	return (
		<SecondaryThemeProvider>
			<div className={classes.base}>
				<FormLayout
					title="3 Good Things!"
					headerNode={headerNode}
					formNode={formNode}
				/>
			</div>
		</SecondaryThemeProvider>
	);
}

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import FormLayout from "components/gadget/externalPages/FormLayout";
import IndexForm from "components/gadget/externalPages/IndexForm";
import AppTitle from "components/modules/externalPages/externalHeader/AppTitle";
import TopImage from "components/modules/externalPages/externalHeader/TopImage";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		base: {
			backgroundColor: theme.palette.primary.light,
			height: "100%",
		},
	})
);

export default function IndexPage() {
	const classes = useStyles();
	const headerNode = (
		<>
			<AppTitle />
			<TopImage />
		</>
	);

	const formNode = (
		<>
			<IndexForm />
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

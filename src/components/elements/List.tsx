import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		list: {
			width: "100%",
			maxWidth: "auto",
			backgroundColor: "rgba(0,0,0,0)",
		},
	})
);

type Prop = {
	children: JSX.Element[];
};
function NestedList({ children }: Prop) {
	const classes = useStyles();

	return (
		<List
			component="ul"
			aria-labelledby="nested-list-subheader"
			className={classes.list}
			disablePadding
		>
			{children}
		</List>
	);
}

export default NestedList;

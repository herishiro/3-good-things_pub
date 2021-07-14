import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: "relative",
			color: theme.palette.primary.light,
			fontFamily: ["Nunito", theme.typography.fontFamily].join(","),
			fontSize: theme.typography.pxToRem(28),
			pointerEvents: "none",
			textAlign: "center",
		},
		inner: {
			position: "relative",
			display: "inline-block",
			top: 12,
		},
	})
);

type Prop = {
	title: string;
};

export default function PageTitle({ title }: Prop) {
	const classes = useStyles();
	return (
		<Box className={classes.root}>
			<Box className={classes.inner}>{title}</Box>
		</Box>
	);
}

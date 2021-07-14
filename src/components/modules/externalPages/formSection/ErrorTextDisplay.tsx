import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: theme.spacing(2),
			backgroundColor: theme.palette.primary.light,
			borderRadius: 10,
		},
	})
);

type Props = {
	errorMsg: string;
};
export default function ErrorTextDisplay({ errorMsg }: Props) {
	const classes = useStyles();
	return (
		<>
			<Box className={classes.root}>{errorMsg}</Box>
		</>
	);
}

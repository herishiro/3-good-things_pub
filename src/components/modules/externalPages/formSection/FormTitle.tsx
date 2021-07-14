import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		title: {
			marginBottom: 20,
		},
	})
);

type Props = {
	title: string;
};
export default function BasicButton({ title }: Props) {
	const classes = useStyles();
	return (
		<>
			<Typography
				variant="h5"
				color="primary"
				align="center"
				className={classes.title}
			>
				{title}
			</Typography>
		</>
	);
}

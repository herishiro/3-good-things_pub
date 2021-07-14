import React from "react";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	card: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		"box-shadow": "none",
		backgroundColor: "#fff",
		borderRadius: 0,
		borderTop: `3px solid ${theme.palette.primary.light}`,
		borderBottom: `3px solid ${theme.palette.primary.light}`,
		fontFamily: ["Nunito", theme.typography.fontFamily].join(","),
		["&:not(:first-child)"]: {
			marginTop: "40px",
		},
		[theme.breakpoints.up("sm")]: {
			borderRadius: 4,
			border: `3px solid ${theme.palette.primary.light}`,
		},
	},
	contentWrapper: {
		padding: 40,
		textAlign: "center",
		color: theme.palette.primary.light,
	},
	number: {
		fontSize: theme.typography.pxToRem(60),
	},
	text: {
		fontSize: theme.typography.pxToRem(30),
	},
}));

type Props = {
	index: number;
};
export default function CardSkelton({ index }: Props) {
	const classes = useStyles();
	const contents = ["is Good!", "is Great!!", "is Perfect!!!"];
	return (
		<Card className={classes.card}>
			<div className={classes.contentWrapper}>
				<div className={classes.number}>{index + 1}</div>
				<div className={classes.text}>{contents[index]}</div>
			</div>
		</Card>
	);
}

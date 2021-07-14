import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		wrapper: {
			textAlign: "center",
		},
		anchor: {
			color: theme.palette.primary.main,
			textDecoration: "none",
			fontSize: theme.typography.pxToRem(20),
			fontWeight: theme.typography.fontWeightBold,
			opacity: 1,
			transition: "0.2s",
			["&:hover"]: {
				opacity: 0.7,
			},
		},
	})
);

type Props = {
	label: string;
	destination: string;
};
export default function SimpleLink({ label, destination }: Props) {
	const classes = useStyles();
	return (
		<div className={classes.wrapper}>
			<Link href={destination}>
				<a className={classes.anchor}>{label}</a>
			</Link>
		</div>
	);
}

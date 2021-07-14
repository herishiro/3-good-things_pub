import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ListItem from "components/elements/ListItem";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		item: {
			padding: 0,
			["&:last-child"]: {
				marginBottom: 8,
			},
			["& div"]: {
				marginTop: 0,
			},
		},
		itemWrap: {
			margin: 0,
			marginLeft: 60,
			marginTop: 10,
		},
		label: {
			fontSize: theme.typography.pxToRem(11),
			color: theme.palette.grey[600],
		},
		value: {
			marginTop: 5,
			fontSize: theme.typography.pxToRem(13),
			color: theme.palette.grey[700],
			marginInlineStart: "0rem",
			fontWeight: theme.typography.fontWeightBold,
			lineHeight: "200%",
			paddingRight: 10,
			lineBreak: "anywhere",
		},
	})
);

type Prop = {
	label: string;
	value: string;
};
export default function DetailItem({ label, value }: Prop) {
	const classes = useStyles();
	const item = (
		<dl className={classes.itemWrap}>
			<dt className={classes.label}>{label}</dt>
			<dd className={classes.value}>{value}</dd>
		</dl>
	);
	return <ListItem label={item} classes={classes} />;
}

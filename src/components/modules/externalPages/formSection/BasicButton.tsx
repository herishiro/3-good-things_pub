import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: "3px 16px",
			fontWeight: "bold",
			fontSize: theme.typography.pxToRem(18),
		},
		outlined: {
			borderWidth: 2,
			["&:hover"]: {
				borderWidth: 2,
			},
		},
	})
);

type Props = {
	label: string | JSX.Element;
	color: "primary" | "secondary";
	style?: "contained" | "outlined";
	onClickFunc: () => any;
};
export default function BasicButton({
	label,
	color,
	onClickFunc,
	style = "contained",
}: Props) {
	const classes = useStyles();
	return (
		<>
			<Button
				variant={style}
				color={color}
				fullWidth
				disableElevation
				className={classes.root}
				onClick={onClickFunc}
				classes={{ outlined: classes.outlined }}
			>
				{label}
			</Button>
		</>
	);
}

import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			padding: "3px 10px",
			marginTop: 15,
			fontWeight: "bold",
			fontSize: theme.typography.pxToRem(20),
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
export default function DialogButton({
	label,
	color,
	style = "contained",
	onClickFunc,
}: Props) {
	const classes = useStyles();
	return (
		<>
			<Button
				variant={style}
				color={color}
				fullWidth
				disableElevation
				className={classes.button}
				onClick={onClickFunc}
				classes={{ outlined: classes.outlined }}
			>
				{label}
			</Button>
		</>
	);
}

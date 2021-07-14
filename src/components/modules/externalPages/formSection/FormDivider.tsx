import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		divider: {
			position: "relative",
			width: "100%",
			height: 35,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			marginTop: 10,
			color: theme.palette.primary.main,
			fontWeight: "bold",
			fontSize: theme.typography.pxToRem(20),
			zIndex: 1,
			fontFamily: ["Nunito", theme.typography.fontFamily].join(","),
			lineHeight: "25px",
			"&::before": {
				content: '""',
				width: "100%",
				height: 2,
				display: "block",
				position: "absolute",
				backgroundColor: theme.palette.primary.main,
				zIndex: "-1",
				borderRadius: 10,
			},
		},
		dividerText: {
			padding: 5,
			backgroundColor: "#fff",
		},
	})
);
function FormDivider() {
	const classes = useStyles();
	return (
		<div className={classes.divider}>
			<span className={classes.dividerText}>OR</span>
		</div>
	);
}

export default FormDivider;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	button: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
		left: "1px",
		width: "40px",
		height: "35px",
		minWidth: "auto",
		flexShrink: 0,
		padding: 0,
		textAlign: "center",
		backgroundColor: "#fff",
		borderRadius: "4px 0 0 4px",
		border: "1px solid",
		borderColor: theme.palette.grey["300"],
		fontSize: theme.typography.pxToRem(19),
		boxSizing: "border-box",
	},
	form: {
		display: "flex",
		alignItems: "center",
		flexBasis: "100%",
		height: "35px",
		boxSizing: "border-box",
		paddingLeft: 10,
		backgroundColor: "#fff",
		borderRadius: "0 4px 4px 0",
		border: "1px solid",
		borderColor: theme.palette.grey["300"],
		fontSize: "3.5vw",
		color: theme.palette.grey[700],
		[theme.breakpoints.up("sm")]: {
			fontSize: theme.typography.pxToRem(18),
		},
	},
}));

const CategoryIconDisplay = ({ emoji }: { emoji: string }) => {
	const classes = useStyles();
	return (
		<>
			<div aria-haspopup="true" className={classes.button}>
				{emoji}
			</div>
		</>
	);
};

const CategoryNameDisplay = ({ text }: { text: string }) => {
	const classes = useStyles();
	return <div className={classes.form}>{text}</div>;
};

type Props = {
	emoji: string;
	text: string;
};
export const EmojiTarouDisplay = ({ emoji, text }: Props) => {
	return (
		<div style={{ display: "flex" }}>
			<CategoryIconDisplay emoji={emoji} />
			<CategoryNameDisplay text={text} />
		</div>
	);
};

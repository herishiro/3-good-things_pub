import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: 10,
			padding: theme.spacing(2),
			backgroundColor: theme.palette.grey[200],
			borderRadius: 10,
			textAlign: "center",
		},
	})
);

export default function ResetCompleteDisplay() {
	const classes = useStyles();
	return (
		<>
			<Box className={classes.root}>
				<p style={{ marginTop: 0 }}>
					パスワードリセット用のURLを
					<br />
					入力されたメールアドレスにお送りしました。
				</p>
				<p style={{ marginBottom: 0 }}>
					メールの案内に従い手続きを完了させてください。
				</p>
			</Box>
		</>
	);
}

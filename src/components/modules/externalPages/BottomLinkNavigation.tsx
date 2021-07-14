import { Container } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import React from "react";
import DialogButton from "components/modules/internalPages/DialogButton";
import { useRouter } from "next/router";
import { format } from "date-fns";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		bottomNavRoot: {
			width: "100%",
			position: "fixed",
			display: "block",
			height: 70,
			bottom: 0,
			left: 0,
			right: 0,
			margin: "auto",
			paddingBottom: 15,
			boxShadow: "1px 3px 8px 2px rgba(0,0,0,0.4);",
			backgroundColor: "#fff",
			zIndex: 1301, //inputDrawer 1300/ settingDrawer 1302
		},
		navButtonWrap: {
			display: "flex",
			alignItems: "center",
			height: "100%",
			[`& button`]: {
				margin: 0,
				fontSize: theme.typography.pxToRem(16),
			},
			[theme.breakpoints.up(350)]: {
				[`& button`]: {
					margin: 0,
					fontSize: theme.typography.pxToRem(20),
				},
			},
		},
	})
);

export function BottomLinkNavigation() {
	const classes = useStyles();
	const router = useRouter();
	const today = format(new Date(), "yyyy/MM/dd");
	return (
		<div className={classes.bottomNavRoot}>
			<Container maxWidth="sm" className={classes.navButtonWrap}>
				<DialogButton
					label="デモページへ"
					style="contained"
					color="secondary"
					onClickFunc={() => router.push(`/demo/input/${today}`)}
				/>
				<div style={{ width: "4vw" }}></div>
				<DialogButton
					label="使い始める"
					style="contained"
					color="primary"
					onClickFunc={() => router.push("/signup")}
				/>
			</Container>
		</div>
	);
}

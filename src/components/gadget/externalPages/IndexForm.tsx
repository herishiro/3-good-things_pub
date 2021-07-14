import React from "react";
import { useRouter } from "next/router";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import BasicButton from "components/modules/externalPages/formSection/BasicButton";
import FormDivider from "components/modules/externalPages/formSection/FormDivider";
import { format } from "date-fns";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formLayout: {
			height: "100%",
			width: "90%",
			maxWidth: 300,
			margin: "auto",
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			[theme.breakpoints.up("sm")]: {
				height: "auto",
				minHeight: "90%",
				width: "80%",
				maxWidth: "none",
			},
			["@media (min-height:800px)"]: {
				minHeight: "40vh",
			},
			["@media (min-height:800px) and (max-width: 500px)"]: {
				maxHeight: 350,
			},
		},
		marginTop: {
			marginTop: "7vw",
			[theme.breakpoints.up("sm")]: {
				marginTop: 30,
			},
		},
		anchorWrap: {
			display: "block",
			marginBottom: 50,
			textAlign: "center",
		},
		anchor: {
			color: theme.palette.primary.main,
			textDecoration: "underline",
			fontSize: theme.typography.pxToRem(19),
		},
	})
);

export default function IndexForm() {
	const classes = useStyles();
	const router = useRouter();
	const today = format(new Date(), "yyyy/MM/dd");

	const DemoLabel = (
		<div>
			デモを使う <span style={{ fontSize: "0.7em" }}>(ログイン不要)</span>
		</div>
	);
	return (
		<>
			<div className={classes.formLayout}>
				<div>
					<BasicButton
						label="このアプリって何？"
						color="secondary"
						style="outlined"
						onClickFunc={() => router.push("/about")}
					/>
					<div className={classes.marginTop}>
						<BasicButton
							label={DemoLabel}
							color="secondary"
							onClickFunc={() => router.push(`/demo/input/${today}`)}
						/>
					</div>
				</div>
				<FormDivider />
				<div>
					<BasicButton
						label="新規アカウント登録"
						color="primary"
						style="outlined"
						onClickFunc={() => router.push("/signup")}
					/>
					<div className={classes.marginTop}>
						<BasicButton
							label="ログイン"
							color="primary"
							onClickFunc={() => router.push("/login")}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

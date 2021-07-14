import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import { selectSelectedPeriod } from "context/slices/diaries";
import BasicButton from "components/modules/externalPages/formSection/BasicButton";
import { Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { format } from "date-fns";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "80%",
			margin: `${theme.spacing(3)}px auto 0`,
			padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
			backgroundColor: theme.palette.secondary.light,
			borderRadius: 10,
			boxSizing: "border-box",
		},
		title: {
			textAlign: "center",
			marginBottom: 15,
		},
	})
);

export default function NoLogDisplay() {
	const classes = useStyles();
	const selectedPeriod = useSelector(selectSelectedPeriod);
	const router = useRouter();
	const today = format(new Date(), "yyyy/MM/dd");
	const inputPath = router.pathname.includes("/demo/log")
		? "/demo/input"
		: "/input";
	return (
		<>
			{selectedPeriod === "all" ? (
				<Box className={classes.root}>
					<Typography variant="body1" className={classes.title}>
						まだ記録がありません
					</Typography>
					<BasicButton
						label="今日、良かったことは何ですか？😊"
						color="secondary"
						onClickFunc={() => router.push(`${inputPath}/${today}`)}
					/>
				</Box>
			) : (
				<Box className={classes.root}>この月は記録がありません</Box>
			)}
		</>
	);
}

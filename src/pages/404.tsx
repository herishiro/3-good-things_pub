import { completeLoading } from "context/slices/user";
import React from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		background: {
			width: "100vw",
			height: "100vh",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "column",
			backgroundColor: theme.palette.primary.light,
		},
		image: {
			// animation: `$item 1000ms both infinite ${theme.transitions.easing.sharp}`,
		},
		text: {
			marginTop: 20,
			fontSize: theme.typography.pxToRem(20),
			color: theme.palette.grey[800],
			fontWeight: "bold",
		},
	})
);

export default function Custom404() {
	const classes = useStyles();
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(completeLoading());
	}, []);
	return (
		<div className={classes.background}>
			<div className={classes.image}>
				<Image src="/images/404.svg" width={110} height={110} />
			</div>
			<div className={classes.text}>404 - Page Not Found</div>
			<div className={classes.text}>このページは存在しません</div>
		</div>
	);
}

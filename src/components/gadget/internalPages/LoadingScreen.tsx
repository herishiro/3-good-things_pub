import React from "react";
import Image from "next/image";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import LogoutDialog from "components/gadget/internalPages/LogoutDialog";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		background: {
			width: "100vw",
			height: "100vh",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: theme.palette.primary.light,
		},
		image: {
			animation: `$item 1000ms both infinite ${theme.transitions.easing.sharp}`,
		},
		"@keyframes item": {
			"0%": {
				transform: "scale(0.8)",
			},
			"60%": {
				transform: "scale(1.5)",
			},
			"100%": {
				transform: "scale(0.8)",
			},
		},
	})
);

export default function LoadingScreen() {
	const classes = useStyles();
	const [lordingTimeout, setLordingTimeout] = React.useState(false);
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
		const timer = setTimeout(() => {
			setLordingTimeout(true);
		}, 5000);
		return () => clearTimeout(timer);
	}, []);

	if (!mounted) return <></>;
	if (lordingTimeout) {
		return (
			<div className={classes.background}>
				<LogoutDialog />
			</div>
		);
	}
	return (
		<div className={classes.background}>
			<div className={classes.image}>
				<Image src="/images/3GT-logo.svg" width={100} height={100} />
			</div>
		</div>
	);
}

import React from "react";
import Image from "next/image";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "48vw",
			margin: "20px auto 10px",
			[theme.breakpoints.up(500)]: {
				width: 150,
			},
			[theme.breakpoints.up("sm")]: {
				width: 200,
			},
		},
		image1: {
			marginTop: 5,
			animation: `$item 1500ms both ${theme.transitions.easing.sharp}`,
		},
		image2: {
			marginTop: 5,
			animation: `$item 1500ms 500ms both ${theme.transitions.easing.sharp}`,
		},
		image3: {
			marginTop: 5,
			animation: `$item 1500ms 1000ms both ${theme.transitions.easing.sharp}`,
		},
		"@keyframes item": {
			"0%": {
				opacity: 0,
				transform: "translateY(400%) scale(1)",
			},
			"60%": {
				opacity: 1,
				transform: "translateY(0) scale(1.2)",
			},
			"100%": {
				opacity: 1,
				transform: "translateY(0) scale(1)",
			},
		},
	})
);

export default function TopImage() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.image1}>
				<Image
					src="/images/topImage1.png"
					alt="Picture of the author"
					width={500}
					height={93}
				/>
			</div>
			<div className={classes.image2}>
				<Image
					src="/images/topImage2.png"
					alt="Picture of the author"
					width={500}
					height={93}
				/>
			</div>
			<div className={classes.image3}>
				<Image
					src="/images/topImage3.png"
					alt="Picture of the author"
					width={500}
					height={93}
				/>
			</div>
		</div>
	);
}

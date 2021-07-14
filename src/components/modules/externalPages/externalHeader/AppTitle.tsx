import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			textAlign: "center",
			color: "#fff",
			textShadow: `1px 2px 3px ${theme.palette.primary.main}`,
		},
		subTitle: {
			fontSize: "4vw",
			letterSpacing: "0.1rem",
			[theme.breakpoints.up(500)]: {
				fontSize: theme.typography.subtitle1.fontSize,
			},
			[theme.breakpoints.up("sm")]: {
				fontSize: theme.typography.h6.fontSize,
			},
		},
		title: {
			fontSize: "12vw",
			fontWeight: theme.typography.fontWeightBold,
			fontFamily: ["Nunito", theme.typography.fontFamily].join(","),
			[theme.breakpoints.up(500)]: {
				fontSize: theme.typography.h3.fontSize,
			},
			[theme.breakpoints.up("sm")]: {
				fontSize: theme.typography.h2.fontSize,
			},
		},
	})
);

function AppTitle() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<div className={classes.subTitle}>Happiness Diary</div>
			<div className={classes.title}>3 Good Things!</div>
		</div>
	);
}

export default AppTitle;

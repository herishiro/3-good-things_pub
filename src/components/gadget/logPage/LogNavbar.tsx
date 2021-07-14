import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import PeriodSelect from "components/modules/logPage/logNavibar/PeriodSelect";
import ShowEmptyCheckBox from "components/modules/logPage/logNavibar/ShowEmptyCheckBox";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		box: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			paddingTop: theme.spacing(1.5),
			paddingBottom: theme.spacing(1.5),
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2),
			borderRadius: "9px 9px 0 0",
			backgroundColor: theme.palette.primary.light,
			[theme.breakpoints.up("sm")]: {
				paddingLeft: theme.spacing(4),
				paddingRight: theme.spacing(4),
			},
		},
	})
);

export default function LogNaviBar() {
	const classes = useStyles();
	return (
		<Box className={classes.box}>
			<PeriodSelect />
			<ShowEmptyCheckBox />
		</Box>
	);
}

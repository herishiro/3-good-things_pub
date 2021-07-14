import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getMonthsAfterSignUp } from "libs/userInfo";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchDiaries,
	fetchDiariesInMonth,
	getDemoDiariesByPeriod,
	selectOldestDiary,
	selectSelectedPeriod,
	setSelectedPeriod,
} from "context/slices/diaries";
import { selectUid } from "context/slices/user";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			minWidth: 120,
			color: theme.palette.primary.main,
			[`& fieldset`]: {
				borderColor: theme.palette.primary.light,
				borderWidth: "1px",
			},
		},
		selectMenu: {
			color: theme.palette.primary.main,
			fontWeight: theme.typography.fontWeightBold,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
		root: {
			padding: "5px 26px 5px 10px",
			fontSize: theme.typography.subtitle2.fontSize,
			backgroundColor: "#ffffff",
			borderColor: theme.palette.primary.main,
			["&:focus"]: {
				backgroundColor: "#ffffff",
				borderRadius: 4,
			},
		},
		menuItemRoot: {
			minHeight: "auto",
			fontSize: theme.typography.subtitle2.fontSize,
		},
	})
);

export default function PeriodSelect() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const userId = useSelector(selectUid);
	const oldestDiary = useSelector(selectOldestDiary);
	const selectedPeriod = useSelector(selectSelectedPeriod);
	const router = useRouter();
	const inDemo = router.pathname.includes("/demo/");

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		const selectedValue = event.target.value as string;
		dispatch(setSelectedPeriod(selectedValue));
		if (inDemo) {
			if (selectedValue === "all") {
				dispatch(getDemoDiariesByPeriod(selectedValue));
			} else {
				dispatch(getDemoDiariesByPeriod(selectedValue));
			}
			return;
		}
		if (!userId) return;
		if (selectedValue === "all") {
			dispatch(fetchDiaries({ userId, howMany: 10 }));
		} else {
			dispatch(fetchDiariesInMonth({ userId, selectedValue }));
		}
	};
	const months = getMonthsAfterSignUp(oldestDiary?.date.seconds);
	return (
		<FormControl variant="outlined" className={classes.formControl}>
			<Select
				labelId="demo-simple-select-outlined-label"
				id="demo-simple-select-outlined"
				value={selectedPeriod}
				onChange={handleChange}
				classes={{
					root: classes.root,
					select: classes.selectMenu,
				}}
			>
				<MenuItem
					value="all"
					classes={{
						root: classes.menuItemRoot,
					}}
					key="all"
				>
					全ログ表示
				</MenuItem>
				{months.map((month) => (
					<MenuItem
						value={month}
						classes={{
							root: classes.menuItemRoot,
						}}
						key={month}
					>
						{month}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

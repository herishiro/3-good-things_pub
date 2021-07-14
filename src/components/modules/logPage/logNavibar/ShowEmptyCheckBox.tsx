import React, { useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { useDispatch, useSelector } from "react-redux";
import {
	addEmpty,
	removeEmpty,
	selectSelectedPeriod,
} from "context/slices/diaries";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			margin: 0,
			["& span"]: {
				padding: 0,
			},
		},
		label: {
			fontSize: theme.typography.subtitle2.fontSize,
			color: theme.palette.grey[800],
			fontWeight: theme.typography.fontWeightBold,
		},
	})
);

export default function ShowEmptyCheckBox() {
	const classes = useStyles();
	const [checked, setChecked] = React.useState(true);
	const dispatch = useDispatch();
	const selectedPeriod = useSelector(selectSelectedPeriod);

	useEffect(() => {
		setChecked(true);
	}, [selectedPeriod]);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
		if (event.target.checked) {
			dispatch(removeEmpty());
		} else {
			dispatch(addEmpty());
		}
	};
	const checkBox =
		selectedPeriod !== "all" ? (
			<Checkbox color="primary" checked={checked} onChange={handleChange} />
		) : (
			<Checkbox color="primary" checked={checked} disabled />
		);
	return (
		<FormControl component="fieldset">
			<FormControlLabel
				value="start"
				control={checkBox}
				label="記録済のみ表示"
				labelPlacement="start"
				className={classes.root}
				classes={{
					label: classes.label,
				}}
			/>
		</FormControl>
	);
}

import clsx from "clsx";
import React, { ChangeEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/styles";
import { useInputText } from "context/providers/inputText";

const useStylesBase = makeStyles((theme) => ({
	field: {
		backgroundColor: "#fff",
		borderRadius: "4px",
		[`& fieldset`]: {
			borderWidth: "1px",
		},
		[`& .MuiOutlinedInput-multiline`]: {
			paddingBottom: 35,
		},
		[`& .MuiFormHelperText-contained`]: {
			position: "absolute",
			bottom: 10,
			right: 15,
			margin: 0,
			fontSize: theme.typography.pxToRem(16),
		},
		[`& fieldset.MuiOutlinedInput-notchedOutline`]: {
			borderColor: `${theme.palette.grey["300"]} !important`,
		},
	},
	error: {
		[`& .MuiFormHelperText-contained`]: {
			color: theme.palette.primary.main,
		},
	},

	form: {
		flexBasis: "100%",
		[`& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline`]: {
			borderColor: theme.palette.primary.main,
		},
		[`& label`]: {
			textShadow: `-2px -2px 0 #fff,
			2px -2px 0 #fff,
			-2px 2px 0 #fff,
			 2px 2px 0 #fff;`,
		},
	},
}));

type Props = {
	maxlength: number;
	classes?: ClassNameMap;
	label?: string;
	multiline?: boolean;
	rowsMax?: number;
	placeholder?: string;
	onBlurFunc?: () => void;
};

const OutlinedTextField = (props: Props) => {
	const {
		classes,
		maxlength,
		label,
		multiline,
		rowsMax,
		placeholder,
		onBlurFunc,
	} = props;
	const classesBase = useStylesBase();
	const fieldClass = clsx(classes && classes.field, classesBase.field);
	const formClass = clsx(classes && classes.form, classesBase.form);
	const { inputText, setInputText } = useInputText();
	const getInputText = (event: ChangeEvent<HTMLInputElement>) => {
		if (inputText !== undefined) {
			setInputText(event.target.value);
		}
	};
	return (
		<form noValidate autoComplete="off" className={formClass}>
			<TextField
				className={fieldClass}
				inputProps={{
					maxLength: maxlength,
				}}
				InputProps={{
					classes: { error: classesBase.error },
				}}
				error={inputText.length >= maxlength}
				helperText={`${inputText.length}/${maxlength}`}
				value={inputText}
				label={label}
				placeholder={placeholder}
				variant="outlined"
				fullWidth
				size="small"
				multiline={multiline}
				rowsMax={rowsMax}
				onChange={getInputText}
				onKeyDown={(e) => {
					if (e.key === "Enter" && !multiline) {
						e.preventDefault();
					}
				}}
				onBlur={onBlurFunc}
			/>
		</form>
	);
};

export default OutlinedTextField;

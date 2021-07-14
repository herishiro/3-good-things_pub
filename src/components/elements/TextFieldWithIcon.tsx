import clsx from "clsx";
import React, { ChangeEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { useInputText } from "context/providers/inputText";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
const useStylesBase = makeStyles((theme) => ({
	field: {
		backgroundColor: "#fff",
		borderRadius: "4px",
		[`& fieldset`]: {
			borderColor: theme.palette.grey["300"],
			borderWidth: "1px",
		},
	},
	form: {
		[`&:not(:first-child)`]: {
			marginTop: 10,
		},
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
	icon: {
		color: theme.palette.grey[700],
		["& input:focus"]: {
			color: theme.palette.primary.main,
		},
	},
}));

type Props = {
	label: string;
	value: string;
	iconComponent: JSX.Element;
	hidable?: boolean;
	inputType?: string;
	classes?: ClassNameMap;
	onKeyDownFunc?: () => void;
};
const OutlinedTextField = (props: Props) => {
	const {
		classes,
		label,
		value,
		iconComponent,
		inputType = "text",
		hidable = false,
		onKeyDownFunc,
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

	const [showPassword, setShowPassword] = React.useState(false);
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};
	return (
		<form noValidate autoComplete="off" className={formClass}>
			{hidable ? (
				<TextField
					fullWidth
					size="small"
					type={showPassword ? inputType : "password"}
					className={fieldClass}
					value={value}
					placeholder={label}
					variant="outlined"
					onChange={getInputText}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							if (onKeyDownFunc) onKeyDownFunc();
						}
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start" className={classesBase.icon}>
								{iconComponent}
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => {
										setShowPassword(!showPassword);
									}}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			) : (
				<TextField
					className={fieldClass}
					type={inputType}
					value={value}
					placeholder={label}
					variant="outlined"
					fullWidth
					size="small"
					onChange={getInputText}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
						}
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start" className={classesBase.icon}>
								{iconComponent}
							</InputAdornment>
						),
					}}
				/>
			)}
		</form>
	);
};

export default OutlinedTextField;

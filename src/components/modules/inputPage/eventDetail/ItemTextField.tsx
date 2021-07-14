import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/styles";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import OutlinedTextField from "components/elements/OutlinedTextField";
import { EventDetailLabel } from "interfaces/index";
import { useInputTextWithDiaryCtx } from "libs/diaries";
import { TextFieldLabel } from "interfaces/index";
import { InputTextProvider } from "context/providers/inputText";
import { useDispatch, useSelector } from "react-redux";
import {
	selectDiary,
	selectField,
	updateTextField,
} from "context/slices/diary";
import type { RootState } from "context/reduxStore";

const useMultiFieldStyles = makeStyles(() => ({
	root: {
		padding: "8px 16px 8px",
		display: "block",
	},
	field: {
		minHeight: "100px",
		[`& fieldset`]: {
			minHeight: "calc(100px + 4px)",
		},
		[`& textarea`]: {
			minHeight: "calc(80px + 4px)",
		},
	},
}));

const useSingleFieldStyles = makeStyles(() => ({
	field: {
		marginTop: 10,
	},
}));

type Prop = {
	index: number;
	label: EventDetailLabel;
};
export default function ItemTextFieldWrapper(props: Prop) {
	const { index, label } = props;
	const multiClasses = useMultiFieldStyles();
	const singleClasses = useSingleFieldStyles();
	return (
		<AccordionDetails className={multiClasses.root}>
			{label === "その時とその後の気分" ? (
				<>
					<ItemTextField
						classes={singleClasses}
						index={index}
						fieldLabel="その時の気分"
					/>
					<ItemTextField
						classes={singleClasses}
						index={index}
						fieldLabel="その後の気分"
					/>
				</>
			) : (
				<ItemTextField
					classes={multiClasses}
					index={index}
					fieldLabel={label}
				/>
			)}
		</AccordionDetails>
	);
}

type Prop2 = {
	classes: ClassNameMap;
	index: number;
	fieldLabel: TextFieldLabel;
};
export function ItemTextField(props: Prop2) {
	const diary = useSelector(selectDiary);
	const dispatch = useDispatch();
	if (!diary) {
		return <></>;
	}
	const { classes, index, fieldLabel } = props;
	const field = useSelector((state: RootState) =>
		selectField(state, index, fieldLabel)
	);
	if (!field) throw new Error("");
	const { inputText, setInputText } = useInputTextWithDiaryCtx({
		diary,
		index,
		name: field.name,
	});
	const label = ["その時の気分", "その後の気分"].includes(field.label)
		? field.label
		: "";

	const onBlur = () => {
		dispatch(
			updateTextField({
				cardIndex: index,
				label: field.name,
				newValue: inputText,
			})
		);
	};
	return (
		<InputTextProvider inputText={inputText} setInputText={setInputText}>
			<OutlinedTextField
				classes={classes}
				multiline={true}
				label={label}
				maxlength={500}
				onBlurFunc={onBlur}
			/>
		</InputTextProvider>
	);
}

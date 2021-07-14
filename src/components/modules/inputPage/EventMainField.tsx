import { makeStyles } from "@material-ui/core/styles";
import OutlinedTextField from "components/elements/OutlinedTextField";
import { useInputTextWithDiaryCtx } from "libs/diaries";
import { InputTextProvider } from "context/providers/inputText";
import { selectDiary } from "context/slices/diary";
import { useDispatch, useSelector } from "react-redux";
import { setInputButtonDisabled } from "context/slices/ui";
import { useEffect } from "react";

const useStyles = makeStyles(() => ({
	field: {
		minHeight: "130px",
		[`& fieldset`]: {
			minHeight: "calc(130px + 4px)",
		},
		[`& textarea`]: {
			minHeight: "calc(110px + 4px)",
		},
	},
}));

type Props = {
	index: number;
};
export default function EventMainField({ index }: Props) {
	const diary = useSelector(selectDiary);
	const classes = useStyles();

	if (!diary) {
		return <></>;
	}
	const { inputText, setInputText } = useInputTextWithDiaryCtx({
		diary,
		index,
		name: "title",
	});
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setInputButtonDisabled(!inputText));
	}, [inputText]);

	return (
		<div style={{ marginTop: 20 }}>
			<InputTextProvider inputText={inputText} setInputText={setInputText}>
				<OutlinedTextField
					classes={classes}
					placeholder="今日良かったことは何ですか？ 下のリストから選んで挿入も出来ます🔍"
					multiline={true}
					rowsMax={5}
					maxlength={200}
				/>
			</InputTextProvider>
		</div>
	);
}

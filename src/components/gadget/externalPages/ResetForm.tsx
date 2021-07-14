import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { resetPassword } from "libs/firebase/auth";
import { initInputText } from "context/providers/inputText";
import EmailFieldWithProvider from "components/modules/externalPages/formSection/EmailFieldWithProvider";
import BasicButton from "components/modules/externalPages/formSection/BasicButton";
import SimpleLink from "components/modules/externalPages/formSection/SimpleLink";
import FormTitle from "components/modules/externalPages/formSection/FormTitle";
import ErrorTextDisplay from "components/modules/externalPages/formSection/ErrorTextDisplay";
import ResetCompleteDisplay from "components/modules/externalPages/formSection/ResetCompleteDisplay";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formLayout: {
			height: "100%",
			display: "flex",
			width: "100%",
			maxWidth: 300,
			margin: "auto",
			flexDirection: "column",
			justifyContent: "space-between",
			[theme.breakpoints.up("sm")]: {
				height: "auto",
				minHeight: "80%",
				width: "80%",
				maxWidth: "none",
			},
		},
		form: {
			["& > button"]: {
				marginTop: 20,
			},
		},
	})
);

export default function ResetForm() {
	const classes = useStyles();
	const { inputText: email, setInputText: setEmail } = initInputText();
	const { inputText: errorMsg, setInputText: setErrorMsg } = initInputText();
	const { inputText: completeMsg, setInputText: setCompleteMsg } =
		initInputText();

	const submitHandler = async () => {
		await setErrorMsg("");
		await setCompleteMsg("");
		const { res, error } = await resetPassword({ email });
		if (res) {
			await setCompleteMsg(res);
		} else {
			await setErrorMsg(error);
		}
	};

	return (
		<>
			<div className={classes.formLayout}>
				<div className={classes.form}>
					<FormTitle title="パスワードをリセット" />
					{errorMsg && <ErrorTextDisplay errorMsg={errorMsg} />}
					<EmailFieldWithProvider email={email} setEmail={setEmail} />
					<BasicButton
						label="リセットする"
						color="primary"
						onClickFunc={submitHandler}
					/>
					{completeMsg && <ResetCompleteDisplay />}
				</div>
				<SimpleLink label="TOPに戻る" destination="/" />
			</div>
		</>
	);
}

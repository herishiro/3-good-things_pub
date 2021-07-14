import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { initInputText } from "context/providers/inputText";
import PasswordFieldWithProvider from "components/modules/externalPages/formSection/PasswordFieldWithProvider";
import EmailFieldWithProvider from "components/modules/externalPages/formSection/EmailFieldWithProvider";
import BasicButton from "components/modules/externalPages/formSection/BasicButton";
import SimpleLink from "components/modules/externalPages/formSection/SimpleLink";
import FormTitle from "components/modules/externalPages/formSection/FormTitle";
import ErrorTextDisplay from "components/modules/externalPages/formSection/ErrorTextDisplay";
import FormDivider from "components/modules/externalPages/formSection/FormDivider";
import GoogleAuthButton from "components/modules/externalPages/formSection/GoogleAuthButton";
import { useDispatch, useSelector } from "react-redux";
import { selectError, signup } from "context/slices/user";
import RememberMe from "components/modules/externalPages/formSection/RememberMe";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formLayout: {
			height: "100%",
			width: "100%",
			display: "flex",
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
		googleButton: {
			marginTop: 10,
			height: 42,
		},
	})
);

export default function SignupForm() {
	const classes = useStyles();
	const { inputText: email, setInputText: setEmail } = initInputText();
	const { inputText: password, setInputText: setPassword } = initInputText();
	const dispatch = useDispatch();
	const error = useSelector(selectError);

	const onSignUp = () => {
		dispatch(signup({ email, password }));
	};

	return (
		<>
			<div className={classes.formLayout}>
				<div>
					<FormTitle title="新規アカウント登録" />
					{error && <ErrorTextDisplay errorMsg={error} />}
					<EmailFieldWithProvider email={email} setEmail={setEmail} />
					<PasswordFieldWithProvider
						password={password}
						setPassword={setPassword}
						onKeyDownFunc={onSignUp}
					/>
					<RememberMe />
					<div style={{ marginTop: 10 }}>
						<BasicButton
							label="アカウント作成"
							color="primary"
							onClickFunc={onSignUp}
						/>
					</div>
					<FormDivider />
					<div className={classes.googleButton}>
						<GoogleAuthButton />
					</div>
				</div>
				<SimpleLink label="TOPに戻る" destination="/" />
			</div>
		</>
	);
}

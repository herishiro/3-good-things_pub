import React from "react";
import Link from "next/link";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { initInputText } from "context/providers/inputText";
import PasswordFieldWithProvider from "components/modules/externalPages/formSection/PasswordFieldWithProvider";
import EmailFieldWithProvider from "components/modules/externalPages/formSection/EmailFieldWithProvider";
import BasicButton from "components/modules/externalPages/formSection/BasicButton";
import ErrorTextDisplay from "components/modules/externalPages/formSection/ErrorTextDisplay";
import RememberMe from "components/modules/externalPages/formSection/RememberMe";
import GoogleAuthButton from "components/modules/externalPages/formSection/GoogleAuthButton";
import FormDivider from "components/modules/externalPages/formSection/FormDivider";
import { useDispatch, useSelector } from "react-redux";
import { login, selectError } from "context/slices/user";
import SimpleLink from "components/modules/externalPages/formSection/SimpleLink";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formLayout: {
			height: "100%",
			width: "100%",
			maxWidth: 300,
			margin: "auto",
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			[theme.breakpoints.up("sm")]: {
				height: "auto",
				minHeight: "80%",
				width: "80%",
				maxWidth: "none",
			},
		},
		forgotPassword: {
			textAlign: "center",
			marginTop: 30,
		},
		anchor: {
			color: theme.palette.grey[700],
			textDecoration: "none",
			fontSize: theme.typography.pxToRem(14),
			fontWeight: theme.typography.fontWeightBold,
			opacity: 1,
			transition: "0.2s",
			["&:hover"]: {
				opacity: 0.7,
			},
		},
		login: {
		},
		marginTop: {
			marginTop: 10,
		},
		googleButton: {
			marginTop: 10,
			height: 42,
		},
	})
);

export default function LoginForm() {
	const classes = useStyles();
	const { inputText: email, setInputText: setEmail } = initInputText();
	const { inputText: password, setInputText: setPassword } = initInputText();

	const dispatch = useDispatch();
	const userError = useSelector(selectError);
	const onLogin = () => {
		dispatch(login({ type: "email", email, password }));
	};

	return (
		<>
			<div className={classes.formLayout}>
				<div className={classes.login}>
					{userError && <ErrorTextDisplay errorMsg={userError} />}
					<EmailFieldWithProvider email={email} setEmail={setEmail} />
					<PasswordFieldWithProvider
						password={password}
						setPassword={setPassword}
						onKeyDownFunc={onLogin}
					/>
					<RememberMe />
					<div className={classes.marginTop}>
						<BasicButton
							label="パスワードでログイン"
							color="primary"
							onClickFunc={onLogin}
						/>
					</div>
					<FormDivider />
					<div className={classes.googleButton}>
						<GoogleAuthButton />
					</div>
					<div className={classes.forgotPassword}>
						<Link href="/reset-password">
							<a className={classes.anchor}>パスワードをお忘れの場合はこちら</a>
						</Link>
					</div>
				</div>
				<SimpleLink label="TOPに戻る" destination="/" />
			</div>
		</>
	);
}

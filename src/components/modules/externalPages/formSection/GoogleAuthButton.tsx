import { useRouter } from "next/router";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { useReactCookies } from "context/providers/user";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { startLoading } from "context/slices/user";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		googleAuth: {
			["& button"]: {
				maxWidth: "none",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			},
			["& .firebaseui-card-content"]: {
				padding: 0,
			},
			["& .firebaseui-container"]: {
				maxWidth: "none",
			},
			["& .firebaseui-idp-text"]: {
				fontSize: theme.typography.pxToRem(18),
			},
			["& .firebaseui-idp-list"]: {
				margin: 0,
			},
			["& .mdl-button--raised"]: {
				boxShadow: "none",
				border: "2px solid rgb(0 0 0 / 25%)",
				transition: "0.2s",
			},
			["& .mdl-button--raised:hover"]: {
				boxShadow: "none",
				border: "2px solid rgb(0 0 0 / 50%)",
			},
			["& .firebaseui-idp-list>.firebaseui-list-item"]: {
				margin: 0,
			},
		},
	})
);

export default function GoogleAuthButton() {
	const classes = useStyles();
	const router = useRouter();
	const today = format(new Date(), "yyyy/MM/dd");
	const { setCookie, option } = useReactCookies();
	const dispatch = useDispatch();
	// Configure FirebaseUI.
	const uiConfig: firebaseui.auth.Config = {
		signInFlow: "popup",
		signInSuccessUrl: `/input/${today}`,
		signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
		callbacks: {
			signInSuccessWithAuthResult: function (authResult) {
				dispatch(startLoading());
				setCookie("isLoggedIn", 1, option);
				router.push(`/input/${today}`);
				return false;
			},
		},
	};

	return (
		<>
			<StyledFirebaseAuth
				uiConfig={uiConfig}
				firebaseAuth={firebase.auth()}
				className={classes.googleAuth}
			/>
		</>
	);
}

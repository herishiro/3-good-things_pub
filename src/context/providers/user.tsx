import React, { useEffect } from "react";
import { format } from "date-fns";
import { useCookies } from "react-cookie";
import { useBeforeunload } from "react-beforeunload";
import { useRouter } from "next/router";
import auth from "libs/firebase/auth";
import Fade from "@material-ui/core/Fade";
import LoadingScreen from "components/gadget/internalPages/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import {
	clearError,
	completeLoading,
	initUser,
	logout,
	selectIsReady,
	selectRememberMe,
	selectStatus,
	setRememberMe,
} from "context/slices/user";
import { initDiaryState, selectDiaryStatus } from "context/slices/diary";
import {
	initDiariesState,
	selectDiariesStatus,
	setDiariesToDB,
} from "context/slices/diaries";
import { initUiState } from "context/slices/ui";
import { selectNewDiariesInDemo } from "context/slices/demo";

export const UserProvider = ({ children }: { children: JSX.Element }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { cookies, setCookie, removeCookie, option } = useReactCookies();
	const today = format(new Date(), "yyyy/MM/dd");
	const externalPath = ["/login", "/signup", "/reset-password", "/"];
	const mutualPath = [
		"/about",
		"/about#this-app",
		"/about#reference",
		"/privacypolicy",
		"/demo/log",
		`/demo/input/${today}`,
	];
	const isLoggedIn = !!parseInt(cookies.isLoggedIn, 10);
	const rememberMe = useSelector(selectRememberMe);
	const diaryStatus = useSelector(selectDiaryStatus);
	const diariesStatus = useSelector(selectDiariesStatus);
	const isReady = useSelector(selectIsReady);
	const userStatus = useSelector(selectStatus);
	const newDiariesInDemo = useSelector(selectNewDiariesInDemo);

	useEffect(
		function checkLoadingCompleted() {
			if (isLoggedIn === false) return;
			const completeInInputPage =
				[userStatus, diaryStatus].every((i) => i === "succeeded") &&
				router.pathname === "/input/[...date]";
			const completeInLogPage =
				[userStatus, diariesStatus].every((i) => i === "succeeded") &&
				router.pathname === "/log";

			if (completeInInputPage) {
				dispatch(completeLoading());
			}
			if (completeInLogPage) {
				dispatch(completeLoading());
			}
		},
		[userStatus, diaryStatus, diariesStatus]
	);

	useEffect(function setInitialUserState() {
		const rememberMe = cookies.rememberMe
			? !!parseInt(cookies.rememberMe, 10)
			: true;
		dispatch(setRememberMe(rememberMe));

		const unsubscribe = auth.onAuthStateChanged(async (rawUser) => {
			if (rawUser) {
				await dispatch(initUser({ rawUser }));
				if (!newDiariesInDemo.length) return;
				dispatch(
					setDiariesToDB({ userId: rawUser.uid, diaries: newDiariesInDemo })
				);
			} else {
				dispatch(initDiariesState());
				dispatch(initDiaryState());
				dispatch(initUiState());
			}
		});
		return unsubscribe;
	}, []);

	const pathRef = React.useRef(router.pathname);
	pathRef.current = router.pathname;
	useEffect(() => {
		const pushToTodayInputPage = () => {
			const visible = document.visibilityState === "visible";
			const inInput = pathRef.current === "/input/[...date]";
			if (visible && inInput) {
				const today = format(new Date(), "yyyy/MM/dd");
				router.push(`/input/${today}`);
			}
		};
		window.addEventListener("visibilitychange", pushToTodayInputPage);
		return () => {
			window.removeEventListener("visibilitychange", pushToTodayInputPage);
		};
	}, [router.asPath]);

	useEffect(
		function pushRouteByPath() {
			const InExternalPage = externalPath.includes(router.asPath);
			const InMutualPage = mutualPath.includes(router.asPath);
			if (InMutualPage) {
				dispatch(completeLoading());
				return;
			}
			if (!isLoggedIn && InExternalPage) {
				dispatch(completeLoading());
			}
			if (!isLoggedIn && !InExternalPage) {
				router.push(`/`);
				dispatch(completeLoading());
			}
			if (isLoggedIn && InExternalPage) {
				const today = format(new Date(), "yyyy/MM/dd");
				router.push(`/input/${today}`);
			}
		},
		[router.asPath]
	);
	useEffect(
		function resetError() {
			dispatch(clearError());
		},
		[router.asPath]
	);

	useBeforeunload(function logoutBeforeLeavingBrowser() {
		if (!rememberMe) {
			removeCookie("isLoggedIn");
			setCookie("isLoggedIn", 0, option);
			dispatch(logout());
		}
	});
	useEffect(
		function setFlagAndPushPathAfterLogInAndOut() {
			const InExternalPage = externalPath.includes(router.asPath);
			const InMutualPage = mutualPath.includes(router.asPath);
			if (userStatus === "loggedOut") {
				removeCookie("isLoggedIn");
				setCookie("isLoggedIn", 0, option);
				// if (InExternalPage || InMutualPage) return;
				if (InExternalPage) return;
				router.push("/");
			} else if (userStatus === "succeeded") {
				removeCookie("isLoggedIn");
				setCookie("isLoggedIn", 1, option);
				if (!InExternalPage || InMutualPage) return;
				const today = format(new Date(), "yyyy/MM/dd");
				router.push(`/input/${today}`);
			}
		},
		[userStatus]
	);

	if (!isReady) {
		return <LoadingScreen />;
	}
	return (
		<div style={{ backgroundColor: "#FEDDDD", height: "100%" }}>
			<Fade in={true} timeout={{ enter: 500, exit: 2000 }}>
				<div id="content" style={{ height: "100%", backgroundColor: "#fff" }}>
					{children}
				</div>
			</Fade>
		</div>
	);
};

export const useReactCookies = () => {
	const [cookies, setCookie, removeCookie] = useCookies([
		"isLoggedIn",
		"rememberMe",
	]);
	const option = { path: "/", maxAge: 60 * 60 * 24 * 14 };
	return { cookies, setCookie, removeCookie, option };
};

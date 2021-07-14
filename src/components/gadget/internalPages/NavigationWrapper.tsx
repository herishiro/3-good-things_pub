import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { format } from "date-fns";
import Container from "@material-ui/core/Container";
import { SecondaryThemeProvider } from "styles/theme";
import SettingDrawer from "./SettingDrawer";
import { useDispatch, useSelector } from "react-redux";
import {
	selectInputButtonDisabled,
	selectInputDrawerIndex,
	selectInputDrawerStatus,
	selectIsInputDrawerOpened,
	setOpenInputDrawer,
} from "context/slices/ui";
import { selectEventStatus, setDiaryToDB } from "context/slices/diary";
import { selectUid } from "context/slices/user";
import { getNextEventAndDrawerStatus } from "libs/diaries";
import {
	NavigationInDrawer,
	NavigationOutDrawer,
} from "components/modules/internalPages/navigation/Navigations";

const useStyles = makeStyles((theme) => ({
	mq: {
		[theme.breakpoints.down("xs")]: {
			padding: 0,
		},
	},
}));

export default function SimpleBottomNavigation() {
	const classes = useStyles();
	const router = useRouter();
	const today = format(new Date(), "yyyy/MM/dd");
	const [value, setValue] = React.useState(router.asPath);
	const [settingOpen, setSettingOpen] = React.useState(false);
	const dispatch = useDispatch();
	const isInputDrawerOpened = useSelector(selectIsInputDrawerOpened);
	const inputDrawerStatus = useSelector(selectInputDrawerStatus);
	const buttonDisabled = useSelector(selectInputButtonDisabled);
	const userId = useSelector(selectUid);
	const eventStatus = useSelector(selectEventStatus);
	const next = getNextEventAndDrawerStatus(eventStatus);
	const index = useSelector(selectInputDrawerIndex);
	const inDemo = router.pathname.includes("/demo/");
	const { date } = router.query as { date: string[] };
	const diaryId = date ? date.join("-") : "";

	React.useEffect(() => {
		if (settingOpen === false) {
			setValue(router.asPath);
		}
	}, [settingOpen]);

	const onChange = (event: React.ChangeEvent<{}>, newValue: string) => {
		setValue(newValue);
		if (!router.pathname.includes("/demo/")) {
			switch (newValue) {
				case `/input/${today}`:
					processInputButtonActions(router.pathname);
					break;
				case "/log":
					router.push("/log");
					break;
				case "settingOpen":
					setSettingOpen(true);
					break;
				default:
					break;
			}
		} else {
			switch (newValue) {
				case `/input/${today}`:
					processInputButtonActions(router.pathname);
					break;
				case "/log":
					router.push("/demo/log");
					break;
				case "settingOpen":
					router.push("/");
					break;
				default:
					break;
			}
		}
	};
	const processInputButtonActions = (path: string) => {
		const inputPath = path.includes("/demo/") ? "/demo/input" : "/input";
		const inputページ以外 = router.pathname !== `${inputPath}/[...date]`;
		const inputページで全部のeventが埋まっていてドロワーは閉じている =
			next.index < 0 &&
			!isInputDrawerOpened &&
			router.pathname === `${inputPath}/[...date]`;
		const inputページで未記入のeventがありドロワーは閉じている =
			!isInputDrawerOpened;
		const categoryのドロワーが開いている = inputDrawerStatus === "category";
		const textのドロワーが開いている = inputDrawerStatus === "text";

		if (inputページ以外) {
			router.push(`${inputPath}/${today}`);
			return;
		}
		if (inputページで全部のeventが埋まっていてドロワーは閉じている) {
			return;
		}
		if (inputページで未記入のeventがありドロワーは閉じている) {
			dispatch(
				setOpenInputDrawer({
					status: next.drawerStatus,
					index: next.index,
				})
			);
			return;
		}
		if (categoryのドロワーが開いている) {
			dispatch(setOpenInputDrawer({ status: "text", index }));
		} else if (textのドロワーが開いている) {
			dispatch(setOpenInputDrawer({ status: "close", index }));
		}
		if (!diaryId || !userId || inDemo) return;
		dispatch(setDiaryToDB({ diaryId, userId }));
	};

	return (
		<SecondaryThemeProvider>
			<Container maxWidth="sm" className={classes.mq}>
				{isInputDrawerOpened ? (
					<NavigationInDrawer
						value={value}
						onChange={onChange}
						disabled={buttonDisabled}
					/>
				) : (
					<NavigationOutDrawer value={value} onChange={onChange} />
				)}
			</Container>
			<SettingDrawer state={settingOpen} setState={setSettingOpen} />
		</SecondaryThemeProvider>
	);
}

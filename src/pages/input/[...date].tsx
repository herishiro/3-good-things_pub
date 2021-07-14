import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "components/gadget/internalPages/InternalLayout";
import InputCard from "components/gadget/inputPage/InputCard";
import DiaryDateNavigator from "components/gadget/inputPage/DiaryDateNavigator";
import YesterdayDialog from "components/gadget/inputPage/YesterdayDialog";
import { useSelector } from "react-redux";
import { selectDiary, selectEventStatus } from "context/slices/diary";
import { SecondaryThemeProvider } from "styles/theme";
import CardSkelton from "components/gadget/inputPage/CardSkelton";
import InputDrawer from "components/gadget/inputPage/InputDrawer";
import { getNextEventAndDrawerStatus } from "libs/diaries";
import WelcomeDialog from "components/gadget/tutorial/WelcomeDialog";
import { selectProfile } from "context/slices/user";
import TutorialDialogWrapper from "components/gadget/tutorial/TutorialDialog";

const useStyles = makeStyles((theme) => ({
	mq: {
		[theme.breakpoints.down("xs")]: {
			padding: 0,
		},
	},
	cardWripper: {
		marginTop: 20,
	},
}));

export default function InputPage() {
	const classes = useStyles();
	const diary = useSelector(selectDiary);
	const eventsStatus = useSelector(selectEventStatus);
	const profile = useSelector(selectProfile);

	if (!diary || !profile) return <></>;
	const isFirstOrNextOrFilledCard = (i: number) => {
		const next = getNextEventAndDrawerStatus(eventsStatus);
		return i === 0 || next.index === i || eventsStatus[i] !== "empty";
	};

	return (
		<Layout title="Today's Happiness">
			<Container maxWidth="sm" className={classes.mq}>
				<SecondaryThemeProvider>
					<DiaryDateNavigator />
				</SecondaryThemeProvider>
				<div className={classes.cardWripper}>
					{[...Array(3)].map((v, i) =>
						isFirstOrNextOrFilledCard(i) ? (
							<InputCard key={i} index={i} />
						) : (
							<CardSkelton key={i} index={i} />
						)
					)}
				</div>
			</Container>
			<YesterdayDialog />
			<WelcomeDialog />
			<TutorialDialogWrapper />
			<InputDrawer />
		</Layout>
	);
}

import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile, selectUid } from "context/slices/user";
import { selectDiary } from "context/slices/diary";
import {
	goNextTutorial,
	selectInputDrawerIndex,
	selectInputDrawerStatus,
	selectIsInputDrawerOpened,
	selectTutorialStatus,
	toggleListOpened,
} from "context/slices/ui";
import {
	CategorySelectDialog,
	FirstClickDialog,
	FirstCompleteDialog,
	FullCompleteDialog,
	SecondClickDialog,
	TextInputDialog,
	ThirdClickDialog,
} from "components/modules/inputPage/tutorial/TutorialDialogs";
import { CancelTutorialButton } from "components/modules/inputPage/tutorial/CancelTutorialButton";

export default function TutorialDialogWrapper() {
	const router = useRouter();
	const dispatch = useDispatch();
	const diary = useSelector(selectDiary);
	const inputDrawerIndex = useSelector(selectInputDrawerIndex);
	const inputDrawerStatus = useSelector(selectInputDrawerStatus);
	const tutorialStatus = useSelector(selectTutorialStatus);
	const userId = useSelector(selectUid);
	const profile = useSelector(selectProfile);
	const isInputDrawerOpened = useSelector(selectIsInputDrawerOpened);
	const inDemo = router.pathname.includes("/demo/input");
	if (!diary) return <></>;
	if ((!userId || !profile) && !inDemo) return <></>;

	const [lastDrawerIndex, setLastDrawerIndex] = React.useState(0);
	if (inputDrawerIndex > lastDrawerIndex) {
		setLastDrawerIndex(inputDrawerIndex);
	}
	const [open1, setOpen1] = useTutorialStatus();
	const [open2, setOpen2] = useTutorialStatus({
		premiseCond:
			diary.events[lastDrawerIndex].category &&
			tutorialStatus.includes("categorySelect"),
		reuse: true,
	});
	const [open3, setOpen3] = useTutorialStatus({
		premiseCond:
			diary.events[lastDrawerIndex].textFields[0].value &&
			inputDrawerStatus === "close",
		reuse: true,
	});
	const [open4, setOpen4] = useTutorialStatus();
	const [open5, setOpen5] = useTutorialStatus();
	const [open6, setOpen6] = useTutorialStatus();
	const [open7, setOpen7] = useTutorialStatus();
	const [show8, setShow8] = React.useState(false);
	const [open8, setOpen8] = React.useState(false);

	const openHandler = {
		firstClick: { open: open1, setOpen: setOpen1 },
		categorySelect: { open: open2, setOpen: setOpen2 },
		textInput: { open: open3, setOpen: setOpen3 },
		firstComplete: { open: open4, setOpen: setOpen4 },
		secondClick: { open: open5, setOpen: setOpen5 },
		thirdClick: { open: open6, setOpen: setOpen6 },
		fullComplete: { open: open7, setOpen: setOpen7 },
	};
	const cancelButton = { show: show8, setShow: setShow8 };
	const cancelDialog = { open: open8, setOpen: setOpen8 };
	const {
		firstClick,
		categorySelect,
		textInput,
		firstComplete,
		secondClick,
		thirdClick,
		fullComplete,
	} = openHandler;

	React.useEffect(() => {
		if (!profile?.isFirstLogin && !inDemo) return;
		if (!router.pathname.includes("/input/[...date]")) return;
		const ts = tutorialStatus;
		firstClick.setOpen(ts === "firstClick");
		categorySelect.setOpen(ts.includes("categorySelect"));
		textInput.setOpen(ts.includes("textInput"));
		firstComplete.setOpen(ts === "firstComplete");
		secondClick.setOpen(ts === "secondClick");
		thirdClick.setOpen(ts === "thirdClick");
		fullComplete.setOpen(ts === "fullComplete");
	}, [tutorialStatus, router.asPath]);

	React.useEffect(() => {
		if (!profile?.isFirstLogin && !inDemo) return;
		if (inputDrawerStatus === "category") {
			firstClick.setOpen(false);
			secondClick.setOpen(false);
			thirdClick.setOpen(false);
		}
		textInput.setOpen(inputDrawerStatus === "text");
		categorySelect.setOpen(inputDrawerStatus === "category");
	}, [inputDrawerStatus]);

	React.useEffect(() => {
		cancelButton.setShow(Object.values(openHandler).some((s) => s.open));
	}, [openHandler]);

	React.useEffect(() => {
		if (isInputDrawerOpened) return;
		dispatch(toggleListOpened(false));
	}, [isInputDrawerOpened]);

	const prevRef = React.useRef<boolean>(false);
	React.useEffect(() => {
		if (prevRef.current && !cancelDialog.open) {
			Object.values(openHandler).forEach((openObj) => {
				openObj.setOpen(false);
			});
		}
		prevRef.current = cancelDialog.open;
	}, [cancelDialog.open]);

	return (
		<>
			<FirstClickDialog open={firstClick.open} />
			<CategorySelectDialog open={categorySelect.open} />
			<TextInputDialog open={textInput.open} />
			<FirstCompleteDialog
				open={firstComplete.open}
				setOpen={firstComplete.setOpen}
			/>
			<SecondClickDialog open={secondClick.open} />
			<ThirdClickDialog open={thirdClick.open} />
			<FullCompleteDialog
				open={fullComplete.open}
				setOpen={fullComplete.setOpen}
			/>
			{cancelButton.show && <CancelTutorialButton dialog={cancelDialog} />}
		</>
	);
}

type UseTutorial = {
	premiseCond: any;
	reuse: boolean;
};
type returnState = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
export const useTutorialStatus = (props?: UseTutorial): returnState => {
	const router = useRouter();
	const premiseCond = props ? props.premiseCond : true;
	const reuse = props ? props.reuse : false;
	const [open, setOpen] = React.useState(false);
	const profile = useSelector(selectProfile);
	const dispatch = useDispatch();
	const inputDrawerStatus = useSelector(selectInputDrawerStatus);
	const prevRef = React.useRef<boolean>(false);
	const dependancies: any[] = [open];
	const inDemo = router.pathname.includes("/demo/input");
	if (reuse) dependancies.push(inputDrawerStatus);

	React.useEffect(() => {
		if (!profile?.isFirstLogin && !inDemo) return;
		if (prevRef.current && !open) {
			dispatch(goNextTutorial());
			if (reuse) prevRef.current = false;
		}
		if (premiseCond) prevRef.current = open;
	}, dependancies);
	return [open, setOpen];
};

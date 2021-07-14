import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchSuccessiveDaysCount,
	selectSuccessiveDays,
} from "context/slices/diaries";
import { selectUid } from "context/slices/user";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
	successiveDaysOuter: {
		display: "flex",
		alignItems: "center",
		height: 35,
		borderTop: `4px solid ${theme.palette.primary.light}`,
		borderBottom: `4px solid ${theme.palette.primary.light}`,
		marginBottom: 10,
	},
	successiveDaysInner: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "80%",
		width: "100%",
		borderTop: `2px solid ${theme.palette.primary.light}`,
		borderBottom: `2px solid ${theme.palette.primary.light}`,
		color: theme.palette.primary.main,
		fontSize: theme.typography.pxToRem(14),
		fontWeight: "bold",
		lineHeight: "100%",
	},
}));

export const SuccessiveDaysDisplay = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const router = useRouter();
	const userId = useSelector(selectUid);
	const inDemo = router.pathname.includes("/demo/log");

	React.useEffect(() => {
		if (!userId) return;
		dispatch(fetchSuccessiveDaysCount({ userId }));
	}, []);

	const successiveDays = useSelector(selectSuccessiveDays);
	if (!successiveDays && !inDemo) return <></>;
	let message = "まずは1日！0から1の偉大な一歩 🎉";
	if (successiveDays === 2) message = "2日連続入力中！今日もお疲れさま 🎉 🎉";
	if (successiveDays === 3) message = "3日連続入力中！とてもえらい 🎉 🎉 🎉";
	if (successiveDays === 4)
		message = "🎉 🎉　4日連続入力中！あなたは最高 🎉 🎉";
	if (successiveDays === 5)
		message = "🎊 🎉　5日連続入力中！いよっ大統領！ 🎉 🎊";
	if (successiveDays === 6)
		message = "🎊 🎊　6日連続入力中！あと1日で1週間！！ 🎊 🎊";
	if (successiveDays === 7) message = "🥳　7日連続入力中！！！万歳！！！ 🥳";
	if (successiveDays >= 8) {
		const randomMessages = [
			`${successiveDays}日連続入力中、いよっ日本一！ 🎌`,
			`${successiveDays}日連続入力中、継続は力の化身 🔮`,
			`${successiveDays}日連続入力中、いつもありがとう 🤗`,
		];
		const index = Math.floor(Math.random() * randomMessages.length);
		message = randomMessages[index];
	}
	if (successiveDays >= 15) {
		const randomMessages = [
			`${successiveDays}日連続入力中、これは大変なことですよ ⚡`,
			`${successiveDays}日連続入力中、お見それしました 🙇`,
			`${successiveDays}日連続入力中、いつもありがとう 🤗`,
		];
		const index = Math.floor(Math.random() * randomMessages.length);
		message = randomMessages[index];
	}
	if (successiveDays >= 22) message = `${successiveDays}日連続入力中、神か？`;
	if (successiveDays === 30)
		message = "30日以上連続記入中、もう何も言う事はない…";
	return (
		<div className={classes.successiveDaysOuter}>
			<div className={classes.successiveDaysInner}>{message}</div>
		</div>
	);
};

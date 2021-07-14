import { getMonthsAfterSignUp } from "./userInfo";

test("最古の日記の日付からの毎月の配列を作成", () => {
	const oldestDiaryDate = new Date("2021-04-01");
	const oldestSeconds = oldestDiaryDate.getTime() / 1000;
	expect(getMonthsAfterSignUp(oldestSeconds)).toStrictEqual([
		"2021/05",
		"2021/04",
	]);
});

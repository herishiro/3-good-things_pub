import {
	inTodayPage,
	isJustAfterMidnight,
} from "components/gadget/inputPage/YesterdayDialog";
import { format } from "date-fns";

it("午前0時～6時の間ならtrueを返す", () => {
	const now = new Date("1995-12-17T03:24:00");
	// console.log(format(now, "yyyy-MM-dd'T'HH:mm:ss"));
	expect(isJustAfterMidnight(now)).toBe(true);
});

it("午前0時～6時の間でなければfalseを返す", () => {
	const now = new Date("2021-04-17T12:24:00");
	// console.log(format(now, "yyyy-MM-dd'T'HH:mm:ss"));
	expect(isJustAfterMidnight(now)).toBe(false);
});

it("今日の入力ページにアクセスしていたらtrueを返す", () => {
	const query = { date: format(new Date(), "yyyy-MM-dd").split("-") };
	expect(inTodayPage(query)).toBe(true);
});
it("今日以外の入力ページにアクセスしていたらfalseを返す", () => {
	const query = {
		date: format(new Date("2020-05-01"), "yyyy-MM-dd").split("-"),
	};
	expect(inTodayPage(query)).toBe(false);
});

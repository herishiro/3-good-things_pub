import { BrowserContext } from "playwright";
const localHost = "http://localhost:3000";
const host = localHost;

beforeEach(async () => {
	await page.goto(host + "/login");
	const emailField = await page.$("input[type='email']");
	const passwordField = await page.$("input[type='password']");
	await emailField?.fill("ccc@ccc.com");
	await passwordField?.fill("123123");
});
const getIsLoggedInFromCookie = async (context: BrowserContext) => {
	const cookies = await context.cookies();
	const isLoggedInCookie = cookies.find(
		(cookie) => cookie.name === "isLoggedIn"
	);
	return !!parseInt(isLoggedInCookie!.value, 10);
};
const getRememberMeFromCookie = async (context: BrowserContext) => {
	const cookies = await context.cookies();
	const rememberMeCookie = cookies.find(
		(cookie) => cookie.name === "rememberMe"
	);
	return !rememberMeCookie ? true : !!parseInt(rememberMeCookie!.value, 10);
};
const logOut = async () => {
	//ログアウト
	await page.click("#settingButton");
	await Promise.all([
		page.waitForNavigation({ waitUntil: "load" }),
		page.click("#logoutItem"), //logOut,
	]);
	expect(await page.$("#external-page")).not.toBeNull();
	expect(await getIsLoggedInFromCookie(context)).toBe(false);
};

describe("authentication", () => {
	it("ログイン後、ログアウト", async () => {
		await Promise.all([
			page.waitForNavigation({ waitUntil: "load" }),
			page.click("text='パスワードでログイン'"),
		]);
		await page.waitForSelector("#internal-page", { state: "attached" });
		expect(await page.$("#internal-page")).not.toBeNull();
		expect(await page.title()).toBe("Today's Happiness| 3 good things!");
		expect(await getIsLoggedInFromCookie(context)).toBe(true);
		await logOut();
		//ログアウトした状態でlogにアクセス
		await page.goto(host + "/log");
		await page.waitForSelector("#external-page", { state: "attached" });
		expect(await page.title()).toBe("ログイン画面| 3 good things!");
	});
	it("rememberMe = trueでログイン後、loginに移動", async () => {
		await page.check("input[type='checkbox']");
		await Promise.all([
			page.waitForNavigation({ waitUntil: "load" }),
			page.click("text='パスワードでログイン'"),
		]);
		await page.waitForSelector("#internal-page", { state: "attached" });
		expect(await page.$("#internal-page")).not.toBeNull();
		expect(await page.title()).toBe("Today's Happiness| 3 good things!");
		expect(await getIsLoggedInFromCookie(context)).toBe(true);
		expect(await getRememberMeFromCookie(context)).toBe(true);
		//ログインした状態で/loginにアクセス
		await page.goto(host + "/login");
		await page.waitForSelector("#internal-page", { state: "attached" });
		expect(await page.title()).toBe("Today's Happiness| 3 good things!");
		await logOut();
	});
	it("rememberMe = falseでログイン後、loginに移動", async () => {
		await page.uncheck("input[type='checkbox']");
		await Promise.all([
			page.waitForNavigation({ waitUntil: "load" }),
			page.click("text='パスワードでログイン'"),
		]);
		await page.waitForSelector("#internal-page", { state: "attached" });
		expect(await page.$("#internal-page")).not.toBeNull();
		expect(await page.title()).toBe("Today's Happiness| 3 good things!");
		expect(await getIsLoggedInFromCookie(context)).toBe(true);
		expect(await getRememberMeFromCookie(context)).toBe(false);
		//ログインした状態でナビゲーションから/logに移動
		await Promise.all([
			page.waitForNavigation({ waitUntil: "load" }),
			page.click("#toLogPage"),
		]);
		expect(await page.title()).toBe("Happiness Log| 3 good things!");
		// //ログインした状態で/loginにアクセス
		await page.goto(host + "/login");
		await page.waitForSelector("#external-page", { state: "attached" });
		expect(await page.title()).toBe("ログイン画面| 3 good things!");
		expect(await getIsLoggedInFromCookie(context)).toBe(false);
	});
	it("rememberMe = falseでログイン後、別タブでからアクセス", async () => {
		await page.uncheck("input[type='checkbox']");
		await Promise.all([
			page.waitForNavigation({ waitUntil: "load" }),
			page.click("text='パスワードでログイン'"),
		]);
		await page.waitForSelector("#internal-page", { state: "attached" });
		expect(await page.$("#internal-page")).not.toBeNull();
		expect(await page.title()).toBe("Today's Happiness| 3 good things!");
		expect(await getIsLoggedInFromCookie(context)).toBe(true);
		expect(await getRememberMeFromCookie(context)).toBe(false);

		const pageTwo = await context.newPage();
		await pageTwo.goto(host + "/login");
		await pageTwo.reload();
		await pageTwo.waitForSelector("#external-page", { state: "attached" });
		expect(await pageTwo.$("#external-page")).not.toBeNull();
	});
	// it("", async () => {});
});

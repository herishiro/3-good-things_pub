import { devices } from "playwright";
const localHost = "http://localhost:3000";
const host = localHost;

it("モバイルスクリーンショット", async () => {
	const iPhone11 = devices["iPhone 11 Pro"];
	const context = await browser.newContext({
		viewport: iPhone11.viewport,
		userAgent: iPhone11.userAgent,
		geolocation: { longitude: 12.492507, latitude: 41.889938 },
		permissions: ["geolocation"],
	});
	const page = await context.newPage();
	await page.goto(host + "/login");
	await page.waitForTimeout(1000);
	await page.screenshot({ path: "screenshots/loginPage-iphone.png" });
	const emailField = await page.$("input[type='email']");
	const passwordField = await page.$("input[type='password']");
	await emailField?.fill("ccc@ccc.com");
	await passwordField?.fill("123123");
	await Promise.all([
		page.waitForNavigation({ waitUntil: "load" }),
		page.click("text='パスワードでログイン'"),
	]);
	await page.waitForSelector("#internal-page", { state: "attached" });
	await page.screenshot({ path: "screenshots/inputPage-iphone.png" });
	await page.goto(host + "/log");
	await page.waitForTimeout(1000);
	await page.screenshot({ path: "screenshots/logPage-iphone.png" });
	await browser.close();
	expect(true).not.toBeNull();
});

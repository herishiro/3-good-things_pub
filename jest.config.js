module.exports = {
	preset: "jest-playwright-jsdom",
	moduleDirectories: ["node_modules", "src"],
	testEnvironmentOptions: {
		"jest-playwright": {
			browsers: ["chromium"],
			launchOptions: {
				headless: false,
				viewPort: { width: 1280, height: 1024 },
			},
			connectOptions: {
				slowMo: 500,
			},
		},
	},
};

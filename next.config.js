const withPWA = require("next-pwa");

module.exports = withPWA({
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	webpack5: true,
	pwa: {
		dest: "public",
	},
});

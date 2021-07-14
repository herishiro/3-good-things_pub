import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="ja">
				<Head>
					{/* PWA primary color */}
					<meta name="application-name" content="3 Good Things!" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta
						name="apple-mobile-web-app-status-bar-style"
						content="default"
					/>
					<meta name="apple-mobile-web-app-title" content="3 Good Things!" />
					<meta
						name="description"
						content="このアプリは毎晩寝る前に3つ、今日良かったことを思い出す新習慣で考え方をポジティブに変えちゃおうという'three good things'メソッドのためのアプリです"
					/>
					<meta name="format-detection" content="telephone=no" />
					<meta name="mobile-web-app-capable" content="yes" />
					{/* <meta
						name="msapplication-config"
						content="/static/icons/browserconfig.xml"
					/> */}
					<meta name="msapplication-TileColor" content="#fff" />
					<meta name="msapplication-tap-highlight" content="no" />
					<meta name="theme-color" content="#fff" />
					<link rel="apple-touch-icon" href="/logo-whbg.png" />
					<link
						rel="apple-touch-icon"
						sizes="152x152"
						href="/logo-whbg-152px.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/logo-whbg-180px.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="167x167"
						href="/logo-whbg-167px.png"
					/>

					<link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
					<link rel="manifest" href="/manifest.json" />
					<link rel="mask-icon" href="/logo-whbg.png" color="#5bbad5" />
					<link rel="shortcut icon" href="/favicon.ico" />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
					/>
					{/* sns */}
					<meta name="twitter:card" content="summary_large_image" />
					<meta
						name="twitter:url"
						content={process.env.NEXT_PUBLIC_DOMAIN_URL}
					/>
					<meta name="twitter:title" content="3 Good Things!" />
					<meta
						name="twitter:description"
						content="このアプリは毎晩寝る前に3つ、今日良かったことを思い出す新習慣で考え方をポジティブに変えちゃおうという'three good things'メソッドのためのアプリです"
					/>
					<meta
						name="twitter:image"
						content={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/twitter-large.png`}
					/>
					<meta name="twitter:creator" content="" />
					<meta property="og:type" content="website" />
					<meta property="og:title" content="3 Good Things!" />
					<meta
						property="og:description"
						content="このアプリは毎晩寝る前に3つ、今日良かったことを思い出す新習慣で考え方をポジティブに変えちゃおうという'three good things'メソッドのためのアプリです"
					/>
					<meta property="og:site_name" content="3 Good Things!" />
					<meta
						property="og:url"
						content={process.env.NEXT_PUBLIC_DOMAIN_URL}
					/>
					<meta
						property="og:image"
						content={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/images/logo-whbg.png`}
					/>
					{/* google font */}
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="anonymous"
					/>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
	// Resolution order
	//
	// On the server:
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. document.getInitialProps
	// 4. app.render
	// 5. page.render
	// 6. document.render
	//
	// On the server with error:
	// 1. document.getInitialProps
	// 2. app.render
	// 3. page.render
	// 4. document.render
	//
	// On the client
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. app.render
	// 4. page.render

	// Render app and page and get the context of the page with collected side effects.
	const sheets = new ServerStyleSheets();
	const originalRenderPage = ctx.renderPage;

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
		});

	const initialProps = await Document.getInitialProps(ctx);

	return {
		...initialProps,
		// Styles fragment is rendered after the app and page rendering finish.
		styles: [
			...React.Children.toArray(initialProps.styles),
			sheets.getStyleElement(),
		],
	};
};

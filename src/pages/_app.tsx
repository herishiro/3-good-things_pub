// import the Head component for appending elements to the head of the page
import React from "react";
import { AppProps } from "next/app";
import { PrimaryThemeProvider } from "styles/theme";
import PropTypes from "prop-types";
import { StateProviders } from "context/StateProviders";
import "styles/global.css";
import { Provider } from "react-redux";
import { store } from "context/reduxStore";
import { loadFirebase } from "libs/firebase";

function MyApp({ Component, pageProps, router }: AppProps) {
	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles && jssStyles.parentElement) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
		const { analytics } = loadFirebase();
		if (process.env.NODE_ENV === "production") {
			analytics();
		}
	}, []);
	return (
		<>
			<PrimaryThemeProvider>
				<Provider store={store}>
					<StateProviders>
						<Component {...pageProps} key={router.asPath} />
					</StateProviders>
				</Provider>
			</PrimaryThemeProvider>
		</>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};

export default MyApp;

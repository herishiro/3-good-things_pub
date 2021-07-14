import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Layout from "components/gadget/internalPages/InternalLayout";
import LogList from "components/gadget/logPage/LogList";
import LogNaviBar from "components/gadget/logPage/LogNavbar";
import PageTitle from "components/gadget/internalPages/PageTitle";
import { SecondaryThemeProvider } from "styles/theme";
import { SuccessiveDaysDisplay } from "components/gadget/logPage/SuccessiveDaysDisplay";

const useStyles = makeStyles((theme) => ({
	container: {
		paddingLeft: 0,
		paddingRight: 0,
	},
}));

export default function LogPage() {
	const classes = useStyles();
	return (
		<Layout title="Happiness Log">
			<SecondaryThemeProvider>
				<PageTitle title="HAPPINESS LOG" />
				<SuccessiveDaysDisplay />
			</SecondaryThemeProvider>
			<Container className={classes.container}>
				<SecondaryThemeProvider>
					<LogNaviBar />
				</SecondaryThemeProvider>
				<LogList />
			</Container>
		</Layout>
	);
}

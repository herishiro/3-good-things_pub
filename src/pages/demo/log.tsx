import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Layout from "components/gadget/internalPages/InternalLayout";
import LogList from "components/gadget/logPage/LogList";
import LogNaviBar from "components/gadget/logPage/LogNavbar";
import PageTitle from "components/gadget/internalPages/PageTitle";
import { SuccessiveDaysDisplay } from "components/gadget/logPage/SuccessiveDaysDisplay";
import { SecondaryThemeProvider } from "styles/theme";

const useStyles = makeStyles((theme) => ({
	container: {
		paddingLeft: 0,
		paddingRight: 0,
	},
	showDemo: {
		position: "absolute",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: 30,
		width: "100%",
		backgroundColor: theme.palette.secondary.main,
		color: "#fff",
		fontWeight: "bold",
		zIndex: 100,
	},
}));

export default function LogPage() {
	const classes = useStyles();
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => {
		setMounted(true);
	}, []);
	return (
		<>
			{mounted && (
				<Layout title="デモページ">
					<SecondaryThemeProvider>
						<ShowDemoInInternal />
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
			)}
		</>
	);
}

export const ShowDemoInInternal = () => {
	const classes = useStyles();
	return <div className={classes.showDemo}>これはデモの記録です</div>;
};

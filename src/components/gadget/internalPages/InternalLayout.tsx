import React from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Navigation from "components/gadget/internalPages/NavigationWrapper";
import { AppProps } from "interfaces/index";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		paddingBottom: 100,
	},
	container: {
		position: "relative",
		[theme.breakpoints.up("xs")]: {
			padding: 0,
		},
	},
}));

interface Props extends AppProps {
	title?: string;
}
const Layout = ({ children, title = "This is the default title" }: Props) => {
	const classes = useStyles();
	return (
		<div className={classes.root} id="internal-page">
			<Head>
				<title>{title + "| 3 good things!"}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Container maxWidth="sm" className={classes.container}>
				<div>{children}</div>
			</Container>
			<Navigation />
		</div>
	);
};

export default Layout;

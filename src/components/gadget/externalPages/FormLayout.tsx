import React from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		height: "100%",
	},
	container: {
		position: "relative",
		display: "flex",
		flexDirection: "column",
		height: "100%",
		justifyContent: "space-between",
		padding: 0,
	},
	headerSection: {
		paddingTop: "3vh",
		paddingBottom: "4vh",
		flexGrow: 0,
		[theme.breakpoints.up("sm")]: {
			paddingTop: 30,
			paddingBottom: 40,
		},
	},
	headerRef: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexGrow: 0,
	},
	headerInner: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		boxSizing: "border-box",
	},
	copyright: {
		paddingTop: 20,
		textAlign: "center",
		color: theme.palette.grey[700],
		fontSize: theme.typography.pxToRem(14),
		[theme.breakpoints.up("sm")]: {
			fontSize: theme.typography.pxToRem(16),
		},
	},
	formSection: {
		height: "100%",
		minHeight: "100%",
		flexGrow: 1,
		padding: "30px 6% 0px",
		boxSizing: "border-box",
		backgroundColor: "#fff",
		borderRadius: "6vw 6vw 0 0",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		overflow: "visible",
		[theme.breakpoints.up(350)]: {
			borderRadius: "40px 40px 0 0",
		},
	},
	formWrapper: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	"MuiCard-root": {
		padding: 0,
		height: "100%",
		["@media (min-height:800px)"]: {
			display: "flex",
			justifyContent: "center",
			flexDirection: "column",
		},
	},
}));

function FormSection({ children }: { children: React.ReactNode }) {
	const classes = useStyles();

	return (
		<Card className={classes.formSection}>
			<CardContent classes={{ root: classes["MuiCard-root"] }}>
				{/* <div>ccc@ccc.com</div> */}
				{children}
			</CardContent>
		</Card>
	);
}
function HeaderSection({ children }: { children: React.ReactNode }) {
	const classes = useStyles();
	return (
		<div className={classes.headerSection}>
			<div className={classes.headerInner}>{children}</div>
		</div>
	);
}

interface Props {
	title?: string;
	formNode: React.ReactNode;
	headerNode: React.ReactNode;
}
const Layout = ({ formNode, headerNode, title = "" }: Props) => {
	const baseClasses = useStyles();
	const header = React.useRef<HTMLDivElement>(null!);
	const form = React.useRef<HTMLDivElement>(null!);
	React.useEffect(() => {
		// to adjust the 100vh for mobile browser
		const initialVh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${initialVh}px`);
		if (!header.current && !form.current) return;

		setTimeout(() => {
			if (!header.current || !form.current) return;
			const totalContentsHeight =
				header.current.getBoundingClientRect().height +
				form.current.scrollHeight;
			document.documentElement.style.setProperty(
				"--bodyHeight",
				totalContentsHeight + "px"
			);
		}, 100);
		window.addEventListener("resize", () => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
			if (!header.current && !form.current) return;
			const totalContentsHeight =
				header.current.getBoundingClientRect().height +
				form.current.scrollHeight;
			document.documentElement.style.setProperty(
				"--bodyHeight",
				totalContentsHeight + "px"
			);
		});
	}, []);
	return (
		<div className={baseClasses.root} id="external-page">
			<Head>
				<title>{title + "| 3 good things!"}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Container maxWidth="sm" className={baseClasses.container}>
				<div ref={header} className={baseClasses.headerRef}>
					<HeaderSection>{headerNode}</HeaderSection>
				</div>
				<div ref={form} style={{ flexGrow: 1, flexBasis: "60%" }}>
					<FormSection>
						<div className={baseClasses.formWrapper}>
							{formNode}
							<div className={baseClasses.copyright}>
								©2021 Tama All Rights Reserved.
							</div>
						</div>
					</FormSection>
				</div>
			</Container>
		</div>
	);
};

export default Layout;

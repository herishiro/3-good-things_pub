import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";

export const PrimaryThemeProvider = ({ children }: ChildProps) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
);
export const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#F14548",
			light: "#FEDDDD",
			dark: "#FFCBCB",
		},
		secondary: {
			main: "#2CA0AA",
			light: "#AFDBDE",
			dark: "#80c0c6",
		},
	},
	typography: {
		h5: {
			fontWeight: 700,
		},
	},
});

type ChildProps = {
	children: JSX.Element | JSX.Element[];
};
export const SecondaryThemeProvider = ({ children }: ChildProps) => (
	<ThemeProvider theme={secondaryTheme}>{children}</ThemeProvider>
);

export const secondaryTheme = createMuiTheme({
	overrides: {
		MuiDialogActions: {
			root: {
				display: "none",
			},
		},
		MuiDialogContent: {
			root: {
				["&:first-child"]: {
					paddingBottom: "16px !important",
				},
			},
		},
	},
	palette: {
		primary: {
			main: "#2CA0AA",
			light: "#AFDBDE",
			dark: "#80c0c6",
		},
		secondary: {
			main: "#F14548",
			light: "#FEDDDD",
			dark: "#FFCBCB",
		},
	},
	typography: {
		h5: {
			fontWeight: 700,
		},
	},
});

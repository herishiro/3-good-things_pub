import React from "react";
import { CookiesProvider } from "react-cookie";
import { UserProvider } from "context/providers/user";
import { DiaryProvider } from "context/providers/diary";
import { DiariesProvider } from "context/providers/diaries";
import { useRouter } from "next/router";
import {
	DemoProvider,
	initWelcomeContext,
	WelcomeProvider,
} from "context/providers/demo";

export const StateProviders = ({ children }: { children: JSX.Element }) => {
	const { isReady, pathname } = useRouter();
	const { openWelcome, setOpenWelcome } = initWelcomeContext();
	if (!isReady) return <></>;
	if (pathname.includes("/demo/")) {
		return (
			<CookiesProvider>
				<WelcomeProvider
					openWelcome={openWelcome}
					setOpenWelcome={setOpenWelcome}
				>
					<DemoProvider>{children}</DemoProvider>
				</WelcomeProvider>
			</CookiesProvider>
		);
	}
	return (
		<CookiesProvider>
			<DiariesProvider>
				<DiaryProvider>
					<UserProvider>{children}</UserProvider>
				</DiaryProvider>
			</DiariesProvider>
		</CookiesProvider>
	);
};

import React from "react";
import { createContext, useContext, useState } from "react";

export const InputTextContext = createContext(
	{} as {
		inputText: string;
		setInputText: React.Dispatch<React.SetStateAction<string>>;
	}
);

export const initInputText = () => {
	const [inputText, setInputText] = useState("");
	return { inputText, setInputText };
};

export const useInputText = () => {
	return useContext(InputTextContext);
};

type Props = {
	inputText: string;
	setInputText: React.Dispatch<React.SetStateAction<string>>;
	children: JSX.Element | JSX.Element[];
};
export const InputTextProvider = ({
	children,
	inputText,
	setInputText,
}: Props) => {
	return (
		<InputTextContext.Provider value={{ inputText, setInputText }}>
			{children}
		</InputTextContext.Provider>
	);
};

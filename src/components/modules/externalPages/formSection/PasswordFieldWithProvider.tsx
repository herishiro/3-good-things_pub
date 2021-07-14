import React from "react";
import TextFieldWithIcon from "components/elements/TextFieldWithIcon";
import { InputTextProvider } from "context/providers/inputText";
import LockIcon from "@material-ui/icons/Lock";

type Props = {
	password: string;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
	onKeyDownFunc: () => void;
};
export default function PasswordFieldWithProvider({
	password,
	setPassword,
	onKeyDownFunc,
}: Props) {
	return (
		<InputTextProvider inputText={password} setInputText={setPassword}>
			<TextFieldWithIcon
				label="Password"
				value={password}
				iconComponent={<LockIcon />}
				hidable={true}
				onKeyDownFunc={onKeyDownFunc}
			/>
		</InputTextProvider>
	);
}

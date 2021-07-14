import React from "react";
import TextFieldWithIcon from "components/elements/TextFieldWithIcon";
import { InputTextProvider } from "context/providers/inputText";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

type Props = {
	email: string;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
};
export default function EmailFieldWithProvider({ email, setEmail }: Props) {
	return (
		<InputTextProvider inputText={email} setInputText={setEmail}>
			<TextFieldWithIcon
				label="Mail address"
				value={email}
				inputType="email"
				iconComponent={<MailOutlineIcon />}
			/>
		</InputTextProvider>
	);
}

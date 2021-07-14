import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useReactCookies } from "context/providers/user";
import { useDispatch, useSelector } from "react-redux";
import { selectRememberMe, setRememberMe } from "context/slices/user";

export default function RememberMe() {
	const { setCookie, removeCookie, option } = useReactCookies();
	const dispatch = useDispatch();
	const rememberMe = useSelector(selectRememberMe);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		removeCookie("rememberMe", option);
		setCookie("rememberMe", event.target.checked ? 1 : 0, option);
		dispatch(setRememberMe(event.target.checked));
	};
	return (
		<>
			<FormControlLabel
				control={
					<Checkbox
						checked={rememberMe}
						onChange={handleChange}
						color="primary"
					/>
				}
				label="次回から自動ログイン"
			/>
		</>
	);
}

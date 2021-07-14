import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { selectSignupWithDemo, setSignupWithDemo } from "context/slices/demo";

export default function SignupWithDemo() {
	const dispatch = useDispatch();
	const signupWithDemo = useSelector(selectSignupWithDemo);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSignupWithDemo(event.target.checked));
	};
	return (
		<>
			<FormControlLabel
				control={
					<Checkbox
						checked={signupWithDemo}
						onChange={handleChange}
						color="secondary"
					/>
				}
				label="今入力した内容を反映して登録"
				style={{ color: "#000" }}
			/>
		</>
	);
}

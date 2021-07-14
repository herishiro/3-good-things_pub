import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import TouchAppRoundedIcon from "@material-ui/icons/TouchAppRounded";
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";
import MailOutlineRoundedIcon from "@material-ui/icons/MailOutlineRounded";
import { useDispatch } from "react-redux";
import { logout } from "context/slices/user";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { setTutorialStatus } from "context/slices/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

export const LogOut = () => {
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout());
	};

	return (
		<ListItem button onClick={onLogout} id="logoutItem">
			<ListItemIcon>
				<ExitToAppRoundedIcon />
			</ListItemIcon>
			<ListItemText primary={"ログアウト"} />
		</ListItem>
	);
};

export const AboutApp = () => {
	const router = useRouter();

	return (
		<ListItem button onClick={() => router.push("/about")}>
			<ListItemIcon>
				<HelpOutlineRoundedIcon />
			</ListItemIcon>
			<ListItemText primary={"アプリについて"} />
		</ListItem>
	);
};

export const ToDemoPage = () => {
	const router = useRouter();
	const today = format(new Date(), "yyyy/MM/dd");
	const dispatch = useDispatch();
	const onClick = () => {
		dispatch(setTutorialStatus("unshown"));
		router.push(`/demo/input/${today}`);
	};

	return (
		<ListItem button onClick={onClick}>
			<ListItemIcon>
				<TouchAppRoundedIcon />
			</ListItemIcon>
			<ListItemText primary={"操作説明デモ"} />
		</ListItem>
	);
};

type AccountProps = {
	setExpand: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ToAccountConfig = ({ setExpand }: AccountProps) => {
	const onClick = () => {
		setExpand(true);
	};

	return (
		<ListItem button onClick={onClick}>
			<ListItemIcon>
				<PersonOutlineRoundedIcon />
			</ListItemIcon>
			<ListItemText primary={"アカウント管理"} />
		</ListItem>
	);
};

export const ContactItem = () => {
	const router = useRouter();
	return (
		<ListItem button>
			<ListItemIcon>
				<MailOutlineRoundedIcon />
			</ListItemIcon>
			<a
				href="mailto:contact@3-good-things.app"
				style={{ color: "inherit", textDecoration: "none", width: "100%" }}
			>
				<ListItemText
					primary={"お問い合わせ"}
					style={{ borderRight: "2px solid #ccc" }}
				/>
			</a>
			<FontAwesomeIcon
				icon={faTwitter}
				color="#1DA1F2"
				size="lg"
				style={{ padding: "0 15px" }}
				onClick={() => router.push("https://twitter.com/hd_3goodthings")}
			/>
		</ListItem>
	);
};

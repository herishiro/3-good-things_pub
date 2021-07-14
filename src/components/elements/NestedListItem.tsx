import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { ClassNameMap } from "@material-ui/styles";

type Props = {
	children: JSX.Element;
	label: string | JSX.Element;
	classes?: ClassNameMap<"item" | "expandLess" | "expandMore">;
	avater?: JSX.Element;
	actionBtn?: JSX.Element;
	open?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

function NestedListItem(prop: Props) {
	const { classes, children, label, avater, actionBtn, open, setOpen } = prop;

	const handleClick = () => {
		if (open !== undefined && setOpen) {
			setOpen(!open);
		}
	};
	return (
		<>
			<ListItem button onClick={handleClick} className={classes?.item}>
				{avater ? (
					<></>
				) : open ? (
					<ExpandLess className={classes?.expandLess} />
				) : (
					<ExpandMore className={classes?.expandMore} />
				)}
				{avater || <></>}
				<ListItemText primary={label} />
				{actionBtn ? actionBtn : <></>}
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				{children}
			</Collapse>
		</>
	);
}

export default NestedListItem;

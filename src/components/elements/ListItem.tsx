import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ClassNameMap } from "@material-ui/styles";

type Props = {
	classes?: ClassNameMap<"item">;
	label: string | JSX.Element;
};

function LogItem({ classes, label }: Props) {
	return (
		<>
			<ListItem className={classes?.item}>
				<ListItemText primary={label} />
			</ListItem>
		</>
	);
}

export default LogItem;

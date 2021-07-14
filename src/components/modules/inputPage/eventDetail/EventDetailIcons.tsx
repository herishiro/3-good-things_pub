import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";

const useStyles = makeStyles((theme) => ({
	default: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "15px",
		height: "15px",
		marginRight: 7,
		border: "3px solid",
		borderColor: theme.palette.primary.main,
		borderRadius: "3px",
	},
	selected: {
		backgroundColor: theme.palette.primary.main,
		color: "#fff",
	},
	filled: {
		backgroundColor: theme.palette.primary.main,
		color: "#fff",
	},
	empty: {
		backgroundColor: theme.palette.primary.light,
		color: theme.palette.primary.main,
	},
}));

type Props = {
	status: "selected" | "filled" | "empty";
};

const EventDetailIcons = ({ status }: Props) => {
	const classes = useStyles();
	const boxClass = clsx(classes.default, classes[status]);
	let icon;
	switch (status) {
		case "selected":
			icon = <RemoveRoundedIcon fontSize="small" />;
			break;
		case "filled":
			icon = <CheckRoundedIcon fontSize="small" />;
			break;
		case "empty":
			icon = <AddRoundedIcon fontSize="small" />;
			break;
	}
	return <div className={boxClass}>{icon}</div>;
};

export default EventDetailIcons;

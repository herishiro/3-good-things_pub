import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getHappinessCategories } from "libs/happinessCategory";
import { useDispatch, useSelector } from "react-redux";
import { selectDiary } from "context/slices/diary";
import { useCategoryWithDiaryCtx } from "libs/diaries";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { HappinessCategory } from "interfaces";
import { setOpenInputDrawer } from "context/slices/ui";

const useStyles = makeStyles((theme) => ({
	menuList: {
		[theme.breakpoints.up("sm")]: {
			maxWidth: 200,
		},
	},
	menuTitle: {
		padding: "2px 5px",
		borderTop: "2px solid",
		borderBottom: "2px solid",
		borderColor: theme.palette.primary.main,
		fontWeight: "bold",
		color: theme.palette.primary.main,
		fontSize: theme.typography.subtitle2.fontSize,
		textAlign: "center",
	},
	listWrapper: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "stretch",
		padding: "0px 10px 10px 10px",
		height: 200,
		overflowY: "scroll",
		backgroundColor: "#fff",
		boxSizing: "border-box",
		boxShadow: "inset 0 -7px 9px -7px rgba(0,0,0,0.7)",
		[theme.breakpoints.up("sm")]: {
			height: 250,
		},
	},
	itemWrapper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexGrow: 1,
		width: "auto",
		padding: "7px 7px",
		marginTop: 10,
		marginRight: 5,
		border: "1px solid",
		borderColor: theme.palette.secondary.light,
		borderRadius: 5,
	},
}));

type Props = {
	index: number;
};

const CategoryMenuList = ({ index }: Props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const diary = useSelector(selectDiary);
	if (!diary) return <></>;

	const { setCategory } = useCategoryWithDiaryCtx({ diary, index });

	const onclick = async (category: HappinessCategory) => {
		await setCategory(category);
		await dispatch(setOpenInputDrawer({ status: "text", index }));
	};
	const categories = getHappinessCategories();
	return (
		<>
			<List style={{ marginTop: 15, marginBottom: 30 }}>
				<div className={classes.listWrapper}>
					{categories.map((category) => (
						<ListItem
							key={category.id}
							button
							disableGutters
							className={classes.itemWrapper}
							onClick={() => onclick(category)}
						>
							{category.emoji} {category.name}
						</ListItem>
					))}
				</div>
			</List>
		</>
	);
};

export default CategoryMenuList;

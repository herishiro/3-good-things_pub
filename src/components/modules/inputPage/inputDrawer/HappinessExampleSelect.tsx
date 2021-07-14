import { Select, MenuItem } from "@material-ui/core";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import { RootState } from "context/reduxStore";
import {
	handleExample,
	selectCategory,
	selectDiary,
} from "context/slices/diary";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { selectIsListOpened, toggleListOpened } from "context/slices/ui";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			width: "100%",
			height: 42,
			padding: "0 10px",
			border: `1px solid ${theme.palette.grey["300"]}`,
			borderRadius: "4px",
			fontSize: theme.typography.pxToRem(14),
			color: theme.palette.grey[700],
			backgroundColor: "#fff",
			cursor: "pointer",
			[theme.breakpoints.up("sm")]: {
				fontSize: theme.typography.pxToRem(16),
			},
		},
		list: {
			maxWidth: "calc(552px * 0.9)",
			width: "90%",
			maxHeight: 200,
			minWidth: "auto !important",
		},
	})
);

export const HappinessExampleSelect = ({ index }: { index: number }) => {
	const category = useSelector((state: RootState) =>
		selectCategory(state, index)
	);
	const diary = useSelector(selectDiary);
	const classes = useStyles();
	const dispatch = useDispatch();
	const isListOpened = useSelector(selectIsListOpened);
	const [selectedExamples, setSelectedExamples] = React.useState<string[]>([]);
	const [lastExamples, setLastExamples] = React.useState<string[]>([]);
	const [error, setError] = React.useState("");

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setError("");
		const currentExamples = event.target.value as string[];
		const lastExample = currentExamples[currentExamples.length - 1];
		if (!diary) return;
		const mainFieldValue = diary.events[index].textFields[0].value;
		if (lastExample && mainFieldValue.length + lastExample.length >= 200) {
			setError("文字数が制限を超えてしまうので選択できません");
			return;
		}
		setSelectedExamples(currentExamples);
		if (currentExamples.length > lastExamples.length) {
			const example = currentExamples.find((example) => {
				return !lastExamples.includes(example);
			});
			if (!example) return;
			dispatch(handleExample({ type: "add", example, index }));
		} else {
			const example = lastExamples.find((example) => {
				return !currentExamples.includes(example);
			});
			if (!example) return;
			dispatch(handleExample({ type: "remove", example, index }));
		}
	};
	React.useEffect(() => {
		setLastExamples(selectedExamples);
	}, [selectedExamples]);

	const handleClose = () => {
		dispatch(toggleListOpened(false));
	};
	if (!category) return <></>;
	const listTitle = `「${category.name}」に関する幸せリスト`;
	return (
		<>
			<div style={{ color: "red", marginTop: 20, fontSize: "14px" }}>
				{error}
			</div>
			<SelectButton listTitle={listTitle} />
			<div style={isListOpened ? { height: 200 } : { height: 0 }}>
				<Select
					multiple
					value={selectedExamples}
					onChange={handleChange}
					onClose={handleClose}
					open={isListOpened}
					style={{ visibility: "hidden" }}
					MenuProps={{
						anchorOrigin: {
							vertical: "top",
							horizontal: "left",
						},
						transformOrigin: {
							vertical: "top",
							horizontal: "left",
						},
						getContentAnchorEl: null,
						classes: { paper: classes.list },
					}}
				>
					<MenuItem key="placeholder" value="" style={{ display: "none" }}>
						{listTitle}
					</MenuItem>
					{category.examples.map((name) => (
						<MenuItem key={name} value={name}>
							{name}
						</MenuItem>
					))}
				</Select>
			</div>
		</>
	);
};

interface Props {
	listTitle: string;
}
const SelectButton = ({ listTitle }: Props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const handleClick = () => {
		dispatch(toggleListOpened(null));
	};
	return (
		<button onClick={handleClick} className={classes.button}>
			{listTitle}
			<ArrowDropDownRoundedIcon />
		</button>
	);
};

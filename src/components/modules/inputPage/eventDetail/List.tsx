import React, { useState, useEffect } from "react";
import { Theme, withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import ItemHeader from "components/modules/inputPage/eventDetail/ItemHeader";
import ItemTextFieldWrapper from "components/modules/inputPage/eventDetail/ItemTextField";
import { Diary, EventDetailLabel } from "interfaces/index";
import { useSelector } from "react-redux";
import { selectDiary } from "context/slices/diary";

const Accordion = withStyles((theme: Theme) => ({
	root: {
		margin: 0,
		boxShadow: "none",
		border: "none",
		backgroundColor: "rgba(0,0,0,0)",
		"&::before": {
			backgroundColor: "inherit",
		},
		"&$expanded": {
			margin: 0,
		},
	},
	expanded: {},
}))(MuiAccordion);

export default function EventDetailList({ index }: { index: number }) {
	const labels: EventDetailLabel[] = [
		"できごとの詳細",
		"その時とその後の気分",
		"どうして上手くいったのか",
	];
	return (
		<>
			{labels.map((detailLabel) => (
				<EventDetailItem
					detailLabel={detailLabel}
					key={detailLabel}
					index={index}
				/>
			))}
		</>
	);
}
type Prop = {
	detailLabel: EventDetailLabel;
	index: number;
};
type Status = "selected" | "filled" | "empty";
const EventDetailItem = ({ detailLabel, index }: Prop) => {
	const [status, setStatus] = useState<Status>("empty");
	const diary = useSelector(selectDiary);
	if (!diary) throw new Error("no diary");

	//ページ変遷時のstatusをinitialize
	useEffect(() => {
		const isAllEmpty = checkFields({
			diary,
			index,
			detailLabel,
		});
		if (!isAllEmpty) {
			setStatus("filled");
		} else {
			setStatus("empty");
		}
	}, [diary.date]);

	const onChange = (event: object, expanded: boolean) => {
		const isAllEmpty = checkFields({
			diary,
			index,
			detailLabel,
		});
		if (expanded) {
			setStatus("selected");
		} else if (!expanded && !isAllEmpty) {
			setStatus("filled");
		} else if (!expanded && isAllEmpty) {
			setStatus("empty");
		}
	};

	return (
		<Accordion key={detailLabel} onChange={onChange}>
			<ItemHeader label={detailLabel} status={status} />
			<ItemTextFieldWrapper label={detailLabel} index={index} />
		</Accordion>
	);
};

type Prop2 = {
	diary: Diary;
	index: number;
	detailLabel: EventDetailLabel;
};
const checkFields = ({ diary, index, detailLabel }: Prop2) => {
	const textFields = diary.events[index].textFields;
	let allEmpty: boolean;
	if (detailLabel === "その時とその後の気分") {
		const feelingAt = textFields.find(
			(field) => field.label === "その時の気分"
		);
		const feelingAfter = textFields.find(
			(field) => field.label === "その後の気分"
		);
		if (!feelingAt || !feelingAfter) {
			throw new Error("there is no feelingAt || feelingAfter");
		}
		allEmpty = !feelingAt.value && !feelingAfter.value;
	} else {
		const field = textFields.find((field) => field.label === detailLabel);
		if (!field) {
			throw new Error("there is no such field : " + detailLabel);
		}
		allEmpty = !field.value;
	}
	return allEmpty;
};

import React from "react";
import { Diary } from "interfaces";
import List from "components/elements/List";
import RootItem from "components/modules/logPage/logList/rootItem/RootItem";
import EventItem from "components/modules/logPage/logList/EventItem";
import DetailItem from "components/modules/logPage/logList/DetailItem";

type Prop = {
	diariesInMonth: Diary[];
};
export default function MonthList({ diariesInMonth }: Prop) {
	return (
		<>
			{diariesInMonth.length ? (
				<List>
					{diariesInMonth.map((diary) => (
						<RootItem diary={diary} key={`diary-${diary.date.seconds}`}>
							<List>
								{diary.events.map((event) => (
									<EventItem event={event} key={event.id}>
										<List>
											{event.textFields.slice(1).map(({ label, value }) => (
												<DetailItem label={label} value={value} key={label} />
											))}
										</List>
									</EventItem>
								))}
							</List>
						</RootItem>
					))}
				</List>
			) : (
				<div>この月の記録はありません</div>
			)}
		</>
	);
}

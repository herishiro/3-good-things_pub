import React from "react";

type Prop = {
	title: string;
};

function PageTitle({ title }: Prop) {
	return <div>{title}</div>;
}

export default function Header({ title }: Prop) {
	return (
		<header>
			<PageTitle title={title} />
		</header>
	);
}

import React from "react";
import clsxm from "../../utils/clsxm";

const MenuItem = ({ stage, onClick, label, selected }) => {
	return (
		<li
			key={label}
			className={clsxm(selected && ["border-l-4 border-primary"])}
		>
			<a onClick={onClick}>{label}</a>
		</li>
	);
};

export default MenuItem;

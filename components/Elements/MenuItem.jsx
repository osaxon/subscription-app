import React from "react";

const MenuItem = ({ stage, onClick, label }) => {
	return (
		<li key={label} className="border">
			<a className="p-0" onClick={onClick}>
				{label}
			</a>
		</li>
	);
};

export default MenuItem;

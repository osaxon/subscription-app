import React from "react";
import JsonFormatter from "react-json-formatter";
const jsonStyle = {
	propertyStyle: { color: "red" },
	stringStyle: { color: "green" },
	numberStyle: { color: "darkorange" },
};

const Welcome = ({ user }) => {
	return (
		<section className="w-11/12 px-2 mx-auto h-full">
			<p className="lg:text-5xl text-3xl">Welcome, {user.name}</p>
			<JsonFormatter
				json={JSON.stringify(user)}
				tabWidth={4}
				jsonStyle={jsonStyle}
			/>
		</section>
	);
};

export default Welcome;

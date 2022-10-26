import React from "react";
import Link from "next/link";
import JsonFormatter from "react-json-formatter";
const jsonStyle = {
	propertyStyle: { color: "red" },
	stringStyle: { color: "green" },
	numberStyle: { color: "darkorange" },
};

const Welcome = ({ user }) => {
	const activeSub = user.stripeSubId !== null ? "Active" : "Inactive";
	console.log(user);
	return (
		<section className="w-11/12 px-2 mx-auto h-full">
			<p className="lg:text-5xl text-3xl">Welcome, {user.name}</p>

			<div className="grid md:grid-cols-2 grid-cols-1">
				<div className="border-accent border p-2">
					<p>Subscription status: {activeSub}</p>
					<p>Plan: {user.stripeSubTier}</p>
					<Link href="/sub-options">
						<button className="btn">Update</button>
					</Link>
					{activeSub === "Active" ? (
						<Link href="/sub-options">
							<button className="btn">Update</button>
						</Link>
					) : null}
				</div>
			</div>
		</section>
	);
};

export default Welcome;

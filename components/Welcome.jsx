import React, { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";

const Welcome = ({ user }) => {
	const fetcher = (url) =>
		axios.get(url, { params: { id: user.id } }).then((res) => res.data);
	const { data, error, isValidating } = useSWR(
		"/api/user/get-user-details",
		fetcher
	);

	if (error) return <div>there has been an error...</div>;
	if (isValidating) return <div>loading...</div>;

	const activeSub = data.stripeSubId !== null ? "Active" : "Inactive";

	return (
		<section className="w-11/12 px-2 mx-auto h-full">
			<p className="lg:text-5xl text-3xl">Welcome, {data.name}</p>

			<div className="grid md:grid-cols-2 grid-cols-1">
				<div className="border-accent border p-2">
					<p>Subscription status: {activeSub}</p>
					<p>
						Plan: {data.stripeSubTier ? data.stripeSubTier : "NONE"}
					</p>
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

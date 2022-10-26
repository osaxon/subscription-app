import React, { useState } from "react";
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

	const [cancelSelected, setCancelSelected] = useState(false);

	const handleCancel = (e) => {
		e.preventDefault();
		setCancelSelected(!cancelSelected);
		return data;
	};

	if (error) return <div>there has been an error...</div>;
	if (isValidating) return <div>loading...</div>;

	const activeSub = data.stripeSubId !== null ? "ACTIVE" : "INACTIVE";

	return (
		<section className="w-11/12 px-2 mx-auto h-full">
			<p className="lg:text-5xl text-3xl">Welcome, {data.name}</p>

			<div className="grid md:grid-cols-2 grid-cols-1">
				<div className="py-2">
					<p>Subscription status: {activeSub}</p>
					<p>
						Plan: {data.stripeSubPlan ? data.stripeSubPlan : "NONE"}
					</p>
					<div className="flex gap-2">
						<Link href="/sub-options">
							<button className="btn btn-sm">Update</button>
						</Link>
						{activeSub === "ACTIVE" && !cancelSelected ? (
							<button
								onClick={(e) => handleCancel(e)}
								className="btn btn-error btn-sm"
							>
								cancel
							</button>
						) : null}
						{cancelSelected ? (
							<a
								className="btn btn-error btn-sm"
								href="https://billing.stripe.com/p/login/test_28o5oe1lq6h36iIeUU"
							>
								Cancel at Stripe
							</a>
						) : null}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Welcome;

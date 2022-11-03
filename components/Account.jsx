import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/future/image";
import axios from "axios";
import useSWR from "swr";

const Account = ({ user }) => {
	const fetcher = (url) =>
		axios.get(url, { params: { id: user.id } }).then((res) => res.data);
	// Fetch user data from DB
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

	const activeSub =
		data.stripeSubscription.id !== null ? "ACTIVE" : "INACTIVE";

	return (
		<section className="w-11/12 px-2 mx-auto h-full max-w-6xl">
			<div className="card card-normal md:w-1/2 w-full bg-base-100 shadow-xl">
				<figure className="avatar">
					<div className="w-24 mask mask-hexagon">
						<Image
							src={data.image}
							width={40}
							height={40}
							alt="Shoes"
						/>
					</div>
				</figure>
				<div className="card-body">
					<div className="py-2 prose">
						<p className="inline-flex items-center w-full justify-between">
							Subscription status:&nbsp;
							<span className="badge">
								{data.stripeSubscription.status}
							</span>
						</p>
						<p className="inline-flex items-center w-full justify-between">
							Plan:{" "}
							{data.stripeSubPlan ? data.stripeSubPlan : "NONE"}{" "}
							<button className="badge badge-success">
								<Link href="/sub-options">edit</Link>
							</button>
						</p>

						<div className="flex gap-2">
							{activeSub === "ACTIVE" && !cancelSelected ? (
								<button
									onClick={(e) => handleCancel(e)}
									className="btn btn-error btn-sm"
								>
									Cancel
								</button>
							) : null}
							{cancelSelected ? (
								<a
									className="link link-primary"
									href="https://billing.stripe.com/p/login/test_28o5oe1lq6h36iIeUU"
								>
									Cancel at Stripe
								</a>
							) : null}
						</div>
					</div>
				</div>
			</div>
			<div className="grid md:grid-cols-2 grid-cols-1"></div>
		</section>
	);
};

export default Account;

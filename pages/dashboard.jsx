import React, { useEffect, useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Image from "next/future/image";
import AlertWarn from "../components/AlertWarn";
import useSWR from "swr";
import axios from "axios";
import useAppState from "../store/state";
import { Welcome, UserLessonPlans, MenuItem } from "../components";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Dashboard = ({ session }) => {
	const { status } = useSession({ required: true });
	const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
	const { data, error, isValidating } = useSWR(
		"/api/stripe/get-subscription-info",
		fetcher
	);

	const router = useRouter();
	const activeSubscription = session.user.isActive;
	const { contentStage, setContentStage } = useAppState((state) => ({
		contentStage: state.contentStage,
		setContentStage: state.setContentStage,
	}));

	const handleStageChange = (selected) => {
		setContentStage(selected);
	};

	console.log(isValidating);

	const goToCheckout = async () => {
		setIsCheckoutLoading(true);
		const res = await fetch(`/api/stripe/create-checkout-session`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const { redirectUrl } = await res.json();
		if (redirectUrl) {
			window.location.assign(redirectUrl);
		} else {
			setIsCheckoutLoading(false);
			console.log("Error creating checkout session");
		}
	};

	if (status === "authenticated") {
		return (
			<Layout>
				<main className="">
					{/* Account details */}
					<section className="h-screen">
						{data ? (
							<div className="drawer drawer-mobile">
								<input
									id="my-drawer-2"
									type="checkbox"
									className="drawer-toggle"
								/>
								<div className="drawer-content flex flex-col items-center justify-center">
									{contentStage === "welcome" && (
										<Welcome name={session.user.name} />
									)}
									{contentStage === "lesson-plans" && (
										<UserLessonPlans />
									)}

									<label
										htmlFor="my-drawer-2"
										className="btn btn-primary drawer-button lg:hidden"
									>
										Open drawer
									</label>
								</div>
								<div className="drawer-side">
									<label
										htmlFor="my-drawer-2"
										className="drawer-overlay"
									></label>
									<ul className="menu overflow-y-auto w-80 bg-base-100 text-base-content">
										<MenuItem
											label="Overview"
											onClick={() =>
												handleStageChange("welcome")
											}
											stage="welcome"
											selected={
												contentStage === "welcome"
											}
										/>
										<MenuItem
											label="My Lesson Plans"
											onClick={() =>
												handleStageChange(
													"lesson-plans"
												)
											}
											stage="lesson-plans"
											selected={
												contentStage === "lesson-plans"
											}
										/>
									</ul>
								</div>
							</div>
						) : null}
					</section>
				</main>
			</Layout>
		);
	}
};

export default Dashboard;

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/login",
			},
		};
	}

	return {
		props: { session },
	};
}

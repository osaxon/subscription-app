import React, { useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import { DASHBOARD_MENU } from "../config";
import axios from "axios";
import useAppState from "../store/state";
import { Welcome, UserLessonPlans, MenuItem } from "../components";
import Link from "next/link";
const fetcher = (url) => axios.get(url).then((res) => res.data);

const Dashboard = ({ session }) => {
	const { status } = useSession({ required: true });
	const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

	const { contentStage, setContentStage } = useAppState((state) => ({
		contentStage: state.contentStage,
		setContentStage: state.setContentStage,
	}));

	const handleStageChange = (selected) => {
		setContentStage(selected);
	};

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
						<div className="drawer drawer-mobile">
							<input
								id="my-drawer-2"
								type="checkbox"
								className="drawer-toggle"
							/>
							<div className="drawer-content flex flex-col items-center justify-center">
								{contentStage === "Overview" && (
									<Welcome user={session.user} />
								)}
								{contentStage === "My Lesson Plans" && (
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
									{DASHBOARD_MENU.length > 0 &&
										DASHBOARD_MENU.map((item) => (
											<MenuItem
												key={item}
												label={item}
												onClick={() =>
													handleStageChange(item)
												}
												stage={item}
												selected={contentStage === item}
											/>
										))}
									<li>
										<Link href="/plans">All Plans</Link>
									</li>
								</ul>
							</div>
						</div>
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

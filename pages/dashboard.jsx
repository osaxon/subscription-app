import React, { useState } from "react";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import { DASHBOARD_MENU } from "../config";
import useAppState from "../store/state";
import { Account, UserLessonPlans, MenuItem } from "../components";
import Link from "next/link";
import clsxm from "../utils/clsxm";

// Once a user is logged in they are re-directed here

const Dashboard = ({ session }) => {
	const { status } = useSession({ required: true });
	const [menuOpen, setMenuOpen] = useState(false);

	const { contentStage, setContentStage } = useAppState((state) => ({
		contentStage: state.contentStage,
		setContentStage: state.setContentStage,
	}));

	const handleStageChange = (selected) => {
		setContentStage(selected);
	};

	if (status === "authenticated") {
		return (
			<Layout>
				<main>
					{/* Account details */}
					<section className="h-screen">
						<div className="w-11/12 px-2 mx-auto max-w-6xl min-h-[35px]">
							<button
								onClick={() => setMenuOpen(!menuOpen)}
								className={clsxm(
									"btn btn-primary btn-sm btn-outline lg:hidden",
									[menuOpen && ["hidden"]]
								)}
							>
								:::
							</button>
						</div>

						<div className="drawer drawer-mobile z-50">
							<input
								id="my-drawer-2"
								type="checkbox"
								className="drawer-toggle"
								checked={menuOpen}
								readOnly
							/>

							<div className="drawer-content flex flex-col py-4">
								{contentStage === "My Lesson Plans" && (
									<UserLessonPlans />
								)}

								{contentStage === "Account" && (
									<Account user={session.user} />
								)}
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
												onClick={() => {
													setMenuOpen(!menuOpen);
													handleStageChange(item);
												}}
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

	// Redirect to the login page if user is not logged in
	if (!session) {
		return {
			redirect: {
				destination: "/api/auth/signin",
			},
		};
	}

	return {
		props: { session },
	};
}

import React, { useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Image from "next/future/image";
import AlertWarn from "../components/AlertWarn";

const Dashboard = ({ session }) => {
	const { data, status } = useSession({ required: true });
	const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
	const activeSubscription = session.user.isActive;
	console.log(session);

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
				<main className="layout border">
					{!activeSubscription && (
						<AlertWarn
							onClick={() => goToCheckout()}
							message="You must provide payment to complete your account"
						/>
					)}
					<p className="lg:text-6xl text-4xl">
						Welcome, {session.user.name}
					</p>
					{/* Account details */}
					<section className="border h-screen"></section>
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

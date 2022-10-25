import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function Home() {
	const { data, status } = useSession();
	const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
	const router = useRouter();

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

	return (
		<Layout>
			<main>
				{status === "loading" && <p>Loading...</p>}
				{data && (
					<div>
						<p>{JSON.stringify(data)}</p>
						<p>Add a payment method to start using this servce.</p>
						<button
							className="btn btn-primary"
							onClick={() => {
								if (isCheckoutLoading) return;
								else goToCheckout();
							}}
						>
							{isCheckoutLoading
								? "Loading..."
								: "Add Payment Method"}
						</button>
					</div>
				)}
			</main>
		</Layout>
	);
}

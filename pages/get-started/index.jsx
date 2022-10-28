import React from "react";
import { getProviders, signIn } from "next-auth/react";
import useAppState from "../../store/state";
import { PROCESS_STEPS } from "../../config";
import clsxm from "../../utils/clsxm";

const GetStarted = ({ providers }) => {
	const currentStep = 0;
	return (
		<section className="container flex flex-col min-h-screen justify-center gap-10">
			<ul className="steps">
				{PROCESS_STEPS.map((step, i) => (
					<li
						key={step}
						className={clsxm("step", [
							currentStep >= i && ["step-primary"],
						])}
					>
						{step}
					</li>
				))}
			</ul>
			<div className="flex flex-col items-center gap-4">
				{Object.values(providers).map((provider) => (
					<div key={provider.name}>
						<button
							className="link"
							onClick={() =>
								signIn(provider.id, {
									callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/get-started/choose-plan`,
								})
							}
						>
							Sign in with {provider.name}
						</button>
					</div>
				))}
			</div>
		</section>
	);
};

export async function getServerSideProps(context) {
	const providers = await getProviders();
	return {
		props: { providers },
	};
}

export default GetStarted;

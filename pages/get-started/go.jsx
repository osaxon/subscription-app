import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import clsxm from "../../utils/clsxm";
import { PROCESS_STEPS } from "../../config";

const Go = () => {
	const { data: session } = useSession();
	const currentStep = 2;

	if (!session) {
		return <div>Loading...</div>;
	}

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

			<Link href="/dashboard">
				<a className="text-center link">Go to your dashboard</a>
			</Link>
		</section>
	);
};

export default Go;

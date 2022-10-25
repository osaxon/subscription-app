import React from "react";
import Layout from "../components/Layout";

const SubOptions = () => {
	return (
		<Layout>
			<main className="min-h-screen layout">
				<p className="text-6xl">Choose your subscription</p>

				<div className="flex flex-col md:flex-row gap-6 mt-10">
					{/* Monthly */}
					<div className=" w-full bg-base-100 shadow-xl">
						<div className=" h-48 flex justify-center items-center">
							<p className="text-5xl prose italic">£5/Month</p>
						</div>
						<div className="card-body">
							<button className="btn">Sign up</button>
							<div className="badge badge-secondary italic">
								Flexible
							</div>
							<p>Cancel any time. Bills monthly.</p>
						</div>
					</div>
					{/* Yearly */}
					<div className="card w-full bg-base-100 shadow-xl">
						<div className=" h-48 flex justify-center items-center">
							<p className="text-5xl prose italic">£39/Year</p>
						</div>
						<div className="card-body">
							<button className="btn">Sign up</button>
							<div className="badge badge-secondary italic">
								Save 20%!
							</div>
							<p>Pay now and get access for a full year.</p>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	);
};

export default SubOptions;

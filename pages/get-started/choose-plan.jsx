import React from "react";
import { useSession } from "next-auth/react";
import useAppState from "../../store/state";
import { PROCESS_STEPS } from "../../config";
import clsxm from "../../utils/clsxm";
import { PRODUCTS } from "../../config";
import ProductCard from "../../components/ProductCard";

const ChoosePlan = () => {
	const { data: session } = useSession();
	const currentStep = 1;

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
			<div className="flex flex-col md:flex-row items-center gap-4">
				{PRODUCTS.length &&
					PRODUCTS.map((product) => (
						<div className="w-full" key={product.priceId}>
							<ProductCard
								badge={product.badge}
								highlights={product.highlights}
								name={product.name}
								id={product.priceId}
								price={product.price}
								per={product.per}
							/>
						</div>
					))}
			</div>
		</section>
	);
};

export default ChoosePlan;

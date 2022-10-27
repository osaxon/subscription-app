import React, { useState } from "react";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import { PRODUCTS } from "../config";
import ProductCard from "../components/ProductCard";

const SubOptions = () => {
	const { data: session } = useSession();
	console.log(session);
	console.log(PRODUCTS);

	const checkCurrentSub = (priceId) => {
		return priceId === session.user.stripeSubPriceId;
	};

	if (!session) {
		return <div>Loading...</div>;
	}

	return (
		<Layout>
			<main className="min-h-screen layout">
				<p className="text-6xl">Choose your subscription</p>

				<div className="flex flex-col md:flex-row gap-6 mt-10">
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
									disabled={checkCurrentSub(product.priceId)}
								/>
							</div>
						))}
				</div>
			</main>
		</Layout>
	);
};

export default SubOptions;

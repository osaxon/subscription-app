import React, { useState } from "react";
import Layout from "../components/Layout";
import { getSession } from "next-auth/react";
import { PRODUCTS } from "../config";
import ProductCard from "../components/ProductCard";
import { prisma } from "../prisma/shared-client";

const SubOptions = ({ user, session = true }) => {
	const checkCurrentSub = (priceId) => {
		return priceId === user.stripeSubscription?.plan.id;
	};

	if (!session) {
		return <div>Loading...</div>;
	}

	return (
		<Layout>
			<main className="min-h-screen layout">
				<p className="text-6xl">Select a subscription</p>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
					{PRODUCTS.filter((p) => p.price === 0).map((product) => (
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
					{PRODUCTS &&
						PRODUCTS.filter((p) => p.price !== 0).map((product) => (
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

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/api/auth/signin",
			},
		};
	}

	const user = await prisma.user.findUnique({
		where: {
			id: session.user.id,
		},
	});

	return {
		props: { user, session },
	};
}

export default SubOptions;

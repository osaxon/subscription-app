import React from "react";
import { goToCheckout } from "../utils";

const ProductCard = ({ badge, name, highlights, disabled, price, per }) => {
	console.log(disabled);
	return (
		<div className="w-full bg-base-100 shadow-xl">
			<div className="h-48 flex flex-col justify-evenly items-center">
				<div className="badge badge-secondary italic">{badge}</div>
				<p className="text-5xl prose italic">
					£{price}/{per}
				</p>
				<div className="flex flex-col items-center">
					{highlights.map((h, i) => (
						<p className="prose" key={i}>
							{h}
						</p>
					))}
				</div>
			</div>
			<div className="card-body relative">
				<button
					onClick={() => goToCheckout({ name })}
					className="btn btn-secondary"
					disabled={disabled}
				>
					Select
				</button>
				{disabled ? (
					<p className="text-xs italic absolute bottom-2">
						Already subscribed
					</p>
				) : null}
			</div>
		</div>
	);
};

export default ProductCard;

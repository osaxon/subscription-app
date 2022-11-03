import React from "react";
import { goToCheckout } from "../utils";

const handleClick = (e, option) => {
	e.preventDefault();

	if (option === "FREE-TIER") {
		console.log("Handle cancel / switch");
		console.log(option);
	} else {
		console.log("Create checkout");
		console.log(option);
	}
	//goToCheckout(option)
};

const ProductCard = ({ badge, name, highlights, disabled, price, per, id }) => {
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
					onClick={(e) => handleClick(e, id)}
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

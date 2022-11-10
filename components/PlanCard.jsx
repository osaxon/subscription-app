import React, { useEffect } from "react";
import Link from "next/link";
import { AiFillLock } from "react-icons/ai";

const PlanCard = ({ plan, user }) => {
	const {
		createdAt,
		description,
		id,
		name,
		publishedAt,
		updatedAt,
		level,
		availability,
		slug,
		content,
		tags,
	} = plan;

	return (
		<div className="h-96 border border-secondary p-4 flex flex-col justify-between shadow relative">
			<div className=" h-full flex flex-col justify-between">
				<p className="badge">{level}</p>
				<div>
					<p>{name}</p>
					<p>{description}</p>
				</div>

				{availability === "Premium" && !user?.stripeSubPlan ? (
					<div className="flex items-center gap-2">
						<AiFillLock size={22} />
						<div className="italic text-xs">
							<p>Requires premium account.</p>
							<Link href="/sub-options">
								<a className="link">Click here to unlock</a>
							</Link>
						</div>
					</div>
				) : (
					<>
						<Link href={`/plans/${slug}`}>
							<button className="btn btn-wide btn-secondary mx-auto">
								View Lesson
							</button>
						</Link>
						<button onClick={() => console.log(id)}>
							Add Lesson
						</button>
					</>
				)}

				<div className="flex gap-2">
					{tags.length > 0 &&
						tags.map((tag) => (
							<p className="badge badge-accent" key={tag}>
								{tag}
							</p>
						))}
				</div>
			</div>
		</div>
	);
};

export default PlanCard;

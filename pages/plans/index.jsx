import React, { useEffect, useState, useCallback } from "react";
import uniq from "lodash/uniq";

import { gql } from "@apollo/client";
import { Layout } from "../../components";
import client from "../../lib/apolloClient";

const Plans = ({ plans, tags }) => {
	const [filteredPlans, setFilteredPlans] = useState(() => [...plans]);
	const [selectedTags, setSelectedTags] = useState([]);

	const checkSelectedTag = useCallback(
		(tag) => {
			return selectedTags.includes(tag);
		},
		[selectedTags]
	);

	const filterPlans = useCallback(
		(data) => {
			return data.filter((plan) => {
				return plan.tags.some((tag) => {
					return checkSelectedTag(tag);
				});
			});
		},
		[checkSelectedTag]
	);

	const clearTags = () => {
		setSelectedTags([]);
		return;
	};

	// remove a single tag
	const removeTag = (val) => {
		setSelectedTags((current) =>
			current.filter((tag) => {
				return tag !== val;
			})
		);
	};

	const handleClick = (e) => {
		e.preventDefault();
		const val = e.target.value;
		if (selectedTags.includes(val)) {
			removeTag(val);
			return;
		}
		setSelectedTags((prev) => [...prev, val]);
	};

	useEffect(() => {
		if (selectedTags.length > 0) {
			setFilteredPlans(filterPlans(plans));
		} else {
			setFilteredPlans(plans);
		}
	}, [selectedTags, filterPlans, plans]);

	return (
		<Layout>
			<main className="w-11/12 mx-auto px-2">
				<p className="text-2xl">All plans</p>
				<ul className="flex flex-wrap gap-2">
					{tags.length > 0 &&
						tags.map((tag) => (
							<li key={tag}>
								<button
									aria-disabled={checkSelectedTag(tag)}
									onClick={(e) => handleClick(e)}
									className="btn btn-secondary btn-sm"
								>
									{tag}
								</button>
							</li>
						))}
				</ul>
				<ul className="mt-12 grid gap-1 md:grid-cols-2 xl:grid-cols-3">
					{filteredPlans.map((plan) => (
						<li key={plan.slug}></li>
					))}
				</ul>
			</main>
		</Layout>
	);
};

export async function getStaticProps() {
	const data = await client.query({
		query: gql`
			query Plans {
				plans {
					id
					tags
					slug
				}
			}
		`,
	});

	const plans = data.data.plans;

	function extractTags(data) {
		const tags = [];
		data.forEach((plan) => plan.tags.forEach((tag) => tags.push(tag)));
		return tags;
	}

	// remove duplictes
	const tags = uniq(extractTags(plans));

	return {
		props: {
			plans,
			tags,
		},
		revalidate: 10,
	};
}

export default Plans;

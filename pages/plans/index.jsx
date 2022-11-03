import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import uniq from "lodash/uniq";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import { Layout } from "../../components";
import client from "../../lib/apolloClient";
import PlanCard from "../../components/PlanCard";
import axios from "axios";
import useSWR from "swr";

const Plans = ({ plans, tags }) => {
	const [filteredPlans, setFilteredPlans] = useState(() => [...plans]);
	const [selectedTags, setSelectedTags] = useState([]);
	const { data: session, status } = useSession();
	const router = useRouter();

	const fetcher = (url) =>
		axios
			.get(url, { params: { id: session.user.id } })
			.then((res) => res.data);
	// Fetch user data from DB
	const { data, error, isValidating } = useSWR(
		"/api/user/get-user-details",
		fetcher
	);

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

	if (status === "unauthenticated") {
		router.push({
			pathname: "/login",
			query: { from: router.pathname },
		});
	}
	if (isValidating) {
		return <div>Loading</div>;
	}

	return (
		<Layout>
			<main className="w-11/12 mx-auto px-2">
				<p className="text-2xl">All plans</p>
				<ul className="flex flex-wrap gap-2">
					{tags.length > 0 &&
						tags.map((tag) => (
							<li key={tag}>
								<button
									value={tag}
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
						<li key={plan.slug}>
							<PlanCard user={data} plan={plan} />
						</li>
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
					createdAt
					description
					content {
						html
					}
					id
					name
					publishedAt
					updatedAt
					level
					availability
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

import { getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Link from "next/link";

export default function Home({ session }) {
	return (
		<Layout>
			<main className="min-h-screen container flex flex-col justify-evenly border border-success border-opacity-40">
				<h1 className="text-5xl text-primary-content px-1">
					Welcome to
					<span className="text-primary"> Web</span>
					<span className="text-accent">Jenga.</span>
				</h1>
				<section className="flex flex-col items-start gap-8">
					<div className="prose text-primary-content prose-2xl">
						<p>
							Connect with students and mentors in the tech
							industry.
						</p>
						<p>
							Access curated content aimed at beginners to
							advanced.
						</p>
					</div>
					<Link href="/login">
						<a className="btn w-full sm:btn-wide btn-secondary">
							Sign up
						</a>
					</Link>
				</section>
			</main>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	// Redirect to dashboard if user is logged in already
	if (session) {
		return {
			redirect: {
				destination: "/dashboard",
			},
		};
	}

	return {
		props: { session },
	};
}

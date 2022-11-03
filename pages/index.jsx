import { getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Link from "next/link";

export default function Home({ session }) {
	return (
		<Layout>
			<main className="min-h-screen container flex flex-col justify-evenly border border-primary">
				<h1 className="text-5xl text-neutral px-1">
					Welcome to Web Jenga.
				</h1>
				<section className="flex flex-col items-start gap-8">
					<div className="prose prose-2xl">
						<p>
							Connect with students and mentors in the tech
							industry.
						</p>
						<p>
							Access curated content aimed at beginners to
							advanced.
						</p>
					</div>
					<div className="flex gap-4">
						<Link href="/get-started">
							<a className="btn btn-wide btn-secondary">
								Get Started
							</a>
						</Link>
						<Link href="/login">
							<a className="btn btn-wide btn-neutral">Login</a>
						</Link>
					</div>
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

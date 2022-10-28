import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Link from "next/link";

export default function Home() {
	return (
		<Layout>
			<main className="min-h-screen container flex flex-col justify-evenly border border-primary">
				<h1 className="text-5xl text-neutral px-1">
					Welcome to Web Jenga.
				</h1>
				<section className="flex flex-col items-start gap-8">
					<div className="prose">
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

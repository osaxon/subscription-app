import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function Home() {
	return (
		<Layout>
			<main className="layout min-h-screen">
				<h1 className="text-6xl">Welcome to Web Jenga.</h1>
			</main>
		</Layout>
	);
}

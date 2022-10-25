import React from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const Dashboard = ({ session }) => {
	const { status } = useSession({ required: true });

	if (status === "authenticated") {
		return (
			<Layout>
				<main className="layout">
					<p>Welcome, {session.user.name}</p>
					<button
						className="btn btn-primary"
						onClick={() => signOut()}
					>
						Sign out
					</button>
				</main>
			</Layout>
		);
	}
};

export default Dashboard;

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/login",
			},
		};
	}

	return {
		props: { session },
	};
}

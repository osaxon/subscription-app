import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/future/image";
import Layout from "../components/Layout";

const Login = () => {
	const { data: session } = useSession();

	if (session) {
		return (
			<div>
				<p>Welcome, {session.user.name}</p>
				<button onClick={() => signOut()} className="btn btn-primary">
					Sign out
				</button>
				<Image
					className="rounded-full"
					src={session.user.image}
					width={38}
					height={38}
					alt="Your avatar"
				/>
			</div>
		);
	} else {
		return (
			<Layout>
				<div className="layout h-screen flex flex-col justify-center items-center content-center">
					<p>You&apos;re not signed in</p>
					<p>Please sign in</p>
					<button
						onClick={() => signIn()}
						className="btn btn-primary btn-wide"
					>
						Sign in
					</button>
				</div>
			</Layout>
		);
	}
};

export default Login;

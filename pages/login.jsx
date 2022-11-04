import React from "react";
import { signIn, getProviders } from "next-auth/react";
import Layout from "../components/Layout";

const Login = ({ providers }) => {
	return (
		<Layout>
			<div className="layout h-screen flex flex-col justify-center items-center content-center">
				<div className="flex flex-col items-center gap-4">
					{/* Render out all OAuth Providers for user to log in. Redirect to dashboard after successful log in. OAuth option prompts for log in every time. */}
					{Object.values(providers).map((provider) => (
						<div key={provider.name}>
							<button
								className="link"
								onClick={() =>
									signIn(provider.id, { prompt: "login" })
								}
							>
								Sign in with {provider.name}
							</button>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

export async function getServerSideProps(context) {
	const providers = await getProviders();
	return {
		props: { providers },
	};
}

export default Login;

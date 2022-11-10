import { getProviders, signIn } from "next-auth/react";

const SignIn = ({ providers }) => {
	return (
		<main className="container">
			<div className="border flex flex-col gap-4 justify-center items-center min-h-[calc(100vh-15rem)]">
				{Object.values(providers).map((provider) => (
					<div key={provider.name}>
						<button
							className="btn btn-accent btn-wide"
							onClick={() =>
								signIn(
									provider.id,
									{ callbackUrl: "/" },
									{ prompt: "login" }
								)
							}
						>
							Sign in with {provider.name}
						</button>
					</div>
				))}
			</div>
		</main>
	);
};

export default SignIn;

export async function getServerSideProps(context) {
	const providers = await getProviders();
	return {
		props: { providers },
	};
}

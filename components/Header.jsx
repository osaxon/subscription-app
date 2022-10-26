import React from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
	const { data: session, status } = useSession();

	return (
		<div className="navbar bg-base-100 w-11/12 mx-auto">
			<div className="flex-1">
				<Link href="/">
					<a className="btn btn-ghost normal-case text-xl px-0">
						WebJenga.
					</a>
				</Link>
			</div>
			<div className="flex-none">
				{status === "authenticated" ? (
					<div className="dropdown dropdown-end">
						<label
							tabIndex={0}
							className="btn btn-ghost btn-circle avatar"
						>
							<div className="w-10 rounded-full">
								<Image
									alt="Your avatar"
									src={session.user.image}
									width={40}
									height={40}
									className="rounded-full"
								/>
							</div>
						</label>
						<ul
							tabIndex={0}
							className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
						>
							<li>
								<Link
									href="/dashboard"
									className="justify-between"
								>
									Dashboard
								</Link>
							</li>
							<li>
								<Link href="/">Help</Link>
							</li>
							<li>
								<button
									className="btn btn-primary btn-sm"
									onClick={() => signOut()}
								>
									Logout
								</button>
							</li>
						</ul>
					</div>
				) : (
					<button
						onClick={() =>
							signIn(null, {
								callbackUrl:
									process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URL,
							})
						}
						className="btn btn-primary"
					>
						Sign in
					</button>
				)}
			</div>
		</div>
	);
};

export default Header;

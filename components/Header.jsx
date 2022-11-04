import React from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/future/image";
import Link from "next/link";

const Header = () => {
	const { data: session, status } = useSession();

	return (
		<div className="navbar bg-base-100 container">
			<div className="flex-1">
				<Link href="/">
					<a className="btn btn-ghost normal-case text-primary hover:text-primary-focus text-2xl px-0">
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
							<div className="w-24 mask mask-hexagon">
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
						onClick={() => signIn()}
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

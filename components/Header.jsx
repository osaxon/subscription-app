import React from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/future/image";
import Link from "next/link";
import { HEADER_NAV } from "../config";
import NavItem from "./Elements/NavItem";
import NavParent from "./Elements/NavParent";
import Avatar from "./Elements/Avatar";

const Header = () => {
	const { data: session, status } = useSession();

	return (
		<div className="navbar bg-base-100 container">
			<div className="navbar-start">
				{/* Mobile nav */}
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						{HEADER_NAV &&
							HEADER_NAV.map((item, i) => {
								switch (item.parent) {
									case false:
										return (
											<li key={i}>
												<NavItem item={item} />
											</li>
										);
									case true:
										return (
											<li key={item.name} tabIndex={i}>
												<NavParent item={item} />
											</li>
										);
								}
							})}
					</ul>
				</div>
				<Link href="/">
					<a className="text-primary text-3xl">
						Web<span className="text-accent">Jenga.</span>
					</a>
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal p-0">
					{HEADER_NAV &&
						HEADER_NAV.map((item, i) => {
							switch (item.parent) {
								case false:
									return (
										<li key={i}>
											<NavItem item={item} />
										</li>
									);
								case true:
									return (
										<li key={item.name} tabIndex={i}>
											<NavParent item={item} />
										</li>
									);
							}
						})}
				</ul>
			</div>
			<div className="navbar-end  gap-4">
				{status === "unauthenticated" ? (
					<>
						<button onClick={() => signIn()} className="link">
							Sign in
						</button>
						<button
							onClick={() => signIn()}
							className="btn btn-success min-h-8 h-8"
						>
							Sign up
						</button>
					</>
				) : (
					<Avatar image={session?.user.image} />
				)}
			</div>
		</div>
	);
};

export default Header;

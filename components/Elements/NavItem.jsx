import Link from "next/link";

const NavItem = ({ item, index }) => {
	return (
		<Link href={item.href}>
			<a>{item.name}</a>
		</Link>
	);
};

export default NavItem;

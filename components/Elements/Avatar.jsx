import Image from "next/future/image";

const Avatar = ({ image }) => {
	return (
		<div className="avatar">
			<div className="mask w-12 mask-hexagon">
				<Image
					width={64}
					height={64}
					alt="Your avatar image"
					src={image}
				/>
			</div>
		</div>
	);
};

export default Avatar;

import { getSession } from "next-auth/react";
import { prisma } from "../../../prisma/shared-client";

export const handler = async (req, res) => {
	const session = await getSession({ req });

	if (!session?.user) {
		return res.status(401).json({
			error: {
				code: "no-access",
				message: "You are not signed in.",
			},
		});
	}

	const user = await prisma.user.findUnique({
		where: {
			id: req.query.id,
		},
	});
	return res.status(200).json(user);
};

export default handler;

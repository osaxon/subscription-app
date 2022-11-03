import { PrismaClient } from "@prisma/client";
import { buffer } from "micro";
import { prisma } from "../../../prisma/shared-client";

const endpointSecret = process.env.WH_SECRET;

export const config = {
	api: {
		bodyParser: false, // don't parse body of incoming requests because we need it raw to verify signature
	},
};

const handler = async (req, res) => {
	console.log(req);
};

export default handler;

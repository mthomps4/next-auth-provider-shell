// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const jwt = await getToken({ req, secret: "FOO", raw: true });
  res.status(200).json({ cool: "test" });
}

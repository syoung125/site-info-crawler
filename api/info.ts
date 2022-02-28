import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { url } = req.query;
  res.status(200).send(`Crawl url ${url}!`);
}

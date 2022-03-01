import type { VercelRequest, VercelResponse } from "@vercel/node";

import SiteInfoCrawler from "../utils/site-info-crawler";

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { url } = req.query;

    const crawler = new SiteInfoCrawler(url.toString());
    const { result } = (await crawler.crawl()).formatImageUrl();

    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).send({ message: err?.message || "" });
  }
};

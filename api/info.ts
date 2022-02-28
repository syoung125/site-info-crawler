import type { VercelRequest, VercelResponse } from "@vercel/node";
import cheerio from "cheerio";

import { requestHTML } from "../utils/request";

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { url } = req.query;

    const html = await requestHTML(url.toString());
    const $ = await cheerio.load(html);

    const title = $('meta[property="og:title"]').attr("content");
    const imageUrl = $('meta[property="og:image"]').attr("content");
    const description = $('meta[property="og:description"]').attr("content");

    const result = {
      title,
      imageUrl,
      description,
    };

    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).send({ message: err?.message || "" });
  }
};

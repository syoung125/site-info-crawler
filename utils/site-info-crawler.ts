import cheerio, { CheerioAPI } from "cheerio";
import { correctImageUrl } from "./correct";

import { requestHTML } from "./request";

type InfoResult = {
  title: string;
  imageUrl?: string;
  description?: string;
};

export default class SiteInfoCrawler {
  public url: string;
  public hostName: string;

  public result: InfoResult = {
    title: "",
    imageUrl: undefined,
    description: undefined,
  };

  constructor(url: string) {
    this.url = encodeURI(url);
    this.hostName = new URL(url).hostname;
  }

  public async crawl() {
    const html = await requestHTML(this.url);
    const $ = await cheerio.load(html);

    const title = this.getTitle($);
    const imageUrl = this.getImgaeUrl($);
    const description = this.getDescription($);

    this.result = {
      title,
      imageUrl,
      description,
    };

    return this;
  }

  public getTitle($: CheerioAPI) {
    return (
      $('meta[property="og:title"]').attr("content") ||
      $("title").text() ||
      $('meta[name="twitter:title"]').attr("content") ||
      $("h1").text()
    );
  }

  public getImgaeUrl($: CheerioAPI) {
    return (
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      $("img").attr("src")
    );
  }

  public getDescription($: CheerioAPI) {
    return (
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content")
    );
  }

  public formatImageUrl() {
    const { imageUrl } = this.result;

    if (!imageUrl) {
      return this;
    }

    this.result = {
      ...this.result,
      imageUrl: decodeURI(correctImageUrl(imageUrl, this.hostName)),
    };

    return this;
  }
}

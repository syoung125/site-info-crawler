export default function handler(request, response) {
  const { url } = request.query;
  response.status(200).send(`Crawl url ${url}!`);
}

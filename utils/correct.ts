export const correctImageUrl = (imageUrl: string, hostname: string): string => {
  if (imageUrl.indexOf("//") === 0) {
    return `https:${imageUrl}`;
  }
  if (imageUrl[0] === "/") {
    return `https://${hostname}${imageUrl}`;
  }
  return imageUrl;
};

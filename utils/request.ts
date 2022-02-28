import axios from "axios";

export const requestHTML = async (url: string): Promise<string> => {
  const { data: html } = await axios.get(url, {
    timeout: 10000,
  });

  return html;
};

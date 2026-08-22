const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_IMAGE_URL ||
  "https://api.hostinflu.com";

export const imgUrl = BASE_URL.replace(/\/+$/, "");
export const url = `${imgUrl}/api/v1/`;
export const getBaseUrl = () => url;

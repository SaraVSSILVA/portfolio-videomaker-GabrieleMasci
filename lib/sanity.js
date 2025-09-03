export const projectId = 'f80agi77';
export const dataset = 'production';
export const apiVersion = '2025-09-02';

export async function fetchSanity(query) {
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.result;
}

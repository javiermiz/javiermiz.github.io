// Site is Spanish-only; locale data lives under src/locales/es/.
export async function getLocaleData({
  page,
}: {
  page: string;
}): Promise<unknown> {
  const data = await import(`../locales/es/${page}.json`);
  return data.default;
}

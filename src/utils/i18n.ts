export type Locale = "en" | "es";

export async function getLocaleData({
  language,
  page,
}: {
  language: Locale;
  page: string;
}): Promise<unknown> {
  try {
    const data = await import(`../locales/${language}/${page}.json`);
    return data.default;
  } catch (error) {
    console.error(`Failed to load locale data for ${language}:`, error);
    // Fallback to English if the requested locale fails to load
    if (language !== "en") {
      return getLocaleData({ language: "en", page });
    }
    throw error;
  }
}

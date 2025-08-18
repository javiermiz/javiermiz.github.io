export type SupportedLanguage = "en" | "es";

const LANGUAGE_STORAGE_KEY = "preferred_language";
const DEFAULT_LANGUAGE: SupportedLanguage = "en";
const SUPPORTED_LANGUAGES: SupportedLanguage[] = ["en", "es"];

/**
 * Detects the user's preferred language from browser settings
 * @returns {SupportedLanguage} The detected language or default fallback
 */
export function detect_browser_language(): SupportedLanguage {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  // Get browser languages in order of preference
  const browser_languages = navigator.languages || [navigator.language];

  for (const browser_lang of browser_languages) {
    // Extract language code (e.g., "es-ES" -> "es", "en-US" -> "en")
    const lang_code = browser_lang
      .split("-")[0]
      .toLowerCase() as SupportedLanguage;

    if (SUPPORTED_LANGUAGES.includes(lang_code)) {
      return lang_code;
    }
  }

  return DEFAULT_LANGUAGE;
}

/**
 * Gets the stored language preference from localStorage
 * @returns {SupportedLanguage | null} The stored language or null if not found
 */
export function get_stored_language(): SupportedLanguage | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored_lang = localStorage.getItem(
      LANGUAGE_STORAGE_KEY,
    ) as SupportedLanguage;

    if (stored_lang && SUPPORTED_LANGUAGES.includes(stored_lang)) {
      return stored_lang;
    }
  } catch (error) {
    console.warn(
      "Failed to read language preference from localStorage:",
      error,
    );
  }

  return null;
}

/**
 * Stores the language preference in localStorage
 * @param {SupportedLanguage} language - The language to store
 */
export function store_language_preference(language: SupportedLanguage): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.warn("Failed to store language preference:", error);
  }
}

/**
 * Gets the user's preferred language with fallback logic:
 * 1. Stored preference (localStorage)
 * 2. Browser language detection
 * 3. Default language
 * @returns {SupportedLanguage} The preferred language
 */
export function get_preferred_language(): SupportedLanguage {
  // First, check stored preference
  const stored_language = get_stored_language();
  if (stored_language) {
    return stored_language;
  }

  // Second, detect from browser
  const browser_language = detect_browser_language();

  // Store the detected language for future visits
  store_language_preference(browser_language);

  return browser_language;
}

/**
 * Sets the user's language preference and stores it
 * @param {SupportedLanguage} language - The language to set
 */
export function set_language_preference(language: SupportedLanguage): void {
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    console.warn(`Unsupported language: ${language}. Using default.`);
    language = DEFAULT_LANGUAGE;
  }

  store_language_preference(language);
}

/**
 * Generates the appropriate URL for the given language
 * @param {string} current_path - Current page path
 * @param {SupportedLanguage} target_language - Target language
 * @returns {string} The URL for the target language
 */
export function get_language_url(
  current_path: string,
  target_language: SupportedLanguage,
): string {
  // Remove any existing language prefix
  const clean_path = current_path.replace(/^\/es/, "") || "/";

  if (target_language === "es") {
    return clean_path === "/" ? "/es" : `/es${clean_path}`;
  }

  return clean_path;
}

/**
 * Extracts the language from the current URL path
 * @param {string} path - The URL path
 * @returns {SupportedLanguage} The language extracted from the path
 */
export function extract_language_from_path(path: string): SupportedLanguage {
  if (path.startsWith("/es")) {
    return "es";
  }
  return "en";
}

/**
 * Redirects to the preferred language if needed
 * This should be called on page load to handle automatic language detection
 */
export function handle_language_redirect(): void {
  if (typeof window === "undefined") {
    return;
  }

  const current_path = window.location.pathname;
  const current_language = extract_language_from_path(current_path);
  const preferred_language = get_preferred_language();

  // Only redirect if the current language doesn't match the preferred language
  // and we're not already on a language-specific page that was explicitly visited
  if (current_language !== preferred_language) {
    const target_url = get_language_url(current_path, preferred_language);

    // Avoid infinite redirects by checking if the URL would actually change
    if (target_url !== current_path) {
      window.location.href = target_url;
    }
  }
}

/**
 * Initializes the language system
 * Call this on page load to set up language detection and persistence
 */
export function initialize_language_system(): void {
  if (typeof window === "undefined") {
    return;
  }

  // Set up language toggle functionality
  const language_toggles = document.querySelectorAll("[data-language-toggle]");

  language_toggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault();

      const target_language = toggle.getAttribute(
        "data-target-language",
      ) as SupportedLanguage;
      if (target_language && SUPPORTED_LANGUAGES.includes(target_language)) {
        set_language_preference(target_language);

        const current_path = window.location.pathname;
        const target_url = get_language_url(current_path, target_language);
        window.location.href = target_url;
      }
    });
  });

  // Handle automatic language detection only on the home page
  // to avoid disrupting users who explicitly navigate to a specific language page
  const current_path = window.location.pathname;
  if (
    current_path === "/" ||
    current_path === "/es" ||
    current_path === "/es/"
  ) {
    // Small delay to avoid flash of content
    setTimeout(() => {
      handle_language_redirect();
    }, 100);
  }
}

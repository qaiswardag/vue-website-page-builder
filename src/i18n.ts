import { createI18n } from 'vue-i18n';

// Function to load all locale messages from JSON files
async function loadLocaleMessages() {
  const locales = import.meta.glob('./locales/*.json');
  const messages = {};
  for (const path in locales) {
    const matched = path.match(/([A-Za-z0-9-_]+)\.json$/i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      const module = await locales[path]();
      messages[locale] = module.default;
    }
  }
  return messages;
}

const messages = await loadLocaleMessages();

const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
});

export default i18n;
const CURRENCY_BY_LOCALE: Record<string, string> = {
  en: 'USD',
  it: 'EUR',
};

function currencyForLocale(locale: string): string {
  const lang = locale.split('-')[0];
  return CURRENCY_BY_LOCALE[lang] ?? 'USD';
}

export function formatPrice(cents: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyForLocale(locale),
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

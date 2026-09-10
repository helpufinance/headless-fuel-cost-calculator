export type Currency =
  | 'HUF'
  | 'EUR'
  | 'USD'
  | 'GBP'
  | 'JPY'
  | 'CNY'
  | 'AUD'
  | 'CAD'
  | 'CHF'
  | 'NZD'
  | 'SEK'
  | 'NOK'
  | 'DKK'
  | 'SGD'
  | 'HKD'
  | 'KRW'
  | 'MXN'
  | 'BRL'
  | 'INR'
  | 'RUB'
  | 'ZAR'
  | 'PLN'
  | 'TRY'
  | 'AED'
  | 'SAR'
  | 'THB'
  | 'MYR'
  | 'IDR'
  | 'PHP'
  | 'CZK'
  | 'ILS'
  | 'RON'
  | 'CLP'
  | 'ARS'
  | 'COP'
  | 'PEN'
export interface CurrencyConfig {
  symbol: string
  code: string
  name?: string
  position: 'before' | 'after'
  decimalPlaces: number
  thousandsSeparator: string
  decimalSeparator: string
  region?: 'Europe' | 'Americas' | 'Asia' | 'Middle East and Africa' | 'Oceania' | 'Other'
}
export const CURRENCY_CONFIG: Record<Currency, CurrencyConfig> = {
  EUR: {
    symbol: '€',
    code: 'EUR',
    name: 'Euro',
    region: 'Europe',
    position: 'after',
    decimalPlaces: 1,
    thousandsSeparator: ' ',
    decimalSeparator: ',',
  },
  GBP: {
    symbol: '£',
    code: 'GBP',
    name: 'British Pound',
    region: 'Europe',
    position: 'before',
    decimalPlaces: 1,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  HUF: {
    symbol: 'Ft',
    code: 'HUF',
    name: 'Hungarian Forint',
    region: 'Europe',
    position: 'after',
    decimalPlaces: 0,
    thousandsSeparator: ' ',
    decimalSeparator: ',',
  },
  CHF: {
    symbol: 'CHF',
    code: 'CHF',
    name: 'Swiss Franc',
    region: 'Europe',
    position: 'after',
    decimalPlaces: 1,
    thousandsSeparator: "'",
    decimalSeparator: '.',
  },
  SEK: {
    symbol: 'kr',
    code: 'SEK',
    name: 'Swedish Krona',
    region: 'Europe',
    position: 'after',
    decimalPlaces: 1,
    thousandsSeparator: ' ',
    decimalSeparator: ',',
  },
  NOK: {
    symbol: 'kr',
    code: 'NOK',
    name: 'Norwegian Krone',
    region: 'Europe',
    position: 'after',
    decimalPlaces: 1,
    thousandsSeparator: ' ',
    decimalSeparator: ',',
  },
  DKK: {
    symbol: 'kr',
    code: 'DKK',
    name: 'Danish Krone',
    region: 'Europe',
    position: 'after',
    decimalPlaces: 1,
    thousandsSeparator: '.',
    decimalSeparator: ',',
  },
  PLN: {
    symbol: 'zł',
    code: 'PLN',
    name: 'Polish Złoty',
    region: 'Europe',
    position: 'after',
    decimalPlaces: 1,
    thousandsSeparator: ' ',
    decimalSeparator: ',',
  },
  CZK: {
    symbol: 'Kč',
    code: 'CZK',
    name: 'Czech Koruna',
    region: 'Europe',
    position: 'after',
    decimalPlaces: 1,
    thousandsSeparator: ' ',
    decimalSeparator: ',',
  },
  RON: {
    symbol: 'lei',
    code: 'RON',
    name: 'Romanian Leu',
    region: 'Europe',
    position: 'after',
    decimalPlaces: 1,
    thousandsSeparator: '.',
    decimalSeparator: ',',
  },
  USD: {
    symbol: '$',
    code: 'USD',
    name: 'US Dollar',
    region: 'Americas',
    position: 'before',
    decimalPlaces: 1,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  CAD: {
    symbol: '$',
    code: 'CAD',
    name: 'Canadian Dollar',
    region: 'Americas',
    position: 'before',
    decimalPlaces: 1,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  MXN: {
    symbol: '$',
    code: 'MXN',
    name: 'Mexican Peso',
    region: 'Americas',
    position: 'before',
    decimalPlaces: 1,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  BRL: {
    symbol: 'R$',
    code: 'BRL',
    name: 'Brazilian Real',
    region: 'Americas',
    position: 'before',
    decimalPlaces: 1,
    thousandsSeparator: '.',
    decimalSeparator: ',',
  },
  ARS: {
    symbol: '$',
    code: 'ARS',
    name: 'Argentine Peso',
    region: 'Americas',
    position: 'before',
    decimalPlaces: 1,
    thousandsSeparator: '.',
    decimalSeparator: ',',
  },
  CLP: {
    symbol: '$',
    code: 'CLP',
    name: 'Chilean Peso',
    region: 'Americas',
    position: 'before',
    decimalPlaces: 0,
    thousandsSeparator: '.',
    decimalSeparator: ',',
  },
  COP: {
    symbol: '$',
    code: 'COP',
    name: 'Colombian Peso',
    region: 'Americas',
    position: 'before',
    decimalPlaces: 1,
    thousandsSeparator: '.',
    decimalSeparator: ',',
  },
  PEN: {
    symbol: 'S/',
    code: 'PEN',
    name: 'Peruvian Sol',
    region: 'Americas',
    position: 'before',
    decimalPlaces: 1,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  JPY: {
    symbol: '¥',
    code: 'JPY',
    name: 'Japanese Yen',
    region: 'Asia',
    position: 'before',
    decimalPlaces: 0,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  CNY: {
    symbol: '¥',
    code: 'CNY',
    name: 'Chinese Yuan',
    region: 'Asia',
    position: 'before',
    decimalPlaces: 1,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  HKD: {
    symbol: 'HK$',
    code: 'HKD',
    name: 'Hong Kong Dollar',
    region: 'Asia',
    position: 'before',
    decimalPlaces: 1,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  KRW: {
    symbol: '₩',
    code: 'KRW',
    name: 'South Korean Won',
    region: 'Asia',
    position: 'before',
    decimalPlaces: 0,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  SGD: {
    symbol: '$',
    code: 'SGD',
    name: 'Singapore Dollar',
    region: 'Asia',
    position: 'before',
    decimalPlaces: 1,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  INR: {
    symbol: '₹',
    code: 'INR',
    name: 'Indian Rupee',
    region: 'Asia',
    position: 'before',
    decimalPlaces: 1,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  THB: {
    symbol: '฿',
    code: 'THB',
    name: 'Thai Baht',
    region: 'Asia',
    position: 'before',
    decimalPlaces: 1,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  MYR: {
    symbol: 'RM',
    code: 'MYR',
    name: 'Malaysian Ringgit',
    region: 'Asia',
    position: 'before',
    decimalPlaces: 1,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  IDR: {
    symbol: 'Rp',
    code: 'IDR',
    name: 'Indonesian Rupiah',
    region: 'Asia',
    position: 'before',
    decimalPlaces: 0,
    thousandsSeparator: '.',
    decimalSeparator: ',',
  },
  PHP: {
    symbol: '₱',
    code: 'PHP',
    name: 'Philippine Peso',
    region: 'Asia',
    position: 'before',
    decimalPlaces: 1,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  AED: {
    symbol: 'د.إ',
    code: 'AED',
    name: 'UAE Dirham',
    region: 'Middle East and Africa',
    position: 'after',
    decimalPlaces: 1,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  SAR: {
    symbol: '﷼',
    code: 'SAR',
    name: 'Saudi Riyal',
    region: 'Middle East and Africa',
    position: 'after',
    decimalPlaces: 1,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  ILS: {
    symbol: '₪',
    code: 'ILS',
    name: 'Israeli New Shekel',
    region: 'Middle East and Africa',
    position: 'after',
    decimalPlaces: 1,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  ZAR: {
    symbol: 'R',
    code: 'ZAR',
    name: 'South African Rand',
    region: 'Middle East and Africa',
    position: 'before',
    decimalPlaces: 1,
    thousandsSeparator: ' ',
    decimalSeparator: '.',
  },
  AUD: {
    symbol: '$',
    code: 'AUD',
    name: 'Australian Dollar',
    region: 'Oceania',
    position: 'before',
    decimalPlaces: 1,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  NZD: {
    symbol: '$',
    code: 'NZD',
    name: 'New Zealand Dollar',
    region: 'Oceania',
    position: 'before',
    decimalPlaces: 1,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
  RUB: {
    symbol: '₽',
    code: 'RUB',
    name: 'Russian Ruble',
    region: 'Other',
    position: 'after',
    decimalPlaces: 1,
    thousandsSeparator: ' ',
    decimalSeparator: ',',
  },
  TRY: {
    symbol: '₺',
    code: 'TRY',
    name: 'Turkish Lira',
    region: 'Other',
    position: 'after',
    decimalPlaces: 1,
    thousandsSeparator: '.',
    decimalSeparator: ',',
  },
}
export function formatMoney(amount: number, currency: Currency, decimals = 2): string {
  if (!Number.isFinite(amount)) return '—'
  const config = CURRENCY_CONFIG[currency]
  const fixed = amount.toFixed(decimals)
  const [integerPart, decimalPart] = fixed.split('.')
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, config.thousandsSeparator)
  const body =
    decimals > 0 ? `${formattedInteger}${config.decimalSeparator}${decimalPart}` : formattedInteger
  return config.position === 'before' ? `${config.symbol}${body}` : `${body} ${config.symbol}`
}
export function getCurrencyConfig(currency: Currency): CurrencyConfig {
  return CURRENCY_CONFIG[currency]
}
export function getSupportedCurrencies(): Currency[] {
  return Object.keys(CURRENCY_CONFIG) as Currency[]
}
export function getCurrenciesByRegion(region: CurrencyConfig['region']): Currency[] {
  return (Object.entries(CURRENCY_CONFIG) as [Currency, CurrencyConfig][])
    .filter(([, config]) => config.region === region)
    .map(([code]) => code)
}

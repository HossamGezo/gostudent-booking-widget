export const formatCurrency = (
  value: number | string | undefined | null,
  currency: string = "EUR",
  locale: string = "de-DE",
) => {
  const amount = Number(value) || 0;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

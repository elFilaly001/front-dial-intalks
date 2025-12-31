export default function formatNumber(
  value?: number | null,
  decimals: number = 1
): string {
  // Guard against undefined / null / non-numeric inputs
  if (value === null || value === undefined) return "0";
  const num = Number(value);
  if (!isFinite(num) || Number.isNaN(num)) return "0";

  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(decimals).replace(/\.0+$/, "") + "B";
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(decimals).replace(/\.0+$/, "") + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(decimals).replace(/\.0+$/, "") + "k";
  }
  return String(num);
}

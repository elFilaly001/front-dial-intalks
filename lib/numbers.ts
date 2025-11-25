export default function formatNumber(
    value: number,
    decimals: number = 1
  ): string {
    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(decimals).replace(/\.0+$/, "") + "B";
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(decimals).replace(/\.0+$/, "") + "M";
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(decimals).replace(/\.0+$/, "") + "k";
    }
    return value.toString();
  }
  
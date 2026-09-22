export interface ParsedStat {
  prefix: string;
  target: number;
  decimals: number;
  useComma: boolean;
  suffix: string;
}

export function parseStatValue(raw: string): ParsedStat | null {
  const match = raw.match(/^(\D*?)([\d,]+(?:\.\d+)?)([\s\S]*)$/);
  if (!match) return null;

  const [, prefix, digits, suffix] = match;
  const useComma = digits.includes(",");
  const decimalPart = digits.split(".")[1];
  const decimals = decimalPart ? decimalPart.length : 0;
  const target = Number(digits.replace(/,/g, ""));

  if (Number.isNaN(target)) return null;

  return { prefix, target, decimals, useComma, suffix };
}

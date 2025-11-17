import { parseISO, addDays, differenceInCalendarDays, format } from "date-fns";

export function parseIsoDay(s: string): Date {
  // expect YYYY-MM-DD
  return parseISO(s);
}

export function formatIsoDay(d: Date): string {
  return format(d, "yyyy-MM-dd");
}

export function addDaysIso(iso: string, days: number): string {
  return formatIsoDay(addDays(parseIsoDay(iso), days));
}

export function daysBetween(aIso: string, bIso: string): number {
  return differenceInCalendarDays(parseIsoDay(bIso), parseIsoDay(aIso));
}

export function mean(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((s, v) => s + v, 0) / nums.length;
}

export function std(nums: number[]): number {
  const m = mean(nums);
  const variance =
    nums.reduce((s, v) => s + (v - m) ** 2, 0) / (nums.length || 1);
  return Math.sqrt(variance);
}

export function clamp(v: number, lo = 0, hi = 1) {
  return Math.max(lo, Math.min(hi, v));
}

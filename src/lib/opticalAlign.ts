/** Baseline offset for form controls (Checkbox/Radio/Toggle label alignment) */
export function baselineOffset(controlHeight: number, fontSize: number): number {
  return Math.round((controlHeight - fontSize) / 2)
}

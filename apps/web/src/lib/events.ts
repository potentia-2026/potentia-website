/** Tiny cross-component signals (no state library needed). */
export const PRODUCT_EVENT = 'potentia:product';
export const PREFILL_EVENT = 'potentia:prefill';

export interface PrefillDetail { country?: string; interest?: string }

export function selectProduct(index: number) {
  window.dispatchEvent(new CustomEvent<number>(PRODUCT_EVENT, { detail: index }));
}

export function prefillForm(detail: PrefillDetail) {
  window.dispatchEvent(new CustomEvent<PrefillDetail>(PREFILL_EVENT, { detail }));
}

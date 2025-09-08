export function trackLinkedInConversion(conversionId: number): void {
  if (typeof window === 'undefined') return;
  try {
    const lintrk: any = (window as any).lintrk;
    if (typeof lintrk === 'function') {
      lintrk('track', { conversion_id: conversionId });
    }
  } catch {
    // no-op
  }
}



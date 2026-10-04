export function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

export function isToday(dateString: string): boolean {
  return dateString === getToday();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function isPastDue(dateString: string): boolean {
  return dateString < getToday();
}

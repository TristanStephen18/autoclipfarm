export function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',    // "Sep"
    day: '2-digit',    // "09"
    year: 'numeric',   // "2025"
    hour: '2-digit',   // "06"
    minute: '2-digit', // "30"
    hour12: true       // "am"/"pm"
  }).format(date).replace(',', ''); // optional cleanup
}
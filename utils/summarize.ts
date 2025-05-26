export function summarizeMessage(text: string): string {
  if (!text) return 'Mensaje vacío';
  const words = text.trim().split(' ');
  if (words.length <= 5) return text;
  return words.slice(0, 5).join(' ') + '...';
}

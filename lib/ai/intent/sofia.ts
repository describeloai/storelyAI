// Puedes mejorar este handler para usar lógica de intención real
export function detectSofiaIntent(prompt: string) {
  const lower = prompt.toLowerCase();

  // Ejemplo básico: usa Claude si habla de "traducir"
  if (lower.includes('traducir') || lower.includes('translate')) {
    return {
      tool: 'text-translator',
      model: 'claude', // Aquí luego puedes cambiar a claude-3 cuando esté disponible
    };
  }

  // Por defecto usa GPT-4
  return {
    tool: 'text-generator',
    model: 'gpt-4',
  };
}

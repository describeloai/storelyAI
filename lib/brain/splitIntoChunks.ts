// 🔧 Divide texto en chunks inteligentes, preservando estructura y semántica
export function splitIntoChunks(text: string, maxTokens = 250, overlapTokens = 40): string[] {
  const normalize = (str: string) =>
    str
      .replace(/\r\n|\r|\n/g, '\n') // normaliza saltos
      .replace(/\s+/g, ' ')         // colapsa espacios
      .trim();

  const estimateTokens = (str: string) => Math.ceil(str.length / 4); // estimación básica

  const paragraphs = normalize(text).split(/\n{2,}/); // separa por párrafos dobles
  const chunks: string[] = [];

  let currentChunk: string[] = [];
  let currentTokens = 0;

  for (const para of paragraphs) {
    const sentences = para.split(/(?<=[.!?])\s+/);

    for (const sentence of sentences) {
      const sentenceTokens = estimateTokens(sentence);

      if (currentTokens + sentenceTokens > maxTokens) {
        // Guardar chunk actual
        if (currentChunk.length > 0) {
          chunks.push(currentChunk.join(' '));
        }

        // Calcular overlap real
        let overlap: string[] = [];
        let overlapCount = 0;

        for (let i = currentChunk.length - 1; i >= 0; i--) {
          const t = estimateTokens(currentChunk[i]);
          if (overlapCount + t > overlapTokens) break;
          overlap.unshift(currentChunk[i]);
          overlapCount += t;
        }

        // Iniciar nuevo chunk con overlap + frase actual
        currentChunk = [...overlap, sentence];
        currentTokens = estimateTokens(currentChunk.join(' '));
      } else {
        currentChunk.push(sentence);
        currentTokens += sentenceTokens;
      }
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(' '));
  }

  return chunks;
}
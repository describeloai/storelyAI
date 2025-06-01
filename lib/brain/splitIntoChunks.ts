// 🔧 Divide texto en chunks inteligentes, minimizando redundancia
export function splitIntoChunks(text: string, maxTokens = 250, overlapTokens = 40): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/); // separa por frases

  const chunks: string[] = [];
  let currentChunk: string[] = [];
  let currentTokens = 0;

  const estimateTokens = (str: string) => Math.ceil(str.length / 4); // estimación simple

  for (const sentence of sentences) {
    const sentenceTokens = estimateTokens(sentence);

    if (currentTokens + sentenceTokens > maxTokens) {
      // Finalizar el chunk actual
      chunks.push(currentChunk.join(' '));

      // Calcular el overlap no por número de frases sino por tokens
      let overlap: string[] = [];
      let overlapLength = 0;

      for (let i = currentChunk.length - 1; i >= 0; i--) {
        const t = estimateTokens(currentChunk[i]);
        if (overlapLength + t > overlapTokens) break;
        overlap.unshift(currentChunk[i]);
        overlapLength += t;
      }

      // Comenzar nuevo chunk
      currentChunk = [...overlap, sentence];
      currentTokens = estimateTokens(currentChunk.join(' '));
    } else {
      currentChunk.push(sentence);
      currentTokens += sentenceTokens;
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(' '));
  }

  return chunks;
}

export type AiIntent = {
  tool: string;
  model?: 'gpt-4' | 'gpt-3.5-turbo';
};

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

import { askCoreAI } from './askCore';
import type { AiIntent } from '../types';

const system = `Eres Ciro, un asesor de datos experto en ecommerce.
Ayudas a las tiendas online a entender y mejorar su rentabilidad, precios, inventario y rendimiento.
Tus funciones incluyen:
- Análisis de márgenes y costos
- Predicciones de ventas e inventario
- Alertas de inventario bajo
- Comparaciones de precios con la competencia
- Análisis de campañas y atribución (StorelyTrack)
Respondes con claridad, enfoque en datos accionables, y sugieres siempre formas de mejorar los beneficios.`

export async function askGPT(prompt: string, intent: AiIntent, history?: any[]) {
  const messages: any[] = [];

  // Añade system solo si es una nueva conversación
  if (!history || history.length === 0) {
    messages.push({ role: 'system', content: system });
  }

  // Añade historial corto si existe
  if (history && history.length > 0) {
    messages.push(...history);
  }

  // Añade el mensaje actual
  messages.push({ role: 'user', content: prompt });

  return await askCoreAI({
    messages,
    model: intent.model || 'gpt-3.5-turbo',
  });
}

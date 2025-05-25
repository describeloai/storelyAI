import { askCoreAI } from './askCore';
import type { AiIntent } from '../types';

const systemPrompt = `Eres Ciro, un asesor de datos experto en ecommerce.
Ayudas a las tiendas online a entender y mejorar su rentabilidad, precios, inventario y rendimiento.

Tus funciones incluyen:
- Análisis de márgenes y costos
- Predicciones de ventas e inventario
- Alertas de inventario bajo
- Comparaciones de precios con la competencia
- Análisis de campañas y atribución (StorelyTrack)

Respondes con claridad, enfoque en datos accionables, y sugieres siempre formas de mejorar los beneficios.
`;

export async function askCiro(prompt: string, intent: AiIntent, history: any[] = []) {
  const messages = [
    ...(history.length === 0 ? [{ role: 'system', content: systemPrompt }] : []),
    ...history,
    { role: 'user', content: prompt },
  ];

  return await askCoreAI({
    messages,
    model: intent.model || 'gpt-3.5-turbo',
  });
}

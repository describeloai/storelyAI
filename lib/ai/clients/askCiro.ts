import { askBaseAI } from '@/lib/ai/clients/askBaseAI';
import type { AiIntent } from '@/lib/ai/types';

const defaultPrompt = `Eres Ciro, un asesor de datos experto en ecommerce.
Ayudas a las tiendas online a entender y mejorar su rentabilidad, precios, inventario y rendimiento.

Tus funciones incluyen:
- Análisis de márgenes y costos
- Predicciones de ventas e inventario
- Alertas de inventario bajo
- Comparaciones de precios con la competencia
- Análisis de campañas y atribución (StorelyTrack)

Respondes con claridad, enfoque en datos accionables, y sugieres siempre formas de mejorar los beneficios.
`;

export async function askCiro(
  prompt: string,
  intent: AiIntent,
  history: any[] = [],
  systemPrompt: string = defaultPrompt
) {
  return await askBaseAI({
    prompt,
    intent,
    systemPrompt,
    history,
  });
}

export const dynamic = 'force-dynamic';

const LANG_NAMES = { en: 'English', ka: 'Georgian', ru: 'Russian' };

const FALLBACK = {
  en: {
    description:
      'The Samsung 55" QLED 4K TV delivers rich Quantum Dot color, sharp 4K upscaling and a slim AirSlim design. Smart Hub brings streaming apps, gaming features and voice control together in one place.',
    seoTitle: 'Samsung 55" QLED 4K Smart TV — Buy at MetroMart',
    seoDescription:
      'Samsung 55" QLED 4K TV with Quantum Dot color and Smart Hub. Official warranty, installment plans and fast delivery from MetroMart.',
    altText: 'Samsung 55-inch QLED 4K television with a slim bezel, front view',
  },
  ka: {
    description:
      'Samsung 55" QLED 4K ტელევიზორი გამოირჩევა Quantum Dot ფერებით, მკვეთრი 4K გამოსახულებით და თხელი AirSlim დიზაინით. Smart Hub აერთიანებს სტრიმინგის აპებს, სათამაშო ფუნქციებსა და ხმოვან მართვას.',
    seoTitle: 'Samsung 55" QLED 4K Smart TV — იყიდე MetroMart-ზე',
    seoDescription:
      'Samsung 55" QLED 4K ტელევიზორი Quantum Dot ფერებით და Smart Hub-ით. ოფიციალური გარანტია, განვადება და სწრაფი მიწოდება MetroMart-იდან.',
    altText: 'Samsung 55-დუიმიანი QLED 4K ტელევიზორი თხელი ჩარჩოთი, ხედი წინიდან',
  },
  ru: {
    description:
      'Телевизор Samsung 55" QLED 4K отличается насыщенными цветами Quantum Dot, чётким 4K-масштабированием и тонким дизайном AirSlim. Smart Hub объединяет стриминговые приложения, игровые функции и голосовое управление.',
    seoTitle: 'Samsung 55" QLED 4K Smart TV — купить в MetroMart',
    seoDescription:
      'Samsung 55" QLED 4K с цветами Quantum Dot и Smart Hub. Официальная гарантия, рассрочка и быстрая доставка от MetroMart.',
    altText: 'Телевизор Samsung 55 дюймов QLED 4K с тонкой рамкой, вид спереди',
  },
};

export async function POST(req) {
  let product = '';
  let lang = 'en';
  try {
    const body = await req.json();
    product = String(body.product || '').slice(0, 200);
    lang = ['en', 'ka', 'ru'].includes(body.lang) ? body.lang : 'en';
  } catch (e) {}

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key || !product) {
    return Response.json({ ...FALLBACK[lang], fallback: true });
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        messages: [
          {
            role: 'user',
            content:
              'You generate e-commerce catalog content for MetroMart, an electronics and appliance store in Georgia. ' +
              'For the product below, write in ' + LANG_NAMES[lang] + ' and return ONLY valid JSON (no markdown, no code fences) with exactly these keys: ' +
              '"description" (2-3 sentences, factual and premium in tone, do not invent specific technical specs), ' +
              '"seoTitle" (max 60 characters, include product and MetroMart), ' +
              '"seoDescription" (max 155 characters), ' +
              '"altText" (one concise sentence describing the product image). ' +
              'Product: ' + product,
          },
        ],
      }),
      signal: AbortSignal.timeout(25000),
    });
    if (!res.ok) throw new Error('api ' + res.status);
    const data = await res.json();
    let text = (data.content && data.content[0] && data.content[0].text) || '';
    text = text.replace(/```json|```/g, '').trim();
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    const parsed = JSON.parse(text.slice(start, end + 1));
    return Response.json({
      description: parsed.description,
      seoTitle: parsed.seoTitle,
      seoDescription: parsed.seoDescription,
      altText: parsed.altText,
    });
  } catch (e) {
    return Response.json({ ...FALLBACK[lang], fallback: true });
  }
}

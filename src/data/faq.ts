// Visible FAQ answers. Plain text only (the same text feeds the FAQPage structured data).
// Anything the owner has not confirmed is phrased neutrally or sent to Whop's own pages.
export interface Faq { q: string; a: string }

export const faqs: Faq[] = [
  { q: 'What is IRONFUEL?', a: 'IRONFUEL is a fitness education brand. It publishes evidence-aware guides on muscle growth, training, nutrition, supplements, recovery and progress tracking, and shares educational content on a free public Telegram channel.' },
  { q: 'Who are the guides for?', a: 'They are written in plain language for people who train and want to understand why they are doing what they do, including beginners and intermediate lifters. They are educational guides, not personal coaching.' },
  { q: 'Is the Telegram channel free?', a: 'Yes. The IRONFUEL Telegram channel is a free, public educational channel. You can follow it without buying anything.' },
  { q: 'Where can I get the guides?', a: 'The guides are sold through the IRONFUEL store on Whop. Each guide on this page links to its Whop page, where the price, what is included and the delivery details are shown before you buy.' },
  { q: 'How are the guides different from typical fitness content?', a: 'Each guide separates what research supports from coaching advice and from IRONFUEL frameworks, and says openly where the evidence is limited, so you can tell what is researched and what is practical judgment.' },
  { q: 'Do the guides replace medical or professional advice?', a: 'No. IRONFUEL content is educational information only. It does not replace advice from a doctor or another qualified professional. Please read the full educational disclaimer.' },
  { q: 'Can you guarantee results?', a: 'No. Results depend on many factors, including training, nutrition, recovery, sleep, health and consistency. IRONFUEL does not promise specific outcomes.' },
  { q: 'Who do I contact about an order or payment?', a: 'Orders and payments are handled on Whop, so questions about an order go through the support link on the IRONFUEL store page on Whop.' },
];

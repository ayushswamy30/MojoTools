import { business } from './site'

/**
 * Legal pages (docs/LEGAL.md). Written for Indian law: DPDP Act 2023 + DPDP Rules 2025,
 * IT Act 2000, Consumer Protection Act 2019 + E-Commerce Rules 2020, CCPA dark-pattern
 * guidelines 2023. Business facts come from `site.ts`, so they update with it.
 *
 * DRAFT: the owner and a legal adviser must review the wording before launch (T5.1, T17.2).
 * Values marked 🟡 in `policySettings` are defaults the owner must confirm (OPEN-QUESTIONS A13).
 *
 * Inline links use `[label](/path)`; a block can be a paragraph or a bullet list.
 */
export type PolicyBlock = string | { list: string[] }

export type Policy = {
  slug: string
  title: string
  description: string
  updated: string
  sections: { id: string; heading: string; body: PolicyBlock[] }[]
  showCookieSettings?: boolean
}

/** 🟡 Defaults the owner must confirm (OPEN-QUESTIONS A13). */
export const policySettings = {
  lastUpdated: '11 October 2026',
  reportProblemDays: 7,
  refundWorkingDays: 7,
  enquiryRetentionYears: 3,
  privacyResponseDays: 30,
}

const s = policySettings
const officer = business.grievanceOfficer
const contactLine = `${business.name}, ${business.address.line1}, ${business.address.city}, ${business.address.state} ${business.address.pincode}. Phone ${business.phone}, email ${business.email}.`
const officerLine = `${officer.name}, ${officer.designation}. Email [${officer.email}](mailto:${officer.email}), phone ${officer.phone}. Address: ${business.address.line1}, ${business.address.city}, ${business.address.state} ${business.address.pincode}.`

export const policies: Policy[] = [
  {
    slug: 'terms',
    title: 'Terms and conditions',
    description: `The terms that apply when you use the ${business.name} website or buy from us.`,
    updated: s.lastUpdated,
    sections: [
      {
        id: 'who-we-are',
        heading: '1. Who we are',
        body: [
          `This website is run by ${business.legalName}, trading as ${business.name} (“we”, “us”). ${contactLine}`,
          ...(business.gstin ? [`GSTIN: ${business.gstin}.`] : []),
          'By using this website you agree to these terms. If you do not agree, please do not use the site.',
        ],
      },
      {
        id: 'using-the-site',
        heading: '2. Using this website',
        body: [
          'You may use this website to learn about our products and brands, and to contact us. You must not:',
          {
            list: [
              'break the law or anyone’s rights while using the site;',
              'try to get unauthorised access to the site, our systems or other people’s data;',
              'send spam, malware or automated bulk enquiries through our forms or chat;',
              'copy large parts of the site or its content for commercial use without our written permission.',
            ],
          },
        ],
      },
      {
        id: 'product-information',
        heading: '3. Product information',
        body: [
          'We take care to describe products accurately. Specifications, images and descriptions mostly come from the manufacturers and can change without notice. Images may be for illustration only. Please check the specification that matters to you with us before you order.',
          'Brand names, logos and trademarks belong to their owners. Showing a brand does not mean the brand endorses us, except where we say that we are an official distributor of that brand.',
          'Always use tools and machinery as the manufacturer instructs, with suitable safety equipment.',
        ],
      },
      {
        id: 'quotes-and-prices',
        heading: '4. Quotes and prices',
        body: [
          'Prices are given in a written quote, in Indian rupees. Each quote says whether GST is included, any delivery charges, and how long it is valid. A quote is not a binding order until we confirm the order in writing or issue an invoice.',
          'If we find an obvious error in a price or description, we will tell you before the order is confirmed and you can choose to continue or cancel.',
        ],
      },
      {
        id: 'orders-payment-delivery',
        heading: '5. Orders, payment and delivery',
        body: [
          'Payment terms and delivery details are set out in your quote or order confirmation. Delivery dates are our best estimate; we will tell you promptly about any delay.',
          'Please check goods when they arrive and tell us about any damage, shortage or wrong item as explained in our [refunds and returns policy](/policies/refunds).',
          'Business buyers must give a correct GSTIN and billing details so that we can issue a valid tax invoice.',
        ],
      },
      {
        id: 'returns-warranty',
        heading: '6. Cancellations, returns and warranty',
        body: [
          'Cancellations, returns and refunds are covered by our [refunds and returns policy](/policies/refunds).',
          'Products carry the manufacturer’s warranty where one is offered. The manufacturer sets the warranty terms, and claims are usually handled by its authorised service centres. We will help you make a claim.',
        ],
      },
      {
        id: 'assistant',
        heading: '7. Mojo Mitra, our AI assistant',
        body: [
          'Mojo Mitra is an automated assistant. It can make mistakes, and nothing it says is a quote, an offer or advice we are bound by. Prices, stock and delivery are confirmed only in a written quote from our team.',
        ],
      },
      {
        id: 'intellectual-property',
        heading: '8. Our content',
        body: [
          `The text, design and layout of this website belong to ${business.name} or are used with permission. Product images and brand logos belong to their owners.`,
        ],
      },
      {
        id: 'other-websites',
        heading: '9. Links to other services',
        body: [
          'Some links open services run by others, such as WhatsApp or Google Maps. Their own terms and privacy policies apply there.',
        ],
      },
      {
        id: 'liability',
        heading: '10. Our responsibility to you',
        body: [
          'Nothing in these terms takes away your rights under the Consumer Protection Act, 2019 or any other law that cannot be excluded.',
          'Subject to that, we are not responsible for losses that we could not reasonably foresee, or for business losses such as loss of profit or downtime, and our total responsibility for any order is limited to the price paid for that order.',
        ],
      },
      {
        id: 'disputes',
        heading: '11. Law and disputes',
        body: [
          `These terms are governed by the laws of India. If a dispute cannot be settled with our grievance officer, the courts at ${business.address.city} have jurisdiction. Consumers may also contact the National Consumer Helpline (dial 1915) or file a complaint with the consumer commission that has jurisdiction.`,
        ],
      },
      {
        id: 'grievance-officer',
        heading: '12. Grievance officer',
        body: [
          officerLine,
          'We will acknowledge your complaint within 48 hours and resolve it within one month of receiving it.',
        ],
      },
      {
        id: 'changes',
        heading: '13. Changes to these terms',
        body: [
          'We may update these terms. The date at the top shows when they last changed. Orders are governed by the terms in force when the order was confirmed.',
        ],
      },
    ],
  },
  {
    slug: 'privacy',
    title: 'Privacy policy',
    description: `How ${business.name} collects, uses and protects your personal data, and your rights.`,
    updated: s.lastUpdated,
    sections: [
      {
        id: 'who-we-are',
        heading: '1. Who we are',
        body: [
          `${business.legalName}, trading as ${business.name}, decides how your personal data is used on this website (we are the “Data Fiduciary” under the Digital Personal Data Protection Act, 2023). ${contactLine}`,
          `For privacy questions or requests, email [${business.privacyEmail}](mailto:${business.privacyEmail}).`,
        ],
      },
      {
        id: 'what-we-collect',
        heading: '2. What we collect, and why',
        body: [
          'We collect only what we need for each purpose:',
          {
            list: [
              'Enquiry and quote form: your name and mobile number (required), and if you choose to give them, your email, company, GSTIN, the brand or category you are interested in, your message and any file you attach. We use these to reply to you, prepare quotes and, if you buy, to invoice and deliver.',
              'Newsletter: your email address, only if you tick the box to agree. We use it to send occasional product news and offers. Every email has an unsubscribe link.',
              'Chat with Mojo Mitra: the messages you type, used to answer you. Please do not share bank, card, Aadhaar or other identity details in the chat.',
              'Calls, WhatsApp and email: what you tell us, used to help you.',
              'Security data: your IP address and basic browser information, used to protect our forms from spam and abuse.',
              'Analytics and campaign data, only if you accept analytics cookies: which pages you visit and which website or campaign brought you here. See our [cookie policy](/policies/cookies).',
            ],
          },
          'We do not collect card or bank details on this website.',
        ],
      },
      {
        id: 'legal-basis',
        heading: '3. Our legal basis',
        body: [
          'We use your personal data with your consent, which you give when you send a form, subscribe, chat with Mojo Mitra or accept analytics cookies. We also use it where the law allows without consent, for example to keep tax records required under GST law or to respond to a legal request.',
        ],
      },
      {
        id: 'sharing',
        heading: '4. Who we share it with',
        body: [
          'We do not sell your personal data. We share it only with service providers who process it for us under contract, and only for the purposes above:',
          {
            list: [
              'Vercel: hosts this website.',
              'Supabase: stores enquiries, attachments and newsletter sign-ups.',
              'Resend: sends our emails, including the copy of your enquiry.',
              'Cloudflare Turnstile: checks that a form is sent by a person, not a bot.',
              'Google Analytics (Google): measures site use, only if you accept analytics cookies.',
              'Google Gemini or Groq: generates Mojo Mitra’s replies.',
              'Google Maps: shows our location, only if you choose to load the map.',
              'WhatsApp (Meta): only if you choose to message us on WhatsApp.',
            ],
          },
          'We may also share data when the law requires it, for example with tax authorities or the police.',
        ],
      },
      {
        id: 'outside-india',
        heading: '5. Data stored outside India',
        body: [
          'Some of these providers store or process data outside India. We transfer data only as allowed under Indian law, and never to a country the Government of India has restricted.',
        ],
      },
      {
        id: 'retention',
        heading: '6. How long we keep it',
        body: [
          {
            list: [
              `Enquiries and attachments: up to ${s.enquiryRetentionYears} years after our last contact with you, unless you become a customer.`,
              'Customer orders and invoices: for as long as GST and tax laws require.',
              'Newsletter: until you unsubscribe or ask us to delete it.',
              'Security and processing logs: at least one year, as the DPDP Rules require, then deleted.',
              'Mojo Mitra chats: we do not keep a copy of your chat after the reply is sent. The AI provider processes it under its own terms.',
              'Analytics data: up to 14 months in Google Analytics.',
            ],
          },
        ],
      },
      {
        id: 'security',
        heading: '7. How we protect it',
        body: [
          'The site uses HTTPS. Enquiries and attachments are kept in a private database and storage that only authorised staff can access. If a personal data breach happens, we will inform you and the Data Protection Board of India as the law requires.',
        ],
      },
      {
        id: 'your-rights',
        heading: '8. Your rights',
        body: [
          'Under the Digital Personal Data Protection Act, 2023 you can:',
          {
            list: [
              'ask for a summary of the personal data we hold about you and who we shared it with;',
              'ask us to correct, complete or update it;',
              'ask us to erase it, unless we must keep it by law;',
              'withdraw your consent at any time: use “Cookie settings” at the bottom of any page, the unsubscribe link in our emails, or email us;',
              'nominate someone to use these rights for you if you die or cannot act;',
              'complain to our grievance officer, and then to the Data Protection Board of India.',
            ],
          },
          `Email [${business.privacyEmail}](mailto:${business.privacyEmail}) to use these rights. We may need to confirm who you are. We will reply within ${s.privacyResponseDays} days. Withdrawing consent does not affect what we did before, but we may then be unable to answer an open enquiry.`,
        ],
      },
      {
        id: 'children',
        heading: '9. Children',
        body: [
          'This website is for businesses and adults. We do not knowingly collect personal data from anyone under 18. If you are under 18, please do not send us your details.',
        ],
      },
      {
        id: 'grievance-officer',
        heading: '10. Grievance officer',
        body: [officerLine],
      },
      {
        id: 'changes',
        heading: '11. Changes to this policy',
        body: [
          'If we change how we use your personal data, we will update this page and change the date at the top. For important changes we will ask for your consent again where required.',
        ],
      },
    ],
  },
  {
    slug: 'cookies',
    title: 'Cookie policy',
    description: `The cookies ${business.name} uses, why, and how to change your choice.`,
    updated: s.lastUpdated,
    showCookieSettings: true,
    sections: [
      {
        id: 'what-are-cookies',
        heading: '1. What cookies are',
        body: [
          'Cookies are small text files a website stores in your browser. We use as few as possible, and nothing that tracks you for advertising.',
        ],
      },
      {
        id: 'essential',
        heading: '2. Essential cookies (always on)',
        body: [
          {
            list: [
              '`mt_consent`: remembers your cookie choice, so we don’t ask on every page. Kept for 6 months.',
            ],
          },
          'Our form security check (Cloudflare Turnstile) and our website host may also use strictly necessary technical data to keep the site secure. It is not used for analytics or advertising.',
        ],
      },
      {
        id: 'analytics',
        heading: '3. Analytics cookies (only if you accept)',
        body: [
          {
            list: [
              '`_ga` and `_ga_<id>` (Google Analytics): count visits and show which pages are useful. Kept for up to 2 years.',
              '`mt_attr`: remembers which website or campaign link first brought you here, so we know which campaigns lead to enquiries. Kept for 30 days.',
            ],
          },
          'These are off until you choose “Accept all” or turn on analytics in “Manage”. If you later turn them off, we stop analytics and delete these cookies.',
        ],
      },
      {
        id: 'third-party',
        heading: '4. Other services',
        body: [
          'The map on our contact page comes from Google Maps. It loads only when you press “Show map”, and Google may then set its own cookies. Links to WhatsApp take you to a service with its own cookie and privacy policies.',
        ],
      },
      {
        id: 'your-choice',
        heading: '5. Changing your choice',
        body: [
          'You can change or withdraw your choice at any time with the “Cookie settings” button below or at the bottom of every page. You can also block or delete cookies in your browser settings; the site will still work.',
        ],
      },
    ],
  },
  {
    slug: 'refunds',
    title: 'Refunds and returns',
    description: `Cancellations, returns, replacements and refunds at ${business.name}.`,
    updated: s.lastUpdated,
    sections: [
      {
        id: 'scope',
        heading: '1. What this policy covers',
        body: [
          'This policy applies to orders placed with us by quote, phone, WhatsApp, email, in our store or online. Your quote or invoice may include extra terms for a specific item, such as a special order; if it does, we will point them out before you confirm the order.',
          'Nothing in this policy affects your rights under the Consumer Protection Act, 2019.',
        ],
      },
      {
        id: 'cancellations',
        heading: '2. Cancelling an order',
        body: [
          'You can cancel an order free of charge before we dispatch it or before you collect it. Items we order specially for you (for example, non-stock items or goods cut to size) may not be cancellable once we have ordered them; we will tell you this in the quote, before you confirm.',
          'If we have to cancel an order, we will tell you promptly and refund anything you have paid in full.',
        ],
      },
      {
        id: 'problems',
        heading: '3. Damaged, wrong, missing or faulty items',
        body: [
          `Please check your goods on delivery. If anything is damaged, wrong, missing or faulty on arrival, tell us within ${s.reportProblemDays} days of delivery, with your invoice or order number and photos where possible.`,
          'Once we have checked the problem, we will replace the item, repair it or refund you, at no cost to you. We will arrange collection where needed.',
        ],
      },
      {
        id: 'other-returns',
        heading: '4. Returns for other reasons',
        body: [
          `If you ordered the wrong item or no longer need it, contact us within ${s.reportProblemDays} days of delivery. We can accept it back if it is unused, complete and in its original packaging. We will tell you before you send it whether we can accept it and whether a return delivery cost applies.`,
          'For hygiene, safety or practical reasons we cannot accept returns of these items unless they are faulty or wrong:',
          {
            list: [
              'consumables that have been opened or used, such as cutting discs, blades, bits and abrasives;',
              'items cut to length or made or ordered specially for you;',
              'personal protective equipment that has been unpacked or worn;',
              'electrical items that have been installed or used.',
            ],
          },
        ],
      },
      {
        id: 'warranty',
        heading: '5. Faults after use (warranty)',
        body: [
          'If a product develops a fault after use, the manufacturer’s warranty applies. Most claims are handled by the brand’s authorised service centre. Contact us with your invoice and we will help you make the claim.',
        ],
      },
      {
        id: 'refunds',
        heading: '6. How refunds are paid',
        body: [
          `We pay approved refunds within ${s.refundWorkingDays} working days, to the original payment method, or by bank transfer for cash or NEFT payments. Business buyers receive a GST credit note.`,
        ],
      },
      {
        id: 'how-to-ask',
        heading: '7. How to ask',
        body: [
          `Call ${business.phone}, email [${business.email}](mailto:${business.email}), or [raise a support request](/quote?type=support). If you are not happy with the outcome, contact our grievance officer: ${officer.name}, [${officer.email}](mailto:${officer.email}).`,
        ],
      },
    ],
  },
  {
    slug: 'accessibility',
    title: 'Accessibility statement',
    description: `How ${business.name} makes this website usable for everyone, and how to report a problem.`,
    updated: s.lastUpdated,
    sections: [
      {
        id: 'commitment',
        heading: 'Our commitment',
        body: [
          'We want everyone to be able to use this website. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.',
        ],
      },
      {
        id: 'what-we-do',
        heading: 'What we have done',
        body: [
          {
            list: [
              'Every page and form works with a keyboard alone, with a visible focus outline and a “Skip to main content” link.',
              'Form fields have visible labels; errors explain how to fix them and are announced to screen readers.',
              'Text and controls meet WCAG colour contrast minimums.',
              'Images that carry meaning have text alternatives; decorative images are hidden from screen readers.',
              'Animations stop when your device asks for reduced motion, and the slideshow can be paused.',
              'Pages are checked with automated accessibility tests whenever the site changes.',
            ],
          },
        ],
      },
      {
        id: 'known-issues',
        heading: 'Known limitations',
        body: [
          'The Google Maps view on the contact page is provided by Google and may not be fully accessible. Our address is always shown as text next to it.',
        ],
      },
      {
        id: 'report',
        heading: 'Report a problem',
        body: [
          `If something on this site doesn’t work for you, call ${business.phone}, email [${business.email}](mailto:${business.email}) or [raise a support request](/quote?type=support). We will reply ${business.responsePromise}.`,
        ],
      },
    ],
  },
]

export function getPolicy(slug: string) {
  return policies.find((policy) => policy.slug === slug)
}

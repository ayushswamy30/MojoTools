/**
 * SEED — DRAFT policy text. Placeholders only: the owner (and ideally a legal adviser) must
 * review the final wording before launch (TASKS T5.1, T17.2). R1 adds shipping, returns,
 * cancellation and grievance-officer pages.
 */
export type Policy = {
  slug: string
  title: string
  updated: string
  sections: { heading: string; body: string[] }[]
}

export const policies: Policy[] = [
  {
    slug: 'terms',
    title: 'Terms of use',
    updated: 'Draft — not yet reviewed',
    sections: [
      {
        heading: 'About these terms',
        body: [
          'Placeholder: these terms govern use of the Mojo Tools website. Final text to be supplied and reviewed by the owner.',
        ],
      },
      {
        heading: 'Information on this site',
        body: [
          'Placeholder: product information, brands and availability are indicative until confirmed in a written quote.',
        ],
      },
      { heading: 'Contact', body: ['Placeholder: how to contact Mojo Tools about these terms.'] },
    ],
  },
  {
    slug: 'privacy',
    title: 'Privacy policy',
    updated: 'Draft — not yet reviewed',
    sections: [
      {
        heading: 'What we collect',
        body: [
          'When you send an enquiry we collect your name, mobile number and the details you choose to give (email, company, GSTIN, message and any file you attach).',
          'If you accept analytics cookies we also collect anonymous usage data through Google Analytics. Essential cookies remember your cookie choice and where you first came from (for example a campaign link).',
        ],
      },
      {
        heading: 'Why we use it',
        body: [
          'To reply to your enquiry, prepare quotes, and with your consent send occasional product news. We do not sell your data.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'Under the Digital Personal Data Protection Act, 2023 you can ask to see, correct or delete your personal data, and withdraw consent at any time. Placeholder: email {privacy contact} to make a request.',
        ],
      },
      {
        heading: 'Contact',
        body: ['Placeholder: name and contact details of the person handling privacy requests.'],
      },
    ],
  },
  {
    slug: 'accessibility',
    title: 'Accessibility statement',
    updated: 'Draft — not yet reviewed',
    sections: [
      {
        heading: 'Our commitment',
        body: [
          'We want everyone to be able to use this website. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.',
        ],
      },
      {
        heading: 'What we do',
        body: [
          'Pages are tested with automated accessibility checks on every change, and with keyboard-only use and screen readers before each release.',
        ],
      },
      {
        heading: 'Report a problem',
        body: [
          'If something on this site doesn’t work for you, call or WhatsApp us, or send an enquiry of type “Support”. We’ll respond within 1 working day.',
        ],
      },
    ],
  },
]

export function getPolicy(slug: string) {
  return policies.find((policy) => policy.slug === slug)
}

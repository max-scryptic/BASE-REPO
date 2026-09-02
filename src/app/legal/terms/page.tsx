import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata = {
  title: "Terms and Conditions",
  description:
    "Placeholder terms and conditions for the base SaaS template. Replace before launch.",
};

const sections: LegalSection[] = [
  {
    heading: "1. Agreement to these terms",
    paragraphs: [
      "These terms describe the agreement between you and the company operating this product. By creating an account or using the service you accept them in full.",
      "Replace this section with the entity name, contact address, and the date the agreement takes effect.",
    ],
  },
  {
    heading: "2. Accounts",
    paragraphs: [
      "You are responsible for the accuracy of the details on your account and for keeping your credentials secure. Notify us straight away if you believe an account has been used without permission.",
      "Describe here any age limits, one-account-per-person rules, and how team or workspace ownership is handled.",
    ],
  },
  {
    heading: "3. Acceptable use",
    paragraphs: [
      "Do not use the service to break the law, infringe someone else's rights, distribute malware, or interfere with the availability of the service for other customers.",
      "List the specific prohibitions that matter for your product, and the process for suspending an account that breaches them.",
    ],
  },
  {
    heading: "4. Subscriptions and billing",
    paragraphs: [
      "Paid plans renew automatically for the interval shown at checkout until cancelled. Prices, currencies, and taxes are those displayed on the plan selection screen.",
      "Set out your refund, proration, trial, and cancellation rules here so they match what the billing provider actually does.",
    ],
  },
  {
    heading: "5. Your content",
    paragraphs: [
      "You keep ownership of the content you upload. You grant us the limited licence needed to host, process, and display that content in order to run the service.",
      "Explain how long content is retained after cancellation and how it can be exported.",
    ],
  },
  {
    heading: "6. Availability and support",
    paragraphs: [
      "The service is provided on an as-is basis. Planned maintenance, third-party outages, and factors outside our reasonable control may interrupt availability.",
      "Add any uptime commitment, support hours, or service-level terms that apply to your plans.",
    ],
  },
  {
    heading: "7. Liability",
    paragraphs: [
      "To the extent permitted by law, our aggregate liability is limited, and we are not liable for indirect or consequential loss.",
      "This wording must be reviewed by a qualified lawyer for your jurisdiction before it is relied on.",
    ],
  },
  {
    heading: "8. Changes and termination",
    paragraphs: [
      "We may update these terms as the product changes and will give reasonable notice of material changes. You may close your account at any time.",
      "State how notice is given, when changes take effect, and what happens to data on termination.",
    ],
  },
  {
    heading: "9. Contact",
    paragraphs: [
      "Questions about these terms can be sent to the contact address published on your marketing site.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      description="The rules that apply when you create an account and use this product."
      lastUpdated="1 January 2026"
      sections={sections}
    />
  );
}

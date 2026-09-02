import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Placeholder privacy policy for the base SaaS template. Replace before launch.",
};

const sections: LegalSection[] = [
  {
    heading: "1. Who we are",
    paragraphs: [
      "This policy explains how the company operating this product collects, uses, and protects personal data.",
      "Replace this section with your legal entity, registered address, and the contact point for privacy questions.",
    ],
  },
  {
    heading: "2. Data we collect",
    paragraphs: [
      "Account data such as your name and email address, billing data handled by our payment provider, and usage data such as pages visited and features used.",
      "List every category your product actually collects, including anything gathered by analytics or support tooling.",
    ],
  },
  {
    heading: "3. How we use it",
    paragraphs: [
      "To provide and secure the service, process payments, respond to support requests, and to send service messages about your account.",
      "Note the legal basis for each purpose if you serve users in a jurisdiction that requires one.",
    ],
  },
  {
    heading: "4. Sharing and processors",
    paragraphs: [
      "We share data with the processors that run the service on our behalf, such as hosting, payment, email, and analytics providers. We do not sell personal data.",
      "Name your processors here, along with the countries their processing takes place in.",
    ],
  },
  {
    heading: "5. Retention",
    paragraphs: [
      "Account data is kept while your account is active and for a limited period afterwards to meet legal and accounting obligations.",
      "State the actual retention periods for each category of data.",
    ],
  },
  {
    heading: "6. Your rights",
    paragraphs: [
      "Depending on where you live you may have the right to access, correct, export, or delete your personal data, and to object to some processing.",
      "Describe how a request is made and how quickly it is answered.",
    ],
  },
  {
    heading: "7. Cookies and similar technologies",
    paragraphs: [
      "We use cookies that are necessary to keep you signed in, and optional cookies for analytics where you have consented.",
      "Replace this with the specific cookies your build sets, and link to a consent control if you use one.",
    ],
  },
  {
    heading: "8. Security",
    paragraphs: [
      "We use encryption in transit, access controls, and audited infrastructure providers to protect personal data. No service can guarantee absolute security.",
      "Describe the safeguards that genuinely apply to your deployment and your breach notification process.",
    ],
  },
  {
    heading: "9. Changes and contact",
    paragraphs: [
      "We will update this policy as the product changes and will note the date of the most recent revision at the top of this page.",
      "Publish a monitored contact address for privacy requests.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How personal data is collected, used, and protected in this product."
      lastUpdated="1 January 2026"
      sections={sections}
    />
  );
}

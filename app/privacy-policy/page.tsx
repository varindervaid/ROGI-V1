import Layout from "@/components/layout"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const privacyPolicySections = [
  {
    title: "Information We Collect",
    content: `
      <p>We collect various types of information to provide and improve our services, including:</p>
      <ul>
        <li>Personal information (e.g., name, email address, phone number)</li>
        <li>Financial information (e.g., income, assets, debts)</li>
        <li>Property information (for mortgage calculations and applications)</li>
        <li>Usage data (e.g., how you interact with our website)</li>
      </ul>
    `,
  },
  {
    title: "How We Use Your Information",
    content: `
      <p>We use the collected information for various purposes, including:</p>
      <ul>
        <li>Providing and maintaining our services</li>
        <li>Processing mortgage applications and calculations</li>
        <li>Communicating with you about our services</li>
        <li>Improving our website and user experience</li>
        <li>Complying with legal obligations</li>
      </ul>
    `,
  },
  {
    title: "Data Security",
    content: `
      <p>We implement appropriate technical and organizational measures to protect your personal information, including:</p>
      <ul>
        <li>Encryption of sensitive data</li>
        <li>Regular security assessments</li>
        <li>Employee training on data protection</li>
        <li>Access controls to limit data exposure</li>
      </ul>
    `,
  },
  {
    title: "Your Rights",
    content: `
      <p>You have certain rights regarding your personal information, including:</p>
      <ul>
        <li>The right to access your personal data</li>
        <li>The right to rectify inaccurate information</li>
        <li>The right to erasure (the "right to be forgotten")</li>
        <li>The right to restrict processing</li>
        <li>The right to data portability</li>
      </ul>
    `,
  },
  {
    title: "Third-Party Services",
    content: `
      <p>We may use third-party services that collect, monitor and analyze data. These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
    `,
  },
  {
    title: "Changes to This Privacy Policy",
    content: `
      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.</p>
    `,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-8">
          At LendGenius, we are committed to protecting your privacy and ensuring the security of your personal
          information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you use
          our website and services.
        </p>
        <Accordion type="single" collapsible className="w-full">
          {privacyPolicySections.map((section, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{section.title}</AccordionTrigger>
              <AccordionContent>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-8">
          If you have any questions about this Privacy Policy, please contact us at privacy@lendgenius.com.
        </p>
      </div>
    </Layout>
  )
}

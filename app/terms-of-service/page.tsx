import Layout from "@/components/layout"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const termsOfServiceSections = [
  {
    title: "Acceptance of Terms",
    content: `
      <p>By accessing or using LendGenius services, you agree to these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.</p>
    `,
  },
  {
    title: "Use of Services",
    content: `
      <p>Our services are intended for informational purposes only. While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website.</p>
    `,
  },
  {
    title: "User Responsibilities",
    content: `
      <p>You are responsible for:</p>
      <ul>
        <li>Ensuring that all information you provide to us is accurate and up-to-date</li>
        <li>Maintaining the confidentiality of your account and password</li>
        <li>Restricting access to your computer or mobile device</li>
        <li>Accepting responsibility for all activities that occur under your account or password</li>
      </ul>
    `,
  },
  {
    title: "Intellectual Property",
    content: `
      <p>The content, organization, graphics, design, compilation, magnetic translation, digital conversion, and other matters related to the Site are protected under applicable copyrights, trademarks, and other proprietary rights. Copying, redistribution, use, or publication by you of any such matters or any part of the Site is strictly prohibited without our express written permission.</p>
    `,
  },
  {
    title: "Limitation of Liability",
    content: `
      <p>In no event shall LendGenius be liable for any direct, indirect, incidental, consequential, or exemplary damages arising from your use of the site or services. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses, even if we have been advised of the possibility of such damages.</p>
    `,
  },
  {
    title: "Governing Law",
    content: `
      <p>These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>
    `,
  },
  {
    title: "Changes to Terms",
    content: `
      <p>We reserve the right to modify these Terms of Service at any time. We will notify users of any significant changes by posting a notice on our website. Your continued use of the site after changes are posted constitutes your acceptance of the amended terms.</p>
    `,
  },
]

export default function TermsOfServicePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-8">
          Welcome to LendGenius. By using our website and services, you agree to comply with and be bound by the
          following terms and conditions of use. Please review these terms carefully.
        </p>
        <Accordion type="single" collapsible className="w-full">
          {termsOfServiceSections.map((section, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{section.title}</AccordionTrigger>
              <AccordionContent>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-8">
          If you have any questions about these Terms of Service, please contact us at legal@lendgenius.com.
        </p>
      </div>
    </Layout>
  )
}

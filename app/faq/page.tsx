import Layout from "@/components/layout"
import FAQSection from "@/components/faq-section"

export default function FAQPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
        <FAQSection />
      </div>
    </Layout>
  )
}

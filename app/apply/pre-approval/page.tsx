"use client"

import { Suspense } from "react"
import Layout from "@/components/layout"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { PreApprovalForm } from "@/components/pre-approval-form"

export default function PreApprovalApplicationPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/apply" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Application Options
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">Pre-Approval Application</h1>

        <Suspense fallback={<div className="text-center py-10">Loading form...</div>}>
          <PreApprovalForm />
        </Suspense>
      </div>
    </Layout>
  )
}

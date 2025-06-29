import { ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function IntercityEstimatePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Intercity Courier Service Estimate</h1>
              <p className="text-lg text-gray-600">Inter-city delivery solutions</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Intercity Courier Service Page
            </h2>
            <p className="text-gray-500 mb-8">
              This page is under construction. Estimate and booking functionality will be available soon.
            </p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

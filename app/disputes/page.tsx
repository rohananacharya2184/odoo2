export default function DisputesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dispute Resolution Center</h1>

          <div className="grid gap-6">
            {/* Active Disputes */}
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Active Disputes</h2>
              <div className="text-center py-8 text-gray-500">
                <p>No active disputes</p>
                <p className="text-sm mt-2">We'll help resolve any issues that arise with your transactions</p>
              </div>
            </div>

            {/* File New Dispute */}
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">File a New Dispute</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Order ID</label>
                  <input type="text" className="w-full p-3 border rounded-lg" placeholder="Enter your order ID" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Issue Type</label>
                  <select className="w-full p-3 border rounded-lg">
                    <option>Item not received</option>
                    <option>Item not as described</option>
                    <option>Damaged item</option>
                    <option>Seller communication issues</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    className="w-full p-3 border rounded-lg h-32"
                    placeholder="Please describe the issue in detail..."
                  />
                </div>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                  Submit Dispute
                </button>
              </div>
            </div>

            {/* Resolution Process */}
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">How Disputes Work</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">File Your Dispute</h3>
                    <p className="text-gray-600 text-sm">Provide details about your issue with supporting evidence</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">Seller Response</h3>
                    <p className="text-gray-600 text-sm">The seller has 48 hours to respond and propose a solution</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Mediation</h3>
                    <p className="text-gray-600 text-sm">If needed, our team will step in to help resolve the issue</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium">Resolution</h3>
                    <p className="text-gray-600 text-sm">Final decision and any refunds or returns are processed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

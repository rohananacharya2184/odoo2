export default function UserReviewsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-600">U</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">User Reviews</h1>
              <p className="text-gray-600">Reviews for User #{params.id}</p>
            </div>
          </div>

          {/* Review Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-gray-600">Total Reviews</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">0.0</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">0%</div>
              <div className="text-sm text-gray-600">Positive Reviews</div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Reviews</h2>
            <div className="text-center py-8 text-gray-500">
              <p>No reviews yet</p>
              <p className="text-sm mt-2">Reviews will appear here once this user receives feedback</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

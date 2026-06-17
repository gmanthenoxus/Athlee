'use client';

import Link from 'next/link';

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Feed</h1>
          <p className="mt-2 text-gray-600">Your personalized sports activity feed</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Locations Card */}
          <Link href="/locations">
            <div className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow cursor-pointer text-center">
              <div className="text-5xl mb-4">📍</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Explore Locations</h2>
              <p className="text-gray-600">Browse sports facilities in your area</p>
            </div>
          </Link>

          {/* Matches Card */}
          <div className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow cursor-pointer text-center opacity-50">
            <div className="text-5xl mb-4">⚽</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Find Matches</h2>
            <p className="text-gray-600">Coming soon</p>
          </div>

          {/* Communities Card */}
          <div className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow cursor-pointer text-center opacity-50">
            <div className="text-5xl mb-4">👥</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Communities</h2>
            <p className="text-gray-600">Coming soon</p>
          </div>
        </div>

        {/* Feed Content Placeholder */}
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-600 text-lg">Your feed activity will appear here</p>
        </div>
      </div>
    </div>
  );
}


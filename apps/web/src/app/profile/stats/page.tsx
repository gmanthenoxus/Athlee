'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  TrendingUp,
  History,
  Award,
  BarChart3,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function PlayerStatsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      id: 'match-history',
      title: 'Match History',
      description: 'Review your past performances and game stats',
      icon: <History className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      href: '/profile/match-history',
    },
    {
      id: 'leaderboards',
      title: 'Leaderboards',
      description: 'See where you rank against other players',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      href: '/leaderboards',
    },
    {
      id: 'achievements',
      title: 'Achievements',
      description: 'View badges and milestones you\'ve earned',
      icon: <Award className="w-8 h-8" />,
      color: 'from-amber-500 to-amber-600',
      href: '/profile/achievements',
    },
    {
      id: 'stats-overview',
      title: 'Statistics',
      description: 'Detailed analytics of your performance',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      href: '/profile/statistics',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Performance</h1>
          <div className="w-6" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Welcome Card */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back, {('firstName' in (user || {}) ? (user as any).firstName : null) || (user as any)?.username || 'Player'}!
          </h2>
          <p className="text-gray-600 mt-2">
            Track your performance and see where you stand
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {statCards.map((card) => (
            <button
              key={card.id}
              onClick={() => router.push(card.href)}
              className="group text-left p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200"
            >
              {/* Icon Background */}
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                {card.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600">{card.description}</p>

              {/* Arrow Indicator */}
              <div className="mt-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Stats Section */}
        <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded">
              <p className="text-2xl font-bold text-gray-900">—</p>
              <p className="text-xs text-gray-600 mt-2">Matches Played</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded">
              <p className="text-2xl font-bold text-gray-900">—</p>
              <p className="text-xs text-gray-600 mt-2">Win Rate</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded">
              <p className="text-2xl font-bold text-gray-900">—</p>
              <p className="text-xs text-gray-600 mt-2">Avg Points</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded">
              <p className="text-2xl font-bold text-gray-900">—</p>
              <p className="text-xs text-gray-600 mt-2">Current Rank</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

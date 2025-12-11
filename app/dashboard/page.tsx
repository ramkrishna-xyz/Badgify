'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

interface BadgeStats {
  badge: string;
  views: number;
}

interface DailyStats {
  date: string;
  count: number;
}

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalViews: 0,
    topBadges: [] as BadgeStats[],
    viewsByDay: [] as DailyStats[],
  });

  useEffect(() => {
    // In a real implementation, this would check auth state
    // and fetch analytics from the API
    const checkAuth = async () => {
      try {
        // Placeholder: assume not authenticated in demo mode
        setIsAuthenticated(false);
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleGitHubLogin = () => {
    // In a real implementation, this would redirect to GitHub OAuth
    alert('GitHub login would be implemented with @auth/core');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
            <p className="text-gray-600 mb-6">
              Sign in with your GitHub account to view analytics and track badge views.
            </p>
            <button
              onClick={handleGitHubLogin}
              className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.545 2.914 1.209.092-.937.349-1.546.635-1.9-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.717c.852.004 1.71.114 2.513.334 1.906-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.195 20 14.44 20 10.017 20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              Sign in with GitHub
            </button>
            <p className="text-sm text-gray-500 mt-6">
              Note: GitHub authentication will be configured during deployment
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Views Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-gray-600 text-sm font-semibold mb-2">Total Views</h2>
            <p className="text-4xl font-bold text-blue-600">{stats.totalViews.toLocaleString()}</p>
            <p className="text-gray-500 text-sm mt-2">All badge views tracked</p>
          </div>

          {/* Active Badges Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-gray-600 text-sm font-semibold mb-2">Active Badges</h2>
            <p className="text-4xl font-bold text-green-600">{stats.topBadges.length}</p>
            <p className="text-gray-500 text-sm mt-2">Unique badges tracked</p>
          </div>

          {/* Today's Views Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-gray-600 text-sm font-semibold mb-2">Today's Views</h2>
            <p className="text-4xl font-bold text-purple-600">
              {stats.viewsByDay.length > 0 ? stats.viewsByDay[0].count : 0}
            </p>
            <p className="text-gray-500 text-sm mt-2">Views in last 24 hours</p>
          </div>
        </div>

        {/* Top Badges Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top Badges</h2>
          {stats.topBadges.length > 0 ? (
            <div className="space-y-3">
              {stats.topBadges.map((badge, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                  <span className="text-gray-700">{badge.badge}</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {badge.views} views
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No badge views yet. Start sharing your badges!</p>
          )}
        </div>

        {/* Views by Day Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Views by Day</h2>
          {stats.viewsByDay.length > 0 ? (
            <div className="space-y-3">
              {stats.viewsByDay.map((day, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                  <span className="text-gray-700">{new Date(day.date).toLocaleDateString()}</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-4">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min(100, (day.count / Math.max(...stats.viewsByDay.map(d => d.count), 1)) * 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-gray-600 font-semibold w-16 text-right">{day.count}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No views recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

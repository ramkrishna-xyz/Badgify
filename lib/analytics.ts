/**
 * Analytics Module for Badgify
 * Tracks badge views using Vercel KV (opt-in via ?track=true)
 */

export interface BadgeView {
  timestamp: number;
  label: string;
  value: string;
  path: string;
  userAgent?: string;
}

export interface AnalyticsStats {
  totalViews: number;
  topBadges: Array<{ badge: string; views: number }>;
  recentViews: BadgeView[];
  viewsByDay: Array<{ date: string; count: number }>;
}

/**
 * Track a badge view (requires Vercel KV)
 * This will be called from the API routes
 */
export async function trackBadgeView(
  label: string,
  value: string,
  path: string,
  userAgent?: string
): Promise<void> {
  // In production, this would connect to Vercel KV
  // For now, this is a placeholder for the API routes to implement
  try {
    const kv = await getKVClient();
    if (!kv) return;

    const view: BadgeView = {
      timestamp: Date.now(),
      label,
      value,
      path,
      userAgent,
    };

    // Store view in KV with expiration (30 days)
    await kv.lpush('badge:views', JSON.stringify(view));
    await kv.expire('badge:views', 60 * 60 * 24 * 30);

    // Increment total views
    await kv.incr('badge:totalViews');

    // Track badge-specific views
    const badgeKey = `badge:${label}:${value}`;
    await kv.incr(badgeKey);
  } catch (error) {
    // Silently fail - analytics should not break badge serving
    console.error('Analytics tracking failed:', error);
  }
}

/**
 * Get analytics statistics
 */
export async function getAnalyticsStats(): Promise<AnalyticsStats> {
  try {
    const kv = await getKVClient();
    if (!kv) {
      return {
        totalViews: 0,
        topBadges: [],
        recentViews: [],
        viewsByDay: [],
      };
    }

    const totalViews = (await kv.get('badge:totalViews')) || 0;
    const views = await kv.lrange('badge:views', 0, 99);

    const recentViews: BadgeView[] = views
      .map((v) => {
        try {
          return JSON.parse(v as string) as BadgeView;
        } catch {
          return null;
        }
      })
      .filter((v) => v !== null) as BadgeView[];

    // Group by badge
    const badgeViews: Record<string, number> = {};
    recentViews.forEach((view) => {
      const badge = `${view.label}/${view.value}`;
      badgeViews[badge] = (badgeViews[badge] || 0) + 1;
    });

    const topBadges = Object.entries(badgeViews)
      .map(([badge, views]) => ({ badge, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Group by day
    const viewsByDay: Record<string, number> = {};
    recentViews.forEach((view) => {
      const date = new Date(view.timestamp).toISOString().split('T')[0];
      viewsByDay[date] = (viewsByDay[date] || 0) + 1;
    });

    return {
      totalViews: Number(totalViews) || 0,
      topBadges,
      recentViews,
      viewsByDay: Object.entries(viewsByDay).map(([date, count]) => ({
        date,
        count,
      })),
    };
  } catch (error) {
    console.error('Failed to get analytics stats:', error);
    return {
      totalViews: 0,
      topBadges: [],
      recentViews: [],
      viewsByDay: [],
    };
  }
}

/**
 * Get KV client (from environment or return null if not configured)
 */
async function getKVClient() {
  try {
    // Try to import Vercel KV if available
    const { kv } = await import('@vercel/kv');
    return kv;
  } catch {
    return null;
  }
}

/**
 * Clear all analytics data (admin only)
 */
export async function clearAnalytics(): Promise<void> {
  try {
    const kv = await getKVClient();
    if (!kv) return;

    await kv.del('badge:views');
    await kv.del('badge:totalViews');
  } catch (error) {
    console.error('Failed to clear analytics:', error);
  }
}

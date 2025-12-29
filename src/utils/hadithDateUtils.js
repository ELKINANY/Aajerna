/**
 * Utility to calculate a deterministic daily index for Hadiths
 * based on a fixed deployment date.
 */

const DEPLOYMENT_DATE = new Date("2025-1-1"); // Fixed deployment date
const TOTAL_HADITHS = 40465;
const PER_PAGE = 25;

export const getDailyHadithIndexInfo = () => {
  const now = new Date();

  // Create UTC dates to ensure consistency across timezones
  const start = Date.UTC(
    DEPLOYMENT_DATE.getUTCFullYear(),
    DEPLOYMENT_DATE.getUTCMonth(),
    DEPLOYMENT_DATE.getUTCDate()
  );
  const today = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );

  const diffInMs = today - start;
  const daysPassed = Math.max(0, Math.floor(diffInMs / (1000 * 60 * 60 * 24)));

  // 1-based index
  const globalIndex = (daysPassed % TOTAL_HADITHS) + 1;

  // Calculate page and index within page
  const targetPage = Math.ceil(globalIndex / PER_PAGE);
  const indexInPage = (globalIndex - 1) % PER_PAGE;

  return {
    globalIndex,
    targetPage,
    indexInPage,
  };
};

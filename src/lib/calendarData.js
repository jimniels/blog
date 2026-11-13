/**
 * Shapes posts into the year/month/day grid that PostsCalendar.ori.html renders.
 * Titles and labels come back already escaped, so the template is pure markup.
 *
 * @param {import("types").Post[]} posts
 */
export function calendarYears(posts) {
  const postsByDate = new Map();
  for (const post of posts) {
    const date = post.date.slice(0, 10);
    const list = postsByDate.get(date);
    if (list) {
      list.push(post);
    } else {
      postsByDate.set(date, [post]);
    }
  }

  const newestYear = Number(posts[0].date.slice(0, 4));
  const oldestDate = posts[posts.length - 1].date;
  const oldestYear = Number(oldestDate.slice(0, 4));
  // Start the oldest year on the 3-month row that contains the first post
  const oldestStartMonth =
    Math.floor((Number(oldestDate.slice(5, 7)) - 1) / 3) * 3;

  const now = new Date();
  const today = {
    year: now.getFullYear(),
    month: now.getMonth(),
    day: now.getDate(),
  };

  const years = [];
  for (let year = newestYear; year >= oldestYear; year--) {
    const startMonth = year === oldestYear ? oldestStartMonth : 0;
    const months = [];
    for (let month = startMonth; month < 12; month++) {
      months.push(buildMonth(year, month, postsByDate, today));
    }
    years.push({ year, months });
  }
  return years;
}

function buildMonth(year, monthIndex, postsByDate, today) {
  const name = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    new Date(year, monthIndex, 1)
  );
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const mm = String(monthIndex + 1).padStart(2, "0");
  const future =
    year > today.year || (year === today.year && monthIndex > today.month);

  const cells = [];
  for (let i = 0; i < firstWeekday; i++) {
    cells.push({ blank: true });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${year}-${mm}-${String(day).padStart(2, "0")}`;
    const dayPosts = postsByDate.get(date) || [];
    cells.push({
      blank: false,
      day,
      date,
      id: `cal-${date}`,
      future:
        future ||
        (year === today.year && monthIndex === today.month && day > today.day),
      hasPost: dayPosts.length > 0,
      hn: dayPosts.some((post) => post.hackerNews),
      label: escapeAttr(
        new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(new Date(year, monthIndex, day))
      ),
      href: dayPosts.length > 0 ? dayPosts[0].path : "",
      posts: dayPosts.map((post) => ({
        path: post.path,
        title: escapeHtml(post.title),
        hn: Boolean(post.hackerNews),
      })),
    });
  }

  return { name, future, cells };
}

/** @param {string} value */
function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

/** @param {string} value */
function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

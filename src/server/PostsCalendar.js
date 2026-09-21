import { html } from "./utils.js";

/**
 * Year-at-a-glance calendars with a dot on each day that has a post.
 * @param {import("types").Post[]} posts
 */
export function PostsCalendar(posts) {
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
  const years = [];
  for (let year = newestYear; year >= oldestYear; year--) {
    years.push(year);
  }

  const now = new Date();
  const today = {
    year: now.getFullYear(),
    month: now.getMonth(),
    day: now.getDate(),
  };

  return html`${years.map((year) =>
    renderYear(
      year,
      postsByDate,
      today,
      year === oldestYear ? oldestStartMonth : 0
    )
  )}`;
}

/**
 * @param {number} year
 * @param {Map<string, import("types").Post[]>} postsByDate
 * @param {{ year: number, month: number, day: number }} today
 * @param {number} startMonth
 */
function renderYear(year, postsByDate, today, startMonth) {
  const months = [];
  for (let month = startMonth; month < 12; month++) {
    months.push(renderMonth(year, month, postsByDate, today));
  }

  return html`
    <section class="calendar-year" id="${year}">
      <h2 class="archive-year">${year}</h2>
      <div class="calendar-months">${months}</div>
    </section>
  `;
}

/**
 * @param {number} year
 * @param {number} monthIndex
 * @param {Map<string, import("types").Post[]>} postsByDate
 * @param {{ year: number, month: number, day: number }} today
 */
function renderMonth(year, monthIndex, postsByDate, today) {
  const monthName = new Intl.DateTimeFormat("en-US", {
    month: "short",
  }).format(new Date(year, monthIndex, 1));
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const mm = String(monthIndex + 1).padStart(2, "0");
  const isFutureMonth =
    year > today.year || (year === today.year && monthIndex > today.month);

  const cells = [];
  for (let i = 0; i < firstWeekday; i++) {
    cells.push(html`<span class="calendar-day"></span>`);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${year}-${mm}-${String(day).padStart(2, "0")}`;
    const isFutureDay =
      isFutureMonth ||
      (year === today.year && monthIndex === today.month && day > today.day);
    cells.push(renderDay(day, date, postsByDate.get(date) || [], isFutureDay));
  }

  return html`
    <div
      class="calendar-month${isFutureMonth ? " calendar-month--future" : ""}"
    >
      <h3>${monthName}</h3>
      <div class="calendar-grid">${cells}</div>
    </div>
  `;
}

/**
 * @param {number} day
 * @param {string} date
 * @param {import("types").Post[]} posts
 * @param {boolean} isFuture
 */
function renderDay(day, date, posts, isFuture) {
  const futureClass = isFuture ? " calendar-day--future" : "";

  if (posts.length === 0) {
    return html`<span class="calendar-day${futureClass}">${day}</span>`;
  }

  const id = `cal-${date}`;
  const [year, month] = date.split("-").map(Number);
  const label = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
  const hnClass = posts.some((post) => post.hackerNews)
    ? " calendar-day--post-hn"
    : "";

  return html`
    <span class="calendar-day calendar-day--has-post${futureClass}">
      <a
        href="${posts[0].path}"
        class="calendar-day--post${hnClass}"
        aria-label="${escapeAttr(label)}"
        aria-controls="${id}-popover"
      ></a>
      <div id="${id}-popover" class="calendar-popover">
        ${posts.map(
          (post) => html`
            <a href="${post.path}">
              <span>${escapeHtml(post.title)}</span>
              ${post.hackerNews
                ? html`<span class="calendar-popover-hn"
                    >→ Hit Hacker News</span
                  >`
                : ""}
            </a>
          `
        )}
      </div>
    </span>
  `;
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

export default PostsCalendar;

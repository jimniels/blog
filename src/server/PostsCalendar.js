import { html } from "./utils.js";

/**
 * Year-at-a-glance calendars with a dot (and link) on each day that has a post.
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
  const oldestYear = Number(posts[posts.length - 1].date.slice(0, 4));
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

  return html`${years.map((year) => renderYear(year, postsByDate, today))}`;
}

/**
 * @param {number} year
 * @param {Map<string, import("types").Post[]>} postsByDate
 * @param {{ year: number, month: number, day: number }} today
 */
function renderYear(year, postsByDate, today) {
  const months = [];
  for (let month = 0; month < 12; month++) {
    months.push(renderMonth(year, month, postsByDate, today));
  }

  return html`
    <section class="calendar-year" id="${year}">
      <h2>${year}</h2>
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
    cells.push(renderDay(day, postsByDate.get(date) || [], isFutureDay));
  }

  return html`
    <div class="calendar-month${isFutureMonth ? " calendar-month--future" : ""}">
      <h3>${monthName}</h3>
      <div class="calendar-grid">${cells}</div>
    </div>
  `;
}

/**
 * @param {number} day
 * @param {import("types").Post[]} posts
 * @param {boolean} isFuture
 */
function renderDay(day, posts, isFuture) {
  const futureClass = isFuture ? " calendar-day--future" : "";

  if (posts.length === 0) {
    return html`<span class="calendar-day${futureClass}">${day}</span>`;
  }

  if (posts.length === 1) {
    const post = posts[0];
    return html`
      <a
        class="calendar-day calendar-day--post${futureClass}"
        href="${post.path}"
        title="${escapeAttr(post.title)}"
        aria-label="${escapeAttr(`${day}: ${post.title}`)}"
      ></a>
    `;
  }

  return html`
    <span class="calendar-day calendar-day--posts${futureClass}">
      ${posts.map(
        (post) => html`
          <a
            class="calendar-day--post"
            href="${post.path}"
            title="${escapeAttr(post.title)}"
            aria-label="${escapeAttr(`${day}: ${post.title}`)}"
          ></a>
        `
      )}
    </span>
  `;
}

/** @param {string} value */
function escapeAttr(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

export default PostsCalendar;

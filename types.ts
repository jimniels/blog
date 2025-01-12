// Data model for all data part of the site. This should be stingify-able
export type Site = {
  name: string;
  origin: string;
  externalLinks: Array<{
    domain: string;
    count: number;
    // In theory, one day, there could be more info here, e.g.
    // { sourceUrl: "...", sourceText: "click here", targetUrl: "...", }
    links: Array<{ sourceUrl: string; targetUrl: string }>;
  }>;
  internalLinksByPath: { [path: string]: Array<string> };
  posts: Array<Post>;

  /**
   * An array of tags which are their own unique IDs. Tags _do not_ include the
   * hastag symbol (`#`) in them,  e.g. `readingNotes`
   * Default sort for tags is by count (most common -> least common)
   */
  tags: Array<{ name: string; count: number }>;
};

export type Post = {
  id: string; // File name, which is a combo of date and slug, i.e. `2019-01-05-my-slug`
  title: string;
  date: string; // ISO8601 datestring
  slug: string; // Slug of post, i.e. `my-post`
  path: string; // Path to the post, i.e. `/2019/my-post/`
  permalink: string; // Fully qualified URL (site.origin + post.path)
  contents: string; // Originally the markdown, converted to HTML in metalsmith
  tags: Array<string>;
  wordCount?: number;
  pageviews?: number; // Pageviews according to netlify analytics
  hackerNews?: {
    url: string;
    comments: number;
    points: number;
  };
  isFav: boolean;
  footnotes: string; // Could be an empty string, meaning no footnotes
};

export type Page = {
  title: string;
  path: string;
};

export type DynamicPage = {
  path: string;
  contents: string;
};

export default function ArchiveJSON(site) {
  const { origin, posts } = site;

  return JSON.stringify(
    posts
      .filter((post) => !post?.tags.includes("rssClub"))
      .map(({ title, permalink, date, tags }) => ({
        title,
        permalink,
        date,
        tags,
      }))
  );
}

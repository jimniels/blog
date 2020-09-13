export default function ArchiveJSON(site) {
  const { origin, posts } = site;

  return JSON.stringify(
    posts.map(({ title, permalink, date, tags }) => ({
      title,
      permalink: origin + permalink,
      date,
      tags,
    }))
  );
}

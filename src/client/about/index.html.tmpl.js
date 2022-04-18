import { Page } from "../../server/Layouts.js";
import { html } from "../../server/utils.js";

const page = {
  title: "About",
  path: "/about/",
};

const links = [
  {
    name: "Internal Links",
    link: "/about/internal-links/",
    description: "A visual representation of my blog’s links between posts.",
  },
  {
    name: "Outbound Links",
    link: "/about/outbound-links/",
    description:
      "A list of my blog’s outbound links, sorted by most reoccuring domain.",
  },
  {
    name: "Inbound Links (Coming Soon)",
    link: "",
    description: "A list of inbound links to my blog. More to come…",
  },
];

export default function About(site) {
  return Page(
    { site, page },
    html`
      <main class="copy">
        <p class="image-container">
          <img
            src="/assets/img/jimniels.jpg"
            width="800"
            height="419"
            alt="Portrait of Jim Nielsen"
          />
        </p>

        <h1>About</h1>

        <p>Hello, I’m <a href="https://www.jim-nielsen.com">Jim Nielsen</a>.</p>

        <p>
          In the past, I put off writing because I was unable to do my best—“if
          you can’t do something right, don’t do it at all”.
        </p>
        <p>
          But lately I’ve found myself regretting not writing down at least
          <em>something</em>.
        </p>

        <p>
          So my current posture towards blogging is: something is better than
          nothing.
        </p>

        <h2>Meta Info</h2>
        <dl>
          ${links.map(
            ({ name, link, description }) => html`
              <dt><a href="${link}">${name}</a></dt>
              <dd>${description}</dd>
            `
          )}
        </dl>
      </main>
    `
  );
}

import { jim } from "./utils.js";

const navItems = [
  {
    id: "home",
    label: "Posts",
    path: "/"
  },
  {
    id: "tags",
    label: "Tags",
    path: "/tags/"
  },
  {
    id: "about",
    label: "About",
    path: "/about/"
  },
  {
    id: "feeds",
    label: "Feeds",
    path: "/feeds/"
  }
];

// prettier-ignore
const Nav = ({ site, page }) => jim`
  <div class="nav-wrapper">
    <a href="/" class="nav__img">
      <img
        src="https://cdn.jim-nielsen.com/shared/jim-nielsen-portrait.jpg"
        alt="Photograph of Jim Nielsen"
        width="250"
        height="250"
      />
    </a> 

    <h1 class="nav__title">
      Jim’s Weblog
    </h1>

    <ul>
      ${navItems.map(navItem => `
        <li class="${page.id == navItem.id ? "active" : ""}">
          ${page.id == navItem.id
            ? navItem.label
            : `<a href="${navItem.path}">
                ${navItem.label}
              </a>`}
        </li>
      `)}
      <!--
        <li>
          <a href="https://www.jim-nielsen.com">jim-nielsen.com</a>
        </li>
        -->
    </ul>
    
  </div>
`;

export default Nav;

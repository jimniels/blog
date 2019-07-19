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
    <div class="nav__img">
      <a href="/">
        <img src="https://www.jim-nielsen.com/assets/img/profile.jpg" alt="Photography of Jim Nielsen" />
      </a>
    </div>

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
      
        <li>
          <a href="https://www.jim-nielsen.com">jim-nielsen.com</a>
        </li>
      
    </ul>

    <p>
      Hi, I’m <a href="http://jim-nielsen.com/">Jim Nielsen</a>. This is my blog, where I seek clarity through writing. 
    </p>
  </div>
`;

export default Nav;

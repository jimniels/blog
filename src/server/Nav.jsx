const React = require("react");

const navItems = [
  {
    id: "home",
    label: "Home",
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
const Nav = ({ site: { baseurl }, page }) => 
  <div class="nav-wrapper">
    <div class="nav__img">
      <img src="https://www.jim-nielsen.com/assets/img/profile.jpg" alt="Photography of Jim Nielsen" />
    </div>

    <ul>
      {navItems.map(navItem => 
        <li className={page.id == navItem.id ? "active" : ""}>
          {page.id == navItem.id
            ? navItem.label
            : <a href={baseurl + navItem.path}>
                {navItem.label}
              </a>}
        </li>)}
    </ul>

    <p>
      Hi, I’m <a href="http://jim-nielsen.com/">Jim Nielsen</a>. 
      This is my blog, where I find clarity through writing. 
      You’re welcome here anytime.
    </p>
  </div>

module.exports = Nav;

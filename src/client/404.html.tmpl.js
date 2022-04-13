import { Page } from "../server/Layouts.js";
import { html } from "../server/utils.js";

export default function Page404(site) {
  const title = "404: Page Not Found";
  return Page(
    {
      site,
      page: {
        title,
        path: "/404/",
        layout: "Page",
      },
    },
    html`
      <main class="copy wrapper">
        <h1>${title}</h1>

        <p>
          Whatever you’re looking for doesn’t appear to be available. Sorry.
        </p>

        <p>
          While I have your attention though, here’s a little tidbit about me: I
          love pies. I make them quite frequently. And then I eat them. You can
          see some of the ones I’ve made
          <a href="https://www.instagram.com/flyingjpies/">over on Instagram</a
          >.
        </p>

        <p>
          <a href="https://www.instagram.com/flyingjpies/"
            ><img
              src="/404-pie.jpg"
              alt="Picture of a pie I made and posted on Instagram"
          /></a>
        </p>
      </main>
    `
  );
}

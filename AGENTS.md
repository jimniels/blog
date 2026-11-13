# AGENTS.md

Personal blog built with [Weborigami](https://weborigami.org). Static output,
deployed on Netlify (which runs `npm run build` and nothing else).

**Keep this file current.** Treat it as living notes, not a fixed spec. As you
work in this codebase, add conventions worth repeating and delete anything that
has stopped being true — a stale instruction here is worse than a missing one.
Two things especially worth writing down: Origami behaviour that surprised you
(particularly anything that failed silently), and rough edges you noticed but
didn't fix. You don't need to ask permission to edit this file, but do mention
what you changed. Verify claims before recording them rather than writing from
memory.

## Commands

| Command | What it does |
| --- | --- |
| `npm start` | Dev server (`ori debug2`) |
| `npm run build` | Full build into `build/` |
| `npm run snapshot` | Record the current output as the comparison baseline |
| `npm run verify` | Diff the current source against that baseline |
| `npm run validate` | `html-validate` over `build/` |

`npm start` and `npm run build` are preceded by `npm run pre`, which regenerates
`cache/site.json`. `snapshot` and `verify` deliberately skip it — see below.

## Layout

```
src/
  site.ori      the tree that defines every output file
  routes/       one file per URL
  includes/     shared components (.ori.html)
  lib/          server-side logic that must stay JS
  client/       browser JS, inlined into pages at build time
  styles/       CSS, concatenated into /styles.css by site.ori
  icons/        Heroicons.ori — the single source for every icon
  data/         YAML data files
  static/       copied verbatim
```

## Conventions

**Prefer `.ori.html` for anything new.** Routes and components should be
templates, not JS modules. JS is still the right answer for two things: browser
code (`client/`) and logic that Origami can't express well (`lib/`) — see the
async-lambda note below.

**Verify every refactor.** Anything that claims not to change the output must
prove it:

```sh
npm run snapshot      # before your change
# ...make the change...
npm run verify        # silence means byte-for-byte identical
```

`verify` compares against a snapshot on disk, so it only means something if the
snapshot was taken from the state you intend to compare against. Two traps:

- **A stale `cache/site.json` invalidates the comparison.** If anything runs
  `npm run pre` (or you add a post) between snapshot and verify, new content
  shows up as `changed`/`added` files and buries the real signal. If you see
  posts appear that you didn't touch, re-snapshot before trusting the result.
- **To compare against committed code**, build a detached worktree rather than
  stashing: `git worktree add /tmp/ref --detach HEAD`, symlink `node_modules`,
  copy `cache/`, build it, then `ori changes /tmp/ref-build, src/site.ori`.

One pagefind index shard varies between runs of identical source, so `verify`
filters the `pagefind:` block out. Don't be alarmed by it, and don't "fix" it.

**Separate mechanical changes from behavioural ones into different commits**,
and verify each. A rename that touches 20 files should verify clean on its own;
then the change that actually alters output is small enough to read.

## Origami gotchas

These are not obvious and most of them fail *silently*.

**Lambdas are async.** `Array#filter`/`#find`/`#some` test a Promise, which is
always truthy, so a filter keeps every element and a find returns element 0 —
with no error. Use `Tree.filter`, `Tree.map`, `Tree.sort`. If the logic is
awkward that way, put it in `lib/` as real JS (that's why `lib/calendarData.js`
and `utils.js#relatedPosts` exist).

**`Tree.plain()` before `JSON.stringify`**, or you serialize `{}`. `Array#map`
inside a template leaves promises behind; `Tree.plain` resolves them.

**Files are byte buffers.** `"text" + <file.js>` stringifies as comma-separated
byte values (`47,47,32,...`) and `.toString()` isn't available. Wrap it in a
nested template instead: `` `${<file.js>}` ``. SVG files interpolate directly,
which is why there's no icon helper function.

**Whitespace rules differ between a template body and a string literal.** In a
`.ori.html` body:

- the body is dedented by the smallest indentation among its non-blank lines;
- an *indented* `${}` prepends its own indentation to **every** line of a
  multi-line value;
- a *column-0* `${}` adds no indentation but swallows the newline after it;
- a line containing only `${""}` disappears entirely.

Inside a backtick **string literal** none of that applies — interpolations are
substituted verbatim. That difference is load-bearing in several files.

**Escaping differs by context too.** In a template body, backticks are literal
and only `${` needs escaping as `\${`. Inside a front-matter backtick string,
both `` ` `` and `${` need escaping. This matters whenever browser JS gets
inlined: `routes/index.ori.html` contains `` `Could not load \${url}` `` and
that backslash is load-bearing. Pasting ordinary JS containing `${...}` into an
inlined `<script>` will have Origami evaluate it instead of the browser.

**`../` works** in references, so `includes/` can reach `../lib/`,
`../client/`, and `../icons/`.

**JS cannot import `.ori.html`.** When converting a component, convert its
consumers first, or the build breaks with a module-resolution error.

## Icons

Every icon comes from `icons/Heroicons.ori`, keyed by how it's used here rather
than by its upstream filename (`sun`/`moon` are the theme picker's light/dark).
Heroicons are fetched from GitHub at build time and cached; `json-feed` and
`hacker-news` are inlined because they aren't Heroicons.

Add a key there rather than committing an SVG file. Keep the set tight — it is
currently exactly 1:1 with what's referenced. Note that an offline cold build
will fail, since no local copies remain.

## Known rough edges

- Several files in `includes/` carry `${"      " + ... + "\n"}` scaffolding that
  exists only to reproduce the whitespace of the JS templates they replaced.
  It can be deleted in favour of natural indentation — that's a deliberate
  output change, so do it on its own and read the diff.
- `styles/basic.css` is referenced by nothing.
- `PostsList.ori.html` takes a `grid` param that no caller passes, and
  `.posts-list--grid` has ~43 lines of CSS behind it.
- `npm run build-minify` is not in the deploy path.

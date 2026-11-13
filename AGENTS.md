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
| `npm run verify` | Diff a clean build of `main` against your working changes |
| `npm run validate` | `html-validate` over `build/` |

`npm start` and `npm run build` are preceded by `npm run pre`, which regenerates
`cache/site.json`. `verify` deliberately skips it — see below.

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

**Verify every refactor.** `npm run verify` diffs a clean build of what's live
against your working changes:

```sh
npm run verify                   # vs. main
npm run verify -- origin/main    # vs. what's actually pushed
npm run verify -- --all          # list every changed file, not just a count
npm run verify -- --fresh        # refresh cache/site.json from posts/ first
```

Exit codes: 0 identical, 1 differences, 2 bad ref. A refactor that claims to
change nothing should exit 0.

`scripts/verify.js` builds the reference side in a throwaway git worktree, so
your working tree is never touched — no stash, no checkout, nothing to restore
if it's interrupted. Don't "improve" this by stashing and checking out `main`
in place; that risks real work for no benefit.

There is also deliberately no stored baseline. An earlier version used a
`snapshot` command, and re-running it after making changes folded those changes
into the baseline, so `verify` cheerfully reported "no changes" for work that
plainly changed things. If you reintroduce a cached baseline, make sure it
can't go stale that way.

Three things it does on purpose:

- **Shares one `cache/site.json` between both sides** so the diff isolates
  source changes. Post content therefore never shows up as a difference —
  that's what `--fresh` is for.
- **Excludes the `pagefind/` subtree**, because one index shard varies between
  runs of byte-identical source and would otherwise report a change every time.
  Don't "fix" that variance; to exclude something else for the same reason, add
  it to `IGNORED_TOP_LEVEL_KEYS` and say why.
- **Collapses the changed list past 20 entries.** One line changed in
  `includes/Page.ori.html` changes every page, and burying four deletions under
  849 paths is how you miss them.

It symlinks the current `node_modules` into the worktree rather than installing
the reference commit's dependencies, so a diff that depends on a dependency
version bump won't show up correctly.

`npm run diff-changes` predates this and does the same job by checking out
`main` in place. It's superseded.

Note that `ori changes` parses its arguments as Origami expressions, so paths
passed to it must be repo-relative — an absolute path is a syntax error.

**When output is meant to change, prove the change is only what you intended.**
A one-line edit to `includes/Page.ori.html` changes all ~850 pages, so the
count tells you nothing. Build both sides to scratch directories and assert the
difference programmatically — e.g. strip the snippet you removed from each old
file and check the result equals the new one. That turns "849 changed" into
"849 changed, all explained".

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

Two consequences worth knowing:

- **Never indent an interpolation holding post content.** Indenting adds
  leading spaces to every line, including the inside of `<pre>`, which is
  rendered. `children` in `includes/Page.ori.html` and `post.contents` in
  `routes/$year.$slug.ori.html` sit at column 0 for exactly this reason. Put a
  **blank line** after them to restore the newline a column-0 interpolation
  swallows — that's the idiom, not string concatenation.
- **An indented interpolation stacks its indent on top of the literal's own.**
  If you interpolate a multi-line backtick string at indent 10 and the string's
  lines are already indented 14, the output lands at 24. Keep such literals
  flush left and let the interpolation supply the indentation.

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

- `static/assets/img/` holds files nothing references (`logo-black.png`,
  `logo-white.png`, `jimniels.jpg`, `twitter-card.png`, `preferences.svg`,
  `fidelity-{low,med,high}.svg`). They're published URLs that may be hotlinked
  from old posts or elsewhere, so they were left alone deliberately.
- `posts/2024-01-19-rss-in-html-follow-up.md` links to `/feed.html`, which no
  longer exists.
- `PostsList.ori.html` takes a `grid` param that no caller passes, and
  `.posts-list--grid` has ~43 lines of CSS behind it.
- `npm run build-minify` is not in the deploy path.

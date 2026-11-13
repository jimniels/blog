// Diffs a clean build of what's live (main) against your working changes:
//
//   npm run verify                   # vs. main
//   npm run verify -- origin/main    # vs. what's actually pushed
//   npm run verify -- --all          # list every changed file, not just a count
//   npm run verify -- --fresh        # refresh cache/site.json first
//
// The reference side is built in a throwaway git worktree, so your working
// tree is never touched — no stashing, no checking out, nothing to restore if
// you interrupt it, and you can keep editing while it runs. There's also no
// stored baseline that can go stale.
//
// Both sides share one cache/site.json, so the diff isolates source changes.
// Post content therefore won't appear as a difference; pass --fresh (or run
// `npm run pre`) to rebuild the cache from the current posts/ first.
//
// Pagefind's index is excluded: one shard varies between runs of byte-identical
// source and would otherwise report a change every time.
import { execFile as execFileCb } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { promisify } from "node:util";

const execFile = promisify(execFileCb);
const run = (cmd, args, cwd) =>
  execFile(cmd, args, { cwd, maxBuffer: 64 * 1024 * 1024 });

const IGNORED_TOP_LEVEL_KEYS = ["pagefind"];
const args = process.argv.slice(2);
const ref = args.find((arg) => !arg.startsWith("-")) ?? "main";
const repo = resolve(import.meta.dirname, "..");
const REF_BUILD_RELATIVE = ".migration/ref";
const refBuild = join(repo, REF_BUILD_RELATIVE);

let sha;
try {
  ({ stdout: sha } = await run("git", ["rev-parse", "--short", ref], repo));
} catch {
  console.error(`No such commit, branch, or tag: ${ref}`);
  process.exit(2);
}

if (args.includes("--fresh")) {
  console.log("Refreshing cache/site.json from posts/…");
  await run("npm", ["run", "pre"], repo);
}

let worktree;
try {
  console.log(`Comparing working tree against ${ref} (${sha.trim()})…`);

  worktree = mkdtempSync(join(tmpdir(), "blog-verify-"));
  await run("git", ["worktree", "add", "--detach", worktree, ref], repo);

  // The worktree needs dependencies, and the same content cache so that only
  // source differences show up.
  symlinkSync(join(repo, "node_modules"), join(worktree, "node_modules"));
  if (existsSync(join(repo, "cache"))) {
    cpSync(join(repo, "cache"), join(worktree, "cache"), { recursive: true });
  }

  await run(
    "npx",
    ["ori", "copy", "src/site.ori,", "clear", `files:${refBuild}`],
    worktree
  );
  // Must be repo-relative: `ori changes` parses its arguments as Origami
  // expressions, and an absolute path is not a valid one.
  var { stdout } = await run(
    "npx",
    ["ori", "changes", `${REF_BUILD_RELATIVE},`, "src/site.ori"],
    repo
  );
} finally {
  if (worktree) {
    await run("git", ["worktree", "remove", "--force", worktree], repo).catch(
      () => {}
    );
  }
}

// `ori changes` prints an indented tree. Flatten it to full paths so results
// can be grouped by what happened, and drop the ignored top-level subtrees.
const results = { added: [], deleted: [], changed: [] };
const stack = [];
let skipping = false;

for (const line of stdout.split("\n")) {
  if (!line.trim()) continue;
  const indent = line.length - line.trimStart().length;
  if (indent === 0) {
    skipping = IGNORED_TOP_LEVEL_KEYS.some((key) => line.startsWith(`${key}:`));
  }
  if (skipping) continue;

  while (stack.length && stack.at(-1).indent >= indent) stack.pop();

  const body = line.trim();
  const leaf = body.match(/^(.*): (added|deleted|changed)$/);
  const name = (leaf ? leaf[1] : body.replace(/:$/, "")).replace(/^"|"$/g, "");
  if (leaf) {
    results[leaf[2]].push([...stack.map((s) => s.name), name].join("/"));
  } else {
    stack.push({ indent, name });
  }
}

const total = Object.values(results).reduce((n, list) => n + list.length, 0);
if (total === 0) {
  console.log(`\nNo changes — output is byte-for-byte identical to ${ref}.`);
  process.exit(0);
}

// Additions and deletions are the structural changes worth reading every time.
// The changed list is usually long and only useful on request.
const showAll = process.argv.includes("--all");
for (const kind of ["deleted", "added", "changed"]) {
  const list = results[kind];
  if (!list.length) continue;
  const hide = kind === "changed" && !showAll && list.length > 20;
  console.log(`\n${kind.toUpperCase()} (${list.length})`);
  if (hide) {
    console.log("  …run `npm run verify -- --all` to list them");
  } else {
    for (const path of list.sort()) console.log(`  ${path}`);
  }
}

const { changed, added, deleted } = results;
console.log(
  `\n${changed.length} changed, ${added.length} added, ${deleted.length} deleted.`
);
process.exit(1);

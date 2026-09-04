import { cp, mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(repoRoot, "skills");
const claudeRoot = path.join(repoRoot, ".claude", "skills");
const markerFile = ".generated-from-root-skills";
const ignoredEntries = new Set(["agents"]);

async function exists(target) {
  try {
    await stat(target);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

async function copySkill(sourceDir, targetDir) {
  const markerPath = path.join(targetDir, markerFile);

  if (await exists(markerPath)) {
    await rm(targetDir, { recursive: true, force: true });
  }

  await mkdir(targetDir, { recursive: true });

  for (const entry of await readdir(sourceDir, { withFileTypes: true })) {
    if (ignoredEntries.has(entry.name)) {
      continue;
    }

    const source = path.join(sourceDir, entry.name);
    const target = path.join(targetDir, entry.name);
    await cp(source, target, { recursive: true, force: true });
  }

  await writeFile(
    markerPath,
    "Generated from ../../skills by npm run skills:sync-claude.\n",
  );
}

async function main() {
  if (!(await exists(sourceRoot))) {
    throw new Error("No root skills/ directory found.");
  }

  await mkdir(claudeRoot, { recursive: true });

  const skillDirs = [];
  for (const entry of await readdir(sourceRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }

    const sourceDir = path.join(sourceRoot, entry.name);
    if (await exists(path.join(sourceDir, "SKILL.md"))) {
      skillDirs.push({ name: entry.name, sourceDir });
    }
  }

  for (const skill of skillDirs) {
    await copySkill(skill.sourceDir, path.join(claudeRoot, skill.name));
  }

  console.log(
    `Synced ${skillDirs.length} skill${skillDirs.length === 1 ? "" : "s"} to .claude/skills.`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

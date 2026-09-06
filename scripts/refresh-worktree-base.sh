#!/usr/bin/env bash
set -euo pipefail

if ! git rev-parse --show-toplevel >/dev/null 2>&1; then
  echo "Blocked: not inside a Git repository."
  exit 1
fi

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

if [[ -n "$(git status --porcelain=v1)" ]]; then
  echo "Blocked: working tree has local changes or untracked files."
  git status --short
  exit 1
fi

git fetch origin main

if ! git rev-parse --verify --quiet origin/main >/dev/null; then
  echo "Blocked: origin/main does not exist after fetching."
  exit 1
fi

head_sha="$(git rev-parse HEAD)"
origin_main_sha="$(git rev-parse origin/main)"

if [[ "$head_sha" == "$origin_main_sha" ]]; then
  echo "Fresh: already on latest origin/main."
  exit 0
fi

if git merge-base --is-ancestor HEAD origin/main; then
  git switch --detach origin/main
  echo "Updated: moved from $head_sha to latest origin/main ($origin_main_sha)."
  exit 0
fi

if git merge-base --is-ancestor origin/main HEAD; then
  echo "Blocked: current HEAD is ahead of origin/main; refusing to move checkout."
  exit 1
fi

echo "Blocked: current HEAD has diverged from origin/main; refusing to move checkout."
exit 1

/**
 * Product copy in this template never shows an em dash.
 *
 * Copy written in the repo is held to that by the `no-restricted-syntax` block
 * in `eslint.config.mjs`, which rejects em dashes in string literals, template
 * literals, and JSX text (comments are exempt). Text that arrives at runtime
 * from outside the codebase cannot be linted, so it goes through
 * `withoutEmDashes` on its way to the screen.
 */

/** Em dash (U+2014) and horizontal bar (U+2015), which renders the same way. */
const emDash = "[\\u2014\\u2015]";

const leading = new RegExp(`^\\s*${emDash}\\s*`);
const trailing = new RegExp(`\\s*${emDash}\\s*$`);
const clauseBreak = new RegExp(`\\s+${emDash}\\s+`, "g");
const anyEmDash = new RegExp(emDash, "g");

/**
 * Rewrites em dashes out of a string without changing anything else.
 *
 * A dash that separates clauses becomes a comma, a dash pinned between
 * characters (a range such as `9—5`) becomes a hyphen, and a dangling dash
 * at either end is dropped.
 */
export function withoutEmDashes(text: string): string {
  return text
    .replace(leading, "")
    .replace(trailing, "")
    .replace(clauseBreak, ", ")
    .replace(anyEmDash, "-");
}

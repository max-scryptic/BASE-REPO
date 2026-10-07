import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Em dashes must never reach the UI. Comments are not matched by these
// selectors, so prose behind the scenes keeps them; anything that can be
// rendered does not. Runtime text from outside the repo is handled by
// `withoutEmDashes` in `src/lib/text.ts`.
const emDashMessage =
  "No em dashes in text that can reach the UI. Use a comma, a colon, or a rewritten sentence. Code comments may keep them.";

// U+2014 em dash, U+2015 horizontal bar, and the HTML entity spellings.
const emDashPattern = "[\\u2014\\u2015]|&mdash;|&#8212;|&#x2014;";

const noEmDashesInUiText = [
  "error",
  {
    selector: `Literal[value=/${emDashPattern}/]`,
    message: emDashMessage,
  },
  {
    selector: `TemplateElement[value.raw=/${emDashPattern}/]`,
    message: emDashMessage,
  },
  {
    selector: `JSXText[value=/${emDashPattern}/]`,
    message: emDashMessage,
  },
];

// Tab titles are pipe-delimited: `<AppName> | <tagline>` or
// `<PageName> | <AppName>`. Pages set the bare page name and the template in
// `src/app/layout.tsx` adds the separator, so a colon in any title string is
// a hand-rolled delimiter. Matches titles in `metadata` exports,
// `generateMetadata`, `createMetadata` calls, and `publicRoutes`.
const titleMessage =
  "Page titles are pipe-delimited: `<AppName> | ...` or `<PageName> | ...`. Do not use colons. Set the bare page name and let the root title template add the rest.";

const titleSources = [
  "VariableDeclarator[id.name='metadata']",
  "VariableDeclarator[id.name='publicRoutes']",
  "FunctionDeclaration[id.name='generateMetadata']",
  "CallExpression[callee.name='createMetadata']",
].join(", ");

const noColonsInPageTitles = [
  {
    selector: `:matches(${titleSources}) Property[key.name='title'] Literal[value=/:/]`,
    message: titleMessage,
  },
  {
    selector: `:matches(${titleSources}) Property[key.name='title'] TemplateElement[value.raw=/:/]`,
    message: titleMessage,
  },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    ".agents/**",
    ".claude/**",
    ".codex/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [...noEmDashesInUiText, ...noColonsInPageTitles],
    },
  },
]);

export default eslintConfig;

import { gzipSync } from "node:zlib";
import { build } from "esbuild";

const scenarios = [
  {
    budget: 6_144,
    name: "complete Node API",
    platform: "node",
    source: `
      import cleanTextUtils from "clean-text-utils";
      console.log(cleanTextUtils);
    `,
  },
  {
    budget: 250,
    name: "stripWhitespace subpath",
    platform: "browser",
    source: `
      import stripWhitespace from "clean-text-utils/strip/whitespace";
      console.log(stripWhitespace("hello world"));
    `,
  },
  {
    budget: 1_536,
    name: "replaceDiacritics subpath",
    platform: "browser",
    source: `
      import replaceDiacritics from "clean-text-utils/replace/diacritics";
      console.log(replaceDiacritics("cr\\u00E8me br\\u00FBl\\u00E9e"));
    `,
  },
];

let failed = false;

for (const scenario of scenarios) {
  const result = await build({
    bundle: true,
    format: "esm",
    minify: true,
    platform: scenario.platform,
    stdin: {
      contents: scenario.source,
      resolveDir: process.cwd(),
      sourcefile: `${scenario.name.replaceAll(" ", "-")}.js`,
    },
    write: false,
  });
  const bytes = gzipSync(result.outputFiles[0].contents).byteLength;
  const status = bytes <= scenario.budget ? "PASS" : "FAIL";

  console.log(`${status} ${scenario.name}: ${bytes} B / ${scenario.budget} B gzip`);
  failed ||= bytes > scenario.budget;
}

if (failed) {
  process.exitCode = 1;
}

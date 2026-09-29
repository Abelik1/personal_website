import fs from "node:fs";
import { spawnSync } from "node:child_process";
import ts from "typescript";

// Both public CVs use the website's factual content. Python needs reportlab.
const source = ts.transpileModule(fs.readFileSync("src/content.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2020 }
}).outputText;
const { profile, education, experiences, projects } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
const result = spawnSync(process.env.PYTHON || "python", ["scripts/build-cvs.py"], {
  input: JSON.stringify({ profile, education, experiences, projects }), encoding: "utf8"
});
if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);

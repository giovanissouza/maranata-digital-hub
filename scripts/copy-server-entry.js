import { copyFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(".");
const source = resolve(root, "dist/server/index.js");
const target = resolve(root, "dist/server/server.js");

try {
  await copyFile(source, target);
  console.log(`Copied ${source} to ${target}`);
} catch (error) {
  console.error("Failed to copy server entry file:", error);
  process.exit(1);
}

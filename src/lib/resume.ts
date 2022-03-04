import fs from "fs";

export function getResume() {
  const raw = fs.readFileSync("content/resume.md", "utf-8");
  return raw;
}

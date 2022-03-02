import fs from "fs";

// Read markdown post filesname from posts/ and return valid slug names
export function getValidSlugPaths() {
  const files = fs.readdirSync("posts");
  const paths = files.map((file) => ({
    params: {
      slug: file.replace(".md", ""),
    },
  }));

  return paths;
}

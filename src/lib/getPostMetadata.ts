import fs from "fs";
import matter from "gray-matter";

// Read markdown posts from posts/ and collect metadata from frontmatter
export function getPostMetadata(): PostMetadata[] {
  const files = fs.readdirSync("posts");
  const posts = files.map((file) => {
    const slug = file.replace(".md", "");
    const contents = fs.readFileSync(`posts/${file}`, "utf-8");
    const { excerpt, data: metadata } = matter(contents, { excerpt: true });

    return {
      slug,
      excerpt: excerpt ? excerpt : null, // Force except to null if it's empty
      ...metadata,
    } as PostMetadata;
  });

  return posts.sort(sortByPostReverseDate);
}

// We actually need to use .getTime() because TypeScript doesn't like us
// trying to do math with Date objects
function sortByPostReverseDate(first: PostMetadata, second: PostMetadata) {
  const firstDate = new Date(first.date).getTime();
  const secondDate = new Date(second.date).getTime();
  return secondDate - firstDate;
}

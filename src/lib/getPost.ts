import fs from "fs";
import matter from "gray-matter";

// Return a post and metadata based on a slug
export function getPost(slug: string): Post {
  const contents = fs.readFileSync(`posts/${slug}.md`, "utf-8");
  const { data: metadata, content } = matter(contents);

  return {
    metadata: metadata as PostMetadata,
    content,
  };
}

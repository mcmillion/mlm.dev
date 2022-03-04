import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";

// Read markdown post filesname from posts/ and return valid slug names
export function getValidPostSlugs() {
  const files = fs.readdirSync("posts");
  const paths = files.map((file) => ({
    params: {
      slug: file.replace(".md", ""),
    },
  }));

  return paths;
}

// Return a post and metadata based on a slug
export function getPost(slug: string): Post {
  const { content, metadata } = parseMetadata(`${slug}.md`);

  return {
    metadata,
    content,
  };
}

// Read markdown posts from posts/ and collect metadata from frontmatter
export function getPostsMetadata(): PostMetadata[] {
  const files = fs.readdirSync("posts");
  const posts = files.map((file) => parseMetadata(file).metadata);

  return posts.sort(sortByPostReverseDate);
}

// We actually need to use .getTime() because TypeScript doesn't like us
// trying to do math with Date objects
function sortByPostReverseDate(first: PostMetadata, second: PostMetadata) {
  const firstDate = new Date(first.date).getTime();
  const secondDate = new Date(second.date).getTime();
  return secondDate - firstDate;
}

// Parse a blog post, returning contents and metadata from frontmatter
function parseMetadata(filename: string) {
  const slug = filename.replace(".md", "");
  const raw = fs.readFileSync(`posts/${filename}`, "utf-8");
  const { content, data } = matter(raw);
  const timeToRead = readingTime(content).text;

  return {
    content,
    metadata: {
      ...data,
      slug,
      timeToRead,
    } as PostMetadata,
  };
}

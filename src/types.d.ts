interface PostMetadata {
  date: string;
  slug: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
  timeToRead: string;
}

interface Post {
  metadata: PostMetadata;
  content: string;
}

interface PostMetadata {
  date: string;
  slug: string;
  socialImage: string;
  title: string;
}

interface Post {
  metadata: PostMetadata;
  content: string;
}

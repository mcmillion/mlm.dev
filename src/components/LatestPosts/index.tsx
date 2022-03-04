import { PostCard } from "./PostCard";

interface Props {
  posts: PostMetadata[];
  count: number;
}

export const LatestPosts = (props: Props) => {
  const { posts, count } = props;
  const latestPosts = posts.slice(0, count);

  return (
    <section className="p-8">
      <h1 className="mb-8 text-4xl bold-text">Latest Posts</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {latestPosts.map((post) => (
          <PostCard key={post.title} post={post} />
        ))}
      </div>
    </section>
  );
};

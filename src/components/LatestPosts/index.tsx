interface Props {
  posts: PostMetadata[];
  count: number;
}

export const LatestPosts = (props: Props) => {
  const { posts, count } = props;
  const latestPosts = posts.slice(0, count);

  console.log("POSTS", latestPosts);

  return <div>Latest Posts</div>;
};

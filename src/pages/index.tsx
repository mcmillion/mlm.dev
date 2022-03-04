import type { NextPage, GetStaticProps } from "next";
import { getPostsMetadata } from "lib/post";
import { Head } from "components/Head";
import { LatestPosts } from "components/LatestPosts";
import { Splash } from "components/Splash";

export const getStaticProps: GetStaticProps = async () => {
  const posts = getPostsMetadata();

  return {
    props: { posts },
  };
};

interface Props {
  posts: PostMetadata[];
}

const Home: NextPage<Props> = (props: Props) => {
  const { posts } = props;

  return (
    <>
      <Head
        title="Home"
        description="Personal Site of Matthew McMillion, Full-Stack Developer"
      />

      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <Splash />
          <LatestPosts posts={posts} count={2} />
        </div>

        <footer className="flex-none text-center footer">
          <p>Made with ♥️ in Little Rock</p>
        </footer>
      </div>
    </>
  );
};

export default Home;

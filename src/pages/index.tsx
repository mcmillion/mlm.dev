import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { getPostsMetadata } from "lib/post";
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
      <Head>
        <title>Matthew McMillion</title>
        <meta name="description" content="Matthew McMillion, Developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

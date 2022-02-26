import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { getPostMetadata } from "lib/getPostMetadata";
import { LatestPosts } from "components/LatestPosts";

export const getStaticProps: GetStaticProps = async () => {
  const posts = getPostMetadata();

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

      <div>Main Page Content, Bio, Short Resume, Whatever</div>

      <LatestPosts posts={posts} count={3} />
    </>
  );
};

export default Home;

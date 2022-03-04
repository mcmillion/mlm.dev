import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { getValidPostSlugs, getPost } from "lib/post";
import { getAbsoluteURL } from "lib/vercel";
import { PostLayout, PostHeader, PostContent } from "components/Post";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getValidPostSlugs();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string;
  const { metadata, content } = getPost(slug);

  return {
    props: { metadata, content },
  };
};

interface Props {
  metadata: PostMetadata;
  content: string;
}

const Post: NextPage<Props> = (props: Props) => {
  const { metadata, content } = props;
  const { title, description, image, tags } = metadata;
  const imageUrl = getAbsoluteURL(image);

  return (
    <>
      <Head>
        <title>{title} - Matthew McMillion</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={tags?.join(" ")} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostLayout>
        <PostHeader metadata={metadata} />
        <PostContent content={content} />
      </PostLayout>
    </>
  );
};

export default Post;

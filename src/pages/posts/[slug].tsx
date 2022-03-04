import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { getValidPostSlugs, getPost } from "lib/post";
import { Head } from "components/Head";
import { PostLayout, PostHeader, PostContent } from "components/Post";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getValidPostSlugs(),
  fallback: false,
});

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
  const { title, description, image } = metadata;

  return (
    <>
      <Head title={title} description={description} image={image} />

      <PostLayout>
        <PostHeader metadata={metadata} />
        <PostContent content={content} />
      </PostLayout>
    </>
  );
};

export default Post;

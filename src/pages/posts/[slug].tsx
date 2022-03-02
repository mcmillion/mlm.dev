import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import { getValidSlugPaths } from "lib/getValidSlugPaths";
import { getPost } from "lib/getPost";
import { CodeBlock } from "components/CodeBlock";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getValidSlugPaths();

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

  console.log("CONTENT", content);
  console.log("METADATA", metadata);

  return (
    <>
      <ReactMarkdown
        className="prose lg:prose-xl"
        components={{
          code(props) {
            return <CodeBlock {...props} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </>
  );
};

export default Post;

import ReactMarkdown from "react-markdown";
import { CodeBlock, ImageBlock } from "components/Post";

interface Props {
  content: string;
}

export const PostContent = (props: Props) => {
  const { content } = props;

  return (
    <ReactMarkdown
      components={{
        code(props) {
          return <CodeBlock {...props} />;
        },
        img(props) {
          return <ImageBlock {...props} />;
        },
        h1: "h2",
        h2: "h3",
        h3: "h4",
        h4: "h5",
        h5: "h6",
        h6: "h6",
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

import type { ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Props {
  className?: string;
  inline?: boolean;
  children: ReactNode;
}

// Takes a react-markdown code component and turns it into a codeblock or inline code node
// https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
export const CodeBlock = (props: Props) => {
  const { className, children } = props;
  const inline = props?.inline || false;

  if (inline) return <code>{children}</code>;

  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : undefined;
  const content = String(children).replace(/\n$/, "");

  return (
    <SyntaxHighlighter
      language={language}
      showLineNumbers
      wrapLines
      style={nord}
      customStyle={{
        backgroundColor: "transparent",
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        padding: 0,
      }}
      PreTag="div"
    >
      {content}
    </SyntaxHighlighter>
  );
};

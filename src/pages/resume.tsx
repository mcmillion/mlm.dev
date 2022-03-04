import type { NextPage, GetStaticProps } from "next";
import { Head } from "components/Head";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { getResume } from "lib/resume";

export const getStaticProps: GetStaticProps = async () => {
  const resume = getResume();

  return {
    props: { resume },
  };
};

interface Props {
  resume: string;
}

const Resume: NextPage<Props> = (props: Props) => {
  const { resume } = props;

  return (
    <>
      <Head
        title="Resume"
        description="Resume of Full-Stack Developer Matthew McMillion"
      />

      <article className="prose lg:prose-xl dark:prose-invert mx-auto p-4 lg:p-8">
        <header className="flex gap-4 lg:gap-8 items-center">
          <div className="h-12 w-12 lg:h-20 lg:w-20">
            <Image
              className="rounded-full"
              src="/images/avatar.jpg"
              height="128"
              width="128"
              objectFit="cover"
              alt="Portrait of Matthew McMillion"
            />
          </div>
          <div>
            <h1 style={{ marginBlockEnd: "0" }}>Matthew McMillion</h1>
            <h4 style={{ marginBlockStart: "0" }}>
              Full-Stack Developer &bull;{" "}
              <a href="mailto:hi@mlm.dev">hi@mlm.dev</a> &bull;{" "}
              <a href="https://www.twitter.com/mattisadev">@mattisadev</a>
            </h4>
          </div>
        </header>

        <section>
          <ReactMarkdown
            components={{
              h1: "h3",
              h2: "h4",
              h3: "h5",
              h4: "h6",
              h5: "h6",
              h6: "h6",
            }}
          >
            {resume}
          </ReactMarkdown>
        </section>
      </article>
    </>
  );
};

export default Resume;

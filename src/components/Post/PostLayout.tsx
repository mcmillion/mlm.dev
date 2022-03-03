import type { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const BackToPosts = () => (
  <div>
    <Link href="/">
      <a className="inline-block nav-link">
        &larr; <span className="hide-small">Back to Posts</span>
      </a>
    </Link>
  </div>
);

const HeaderAvatar = () => (
  <Link href="/">
    <a className="text-center lg:text-xl">
      <span>Matthew McMillion</span>
    </a>
  </Link>
);

const TwitterLink = () => (
  <div className="text-right">
    <a href="https://www.twitter.com/mattisadev" className="nav-link">
      <FontAwesomeIcon icon={faTwitter} className="mr-2 h-4 inline-block" />
      <span className="hide-small">Follow me on Twitter</span>
    </a>
  </div>
);

interface Props {
  children: ReactNode;
}

export const PostLayout = (props: Props) => {
  const { children } = props;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex-none header">
        <BackToPosts />
        <HeaderAvatar />
        <TwitterLink />
      </header>

      <article className="flex-1 prose lg:prose-xl dark:prose-invert mx-auto p-8">
        {children}
      </article>

      <footer className="flex-none text-center footer">
        <p>Made with ♥️ in Little Rock</p>
      </footer>
    </div>
  );
};

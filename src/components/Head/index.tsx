import NextHead from "next/head";
import { getAbsoluteURL } from "lib/vercel";

interface Props {
  title: string;
  description: string;
  image?: string;
}

export const Head = (props: Props) => {
  const { title, description } = props;
  const image = props?.image || null;
  const imageUrl = image ? getAbsoluteURL(image) : null;

  return (
    <NextHead>
      <title>{title} - Matthew McMillion</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#111827" />
      <meta name="msapplication-TileColor" content="#111827" />
      <meta name="theme-color" content="#111827" />
    </NextHead>
  );
};

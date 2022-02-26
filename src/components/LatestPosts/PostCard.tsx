import Link from "next/link";
import Image from "next/image";

interface Props {
  post: PostMetadata;
}

export const PostCard = (props: Props) => {
  const { slug, title, socialImage } = props.post;

  return (
    <Link href={`/posts/${slug}`}>
      <a className="relative">
        <Image
          className="object-cover"
          src={socialImage}
          layout="responsive"
          height="300"
          width="600"
          objectFit="cover"
          alt=""
        />
        <h2 className="bottom-float p-2 dark-overlay font-bold">{title}</h2>
      </a>
    </Link>
  );
};

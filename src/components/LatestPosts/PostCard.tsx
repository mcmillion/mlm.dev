import Link from "next/link";
import Image from "next/image";

interface Props {
  post: PostMetadata;
}

export const PostCard = (props: Props) => {
  const { slug, title, image } = props.post;

  return (
    <Link href={`/posts/${slug}`}>
      <a className="relative">
        <Image
          className="object-cover"
          src={image}
          layout="responsive"
          height="300"
          width="600"
          objectFit="cover"
          alt=""
        />
        <span className="bottom-float p-2 dark-overlay font-bold">{title}</span>
      </a>
    </Link>
  );
};

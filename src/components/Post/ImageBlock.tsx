import Image from "next/image";

interface Props {
  src?: string;
}

export const ImageBlock = (props: Props) => {
  const { src } = props;

  if (!src) return null;

  return (
    <div className="my-14">
      <Image
        className="rounded-lg"
        src={src}
        width="800"
        height="450"
        objectFit="cover"
        alt=""
      />
    </div>
  );
};

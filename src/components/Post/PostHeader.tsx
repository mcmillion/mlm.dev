import { format } from "date-fns";
import { ImageBlock } from "components/Post";

interface Props {
  metadata: PostMetadata;
}

export const PostHeader = (props: Props) => {
  const { metadata } = props;
  const { title, date, timeToRead, image } = metadata;
  const formattedDate = format(new Date(date), "MMMM do, y");

  return (
    <>
      <h1 style={{ marginBlockEnd: "0.5rem" }}>{title}</h1>
      <span className="text-gray-500">
        {formattedDate} - {timeToRead}
      </span>

      <ImageBlock src={image} />
    </>
  );
};

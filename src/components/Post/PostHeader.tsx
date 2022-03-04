import { format } from "date-fns";
import { ImageBlock, Tag } from "components/Post";

interface Props {
  metadata: PostMetadata;
}

export const PostHeader = (props: Props) => {
  const { metadata } = props;
  const { title, date, timeToRead, tags, image } = metadata;
  const formattedDate = format(new Date(date), "MMMM do, y");

  return (
    <>
      <h1
        className="text-center lg:text-left"
        style={{ marginBlockEnd: "0.5rem" }}
      >
        {title}
      </h1>

      <div className="flex gap-4 flex-col lg:flex-row lg:justify-between items-center">
        <div className="text-gray-500">
          {formattedDate} - {timeToRead}
        </div>

        <div>
          {tags?.map((tag) => (
            <Tag key={tag} value={tag} />
          ))}
        </div>
      </div>

      <ImageBlock src={image} />
    </>
  );
};

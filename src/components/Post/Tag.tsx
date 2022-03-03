interface Props {
  value: string;
}

export const Tag = (props: Props) => {
  const { value } = props;

  return (
    <span className="rounded-full px-4 py-1 ml-2 text-sm bg-gray-100 border border-gray-200 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
      {value}
    </span>
  );
};

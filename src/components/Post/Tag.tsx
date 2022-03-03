interface Props {
  value: string;
}

export const Tag = (props: Props) => {
  const { value } = props;

  return <span className="pill">{value}</span>;
};

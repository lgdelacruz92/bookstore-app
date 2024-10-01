interface BookListItemImageProps {
  imgUrl: string;
  title: string;
}

export const BookListItemImage = ({
  imgUrl,
  title,
}: BookListItemImageProps) => {
  return <img src={imgUrl} alt={title}></img>;
};

export const BookListItem = ({ ...props }) => {
  return (
    <div {...props} className="bg-slate-500 h-[300px]">
      {props.children}
    </div>
  );
};

import BooksList from "./components/booksList";
import SideNav from "./components/sideNav";

const Books = () => {
  return (
    <div className="flex">
      <div className="py-8 px-4 w-64 border-solid border-2 border-slate-200 shadow">
        <SideNav></SideNav>
      </div>
      <div className="p-8">
        <BooksList />
      </div>
    </div>
  );
};

export default Books;

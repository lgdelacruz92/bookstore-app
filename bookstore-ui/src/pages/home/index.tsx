import { Outlet } from "react-router-dom";
import SideNav from "./components/sideNav";

const Home = () => {
  return (
    <div className="flex min-h-screen">
      <div className="py-8 flex-shrink-0 px-4 w-64 border-solid border-r shadow">
        <SideNav></SideNav>
      </div>
      <div className="p-8 flex-grow flex-shrink min-w-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;

import { Outlet } from "react-router-dom";
import MainFooter from "./MainFooter";
import Navbar from "./Navbar";
import { MainNav } from "../../components/header/MainNav";

// ----------------------------------------------------------------------

export default function MainLayout() {
  return (
    <>
      <div className="mx-auto max-w-[1440px] px-4">
        <Navbar />
        <MainNav />
        <Outlet />
        <MainFooter />
      </div>
    </>
  );
}

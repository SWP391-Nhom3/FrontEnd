import { Outlet } from "react-router-dom";
import MainFooter from "./MainFooter";
import Navbar from "./Navbar";
import { MainNav } from "../../components/header/MainNav";

// ----------------------------------------------------------------------

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <MainNav />

      <Outlet />

      <MainFooter />
    </>
  );
}

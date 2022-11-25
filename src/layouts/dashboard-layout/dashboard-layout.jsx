import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
const DashboardLayout = (props) => {
  return (
    <Fragment>
      <div className="dashboard-container px-5 pt-3 bg-blue-dark p-0 vh-100 overflow-scroll scrollbar-none">
          <Navbar />
          <Outlet />
      </div>
    </Fragment>
  );
};
export default DashboardLayout;

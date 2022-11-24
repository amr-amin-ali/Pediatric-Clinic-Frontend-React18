import { Outlet } from "react-router-dom";
import WebsiteManagementSideMenuOptions from "../../../components/dashboard/website-management/website-mgmt-side-menu";

const WebsiteManagement = () => {
  return (
    <div className="row">
      <div className="col-lg-4 col-sm-12">
        <WebsiteManagementSideMenuOptions />
      </div>
      <div className="col-lg-8 col-sm-12">
        <Outlet />
      </div>
    </div>
  );
};

export default WebsiteManagement;

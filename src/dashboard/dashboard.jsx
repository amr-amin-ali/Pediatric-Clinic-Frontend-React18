import SideMenu from "./components/side-menu";
import DoctorProfile from "./components/doctor-profile";
import TodayPrescriptions from "./components/today-prescriptions";
import { Route, Routes } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Files from "./files/files";
import Medicines from "./medicines/medicines";
import Tools from "./tools/tools";
import Payments from "./payments/payments";
import Purchases from "./purchases/purchases";
import ViewAllFiles from "./files/view-all";
import SearchResult from "./files/search-result";
import ViewAllPrescriptions from "./prescripions/all-prescriptions";
import { useStore } from "../hooks-store/store";
import { httpGET } from "../http/httpGET";
import { api } from "../utility/api";
const Dashboard = () => {
  document.title = "الإدارة";
  const [state, dispatch] = useStore();

useEffect(() => {
    //get all bookings from the server
    if (!state.bookings_store.isInitiated) {
      httpGET(api.bookings.get_all_bookings).then((bookings) => {
        if (bookings.length !== 0) dispatch("INITIATE_BOOKINGS", bookings);
      });
    }
  
}, []);
  return (
    <div className="row dashboard-content-container">
      <SideMenu />
      <Routes>
        <Route path="Files/*">
          <Route path="*" element={<Files />} />
          <Route path="View-all" element={<ViewAllFiles />} />
          <Route path="Search" element={<SearchResult />} />
          <Route
            path="View-all/:fileId"
            element={<ViewAllPrescriptions />}
          />
        </Route>
        <Route path="Medicines" element={<Medicines />} />
        <Route path="Tools" element={<Tools />} />
        <Route path="Payments" element={<Payments />} />
        <Route path="Purchases" element={<Purchases />} />
        {/* <Route path="Bookings" element={<Bookings />} /> */}
        <Route
          path="*"
          element={
            <Fragment>
              <DoctorProfile />
              <TodayPrescriptions />
            </Fragment>
          }
        />
      </Routes>
    </div>
  );
};
export default Dashboard;

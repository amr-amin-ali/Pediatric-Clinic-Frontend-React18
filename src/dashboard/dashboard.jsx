import { Route, Routes } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Files from "./files/files";
import Tools from "./tools/tools";
import Payments from "./payments/payments";
import Purchases from "./purchases/purchases";
import ViewAllFiles from "./files/view-all-files";
import SearchResult from "./files/search-result";
import ViewAllVisits from "./visits/all-visits/view-all-visits";
import { useStore } from "../hooks-store/store";
import { httpGET } from "../http/httpGET";
import { api } from "../utility/api";
import ViewAllMedicines from "./medicines/view-all-medicines";
import Medicines from "./medicines/medicines";
import SideMenu from "./components/side-menu";
import DoctorProfile from "./components/doctor-profile";
import TodayPrescriptions from "./components/today-prescriptions";
const Dashboard = () => {
  document.title = "الإدارة";
  const [state, dispatch] = useStore();

  useEffect(() => {
    //get all bookings from the server
    if (!state.bookings_store.isInitiated) {
      httpGET(api.bookings.get_all_bookings).then((response) => {
        if (response.status === 401) {
          alert("Please login first");
          dispatch("LOGOUT");
        }
        if (response.status === 200) {
          response.json().then((data) => {
            if (data.length !== 0) dispatch("INITIATE_BOOKINGS", data);
          });
        }
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
          <Route path="View-all/:fileId" element={<ViewAllVisits />} />
        </Route>
        <Route path="Medicines/View-All" element={<ViewAllMedicines />} />
        <Route path="Medicines" element={<Medicines />} />
        <Route path="Tools" element={<Tools />} />
        <Route path="Payments" element={<Payments />} />
        <Route path="Purchases" element={<Purchases />} />
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

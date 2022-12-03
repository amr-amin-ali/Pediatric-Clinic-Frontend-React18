import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { useStore } from "./hooks-store/store";
import { api } from "./utility/api";
import { httpGET } from "./http/httpGET";
import Articles from "./site/articles";
import DashboardLayout from "./layouts/dashboard-layout/dashboard-layout";
import SiteLayout from "./layouts/site-layout/site-layout";
import Dashboard from "./dashboard/dashboard";
import Home from "./site/home";
import NewsPage from "./site/news-page";
import Vaccines from "./site/vaccines";
import AboutDoctor from "./site/about-doctor";
import ViewArticle from "./site/view-article";
import Login from "./site/login";
import React from "react";
import ViewAllVisits from "./dashboard/visits/all-visits/view-all-visits";
import NewVisit from "./dashboard/visits/new-visit/new-visit";
import WebsiteManagement from "./dashboard/website-management/website-management";
import Bookings from "./dashboard/bookings/bookings";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       <Route path="/*" element={<SiteLayout />}>
//         <Route path="Home" element={<Home />} />
//         <Route path="Articles" element={<Articles />} />
//         <Route path="Articles/:id" element={<ViewArticle />} />
//         <Route path="News" element={<NewsPage />} />
//         <Route path="Vaccines" element={<Vaccines />} />
//         <Route path="*" element={<Home />} />
//       </Route>
//       <Route path="/About-Doctor" element={<AboutDoctor />} />
//       <Route path="/Login" element={<Login />} />
//       <Route path="/Dashboard/*" element={<DashboardLayout />}>
//         <Route path="*" element={<Dashboard />} />
//         <Route path="Prescriptions/:applicationUserId" element={<ViewAllPrescriptions />}/>
//         <Route path="New-Prescription/:applicationUserId" element={<NewPrescription />} />
//         <Route path="Website-Management" element={<WebsiteManagement />}>
//           <Route path="Name-and-Logo" element={<NameAndLogoMgmt />} />
//           <Route path="Slideshow" element={<Slideshow />} />
//           <Route path="Services" element={<ServicesMgmt />} />
//           <Route path="Articles" element={<ArticlesMgmt />} />
//           <Route path="News" element={<NewsMgmt />} />
//           <Route path="Vaccines" element={<VaccinesMgmt />} />
//         </Route>
//       </Route>
//       <Route
//         path="/Dashboard/Print-Prescription"
//         element={<PrintPrescription />}
//       />
//     </Route>
//   )
// );

function App() {
  const [state, dispatch] = useStore(true);
  if (!state.metaDatas_store.isInitiated) {
    httpGET(api.metaDatas.get_meta_data).then((metaDatas) => {
      if (Object.keys(metaDatas).length !== 0)
        dispatch("ADD_META_DATA_TO_STORE", metaDatas);
    });
  }

  const displayDashboard =
    state.accounts_store.login.isLoggedIn &&
    state.accounts_store.login.role === "Doctor";
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route>
            <Route path="/*" element={<SiteLayout />}>
              <Route path="Home" element={<Home />} />
              <Route path="Articles" element={<Articles />} />
              <Route path="Articles/:id" element={<ViewArticle />} />
              <Route path="News" element={<NewsPage />} />
              <Route path="Vaccines" element={<Vaccines />} />
              <Route path="*" element={<Home />} />
            </Route>
            <Route path="/About-Doctor" element={<AboutDoctor />} />
            <Route path="/Login" element={<Login />} />
            {displayDashboard && (
              <Route
                path="/Dashboard/New-Prescription/:applicationUserId"
                element={<NewVisit />}
              />
            )}
            {displayDashboard && (
              <Route path="/Dashboard/*" element={<DashboardLayout />}>
                <Route path="*" element={<Dashboard />} />
                <Route
                  path="Prescriptions-For/:name/:applicationUserId"
                  element={<ViewAllVisits />}
                />
                <Route path="Bookings" element={<Bookings />} />
                <Route
                  path="Website-Management/*"
                  element={<WebsiteManagement />}
                />
              </Route>
            )}
          </Route>
        )
      )}
    />
  );
}

export default App;

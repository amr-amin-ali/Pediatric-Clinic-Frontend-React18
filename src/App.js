import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Articles from "./pages/site/articles";
import DashboardLayout from "./components/layouts/dashboard-layout/dashboard-layout";
import SiteLayout from "./components/layouts/site-layout/site-layout";
import Dashboard from "./pages/dashboard/dashboard";
import Home from "./pages/site/home";
import NewsPage from "./pages/site/news-page";
import Vaccines from "./pages/site/vaccines";
import AboutDoctor from "./pages/site/about-doctor";
import ViewArticle from "./pages/site/view-article";
import Login from "./pages/site/login";
import React from "react";
import ViewAllFilePrescriptions from "./pages/dashboard/prescripions/all-file-prescriptions";
import NewPrescription from "./pages/dashboard/prescripions/new-prescription";
import PrintPrescription from "./pages/dashboard/prescripions/print-prescription";
import WebsiteManagement from "./pages/dashboard/website/website-management";
import MetaData from "./components/dashboard/website-management/meta-data/meta-data";
import SliderManagement from "./components/dashboard/website-management/slider-mgmt";
import ServicesManagement from "./components/dashboard/website-management/services/services-management";
import ArticlesManagement from "./components/dashboard/website-management/articles/articles-management";
import { useStore } from "./hooks-store/store";
import NewsManagement from "./components/dashboard/website-management/news/news-management";
import VaccinesManagemt from "./components/dashboard/website-management/vaccins/vaccin-management";
import { api } from "./utility/api";
import { httpGET } from "./http/httpGET";

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
//         <Route path="Prescriptions/:fileId" element={<ViewAllFilePrescriptions />}/>
//         <Route path="New-Prescription/:fileId" element={<NewPrescription />} />
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
  const [state,dispatch] = useStore(true);
  if (state.metaDatas.id === null) {
    httpGET(api.metaDatas.get_meta_data).then((metaDatas) => {
      if (Object.keys(metaDatas).length !== 0)
        dispatch("ADD_META_DATA_TO_STORE", metaDatas);
        
    });
  }

  const displayDashboard =
    state.login.isLoggedIn && state.login.role === "Doctor";
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
              <Route path="/Dashboard/*" element={<DashboardLayout />}>
                <Route path="*" element={<Dashboard />} />
                <Route path="Prescriptions/:fileId" element={<ViewAllFilePrescriptions />}/>
                <Route path="New-Prescription/:fileId" element={<NewPrescription />}/>
                <Route path="Website-Management/*" element={<WebsiteManagement />}>
                  <Route path="Meta-Data" element={<MetaData />} />
                  <Route path="SliderManagement" element={<SliderManagement />} />
                  <Route path="Services" element={<ServicesManagement />} />
                  <Route path="Articles" element={<ArticlesManagement />} />
                  <Route path="News" element={<NewsManagement />} />
                  <Route path="Vaccines" element={<VaccinesManagemt />} />
                </Route>
              </Route>
            )}
            <Route path="/Dashboard/Print-Prescription" element={<PrintPrescription />}/>
          </Route>
        )
      )}
    />
  );
}

export default App;

import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useStore } from "../../hooks-store/store";
import { httpGET } from "../../http/httpGET";
import { api } from "../../utility/api";
import ArticlesManagement from "./articles/articles-management";
import CarouselManagement from "./carousel/carousel";
import MetaData from "./meta-data/meta-data";
import NewsManagement from "./news/news-management";
import ServicesManagement from "./services/services-management";
import VaccinesManagemt from "./vaccins/vaccin-management";
import WebsiteManagementSideMenuOptions from "./website-mgmt-side-menu";

const WebsiteManagement = () => {
  const [state, dispatch] = useStore();
  useEffect(() => {
    //Initiate Articles
    if (state.articles_store.articles.length === 0) {
      httpGET(api.articles.get_all_articles).then((response) => {
        if (response.status === 401) {
          alert("Please login first");
          dispatch("LOGOUT");
        }
        if (response.status === 200) {
          response.json().then((data) => {
            if (data.length !== 0) dispatch("INITIATE_ARTICLES", data);
          });
        }
      });
    }
    //Initiate Slider Images
    if (!state.sliderImages.isInitiated) {
      httpGET(api.slider_images.get_all_slider_images).then((response) => {
        if (response.status === 401) {
          alert("Please login first");
          dispatch("LOGOUT");
        }
        if (response.status === 200) {
          response.json().then((data) => {
            dispatch("INITIATE_SLIDER_IMAGES", data);
          });
        }
      });
    }
    //Initiate News
    if (!state.newsStore.isInitiated) {
      httpGET(api.news.get_all_news).then((response) => {
        if (response.status === 401) {
          alert("Please login first");
          dispatch("LOGOUT");
        }
        if (response.status === 200) {
          response.json().then((data) => {
            if (data.length !== 0) dispatch("INITIATE_NEWS", data);
          });
        }
      });
    }

    //Initiate Services
    if (!state.clinic_services_store.isInitiated) {
      httpGET(api.clinic_services.get_all_services).then((response) => {
        if (response.status === 401) {
          alert("Please login first");
          dispatch("LOGOUT");
        }
        if (response.status === 200) {
          response.json().then((data) => {
            if (data.length !== 0) dispatch("INITIATE_CLINIC_SERVICES", data);
          });
        }
      });
    }
    //Initiate Vaccines
    // alert(!state.vaccins_store.isInitiated);
    if (!state.vaccins_store.isInitiated) {
      httpGET(api.vaccins.get_all_vaccins).then((response) => {
        if (response.status === 401) {
          alert("Please login first");
          dispatch("LOGOUT");
        }
        if (response.status === 200) {
          response.json().then((data) => {
            if (data.length !== 0) dispatch("INITIATE_VACCINS", data);
          });
        }
      });
    }
  }, [
    dispatch,
    state.articles_store.articles.length,
    state.clinic_services_store.isInitiated,
    state.newsStore.isInitiated,
    state.sliderImages.isInitiated,
    state.vaccins_store.isInitiated,
  ]);
  return (
    <div className="row">
      <div className="col-lg-4 col-sm-12">
        <WebsiteManagementSideMenuOptions />
      </div>
      <div className="col-lg-8 col-sm-12">
        <Routes>
          <Route path="Meta-Data" element={<MetaData />} />
          <Route path="SliderManagement" element={<CarouselManagement />} />
          <Route path="Services" element={<ServicesManagement />} />
          <Route path="Articles" element={<ArticlesManagement />} />
          <Route path="News" element={<NewsManagement />} />
          <Route path="Vaccines" element={<VaccinesManagemt />} />
          <Route
            path="*"
            element={
              <h1 className="text-center text-warning mt-5">
                من هنا يمكنك إدارة موقع الويب
              </h1>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default WebsiteManagement;

import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useStore } from "../../hooks-store/store";
import { httpGET } from "../../http/httpGET";
import { api } from "../../utility/api";
import ArticlesManagement from "./components/articles/articles-management";
import CarouselManagement from "./components/carousel/carousel";
import MetaData from "./components/meta-data/meta-data";
import NewsManagement from "./components/news/news-management";
import ServicesManagement from "./components/services/services-management";
import VaccinesManagemt from "./components/vaccins/vaccin-management";
import WebsiteManagementSideMenuOptions from "./components/website-mgmt-side-menu";

const WebsiteManagement = () => {
  const [state, dispatch] = useStore();
  useEffect(() => {
    //Initiate Articles
    if (state.articles_store.articles.length === 0) {
      httpGET(api.articles.get_all_articles).then((articles) => {
        if (articles.length !== 0) dispatch("INITIATE_ARTICLES", articles);
      });
    }
    //Initiate Slider Images
    if (!state.sliderImages.isInitiated) {
      httpGET(api.slider_images.get_all_slider_images).then((result) =>
        dispatch("INITIATE_SLIDER_IMAGES", result)
      );
    }
    //Initiate News
    if (!state.newsStore.isInitiated) {
      httpGET(api.news.get_all_news).then((news) => {
        if (news.length !== 0) dispatch("INITIATE_NEWS", news);
      });
    }

    //Initiate Services
    if (!state.clinic_services_store.isInitiated) {
      httpGET(api.clinic_services.get_all_services).then((services) => {
        if (services.length !== 0)
          dispatch("INITIATE_CLINIC_SERVICES", services);
      });
    }
    //Initiate Vaccines
    // alert(!state.vaccins_store.isInitiated);
    if (!state.vaccins_store.isInitiated) {
      httpGET(api.vaccins.get_all_vaccins).then((vaccins) => {
        if (vaccins.length !== 0) dispatch("INITIATE_VACCINS", vaccins);
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
          <Route path="Vaccines" element={<VaccinesManagemt />} />{" "}
        </Routes>
      </div>
    </div>
  );
};

export default WebsiteManagement;

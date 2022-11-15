import { Fragment, useEffect } from "react";
import Slider from "../../components/home-page/slider";
import BookRole from "../../components/home-page/booking-section/booking-section";
import SendMessage from "../../components/home-page/send-message";
import ServicesSection from "../../components/home-page/services-section/services-section";
import ArticlesSection from "../../components/home-page/articles-section/articles-section";
import NewsSection from "../../components/home-page/news-section/news-section";

const Home = () => {
  // console.log(localStorage.getItem("token") === null);
  document.title = "الرئيسية";
  useEffect(() => {
    // scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <Fragment>
      <Slider />
      <ServicesSection />
      <BookRole />
      <NewsSection/>
      <ArticlesSection />
      <SendMessage />
    </Fragment>
  );
};
export default Home;

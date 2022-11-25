import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../utility/api";
import NewsItem from "./news-item";
import { httpGET } from "../../../http/httpGET";
import SiteLoadindSpiner from "../site-loading-spinner";

const NewsSection = () => {
  const [latestTwoNews, setLatestTwoNews] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  useEffect(() => {
    if (latestTwoNews.length < 1) {
      setIsLoading(true);
      httpGET(api.news.get_latest_two_news)
        .then((result) => {
          setIsLoading(false);
          setLatestTwoNews(result);
        })
        .catch((c) => {
          alert("Network error while fetching news !!");
          setIsLoading(false);
        });
    }
  }, [latestTwoNews.length]);
  if (isLoading) return <SiteLoadindSpiner text="تحميل الأخبار" />;
  if (latestTwoNews.length === 0) {
    return null;
  } else {
    return (
      <section className="py-5 px-1">
        <div className="container-fluid">
          <h1 className="text-success font-family-hacen text-center mb-5">
            آخر الأخبار
          </h1>
          <div className="row">
            {latestTwoNews.map((news) => (
              <div key={news.id} className="col-sm-12 col-lg-5 mx-lg-auto p-0">
                <NewsItem news={news} />
              </div>
            ))}
          </div>
        </div>
        <Link
          to="/News"
          className="text-decoration-none text-center fw-bold d-block"
        >
          عرض جميع الأخبار
        </Link>
      </section>
    );
  }
};
export default NewsSection;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../utility/api";
import NewsItem from "./news-item";
import { httpGET } from "../../../http/httpGET";

const NewsSection = () => {
  const [latestTwoNews, setLatestTwoNews] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  let isInitiated = false;
  useEffect(() => {
    if (latestTwoNews.length < 1 && isInitiated === false) {
      setIsLoading(true);
      httpGET(api.news.get_latest_two_news).then((result) => {
        setIsLoading(false);
        setLatestTwoNews(result);
      });
    }
    isInitiated = true;
  }, []);
  if (isLoading) {
    return <h1 className="text-center text-danger">Loading news</h1>;
  }
  if (latestTwoNews.length === 0) {
    return null;
  } else {
    return (
      <section className="py-5 px-1">
        <div className="container-fluid">
          <h1 className="main-title text-center mb-2">آخر الأخبار</h1>
          <div className="row">
            {latestTwoNews.map((news) => (
              <div key={news.id} className="col-md-6 col-sm-12">
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

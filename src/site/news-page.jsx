import { Fragment, useEffect, useState } from "react";
import NewsItem from "./news-item";
import { useStore } from "../hooks-store/store";
import { httpGET } from "../http/httpGET";
import { api } from "../utility/api";
import SiteLoadindSpiner from "./components/site-loading-spinner";

const NewsPage = () => {
  document.title = "أخبار العيادة";

  const [state, dispatch] = useStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    //get all news from the server
    if (!state.newsStore.isInitiated) {
      httpGET(api.news.get_all_news)
        .then((response) => {
          if (response.status === 401) {
            alert("Please login first");
            dispatch("LOGOUT");
          }
          if (response.status === 200) {
            response.json().then((data) => {
              if (data.length !== 0) dispatch("INITIATE_NEWS", data);
            });
          }
          setIsLoading(false);
        })
        .catch((c) => {
          alert("Network error while fetching news !!");
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <Fragment>
      {isLoading && <SiteLoadindSpiner text="جارى تحميل الأخبار" />}
      {!isLoading && state.newsStore.news.length > 0 && (
        <div className="container">
          <h1 className="text-success font-family-hacen text-center my-3">
            أخبار العيادة
          </h1>
          <div className=" row">
            {state.newsStore.news.map((news) => (
              <div key={news.id} className="col-12">
                <NewsItem key={news.id} news={news} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default NewsPage;

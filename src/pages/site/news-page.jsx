import { Fragment, useEffect } from "react";
import NewsItem from "../../components/home-page/news-section/news-item";
import { useStore } from "../../hooks-store/store";
import { httpGET } from "../../http/httpGET";
import { api } from "../../utility/api";

const NewsPage = () => {
  document.title = "أخبار العيادة";

  const [state, dispatch] = useStore();

  //get all news from the server
  if (state.news.length === 0) {
    httpGET(api.news.get_all_news).then((news) => {
      if (news.length !== 0) dispatch("INITIATE_NEWS", news);
    });
  }

  useEffect(() => {
    // scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <Fragment>
      {state.news.length > 0 && (
        <div className="container">
          <h1 className="main-title text-center my-3">أخبار العيادة</h1>
          <div className=" row">
            {state.news.map((news) => (
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

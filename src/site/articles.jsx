import { useEffect, useState } from "react";
import { useStore } from "../hooks-store/store";
import { httpGET } from "../http/httpGET";
import { api } from "../utility/api";
import ArticleItem from "../site/components/articles-section/article-item";
import SiteLoadindSpiner from "../site/components/site-loading-spinner";

const Articles = () => {
  document.title = "مقالات الدكتورة";
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useStore();

  useEffect(() => {
    // scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    //get all articles from the server
    if (!state.articles_store.isInitiated) {
      setIsLoading(true);
      httpGET(api.articles.get_all_articles)
        .then((response) => {
          if (response.status === 401) {
            alert("Please login first");
            dispatch("LOGOUT");
          }
          if (response.status === 200) {
            response.json().then((data) => {
              if (data.length !== 0) dispatch("INITIATE_ARTICLES", data);
            });
          }
          setIsLoading(false);
        })
        .catch((c) => {
          alert("Network error while fetching articles!!");
          setIsLoading(false);
        });
    }
  }, []);
  return (
    <div className="blog" style={{ padding: "50px 10px 0px 10px" }}>
      {isLoading && <SiteLoadindSpiner />}
      {state.articles_store.articles.length > 0 && (
        <div className="container" style={{ maxWidth: "100%" }}>
          <h1 className="text-success font-family-hacen text-center mb-5">
            مقالات الدكتورة
          </h1>
          <div className="row">
            {state.articles_store.articles.map((article) => (
              <div
                key={article.id}
                className="col-sm-12 col-lg-5 mx-lg-auto my-1 p-0"
              >
                <ArticleItem key={article.id} article={article} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Articles;

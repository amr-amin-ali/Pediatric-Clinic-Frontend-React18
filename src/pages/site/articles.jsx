import { useEffect } from "react";
import { useStore } from "../../hooks-store/store";
import { httpGET } from "../../http/httpGET";
import { api } from "../../utility/api";
import ArticleItem from "../../components/home-page/articles-section/article-item";

const Articles = () => {
  document.title = "مقالات الدكتورة";

  const [state, dispatch] = useStore();

  //get all articles from the server
  if (state.articles.length === 0) {
    httpGET(api.articles.get_all_articles).then((articles) => {
      if (articles.length !== 0) dispatch("INITIATE_ARTICLES", articles);
    });
  }

  useEffect(() => {
    // scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="blog" style={{ padding: "50px 10px 0px 10px" }}>
      {state.articles.length > 0 && (
        <div className="container" style={{ maxWidth: "100%" }}>
          <h1 className="main-title text-center mb-5">مقالات الدكتورة</h1>
          <div className="row">
            {state.articles.map((article) => (
              <div key={article.id} className="col-md-6 col-sm-12 my-1">
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

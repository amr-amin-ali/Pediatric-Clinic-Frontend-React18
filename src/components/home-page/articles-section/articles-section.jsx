import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../utility/api";
import ArticleItem from "./article-item";
import { httpGET } from "../../../http/httpGET";

const ArticlesSection = () => {
  const [latestTwoArticles, setLatestTwoArticles] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  let isInitiated = false;
  useEffect(() => {
    if (latestTwoArticles.length < 1 && isInitiated === false) {
      setIsLoading(true);
      httpGET(api.articles.get_latest_two_articles).then((result) => {
        setIsLoading(false);
        setLatestTwoArticles(result);
      });
    }
    isInitiated = true;
  }, []);
  if (isLoading) {
    return <h1 className="text-center text-danger">Loading articles</h1>;
  }
  if (latestTwoArticles.length === 0) {
    return null;
  } else {
    return (
      <section className="py-2 px-1">
        <div className="container-fluid" style={{ maxWidth: "100%" }}>
          <h1 className="main-title text-center mb-5">مقالات الدكتورة</h1>
          <div className="row">
            {latestTwoArticles.map((article) => (
              <div key={article.id} className="col-md-6 col-sm-12">
                <ArticleItem article={article} />
              </div>
            ))}
          </div>
        </div>
        <Link
          to="/Articles"
          className="text-decoration-none text-center fw-bold mb-5 d-block"
        >
          عرض جميع المقالات
        </Link>
      </section>
    );
  }
};

export default ArticlesSection;

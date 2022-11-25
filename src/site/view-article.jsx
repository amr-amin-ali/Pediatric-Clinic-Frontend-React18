import { useState } from "react";
import { useParams } from "react-router-dom";
import SiteLoadindSpiner from "../site/components/site-loading-spinner";
import { httpGET } from "../http/httpGET";
import { api } from "../utility/api";

const ViewArticle = () => {
  const params = useParams();
  const articleId = params.id;
  const [article, setArticle] = useState(null);
  const [requested, setRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!requested) {
    setIsLoading(true);
    httpGET(api.articles.get_article_by_id + articleId).then((response) => {
      if (article === null) {
        setArticle(response);
      }
      setIsLoading(false);
    }).catch(c=>{alert('Network error !!!');setIsLoading(false);});
    setRequested(true);
  }
  return (
    <div className="blog" style={{ padding: "3px 10px 0px 10px" }}>
      <div className="container" style={{ maxWidth: "100%" }}>
        {isLoading && <SiteLoadindSpiner text="جارى القراءة..." />}
        {article && (
          <div className="row">
            <div className="col-12 p-0">
              <img
                className="img-thumbnail border-danger bg-danger"
                src={api.base_url + article.image}
                alt={article.title}
              />
            </div>
            <div className="col-12">
              <h2 className="fs-4 text-success">{article.title}</h2>
              <p>
                <small>
                  <svg
                    className="bi bi-people-fill"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path
                      fillRule="evenodd"
                      d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                    />
                    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                  </svg>
                  أنس
                </small>
                &nbsp;
                <small>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    fill="currentColor"
                    className="bi bi-chat-text"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                    <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" />
                  </svg>
                  1296
                </small>
                &nbsp;
                <small>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    fill="currentColor"
                    className="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                  </svg>
                  2530
                </small>
              </p>
              <p
                className="mt-2 mb-3"
                style={{
                  fontSize: "14px",
                  textIndent: "20px",
                  textAlign: "justify",
                }}
              >
                {article.text}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ViewArticle;

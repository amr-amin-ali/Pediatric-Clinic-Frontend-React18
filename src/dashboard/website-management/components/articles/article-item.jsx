import { Fragment } from "react";
import { api } from "../../../../utility/api";
import EditAndDeleteButtons from "../../../components/edit-and-delete-btns/edit-and-delete-btns";
const ArticleItem = ({ article, deleteClickHandler, editClickHandler }) => {
  if (!article) {
    return null;
  }
  return (
    <Fragment>
      <div className="position-relative"></div>
      <div className={`row rounded-3`} style={{ overflow: "hidden" }}>
        <div className="col-sm-5 p-0 ">
          <img
            src={api.base_url + article.image}
            alt=""
            style={{ width: "100%", maxHeight: "200px" }}
          />
        </div>
        <div className="col-sm-7 blog-content-tab p-1 bg-white">
          <h2 className="fs-4 d-flex justify-content-between">
            {article.title}
            <EditAndDeleteButtons
              deleteAction={() => deleteClickHandler(article.id)}
              editAction={() => editClickHandler(article)}
            />
          </h2>
          <p
            className="text-truncate"
            style={{ fontSize: "12px", textIndent: "20px" }}
          >
            {article.text}
          </p>
        </div>
      </div>
    </Fragment>
  );
};
export default ArticleItem;

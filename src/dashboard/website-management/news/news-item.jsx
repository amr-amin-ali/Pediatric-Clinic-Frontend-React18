import { Fragment } from "react";
import { api } from "../../../utility/api";
import EditAndDeleteButtons from "../../components/buttons/edit-and-delete-btns";
const NewsItem = ({ news, deleteClickHandler, editClickHandler }) => {
  if (!news) {
    return null;
  }
  return (
    <Fragment>
      <div className="bg-white mb-3 rounded-3 row m-md-0 p-0 position-relative overflow-hidden">
        <div className="col-sm-5 p-0">
          <img
            src={api.base_url + news.image}
            alt=""
            style={{ width: "100%", maxHeight: "200px" }}
          />
        </div>
        <div className="col-sm-7 blog-content-tab p-1">
          <h2 className="fs-4 d-flex justify-content-between">
            <span>{news.title}</span>
            <EditAndDeleteButtons
              deleteAction={() => deleteClickHandler(news.id)}
              editAction={() => editClickHandler(news)}
            />
          </h2>
          <p style={{ fontSize: "12px", textIndent: "20px" }}>{news.text}</p>
        </div>
      </div>
    </Fragment>
  );
};
export default NewsItem;

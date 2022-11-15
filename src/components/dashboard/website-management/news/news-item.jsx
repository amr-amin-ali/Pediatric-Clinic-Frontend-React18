import { Fragment } from "react";
import { api } from "../../../../utility/api";
import styles from "./news-item.module.css";
const NewsItem = ({
  news,
  deleteClickHandler,
  editClickHandler,
}) => {
  if (!news) {
    // console.log('newsItemPreview: ','news is undefined')
    return null;
  }
  // console.log(news)
  return (
    <Fragment>
      <div className="position-relative">
        <span
          className={styles.deleteButton}
          onClick={() => deleteClickHandler(news.id)}
        >
          <svg viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
          </svg>
        </span>
        <span
          className={styles.editButton}
          onClick={() => editClickHandler(news)}
        >
          <svg viewBox="0 0 16 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
          </svg>
        </span>
      </div>
      <div
        className={`${styles.news} mb-3 rounded-3 row m-md-0`}
        style={{ overflow: "hidden" }}
      >
        <div className="col-sm-5 p-0">
          <img src={api.base_url + news.image} alt="" />
        </div>
        <div className="col-sm-7 blog-content-tab p-1">
          <h2 className="fs-4">{news.title}</h2>
          <p style={{ fontSize: "12px", textIndent: "20px" }}>{news.text}</p>
        </div>
      </div>
    </Fragment>
  );
};
export default NewsItem;

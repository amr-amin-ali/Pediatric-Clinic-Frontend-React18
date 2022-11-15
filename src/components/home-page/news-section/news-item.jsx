import { api } from "../../../utility/api";

const NewsItem = ({ news }) => {
  return (
    <div className="border news mb-3 rounded-3 row m-md-0 overflow-hidden">
      <div className="col-sm-5 p-0">
        <img src={api.base_url + news.image} alt="" />
      </div>
      <div className="col-sm-7 blog-content-tab p-1">
        <h2 className="fs-4">{news.title}</h2>
        <p style={{ fontSize: "12px", textIndent: "20px" }}>{news.text} </p>
      </div>
    </div>
  );
};

export default NewsItem;

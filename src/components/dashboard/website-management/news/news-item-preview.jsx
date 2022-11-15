import { Fragment } from "react";
import { api } from "../../../../utility/api";
const NewsItemPreview = ({ title, text, image }) => {
  return (
    <Fragment>
      <div className="row bg-white rounded-3 overflow-hidden">
        <div className="col-4 p-0">
          {!image && (
            <svg
              width="150"
              height="100"
              x="0px"
              y="0px"
              viewBox="0 0 500 1000"
            >
              <path d="M881.1,132.5H118.9C59,132.5,10,181.5,10,241.4v517.3c0,59.9,49,108.9,108.9,108.9h762.2c59.9,0,108.9-49,108.9-108.9V241.4C990,181.5,941,132.5,881.1,132.5z M949.2,747.3c0,54.9-24.5,79.4-79.4,79.4H130.3c-54.9,0-79.4-24.5-79.4-79.4V252.7c0-54.9,24.5-79.4,79.4-79.4h739.5c54.9,0,79.4,24.5,79.4,79.4V747.3z M316.3,418.3L418.3,500l265.4-224.6l204.2,183.8v306.3H112.1V581.7L316.3,418.3z M193.8,234.6c-45.1,0-81.7,36.6-81.7,81.7s36.6,81.7,81.7,81.7s81.7-36.6,81.7-81.7S238.9,234.6,193.8,234.6z" />
            </svg>
          )}
          {image && <img src={image} alt="" />}
        </div>
        <div className="col-8 text-start">
          <h2 className="fs-4">{title}</h2>
          <p style={{ fontSize: "12px", textIndent: "20px" ,overflowWrap: 'break-word'}}>{text}</p>
        </div>
      </div>
    </Fragment>
  );
};
export default NewsItemPreview;

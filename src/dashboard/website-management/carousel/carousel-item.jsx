import { Fragment, useState } from "react";
import { useStore } from "../../../hooks-store/store";
import { httpDELETE } from "../../../http/httpDELETE";
import { api } from "../../../utility/api";
import DashboardLoader from "../../components/loader/dashboardLoader";

const CarouselItem = ({ imageUrl, imageId = 0, itemKey }) => {
  const dispatch = useStore()[1];
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteImage = async (imageId) => {
    if (window.confirm("هل تريد الحذف فعلاً؟") === true) {
      setIsDeleting(true);
      httpDELETE(api.slider_images.delete_slider_image + imageId)
        .then((response) => {
          if (response.status === 204) {
            dispatch("DELETE_IMAGE", imageId);
          }
          if (response.status === 404) {
            response.json().then((result) => alert(Object.values(result)[0]));
          }
          if (response.status === 400 || response.status === 422) {
            response.json().then((result) => alert(Object.values(result)[0]));
          }
          if (response.status === 401) {
            alert("Please login first");
            dispatch("LOGOUT");
          }  
          setIsDeleting(false);
        })
        .catch((c) => {
          alert("Network error while deleting article!!");
          setIsDeleting(false);
        });
    }
  };

  return (
    <div key={itemKey} className="position-relative">
      {isDeleting && <DashboardLoader text="جارى الحذف" />}
      {!isDeleting && (
        <Fragment>
          <img src={imageUrl} alt="" style={{ width: "100%" }} />

          <svg
            onClick={() => deleteImage(imageId)}
            className="position-absolute top-0 end-0"
            width="24"
            height="24"
            fill="#f00"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
          </svg>
        </Fragment>
      )}
    </div>
  );
};
export default CarouselItem;

import { useState } from "react";
import { Fragment, useEffect } from "react";
import { useStore } from "../../hooks-store/store";
import { httpGET } from "../../http/httpGET";
import { api } from "../../utility/api";
import SiteLoadindSpiner from "./site-loading-spinner";

const Slider = () => {
  // return;
  const [state, dispatch] = useStore(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!state.sliderImages.isInitiated) {
      setIsLoading(true);
      httpGET(api.slider_images.get_all_slider_images)
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              dispatch("INITIATE_SLIDER_IMAGES", data);
              setIsLoading(false);
            });
          }
        })
        .catch((c) => {
          alert("Network error while fetching metaDatas !!");
        });
    }
  }, []);

  let buttonsCounter = 0;
  let carouseItemsCounter = 0;
  if (isLoading) return <SiteLoadindSpiner text="تحميل الصور" />;
  else
    return (
      <Fragment>
        {state.sliderImages.images.length > 0 && (
          <div
            id="main-carousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators" id="services">
              {state.sliderImages.images.map((c) => (
                <button
                  key={buttonsCounter}
                  type="button"
                  data-bs-target="#main-carousel"
                  data-bs-slide-to={`${buttonsCounter}`}
                  aria-current="true"
                  className={buttonsCounter++ === 0 ? `active` : null}
                ></button>
              ))}
            </div>
            <div
              className="carousel-inner home-slider-desktop"
              style={{ height: "33vh" }}
            >
              {state.sliderImages.images.map((img) => (
                <div
                  key={img.id}
                  className={
                    carouseItemsCounter++ === 0
                      ? "carousel-item active"
                      : "carousel-item"
                  }
                >
                  <img
                    style={{ maxHeight: "33vh" }}
                    src={`${api.base_url + img.imageUrl}`}
                    className="d-block w-100 home-carousel-image-desktop"
                    alt="..."
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#main-carousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#main-carousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        )}
      </Fragment>
    );
};
export default Slider;

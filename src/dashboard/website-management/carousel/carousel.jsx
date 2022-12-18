import { Fragment, useEffect, useState } from "react";
import CarouselItem from "./carousel-item";
import { useStore } from "../../../hooks-store/store";
import { httpGET } from "../../../http/httpGET";
import { httpPOSTFile } from "../../../http/httpPOSTFile";
import { api } from "../../../utility/api";
import DashboardLoader from "../../components/loader/dashboardLoader";

const CarouselManagement = () => {
  const [state, dispatch] = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [showSaveImgBtn, setShowSaveImgBtn] = useState();
  const [buttonText, setButtonText] = useState("إضافة صورة");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const imgInputChangeHandler = (event) => {
    if (event.target.files[0]) {
      setButtonText("تغيير الصورة");
      setShowSaveImgBtn(true);
      setSelectedImage(event.target.files[0]);
      //reset file input value
      const fileInputs = document.querySelector("#uploadSliderImage");
      fileInputs.value = null;
    }
  };
  const saveImageButtonClickHandler = async () => {
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append("image", selectedImage, selectedImage.name);
    setIsUploading(true);
    await httpPOSTFile(api.slider_images.upload_slider_image, formData)
      .then((response) => {
        if (response.status === 400) {
          response.json().then((result) => alert(Object.values(result)[0]));
          setIsUploading(false);
        }
        if (response.status === 401) {
          alert("Please login first");
          dispatch("LOGOUT");
        }

        if (response.status === 201) {
          response.json().then((data) => {
            //AFTER SUCCESS
            dispatch("ADD_SLIDER_IMAGE_TO_STORE", data);
            setShowSaveImgBtn(false);
            setButtonText("إضافة صورة");
            setImageUrl(null);
            setSelectedImage(null);
            setIsUploading(false);
          });
        }
      })
      .catch((c) => {
        alert("Network error while uploading image!!");
        setIsUploading(false);
      });
    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
  };
  useEffect(() => {
    if (!state.sliderImages.isInitiated) {
      setIsLoading(true);
      httpGET(api.slider_images.get_all_slider_images)
        .then((result) => {
          dispatch("INITIATE_SLIDER_IMAGES", result);
          setIsLoading(false);
        })
        .catch((c) => {
          alert("Network error while fetching images!!");
          setIsLoading(false);
        });
    }
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  return (
    <Fragment>
      <div className="row p-5">
        <div className="col-6">
          <div>
            <div className="my-3">
              <label htmlFor="uploadSliderImage">
                <button
                  type="button"
                  class="my-btn my-primary btn btn-primary w-100 py-3 fw-bold"
                >
                  {buttonText}
                </button>{" "}
              </label>
              <input
                onChange={imgInputChangeHandler}
                required
                type="file"
                name="clinicLogo"
                id="uploadSliderImage"
                hidden
              />
            </div>
            {showSaveImgBtn && (
              <div className="my-3">
                {isUploading && <DashboardLoader text="جارى تحميل الصورة" />}
                {!isUploading && (
                  <button
                    onClick={saveImageButtonClickHandler}
                    type="button"
                    class="my-btn my-primary btn btn-primary w-100 py-3 fw-bold"
                  >
                    حفظ الصورة
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="col-6 text-end">
          {imageUrl && selectedImage && (
            <img
              src={imageUrl}
              style={{ width: "200px", height: "200px" }}
              alt="clinicLogoPreview"
            />
          )}
        </div>
      </div>

      <div className="row m-0">
        {isLoading && <DashboardLoader text="جارى تحميل البيانات" />}

        {!isLoading &&
          state.sliderImages.images.length > 0 &&
          state.sliderImages.images.map((c) => {
            return (
              <div key={c.id + 1} className="col-sm-12 col-lg-3 p-1">
                <CarouselItem
                  itemKey={c.id}
                  imageId={c.id}
                  imageUrl={api.base_url + c.imageUrl}
                />
              </div>
            );
          })}
        {!isLoading && state.sliderImages.images.length < 1 && (
          <h1 className="text-center text-white mt-3">
            لم تقم بإضافة صور حتى الآن
          </h1>
        )}
      </div>
    </Fragment>
  );
};

export default CarouselManagement;

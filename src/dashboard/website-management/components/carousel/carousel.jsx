import { Fragment, useEffect, useState } from "react";
import ButtonWithPressEffect from "../../../components/buttons/button-withPressEffect";
import CarouselItem from "./carousel-item";
import { httpPOSTFile } from "../../../../http/httpPOSTFile";
import { useStore } from "../../../../hooks-store/store";
import { httpGET } from "../../../../http/httpGET";
import { api } from "../../../../utility/api";
import DashboardLoader from "../../../components/loader/dashboardLoader";

const CarouselManagement = () => {
  const [state, dispatch] = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const [showSaveImgBtn, setShowSaveImgBtn] = useState();
  const [buttonText, setButtonText] = useState("إضافة صورة");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const imgInputChangeHandler = (event) => {
    if (event.target.files[0]) {
      setButtonText("تغيير الصورة");
      setShowSaveImgBtn(true);
      setSelectedImage(event.target.files[0]);
    }
  };
  const saveImageButtonClickHandler = async () => {
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append("myFile", selectedImage, selectedImage.name);

    await httpPOSTFile(api.slider_images.upload_slider_image, formData);

    httpGET(api.slider_images.get_all_slider_images).then((result) =>
      dispatch("INITIATE_SLIDER_IMAGES", result)
    );
    setShowSaveImgBtn(false);
    setButtonText("إضافة صورة");
    setImageUrl(null);
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
  }, []);
  useEffect(() => {
    if (selectedImage) setImageUrl(URL.createObjectURL(selectedImage));
  }, [selectedImage]);

  return (
    <Fragment>
      <div className="row p-5">
        <div className="col-6">
          <div>
            <div className="my-3">
              <label htmlFor="uploadSliderImage">
                <ButtonWithPressEffect text={buttonText} />
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
                <ButtonWithPressEffect
                  text="حفظ الصورة"
                  buttonClickHandler={saveImageButtonClickHandler}
                />
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

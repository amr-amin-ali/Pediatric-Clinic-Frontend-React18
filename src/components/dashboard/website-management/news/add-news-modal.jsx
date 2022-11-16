import { useEffect, useState } from "react";
import { useStore } from "../../../../hooks-store/store";
import { httpPOSTWithFile } from "../../../../http/httpPOSTWithFile";
import { api } from "../../../../utility/api";
import ButtonWithPressEffect from "../../buttons/button-withPressEffect";
import ResetButton from "../../buttons/reset-button";
import DashboardLoader from "../../loader/dashboardLoader";
import ModalFooter from "../../../modal-lg/modal-lg-footer";
import TextInput from "../../text-input";
import TextareaInput from "../../textarea-input";
import ModalHeader from "../../bootstrap-modal/modal-header";
import SubmitButton from "../../buttons/submit-button";
import { newsModel } from "../../../../models/news-model";
import NewsItemPreview from "./news-item-preview";

const AddNewsModal = () => {
  const dispatch = useStore()[1];
  const [isSubmitting, setIsSubmitting] = useState(false);

  /////////Image////////////////////////
  const [buttonText, setButtonText] = useState("إضافة صورة");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const imgInputChangeHandler = (event) => {
    if (event.target.files[0]) {
      setButtonText("تغيير الصورة");
      setSelectedImage(event.target.files[0]);
    }
  };
  useEffect(() => {
    if (selectedImage) {
      newNews.image = URL.createObjectURL(selectedImage);
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  ///////End Image/////////////////////////////

  const [newNews, setNewNews] = useState(newsModel);
  const [errors, setErrors] = useState({});
  const inputsChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "title") {
      setNewNews({ ...newNews, title: value });
      if (!value) {
        setErrors({ ...errors, title: "يجب إدخال إسم الخدمة" });
      }
    }
    if (name === "text") {
      setNewNews({ ...newNews, text: value });
      if (!value) {
        setErrors({ ...errors, text: "يجب إدخال وصف الخدمة" });
      }
    }
    if (value) {
      const ers = { ...errors };
      delete ers[name];
      setErrors({ ...ers });
    }
  };
  const resetFormClickHandler = (event) => {
    setNewNews(newsModel);
  };

  const [closeModal, setCloseModal] = useState(false);
  const submitFormHandler = async (event) => {
    event.preventDefault();
    if (!newNews.title) {
      setErrors({ ...errors, title: "يجب إدخال إسم الخدمة" });
      return;
    }
    if (!newNews.text) {
      setErrors({ ...errors, text: "يجب إدخال وصف للخدمة" });
      return;
    }
    if (errors && Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      // Create an object of formData
      const formData = new FormData();
      // Update the formData object
      if (selectedImage) {
        formData.append("image", selectedImage, selectedImage.name);
      }
      formData.append("title", newNews.title);
      formData.append("text", newNews.text);
      //const response =
      const response = await httpPOSTWithFile(api.news.add_new_news, formData);
      const responseStatusCode = (await response).status;
      if (responseStatusCode === 401) {
        alert("Please login first");
        dispatch("LOGOUT");
      } else {
        const data = await response.json();
        dispatch("ADD_NEWS_TO_STORE", data);
        setCloseModal(true);
      }

      setNewNews({});
      setErrors({});
      //AFTER SUCCESS
      setButtonText("إضافة صورة");
      setImageUrl(null);
      setSelectedImage(null);
      setIsSubmitting(false);
      return;
    }
    alert("errors exist");
    return;
  };
  useEffect(() => {
    setCloseModal(false);
  }, [closeModal]);

  return (
    <div>
      <div
        className="modal  fade bg-blue-dark"
        data-bs-backdrop="static"
        id="addNewsModalB"
        tabIndex="-1"
        aria-labelledby="addNewsModalBLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content bg-blue-light">
            <form>
              <ModalHeader
                clickCloseButton={closeModal}
                title="إضافة خدمة جديدة"
              />

{isSubmitting && <DashboardLoader />}
        {!isSubmitting && (
          <div className="row justify-content-between m-0 px-3">
            <div className="col-6 text-warning">
              <div className="mx-0 my-1">
                <TextInput
                  onChangeHandler={inputsChangeHandler}
                  name="title"
                  placeholder="عنوان الخبر"
                  required={true}
                  value={newNews.title ?? ""}
                />
                {errors.title && (
                  <span style={{ color: "red" }}>{errors.title}</span>
                )}
              </div>
              <div className="mx-0 my-1">
                <TextareaInput
                  name="text"
                  placeholder="نص الخبر"
                  onChangeHandler={inputsChangeHandler}
                  value={newNews.text ?? ""}
                />
                {errors.text && (
                  <span style={{ color: "red" }}>{errors.text}</span>
                )}
              </div>
              <div className="mx-0 my-1">
                <div className="my-3">
                  <label htmlFor="new-news-image">
                    <ButtonWithPressEffect text={buttonText} />
                  </label>
                  <input
                    onChange={imgInputChangeHandler}
                    type="file"
                    name="clinicLogo"
                    id="new-news-image"
                    hidden
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <NewsItemPreview
                image={imageUrl}
                title={newNews.title}
                text={newNews.text}
              />
            </div>
          </div>
        )}

              <ModalFooter>
                <SubmitButton
                  title="أضف الآن"
                  clickHandler={submitFormHandler}
                />
                <ResetButton
                  onClickHandler={resetFormClickHandler}
                  title="تفريغ الحقول"
                />
              </ModalFooter>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddNewsModal;

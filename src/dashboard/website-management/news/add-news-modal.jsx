import { useEffect, useState } from "react";
import NewsItemPreview from "./news-item-preview";
import { useStore } from "../../../hooks-store/store";
import { httpPOSTWithFile } from "../../../http/httpPOSTWithFile";
import { newsModel } from "../../../models/news-model";
import { api } from "../../../utility/api";
import { closeBootstrapModal } from "../../../utility/close-bootstrap-modal";
import ButtonWithPressEffect from "../../components/buttons/button-withPressEffect";
import ResetButton from "../../components/buttons/reset-button";
import DashboardLoader from "../../components/loader/dashboardLoader";
import ModalFooter from "../../components/bootstrap-modal/modal-footer";
import TextInput from "../../components/inputs/text-input";
import TextareaInput from "../../components/inputs/textarea-input";
import ModalHeader from "../../components/bootstrap-modal/modal-header";
import SubmitButton from "../../components/buttons/submit-button";

const AddNewsModal = () => {
  const dispatch = useStore()[1];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newNews, setNewNews] = useState(newsModel);
  const [errors, setErrors] = useState({});

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
  }, [selectedImage, newNews]);

  ///////End Image/////////////////////////////

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

      httpPOSTWithFile(api.news.add_new_news, formData)
        .then((response) => {
          if (response.status === 400) {
            response.json().then((result) => alert(Object.values(result)[0]));
            setIsSubmitting(false);
            closeBootstrapModal();
          }
          if (response.status === 401) {
            alert("Please login first");
            dispatch("LOGOUT");
          }

          if (response.status === 201) {
            response.json().then((data) => {
              dispatch("ADD_NEWS_TO_STORE", data);
              setNewNews({});
              setErrors({});
              //AFTER SUCCESS
              setButtonText("إضافة صورة");
              setImageUrl(null);
              setSelectedImage(null);
              setIsSubmitting(false);
              closeBootstrapModal();
            });
          }
        })
        .catch((c) => {
          alert("Network error while publishing article!!");
          setIsSubmitting(false);
          closeBootstrapModal();
        });
    }
    return;
  };

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
              <ModalHeader title="نشر خبر جديد" />

              {isSubmitting && <DashboardLoader />}
              {!isSubmitting && (
                <div className="row justify-content-between m-0">
                  <div className="col-sm-12 col-md-6 text-warning">
                    <div className="my-1">
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

                    <div className="my-1">
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
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <NewsItemPreview
                      image={imageUrl}
                      title={newNews.title}
                      text={newNews.text}
                    />
                    <div className="my-3">
                      <label htmlFor="new-news-image">
                        <ButtonWithPressEffect text={buttonText} />
                        <input
                          onChange={imgInputChangeHandler}
                          type="file"
                          name="clinicLogo"
                          id="new-news-image"
                          hidden
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              <ModalFooter>
                <button
                  onClick={submitFormHandler}
                  type="button"
                  className="my-btn my-success btn btn-success py-3 px-5 fw-bold"
                  style={{ width: "200px" }}
                >
                  إنشر الآن
                </button>
                <button
                  onClick={resetFormClickHandler}
                  type="reset"
                  style={{
                    backgroundColor: "var(--blue-dark)",
                    width: "190px",
                  }}
                  className="my-btn btn py-3 px-5 fw-bold btn-dark text-white"
                >
                  تفريغ الحقول
                </button>
              </ModalFooter>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddNewsModal;

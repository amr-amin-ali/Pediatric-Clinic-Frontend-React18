import { useEffect, useState } from "react";
import { useStore } from "../../../hooks-store/store";
import { httpPOSTWithFile } from "../../../http/httpPOSTWithFile";
import { api } from "../../../utility/api";
import { articleModel } from "../../../models/article-model";
import ArticleItemPreview from "./article-item-preview";
import { closeBootstrapModal } from "../../../utility/close-bootstrap-modal";
import DashboardLoader from "../../components/loader/dashboardLoader";
import ModalFooter from "../../components/bootstrap-modal/modal-footer";
import TextInput from "../../components/inputs/text-input";
import TextareaInput from "../../components/inputs/textarea-input";
import ModalHeader from "../../components/bootstrap-modal/modal-header";

const AddArticleModal = () => {
  const dispatch = useStore()[1];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newArticle, setNewService] = useState(articleModel);
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
      newArticle.image = URL.createObjectURL(selectedImage);
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage, newArticle]);

  ///////End Image/////////////////////////////

  const inputsChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "title") {
      setNewService({ ...newArticle, title: value });
      if (!value) {
        setErrors({ ...errors, title: "يجب إدخال إسم الخدمة" });
      }
    }
    if (name === "text") {
      setNewService({ ...newArticle, text: value });
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
    setNewService(articleModel);
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    if (!newArticle.title) {
      setErrors({ ...errors, title: "يجب إدخال إسم الخدمة" });
      return;
    }
    if (!newArticle.text) {
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
      formData.append("title", newArticle.title);
      formData.append("text", newArticle.text);

      httpPOSTWithFile(api.articles.add_new_article, formData)
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
              dispatch("ADD_ARTICLE_TO_STORE", data);
              setNewService({});
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
        id="add-article-modal"
        tabIndex="-1"
        aria-labelledby="add-article-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content bg-blue-light">
            <form>
              <ModalHeader title="نشر مقالة جديدة" />
              {isSubmitting && <DashboardLoader />}
              {!isSubmitting && (
                <div className="row justify-content-between m-0">
                  <div className="col-sm-12 col-lg-6">
                    <div className="my-1">
                      <TextInput
                        onChangeHandler={inputsChangeHandler}
                        name="title"
                        placeholder="عنوان المقالة"
                        required={true}
                        value={newArticle.title ?? ""}
                      />
                      {errors.title && (
                        <span style={{ color: "red" }}>{errors.title}</span>
                      )}
                    </div>
                    <div className="my-1">
                      <TextareaInput
                        name="text"
                        placeholder="نص المقالة"
                        onChangeHandler={inputsChangeHandler}
                        value={newArticle.text ?? ""}
                      />
                      {errors.text && (
                        <span style={{ color: "red" }}>{errors.text}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12 col-lg-6">
                    <ArticleItemPreview
                      image={imageUrl}
                      title={newArticle.title}
                      text={newArticle.text}
                    />

                    <div className="my-3">
                      <label htmlFor="article-image">
                        <button
                          type="button"
                          className="my-btn my-primary btn btn-primary w-100 py-3 fw-bold"
                        >
                          {buttonText}
                        </button>
                      </label>
                      <input
                        onChange={imgInputChangeHandler}
                        type="file"
                        name="clinicLogo"
                        id="article-image"
                        hidden
                      />
                    </div>
                  </div>
                </div>
              )}
              <ModalFooter>
                <button
                  onClick={submitFormHandler}
                  type="button"
                  className="my-btn my-success btn btn-success py-3 px-5 fw-bold"
                  style={{ width: "190px" }}
                >
                  أضف الآن
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
export default AddArticleModal;

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
import { articleModel } from "../../../../models/article-model";
import ArticleItemPreview from "./article-item-preview";

const AddArticleModal = () => {

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
      newArticle.image = URL.createObjectURL(selectedImage);
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  ///////End Image/////////////////////////////

  const [newArticle, setNewService] = useState(articleModel);
  const [errors, setErrors] = useState({});
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

  const [closeModal, setCloseModal] = useState(false);
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
      //const response =
      const response = await httpPOSTWithFile(
        api.articles.add_new_article,
        formData
      );
      const responseStatusCode = (await response).status;
      if (responseStatusCode === 401) {
        alert("Please login first");
        dispatch("LOGOUT");
      } else {
        const data = await response.json();
        dispatch("ADD_ARTICLE_TO_STORE", data);
        setCloseModal(true);
      }

      setNewService({});
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
        id="add-article-modal"
        tabIndex="-1"
        aria-labelledby="add-article-modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content bg-blue-light">
            <form>
              <ModalHeader
                clickCloseButton={closeModal}
                title="نشر مقالة جديدة"
              />
              {isSubmitting && <DashboardLoader />}
              {!isSubmitting && (
                <div className="row justify-content-between m-0 px-3">
                  <div className="col-6 text-warning">
                    <div className="mx-0 my-1">
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
                    <div className="mx-0 my-1">
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
                    <div className="mx-0 my-1">
                      <div className="my-3">
                        <label htmlFor="article-image">
                          <ButtonWithPressEffect text={buttonText} />
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
                  <div className="col-6">
                    <ArticleItemPreview
                      image={imageUrl}
                      title={newArticle.title}
                      text={newArticle.text}
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
export default AddArticleModal;

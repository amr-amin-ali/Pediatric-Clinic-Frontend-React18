import ResetButton from "../../buttons/reset-button";
import SubmitButton from "../../buttons/submit-button";
import ModalFooter from "../../bootstrap-modal/modal-footer";
import ModalHeader from "../../bootstrap-modal/modal-header";
import TextInput from "../../text-input";
import { useEffect, useState } from "react";
import { api } from "../../../../utility/api";
import { useStore } from "../../../../hooks-store/store";
import { httpPUTWithFile } from "../../../../http/httpPUTWithFile";
import ButtonWithPressEffect from "../../buttons/button-withPressEffect";
import TextareaInput from "../../textarea-input";
import DashboardLoader from "../../loader/dashboardLoader";
import { newsModel } from "../../../../models/news-model";
import ArticleItemPreview from "./article-item-preview";

const EditArticleModal = ({ article }) => {
  const dispatch = useStore()[1];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [articleToEdit, setArticleToEdit] = useState(article);

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
      articleToEdit.image = URL.createObjectURL(selectedImage);
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage, article]);

  ///////End Image/////////////////////////////

  const [errors, setErrors] = useState({});
  const inputsChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "title") {
      setArticleToEdit({ ...articleToEdit, title: value });
      if (!value) {
        setErrors({ ...errors, title: "يجب إدخال إسم الخدمة" });
      }
    }
    if (name === "text") {
      setArticleToEdit({ ...articleToEdit, text: value });
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

  const [closeModal, setCloseModal] = useState(false);
  const resetFormClickHandler = (event) => {
    setArticleToEdit(newsModel);
  };
  const submitFormHandler = async (event) => {
    event.preventDefault();
    if (!articleToEdit.title) {
      setErrors({ ...errors, title: "يجب إدخال إسم الخدمة" });
      return;
    }
    if (!articleToEdit.text) {
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
      formData.append("id", articleToEdit.id);
      formData.append("title", articleToEdit.title);
      formData.append("text", articleToEdit.text);
      //const response =
      const response = await httpPUTWithFile(
        api.articles.update_article,
        formData
      );
      const responseStatusCode = (await response).status;
      if (responseStatusCode === 401) {
        alert("Please login first");
        dispatch("LOGOUT");
      } else {
        const data = await response.json();
        dispatch("UPDATE_ARTICLE_IN_STORE", data);
        setCloseModal(true);
      }

      setArticleToEdit({});
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
    setArticleToEdit(article);
    if (article.image) {
      setImageUrl(api.base_url + article.image);
    }
  }, [closeModal, article]);

  return (
    <div>
      <button
        id="edit-article-modal"
        hidden
        data-bs-toggle="modal"
        data-bs-target="#editVaccinModel"
      ></button>

      <div
        className="modal  fade bg-blue-dark"
        data-bs-backdrop="static"
        id="editVaccinModel"
        tabIndex="-2"
        aria-labelledby="editVaccinModelLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content bg-blue-light">
            <form>
              <ModalHeader
                clickCloseButton={closeModal}
                title="تعديل بيانات الخدمة"
              />

              {isSubmitting && <DashboardLoader />}
              {!isSubmitting && (
                <div className="row justify-content-between m-0">
                  <div className="col-sm-12 col-lg-6">
                    <div className="mx-0 my-1">
                      <TextInput
                        onChangeHandler={inputsChangeHandler}
                        name="title"
                        placeholder="عنوان المقالة"
                        required={true}
                        value={articleToEdit.title ?? ""}
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
                        value={articleToEdit.text ?? ""}
                      />
                      {errors.text && (
                        <span style={{ color: "red" }}>{errors.text}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12 col-lg-6">
                    <ArticleItemPreview
                      image={imageUrl}
                      title={articleToEdit.title}
                      text={articleToEdit.text}
                    />
                    <div className="my-3">
                      <label htmlFor="updateArticleImage">
                        <ButtonWithPressEffect text={buttonText} />
                      </label>
                      <input
                        onChange={imgInputChangeHandler}
                        type="file"
                        name="clinicLogoUpdate"
                        id="updateArticleImage"
                        hidden
                      />
                    </div>
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
export default EditArticleModal;

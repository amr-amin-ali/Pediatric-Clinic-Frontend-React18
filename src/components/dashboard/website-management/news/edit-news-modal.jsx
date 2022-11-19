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
import NewsItemPreview from "./news-item-preview";
import { newsModel } from "../../../../models/news-model";

const EditNewsModal = ({ news }) => {
  const dispatch = useStore()[1];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsToEdit, setNewsToEdit] = useState(news);

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
      newsToEdit.image = URL.createObjectURL(selectedImage);
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage, news]);

  ///////End Image/////////////////////////////

  const [errors, setErrors] = useState({});
  const inputsChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "title") {
      setNewsToEdit({ ...newsToEdit, title: value });
      if (!value) {
        setErrors({ ...errors, title: "يجب إدخال إسم الخدمة" });
      }
    }
    if (name === "text") {
      setNewsToEdit({ ...newsToEdit, text: value });
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

  const submitFormHandler = async (event) => {
    event.preventDefault();
    if (!newsToEdit.title) {
      setErrors({ ...errors, title: "يجب إدخال إسم الخدمة" });
      return;
    }
    if (!newsToEdit.text) {
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
      formData.append("id", newsToEdit.id);
      formData.append("title", newsToEdit.title);
      formData.append("text", newsToEdit.text);
      //const response =
      const response = await httpPUTWithFile(api.news.update_news, formData);
      const responseStatusCode = (await response).status;

      if (responseStatusCode === 401) {
        alert("Please login first");
        setIsSubmitting(false);
        dispatch("LOGOUT");
        return;
      }
      if (responseStatusCode === 400) {
        const data = await response.json();
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            alert(data[key]);
          }
        }
        setIsSubmitting(false);
        return;
      }
      if (responseStatusCode === 200) {
        const data = await response.json();
        dispatch("UPDATE_NEWS_IN_STORE", data);
        setCloseModal(true);
        setNewsToEdit({});
        setErrors({});
        //AFTER SUCCESS
        setButtonText("إضافة صورة");
        setImageUrl(null);
        setSelectedImage(null);
        setIsSubmitting(false);
        return;
      }
    }
    alert("errors exist");
    setIsSubmitting(false);
    return;
  };
  const [closeModal, setCloseModal] = useState(false);
  const resetFormClickHandler = (event) => {
    setNewsToEdit(newsModel);
  };
  useEffect(() => {
    setCloseModal(false);
    setNewsToEdit(news);
    if (news.image) {
      setImageUrl(api.base_url + news.image);
    }
  }, [closeModal, news]);

  return (
    <div>
      <button
        id="showEditNewsModelBtn"
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
                title="تعديل بيانات الخبر"
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
                        value={newsToEdit.title ?? ""}
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
                        value={newsToEdit.text ?? ""}
                      />
                      {errors.text && (
                        <span style={{ color: "red" }}>{errors.text}</span>
                      )}
                    </div>
                    <div className="mx-0 my-1">
                      <div className="my-3">
                        <label htmlFor="updateNewsImage">
                          <ButtonWithPressEffect text={buttonText} />
                        </label>
                        <input
                          onChange={imgInputChangeHandler}
                          type="file"
                          name="clinicLogoUpdate"
                          id="updateNewsImage"
                          hidden
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <NewsItemPreview
                      image={imageUrl}
                      title={newsToEdit.title}
                      text={newsToEdit.text}
                    />
                  </div>
                </div>
              )}

              <ModalFooter>
                <SubmitButton
                  title="حفظ التعديلات"
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
export default EditNewsModal;

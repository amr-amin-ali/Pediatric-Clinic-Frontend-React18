import ResetButton from "../../buttons/reset-button";
import SubmitButton from "../../buttons/submit-button";
import ModalFooter from "../../bootstrap-modal/modal-footer";
import ModalHeader from "../../bootstrap-modal/modal-header";
import TextInput from "../../inputs/text-input";
import { useEffect, useState } from "react";
import { api } from "../../../../utility/api";
import { useStore } from "../../../../hooks-store/store";
import { httpPUTWithFile } from "../../../../http/httpPUTWithFile";
import ServiceItemPreview from "./service-item-preview";
import ButtonWithPressEffect from "../../buttons/button-withPressEffect";
import TextareaInput from "../../inputs/textarea-input";
import DashboardLoader from "../../loader/dashboardLoader";
import { serviceModel } from "../../../../models/clinic-service-model";

const EditServiceModal = ({ service }) => {
  const dispatch = useStore()[1];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(service);
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
      serviceToEdit.image = URL.createObjectURL(selectedImage);
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage, service,serviceToEdit]);

  ///////End Image/////////////////////////////

  const [errors, setErrors] = useState({});
  const inputsChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "title") {
      setServiceToEdit({ ...serviceToEdit, title: value });
      if (!value) {
        setErrors({ ...errors, title: "يجب إدخال إسم الخدمة" });
      }
    }
    if (name === "text") {
      setServiceToEdit({ ...serviceToEdit, text: value });
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
    if (!serviceToEdit.title) {
      setErrors({ ...errors, title: "يجب إدخال إسم الخدمة" });
      return;
    }
    if (!serviceToEdit.text) {
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
      formData.append("id", serviceToEdit.id);
      formData.append("title", serviceToEdit.title);
      formData.append("text", serviceToEdit.text);
      //const response =
      const response = await httpPUTWithFile(
        api.clinic_services.update_service,
        formData
      );
      const responseStatusCode = (await response).status;
      if (responseStatusCode === 401) {
        alert("Please login first");
        dispatch("LOGOUT");
      } else {
        const data = await response.json();
        dispatch("UPDATE_SERVICE_IN_STORE", data);
        setCloseModal(true);
      }

      setServiceToEdit({});
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
  const [closeModal, setCloseModal] = useState(false);
  const resetFormClickHandler = (event) => {
    setServiceToEdit(serviceModel);
  };
  useEffect(() => {
    setCloseModal(false);
    setServiceToEdit(service);
    if (service.image) {
      setImageUrl(api.base_url + service.image);
    }
  }, [closeModal, service]);

  return (
    <div>
      <button
        id="showEditServiceModelBtn"
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
                    <div className="my-1">
                      <TextInput
                        onChangeHandler={inputsChangeHandler}
                        name="title"
                        placeholder="إسم الخدمة"
                        required={true}
                        value={serviceToEdit.title ?? ""}
                      />
                      {errors.title && (
                        <span style={{ color: "red" }}>{errors.title}</span>
                      )}
                    </div>
                    <div className="my-1">
                      <TextareaInput
                        name="text"
                        placeholder="وصف الخدمة"
                        onChangeHandler={inputsChangeHandler}
                        value={serviceToEdit.text ?? ""}
                      />
                      {errors.text && (
                        <span style={{ color: "red" }}>{errors.text}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12 col-lg-6">
                  <ServiceItemPreview
                    image={imageUrl}
                    title={serviceToEdit.title}
                    text={serviceToEdit.text}
                  />
                      <div className="my-3">
                        <label htmlFor="updatedServiceImage">
                          <ButtonWithPressEffect text={buttonText} />
                        <input
                          onChange={imgInputChangeHandler}
                          type="file"
                          name="clinicLogoUpdate"
                          id="updatedServiceImage"
                          hidden
                        />
                        </label>
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
export default EditServiceModal;

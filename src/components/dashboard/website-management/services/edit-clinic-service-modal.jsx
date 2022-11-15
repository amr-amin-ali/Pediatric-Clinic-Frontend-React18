import { useEffect, useState } from "react";
import { useStore } from "../../../../hooks-store/store";
import { api } from "../../../../utility/api";
import ModalLg from "../../../modal-lg/modal-lg";
import ModalLgHeader from "../../../modal-lg/modal-header";
import ButtonWithPressEffect from "../../buttons/button-withPressEffect";
import ResetButton from "../../buttons/reset-button";
import SubmmitButton from "../../buttons/submit-button";
import DashboardLoader from "../../loader/dashboardLoader";
import ModalFooter from '../../../modal-lg/modal-lg-footer';
import TextInput from "../../text-input";
import TextareaInput from "../../textarea-input";
import ServiceItemPreview from "./service-item-preview";
import { httpPUTWithFile } from "../../../../http/httpPUT";

const EditClinicServiceModal = ({ showModal, closeModal, service }) => {
  const dispatch = useStore()[1];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(service);

  /////////Image////////////////////////
  const [buttonText, setButtonText] = useState("إضافة صورة");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(api.base_url + "/" + service.image);

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
  }, [selectedImage, service]);

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
      }

      setServiceToEdit({});
      setErrors({});
      //AFTER SUCCESS
      setButtonText("إضافة صورة");
      setImageUrl(null);
      setSelectedImage(null);
      setIsSubmitting(false);
      closeModal();
      return;
    }
    alert("errors exist");
    return;
  };
  return (
    <ModalLg show={showModal} closed={closeModal}>
      <form onSubmit={(_) => _.preventDefault()}>
        <ModalLgHeader title="تعديل بيانات الخدمة" onClose={closeModal} />

        {isSubmitting && <DashboardLoader />}
        {!isSubmitting && (
          <div className="row justify-content-between m-0 px-3">
            <div className="col-6 text-warning">
              <div className="mx-0 my-1">
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
              <div className="mx-0 my-1">
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
              <div className="mx-0 my-1">
                <div className="my-3">
                  <label htmlFor="updateServiceImage">
                    <ButtonWithPressEffect text={buttonText} />
                  </label>
                  <input
                    onChange={imgInputChangeHandler}
                    type="file"
                    name="clinicLogoUpdate"
                    id="updateServiceImage"
                    hidden
                  />
                </div>
              </div>
            </div>
            <ServiceItemPreview
              image={imageUrl}
              title={serviceToEdit.title}
              text={serviceToEdit.text}
            />
          </div>
        )}

        {!isSubmitting && (
          <ModalFooter>
            <SubmmitButton
              color="green"
              title="حفظ التغييرات"
              clickHandler={submitFormHandler}
            />
            <ResetButton
              onClickHandler={() => {
                setServiceToEdit({});
                setErrors({});
                setButtonText("إضافة صورة");
                setImageUrl(null);
                setSelectedImage(null);
              }}
              title="تفريغ الحقول"
            />
          </ModalFooter>
        )}
      </form>
    </ModalLg>
  );
};

export default EditClinicServiceModal;

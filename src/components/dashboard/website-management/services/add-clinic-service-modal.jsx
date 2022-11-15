import { useEffect, useState } from "react";
import { useStore } from "../../../../hooks-store/store";
import { httpPOSTWithFile } from "../../../../http/httpPOSTWithFile";
import { serviceModel } from "../../../../models/clinic-service-model";
import { api } from "../../../../utility/api";
import ModalLg from "../../../modal-lg/modal-lg";
import ModalLgHeader from "../../../modal-lg/modal-header";
import ButtonWithPressEffect from "../../buttons/button-withPressEffect";
import ResetButton from "../../buttons/reset-button";
import SubmmitButton from "../../buttons/submit-button";
import DashboardLoader from "../../loader/dashboardLoader";
import ModalFooter from "../../../modal-lg/modal-lg-footer";
import TextInput from "../../text-input";
import TextareaInput from "../../textarea-input";
import ServiceItemPreview from "./service-item-preview";

const AddClinicServiceModal = ({ showModal, closeModal }) => {
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
      newService.image = URL.createObjectURL(selectedImage);
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  ///////End Image/////////////////////////////

  const [newService, setNewService] = useState(serviceModel);
  const [errors, setErrors] = useState({});
  const inputsChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "title") {
      setNewService({ ...newService, title: value });
      if (!value) {
        setErrors({ ...errors, title: "يجب إدخال إسم الخدمة" });
      }
    }
    if (name === "text") {
      setNewService({ ...newService, text: value });
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
    if (!newService.title) {
      setErrors({ ...errors, title: "يجب إدخال إسم الخدمة" });
      return;
    }
    if (!newService.text) {
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
      formData.append("title", newService.title);
      formData.append("text", newService.text);
      //const response =
      const response = await httpPOSTWithFile(
        api.clinic_services.add_new_service,
        formData
      );
      const responseStatusCode = (await response).status;
      if (responseStatusCode === 401) {
        alert("Please login first");
        dispatch("LOGOUT");
      } else {
        const data = await response.json();
        dispatch("ADD_SERVICE_TO_STORE", data);
      }

      setNewService({});
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
      <form onSubmit={(e) => e.preventDefault()}>
        <ModalLgHeader title="إضافة خدمة جديدة" onClose={closeModal} />

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
                  value={newService.title ?? ""}
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
                  value={newService.text ?? ""}
                />
                {errors.text && (
                  <span style={{ color: "red" }}>{errors.text}</span>
                )}
              </div>
              <div className="mx-0 my-1">
                <div className="my-3">
                  <label htmlFor="uploadServiceImage">
                    <ButtonWithPressEffect text={buttonText} />
                  </label>
                  <input
                    onChange={imgInputChangeHandler}
                    type="file"
                    name="clinicLogo"
                    id="uploadServiceImage"
                    hidden
                  />
                </div>
              </div>
            </div>
            <ServiceItemPreview
              image={imageUrl}
              title={newService.title}
              text={newService.text}
            />
          </div>
        )}

        {!isSubmitting && (
          <ModalFooter>
            <SubmmitButton
              color="green"
              title="أضف الآن"
              clickHandler={submitFormHandler}
            />
            <ResetButton
              onClickHandler={() => {
                setNewService({});
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

export default AddClinicServiceModal;

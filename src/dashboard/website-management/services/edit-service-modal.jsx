import { useEffect, useState } from "react";
import { useStore } from "../../../hooks-store/store";
import { httpPUTWithFile } from "../../../http/httpPUTWithFile";
import ServiceItemPreview from "./service-item-preview";
import { serviceModel } from "../../../models/clinic-service-model";
import { api } from "../../../utility/api";
import { closeBootstrapModal } from "../../../utility/close-bootstrap-modal";
import TextareaInput from "../../components/inputs/textarea-input";
import DashboardLoader from "../../components/loader/dashboardLoader";
import ModalFooter from "../../components/bootstrap-modal/modal-footer";
import ModalHeader from "../../components/bootstrap-modal/modal-header";
import TextInput from "../../components/inputs/text-input";

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
  }, [selectedImage, service, serviceToEdit]);

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

      httpPUTWithFile(api.clinic_services.update_service, formData)
        .then((response) => {
          if (response.status === 400) {
            response.json().then((result) => {
              for (const key in result) {
                if (result.hasOwnProperty(key)) {
                  alert(result[key]);
                }
              }
            });

            isSubmitting(false);
            closeBootstrapModal();
          }
          if (response.status === 404) {
            response.json().then((result) => alert(Object.values(result)[0]));
            isSubmitting(false);
            closeBootstrapModal();
          }
          if (response.status === 401) {
            alert("Please login first");
            dispatch("LOGOUT");
          }

          if (response.status === 200) {
            response.json().then((data) => {
              dispatch("UPDATE_SERVICE_IN_STORE", data);
              setServiceToEdit({});
              setErrors({});
              setButtonText("إضافة صورة");
              setImageUrl(null);
              setSelectedImage(null);
              setIsSubmitting(false);
              closeBootstrapModal();
            });
          } else {
            alert("Some thing went wrong!");
            setIsSubmitting(false);
          }
        })
        .catch((c) => {
          alert("Network error while publishing article!!");
          isSubmitting(false);
        });
      return;
    }
    alert("errors exist");
    return;
  };

  const resetFormClickHandler = (event) => {
    setServiceToEdit(serviceModel);
  };
  useEffect(() => {
    setServiceToEdit(service);
  }, [service]);

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
              <ModalHeader title="تعديل بيانات الخدمة" />
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
                      image={
                        imageUrl ??
                        (service.image && api.base_url + service.image)
                      }
                      title={serviceToEdit.title}
                      text={serviceToEdit.text}
                    />
                    <div className="my-3">
                      <label htmlFor="updatedServiceImage">
                      <button
                          type="button"
                          class="my-btn my-primary btn btn-primary w-100 py-3 fw-bold"
                        >
                          {buttonText}
                        </button>                        <input
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
                <button
                  onClick={submitFormHandler}
                  type="button"
                  className="my-btn my-success btn btn-success py-3 px-5 fw-bold"
                  style={{ width: "200px" }}
                >
                  حفظ التعديلات
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
export default EditServiceModal;

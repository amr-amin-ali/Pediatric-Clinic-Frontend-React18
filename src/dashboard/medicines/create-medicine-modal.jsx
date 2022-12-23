import ModalFooter from "../components/bootstrap-modal/modal-footer";
import ModalHeader from "../components/bootstrap-modal/modal-header";
import TextInput from "../components/inputs/text-input";
import TextareaInput from "../components/inputs/textarea-input";
import { useState } from "react";
import { medicineModel } from "../../models/medicine-model";
import { api } from "../../utility/api";
import { httpPOST } from "../../http/httpPOST";
import { useStore } from "../../hooks-store/store";
import { closeBootstrapModal } from "../../utility/close-bootstrap-modal";
import DashboardLoader from "../components/loader/dashboardLoader";

const CreateMedicineModal = () => {
  const dispatch = useStore()[1];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resetFormClickHandler = (event) => {
    setModel(medicineModel);
  };
  const [model, setModel] = useState(medicineModel);
  const [nameError, setNameError] = useState(null);
  const [serverErrors, setServerErrors] = useState([]);

  const inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value.trim();
    //name is required
    if (name === "name" && value.trim() === "") {
      setNameError("يجب كتبة إسم الدواء");
      return;
    }
    const oldModel = model;
    oldModel[name] = value;
    setModel({ ...oldModel });
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (nameError != null || model.name == null || model.name.length < 1) {
      alert("NAME");
      return;
    }
    //////////////////////////////////////////////////////
    setIsSubmitting(true);
    httpPOST(api.medicines.create_medicine, {
      name: model.name,
      dose: model.dose,
      ageOfUse: model.ageOfUse,
      drugSensitivity: model.drugSensitivity,
      sideEffect: model.sideEffect,
      instructionToUse: model.instructionToUse,
      activeIngreients: model.activeIngreients,
      drugInteraction: model.drugInteraction,
      precautions: model.precautions,
    })
      .then((response) => {
        if (response.status === 400) {
          response.json().then((result) => {
            console.log(result);
            const backendErrors = [];
            for (const key in result) {
              backendErrors.push(`${key}: ${result[key]}`);
            }
            setServerErrors(backendErrors);
            setIsSubmitting(false);
          });
          setIsSubmitting(false);
        }
        if (response.status === 401) {
          alert("Please login first");
          dispatch("LOGOUT");
          closeBootstrapModal();
        }
        if (response.status === 201) {
          response.json().then((data) => {
            dispatch("ADD_MEDICINES_TO_STORE", data);
            setModel(medicineModel);
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
  };
  return (
    <div>
      <div
        className="modal fade bg-blue-dark"
        data-bs-backdrop="static"
        id="createNewFileModal"
        tabIndex="-1"
        aria-labelledby="createNewFileModalLabel"
        aria-hidden="true"
      >
        {isSubmitting && <DashboardLoader text="جارى حفظ الدواء" />}
        <div className="modal-dialog modal-xl">
          <div className="modal-content bg-blue-light">
            <form>
              <ModalHeader title="تسجيل دواء جديد" />
              {serverErrors.length > 0 && (
                <div
                  className="alert alert-danger alert-dismissible fade show border-0"
                  role="alert"
                >
                  <button
                    type="button"
                    className="btn-close bg-danger"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                  <ul className="text-danger" dir="ltr">
                    {serverErrors &&
                      serverErrors.map((error) => {
                        return <li key={error}>{error}</li>;
                      })}
                  </ul>
                </div>
              )}
              {!isSubmitting && (
                <div className="row m-0 p-2">
                  <div className="col-6 my-1">
                    <TextInput
                      onChangeHandler={inputChangeHandler}
                      name="name"
                      placeholder="إسم الدواء"
                    />
                  </div>
                  <div className="col-6 my-1">
                    <TextInput
                      onChangeHandler={inputChangeHandler}
                      name="dose"
                      placeholder="الجرعة"
                    />
                  </div>
                  <div className="col-6 my-1">
                    <TextInput
                      onChangeHandler={inputChangeHandler}
                      name="ageOfUse"
                      placeholder="عمر الإستخدام"
                    />
                  </div>
                  <div className="col-6 my-1">
                    <TextInput
                      onChangeHandler={inputChangeHandler}
                      name="drugSensitivity"
                      placeholder="الحساسية"
                    />
                  </div>
                  <div className="col-6 my-1">
                    <TextInput
                      onChangeHandler={inputChangeHandler}
                      name="precautions"
                      placeholder="تحذيرات الإستعمال"
                    />
                  </div>
                  <div className="col-6 my-1">
                    <TextInput
                      onChangeHandler={inputChangeHandler}
                      name="sideEffect"
                      placeholder="الآثار الجانبية"
                    />
                  </div>
                  <div className="col-6 my-1">
                    <TextInput
                      onChangeHandler={inputChangeHandler}
                      name="drugInteraction"
                      placeholder="التفاعلات الدوائية"
                    />
                  </div>
                  <div className="col-6 my-1">
                    <TextInput
                      onChangeHandler={inputChangeHandler}
                      name="activeIngreients"
                      placeholder="المواد الفعالة"
                    />
                  </div>
                  <div className="col-12 my-1">
                    <TextareaInput
                      onChangeHandler={inputChangeHandler}
                      name="instructionToUse"
                      placeholder="تعليمات الإستعمال"
                    />
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
                  تسجيل
                </button>
                <button
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
export default CreateMedicineModal;

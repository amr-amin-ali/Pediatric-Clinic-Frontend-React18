import ModalFooter from "../components/bootstrap-modal/modal-footer";
import ModalHeader from "../components/bootstrap-modal/modal-header";
import TextInput from "../components/inputs/text-input";
import TextareaInput from "../components/inputs/textarea-input";
import { useState } from "react";
import { medicineModel } from "../../models/medicine-model";
import { api } from "../../utility/api";
import { useStore } from "../../hooks-store/store";
import { closeBootstrapModal } from "../../utility/close-bootstrap-modal";
import DashboardLoader from "../components/loader/dashboardLoader";
import { httpPUT } from "../../http/httpPUT";

const EditMedicineModal = ({ medicineData, modalId }) => {
  const dispatch = useStore()[1];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resetFormClickHandler = (event) => {
    setModel(medicineModel);
  };
  const [model, setModel] = useState(medicineData);
  const [nameError, setNameError] = useState(null);
  const inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value.trim();
    //name is required
    if (name === "name" && value.trim() === "") {
      setNameError("يجب كتبة إسم الدواء");
      // return;
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
    httpPUT(api.medicines.update_medicine, {
      id: model.id,
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
        if (response.status === 400 || response.status === 422 || response.status === 404) {
          response.json().then((result) => alert(Object.values(result)[0]));
          setIsSubmitting(false);
        }
        if (response.status === 401) {
          alert("Please login first");
          dispatch("LOGOUT");
          closeBootstrapModal();
        }
        if (response.status === 200) {
          response.json().then((data) => {
            dispatch("UPDATE_MEDICINES_IN_STORE", data);
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
        id={modalId}
        tabIndex="-1"
        aria-labelledby="createNewFileModalLabel"
        aria-hidden="true"
      >
        {isSubmitting && <DashboardLoader text="جارى حفظ التعديلات" />}

        <div className="modal-dialog modal-xl">
          <div className="modal-content bg-blue-light">
            <form>
              <ModalHeader title={`تعديل بيانات ${medicineData.name}`} />
              {!isSubmitting && (
                <div className="row m-0 p-2">
                  <div className="col-6 my-1">
                    <TextInput
                      onChangeHandler={inputChangeHandler}
                      value={model.name ?? ""}
                      name="name"
                      placeholder="إسم الدواء"
                    />
                  </div>
                  <div className="col-6 my-1">
                    <TextInput
                      onChangeHandler={inputChangeHandler}
                      value={model.dose?? ""}
                      name="dose"
                      placeholder="الجرعة"
                    />
                  </div>
                  <div className="col-6 my-1">
                    <TextInput
                      onChangeHandler={inputChangeHandler}
                      value={model.ageOfUse?? ""}
                      name="ageOfUse"
                      placeholder="عمر الإستخدام"
                    />
                  </div>
                  <div className="col-6 my-1">
                    <TextInput
                      onChangeHandler={inputChangeHandler}
                      value={model.drugSensitivity?? ""}
                      name="drugSensitivity"
                      placeholder="الحساسية"
                    />
                  </div>
                  <div className="col-6 my-1">
                    <TextInput
                      onChangeHandler={inputChangeHandler}
                      value={model.precautions?? ""}
                      name="precautions"
                      placeholder="تحذيرات الإستعمال"
                    />
                  </div>
                  <div className="col-6 my-1">
                    <TextInput
                      onChangeHandler={inputChangeHandler}
                      value={model.sideEffect?? ""}
                      name="sideEffect"
                      placeholder="الآثار الجانبية"
                    />
                  </div>
                  <div className="col-6 my-1">
                    <TextInput
                      onChangeHandler={inputChangeHandler}
                      value={model.drugInteraction?? ""}
                      name="drugInteraction"
                      placeholder="التفاعلات الدوائية"
                    />
                  </div>
                  <div className="col-6 my-1">
                    <TextInput
                      onChangeHandler={inputChangeHandler}
                      value={model.activeIngreients?? ""}
                      name="activeIngreients"
                      placeholder="المواد الفعالة"
                    />
                  </div>
                  <div className="col-12 my-1">
                    <TextareaInput
                      onChangeHandler={inputChangeHandler}
                      value={model.instructionToUse?? ""}
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
                  style={{ width: "200px" }}
                >
                  حفظ التعديلات
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
export default EditMedicineModal;

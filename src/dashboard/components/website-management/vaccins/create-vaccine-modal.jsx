import ResetButton from "../../buttons/reset-button";
import SubmitButton from "../../buttons/submit-button";
import ModalFooter from "../../bootstrap-modal/modal-footer";
import ModalHeader from "../../bootstrap-modal/modal-header";
import TextInput from "../../inputs/text-input";
import DashboardLoader from "../../loader/dashboardLoader";
import { useEffect, useState } from "react";
import { vaccinModel } from "../../../../models/vaccin-model";
import { api } from "../../../../utility/api";
import { httpPOST } from "../../../../http/httpPOST";
import { useStore } from "../../../../hooks-store/store";

const CreateVaccineModal = () => {
  const  dispatch = useStore()[1];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const resetFormClickHandler = (event) => {
    setModel(vaccinModel);
  };
  /////////////////////////////////////////////////////////////////////
  const [model, setModel] = useState(vaccinModel);
  const [errors, setErrors] = useState({});

  const inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "name") {
      if (!value.trim()) {
        setErrors({ ...errors, name: "أدخل إسم اللقاح." });
      } else {
        setModel({ ...model, name: value });
      }
    }

    if (name === "age") {
      if (!value.trim()) {
        setErrors({ ...errors, age: "أدخل العمر المناسب." });
      } else {
        setModel({ ...model, age: value });
      }
    }

    if (name === "description") {
      if (!value.trim()) {
        setErrors({ ...errors, description: "أدخل وصف اللقاح." });
      } else {
        setModel({ ...model, description: value });
      }
    }

    if (name === "dates") {
      if (!value.trim()) {
        setErrors({ ...errors, dates: "أدخل مواعيد الذهاب للتلقيح." });
      } else {
        setModel({ ...model, dates: value });
      }
    }

    if (value) {
      const ers = { ...errors };
      delete ers[name];
      setErrors({ ...ers });
    }
  };

  /////////////////////////////////////////////////////////////////////
  const [closeModal, setCloseModal] = useState(false);
  const submitFormHandler = async (event) => {
    event.preventDefault();
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    if (!model.name) {
      setErrors({ ...errors, name: "أدخل إسم اللقاح." });
      return;
    }
    if (!model.age) {
      setErrors({ ...errors, age: "أدخل العمر المناسب." });
      return;
    }

    if (!model.dates) {
      setErrors({ ...errors, dates: "أدخل مواعيد الذهاب للتلقيح." });
      return;
    }

    if (!model.description) {
      setErrors({ ...errors, description: "أدخل وصف اللقاح." });
      return;
    }

    if (errors && Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      const response = await httpPOST(api.vaccins.add_new_vaccin, {
        name: model.name,
        age: model.age,
        description: model.description,
        dates: model.dates,
      });
      if (response.status === 201) {
        const result = await response.json();
        dispatch("ADD_VACCINS_TO_STORE", result);
        setModel(vaccinModel);
        setCloseModal(true);
      } else {
        alert(`server response not ok: ${response.status}`);
      }
      setIsSubmitting(false);
    }
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
        id="createNewFileModal"
        tabIndex="-1"
        aria-labelledby="createNewFileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content bg-blue-light">
            <form>
              <ModalHeader
                clickCloseButton={closeModal}
                title="إضافة لقاح جديد"
              />
              {isSubmitting && <DashboardLoader />}
              {!isSubmitting && (
                <div className="row m-0 p-2">
                  <div className="col-sm-12 col-lg-6 my-1">
                    <TextInput
                      onChangeHandler={inputChangeHandler}
                      name="name"
                      value={model.name ?? ""}
                      placeholder="إسم اللقاح"
                    />
                    {errors.name && (
                      <span style={{ color: "red" }}>{errors.name}</span>
                    )}
                  </div>
                  <div className="col-sm-12 col-lg-6 my-1">
                    <TextInput
                      onChangeHandler={inputChangeHandler}
                      name="age"
                      value={model.age ?? ""}
                      placeholder="العمر"
                    />
                    {errors.age && (
                      <span style={{ color: "red" }}>{errors.age}</span>
                    )}
                  </div>
                  <div className="col-12 my-1">
                    <TextInput
                      onChangeHandler={inputChangeHandler}
                      name="dates"
                      value={model.dates ?? ""}
                      placeholder="المواعيد"
                    />
                    {errors.dates && (
                      <span style={{ color: "red" }}>{errors.dates}</span>
                    )}
                  </div>
                  <div className="col-12 my-1">
                    <TextInput
                      onChangeHandler={inputChangeHandler}
                      name="description"
                      value={model.description ?? ""}
                      placeholder="الوصف"
                    />
                    {errors.description && (
                      <span style={{ color: "red" }}>{errors.description}</span>
                    )}
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
export default CreateVaccineModal;

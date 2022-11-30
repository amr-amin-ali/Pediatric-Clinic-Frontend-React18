import ResetButton from "../../../components/buttons/reset-button";
import SubmitButton from "../../../components/buttons/submit-button";
import ModalFooter from "../../../components/bootstrap-modal/modal-footer";
import ModalHeader from "../../../components/bootstrap-modal/modal-header";
import DashboardLoader from "../../../components/loader/dashboardLoader";
import TextInput from "../../../components/inputs/text-input";
import { useEffect, useState } from "react";
import { vaccinModel } from "../../../../models/vaccin-model";
import { api } from "../../../../utility/api";
import { httpPUT } from "../../../../http/httpPUT";
import { useStore } from "../../../../hooks-store/store";
import { closeBootstrapModal } from "../../../../utility/close-bootstrap-modal";

const EditVaccineModal = ({ vaccin }) => {
  const dispatch = useStore()[1];

  const [model, setModel] = useState(vaccin);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resetFormClickHandler = (event) => {
    setModel(vaccinModel);
  };
  const [errors, setErrors] = useState({});

  const inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "name") {
      setModel({ ...model, name: value });
      if (!value.trim()) {
        setErrors({ ...errors, name: "أدخل إسم اللقاح." });
      }
    }

    if (name === "age") {
      setModel({ ...model, age: value });
      if (!value.trim()) {
        setErrors({ ...errors, age: "أدخل العمر المناسب." });
      }
    }

    if (name === "description") {
      setModel({ ...model, description: value });
      if (!value.trim()) {
        setErrors({ ...errors, description: "أدخل وصف اللقاح." });
      }
    }

    if (name === "dates") {
      setModel({ ...model, dates: value });
      if (!value.trim()) {
        setErrors({ ...errors, dates: "أدخل مواعيد الذهاب للتلقيح." });
      }
    }

    if (value) {
      const ers = { ...errors };
      delete ers[name];
      setErrors({ ...ers });
    }
  };

  /////////////////////////////////////////////////////////////////////
  const submitFormHandler = async (event) => {
    event.preventDefault();

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
      const response = await httpPUT(api.vaccins.update_vaccin, {
        id: model.id,
        name: model.name,
        age: model.age,
        description: model.description,
        dates: model.dates,
      })
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
              dispatch("UPDATE_VACCINS_IN_STORE", data);
              setModel(vaccinModel);
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
    }
    return;
  };
  useEffect(() => {
    setModel(vaccin);
  }, [vaccin]);

  return (
    <div>
      <button
        id="showWditVaccinModelBtn"
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
              <ModalHeader title="تعديل بيانات اللقاح" />
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
export default EditVaccineModal;
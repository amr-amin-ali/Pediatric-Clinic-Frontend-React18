import { useState } from "react";
import { useEffect } from "react";
import { useStore } from "../../../hooks-store/store";
import { httpGET } from "../../../http/httpGET";
import { httpPOST } from "../../../http/httpPOST";
import { api } from "../../../utility/api";
// import SubmitButton from "../../components/buttons/submit-button";
import SelectInput from "../../components/inputs/select-input";
import TextInput from "../../components/inputs/text-input";
import TextareaInput from "../../components/inputs/textarea-input";
import DashboardLoader from "../../components/loader/dashboardLoader";

const AddTreatmentForm = ({ visitId, treatmentsListHandler }) => {
  const [state, dispatch] = useStore();
  const [isLoadingMedicines, setIsLoadingMedicines] = useState(false);
  const [isAddingNewMedicine, setIsAddingNewMedicine] = useState(false);
  const [isSavingTreatment, setIsSavingTreatment] = useState(false);
  const [medicinesForSelectlist, setMedicinesForSelectlist] = useState([]);
  const [serverErrors, setServerErrors] = useState([]);

  const [treatmentDetails, setTreatmentDetails] = useState({
    visitId: visitId,
    saveDescriptionToMedicine: false,
  });
  // console.log(treatmentDetails);
  const inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value.trim();
    const oldDetails = treatmentDetails;
    oldDetails[name] = value;
    //Add Medicine name
    if (name === "medicineId") {
      oldDetails.medicineName = medicinesForSelectlist.find(
        (med) => med.value.toString() === value.toString()
      ).text;
    }
    //Delete medicine id and name if newMedicineNameToAdd is added
    if (name === "newMedicineNameToAdd") {
      oldDetails.medicineId = 0;
      oldDetails.medicineName = value;
    }
    setTreatmentDetails({ ...oldDetails });
  };

  useEffect(() => {
    //Initialt medicines if not
    if (!state.medicines_store.isInitiated) {
      setIsLoadingMedicines(true);
      httpGET(api.medicines.get_all_medicines)
        .then((response) => {
          if (response.status === 401) {
            alert("Please login first");
            dispatch("LOGOUT");
          }
          if (response.status === 200) {
            response.json().then((data) => {
              if (data.length !== 0) dispatch("INITIATE_MEDICINES", data);

              setMedicinesForSelectlist(
                data.map((medicine) => {
                  return { text: medicine.name, value: medicine.id };
                })
              );
            });
          }
          setIsLoadingMedicines(false);
        })
        .catch((c) => {
          alert("Network error while fetching medicines from server!!");
          setIsLoadingMedicines(false);
        });
    }
    setMedicinesForSelectlist(
      state.medicines_store.medicines.map((medicine) => {
        return { text: medicine.name, value: medicine.id };
      })
    );
  }, []);
  const submitHandler = (event) => {
    event.preventDefault();

    //treatment name is required
    if (!treatmentDetails.medicineName) {
      alert("يجب إختيار أو كتابة الدواء");
      return;
    }

    //Add new medicine if exist
    if (
      treatmentDetails.medicineId < 1 &&
      treatmentDetails.newMedicineNameToAdd
    ) {
      //Add medicine
      setIsAddingNewMedicine(true);
      httpPOST(api.medicines.create_medicine, {
        name: treatmentDetails.medicineName,
      })
        .then((response) => {
          if (response.status === 400 || response.status === 422) {
            response.json().then((result) => {
              console.log(result);
              const backendErrors = [];
              for (const key in result) {
                backendErrors.push(`${key}: ${result[key]}`);
              }
              setServerErrors(backendErrors);
              setIsAddingNewMedicine(false);
            });
          }
          if (response.status === 401) {
            alert("Please login first");
            dispatch("LOGOUT");
          }

          if (response.status === 201) {
            response.json().then((data) => {
              dispatch("ADD_MEDICINES_TO_STORE", data);
              setMedicinesForSelectlist([
                ...medicinesForSelectlist,
                { text: data.name, value: data.id },
              ]);
              setIsAddingNewMedicine(false);
              //////////////////////////////////////////////////////////////////////////////////
              //Now  start adding treatment
              setIsSavingTreatment(true);
              httpPOST(api.treatments.create_treatment, {
                ...treatmentDetails,
                medicineId: data.id,
              })
                .then((response) => {
                  if (response.status === 400 || response.status === 422) {
                    response.json().then((result) => {
                      console.log(result);
                      const backendErrors = [];
                      for (const key in result) {
                        backendErrors.push(`${key}: ${result[key]}`);
                      }
                      setServerErrors(backendErrors);
                      setIsSavingTreatment(false);
                    });
                  }
                  if (response.status === 401) {
                    alert("Please login first");
                    dispatch("LOGOUT");
                  }

                  if (response.status === 201) {
                    response.json().then((data) => {
                      treatmentsListHandler(data);
                      setTreatmentDetails({
                        visitId: visitId,
                        saveDescriptionToMedicine: false,
                      });
                      setIsSavingTreatment(false);
                    });
                  }
                })
                .catch((c) => {
                  alert("Network error while adding treatment!!");
                  setIsSavingTreatment(false);
                });
              //////////////////////////////////////////////////////////////////////////////////
            });
          }
        })
        .catch((c) => {
          alert("Network error while adding medicine!!");
          setIsAddingNewMedicine(false);
        });
    } else {
      //Add treatment
      setIsSavingTreatment(true);
      setIsSavingTreatment(true);
      httpPOST(api.treatments.create_treatment, {
        ...treatmentDetails,
      })
        .then((response) => {
          if (response.status === 400 || response.status === 422) {
            response.json().then((result) => {
              console.log(result);
              const backendErrors = [];
              for (const key in result) {
                backendErrors.push(`${key}: ${result[key]}`);
              }
              setServerErrors(backendErrors);
              setIsSavingTreatment(false);
            });
          }
          if (response.status === 401) {
            alert("Please login first");
            dispatch("LOGOUT");
          }

          if (response.status === 201) {
            response.json().then((data) => {
              treatmentsListHandler(data);
              setTreatmentDetails({
                visitId: visitId,
                saveDescriptionToMedicine: false,
              });
              setIsSavingTreatment(false);
            });
          }
        })
        .catch((c) => {
          alert("Network error while adding treatment!!");
          setIsSavingTreatment(false);
        });
    }
  };
  return (
    <div
      style={{ backgroundColor: "var(--blue-light)" }}
      className={`rounded-start d-flex flex-column p-2 my-1`}
    >
      {isLoadingMedicines && <DashboardLoader text="تحميل الأدوية" />}
      {isAddingNewMedicine && (
        <DashboardLoader text="تتم  إضافة الدواء الجديد" />
      )}
      {isSavingTreatment && <DashboardLoader text="جارى إضافة العلاج" />}
      {!isLoadingMedicines && !isSavingTreatment && (
        <form onSubmit={(_) => _.preventDefault()}>
          <h1 className="flex-fill text-center text-white">العلاج</h1>
          {/* Server errors */}
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
          {/* // Server errors */}
          <div className="flex-fill">
            <SelectInput
              selectedValue={treatmentDetails.medicineId ?? ""}
              onChangeHandler={inputChangeHandler}
              name="medicineId"
              title="الدواء"
              items={medicinesForSelectlist}
            />
          </div>
          <div className="flex-fill mt-1">
            <TextInput
              onChangeHandler={inputChangeHandler}
              name="newMedicineNameToAdd"
              placeholder="أضف علاج ليس بالقائمة"
            />
          </div>
          <div className="flex-fill mt-1">
            <TextareaInput
              onChangeHandler={inputChangeHandler}
              placeholder="طريقة الإستعمال"
              name="description"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              onChange={(_) =>
                setTreatmentDetails({
                  ...treatmentDetails,
                  saveDescriptionToMedicine:
                    !treatmentDetails.saveDescriptionToMedicine,
                })
              }
              value={treatmentDetails.saveDescriptionToMedicine}
              name="saveDescriptionToMedicine"
              type="checkbox"
              className="form-check-input bg-success border-blue-dark shadow-none"
              id="addNewMedicineCheckbox"
            />
            <label
              className="form-check-label text-info"
              htmlFor="addNewMedicineCheckbox"
            >
              أضف هذا الوصف للدواء
            </label>
          </div>

          <div className="flex-fill mt-1">
            <button
              onClick={submitHandler}
              type="button"
              className="my-btn my-primary btn btn-primary w-100 py-3 fw-bold"
            >
              إكتب للروشتة
            </button>

            {/* <SubmitButton
              clickHandler={submitHandler}
              width={"100%"}
              color="blue"
              title="إكتب للروشتة"
            /> */}
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTreatmentForm;

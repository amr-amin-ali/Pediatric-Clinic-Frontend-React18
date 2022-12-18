import DateTimeInput from "../../components/inputs/date-time-input";
import ModalFooter from "../../components/bootstrap-modal/modal-footer";
import ModalHeader from "../../components/bootstrap-modal/modal-header";
import NumberInput from "../../components/inputs/number-input";
import RadioInput from "../../components/inputs/radio-input";
import SelectInput from "../../components/inputs/select-input";
import TextInput from "../../components/inputs/text-input";
import TextareaInput from "../../components/inputs/textarea-input";
import { api } from "../../../utility/api";
import { useState } from "react";
import { validateName } from "../../../utility/create-file-validators";
import { validateEmail } from "../../../utility/validate-email";
import { closeBootstrapModal } from "../../../utility/close-bootstrap-modal";
import DashboardLoader from "../../components/loader/dashboardLoader";
import { governorates } from "../../../models/governorates-list";
import { httpPUT } from "../../../http/httpPUT";
import { useStore } from "../../../hooks-store/store";

const EditFileModal = ({ fileData, modalId }) => {
  const dispatch = useStore()[1];

  const [file, setFile] = useState(fileData);
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    const isNotValid = validateName(value);
    if (isNotValid) {
      if (name === "firstName") setErrors({ ...errors, firstName: isNotValid });
      if (name === "middleName")
        setErrors({ ...errors, middleName: isNotValid });
      if (name === "lastName") setErrors({ ...errors, lastName: isNotValid });
    } else {
      const formErrors = { ...errors };
      delete formErrors[name];
      setErrors(formErrors);
    }
    if (name === "firstName") setFile({ ...file, firstName: value });
    if (name === "middleName") setFile({ ...file, middleName: value });
    if (name === "lastName") setFile({ ...file, lastName: value });
  };

  const emailChangeHandler = (event) => {
    const value = event.target.value;
    const isValid = validateEmail(value);
    if (!isValid) {
      setErrors({ ...errors, email: "أدخل إيميل صالح" });
    }
    if (value.length < 12) {
      setErrors({ ...errors, email: "عدد الأحرف أقل من 12" });
    } else {
      const formErrors = { ...errors };
      delete formErrors.email;
      setErrors(formErrors);
    }
    setFile({ ...file, email: value });
  };
  const passwordChangeHandler = (event) => {
    const enteredPassword = event.target.value;
    //Password is empty, false, 0
    if (!enteredPassword) {
      setErrors({ ...errors, password: "كلمة المرور مطلوبة" });
      return;
    }
    if (enteredPassword.length < 8) {
      setErrors({
        ...errors,
        password: "يجب ألا تقل عن 8 أحرف",
      });
      return;
    }
    // eslint-disable-next-line
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let hasLowerCaseChar = false;
    let hasUpperCaseChar = false;
    let hasNumber = false;
    if (enteredPassword.length >= 8) {
      for (const character of enteredPassword) {
        // is number
        if (!isNaN(character * 1)) {
          hasNumber = true;
        }
        if (isNaN(character * 1)) {
          //is UPPER CASE
          if (
            character === character.toUpperCase() &&
            character.toLowerCase() !== character
          ) {
            hasUpperCaseChar = true;
          }
          //is lower case
          if (character === character.toLowerCase()) {
            hasLowerCaseChar = true;
          }
        }
      }
      if (!format.test(enteredPassword)) {
        setErrors({
          ...errors,
          password: "يجب أن تحتوى على أحرف خاصة",
        });
        return;
      }
      if (!hasUpperCaseChar) {
        setErrors({
          ...errors,
          password: "يجب أن تحتوى على حرف كابيتال",
        });
        return;
      }
      if (!hasLowerCaseChar) {
        setErrors({
          ...errors,
          password: "يجب أن تحتوى على حرف صغير",
        });
        return;
      }
      if (!hasNumber) {
        setErrors({
          ...errors,
          password: "يجب أن تحتوى على أرقام",
        });
        return;
      }
    }

    const formErrors = { ...errors };
    delete formErrors.password;
    setErrors(formErrors);
    setFile({ ...file, password: enteredPassword });
  };

  const causeOfNicuAdmissionChangeHandler = (event) => {
    setFile({ ...file, causeOfNicuAdmission: event.target.value.trim() });
  };
  const labourProblemsChangeHandler = (event) => {
    setFile({ ...file, labourProblems: event.target.value.trim() });
  };
  const requiredOnlyInputChangeHandler = (event) => {
    const value = event.target.value.trim();
    const name = event.target.name.trim();
    if (!event.target.value.trim()) {
      if (name === "birthWeight")
        setErrors({ ...errors, birthWeight: "هذا الحقل إجبارى" });
      if (name === "pastHistoryOfDisease")
        setErrors({ ...errors, pastHistoryOfDisease: "هذا الحقل إجبارى" });
      if (name === "pastHistoryOfOperation")
        setErrors({ ...errors, pastHistoryOfOperation: "هذا الحقل إجبارى" });
    } else {
      const formErrors = { ...errors };
      delete formErrors[name];
      setErrors(formErrors);
    }
    if (name === "birthWeight") setFile({ ...file, birthWeight: value });
    if (name === "pastHistoryOfDisease")
      setFile({ ...file, pastHistoryOfDisease: value });
    if (name === "pastHistoryOfOperation")
      setFile({ ...file, pastHistoryOfOperation: value });
  };

  const headCircumferanceChangeHandler = (event) => {
    setFile({ ...file, headCircumferance: event.target.value.trim() });
  };
  const congenitalAnomaliesChangeHandler = (event) => {
    setFile({ ...file, congenitalAnomalies: event.target.value.trim() });
  };
  const radioOnChangeHandler = (event) => {
    setFile({ ...file, gender: event.target.value });
  };
  const notesChangeHandler = (event) => {
    setFile({ ...file, notes: event.target.value.trim() });
  };
  const birthDateChangeHandler = (event) => {
    setFile({ ...file, birthDate: new Date(event.target.value) });
    const formErrors = { ...errors };
    delete formErrors[event.target.name];
    setErrors(formErrors);
  };
  const phoneNumberChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if (name === "phoneNumber") {
      if (value.length === 11) {
        setFile({ ...file, phoneNumber: value });
      } else {
        setErrors({ ...errors, phoneNumber: "يجب أن يكون 11 رقم" });
      }
    }
    if (name === "phoneNumber1") {
      if (value.length === 11) {
        setFile({ ...file, phoneNumber1: value });
      } else {
        setErrors({ ...errors, phoneNumber1: "يجب أن يكون 11 رقم" });
      }
    }
    if (value.length === 11) {
      const formErrors = { ...errors };
      delete formErrors[name];
      setErrors(formErrors);
    }
  };
  const addressChangeHandler = (event) => {
    const value = event.target.value.trim();
    const name = event.target.name.trim();
    if (name === "governorate") setFile({ ...file, governorate: value });
    if (name === "city") setFile({ ...file, city: value });
    if (name === "village") setFile({ ...file, village: value });
    if (name === "street") setFile({ ...file, street: value });
  };
  const validateFileForSubmission = (file) => {
    if (!file.firstName) {
      setErrors({ ...errors, firstName: "الإسم الأول مطلوب" });
      return false;
    }
    if (!file.middleName) {
      setErrors({ ...errors, middleName: "الإسم الأوسط مطلوب" });
      return false;
    }
    if (!file.lastName) {
      setErrors({ ...errors, lastName: "الإسم الأخير مطلوب" });
      return false;
    }
    if (!file.birthDate) {
      setErrors({ ...errors, birthDate: "تاريخ الميلاد مطلوب" });
      return false;
    }
    if (!file.email) {
      setErrors({ ...errors, email: "الإيميل مطلوب" });
      return false;
    }
    if (!file.password) {
      setErrors({ ...errors, password: "كلمة المرور مطلوبة" });
      return false;
    }
    if (!file.birthWeight) {
      setErrors({ ...errors, birthWeight: "وزن الولادة مطلوب" });
      return false;
    }
    if (!file.gender) {
      setErrors({ ...errors, gender: "النوع مطلوب" });
      return false;
    }
    if (!file.pastHistoryOfDisease) {
      setErrors({ ...errors, pastHistoryOfDisease: "التاريخ المرضى مطلوب" });
      return false;
    }
    if (!file.pastHistoryOfOperation) {
      setErrors({ ...errors, pastHistoryOfOperation: "التاريخ الجراحى مطلوب" });
      return false;
    }
    return true;
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    if (!validateFileForSubmission(file)) {
      return;
    }
    setIsSubmitting(true);
    httpPUT(api.account.update_account, file)
      .then((response) => {
        if (response.status === 400) {
          response.json().then((result) => {
            const backendErrors = [];
            for (const key in result) {
              if (key.includes("DuplicateUserName")) {
                setErrors({
                  ...errors,
                  email: "البريد الإلكترونى مستخدم بالفعل",
                });
              } else {
                backendErrors.push(`${key}: ${result[key]}`);
              }
            }
            setServerErrors(backendErrors);
            setIsSubmitting(false);
          });
        }
        if (response.status === 404) {
          response.json().then((result) => alert(Object.values(result)[0]));
          setIsSubmitting(false);
        }
        if (response.status === 401) {
          alert("Please login first");
          dispatch("LOGOUT");
        }

        if (response.status === 200) {
          response.json().then((data) => {
            dispatch("UPDATE_FILE_IN_STORE", data);
            setFile(file);
            setErrors({});
            alert("تم تعديل الملف");
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
        setIsSubmitting(false);
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
        <div className="modal-dialog modal-xl">
          <div className="modal-content bg-blue-light">
            <form>
              <ModalHeader
                title={`تعديل  ملف ${file.firstName} ${file.middleName} ${file.firstName}`}
              />
              <div style={{ textAlign: "center" }}>
                <span style={{ color: "red", backgroundColor: "black" }}>
                  {serverErrors &&
                    serverErrors.map((error) => {
                      return error;
                    })}
                </span>
              </div>
              {isSubmitting && <DashboardLoader text="جارى التعديل" />}
              {!isSubmitting && (
                <div className="row m-0 p-2">
                  <div className="col-sm-12 col-lg-4 my-1 px-1">
                    <TextInput
                      placeholder="الإسم الأول"
                      onChangeHandler={nameChangeHandler}
                      value={file.firstName ?? ""}
                      name="firstName"
                    />
                    {errors.firstName && (
                      <span style={{ color: "red" }}>{errors.firstName}</span>
                    )}
                  </div>
                  <div className="col-sm-12 col-lg-4  my-1 px-1">
                    <TextInput
                      placeholder="الإسم الأوسط"
                      onChangeHandler={nameChangeHandler}
                      value={file.middleName ?? ""}
                      name="middleName"
                    />
                    {errors.middleName && (
                      <span style={{ color: "red" }}>{errors.middleName}</span>
                    )}
                  </div>
                  <div className="col-sm-12 col-lg-4   my-1 px-1">
                    <TextInput
                      placeholder="الإسم الأخير"
                      onChangeHandler={nameChangeHandler}
                      value={file.lastName ?? ""}
                      name="lastName"
                    />
                    {errors.lastName && (
                      <span style={{ color: "red" }}>{errors.lastName}</span>
                    )}
                  </div>
                  <div className="col-sm-12 col-lg-4   my-1 px-1">
                    <TextInput
                      placeholder="سبب دخول الحضانة"
                      onChangeHandler={causeOfNicuAdmissionChangeHandler}
                      value={file.causeOfNicuAdmission ?? ""}
                      name="causeOfNicuAdmission"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-4   my-1 px-1">
                    <TextInput
                      placeholder="مشاكل الولادة"
                      onChangeHandler={labourProblemsChangeHandler}
                      value={file.labourProblems ?? ""}
                      name="labourProblems"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-4   my-1 px-1">
                  <DateTimeInput
                        type="date"
                      onChangeHandler={birthDateChangeHandler}
                      title="تاريخ الميلاد"
                      name="birthDate"
                    />
                    {errors.birthDate && (
                      <span style={{ color: "red" }}>{errors.birthDate}</span>
                    )}
                  </div>

                  <div className="col-sm-12 col-lg-3 my-1 px-1">
                    <SelectInput
                      selectedValue={file.governorate ?? ""}
                      onChangeHandler={addressChangeHandler}
                      items={governorates}
                      name="governorate"
                      title="المحافظة"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-3 my-1 px-1">
                    <TextInput
                      onChangeHandler={addressChangeHandler}
                      value={file.city ?? ""}
                      name="city"
                      placeholder="المدينة"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-3 my-1 px-1">
                    <TextInput
                      onChangeHandler={addressChangeHandler}
                      value={file.village ?? ""}
                      name="village"
                      placeholder="القرية"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-3 my-1 px-1">
                    <TextInput
                      onChangeHandler={addressChangeHandler}
                      value={file.street ?? ""}
                      name="street"
                      placeholder="الشارع"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-3 my-1 px-1">
                    <NumberInput
                      onChangeHandler={phoneNumberChangeHandler}
                      value={file.phoneNumber ?? ""}
                      name="phoneNumber"
                      placeholder="موبايل 1"
                    />
                    {errors.phoneNumber && (
                      <span style={{ color: "red" }}>{errors.phoneNumber}</span>
                    )}
                  </div>
                  <div className="col-sm-12 col-lg-3 my-1 px-1">
                    <NumberInput
                      onChangeHandler={phoneNumberChangeHandler}
                      value={file.phoneNumber1 ?? ""}
                      name="phoneNumber1"
                      placeholder="موبايل 2"
                    />
                    {errors.phoneNumber1 && (
                      <span style={{ color: "red" }}>
                        {errors.phoneNumber1 ?? ""}
                      </span>
                    )}
                  </div>
                  <div className="col-sm-12 col-lg-3 my-1 px-1">
                    <TextInput
                      placeholder="الإيميل"
                      onChangeHandler={emailChangeHandler}
                      value={file.email ?? ""}
                      name="email"
                    />
                    {errors.email && (
                      <span style={{ color: "red" }}>{errors.email}</span>
                    )}
                  </div>
                  <div className="col-sm-12 col-lg-3 my-1 px-1">
                    <TextInput
                      placeholder="كلمة المرور"
                      onChangeHandler={passwordChangeHandler}
                      value={file.password ?? ""}
                      name="password"
                    />
                    {errors.password && (
                      <span style={{ color: "red" }}>{errors.password}</span>
                    )}
                  </div>
                  <div className="col-sm-12 col-lg-3 my-1 px-1">
                    <NumberInput
                      placeholder="وزن الولادة"
                      onChangeHandler={requiredOnlyInputChangeHandler}
                      value={file.birthWeight ?? ""}
                      name="birthWeight"
                    />
                    {errors.birthWeight && (
                      <span style={{ color: "red" }}>{errors.birthWeight}</span>
                    )}
                  </div>
                  <div className="col-sm-12 col-lg-3 my-1 px-1">
                    <NumberInput
                      placeholder="محيط الرأس عند الولادة"
                      onChangeHandler={headCircumferanceChangeHandler}
                      value={file.headCircumferance ?? ""}
                      name="headCircumferance"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-3 my-1 px-1">
                    <TextInput
                      placeholder="العيوب الخلقية"
                      onChangeHandler={congenitalAnomaliesChangeHandler}
                      value={file.congenitalAnomalies ?? ""}
                      name="congenitalAnomalies"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-3 my-1 px-1">
                    <div className="row m-0">
                      <div className="col-6 p-0 pe-1">
                        <RadioInput
                          onChangeHandler={radioOnChangeHandler}
                          title="ذكر"
                          name="Gender"
                          value="male"
                          checked={file.gender === "male"}
                        />
                      </div>
                      <div className="col-6 p-0 ps-1">
                        <RadioInput
                          onChangeHandler={radioOnChangeHandler}
                          title="أنثى"
                          name="Gender"
                          value="female"
                          checked={file.gender === "female"}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-12 col-lg-4   px-1">
                    <TextareaInput
                      placeholder="التاريخ المرضى"
                      onChangeHandler={requiredOnlyInputChangeHandler}
                      value={file.pastHistoryOfDisease ?? ""}
                      name="pastHistoryOfDisease"
                    />
                    {errors.pastHistoryOfDisease && (
                      <span style={{ color: "red" }}>
                        {errors.pastHistoryOfDisease}
                      </span>
                    )}
                  </div>
                  <div className="col-sm-12 col-lg-4   px-0">
                    <TextareaInput
                      placeholder="التاريخ الجراحى"
                      onChangeHandler={requiredOnlyInputChangeHandler}
                      value={file.pastHistoryOfOperation ?? ""}
                      name="pastHistoryOfOperation"
                    />
                    {errors.pastHistoryOfOperation && (
                      <span style={{ color: "red" }}>
                        {errors.pastHistoryOfOperation}
                      </span>
                    )}
                  </div>
                  <div className="col-sm-12 col-lg-4   px-1">
                    <TextareaInput
                      placeholder="ملاحظات"
                      onChangeHandler={notesChangeHandler}
                      value={file.notes ?? ""}
                      name="notes"
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
                  أنشئ الآن
                </button>
                <button
                  onClick={() => {
                    setFile(fileData);
                    setErrors({});
                  }}
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
export default EditFileModal;

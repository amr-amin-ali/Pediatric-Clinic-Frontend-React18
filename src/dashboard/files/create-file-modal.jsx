import { closeBootstrapModal } from "../../utility/close-bootstrap-modal";
import DateTimeInput from "../components/inputs/date-time-input";
import ModalFooter from "../components/bootstrap-modal/modal-footer";
import ModalHeader from "../components/bootstrap-modal/modal-header";
import NumberInput from "../components/inputs/number-input";
import RadioInput from "../components/inputs/radio-input";
import SelectInput from "../components/inputs/select-input";
import TextInput from "../components/inputs/text-input";
import TextareaInput from "../components/inputs/textarea-input";
import { userFile } from "../../models/file-model";
import { useState } from "react";
import { validateName } from "../../utility/create-file-validators";
import { validateEmail } from "../../utility/validate-email";
import { governorates } from "../../models/governorates-list";
import { httpPOST } from "../../http/httpPOST";
import { api } from "../../utility/api";
import DashboardLoader from "../components/loader/dashboardLoader";
import { useStore } from "../../hooks-store/store";

const CreateFileModal = () => {
  const dispatch = useStore()[1];

  const [file, setFile] = useState(userFile);
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
      setErrors({ ...errors, email: "???????? ?????????? ????????" });
    }
    if (value.length < 12) {
      setErrors({ ...errors, email: "?????? ???????????? ?????? ???? 12" });
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
      setErrors({ ...errors, password: "???????? ???????????? ????????????" });
      return;
    }
    if (enteredPassword.length < 8) {
      setErrors({
        ...errors,
        password: "?????? ?????? ?????? ???? 8 ????????",
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
          password: "?????? ???? ?????????? ?????? ???????? ????????",
        });
        return;
      }
      if (!hasUpperCaseChar) {
        setErrors({
          ...errors,
          password: "?????? ???? ?????????? ?????? ?????? ??????????????",
        });
        return;
      }
      if (!hasLowerCaseChar) {
        setErrors({
          ...errors,
          password: "?????? ???? ?????????? ?????? ?????? ????????",
        });
        return;
      }
      if (!hasNumber) {
        setErrors({
          ...errors,
          password: "?????? ???? ?????????? ?????? ??????????",
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
        setErrors({ ...errors, birthWeight: "?????? ?????????? ????????????" });
      if (name === "pastHistoryOfDisease")
        setErrors({ ...errors, pastHistoryOfDisease: "?????? ?????????? ????????????" });
      if (name === "pastHistoryOfOperation")
        setErrors({ ...errors, pastHistoryOfOperation: "?????? ?????????? ????????????" });
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
    const birthDate = new Date(event.target.value);
    setFile({
      ...file,
      birthDate: `${birthDate.getFullYear()}-${
        1 + birthDate.getMonth()
      }-${birthDate.getDate()}`,
    });
    const formErrors = { ...errors };
    delete formErrors[event.target.name];
    console.log(file.birthDate);
    setErrors(formErrors);
  };
  const phoneNumberChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if (name === "phoneNumber") {
      setFile({ ...file, phoneNumber: value });
      if (value.length !== 11) {
        setErrors({ ...errors, phoneNumber: "?????? ???? ???????? 11 ??????" });
      }
    }
    if (name === "phoneNumber1") {
      setFile({ ...file, phoneNumber1: value });
      if (value.length !== 11) {
        setErrors({ ...errors, phoneNumber1: "?????? ???? ???????? 11 ??????" });
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
      setErrors({ ...errors, firstName: "?????????? ?????????? ??????????" });
      return false;
    }
    if (!file.middleName) {
      setErrors({ ...errors, middleName: "?????????? ???????????? ??????????" });
      return false;
    }
    if (!file.lastName) {
      setErrors({ ...errors, lastName: "?????????? ???????????? ??????????" });
      return false;
    }
    if (!file.birthDate) {
      setErrors({ ...errors, birthDate: "?????????? ?????????????? ??????????" });
      return false;
    }
    if (!file.birthWeight) {
      setErrors({ ...errors, birthWeight: "?????? ?????????????? ??????????" });
    }
    if (!file.email) {
      setErrors({ ...errors, email: "?????????????? ??????????" });
      return false;
    }
    if (!file.password) {
      setErrors({ ...errors, password: "???????? ???????????? ????????????" });
      return false;
    }
    if (!file.gender) {
      setErrors({ ...errors, gender: "?????????? ??????????" });
      return false;
    }
    if (!file.pastHistoryOfDisease) {
      setErrors({ ...errors, pastHistoryOfDisease: "?????????????? ???????????? ??????????" });
      return false;
    }
    if (!file.pastHistoryOfOperation) {
      setErrors({ ...errors, pastHistoryOfOperation: "?????????????? ?????????????? ??????????" });
      return false;
    }
    return true;
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    if (!validateFileForSubmission(file)) {
      // return;
    }
    setIsSubmitting(true);

    httpPOST(api.account.create_account, file)
      .then((response) => {
        if (response.status === 400 || response.status === 422) {
          response.json().then((result) => {
            console.log(result)
            const backendErrors = [];
            for (const key in result) {
              if (key.includes("DuplicateUserName")) {
                setErrors({
                  ...errors,
                  email: "???????????? ???????????????????? ???????????? ????????????",
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
          alert("?????? ?????????? ???????????? ???????????? ?????? ?????????? ?????????? ??????????");
          dispatch("LOGOUT");
        }
        if (response.status === 201) {
          response.json().then((data) => {
            dispatch("ADD_FILE_IN_STORE", data);
            setFile(file);
            setErrors({});
            alert("???? ?????????? ??????????");
            setIsSubmitting(false);
            closeBootstrapModal();
          });
        } else {
          // alert("?????? ?????? ?????? ??????????");
          setIsSubmitting(false);
        }
      })
      .catch((c) => {
        alert("?????? ?????????????? ?????????? ?????????? ?????????? !!!");
        setIsSubmitting(false);
      });
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
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
        <div className="modal-dialog modal-xl">
          <div className="modal-content bg-blue-light">
            <form>
              <ModalHeader title="?????????? ?????? ????????" />
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
              {isSubmitting && <DashboardLoader text="???????? ?????????? ??????????" />}
              {!isSubmitting && (
                <div className="row m-0 p-2">
                  <div className="col-sm-12 col-lg-4 my-1 px-1">
                    <TextInput
                      placeholder="?????????? ??????????"
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
                      placeholder="?????????? ????????????"
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
                      placeholder="?????????? ????????????"
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
                      placeholder="?????? ???????? ??????????????"
                      onChangeHandler={causeOfNicuAdmissionChangeHandler}
                      value={file.causeOfNicuAdmission ?? ""}
                      name="causeOfNicuAdmission"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-4   my-1 px-1">
                    <TextInput
                      placeholder="?????????? ??????????????"
                      onChangeHandler={labourProblemsChangeHandler}
                      value={file.labourProblems ?? ""}
                      name="labourProblems"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-4   my-1 px-1">
                    <DateTimeInput
                      type="date"
                      onChangeHandler={birthDateChangeHandler}
                      title="?????????? ??????????????"
                      name="birthDate"
                      value={file.birthDate}
                    />
                    {errors.birthDate && (
                      <span style={{ color: "red" }}>{errors.birthDate}</span>
                    )}
                  </div>

                  <div className="col-sm-12 col-lg-3 my-1 px-1">
                    <SelectInput
                      selectedValue={file.governorate}
                      onChangeHandler={addressChangeHandler}
                      items={governorates}
                      name="governorate"
                      title="????????????????"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-3 my-1 px-1">
                    <TextInput
                      onChangeHandler={addressChangeHandler}
                      value={file.city ?? ""}
                      name="city"
                      placeholder="??????????????"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-3 my-1 px-1">
                    <TextInput
                      onChangeHandler={addressChangeHandler}
                      value={file.village ?? ""}
                      name="village"
                      placeholder="????????????"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-3 my-1 px-1">
                    <TextInput
                      onChangeHandler={addressChangeHandler}
                      value={file.street ?? ""}
                      name="street"
                      placeholder="????????????"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-3 my-1 px-1">
                    <NumberInput
                      onChangeHandler={phoneNumberChangeHandler}
                      value={file.phoneNumber ?? ""}
                      name="phoneNumber"
                      placeholder="???????????? 1"
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
                      placeholder="???????????? 2"
                    />
                    {errors.phoneNumber1 && (
                      <span style={{ color: "red" }}>
                        {errors.phoneNumber1 ?? ""}
                      </span>
                    )}
                  </div>
                  <div className="col-sm-12 col-lg-3 my-1 px-1">
                    <TextInput
                      placeholder="??????????????"
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
                      placeholder="???????? ????????????"
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
                      placeholder="?????? ??????????????"
                      onChangeHandler={requiredOnlyInputChangeHandler}
                      value={file.birthWeight === 0 ? "" : file.birthWeight}
                      name="birthWeight"
                    />
                    {errors.birthWeight && (
                      <span style={{ color: "red" }}>{errors.birthWeight}</span>
                    )}
                  </div>
                  <div className="col-sm-12 col-lg-3 my-1 px-1">
                    <NumberInput
                      placeholder="???????? ?????????? ?????? ??????????????"
                      onChangeHandler={headCircumferanceChangeHandler}
                      value={file.headCircumferance ?? ""}
                      name="headCircumferance"
                    />
                  </div>
                  <div className="col-sm-12 col-lg-3 my-1 px-1">
                    <TextInput
                      placeholder="???????????? ??????????????"
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
                          title="??????"
                          name="Gender"
                          value="male"
                          checked={file.gender === "male"}
                        />
                      </div>
                      <div className="col-6 p-0 ps-1">
                        <RadioInput
                          onChangeHandler={radioOnChangeHandler}
                          title="????????"
                          name="Gender"
                          value="female"
                          checked={file.gender === "female"}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-12 col-lg-4   px-1">
                    <TextareaInput
                      placeholder="?????????????? ????????????"
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
                      placeholder="?????????????? ??????????????"
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
                      placeholder="??????????????"
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
                  ???????? ????????
                </button>
                <button
                  onClick={() => {
                    setFile(userFile);
                    setErrors({});
                  }}
                  type="reset"
                  style={{
                    backgroundColor: "var(--blue-dark)",
                    width: "190px",
                  }}
                  className="my-btn btn py-3 px-5 fw-bold btn-dark text-white"
                >
                  ?????????? ????????????
                </button>
              </ModalFooter>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateFileModal;

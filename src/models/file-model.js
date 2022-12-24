import { governorates } from "./governorates-list";
export const userFile = {
  id: null,
  email: "",
  firstName: "",
  middleName: "",
  lastName: "",
  causeOfNicuAdmission: "",
  birthDate: `${new Date().getFullYear()}-${
    1 + new Date().getMonth()
  }-${new Date().getDate()}`,
  birthWeight: 0,
  governorate: governorates.at(0).value,
  city: "",
  village: "",
  street: "",
  phoneNumber: '',
  phoneNumber1: '',
  gender: "male",
  password: "",
  labourProblems: "",
  headCircumferance: "",
  congenitalAnomalies: "",
  role: "Patient",
  pastHistoryOfDisease: "",
  pastHistoryOfOperation: "",
  notes: "",
};

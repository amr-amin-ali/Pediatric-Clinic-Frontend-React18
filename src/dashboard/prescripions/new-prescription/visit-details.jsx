import { useEffect } from "react";
import SubmitButton from "../../components/buttons/submit-button";
import NumberInput from "../../components/inputs/number-input";
import SelectInput from "../../components/inputs/select-input";
import TextInput from "../../components/inputs/text-input";
import TextareaInput from "../../components/inputs/textarea-input";
import ViewFileModal from "../../files/components/view-file-modal";
import { httpGET } from "../../../http/httpGET";
import { api } from "../../../utility/api";
import { useStore } from "../../../hooks-store/store";
import { useState } from "react";
import { httpPOST } from "../../../http/httpPOST";
import { httpPUT } from "../../../http/httpPUT";
import DashboardLoader from "../../components/loader/dashboardLoader";

const VisitDetailsForm = ({ applicationUserId }) => {
  const [state, dispatch] = useStore(true);
  const visitId = state.visits_store.new_prescription_data.visit_details.id;
  const [isSavingVisitDetails, setIsSavingVisitDetails] = useState(false);
  const [visitDetails, setVisitDetails] = useState({
    ...state.visits_store.new_prescription_data.visit_details,
    applicationUserId,
  });
  const inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value.trim();
    const oldDetails = visitDetails;
    oldDetails[name] = value;
    setVisitDetails({ ...oldDetails });
  };

  const visitDetailsHandler = () => {
    const actionUrl =
      visitId === 0 || visitId === undefined
        ? api.visits.create_visit
        : api.visits.update_visit;
    setIsSavingVisitDetails(true);
    if (visitDetails.price <= 0) {
      visitDetails.price = 0;
    }
    let request =
      visitId === 0 || visitId === undefined
        ? httpPOST(actionUrl, { ...visitDetails })
        : httpPUT(actionUrl, { ...visitDetails });
    // httpPOST(actionUrl, { ...visitDetails })
    request
      .then((response) => {
        if (response.status === 400 || response.status === 404) {
          response.json().then((result) => alert(Object.values(result)[0]));
          setIsSavingVisitDetails(false);
        }

        if (response.status === 401) {
          alert("Please login first");
          dispatch("LOGOUT");
        }

        if (response.status === 200 || response.status === 201) {
          response.json().then((data) => {
            dispatch("SET_NEW_PRESCRIPTION_VISIT_DETAILS", data);
            setVisitDetails({ ...data });
            setIsSavingVisitDetails(false);
          });
        }
      })
      .catch((c) => {
        alert("Network error while loading visit details!!");
        setIsSavingVisitDetails(false);
      });
  };
  useEffect(() => {
    //Get File data
    httpGET(api.account.get_account_data + applicationUserId)
      .then((fileData) => {
        if (fileData.length !== 0)
          dispatch("ADD_FILE_DATA_TO_NEW_PRESCRIPTION", fileData);
      })
      .catch((c) => {
        alert("Network error while fetching file data!!");
      });

    //reset data for differen user
    setVisitDetails({
      ...state.visits_store.new_prescription_data.visit_details,
      applicationUserId,
    });
  }, []);

  return (
    <section
      className={`border border-bottom border-1 border-blue-dark rounded bg-blue-light overflow-hidden`}
    >
      <div className="row rounded ">
        <h4
          className={`position-relative text-white text-center p-0 bg-gradient rounded-top py-2`}
        >
          تفاصيل الزيارة
          <span
            style={{ right: "1%", top: "30%" }}
            className="fw-bold btn p-0 border-0 text-white position-absolute p-0"
          >
            <a
              className="m-1 text-white fw-bold fs-6 mt-4 text-decoration-none"
              href="./imaging.html"
            >
              الأشعة
            </a>
            |
            <a
              className="m-1 text-white fw-bold fs-6 mt-4 text-decoration-none"
              href="./prescriptionsList.html"
            >
              الروشتات السابقة
            </a>
            |
            <a
              className="m-1 text-white fw-bold fs-6 text-decoration-none"
              href="./laboratoryStudy.html"
            >
              التحاليل
            </a>
          </span>
          <span
            style={{
              position: "absolute",
              left: "10%",
              top: "21%",
              fill: "red",
            }}
          >
            <span
              data-bs-toggle="modal"
              data-bs-target="#viewFileDataForPrescriptionModal"
            >
              <svg width="25" height="25" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
              </svg>
            </span>
          </span>
          <span
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#prescriptionDetailsCollapse"
            style={{ right: "96%", top: "28%" }}
            className={` position-absolute accordion-button text-warning collapsed`}
          >
            <svg fill="#fff" width="25" height="25" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
            </svg>
          </span>
        </h4>
      </div>
      <hr className="opacity-100 m-0" />
      <div
        id="prescriptionDetailsCollapse"
        className="accordion-collapse row mx-0 my-3 collapse show"
        aria-labelledby="headingThree"
        data-bs-parent="#accordionExample"
      >
        {isSavingVisitDetails && <DashboardLoader />}
        {!isSavingVisitDetails && (
          <form onSubmit={(_) => _.preventDefault()}>
            <div className="row m-0 p-0">
              <div className="col-3">
                <TextInput
                  onChangeHandler={inputChangeHandler}
                  value={visitDetails.price}
                  name="price"
                  placeholder="السعر"
                />
              </div>
              <div className="col-3">
                <SelectInput
                  onChangeHandler={inputChangeHandler}
                  selectedValue={visitDetails.type ?? ""}
                  name="type"
                  title="نوع الزيارة"
                  items={[
                    { text: "كشف", value: "0" },
                    { text: "إستشارة أولى", value: "1" },
                    { text: "إستشارة ثانية", value: "2" },
                    { text: "إستشارة ثالثة", value: "3" },
                  ]}
                />
              </div>
              <div className="col-3">
                <NumberInput
                  onChangeHandler={inputChangeHandler}
                  name="daysToNextVisit"
                  placeholder="عدد الأيام للإستشارة"
                  value={visitDetails.daysToNextVisit ?? ""}
                />
              </div>
              <div className="col-3">
                <NumberInput
                  onChangeHandler={inputChangeHandler}
                  name="weight"
                  placeholder="وزن الطفل بالكيلوجرام"
                  value={visitDetails.weight ?? ""}
                />
              </div>
              <div className="row m-0 mt-1">
                <div className="col-4 pe-1 p-0">
                  <TextareaInput
                    onChangeHandler={inputChangeHandler}
                    placeholder="تعليمات لمريض"
                    name="indications"
                    value={visitDetails.indications ?? ""}
                  />
                </div>
                <div className="col-4 p-0">
                  <TextareaInput
                    onChangeHandler={inputChangeHandler}
                    placeholder="التشخيص"
                    name="diagnose"
                    value={visitDetails.diagnose ?? ""}
                  />
                </div>
                <div className="col-4 ps-1 p-0">
                  <TextareaInput
                    onChangeHandler={inputChangeHandler}
                    placeholder="ملاحظاتك حول الزيارة"
                    name="notes"
                    value={visitDetails.notes ?? ""}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center m-0 mt-1">
                <SubmitButton
                  clickHandler={visitDetailsHandler}
                  color={
                    visitId === 0 || visitId === undefined ? "green" : "blue"
                  }
                  title={
                    visitId === 0 || visitId === undefined
                      ? "إحفظ وافتح الروشتة"
                      : "تحديث"
                  }
                />
              </div>
            </div>
          </form>
        )}
      </div>
      <ViewFileModal
        fileData={state.visits_store.new_prescription_data.file_data}
        modalId="viewFileDataForPrescriptionModal"
      />
    </section>
  );
};

export default VisitDetailsForm;

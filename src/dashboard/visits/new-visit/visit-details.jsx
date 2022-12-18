import { useEffect } from "react";
// import SubmitButton from "../../components/buttons/submit-button";
import NumberInput from "../../components/inputs/number-input";
import SelectInput from "../../components/inputs/select-input";
import TextInput from "../../components/inputs/text-input";
import TextareaInput from "../../components/inputs/textarea-input";
import ViewFileModal from "../../files/view-file-modal";
import { httpGET } from "../../../http/httpGET";
import { api } from "../../../utility/api";
import { useStore } from "../../../hooks-store/store";
import { useState } from "react";
import { httpPOST } from "../../../http/httpPOST";
import { httpPUT } from "../../../http/httpPUT";
import DashboardLoader from "../../components/loader/dashboardLoader";
import { useNavigate } from "react-router-dom";

const VisitDetailsForm = ({ applicationUserId, visitIdHandler }) => {
  const navigate = useNavigate();
  const exitClickHandler = () => {
    if (window.confirm("هل تريد إنهاء حفظ الروشتة والخروج؟؟؟")) {
      navigate("/Dashboard/Files", { replace: true });
    }
  };
  const [state, dispatch] = useStore(true);

  const [isSavingVisitDetails, setIsSavingVisitDetails] = useState(false);
  const [visitDetails, setVisitDetails] = useState({
    id: 0,
    applicationUserId: applicationUserId,
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
      visitDetails.id === 0 ? api.visits.create_visit : api.visits.update_visit;
    setIsSavingVisitDetails(true);
    if (visitDetails.price <= 0) {
      visitDetails.price = 0;
    }
    let request =
      visitDetails.id === 0
        ? httpPOST(actionUrl, { ...visitDetails })
        : httpPUT(actionUrl, { ...visitDetails });
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
            setVisitDetails({ ...data });
            visitIdHandler(data.id);
            setIsSavingVisitDetails(false);
          });
        }
      })
      .catch((c) => {
        alert("Network error while loading visit details!!");
        setIsSavingVisitDetails(false);
      });
  };
  const [fileData, setFileData] = useState({});
  useEffect(() => {
    //Get File data
    httpGET(api.account.get_account_data + applicationUserId)
      .then((data) => {
        if (data.length !== 0) setFileData(data);
      })
      .catch((c) => {
        alert("Network error while fetching file data!!");
      });
  }, []);

  return (
    <section
      className={`border border-bottom border-1 border-blue-dark rounded bg-blue-light overflow-hidden`}
    >
      <div className="row position-relative rounded m-0 bg-gradient rounded-top py-2">
        <div
          onClick={exitClickHandler}
          className="col-1 fw-bold text-warning cursor-pointer ps-5"
        >
          خروج
        </div>
        <h4 className={`col-8 offset-1 text-white text-center p-0`}>
          تفاصيل الزيارة
        </h4>
        <div className="col-2 d-flex justify-content-between align-items-center">
          <svg
            data-bs-toggle="modal"
            data-bs-target="#viewFileDataForPrescriptionModal"
            fill="#fff"
            width="25"
            height="25"
            viewBox="0 0 16 16"
          >
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
          </svg>
          <svg
            data-bs-toggle="collapse"
            data-bs-target="#prescriptionDetailsCollapse"
            fill="#fff"
            width="25"
            height="25"
            viewBox="0 0 16 16"
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
          </svg>
        </div>
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
                  value={visitDetails.price ?? ""}
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
                {visitDetails.id === 0 || visitDetails.id === undefined ? (
                  <button
                    onClick={visitDetailsHandler}
                    type="button"
                    className="my-btn my-success btn btn-success py-3 px-5 fw-bold"
                    style={{ width: "250px" }}
                  >
                    إحفظ وافتح الروشتة
                  </button>
                ) : (
                  <button
                    onClick={visitDetailsHandler}
                    type="button"
                    className="my-btn btn btn-primary py-3 px-5 fw-bold"
                    style={{ width: "190px" }}
                  >
                    تحديث
                  </button>
                )}

         
              </div>
            </div>
          </form>
        )}
      </div>
      <ViewFileModal
        fileData={fileData}
        modalId="viewFileDataForPrescriptionModal"
      />
    </section>
  );
};

export default VisitDetailsForm;

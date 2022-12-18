import { useEffect } from "react";
// import SubmitButton from "../../components/buttons/submit-button";
import NumberInput from "../../components/inputs/number-input";
import SelectInput from "../../components/inputs/select-input";
import TextInput from "../../components/inputs/text-input";
import TextareaInput from "../../components/inputs/textarea-input";
import ViewFileModal from "../../files/components/view-file-modal";
import { api } from "../../../utility/api";
import { useStore } from "../../../hooks-store/store";
import { useState } from "react";
import { httpPUT } from "../../../http/httpPUT";
import DashboardLoader from "../../components/loader/dashboardLoader";

const EditVisitDetailsForm = ({ visit }) => {
  const [state, dispatch] = useStore(true);
  const [isSavingVisitDetails, setIsSavingVisitDetails] = useState(false);
  const [visitDetails, setVisitDetails] = useState({...visit});

  const inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value.trim();
    const oldDetails = {...visitDetails};
    oldDetails[name] = value;
    setVisitDetails({ ...oldDetails });
  };

  const saveVisitDetailsHandler = () => {
    setIsSavingVisitDetails(true);
    httpPUT(api.visits.update_visit, { ...visitDetails })
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

  return (
    <section className={`bg-blue-light overflow-hidden`}>
      <div className="row position-relative m-0 bg-gradient py-2">
        <h4 className={`col-10 offset-1 text-white text-center p-0`}>
          تفاصيل الزيارة
        </h4>
        <div className="col-1 d-flex justify-content-between align-items-center">
          <svg
            className="cursor-pointer"
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
        {isSavingVisitDetails && <DashboardLoader text="جارى الحفظ" />}
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
                <button
                  onClick={saveVisitDetailsHandler}
                  type="button"
                  className="my-btn btn btn-primary py-3 px-5 fw-bold"
                  style={{ width: "250px" }}
                >
                  حفظ البيانات
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default EditVisitDetailsForm;

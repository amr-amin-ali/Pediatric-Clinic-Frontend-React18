import { getAge } from "../../../utility/age-calculator";
import ModalFooter from "../../components/bootstrap-modal/modal-footer";
import ModalHeader from "../../components/bootstrap-modal/modal-header";
import HideModalButton from "../../components/buttons/hide-modal-button";
import Stethoscope from "../../components/icons/stethoscope";
import MaleSvg from "../../components/icons/male-svg";
import FemaleSvg from "../../components/icons/female-svg";
const ViewFileModal = ({ fileData, modalId }) => {
  let date = getAge(fileData.birthDate);
  return (
    <div>
      <div
        className="modal fade bg-blue-darkz"
        id={modalId}
        tabIndex="-1"
        aria-labelledby="createNewFileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-lg">
          <div className="modal-content bg-blue-light">
            <ModalHeader
              title={`بيانات ${fileData.firstName} ${fileData.middleName} ${fileData.lastName}`}
            />
            <div className="row m-0 p-2">
              <div className="col-sm-12 col-lg-4 p-0">
                <div
                  className="row m-0 border border-1 border-secondary p-2"
                  style={{ height: "100px" }}
                >
                  <div className="col-2">
                    <Stethoscope />
                  </div>
                  <div className="col-10 position-relative">
                    {fileData.gender === "male" ? (
                      <span
                        style={{
                          top: "-70px!important",
                          position: "absolute",
                          left: "0px",
                        }}
                      >
                        <MaleSvg width="50px" height="50px" fill="yellow" />
                      </span>
                    ) : (
                      <span
                        style={{
                          top: "-70px!important",
                          position: "absolute",
                          left: "0px",
                        }}
                      >
                        <FemaleSvg width="50px" height="50px" fill="yellow" />
                      </span>
                    )}
                    <strong className="text-info">تاريخ الميلاد</strong>
                    <small className="d-block text-white">
                      {date.birthDate}
                    </small>
                    <small className="d-block text-warning  pb-3">
                      {date.age}
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-4 p-0">
                <div
                  className="row m-0 border border-1 border-secondary p-2"
                  style={{ height: "100px" }}
                >
                  <div className="col-2">
                    <Stethoscope />
                  </div>
                  <div className="col-10">
                    <strong className="text-info">وزن الميلاد</strong>
                    <small className="d-block text-white  pb-3">
                      {fileData.birthWeight}
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-4 p-0">
                <div
                  className="row m-0 border border-1 border-secondary p-2"
                  style={{ height: "100px" }}
                >
                  <div className="col-2">
                    <Stethoscope />
                  </div>
                  <div className="col-10">
                    <strong className="text-info">محيط الرأس</strong>
                    <small className="d-block text-white  pb-3">
                      {fileData.headCircumferance}
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-12 p-0 mt-1">
                <div
                  className="row m-0 border border-1 border-secondary p-2"
                  style={{ height: "100px" }}
                >
                  <div className="col-2">
                    <Stethoscope />
                  </div>
                  <div className="col-10">
                    <strong className="text-info">العيوب الخلقية</strong>
                    <small className="d-block text-white  pb-3">
                      {fileData.congenitalAnomalies}
                    </small>
                  </div>
                </div>
              </div>

              <div className="col-12 p-0 mt-1">
                <div
                  className="row m-0 border border-1 border-secondary p-2"
                  style={{ height: "100px" }}
                >
                  <div className="col-2">
                    <Stethoscope />
                  </div>
                  <div className="col-10">
                    <strong className="text-info">مشاكل الولادة</strong>
                    <small className="d-block text-white  pb-3">
                      {fileData.labourProblems}
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-12 p-0 my-1">
                <div
                  className="row m-0 border border-1 border-secondary p-2"
                  style={{ height: "100px" }}
                >
                  <div className="col-2">
                    <Stethoscope />
                  </div>
                  <div className="col-10">
                    <strong className="text-info">سبب دخول الحضانة</strong>
                    <small className="d-block text-white  pb-3">
                      {fileData.causeOfNicuAdmission}
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-12 p-0">
                <div className="row m-0 border border-1 border-secondary p-2">
                  <div className="col-2">
                    <Stethoscope />
                  </div>
                  <div className="col-10">
                    <strong className="text-info">التاريخ المرضى</strong>
                    <small className="d-block text-white  pb-3">
                      {fileData.pastHistoryOfDisease}
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-12 p-0">
                <div className="row m-0 border border-1 border-secondary p-2">
                  <div className="col-2">
                    <Stethoscope />
                  </div>
                  <div className="col-10">
                    <strong className="text-info">التاريخ الجراحى</strong>
                    <small className="d-block text-white  pb-3">
                      {fileData.pastHistoryOfOperation}
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-12 p-0">
                <div className="row m-0 border border-1 border-secondary p-2">
                  <div className="col-2">
                    <Stethoscope />
                  </div>
                  <div className="col-10">
                    <strong className="text-info">ملاحظاتك</strong>
                    <small className="d-block text-white  pb-3">
                      {" "}
                      {fileData.notes}
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-4 mt-1 p-0">
                <div className="row m-0 border border-1 border-secondary p-2">
                  <div className="col-2">
                    <Stethoscope />
                  </div>
                  <div className="col-10">
                    <strong className="text-info">الهاتف</strong>
                    <small className="d-block text-white  pb-3">
                      {fileData.phoneNumber} {fileData.phoneNumber1}
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-4 mt-1 p-0">
                <div className="row m-0 border border-1 border-secondary p-2">
                  <div className="col-2">
                    <Stethoscope />
                  </div>
                  <div className="col-10">
                    <strong className="text-info">كلمة المرور</strong>
                    <small className="d-block text-white  pb-3">
                      {fileData.password}
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-4 mt-1 p-0">
                <div className="row m-0 border border-1 border-secondary p-2">
                  <div className="col-2">
                    <Stethoscope />
                  </div>
                  <div className="col-10">
                    <strong className="text-info">العنوان</strong>
                    <small className="d-block text-white  pb-3">
                      {fileData.governorate} {fileData.city} {fileData.village}
                      {fileData.street}
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <ModalFooter>
              <button
                className="my-btn my-success btn btn-success py-3 px-5 fw-bold"
                data-bs-dismiss="modal"
              >
                Ok
              </button>
            </ModalFooter>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewFileModal;

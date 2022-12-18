import ModalFooter from "../../components/bootstrap-modal/modal-footer";
import ModalHeader from "../../components/bootstrap-modal/modal-header";
import Stethoscope from "../../components/icons/stethoscope";

const ViewMedicineModal = ({ medicineData, modalId }) => {
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
            <ModalHeader title={`بيانات ${medicineData.name} `} />
            <div className="row m-0 p-2">
              <div className="col-12 p-0 mt-1">
                <div
                  className="row m-0 border border-1 border-secondary p-2"
                  style={{ height: "100px" }}
                >
                  <div className="col-2">
                    <Stethoscope />
                  </div>
                  <div className="col-10">
                    <strong className="text-info">الجرعة</strong>
                    <small className="d-block text-white  pb-3">
                      {medicineData.dose}
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
                    <strong className="text-info">عمر الإستخدام</strong>
                    <small className="d-block text-white  pb-3">
                      {medicineData.ageOfUse}
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
                    <strong className="text-info">الحساسية</strong>
                    <small className="d-block text-white  pb-3">
                      {medicineData.drugSensitivity}
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
                    <strong className="text-info">الآثار الجانبية</strong>
                    <small className="d-block text-white  pb-3">
                      {medicineData.sideEffect}
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
                    <strong className="text-info">تعليمات الإستعمال</strong>
                    <small className="d-block text-white  pb-3">
                      {medicineData.instructionToUse}
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
                    <strong className="text-info">المواد الفعالة</strong>
                    <small className="d-block text-white  pb-3">
                      {medicineData.activeIngreients}
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
                    <strong className="text-info">
                      التداخل مع الأدوية الأخرى
                    </strong>
                    <small className="d-block text-white  pb-3">
                      {medicineData.drugInteraction}
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
                    <strong className="text-info">تحذيرات الإستعمال</strong>
                    <small className="d-block text-white  pb-3">
                      {medicineData.precautions}
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
export default ViewMedicineModal;

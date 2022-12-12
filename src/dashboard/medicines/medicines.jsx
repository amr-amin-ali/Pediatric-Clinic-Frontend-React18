import { Fragment } from "react";
import CreateMedicineModal from "./components/create-medicine-modal";
import SearchMedicinesModal from "./components/search-medicine-modal";
import LinkButton from "../components/buttons/link-button";
import ShowModalButton from "../components/buttons/show-modal-button";

const Medicines = () => {
  document.title = "الأدوية";
  return (
    <Fragment>
      <div className="col-8">
        <div className="card text-center m-3">
          <div className="card-header">الخيارات المتاحة</div>
          <div className="card-body">
            <h5 className="card-title mt-4">هذه الإجراءات خاصة بالأدوية</h5>
            <p className="card-text mb-4">
              يمكنك الإختيار ما بين تسجيل دواء جديد أو تصفح الأدوية المسجلة أو
              حتى البحث عن دواء مسجل بالإسم.
            </p>
            <hr />
            <div className="row mt-5 mb-5">
              <div className="col-4">
                <LinkButton to="/Dashboard/Medicines/View-All" title="عرض كل الأدوية المسجلة" color="red" />
              </div>
              <div className="col-4">
                <ShowModalButton
                color="blue"
                  modalId="#createNewFileModal"
                  title="تسجيل دواء"
                />
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            لا تنسى أن تحظى بيوم سعيد
          </div>
        </div>
        <CreateMedicineModal />
        <SearchMedicinesModal />
      </div>
    </Fragment>
  );
};
export default Medicines;

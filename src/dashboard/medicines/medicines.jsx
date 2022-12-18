import { Fragment } from "react";
import CreateMedicineModal from "./components/create-medicine-modal";
import { Link } from "react-router-dom";

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
            <div className="row justify-content-around mt-5 mb-5">
              <div className="col-4">
                <Link
                  className="my-btn my-danger btn btn-danger w-100 py-3 fw-bold"
                  to="/Dashboard/Medicines/View-All"
                >
                  عرض كل الأدوية المسجلة
                </Link>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  className="my-btn my-primary btn btn-primary w-100 py-3 fw-bold"
                  data-bs-toggle="modal"
                  data-bs-target="#createNewFileModal"
                >
                  تسجيل دواء
                </button>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            لا تنسى أن تحظى بيوم سعيد
          </div>
        </div>
        <CreateMedicineModal />
      </div>
    </Fragment>
  );
};
export default Medicines;

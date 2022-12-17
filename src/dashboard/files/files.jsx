import { Fragment } from "react";
import CreateFileModal from "./components/create-file-modal";
import SearchFiles from "./components/search-files-modal";
import LinkButton from "../components/buttons/link-button";
import ShowModalButton from "../components/buttons/show-modal-button";
import { Link } from "react-router-dom";

const Files = () => {
  document.title = "الملفات";
  return (
    <Fragment>
      <div className="col-8">
        <div className="card text-center m-3">
          <div className="card-header">الخيارات المتاحة</div>
          <div className="card-body">
            <h5 className="card-title mt-4">
              هذه الإجراءات خاصة بملفات المرضى
            </h5>
            <p className="card-text mb-4">
              يمكنك الإختيار ما بين إنشاء ملف جديد لحالة جديدة أو فتح ملف تم
              إنشائه من قبل أو حتى عرض جميع الملفات المسجلة مسبقا
            </p>
            <hr />
            <div className="row mt-5 mb-5">
              <div className="col-4">
                {/* <LinkButton  title=" color="red" /> */}
                <Link
                  className="my-btn my-danger btn btn-danger w-100 py-3 fw-bold"
                  to="View-All"
                >
                  عرض كل الموجودة
                </Link>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  class="my-btn my-primary btn btn-primary w-100 py-3 fw-bold"
                  data-bs-toggle="modal"
                  data-bs-target="#createNewFileModal"
                >
                  إنشاء ملف جديد
                </button>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  class="my-btn my-success btn btn-success w-100 py-3 fw-bold"
                  data-bs-toggle="modal"
                  data-bs-target="#searchForPatientFileModal"
                >
                  بحث عن ملف
                </button>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            لا تنسى أن تحظى بيوم سعيد
          </div>
        </div>
        <CreateFileModal />
        <SearchFiles />
      </div>
    </Fragment>
  );
};
export default Files;

import ModalFooter from "../components/bootstrap-modal/modal-footer";
import ModalHeader from "../components/bootstrap-modal/modal-header";
import { api } from "../../utility/api";
import { httpDELETE } from "../../http/httpDELETE";
import { Fragment, useState } from "react";
import { useStore } from "../../hooks-store/store";
import DashboardLoader from "../components/loader/dashboardLoader";
import { closeBootstrapModal } from "../../utility/close-bootstrap-modal";

const DeleteFileModal = ({ fileData, modalId }) => {
  const dispatch = useStore()[1];
  const [isDeletingFile, setIsDeletingFile] = useState(false);

  const submitFormHandler = (event) => {
    event.preventDefault();
    setIsDeletingFile(true);
    httpDELETE(api.account.delete_account + fileData.id)
      .then((response) => {
        if (response.status === 204) {
          dispatch("DELETE_FILE", fileData.id);
        }
        if (response.status === 404) {
          response.json().then((result) => alert(Object.values(result)[0]));
        }
        if (response.status === 400) {
          response.json().then((result) => alert(Object.values(result)[0]));
        }
        setIsDeletingFile(false);
        closeBootstrapModal();
      })
      .catch((c) => {
        // alert("Network error while deleting file!!");
        setIsDeletingFile(false);
        closeBootstrapModal();
      });
  };
  return (
    <div>
      <div
        className="modal fade bg-blue-dark"
        id={modalId}
        tabIndex="-1"
        aria-labelledby="createNewFileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-xl modal-dialog-centered">
          <div className="modal-content bg-blue-light">
            <form onSubmit={(_) => _.preventDefault()}>
              <ModalHeader title={`حذف ملف ${fileData.firstName}`} />
              {isDeletingFile && <DashboardLoader text="جارى حذف الملف" />}
              {!isDeletingFile && (
                <Fragment>
                  <h1 className="text-danger text-center">
                    هل تريد حذف ملف {fileData.firstName}
                  </h1>
                  <p className="text-center text-white">
                    إذا قمت بالحذف لن تستطيع إستعادة الملف أو الروشتات المرتبطة
                    به مرة أخرى!
                  </p>
                  <ModalFooter>
                    <button
                      onClick={submitFormHandler}
                      type="button"
                      className="my-btn btn btn-danger py-3 px-5 fw-bold"
                      style={{ width: "190px" }}
                    >
                      إحذف
                    </button>
                    <button
                      className="my-btn btn btn-secondary py-3 px-5 fw-bold"
                      data-bs-dismiss="modal"
                    >
                      تراجع
                    </button>

                  </ModalFooter>
                </Fragment>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteFileModal;

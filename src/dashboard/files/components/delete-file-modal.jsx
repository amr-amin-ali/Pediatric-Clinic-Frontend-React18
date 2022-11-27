import HideModalButton from "../../components/buttons/hide-modal-button";
import SubmitButton from "../../components/buttons/submit-button";
import ModalFooter from "../../components/bootstrap-modal/modal-footer";
import ModalHeader from "../../components/bootstrap-modal/modal-header";
import { api } from "../../../utility/api";
import { httpDELETE } from "../../../http/httpDELETE";
import { Fragment, useState } from "react";
import { useStore } from "../../../hooks-store/store";
import DashboardLoader from "../../components/loader/dashboardLoader";
import { closeBootstrapModal } from "../../../utility/close-bootstrap-modal";

const DeleteFileModal = ({ fileData, modalId }) => {
  const dispatch = useStore()[1];
  const [isLoading, setIsLoading] = useState(false);

  const submitFormHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
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
        setIsLoading(false);
        closeBootstrapModal();
      })
      .catch((c) => {
        // alert("Network error while deleting file!!");
        setIsLoading(false);
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
              {isLoading && <DashboardLoader text="جارى حذف الملف"/>}
              {!isLoading && (
                <Fragment>
                  <h1 className="text-danger text-center">
                    هل تريد حذف ملف {fileData.firstName}
                  </h1>
                  <p className="text-center text-white">
                    إذا قمت بالحذف لن تستطيع إستعادة الملف أو الروشتات المرتبطة
                    به مرة أخرى!
                  </p>
                  <ModalFooter>
                    <SubmitButton
                      color="red"
                      title="إحذف"
                      clickHandler={submitFormHandler}
                    />
                    <HideModalButton title="تراجع" />
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

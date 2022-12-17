import HideModalButton from "../components/buttons/hide-modal-button";
import SubmitButton from "../components/buttons/submit-button";
import ModalFooter from "../components/bootstrap-modal/modal-footer";
import ModalHeader from "../components/bootstrap-modal/modal-header";
import { httpDELETE } from "../../http/httpDELETE";
import { Fragment, useState } from "react";
import { useStore } from "../../hooks-store/store";
import DashboardLoader from "../components/loader/dashboardLoader";
import { closeBootstrapModal } from "../../utility/close-bootstrap-modal";
import { api } from "../../utility/api";

const DeleteToolModal = ({ tool, modalId }) => {
  const dispatch = useStore()[1];
  const [isDeletingTool, setIsDeletingTool] = useState(false);
  const submitFormHandler = (event) => {
    event.preventDefault();
    setIsDeletingTool(true);
    httpDELETE(api.tools.delete_tool + tool.id)
      .then((response) => {
        if (response.status === 204) {
          dispatch("DELETE_TOOL", tool.id);
        }
        if (response.status === 404) {
          response.json().then((result) => alert(Object.values(result)[0]));
        }
        if (response.status === 400) {
          response.json().then((result) => alert(Object.values(result)[0]));
        }
        setIsDeletingTool(false);
        closeBootstrapModal();
      })
      .catch((c) => {
        // alert("Network error while deleting file!!");
        setIsDeletingTool(false);
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
              <ModalHeader title={`حذف آداة ${tool.name}`} />
              {isDeletingTool && <DashboardLoader text="جارى حذف الآداة"/>}
              {!isDeletingTool && (
                <Fragment>
                  <h1 className="text-danger text-center">
                    هل تريد حذف آداة {tool.name}
                  </h1>
                  <p className="text-center text-white">
                    إذا قمت بالحذف لن تستطيع إستعادة الآداة مرة أخرى! ولكن يمكنك إضافتها من جديد.
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
                    </button>                  </ModalFooter>
                </Fragment>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteToolModal;

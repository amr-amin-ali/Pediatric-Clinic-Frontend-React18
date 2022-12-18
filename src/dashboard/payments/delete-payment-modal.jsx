import ModalFooter from "../components/bootstrap-modal/modal-footer";
import ModalHeader from "../components/bootstrap-modal/modal-header";
import { api } from "../../utility/api";
import { httpDELETE } from "../../http/httpDELETE";
import { Fragment, useState } from "react";
import { useStore } from "../../hooks-store/store";
import DashboardLoader from "../components/loader/dashboardLoader";
import { closeBootstrapModal } from "../../utility/close-bootstrap-modal";

const DeletePaymentModal = ({ payment, modalId }) => {
  const dispatch = useStore()[1];
  const [isDeletingPayment, setIsDeletingPayment] = useState(false);
  const submitFormHandler = (event) => {
    event.preventDefault();
    setIsDeletingPayment(true);
    httpDELETE(api.payments.delete_payment + payment.id)
      .then((response) => {
        if (response.status === 204) {
          dispatch("DELETE_PAYMENT", payment.id);
        }
        if (response.status === 404) {
          response.json().then((result) => alert(Object.values(result)[0]));
        }
        if (response.status === 400) {
          response.json().then((result) => alert(Object.values(result)[0]));
        }
        setIsDeletingPayment(false);
        closeBootstrapModal();
      })
      .catch((c) => {
        // alert("Network error while deleting file!!");
        setIsDeletingPayment(false);
        closeBootstrapModal();
      });

  };
  return (
    <div>
      <div
        className="modal fade bg-blue-dark"
        id={modalId}
        tabIndex="-1"
        aria-labelledby={`${modalId}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-xl modal-dialog-centered">
          <div className="modal-content bg-blue-light">
            <form onSubmit={(_) => _.preventDefault()}>
              <ModalHeader title={`حذف مدفوعات شهر ${payment.month} عام ${payment.year} `} />
              {isDeletingPayment && <DashboardLoader text="جارى حذف الآداة"/>}
              {!isDeletingPayment && (
                <Fragment>
                  <h1 className="text-danger text-center">
                  {`هل تريد حذف مدفوعات شهر ${payment.month} عام ${payment.year} `}
                     </h1>
                  <p className="text-center text-white">
                    إذا قمت بالحذف لن تستطيع إستعادة هذه البيانات مرة أخرى! ولكن يمكنك إضافتها من جديد.
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
export default DeletePaymentModal;

import HideModalButton from "../components/buttons/hide-modal-button";
import SubmitButton from "../components/buttons/submit-button";
import ModalFooter from "../components/bootstrap-modal/modal-footer";
import ModalHeader from "../components/bootstrap-modal/modal-header";
import { api } from "../../utility/api";
import { httpDELETE } from "../../http/httpDELETE";
import { Fragment, useState } from "react";
import { useStore } from "../../hooks-store/store";
import DashboardLoader from "../components/loader/dashboardLoader";
import { closeBootstrapModal } from "../../utility/close-bootstrap-modal";
import { cSharpDateToJsDateConverter } from "../../utility/cSharpDateToJsDateConverter";

const DeletePurchaseModal = ({ purchase, modalId }) => {
  const dispatch = useStore()[1];
  const [isDeletingPurchase, setIsDeletingPurchase] = useState(false);
  const submitFormHandler = (event) => {
    event.preventDefault();
    setIsDeletingPurchase(true);
    httpDELETE(api.purchases.delete_purchase + purchase.id)
      .then((response) => {
        if (response.status === 204) {
          dispatch("DELETE_PURCHASE", purchase.id);
        }
        if (response.status === 404) {
          response.json().then((result) => alert(Object.values(result)[0]));
        }
        if (response.status === 400) {
          response.json().then((result) => alert(Object.values(result)[0]));
        }
        setIsDeletingPurchase(false);
        closeBootstrapModal();
      })
      .catch((c) => {
        // alert("Network error while deleting file!!");
        setIsDeletingPurchase(false);
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
              <ModalHeader title={`حذف مشتريات ${purchase.tool.name}`} />
              {isDeletingPurchase && <DashboardLoader text="جارى حذف الآداة"/>}
              {!isDeletingPurchase && (
                <Fragment>
                  <h1 className="text-danger text-center">
                 هل تريد حذف مشترياتك من {purchase.tool.name} بتاريخ {cSharpDateToJsDateConverter(purchase.createdAt)} ؟
                  </h1>
                  <p className="text-center text-white">
                    إذا قمت بالحذف لن تستطيع إستعادة الآداة مرة أخرى! ولكن يمكنك إضافتها من جديد.
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
export default DeletePurchaseModal;
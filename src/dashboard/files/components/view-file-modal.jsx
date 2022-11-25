import ModalFooter from "../../components/bootstrap-modal/modal-footer";
import ModalHeader from "../../components/bootstrap-modal/modal-header";
import HideModalButton from "../../components/buttons/hide-modal-button";
const ViewFileModal = ({ fileData, modalId }) => {
  return (
    <div>
      <div
        className="modal fade bg-blue-dark"
        id={modalId}
        tabIndex="-1"
        aria-labelledby="createNewFileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-fullscreen">
          <div className="modal-content bg-blue-light">
            <ModalHeader title={`بيانات ${fileData.firstName}`} />

            <ModalFooter>
              <HideModalButton title="Ok"/>
            </ModalFooter>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewFileModal;

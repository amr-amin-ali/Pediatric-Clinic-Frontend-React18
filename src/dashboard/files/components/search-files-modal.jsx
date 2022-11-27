import ModalHeader from "../../components/bootstrap-modal/modal-header";
import TextInput from "../../components/inputs/text-input";
import SubmitButton from "../../components/buttons/submit-button";
const SearchFilesModal = () => {
  return (
    <div>
      <div
        className="modal fade"
        id="searchForPatientFileModal"
        tabIndex="-1"
        aria-labelledby="searchForPatientFileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-blue-light">
            <form>
              <ModalHeader title="بحث عن ملف" />
              <div className="row mx-0 mb-3">
                <div className="col-7">
                  <TextInput name="name" placeholder="إسم المريض" />
                </div>
                <div className="col-5">
                  <SubmitButton color="green" title="بحث" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilesModal;

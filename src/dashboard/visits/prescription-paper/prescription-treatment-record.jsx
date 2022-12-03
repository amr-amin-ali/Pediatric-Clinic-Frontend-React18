import { Fragment, useState } from "react";
import prescriptionSymbol from "../../../assets/prescriptionSymbol.png";
import { httpDELETE } from "../../../http/httpDELETE";
import { api } from "../../../utility/api";
import { closeBootstrapModal } from "../../../utility/close-bootstrap-modal";
import DashboardLoader from "../../components/loader/dashboardLoader";
import DeleteTreatmentConfirmationModal from "./delete-treatment-modal";
const PrescriptionTreatmentRecord = ({ treatment = {} }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const deleteTreatment = async () => {
    setIsDeleting(true);
    httpDELETE(api.treatments.delete_treatment + treatment.id)
      .then((response) => {
        if (response.status === 204) {
          setIsDeleted(true);
        }
        if (response.status === 404) {
          response.json().then((result) => alert(Object.values(result)[0]));
        }
        if (response.status === 400) {
          response.json().then((result) => alert(Object.values(result)[0]));
        }
        setIsDeleting(false);
        closeBootstrapModal();
      })
      .catch((c) => {
        alert("Network error while deleting treatment!!");
        setIsDeleting(false);
        closeBootstrapModal();
      });
  };
  if (isDeleted) return null;
  else
    return (
      <Fragment>
        {/* {isDeleting && <DashboardLoader />} */}
        {!isDeleting && (
          <div className="row">
            <p
              className="col-11 text-end m-0 fw-bold"
              data-bs-toggle="modal"
              data-bs-target={`#deleteTreatmentConfirmationModal${treatment.id}`}
            >
              {treatment.medicineName}
            </p>
            <div className="col-1 p-0">
              <img
                width="30"
                className="d-inline-block"
                src={prescriptionSymbol}
                alt="."
              />
            </div>

            <p className="col-11 offset-1 text-end pe-5">
              {treatment.description}
            </p>
          </div>
        )}

        <DeleteTreatmentConfirmationModal
          isDeleting={isDeleting}
          deleteAction={deleteTreatment}
          treatment={treatment.medicine}
          modalId={`deleteTreatmentConfirmationModal${treatment.id}`}
        />
      </Fragment>
    );
};
export default PrescriptionTreatmentRecord;

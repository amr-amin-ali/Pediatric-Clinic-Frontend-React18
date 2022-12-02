import { Fragment } from "react";
import prescriptionSymbol from "../../../assets/prescriptionSymbol.png";
import DeleteMedicineConfirmationModal from "../delete-treatment-modal";
const PrescriptionTreatmentRecord = ({ treatment = {} }) => {
  return (
    <Fragment>
      <div className="treatment text-end">
        <span
          data-bs-toggle="modal"
          data-bs-target={`#deleteTreatmentConfirmationModal${treatment.id}`}
          className="d-block text-decoration-none text-black fw-bold"
        >
          {treatment.medicineName}
          <img
            width="30"
            className="d-inline-block"
            src={prescriptionSymbol}
            alt="z"
          />
        </span>
        <p className="m-0 ps-5">{treatment.description}</p>
      </div>
      <DeleteMedicineConfirmationModal medicineData={treatment.medicine} modalId={`deleteTreatmentConfirmationModal${treatment.id}`} />
      {/* <!-- Delete Treatment Modal --> */}
     
      {/* <!-- Delete Treatment Modal --> */}
    </Fragment>
  );
};
export default PrescriptionTreatmentRecord;

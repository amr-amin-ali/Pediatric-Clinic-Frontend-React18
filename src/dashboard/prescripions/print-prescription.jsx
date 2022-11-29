import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrescriptionFooter from "./prescription-paper/prescription-footer";
import PrescriptionHeader from "./prescription-paper/prescription-header";
import PrescriptionTreatmentRecord from "./prescription-paper/prescription-treatment-record";

const PrintPrescription = ({ treatments }) => {
  let printWorked = 0;
  const navigate = useNavigate();
  useEffect(() => {
    console.log("X")
    if (printWorked === 0) {
      ++printWorked;
      window.print();
    }

    return () => {
      navigate("/Dashboard/New-Prescription/SFFS");
    };
  }, [navigate,printWorked]);

  return (
    <div id="printSection" style={{ backgroungColor: "red" }}>
      <div className={`{styles.prescriptionPaper}`} style={{ margin: "auto" }}>
        <PrescriptionHeader />
        <div className={`{styles.prescriptionPaperBody}`}>
          <PrescriptionTreatmentRecord />
        </div>
        <PrescriptionFooter />
      </div>
    </div>
  );
};
export default PrintPrescription;

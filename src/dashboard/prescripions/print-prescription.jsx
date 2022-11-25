import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrescriptionFooter from "./components/prescription-footer";
import PrescriptionHeader from "./components/prescription-header";
import PrescriptionTreatmentRecord from "./components/prescription-treatment-record";
// import styles from "./components/prescription.module.css";

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

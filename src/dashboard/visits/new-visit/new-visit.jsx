import { useParams } from "react-router-dom";
import Prescription from "../prescription-paper/prescription";
import AddTreatmentForm from "./add-treatment";
import VisitDetailsForm from "./visit-details";
import { useStore } from "../../../hooks-store/store";
import { useState } from "react";

const NewPrescription = () => {
  const [state, dispatch] = useStore(true);
  document.title = "روشتة جديدة";
  const params = useParams();
  const applicationUserId = params.applicationUserId;
  const [visitId, setVisitId] = useState(0);
  const [treatments, setTreatments] = useState([]);
  const treatmentsListHandler = (treatment) => {
    setTreatments([...treatments, treatment]);
  };

  return (
    <div className="row bg-blue-dark  px-5 pt-3 bg-blue-dark p-0 vh-100 overflow-scroll scrollbar-none">
      <div className="col-12">
        <VisitDetailsForm
          applicationUserId={applicationUserId}
          visitIdHandler={setVisitId}
        />
        {visitId > 0 && (
          // Open prescription only if visit is created
          <div className="row">
            <div className={`col-5 m-0 pe-0`}>
              <AddTreatmentForm
                visitId={visitId}
                treatmentsListHandler={treatmentsListHandler}
              />
            </div>
            <div className="col-7 mx-0 my-1 p-0">
              <Prescription treatments={treatments} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default NewPrescription;

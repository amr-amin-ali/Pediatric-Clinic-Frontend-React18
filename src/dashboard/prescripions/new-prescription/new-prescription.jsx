import { useParams } from "react-router-dom";
import Prescription from "../prescription-paper/prescription";
import AddTreatmentForm from "./add-treatment";
import VisitDetailsForm from "./visit-details";
import { useStore } from "../../../hooks-store/store";
import { useEffect } from "react";

const NewPrescription = () => {
  const [state,dispatch] = useStore(true);
  document.title = "روشتة جديدة";
  const params = useParams();
  const applicationUserId = params.applicationUserId;
  useEffect(() => {
    dispatch("RESET_NEW_PRESCRIPTION_DATA")
  }, []);
  return (
    <div className="row bg-blue-dark  px-5 pt-3 bg-blue-dark p-0 vh-100 overflow-scroll scrollbar-none">
      <div className="col-12">
        <VisitDetailsForm applicationUserId={applicationUserId} />
        {state.visits_store.new_prescription_data.visit_details.id && 
        state.visits_store.new_prescription_data.visit_details.applicationUserId===applicationUserId
        &&
        (
          // Open prescription only if visit is created
          <div className="row">
            <div className={`col-5 m-0 pe-0`}>
              <AddTreatmentForm />
            </div>
            <div className="col-7 mx-0 my-1 p-0">
              <Prescription />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default NewPrescription;

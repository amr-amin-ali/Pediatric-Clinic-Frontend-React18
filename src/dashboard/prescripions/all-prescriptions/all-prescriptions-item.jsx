import EditVisitDetailsForm from "../edit-visit/edit-visit-details-form";
import EditAddTreatmentForm from "../edit-visit/edit-add-treatment";
import { useStore } from "../../../hooks-store/store";
import Prescription from "../prescription-paper/prescription";
import { httpDELETE } from "../../../http/httpDELETE";
import { useEffect, useState } from "react";
import { api } from "../../../utility/api";
import DashboardLoader from "../../components/loader/dashboardLoader";

const AllPrescriptionsItem = ({ visit }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [state, dispatch] = useStore();
  const [isDeleted, setIsDeleted] = useState(false);

  const [edit, setEdit] = useState(false);
  const deleteVisitClickHandler = async (visitId) => {
    if (window.confirm("هل تريد الحذف فعلاً؟") === true) {
      setIsDeleting(true);
      httpDELETE(api.visits.delete_visit + visitId)
        .then((response) => {
          if (response.status === 204) {
            setIsDeleted(true);
            alert("تم حذف الروشتة");
          }
          if (response.status === 404) {
            response.json().then((result) => alert(Object.values(result)[0]));
          }
          if (response.status === 400) {
            response.json().then((result) => alert(Object.values(result)[0]));
          }
          setIsDeleting(false);
        })
        .catch((c) => {
          alert("حدث خطأ بالشبكة أثناء حذف الروشتة!!!");
          setIsDeleting(false);
        });
    }
  };

  
  if (isDeleted) {
    return null;
  }
  return (
    <div className="container p-0 border border-5 border-secondary my-4 bg-dark rounded overflow-hidden">
      {isDeleting && <DashboardLoader text="جارى حذف الروشة" />}

      <div className="row mx-0 mb-1 bg-dark">
        <div className="col-12 p-0 border border border-start-0 border border-end-0 border-5 border-secondary">
          <button
            onClick={() => {
              dispatch("SET_NEW_PRESCRIPTION_TREATMENTS", visit.treatments);
              setEdit(!edit);
            }}
            className="btn text-primary fw-bold mx-1"
          >
            {edit ? "إنهاء التعديل" : "تعديل"}
          </button>
          <button
            onClick={() => deleteVisitClickHandler(visit.id)}
            className="btn text-danger fw-bold mx-1"
          >
            حذف
          </button>
        </div>
        {edit && (
          <div className="col-12 p-0">
            <EditVisitDetailsForm visit={visit} />
          </div>
        )}
      </div>
      <div className="row m-0">
        <div className="col-5 p-2 d-flex flex-column justify-content-start">
          {!edit && visit.diagnose && (
            <div className="mb-5" style={{ boxShadow: "0 0 11px 2px #d0d0e7" }}>
              <div className="card text-bg-dark">
                <h5 className="card-header">التشخيص</h5>
                <div className="card-body">
                  <p className="card-text">{visit.diagnose} </p>
                </div>
              </div>
            </div>
          )}
          {!edit && visit.indications && (
            <div className="mb-5" style={{ boxShadow: "0 0 11px 2px #d0d0e7" }}>
              <div className="card text-bg-dark">
                <h5 className="card-header">تعليمات للمريض</h5>
                <div className="card-body">
                  <p className="card-text">{visit.indications} </p>
                </div>
              </div>
            </div>
          )}
          {!edit && visit.notes && (
            <div className="mb-5" style={{ boxShadow: "0 0 11px 2px #d0d0e7" }}>
              <div className="card text-bg-dark">
                <h5 className="card-header">ملاحظاتك حول الزيارة</h5>
                <div className="card-body">
                  <p className="card-text">{visit.notes}</p>
                </div>
              </div>
            </div>
          )}
          {edit && <EditAddTreatmentForm visitId={visit.id} />}
        </div>
        <div className="col-7 m-0 p-2">
          <Prescription
            treatments={
              edit
                ? state.visits_store.new_prescription_data.treatments
                : visit.treatments
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AllPrescriptionsItem;

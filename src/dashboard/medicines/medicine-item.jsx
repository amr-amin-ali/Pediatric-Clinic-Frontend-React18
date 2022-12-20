import { useState } from "react";
import { Fragment } from "react";
import { useStore } from "../../hooks-store/store";
import { httpDELETE } from "../../http/httpDELETE";
import { api } from "../../utility/api";
import DashboardLoader from "../components/loader/dashboardLoader";
import EditMedicineModal from "./edit-medicine-modal";
import ViewMedicineModal from "./view-medicine-modal";

const MedicineItem = ({ medicineData }) => {
  const dispatch = useStore()[1];
  const editModalId = "editModal" + medicineData.id;
  const viewModalId = "viewModal" + medicineData.id;
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteMedicine = (id) => {
    if (window.confirm("هل تريد الحذف فعلاً؟؟؟")) {
      httpDELETE(api.medicines.delete_medicine + id)
        .then((response) => {
          if (response.status === 204) {
            dispatch("DELETE_MEDICINES", id);
          }
          if (response.status === 404) {
            response.json().then((result) => alert(Object.values(result)[0]));
          }
          if (response.status === 400) {
            response.json().then((result) => alert(Object.values(result)[0]));
          }
          if (response.status === 401) {
            alert("Please login first");
            dispatch("LOGOUT");
          }
  
          setIsDeleting(false);
        })
        .catch((c) => {
          alert("Network error while deleting article!!");
          setIsDeleting(false);
        });
    }
  };

  return (
    <Fragment>
      {isDeleting&& <DashboardLoader text="جارى الحذف" /> }
      <div className="table-hover row mx-0 my-1 rounded border border-2 border-secondary py-2 text-warning">
        {/* Name */}
        <h4 className="col-6 pe-0 border-end border-secondary">
          <svg width="32" height="32" fill="green" viewBox="0 0 16 16">
            <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
            <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
          </svg>
          {medicineData.name}
        </h4>

        {/* Actions */}
        <div className="col-6 d-flex flex-wrap justify-content-evenly">
          <span
            className="fs-6 fw-bold text-decoration-none text-info d-inline-block cursor-pointer"
            data-bs-toggle="modal"
            data-bs-target={"#" + editModalId}
          >
            تعديل
          </span>

          <span
            className="fs-6 fw-bold text-decoration-none link-success d-inline-block cursor-pointer"
            data-bs-toggle="modal"
            data-bs-target={"#" + viewModalId}
          >
            عرض
          </span>

          <span
            className="fs-6 fw-bold text-decoration-none text-danger d-inline-block cursor-pointer"
            onClick={() => deleteMedicine(medicineData.id)}
          >
            حذف
          </span>
        </div>
      </div>
      <EditMedicineModal medicineData={medicineData} modalId={editModalId} />
      <ViewMedicineModal medicineData={medicineData} modalId={viewModalId} />

      {/* <ViewFileModal fileData={medicineData} modalId={viewModalId} />
      <DeleteFileModal fileData={medicineData} modalId={deleteModalId} /> */}
    </Fragment>
  );
};
export default MedicineItem;

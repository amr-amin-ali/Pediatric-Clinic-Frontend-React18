import EditFileModal from "./edit-file-modal";
import ViewFileModal from "./view-file-modal";
import DeleteFileModal from "./delete-file-modal";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const FileItem = ({ fileData }) => {
  const editModalId = "editModal" + fileData.id;
  const viewModalId = "viewModal" + fileData.id;
  const deleteModalId = "deleteModal" + fileData.id;

  return (
    <Fragment>
      <div className="table-hover row mx-0 my-1 rounded border border-2 border-secondary py-2 text-warning">
        {/* Name */}
        <h4 className="col-6 pe-0 border-end border-secondary">
          <svg width="32" height="32" fill="green" viewBox="0 0 16 16">
            <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
            <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
          </svg>
          {fileData.firstName} {fileData.middleName} {fileData.lastName}
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

          <Link
            className="fs-6 fw-bold text-decoration-none text-warning d-inline-block"
            to={`/Dashboard/Prescriptions/${fileData.id}`}
          >
            جميع الروشتات
          </Link>
          <Link
            className="fs-6 fw-bold text-decoration-none text-primary d-inline-block"
            to={`/Dashboard/New-Prescription/${fileData.id}`}
          >
            روشتة جديدة
          </Link>
          <span
            className="fs-6 fw-bold text-decoration-none text-danger d-inline-block cursor-pointer"
            data-bs-toggle="modal"
            data-bs-target={"#" + deleteModalId}
          >
            حذف
          </span>
        </div>
      </div>
        <EditFileModal fileData={fileData} modalId={editModalId} />
        <ViewFileModal fileData={fileData} modalId={viewModalId} />
        <DeleteFileModal fileData={fileData} modalId={deleteModalId} />
    </Fragment>
  );
};
export default FileItem;

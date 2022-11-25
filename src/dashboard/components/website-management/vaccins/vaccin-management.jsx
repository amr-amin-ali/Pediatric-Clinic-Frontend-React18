import { Fragment, useState } from "react";
import { useStore } from "../../../../hooks-store/store";
import { httpGET } from "../../../../http/httpGET";
import { httpDELETE } from "../../../../http/httpDELETE";
import { api } from "../../../../utility/api";
import ShowModalButton from "../../buttons/show-modal-button";
import CreateVaccineModal from "./create-vaccine-modal";
import EditVaccineModal from "./edit-vaccine-modal";
import { openBootstrapModal } from "../../../../utility/open-bootstrap-modal";
import EditAndDeleteButtons from "../../edit-and-delete-btns/edit-and-delete-btns";

const VaccinesManagemt = () => {
  const [state, dispatch] = useStore();
  let vaccinesCounter = 0;

  if (state.vaccins.length === 0) {
    httpGET(api.vaccins.get_all_vaccins).then((vaccins) => {
      if (vaccins.length !== 0) dispatch("INITIATE_VACCINS", vaccins);
    });
  }

  const deleteVaccin = async (vaccinId) => {
    if (window.confirm("هل تريد الحذف فعلاً؟") === true) {
      const response = await httpDELETE(api.vaccins.delete_vaccin + vaccinId);
      if (response.status === 400) {
        alert("Error!!");
        return;
      }
      dispatch("DELETE_VACCINS", vaccinId);
    }
  };

  //////////////////////Edit////////////////////////////////////
  const [vaccinToEdit, setVaccinToEdit] = useState({});
  //////////////////////Edit////////////////////////////////////
  return (
    <Fragment>
      <div className="card text-center m-3">
        <div className="card-header">الخيارات المتاحة</div>
        <div className="card-body">
          <h5 className="card-title mt-4">هذه الإجراءات خاصة باللقاحات</h5>
          <p className="card-text mb-4">
            يمكنك الإختيار ما بين تسجيل لقاح جديد أو تصفح اللقاحات المسجلة أو
            البحث عن لقاح مسجل بالإسم أو حتى حذف لقاح مسجل.
          </p>
          {/* <hr /> */}
          <div className="row m-0">
            <div className="col-md-4 col-sm-8 offset-md-4 offset-sm-2 d-flex justify-content-center">
              <ShowModalButton
                color="blue"
                modalId="#createNewFileModal"
                title="إضافة لقاح"
              />
            </div>
          </div>
        </div>
        <div className="card-footer text-muted">لا تنسى أن تحظى بيوم سعيد</div>
      </div>

      {state.vaccins.length > 0 && (
        <div className="table-responsive p-0 m-3">
          <table className="table table-striped bg-white rounded-top" style={{width:"100%"}}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">الإسم</th>
                <th scope="col">العمر</th>
                <th scope="col">الوصف</th>
                <th scope="col">المواعيد</th>
                <th scope="col">خيارات</th>
              </tr>
            </thead>
            <tbody>
              {state.vaccins.map((vaccin) => {
                vaccinesCounter++;
                return (
                  <tr key={vaccin.id}>
                    <th scope="row">{vaccinesCounter}</th>
                    <td>{vaccin.name}</td>
                    <td>{vaccin.age}</td>
                    <td>{vaccin.description}</td>
                    <td>{vaccin.dates}</td>
                    <td>
                      <EditAndDeleteButtons
                        deleteAction={() => deleteVaccin(vaccin.id)}
                        editAction={() => {
                          setVaccinToEdit(vaccin);
                          openBootstrapModal("showWditVaccinModelBtn");
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <CreateVaccineModal />
      <EditVaccineModal vaccin={vaccinToEdit} />
    </Fragment>
  );
};

export default VaccinesManagemt;

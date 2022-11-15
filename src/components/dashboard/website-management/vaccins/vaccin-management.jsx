import styles from "./edit-delete-buttons.module.css";
import { Fragment } from "react";
import { useStore } from "../../../../hooks-store/store";
import { httpGET } from "../../../../http/httpGET";
import { httpDELETE } from "../../../../http/httpDELETE";
import { api } from "../../../../utility/api";
import ShowModalButton from "../../buttons/show-modal-button";
import CreateVaccineModal from "./create-vaccine-modal";

const VaccinesManagemt = () => {
  const [state, dispatch] = useStore();
  let vaccinesCounter = 0;

  if (state.vaccins.length === 0) {
    httpGET(api.vaccins.get_all_vaccins).then((vaccins) => {
      if (vaccins.length !== 0) dispatch("INITIATE_VACCINS", vaccins);
    });
  }

  const deleteVaccin = async (vaccinId) => {
    const response = await httpDELETE(
      api.vaccins.delete_vaccin + vaccinId
    );
    if (response.status === 400) {
      const data = await response.json();
      console.log(data);
      return;
    }
    dispatch("DELETE_VACCINS", vaccinId);
  };
  return (
    <Fragment>
      <div className="card text-center">
        <div className="card-header">الخيارات المتاحة</div>
        <div className="card-body">
          <h5 className="card-title mt-4">هذه الإجراءات خاصة باللقاحات</h5>
          <p className="card-text mb-4">
            يمكنك الإختيار ما بين تسجيل لقاح جديد أو تصفح اللقاحات المسجلة أو
            البحث عن لقاح مسجل بالإسم أو حتى حذف لقاح مسجل.
          </p>
          {/* <hr /> */}
          <div className="row">
            <div className="col-4 offset-4">
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

      <CreateVaccineModal />

      {state.vaccins.length > 0 && (
        <table className="table table-striped bg-white mt-3 rounded">
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
                  <td className="position-relative">
                    <svg
                      className={styles.deleteButton}
                      onClick={() => deleteVaccin(vaccin.id)}

                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                    </svg>

                    <svg
                      className={styles.editButton}
                      onClick={() => {
                        // setServiceToEdit(servc);
                        // showEditModal();
                      }}
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Fragment>
  );
};

export default VaccinesManagemt;

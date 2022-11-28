import { Fragment, useEffect, useState } from "react";
import { useStore } from "../../../../hooks-store/store";
import { httpGET } from "../../../../http/httpGET";
import { httpDELETE } from "../../../../http/httpDELETE";
import { api } from "../../../../utility/api";
import ShowModalButton from "../../../components/buttons/show-modal-button";
import CreateVaccineModal from "./create-vaccine-modal";
import EditVaccineModal from "./edit-vaccine-modal";
import { openBootstrapModal } from "../../../../utility/open-bootstrap-modal";
import EditAndDeleteButtons from "../../../components/edit-and-delete-btns/edit-and-delete-btns";
import DashboardLoader from "../../../components/loader/dashboardLoader";

const VaccinesManagemt = () => {
  const [state, dispatch] = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [vaccinToEdit, setVaccinToEdit] = useState({});

  let vaccinesCounter = 0;

  const deleteVaccin = async (vaccinId) => {
    if (window.confirm("هل تريد الحذف فعلاً؟") === true) {
      setIsDeleting(true);
      httpDELETE(api.vaccins.delete_vaccin + vaccinId)
        .then((response) => {
          if (response.status === 204) {
            dispatch("DELETE_VACCINS", vaccinId);
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
          alert("Network error while deleting article!!");
          setIsDeleting(false);
        });
    }
  };
  useEffect(() => {
    if (!state.vaccins_store.isInitiated) {
      setIsLoading(true);
      httpGET(api.vaccins.get_all_vaccins)
        .then((vaccins) => {
          if (vaccins.length !== 0) dispatch("INITIATE_VACCINS", vaccins);
          setIsLoading(false);
        })
        .catch((c) => {
          alert("Network error while fetching vaccins!!");
          setIsLoading(false);
        });
    }
  }, []);
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
      {isLoading && <DashboardLoader text="جارى تحميل البيانات" />}
      {!isLoading && state.vaccins_store.vaccins.length < 1 && (
        <h1 className="text-center text-white mt-3">لم تقم بإضافة بيانات</h1>
      )}
      {!isLoading && state.vaccins_store.vaccins.length > 0 && (
        <Fragment>
          <h1 className="text-center text-white mt-3">التطعيمات</h1>

          {isDeleting && <DashboardLoader text="جارى الحذف" />}

          <div className="table-responsive p-0 m-3">
            <table
              className="table table-striped bg-white rounded-top"
              style={{ width: "100%" }}
            >
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
                {state.vaccins_store.vaccins.map((vaccin) => {
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
        </Fragment>
      )}
      <CreateVaccineModal />
      <EditVaccineModal vaccin={vaccinToEdit} />
    </Fragment>
  );
};

export default VaccinesManagemt;

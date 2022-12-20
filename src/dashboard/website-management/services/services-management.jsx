import { Fragment, useEffect, useState } from "react";
import { useStore } from "../../../hooks-store/store";
import { httpDELETE } from "../../../http/httpDELETE";
import { httpGET } from "../../../http/httpGET";
import AddServiceModal from "./add-service-modal";
import EditServiceModal from "./edit-service-modal";
import { api } from "../../../utility/api";
import { openBootstrapModal } from "../../../utility/open-bootstrap-modal";
import EditAndDeleteButtons from "../../components/buttons/edit-and-delete-btns";
import DashboardLoader from "../../components/loader/dashboardLoader";

const ServicesManagement = () => {
  const [state, dispatch] = useStore();
  const [serviceToEdit, setServiceToEdit] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteService = async (serviceId) => {
    if (window.confirm("هل تريد الحذف فعلاً؟") === true) {
      setIsDeleting(true);
      await httpDELETE(api.clinic_services.delete_service + serviceId)
        .then((response) => {
          if (response.status === 204) {
            dispatch("DELETE_CLINIC_SERVICE", serviceId);
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
  useEffect(() => {
    if (!state.clinic_services_store.isInitiated) {
      setIsLoading(true);
      httpGET(api.clinic_services.get_all_services)
        .then((services) => {
          if (services.length !== 0)
            dispatch("INITIATE_CLINIC_SERVICES", services);
          setIsLoading(false);
        })
        .catch((c) => {
          alert("Network error while fetching services!!");
          setIsLoading(false);
        });
    }
  }, []);
  return (
    <div className="container">
      <div className="card text-center m-3">
        <div className="card-header">الخيارات المتاحة</div>
        <div className="card-body">
          <h5 className="card-title mt-4">
            هذه الإجراءات خاصة بخدمات ىالعيادة
          </h5>
          <p className="card-text mb-4">
            يمكنك الإختيار ما بين إضافة خدمة جديدة أو تعديل بيانات خدمة تم
            إضافتها أو حتى حذف خدمة.
          </p>

          <div className="row justify-content-center m-0">
            <div className="col-4">
              <button
                type="button"
                className="my-btn my-primary btn btn-primary w-100 py-3 fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#addServiceModal"
              >
                إضافة خدمة
              </button>
            </div>
          </div>
        </div>
        <div className="card-footer text-muted">لا تنسى أن تحظى بيوم سعيد</div>
      </div>

      <div className="row m-3 justify-content-between">
        {isLoading && <DashboardLoader text="جارى تحميل البيانات" />}

        {!isLoading && state.clinic_services_store.services.length > 0 && (
          <Fragment>
            <h1 className="text-center text-white mt-3">الخدمات الحالية</h1>
            {isDeleting && <DashboardLoader text="جارى الحذف" />}

            {state.clinic_services_store.services.map((servc) => (
              <div
                key={servc.id}
                className="col-sm-12 col-lg-5 bg-white position-relative  border-success border-opacity-50 rounded-3 p-1 my-1"
              >
                <div className="top-0 end-0 position-absolute">
                  <EditAndDeleteButtons
                    deleteAction={() => deleteService(servc.id)}
                    editAction={() => {
                      setServiceToEdit(servc);
                      openBootstrapModal("showEditServiceModelBtn");
                    }}
                  />
                </div>
                {servc.image && (
                  <img
                    src={api.base_url + servc.image}
                    className="service-image img-fluid rounded-top"
                    style={{ height: "13rem", width: "100%" }}
                    alt={servc.title}
                  />
                )}
                {!servc.image && (
                  <img
                    src="https://www.drrajeshclinic.com/images/logo.png"
                    className="service-image img-fluid rounded-top"
                    style={{ height: "13rem", width: "100%" }}
                    alt="https://www.drrajeshclinic.com/images/logo.png"
                  />
                )}
                <h4 className="p-2 mb-0">{servc.title}</h4>
                <p className="p-1 mb-5 text-truncate">{servc.text} </p>
              </div>
            ))}
          </Fragment>
        )}

        {!isLoading && state.clinic_services_store.services.length < 1 && (
          <h1 className="text-center text-white mt-3">
            لم تقم بإضافة خدمات حتى الآن
          </h1>
        )}

        <AddServiceModal />
        <EditServiceModal service={serviceToEdit} />
      </div>
    </div>
  );
};

export default ServicesManagement;

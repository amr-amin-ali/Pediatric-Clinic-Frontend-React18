import { useState } from "react";
import { useStore } from "../../../../hooks-store/store";
import { httpDELETE } from "../../../../http/httpDELETE";
import { httpGET } from "../../../../http/httpGET";
import { api } from "../../../../utility/api";
import ShowModalButton from "../../buttons/show-modal-button";
import styles from "./services-mgmt.module.css";
import AddServiceModal from "./add-service-modal";
import EditServiceModal from "./edit-service-modal";
import { openBootstrapModal } from "../../../../utility/open-bootstrap-modal";
import EditAndDeleteButtons from "../../edit-and-delete-btns/edit-and-delete-btns";

const ServicesManagement = () => {
  const [state, dispatch] = useStore();
  if (state.clinic_services.length === 0) {
    httpGET(api.clinic_services.get_all_services).then((services) => {
      if (services.length !== 0) dispatch("INITIATE_CLINIC_SERVICES", services);
    });
  }

  const deleteService = async (serviceId) => {
    if (window.confirm("هل تريد الحذف فعلاً؟") == true) {
      const response = await httpDELETE(
        api.clinic_services.delete_service + serviceId
      );
      if (response.status === 400) {
        alert("Error!!");
        return;
      }
      dispatch("DELETE_CLINIC_SERVICE", serviceId);
    }
  };
  const [serviceToEdit, setServiceToEdit] = useState({});

  return (
    <div className="container">
      <div className="card text-center m-3">
        <div className="card-header">الخيارات المتاحة</div>
        <div className="card-body">
          <h5 className="card-title mt-4">هذه الإجراءات خاصة بخدمات العيادة</h5>
          <p className="card-text mb-4">
            يمكنك الإختيار ما بين إضافة خدة أو إستعراض الخدمات الحالية أو أو حتى
            حذف خدمة.
          </p>

          <div className="row m-0">
            <div className="col-md-4 col-sm-8 offset-md-4 offset-sm-2 d-flex justify-content-center">
              <ShowModalButton
                color="blue"
                modalId="#addServiceModal"
                title="إضافة خدمة"
              />
            </div>
          </div>
        </div>
        <div className="card-footer text-muted">لا تنسى أن تحظى بيوم سعيد</div>
      </div>

      <div className="row m-3 justify-content-between">
        {state.clinic_services.length !== 0 && (
          <h1 className="text-center text-white mt-3">الخدمات الحالية</h1>
        )}
        {state.clinic_services.length === 0 && (
          <h3 className="text-info text-center my-5">
            لم تقم بإضافة خدمات حتى الآن
          </h3>
        )}
        {state.clinic_services.map((servc) => (
          <div
            key={servc.id}
            className="col-sm-12 col-lg-5 bg-white position-relative  border-success border-opacity-50 rounded-3 p-1 my-1"
          >
            <div className="top-0 end-0 position-absolute">

            <EditAndDeleteButtons deleteAction={() => deleteService(servc.id)} editAction={() => {
              setServiceToEdit(servc);
              openBootstrapModal("showEditServiceModelBtn");
            }} />
            </div>
            {servc.image && (
              <img
                src={api.base_url + servc.image}
                className="service-image img-fluid rounded-top"
                style={{ height: "13rem", width: "100%" }}
              />
            )}
            {!servc.image && (
              <img
                src="https://www.drrajeshclinic.com/images/logo.png"
                className="service-image img-fluid rounded-top"
                style={{ height: "13rem", width: "100%" }}
              />
            )}
            <h4 className="p-2 mb-0">{servc.title}</h4>
            <p className="p-1 mb-5 text-truncate">{servc.text} </p>
          </div>
        ))}
        <AddServiceModal />
        <EditServiceModal service={serviceToEdit} />
      </div>
    </div>
  );
};

export default ServicesManagement;

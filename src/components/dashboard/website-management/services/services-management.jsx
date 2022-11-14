import { useEffect, useState } from "react";
import { useStore } from "../../../../hooks-store/store";
import { httpDELETE } from "../../../../http/httpDELETE";
import { httpGET } from "../../../../http/httpGET";
import { api } from "../../../../utility/api";
import ShowModalButton from "../../buttons/show-modal-button";
import AddClinicServiceModal from "./add-clinic-service-modal";
import styles from "./services-mgmt.module.css";
import Button from "../../buttons/button";
import EditClinicServiceModal from "./edit-clinic-service-modal";

const ServicesManagement = () => {
  const [state, dispatch] = useStore();
  if (state.clinic_services.length === 0) {
    httpGET(api.clinic_services.get_all_services).then((services) => {
      if (services.length !== 0) dispatch("INITIATE_CLINIC_SERVICES", services);
    });
  }

  const deleteService = async (serviceId) => {
    const response = await httpDELETE(
      api.clinic_services.delete_service + serviceId
    );
    if (response.status === 400) {
      const data = await response.json();
      console.log(data);
      return;
    }
    dispatch("DELETE_CLINIC_SERVICE", serviceId);
  };
  const [serviceToEdit, setServiceToEdit] = useState(null);
  ///////////////////////////////////////////////////
  const [showMyEditModal, setShowMyEditModal] = useState(false);
  const showEditModal = () => {
    setShowMyEditModal(true);
  };
  const closeEditModal = () => {
    setShowMyEditModal(false);
    setServiceToEdit(null);
  };
  const [showMyAddModal, setShowMyAddModal] = useState(false);
  const showAddModal = () => {
    setShowMyAddModal(true);
  };
  const closeAddModal = () => {
    setShowMyAddModal(false);
  };
  ///////////////////////////////////////////////////

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">الخيارات المتاحة</div>
        <div className="card-body">
          <h5 className="card-title mt-4">هذه الإجراءات خاصة بملفات المرضى</h5>
          <p className="card-text mb-4">
            يمكنك الإختيار ما بين إنشاء ملف جديد لحالة جديدة أو فتح ملف تم
            إنشائه من قبل أو حتى عرض جميع الملفات المسجلة مسبقا
          </p>
          <hr />
          <div className="row mt-5 mb-5 justify-content-around">
            <div className="col-4">
              <Button
                color="blue"
                title="إضافة خدمة"
                clickHandler={showAddModal}
              />
            </div>
            <div className="col-4">
              <ShowModalButton
                color="green"
                modalId="#searchForPatientFileModal"
                title="بحث عن خدمة"
              />
            </div>
          </div>
        </div>
        <div className="card-footer text-muted">لا تنسى أن تحظى بيوم سعيد</div>
      </div>

      <AddClinicServiceModal
        showModal={showMyAddModal}
        closeModal={closeAddModal}
      />
      {/* <SearchFilesModal /> */}

      <div className="row justify-content-between">
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
            className="col-5 bg-white position-relative  border-success border-opacity-50 rounded-3 m-2 p-1"
          >
            <span
              className={styles.deleteButton}
              onClick={() => deleteService(servc.id)}
            >
              <svg viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
              </svg>
            </span>
            <span
              className={styles.editButton}
              onClick={() => {
                setServiceToEdit(servc);
                showEditModal();
              }}
            >
              <svg viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
              </svg>
            </span>
            {servc.image && (
              <img
                src={api.base_url + "/" + servc.image}
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
            <p className="p-1 mb-5">{servc.text} </p>
          </div>
        ))}
        {serviceToEdit && (
          <EditClinicServiceModal
            showModal={showMyEditModal}
            closeModal={closeEditModal}
            service={serviceToEdit}
          />
        )}
      </div>
    </div>
  );
};

export default ServicesManagement;

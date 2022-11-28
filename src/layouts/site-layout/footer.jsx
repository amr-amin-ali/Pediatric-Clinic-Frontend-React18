import { Fragment } from "react";
import DeveloperModal from "./developer-modal";
import { createPortal } from "react-dom";
import { useStore } from "../../hooks-store/store";

const Footer = () => {
  const state = useStore(false)[0];

  return createPortal(
    <Fragment>
      <footer className="border-top border-3 border-danger bg-white text-danger d-block">
        {
          <div
            className="p-3 bg-danger text-white"
            style={{ fontFamily: "var(--hacen-font)" }}
          >
            {state.metaDatas_store.metaDatas.clinicAddress && (
              <Fragment>
                <h2>العنوان</h2>
                <p>{state.metaDatas_store.metaDatas.clinicAddress}</p>
              </Fragment>
            )}
            {state.metaDatas_store.metaDatas.clinicPhone && (
              <Fragment>
                <h2>موبايل</h2>
                <p>{state.metaDatas_store.metaDatas.clinicPhone}</p>
              </Fragment>
            )}
            {state.metaDatas_store.metaDatas.clinicOpenAt &&
              state.metaDatas_store.metaDatas.clinicCloseAt && (
                <Fragment>
                  <h2>مواعيد العمل</h2>
                  <p>
                    يومياً من {state.metaDatas_store.metaDatas.clinicOpenAt} إلى
                    {state.metaDatas_store.metaDatas.clinicCloseAt} ماعدا
                    {state.metaDatas_store.metaDatas.clinicHoliday &&
                      state.metaDatas_store.metaDatas.clinicHoliday}
                  </p>
                </Fragment>
              )}
          </div>
        }
        <p className="text-center m-0">
          جميع الحقوق محفوظه &copy;
          {state.metaDatas_store.metaDatas.clinicName ?? " إسم العيادة "}
        </p>
        <p className="text-muted text-center m-0">
          Developed by SE:
          <span
            className="text-success"
            data-bs-toggle="modal"
            data-bs-target="#developerModal"
            style={{ cursor: "pointer" }}
          >
            Amr Amin
          </span>
        </p>
        <DeveloperModal />
      </footer>
    </Fragment>,
    document.getElementById("footer-portal")
  );
};
export default Footer;

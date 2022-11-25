import { Fragment } from "react";
import DeveloperModal from "./developer-modal";
import { createPortal } from "react-dom";
import { useStore } from "../../hooks-store/store";

const Footer = () => {
  const state = useStore(false)[0];

  return createPortal(
    <Fragment>
      <footer className="border-top border-3 border-danger bg-white text-danger d-block">
        <div className="p-3 bg-danger text-white" style={{fontFamily:"var(--hacen-font)"}}>
          <h2>العنوان</h2>
          <p>{state.metaDatas.clinicAddress}</p>
          <h2>موبايل</h2>
          <p>{state.metaDatas.clinicPhone}</p>
          <h2>مواعيد العمل</h2>
          <p>
            يومياً من {state.metaDatas.clinicOpenAt} إلى{" "}
            {state.metaDatas.clinicCloseAt} ماعدا{" "}
            {state.metaDatas.clinicHoliday}
          </p>
        </div>
        <p className="text-center m-0">
          جميع الحقوق محفوظه &copy;{" "}
          {state.metaDatas.clinicName ?? " إسم العيادة "}
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

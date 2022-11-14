import { Fragment } from "react";
import { createPortal } from "react-dom";
import Backdrop from "./backdrop";
import Overlay from "./overlay";
const ModalLg = ({ show, children, closed }) => {
  return (
    <Fragment>
      {createPortal(
        <Backdrop show={show} />,
        document.getElementById("backdrop-root")
      )}
      {createPortal(
        <Overlay show={show} closed={closed}>
          {children}
        </Overlay>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ModalLg;

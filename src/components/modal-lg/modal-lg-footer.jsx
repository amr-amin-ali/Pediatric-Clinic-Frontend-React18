import { Fragment } from "react";

const ModalLgFooter = ({ children }) => {
  return (
    <Fragment>
      <hr className="text-blue-dark opacity-100" />
      <div className="row pb-3 m-0 d-flex flex-row justify-content-center">
        {children}
      </div>
    </Fragment>
  );
};

export default ModalLgFooter;

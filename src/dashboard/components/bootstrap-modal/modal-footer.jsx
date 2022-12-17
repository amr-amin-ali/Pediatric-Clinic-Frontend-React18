import { Fragment } from "react";

const ModalFooter = (props) => {
  return (
   <Fragment>
     <hr className="text-blue-dark opacity-100"/>
    <div className="pb-3 d-flex flex-row justify-content-center">
        {props.children}
    </div>
   </Fragment>
    );
};
export default ModalFooter;

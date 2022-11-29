import { Fragment } from "react";
import Prescription from "./prescription-paper/prescription";
import { Link } from "react-router-dom";
const ViewAllPrescriptions = () => {
  return (
    <Fragment>
      <div className="row m-0 mb-4">
        <div className="col-5 p-2 d-flex flex-column justify-content-start">
          <div className="row m-0">
            <div className="col-3">
              <Link to="/" className="link-danger">تعديل</Link>
            </div>
            <div className="col-3">
            <Link to="/" className="link-danger">التحاليل</Link>
            </div>
            <div className="col-3">
            <Link to="/" className="link-danger">الأشعة</Link>
            </div>
            <div className="col-3">
            <button className="link-danger">حذف</button>
            </div>
          </div>
          <div className='mb-5' style={{boxShadow: "0 0 11px 2px #d0d0e7"}} >
            <div className="card text-bg-dark">
              <h5 className="card-header">التشخيص</h5>
              <div className="card-body">
                <p className="card-text">
                نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه
                  وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه ... بروشور او
                  فلاير
                </p>
              </div>
            </div>
          </div>
          <div className='mb-5' style={{boxShadow: "0 0 11px 2px #d0d0e7"}} >
            <div className="card text-bg-dark">
              <h5 className="card-header">تعليمات للمريض</h5>
              <div className="card-body">
                <p className="card-text">
                  نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه
                  وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه ... بروشور او
                  فلاير
                </p>
              </div>
            </div>
          </div>
          <div className='mb-5' style={{boxShadow: "0 0 11px 2px #d0d0e7"}} >
            <div className="card text-bg-dark">
              <h5 className="card-header">تقييم الزيارة</h5>
              <div className="card-body">
                <p className="card-text">
                  نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه
                  وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه ... بروشور او
                  فلاير
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-7 m-0 p-0">
          <Prescription />
        </div>
      </div>
    </Fragment>
  );
};
export default ViewAllPrescriptions;

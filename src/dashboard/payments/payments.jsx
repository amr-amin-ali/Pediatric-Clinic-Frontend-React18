import { Fragment, useEffect, useState } from "react";
import { useStore } from "../../hooks-store/store";
import DashboardLoader from "../components/loader/dashboardLoader";
import { httpDELETE } from "../../http/httpDELETE";
import { api } from "../../utility/api";
import { httpGET } from "../../http/httpGET";
import { cSharpDateToJsDateConverter } from "../../utility/date-time-functionalities";
import DeletePaymentModal from "./delete-payment-modal";
import CreatePaymentModal from "./create-payment-modal";

const Payments = () => {
  document.title = "المدفوعات";
  const [state, dispatch] = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePurchase = async (purchaseId) => {
    if (window.confirm("هل تريد الحذف فعلاً؟") === true) {
      setIsDeleting(true);
      httpDELETE(api.purchases.delete_purchase + purchaseId)
        .then((response) => {
          if (response.status === 204) {
            dispatch("DELETE_PURCHASE", purchaseId);
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
    if (!state.payments_store.isInitiated) {
      setIsLoading(true);
      httpGET(api.payments.get_all_payments)
        .then((purchaeses) => {
          if (purchaeses.length !== 0)
            dispatch("INITIATE_PAYMENTS", purchaeses);
          setIsLoading(false);
        })
        .catch((c) => {
          alert("Network error while fetching payments!!");
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <Fragment>
      <div className="col-8">
        <div className="card text-center m-3">
          <div className="card-header">الخيارات المتاحة</div>
          <div className="card-body">
            <h5 className="card-title mt-4">
              هذه الإجراءات خاصة بمدفوعات العيادة
            </h5>
            <p className="card-text mb-4">
              يمكنك الإختيار ما بين تسجيل ما تم دفعه أو تعديل قيمة تم دفعها
              مسبقا أو عرض مدفوعات شهر محدد أو عرض جميع المدفوعات أو حتى حذفها.
            </p>
            <hr />
            <div className="row justify-content-center m-0">
              <div className="col-4">
                <button
                  type="button"
                  className="my-btn my-primary btn btn-primary w-100 py-3 fw-bold"
                  data-bs-toggle="modal"
                  data-bs-target="#createNewPaymentModal"
                >
                  تسجيل مدفوعات
                </button>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            لا تنسى أن تحظى بيوم سعيد
          </div>
        </div>
        <CreatePaymentModal />

        {isLoading && <DashboardLoader text="جارى تحميل البيانات" />}
        {!isLoading && state.payments_store.payments.length < 1 && (
          <h1 className="text-center text-white mt-3">لم تقم بتسجيل مدفوعات</h1>
        )}
        {!isLoading && state.payments_store.payments.length > 0 && (
          <h1 className="text-center text-white mt-3"> مدفوعاتك</h1>
        )}
        {isDeleting && <DashboardLoader text="جارى الحذف" />}
        {!isLoading && state.payments_store.payments.length > 0 && (
          <div className="table-responsive p-0 m-3">
            <table
              className="table table-dark table-striped rounded-top"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th scope="col">الغاز</th>
                  <th scope="col">الماء</th>
                  <th scope="col">الكهرباء</th>
                  <th scope="col">الإيجار</th>
                  <th scope="col">راتب السكرتيرة</th>
                  <th scope="col">خيارات</th>
                </tr>
              </thead>
              <tbody>
                {state.payments_store.payments.map((payment) => {
                  return (
                    <Fragment key={payment.id}>
                      <tr>
                        <td colSpan={6} className="text-center text-warning">
                          مدفوعات شهر {payment.month} عام {payment.year}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {payment.water}
                          <br />
                          <small className="fw-lighter fst-italic">
                            {cSharpDateToJsDateConverter(
                              payment.waterPaymentDate
                            )}
                          </small>
                        </td>

                        <td>
                          {payment.gas}
                          <br />
                          <small className="fw-lighter fst-italic">
                            {cSharpDateToJsDateConverter(
                              payment.gasPaymentDate
                            )}
                          </small>
                        </td>

                        <td>
                          {payment.electricity}
                          <br />
                          <small className="fw-lighter fst-italic">
                            {cSharpDateToJsDateConverter(
                              payment.electricityPaymentDate
                            )}
                          </small>
                        </td>

                        <td>
                          {payment.secretaryWage}
                          <br />
                          <small className="fw-lighter fst-italic">
                            {cSharpDateToJsDateConverter(
                              payment.secretaryWagePaymentDate
                            )}
                          </small>
                        </td>

                        <td>
                          {payment.rent}
                          <br />
                          <small className="fw-lighter fst-italic">
                            {cSharpDateToJsDateConverter(
                              payment.rentPaymentDate
                            )}
                          </small>
                        </td>

                        <td>
                          <span
                            className="fs-6 fw-bold text-danger cursor-pointer"
                            data-bs-toggle="modal"
                            data-bs-target={"#deletePaymentModal" + payment.id}
                          >
                            حذف
                          </span>
                          <DeletePaymentModal
                            modalId={"deletePaymentModal" + payment.id}
                            payment={payment}
                          />
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default Payments;

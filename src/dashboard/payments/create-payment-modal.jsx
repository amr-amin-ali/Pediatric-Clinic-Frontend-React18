import DateTimeInput from "../components/inputs/date-time-input";
import ModalFooter from "../components/bootstrap-modal/modal-footer";
import ModalHeader from "../components/bootstrap-modal/modal-header";
import NumberInput from "../components/inputs/number-input";
import { useStore } from "../../hooks-store/store";
import { Fragment, useState } from "react";
import { api } from "../../utility/api";
import DashboardLoader from "../components/loader/dashboardLoader";
import { httpPOST } from "../../http/httpPOST";
import { closeBootstrapModal } from "../../utility/close-bootstrap-modal";

const CreatePaymentModal = () => {
  const [state, dispatch] = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payment, setPayment] = useState({});
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState([]);

  const inputChangeHandler = (event) => {
    const value = event.target.value.trim();
    const name = event.target.name.trim();
    const paymentData = { ...payment };
    paymentData[name] = value;
    setPayment({ ...paymentData });
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log(payment);
    // return
    setIsSubmitting(true);
    httpPOST(api.payments.create_payment, {
      month: payment.month,
      year: payment.year,
      water: payment.water,
      waterPaymentDate: payment.waterPaymentDate,
      gas: payment.gas,
      gasPaymentDate: payment.gasPaymentDate,
      electricity: payment.electricity,
      electricityPaymentDate: payment.electricityPaymentDate,
      rent: payment.rent,
      rentPaymentDate: payment.rentPaymentDate,
      secretaryWage: payment.secretaryWage,
      secretaryWagePaymentDate: payment.secretaryWagePaymentDate,
    })
      .then((response) => {
        if (response.status === 400 || response.status === 422) {
          response.json().then((result) => {
            console.log(result);
            const backendErrors = [];
            for (const key in result) {
              backendErrors.push(`${key}: ${result[key]}`);
            }
            setServerErrors(backendErrors);
            setIsSubmitting(false);
          });
          setIsSubmitting(false);
        }
        if (response.status === 401) {
          alert("Please login first");
          dispatch("LOGOUT");
          closeBootstrapModal();
        }
        if (response.status === 201) {
          response.json().then((data) => {
            dispatch("ADD_PAYMENT_TO_STORE", data);

            setPayment({});
            setIsSubmitting(false);
            closeBootstrapModal();
          });
        }
      })
      .catch((c) => {
        alert("Network error while adding your payment!!");
        setIsSubmitting(false);
        closeBootstrapModal();
      });
  };
  return (
    <div>
      <div
        className="modal fade bg-blue-dark"
        data-bs-backdrop="static"
        id="createNewPaymentModal"
        tabIndex="-1"
        aria-labelledby="createNewPaymentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content bg-blue-light">
            <form>
              <ModalHeader title="تسجيل مدفوعات" />
              {serverErrors.length > 0 && (
                <div
                  className="alert alert-danger alert-dismissible fade show border-0"
                  role="alert"
                >
                  <button
                    type="button"
                    className="btn-close bg-danger"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                  <ul className="text-danger" dir="ltr">
                    {serverErrors &&
                      serverErrors.map((error) => {
                        return <li key={error}>{error}</li>;
                      })}
                  </ul>
                </div>
              )}
              {isSubmitting && <DashboardLoader text="تسجيل المدفوعات..." />}
              {!isSubmitting && (
                <Fragment>
                  <div className="p-3">
                    <div className="d-flex justify-content-between my-1 col-8 offset-4 border-bottom border-2 border-secondary">
                      <div className="p-1 col-6">
                        <NumberInput
                          name="month"
                          placeholder="شهر"
                          onChangeHandler={inputChangeHandler}
                        />
                        {errors.month && (
                          <span style={{ color: "red" }}>{errors.month}</span>
                        )}
                      </div>
                      <div className="p-1 col-6">
                        <NumberInput
                          name="year"
                          placeholder="عام"
                          onChangeHandler={inputChangeHandler}
                        />
                        {errors.year && (
                          <span style={{ color: "red" }}>{errors.year}</span>
                        )}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-1">
                      <div className="col-3">
                        <NumberInput
                          name="water"
                          placeholder="مياه"
                          onChangeHandler={inputChangeHandler}
                        />
                      </div>
                      <div className="col-8">
                        <DateTimeInput
                          type="date"
                          name="waterPaymentDate"
                          title="تاريخ دفع المياه"
                          onChangeHandler={inputChangeHandler}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between my-1">
                      <div className="col-3">
                        <NumberInput
                          name="gas"
                          placeholder="غاز"
                          onChangeHandler={inputChangeHandler}
                        />
                      </div>
                      <div className="col-8">
                        <DateTimeInput
                          type="date"
                          name="gasPaymentDate"
                          title="تاريخ دفع الغاز"
                          onChangeHandler={inputChangeHandler}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between my-1">
                      <div className="col-3">
                        <NumberInput
                          name="electricity"
                          placeholder="كهرباء"
                          onChangeHandler={inputChangeHandler}
                        />
                      </div>
                      <div className="col-8">
                        <DateTimeInput
                          type="date"
                          name="electricityPaymentDate"
                          title="تاريخ دفع الكهرباء"
                          onChangeHandler={inputChangeHandler}
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-1">
                      <div className="col-3">
                        <NumberInput
                          name="rent"
                          placeholder="إيجار"
                          onChangeHandler={inputChangeHandler}
                        />
                      </div>
                      <div className="col-8">
                        <DateTimeInput
                          type="date"
                          name="rentPaymentDate"
                          title="تاريخ دفع الإيجار"
                          onChangeHandler={inputChangeHandler}
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between my-1">
                      <div className="col-3">
                        <NumberInput
                          name="secretaryWage"
                          placeholder="مرتب السكرتيره"
                          onChangeHandler={inputChangeHandler}
                        />
                      </div>
                      <div className="col-8">
                        <DateTimeInput
                          type="date"
                          name="secretaryWagePaymentDate"
                          title="تاريخ دفع المرتب"
                          onChangeHandler={inputChangeHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <ModalFooter>
                    <button
                      onClick={submitFormHandler}
                      type="button"
                      className="my-btn my-success btn btn-success py-3 px-5 fw-bold"
                      style={{ width: "190px" }}
                    >
                      تسجيل
                    </button>
                    <button
                      type="reset"
                      style={{
                        backgroundColor: "var(--blue-dark)",
                        width: "190px",
                      }}
                      className="my-btn btn py-3 px-5 fw-bold btn-dark text-white"
                    >
                      تفريغ الحقول
                    </button>
                  </ModalFooter>
                </Fragment>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePaymentModal;

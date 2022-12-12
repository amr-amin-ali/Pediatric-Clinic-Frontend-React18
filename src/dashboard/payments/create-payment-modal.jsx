import ResetButton from "../components/buttons/reset-button";
import SubmitButton from "../components/buttons/submit-button";
import DateInput from "../components/inputs/date-input";
import ModalFooter from "../components/bootstrap-modal/modal-footer";
import ModalHeader from "../components/bootstrap-modal/modal-header";
import NumberInput from "../components/inputs/number-input";
import SelectInput from "../components/inputs/select-input";
import { useStore } from "../../hooks-store/store";
import { Fragment, useState } from "react";
import { useEffect } from "react";
import { httpGET } from "../../http/httpGET";
import { api } from "../../utility/api";
import DashboardLoader from "../components/loader/dashboardLoader";
import { httpPOST } from "../../http/httpPOST";
import { closeBootstrapModal } from "../../utility/close-bootstrap-modal";

const CreatePaymentModal = () => {
  const [state, dispatch] = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payment, setPayment] = useState({});
  const [errors, setErrors] = useState({});
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
        if (response.status === 400) {
          response.json().then((result) => alert(Object.values(result)[0]));
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
                        <DateInput
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
                        <DateInput
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
                        <DateInput
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
                        <DateInput
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
                        <DateInput
                          name="secretaryWagePaymentDate"
                          title="تاريخ دفع المرتب"
                          onChangeHandler={inputChangeHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <ModalFooter>
                    <SubmitButton
                      title="تسجيل"
                      clickHandler={submitFormHandler}
                    />
                    <ResetButton title="تفريغ الحقول" />
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

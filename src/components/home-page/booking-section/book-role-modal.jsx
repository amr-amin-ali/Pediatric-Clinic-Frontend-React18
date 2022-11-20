import { useState } from "react";
import { httpPOST } from "../../../http/httpPOST";
import { bookingModel } from "../../../models/bookingModel";
import { api } from "../../../utility/api";
import SiteLoadindSpiner from "../site-loading-spinner";

const BookRoleModal = ({ afterSuccessAction }) => {
  const [model, setModel] = useState(bookingModel);
  const [errors, setErrors] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "name") {
      if (!value.trim()) {
        setErrors("أدخل إسمك للحجز.");
      } else {
        setModel({ ...model, name: value });
        setErrors(null);
      }
    }

    if (name === "phone") {
      setModel({ ...model, phone: value });
    }

    if (name === "address") {
      setModel({ ...model, address: value });
    }
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    if (!model.name) {
      setErrors("أدخل إسمك للحجز.");
      return;
    }

    if (errors === null) {
      setIsSubmitting(true);
      const response = await httpPOST(api.bookings.book, {
        name: model.name,
        phone: model.phone,
        address: model.address,
      });
      if (response.status === 201) {
        const todayDate = new Date().toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        localStorage.setItem("booked-at", todayDate);

        setModel(bookingModel);
        setIsSubmitting(false);
        afterSuccessAction();
        const resetBtn = document.getElementById("resetBookingRoleModal");
        const hideModalBtn = document.getElementById("closeBookingRoleModal");
        resetBtn.click();
        hideModalBtn.click();
        // document.querySelector('').click();
      } else {
        alert(`server response not ok: ${response.status}`);
      }
    }
    return;
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centeredz modal-fullscreen">
        <div className="modal-content">
          {!isSubmitting && (
            <h5 className="modal-title text-center pt-5" id="exampleModalLabel">
              إحجز الآن
            </h5>
          )}
          {isSubmitting && <SiteLoadindSpiner text="يتم الحجز" />}
          {/* onSubmit={(_)=>_.preventDefault()} */}
          <form className="m-auto col-sm-12 col-md-8">
            {!isSubmitting && (
              <div className="modal-body">
                <input
                  onChange={inputChangeHandler}
                  name="name"
                  className="form-control form-control-lg mt-2"
                  type="text"
                  placeholder="الإسم"
                  required
                />
                {errors && <span style={{ color: "red" }}>{errors}</span>}

                <input
                  onChange={inputChangeHandler}
                  name="phone"
                  className="form-control form-control-lg mt-2"
                  type="text"
                  placeholder="موبايل"
                  required
                />
                <input
                  onChange={inputChangeHandler}
                  name="address"
                  className="form-control form-control-lg mt-2"
                  type="text"
                  placeholder="العنوان"
                  required
                />
              </div>
            )}
            <div className="modal-footer border-0">
              <button
                style={{ visibility: `${isSubmitting ? "hidden" : "visible"}` }}
                id="closeBookingRoleModal"
                type="button"
                className="btn btn-sm btn-secondary"
                data-bs-dismiss="modal"
              >
                إلغاء
              </button>
              <button
                style={{ visibility: `${isSubmitting ? "hidden" : "visible"}` }}
                onClick={submitFormHandler}
                type="submit"
                className="btn btn-success text-white"
              >
                تأكيد
              </button>
              <button
                id="resetBookingRoleModal"
                type="reset"
                hidden
                className="btn btn-success text-white"
              >
                تأكيد
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default BookRoleModal;

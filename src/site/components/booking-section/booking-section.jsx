import { useState } from "react";
import { Fragment } from "react";
import BookRoleModal from "./book-role-modal";
const BookingSection = () => {
  const setReRenderBookingSection = useState(false)[1];
  const todayDate = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (localStorage.getItem("booked-at") === todayDate) {
    return (
      <div className="bg-success d-flex flex-column justify-content-evenly py-5">
        <div className="text-center icon-container">
          <svg
            width="64"
            height="64"
            fill="#0f0"
            className="bi bi-check2-circle"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
          </svg>
        </div>
        <h1 className="text-center p-1 text-white">
          تم تأكيد حجزك اليوم بنجاح
        </h1>
      </div>
    );
  }
  return (
    <Fragment>
      <section id="book-role" className="appointment">
        <div className="layy  py-5 px-2 text-white">
          <div className="container">
            <div className="title-another text-center row">
              <h4 className="fs-1">عيادة متخصصه</h4>
              <h2 style={{ fontSize: "52px" }}>دكتورة خبيرة و مؤهله</h2>
              <h3 className="fs-1m">لتوقيع كشف إحترافى</h3>
              <div className="btn-ro text-center mt-5">
                <button
                  id="blog"
                  className="btn px-5 bg-white text-success font-family-hacen"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <span className="appointment-btn-text fw-bold fs-1">
                    <svg
                      style={{
                        width: "27px",
                        height: "27px",
                        fontWeight: "bold",
                      }}
                      className="me-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#016269"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z" />
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                    </svg>
                    حجـز دور
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BookRoleModal afterSuccessAction={()=>setReRenderBookingSection(true)} />
    </Fragment>
  );
};
export default BookingSection;

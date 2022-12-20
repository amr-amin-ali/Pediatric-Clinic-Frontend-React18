import "./bookings.css";
import { useStore } from "../../hooks-store/store";
import { httpGET } from "../../http/httpGET";
import { httpDELETE } from "../../http/httpDELETE";
import { api } from "../../utility/api";
import FeedingBottleSvg from "../components/icons/feeding-bottle-svg";
import { useEffect } from "react";
const Bookings = () => {
  document.title = "الحجوزات";
  const [state, dispatch] = useStore();

  const deleteBooking = async (bookingId) => {
    const response = await httpDELETE(api.bookings.delete_booking + bookingId);
    if (response.status === 400) {
      response.json().then((result) => alert(Object.values(result)[0]));
      return;
    }
    if (response.status === 404) {
      alert("NotFound");
      return;
    }
    if (response.status === 401) {
      alert("Please login first");
      dispatch("LOGOUT");
    }
    if (response.status === 204) {
      dispatch("DELETE_BOOKING", bookingId);
    }
  };
  useEffect(() => {
    //get all bookings from the server
    if (!state.bookings_store.isInitiated) {
      httpGET(api.bookings.get_all_bookings).then((bookings) => {
        if (bookings.length !== 0) dispatch("INITIATE_BOOKINGS", bookings);
      });
    }
  }, []);

  return (
    <div className="col-lg-6 mx-auto col-sm-12 px- py-3">
      <div
        className="menu rounded bg-blue-light overflow-hidden"
        style={{ height: "484px" }}
      >
        <h1 className="bg-green-light text-white m-0 py-3 text-center fs-1">
          <svg width="50" height="50" fill="#FFF" viewBox="0 0 16 16">
            <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
          </svg>
          الحجوزات
          <span className="text-success">
            {state.bookings_store.bookings.length}
          </span>
        </h1>

        <div
          className="menu-items overflow-scroll scrollbar-style1"
          style={{ height: "402px" }}
        >
          <ul className="list-unstyled m-0 p-0">
            {state.bookings_store.bookings.map((booking) => (
              <li
                key={booking.id}
                className="menuItem d-flex justify-content-between text-white fs-5 py-3 border border-blue-dark"
              >
                <span>
                  <FeedingBottleSvg />

                  {booking.name}
                  <p className="lead m-0 py-0 ps-5 fs-6 text-warning">
                    <span className="forDesktop">
                      {booking.address} - {booking.phone}
                    </span>
                    <span className="forMobile">
                      {booking.address}
                      <br />
                      {booking.phone}
                    </span>
                  </p>
                </span>

                <span className="deleteBookingBtn my-auto me-1 bg-white rounded-3 d-flex align-items-center justify-content-center">
                  <svg
                    onClick={() => deleteBooking(booking.id)}
                    width="32"
                    height="32"
                    fill="#f00"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
                  </svg>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Bookings;

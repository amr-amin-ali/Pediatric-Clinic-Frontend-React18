import { useStore } from "../../../hooks-store/store";
import { httpGET } from "../../../http/httpGET";
import { httpDELETE } from "../../../http/httpDELETE";
import { api } from "../../../utility/api";
import "./bookings.css";
const Bookings = () => {
  document.title = "الحجوزات";
  const [state, dispatch] = useStore();

  //get all bookings from the server
  if (state.bookings.length === 0) {
    httpGET(api.bookings.get_all_bookings).then((bookings) => {
      if (bookings.length !== 0) dispatch("INITIATE_BOOKINGS", bookings);
    });
  }

  const deleteBooking = async (bookingId) => {
    const response = await httpDELETE(api.bookings.delete_booking + bookingId);
    if (response.status === 400) {
      // const data = await response.json();
      // console.log(data);
      return;
    }
    dispatch("DELETE_BOOKING", bookingId);
  };

  return (
    <div className="col-8">
      <div className="menu rounded">
        <h1 className="book-header m-0 text-center fs-1 position-relative">
          <svg width="48" height="48" viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"
            ></path>
            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"></path>
            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"></path>
          </svg>
          الحجوزات ({state.bookings.length})
        </h1>
        <div className="menu-items scrollbar-style1">
          <ul>
            {state.bookings.map((booking) => (
              <li
                key={booking.id}
                className="menu-item position-relative book-item"
              >
                <a
                  className="text-decoration-none d-block"
                  href="/Doctor/Patients"
                >
                  <svg viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"></path>
                  </svg>
                  {booking.name}
                  <p className="lead m-0 p-0 book-footer">
                    {booking.address} - {booking.phone}
                  </p>
                </a>
                <form
                  onSubmit={(_) => _.preventDefault()}
                  className="book-item-form d-inline-block position-absolute text-center"
                >
                  <button
                    onClick={() => deleteBooking(booking.id)}
                    type="submit"
                    className="book-item-button d-inline-block"
                  >
                    <svg
                      width="32"
                      height="32"
                      fill="#f00"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
                    </svg>
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Bookings;

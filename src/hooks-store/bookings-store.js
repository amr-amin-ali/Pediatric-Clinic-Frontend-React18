import { initStore } from "./store";

const configureBookingsStore = () => {
  const actions = {
    INITIATE_BOOKINGS: async (globalState, bookingsList) => {
      globalState.bookings = bookingsList;
      return globalState;
    },
    DELETE_BOOKING: (globalState, bookingsId) => {
      globalState.bookings = globalState.bookings.filter(
        (c) => c.id !== bookingsId
      );
      return globalState;
    }
  };

  initStore(actions, {
    bookings: []
  });
};

export default configureBookingsStore;

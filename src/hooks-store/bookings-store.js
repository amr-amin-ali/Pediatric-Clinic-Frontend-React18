import { initStore } from "./store";

const configureBookingsStore = () => {
  const actions = {
    INITIATE_BOOKINGS: async (globalState, bookingsList) => {
      globalState.bookings_store.bookings = bookingsList;
      globalState.bookings_store.isInitiated = true;
      return globalState;
    },
    DELETE_BOOKING: (globalState, bookingsId) => {
      globalState.bookings_store.bookings = globalState.bookings_store.bookings.filter(
        (c) => c.id !== bookingsId
      );
      return globalState;
    }
  };

  initStore(actions, {
    bookings_store:{
    bookings: [],
    isInitiated:false
   }
  });
};

export default configureBookingsStore;

import { initStore } from "./store";

const configurePaymentsStore = () => {
  const actions = {
    INITIATE_PAYMENTS: async (globalState, paymentsList) => {
      globalState.payments_store.payments = paymentsList;
      globalState.payments_store.isInitiated = true;
      return globalState;
    },
    ADD_PAYMENT_TO_STORE: (globalState, newpayment) => {
      globalState.payments_store.payments = [...globalState.payments_store.payments, newpayment];
      return globalState;
    },
    DELETE_PAYMENT: (globalState, paymentsId) => {
      globalState.payments_store.payments = globalState.payments_store.payments.filter(
        (c) => c.id !== paymentsId
      );
      return globalState;
    },
  };

  initStore(actions, {
    payments_store: {
      payments: [],
      isInitiated: false,
    },
  });
};

export default configurePaymentsStore;

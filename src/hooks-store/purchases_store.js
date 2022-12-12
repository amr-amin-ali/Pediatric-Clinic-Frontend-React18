import { initStore } from "./store";

const configurePurchasesStore = () => {
  const actions = {
    INITIATE_PURCHASES: async (globalState, purchaesesList) => {
      globalState.purchaeses_store.purchaeses = purchaesesList;
      globalState.purchaeses_store.isInitiated = true;
      return globalState;
    },
    ADD_PURCHASE_TO_STORE: (globalState, newpurchaese) => {
      // console.log('newpurchaese>>',newpurchaese)
      globalState.purchaeses_store.purchaeses = [...globalState.purchaeses_store.purchaeses, newpurchaese];
      // console.log('globalState.purchaeses_store.purchaeses>>',globalState.purchaeses_store.purchaeses)
      return globalState;
    },
    DELETE_PURCHASE: (globalState, purchaesesId) => {
      globalState.purchaeses_store.purchaeses = globalState.purchaeses_store.purchaeses.filter(
        (c) => c.id !== purchaesesId
      );
      return globalState;
    },
  };

  initStore(actions, {
    purchaeses_store: {
      purchaeses: [],
      isInitiated: false,
    },
  });
};

export default configurePurchasesStore;

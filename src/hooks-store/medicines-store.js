import { initStore } from "./store";

const configureMedicinsStore = () => {
  const actions = {
    INITIATE_MEDICINES: async (globalState, medicinesList) => {
      globalState.medicines_store.medicines = medicinesList;
      globalState.medicines_store.isInitiated = true;
      return globalState;
    },
    ADD_MEDICINES_TO_STORE: (globalState, newVaccin) => {
      globalState.medicines_store.medicines = [...globalState.medicines_store.medicines, newVaccin];
      return globalState;
    },
    UPDATE_MEDICINES_IN_STORE: (globalState, modifiedVaccin) => {
      var index = globalState.medicines_store.medicines.findIndex(
        (c) => c.id === modifiedVaccin.id
      );
      if (index === -1) {
        globalState.medicines_store.medicines.push(modifiedVaccin);
      } else {
        globalState.medicines_store.medicines[index] = modifiedVaccin;
      }

      return globalState;
    },
    DELETE_MEDICINES: (globalState, medicinesId) => {
      globalState.medicines_store.medicines = globalState.medicines_store.medicines.filter(
        (c) => c.id !== medicinesId
      );
      return globalState;
    },
  };

  initStore(actions, {
    medicines_store: {
      medicines: [],
      isInitiated: false,
    },
  });
};

export default configureMedicinsStore;

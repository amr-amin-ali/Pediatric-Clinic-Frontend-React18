import { initStore } from "./store";

const configureVaccinsStore = () => {
  const actions = {
    INITIATE_VACCINS: async (globalState, vaccinsList) => {
      globalState.vaccins_store.vaccins = vaccinsList;
      globalState.vaccins_store.isInitiated = true;
      return globalState;
    },
    ADD_VACCINS_TO_STORE: (globalState, newVaccin) => {
      globalState.vaccins_store.vaccins = [...globalState.vaccins_store.vaccins, newVaccin];
      return globalState;
    },
    UPDATE_VACCINS_IN_STORE: (globalState, modifiedVaccin) => {
      var index = globalState.vaccins_store.vaccins.findIndex(
        (c) => c.id === modifiedVaccin.id
      );
      if (index === -1) {
        globalState.vaccins_store.vaccins.push(modifiedVaccin);
      } else {
        globalState.vaccins_store.vaccins[index] = modifiedVaccin;
      }

      return globalState;
    },
    DELETE_VACCINS: (globalState, vaccinsId) => {
      globalState.vaccins_store.vaccins = globalState.vaccins_store.vaccins.filter(
        (c) => c.id !== vaccinsId
      );
      return globalState;
    },
  };

  initStore(actions, {
    vaccins_store: {
      vaccins: [],
      isInitiated: false,
    },
  });
};

export default configureVaccinsStore;

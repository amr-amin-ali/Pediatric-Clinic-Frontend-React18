import { initStore } from "./store";

const configureVaccinsStore = () => {
  const actions = {
    INITIATE_VACCINS: async (globalState, vaccinsList) => {
      globalState.vaccins = vaccinsList;
      return globalState;
    },
    ADD_VACCINS_TO_STORE: (globalState, newVaccin) => {
      globalState.vaccins = [
        ...globalState.vaccins,
        newVaccin,
      ];
      return globalState;
    },
    UPDATE_VACCINS_IN_STORE: (globalState, modifiedVaccin) => {
      var index = globalState.vaccins.findIndex(
        (c) => c.id === modifiedVaccin.id
      );
      if (index === -1) {
        globalState.vaccins.push(modifiedVaccin);
      } else {
        globalState.vaccins[index] = modifiedVaccin;
      }

      return globalState;
    },
    DELETE_VACCINS: (globalState, vaccinsId) => {
      globalState.vaccins = globalState.vaccins.filter(
        (c) => c.id !== vaccinsId
      );
      return globalState;
    }
  };

  initStore(actions, {
    vaccins: []
  });
};

export default configureVaccinsStore;

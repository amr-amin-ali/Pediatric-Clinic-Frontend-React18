import { visitModel } from "../models/visit-model";
import { initStore } from "./store";

const configureVisitsStore = () => {
  const actions = {
    INITIATE_VISITS: async (globalState, visitsList) => {
      globalState.visits_store.visits = visitsList;
      globalState.visits_store.isInitiated = true;
      return globalState;
    },
    ADD_VISIT_TO_STORE: (globalState, newVisit) => {
      globalState.visits_store.visits = [
        ...globalState.visits_store.visits,
        newVisit,
      ];
      globalState.visits_store.isInitiated = true;
      return globalState;
    },
    UPDATE_VISIT_IN_STORE: (globalState, newUpdatedVisit) => {
      var index = globalState.visits_store.visits.findIndex(
        (c) => c.id === newUpdatedVisit.id
      );
      if (index === -1) {
        globalState.visits_store.visits.push(newUpdatedVisit);
      } else {
        globalState.visits_store.visits[index] = newUpdatedVisit;
      }

      globalState.visits_store.isInitiated = true;
      return globalState;
    },
    DELETE_VISIT: (globalState, visitId) => {
      globalState.visits_store.visits = globalState.visits_store.visits.filter(
        (c) => c.id !== visitId
      );
      return globalState;
    },
  };

  initStore(actions, {
    visits_store: {
      visits: [],
      isInitiated: false,


      new_prescription_data:{
        visit_details:{},
        treatments:[]
      }












    },
  });
};

export default configureVisitsStore;

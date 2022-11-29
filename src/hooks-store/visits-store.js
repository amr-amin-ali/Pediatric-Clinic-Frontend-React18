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
    SET_NEW_PRESCRIPTION_VISIT_DETAILS: (globalState, visitDetails) => {
      globalState.visits_store.new_prescription_data.visit_details =visitDetails;
      return globalState;
    },
    RESET_NEW_PRESCRIPTION_DATA: (globalState) => {
      globalState.visits_store.new_prescription_data.visit_details =visitModel;
      globalState.visits_store.new_prescription_data.file_data ={};
      globalState.visits_store.new_prescription_data.treatments =[];
      console.log("RESET",globalState.visits_store.new_prescription_data)
      return globalState;
    },
    ADD_FILE_DATA_TO_NEW_PRESCRIPTION: (globalState, new_prescription_file_data) => {
      globalState.visits_store.new_prescription_data.file_data = new_prescription_file_data;
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
      new_prescription_data: {
        visit_details: visitModel,
        file_data: {},
        treatments: [],
      },
      isInitiated: false,
    },
  });
};

export default configureVisitsStore;

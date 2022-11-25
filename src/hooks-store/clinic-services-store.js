import { initStore } from "./store";

const configureClinicServicesStore = () => {
  const actions = {
    INITIATE_CLINIC_SERVICES: async (globalState, servicesList) => {
      globalState.clinic_services_store.services = servicesList;
      globalState.clinic_services_store.isInitiated = true;
      return globalState;
    },
    ADD_SERVICE_TO_STORE: (globalState, newService) => {
      globalState.clinic_services_store.services = [
        ...globalState.clinic_services_store.services,
        newService,
      ];
      return globalState;
    },
    UPDATE_SERVICE_IN_STORE: (globalState, newUpdatedService) => {
      var index = globalState.clinic_services_store.services.findIndex(
        (c) => c.id === newUpdatedService.id
      );
      if (index === -1) {
        globalState.clinic_services_store.services.push(newUpdatedService);
      } else {
        globalState.clinic_services_store.services[index] = newUpdatedService;
      }

      return globalState;
    },
    DELETE_CLINIC_SERVICE: (globalState, serviceId) => {
      globalState.clinic_services_store.services = globalState.clinic_services_store.services.filter(
        (c) => c.id !== serviceId
      );
      return globalState;
    },
   
  };

  initStore(actions, {
    clinic_services_store:{
      services: [],
      isInitiated: false
  }
  });
};

export default configureClinicServicesStore;

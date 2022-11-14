import { initStore } from "./store";

const configureClinicServicesStore = () => {
  const actions = {
    INITIATE_CLINIC_SERVICES: async (globalState, servicesList) => {
      globalState.clinic_services = servicesList;
      return globalState;
    },
    ADD_SERVICE_TO_STORE: (globalState, newService) => {
      globalState.clinic_services = [
        ...globalState.clinic_services,
        newService,
      ];
      return globalState;
    },
    UPDATE_SERVICE_IN_STORE: (globalState, newUpdatedService) => {
      ///////////////////////////////////////////////
      var index = globalState.clinic_services.findIndex(
        (c) => c.id === newUpdatedService.id
      );
      if (index === -1) {
        globalState.clinic_services.push(newUpdatedService);
      } else {
        globalState.clinic_services[index] = newUpdatedService;
      }

      return globalState;
    },
    DELETE_CLINIC_SERVICE: (globalState, serviceId) => {
      globalState.clinic_services = globalState.clinic_services.filter(
        (c) => c.id !== serviceId
      );
      return globalState;
    },
    INITIATE_SERVICE_TO_EDIT: (globalState, serviceId) => {
      console.log("INITIATE_SERVICE_TO_EDIT=>Id: ");
      console.log("INITIATE_SERVICE_TO_EDIT=>Id: ", serviceId);
      const filteredServices = globalState.clinic_services.filter(
        (c) => c.id === serviceId
      );
      console.log(
        "INITIATE_SERVICE_TO_EDIT=>filteredServices: ",
        filteredServices
      );
      globalState.clinic_services.service_to_edit = filteredServices[0];
      return globalState;
    },
  };

  initStore(actions, {
    clinic_services: [],
    service_to_edit: null,
  });
};

export default configureClinicServicesStore;

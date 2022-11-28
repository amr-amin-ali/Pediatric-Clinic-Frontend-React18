import { initStore } from "./store";
const configureMetaDataStore = () => {
  const actions = {
    ADD_META_DATA_TO_STORE: (globalState, metaDatas) => {
      globalState.metaDatas_store.metaDatas = {
        ...metaDatas,
      };
      globalState.metaDatas_store.isInitiated = true;
      return globalState;
    },
  };

  initStore(actions, {
    metaDatas_store: {
      metaDatas: {},
      isInitiated: false,
    },
  });
};

export default configureMetaDataStore;

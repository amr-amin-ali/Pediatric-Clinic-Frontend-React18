import { metaDataModel } from "../models/meta-data-model";
import { initStore } from "./store";
const configureMetaDataStore = () => {
  const actions = {
    ADD_META_DATA_TO_STORE: (globalState, metaDatas) => {
      globalState.metaDatas = {
        ...metaDatas,
      };
      return globalState;
    },
  };

  initStore(actions, {
    metaDatas: metaDataModel,
  });
};

export default configureMetaDataStore;

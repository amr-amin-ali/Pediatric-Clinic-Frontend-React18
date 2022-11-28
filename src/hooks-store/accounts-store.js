import { initStore } from "./store";

const configureAccountsStore = () => {
  const actions = {
    INITIATE_FILES: async (globalState, filesList) => {
      globalState.accounts_store.files = filesList;
      globalState.accounts_store.isInitiated = true;
      return globalState;
    },
    ADD_FILE_IN_STORE: (globalState, newFile) => {
      globalState.accounts_store.files = [...globalState.accounts_store.files, newFile];
      return globalState;
    },

    UPDATE_FILE_IN_STORE: (globalState, newFile) => {
      var index = globalState.accounts_store.files.findIndex(
        (c) => c.id === newFile.id
      );
      if (index === -1) {
        globalState.accounts_store.files.push(newFile);
      } else {
        globalState.accounts_store.files[index] = newFile;
      }

      return globalState;
    },
    DELETE_FILE : (globalState, fileId) => {
      globalState.accounts_store.files = globalState.accounts_store.files.filter(
        (c) => c.id !== fileId
      );
      return globalState;
    },

    SET_LOGGED_IN: (globalState, loginResule = {}) => {
      globalState.accounts_store.login.token = loginResule.token;
      globalState.accounts_store.login.firstName = loginResule.firstName;
      globalState.accounts_store.login.middleName = loginResule.middleName;
      globalState.accounts_store.login.lastName = loginResule.lastName;
      globalState.accounts_store.login.role = loginResule.role;
      globalState.accounts_store.login.isLoggedIn = true;
      localStorage.setItem("token", `Bearer ${loginResule.token}`);
      localStorage.setItem("role", loginResule.role);
      return globalState;
    },
    LOGOUT: (globalState) => {
      globalState.accounts_store.login.token = null;
      globalState.accounts_store.login.firstName = null;
      globalState.accounts_store.login.middleName = null;
      globalState.accounts_store.login.lastName = null;
      globalState.accounts_store.login.role = null;
      globalState.accounts_store.login.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return globalState;
    },
  };

  initStore(actions, {
    accounts_store: {
      login: {
        email: null,
        firstName: null,
        middleName: null,
        lastName: null,
        role: localStorage.getItem("role"),
        token: localStorage.getItem("token"),
        isLoggedIn: localStorage.getItem("token") !== null,
      },
      files: [],
      isInitiated: false,
    },
  });
};

export default configureAccountsStore;

import { initStore } from "./store";

const configureToolsStore = () => {
  const actions = {
    INITIATE_TOOLS: async (globalState, toolsList) => {
      globalState.tools_store.tools = toolsList;
      globalState.tools_store.isInitiated = true;
      return globalState;
    },
    ADD_TOOL_TO_STORE: (globalState, newTool) => {
      globalState.tools_store.tools = [...globalState.tools_store.tools, newTool];
      return globalState;
    },
    DELETE_TOOLS: (globalState, toolsId) => {
      globalState.tools_store.tools = globalState.tools_store.tools.filter(
        (c) => c.id !== toolsId
      );
      return globalState;
    },
  };

  initStore(actions, {
    tools_store: {
      tools: [],
      isInitiated: false,
    },
  });
};

export default configureToolsStore;

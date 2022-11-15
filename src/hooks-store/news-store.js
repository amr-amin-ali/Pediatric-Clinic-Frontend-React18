import { initStore } from "./store";

const configureNewsStore = () => {
  const actions = {
    INITIATE_NEWS: async (globalState, newsList) => {
      globalState.news = newsList;
      return globalState;
    },
    ADD_NEWS_TO_STORE: (globalState, newNews) => {
      globalState.news = [
        ...globalState.news,
        newNews,
      ];
      return globalState;
    },
    UPDATE_NEWS_IN_STORE: (globalState, modifiedNews) => {
      var index = globalState.news.findIndex(
        (c) => c.id === modifiedNews.id
      );
      if (index === -1) {
        globalState.news.push(modifiedNews);
      } else {
        globalState.news[index] = modifiedNews;
      }

      return globalState;
    },
    DELETE_NEWS: (globalState, newsId) => {
      globalState.news = globalState.news.filter(
        (c) => c.id !== newsId
      );
      return globalState;
    }
  };

  initStore(actions, {
    news: []
  });
};

export default configureNewsStore;

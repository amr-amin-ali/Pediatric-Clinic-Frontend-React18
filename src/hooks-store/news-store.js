import { initStore } from "./store";

const configureNewsStore = () => {
  const actions = {
    INITIATE_NEWS: async (globalState, newsList) => {
      globalState.newsStore.news = newsList;
      globalState.newsStore.isInitiated = true;
      return globalState;
    },
    ADD_NEWS_TO_STORE: (globalState, newNews) => {
      globalState.newsStore.news = [...globalState.newsStore.news, newNews];
      return globalState;
    },
    UPDATE_NEWS_IN_STORE: (globalState, modifiedNews) => {
      var index = globalState.newsStore.news.findIndex(
        (c) => c.id === modifiedNews.id
      );
      if (index === -1) {
        globalState.newsStore.news.push(modifiedNews);
      } else {
        globalState.newsStore.news[index] = modifiedNews;
      }

      return globalState;
    },
    DELETE_NEWS: (globalState, newsId) => {
      globalState.newsStore.news = globalState.newsStore.news.filter(
        (c) => c.id !== newsId
      );
      return globalState;
    },
  };

  initStore(actions, {
    newsStore: {
      news: [],
      isInitiated: false
    },
  });
};

export default configureNewsStore;

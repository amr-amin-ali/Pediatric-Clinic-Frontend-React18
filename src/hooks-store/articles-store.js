import { initStore } from "./store";

const configureArticlesStore = () => {
  const actions = {
    INITIATE_ARTICLES: async (globalState, articlesList) => {
      globalState.articles = articlesList;
      return globalState;
    },
    ADD_ARTICLE_TO_STORE: (globalState, newArticle) => {
      globalState.articles = [
        ...globalState.articles,
        newArticle,
      ];
      return globalState;
    },
    UPDATE_ARTICLE_IN_STORE: (globalState, newUpdatedArticle) => {
      var index = globalState.articles.findIndex(
        (c) => c.id === newUpdatedArticle.id
      );
      if (index === -1) {
        globalState.articles.push(newUpdatedArticle);
      } else {
        globalState.articles[index] = newUpdatedArticle;
      }

      return globalState;
    },
    DELETE_ARTICLE: (globalState, articleId) => {
      globalState.articles = globalState.articles.filter(
        (c) => c.id !== articleId
      );
      return globalState;
    }
  };

  initStore(actions, {
    articles: []
  });
};

export default configureArticlesStore;

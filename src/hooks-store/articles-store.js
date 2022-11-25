import { initStore } from "./store";

const configureArticlesStore = () => {
  const actions = {
    INITIATE_ARTICLES: async (globalState, articlesList) => {
      globalState.articles_store.articles = articlesList;
      globalState.articles_store.isInitiated = true;
      return globalState;
    },
    ADD_ARTICLE_TO_STORE: (globalState, newArticle) => {
      globalState.articles_store.articles = [...globalState.articles_store.articles, newArticle];
      return globalState;
    },
    UPDATE_ARTICLE_IN_STORE: (globalState, newUpdatedArticle) => {
      var index = globalState.articles_store.articles.findIndex(
        (c) => c.id === newUpdatedArticle.id
      );
      if (index === -1) {
        globalState.articles_store.articles.push(newUpdatedArticle);
      } else {
        globalState.articles_store.articles[index] = newUpdatedArticle;
      }

      return globalState;
    },
    DELETE_ARTICLE: (globalState, articleId) => {
      globalState.articles_store.articles = globalState.articles_store.articles.filter(
        (c) => c.id !== articleId
      );
      return globalState;
    },
  };

  initStore(actions, {
    articles_store: { 
      articles: [], 
      isInitiated: false 
    },
  });
};

export default configureArticlesStore;

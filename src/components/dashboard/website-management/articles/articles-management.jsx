import { useState } from "react";
import { useStore } from "../../../../hooks-store/store";
import { httpDELETE } from "../../../../http/httpDELETE";
import { httpGET } from "../../../../http/httpGET";
import { api } from "../../../../utility/api";
import Button from "../../buttons/button";
import ShowModalButton from "../../buttons/show-modal-button";
import ArticleItem from "./article-item";
import AddArticleModal from "./add-article-modal";
import { openBootstrapModal } from "../../../../utility/open-bootstrap-modal";
import EditArticleModal from "./edit-article-modal";

const ArticlesManagement = () => {
  const [state, dispatch] = useStore();

  //get all articles from the server
  if (state.articles.length === 0) {
    httpGET(api.articles.get_all_articles).then((articles) => {
      if (articles.length !== 0) dispatch("INITIATE_ARTICLES", articles);
    });
  }

  const deleteArticle = async (articleId) => {
    if (window.confirm("هل تريد الحذف فعلاً؟") == true) {
      const response = await httpDELETE(
        api.articles.delete_article + articleId
      );
      if (response.status === 400) {
        alert("Erroe!!");
        return;
      }
      dispatch("DELETE_ARTICLE", articleId);
    }
  };

  const [articleToEdit, setArticleToEdit] = useState({});
  const editArticle = (service) => {
    setArticleToEdit(service);
    openBootstrapModal("edit-article-modal");
  };
  ///////////////////////////////////////////////////
  const [showMyEditModal, setShowMyEditModal] = useState(false);
  const showEditModal = () => {
    setShowMyEditModal(true);
  };
  const closeEditModal = () => {
    setShowMyEditModal(false);
    setArticleToEdit(null);
  };
  const [showMyAddModal, setShowMyAddModal] = useState(false);
  const showAddModal = () => {
    setShowMyAddModal(true);
  };
  const closeAddModal = () => {
    setShowMyAddModal(false);
  };
  ///////////////////////////////////////////////////

  return (
    <div className="container">
      <div className="card text-center m-3">
        <div className="card-header">الخيارات المتاحة</div>
        <div className="card-body">
          <h5 className="card-title mt-4">هذه الإجراءات خاصة بأخبار العيادة</h5>
          <p className="card-text mb-4">
            يمكنك الإختيار ما بين نشر خبر أو إستعراض الأخبار الحالية أو حذف خبر
            أو تعديله.
          </p>
          {/* <hr /> */}
          <div className="row m-0">
            <div className="col-md-4 col-sm-8 offset-md-4 offset-sm-2 d-flex justify-content-center">
              <ShowModalButton
                color="blue"
                modalId="#add-article-modal"
                title="إضافة مقالة"
              />
            </div>
          </div>
        </div>
        <div className="card-footer text-muted">لا تنسى أن تحظى بيوم سعيد</div>
      </div>
      <AddArticleModal />

      <div className="row justify-content-between m-3">
        {/* {state.article.length !== 0 && (
          <h1 className="text-center text-white mt-3">المقالات</h1>
        )} */}
        {/* {state.article.length === 0 && (
          <h3 className="text-info text-center my-5">
          لم تقم بإضافة مقالات حتى الآن
          </h3>
        )} */}
        {state.articles.length > 0 &&
          state.articles.map((article) => {
            if (article) {
              return (
                <div key={article.id + article.id} className="my-1 p-0">
                  <ArticleItem
                    key={article.id}
                    article={article}
                    deleteClickHandler={deleteArticle}
                    editClickHandler={editArticle}
                  />
                </div>
              );
            }
          })}
        <EditArticleModal article={articleToEdit} />
      </div>
    </div>
  );
};

export default ArticlesManagement;

import { useState } from "react";
import { useStore } from "../../../../hooks-store/store";
import { httpDELETE } from "../../../../http/httpDELETE";
import { httpGET } from "../../../../http/httpGET";
import { api } from "../../../../utility/api";
import Button from "../../buttons/button";
import AddNewsModal from "./add-news-modal";
import EditNewsModal from "./edit-news-modal";
import NewsItem from "./news-item";

const NewsManagement = () => {
  const [state, dispatch] = useStore();

  //get all news from the server
  if (state.news.length === 0) {
    httpGET(api.news.get_all_news).then((news) => {
      if (news.length !== 0) dispatch("INITIATE_NEWS", news);
    });
  }

  const deleteNews = async (newsId) => {
    const response = await httpDELETE(api.news.delete_news + newsId);
    if (response.status === 400) {
      // const data = await response.json();
      // console.log(data);
      return;
    }
    dispatch("DELETE_NEWS", newsId);
  };

  const [newsToEdit, setNewsToEdit] = useState(null);
  const editArticle = (news) => {
    setNewsToEdit(news);
    showEditModal();
  };
  ///////////////////////////////////////////////////
  const [showMyEditModal, setShowMyEditModal] = useState(false);
  const showEditModal = () => {
    setShowMyEditModal(true);
  };
  const closeEditModal = () => {
    setShowMyEditModal(false);
    setNewsToEdit(null);
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
      <div className="card text-center">
        <div className="card-header">الخيارات المتاحة</div>
        <div className="card-body">
          <h5 className="card-title mt-4">هذه الإجراءات خاصة بأخبار العيادة</h5>
          <p className="card-text mb-4">
            يمكنك الإختيار ما بين نشر خبر جديد أو حذف وتعديل الأخبار التى سبق
            نشرها
          </p>
          <hr />
          <div className="row mt-5 mb-5 justify-content-around">
            <div className="col-4">
              <Button
                color="blue"
                title="نشر خبر"
                clickHandler={showAddModal}
              />
            </div>
          </div>
        </div>
        <div className="card-footer text-muted">لا تنسى أن تحظى بيوم سعيد</div>
      </div>

      <AddNewsModal showModal={showMyAddModal} closeModal={closeAddModal} />
      {/* <SearchFilesModal /> */}

      <div className="row justify-content-between my-3">
        {/* {state.news.length !== 0 && (
          <h1 className="text-center text-white mt-3">المقالات</h1>
        )} */}
        {/* {state.news.length === 0 && (
          <h3 className="text-info text-center my-5">
          لم تقم بإضافة مقالات حتى الآن
          </h3>
        )} */}
        {state.news.length > 0 &&
          state.news.map((news) => {
            if (news) {
              return (
                <div key={news.id} className="my-2">
                  <NewsItem
                    key={news.id}
                    news={news}
                    deleteClickHandler={deleteNews}
                    editClickHandler={editArticle}
                  />
                </div>
              );
            }
          })}
        {newsToEdit && (
          <EditNewsModal
            showModal={showMyEditModal}
            closeModal={closeEditModal}
            news={newsToEdit}
          />
        )}
      </div>
    </div>
  );
};

export default NewsManagement;

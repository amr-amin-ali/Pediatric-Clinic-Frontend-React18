import { useState } from "react";
import { useStore } from "../../../../hooks-store/store";
import { httpDELETE } from "../../../../http/httpDELETE";
import { httpGET } from "../../../../http/httpGET";
import { api } from "../../../../utility/api";
import ShowModalButton from "../../buttons/show-modal-button";
import AddNewsModal from "./add-news-modal";
import NewsItem from "./news-item";
import EditNewsModal from "./edit-news-modal";
import { openBootstrapModal } from "../../../../utility/open-bootstrap-modal";

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

  const [newsToEdit, setNewsToEdit] = useState({});
  const editNews = (news) => {
    setNewsToEdit(news);
    openBootstrapModal("showEditNewsModelBtn");
};

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">الخيارات المتاحة</div>
        <div className="card-body">
          <h5 className="card-title mt-4">هذه الإجراءات خاصة بأخبار العيادة</h5>
          <p className="card-text mb-4">
            يمكنك الإختيار ما بين نشر خبر أو إستعراض الأخبار الحالية أو حذف خبر
            أو تعديله.
          </p>
          {/* <hr /> */}
          <div className="d-flex justify-content-around">
            <div className="col-4">
              <ShowModalButton
                color="blue"
                modalId="#addNewsModalB"
                title="نشر خبر"
              />
            </div>
          </div>
        </div>
        <div className="card-footer text-muted">لا تنسى أن تحظى بيوم سعيد</div>
      </div>
      <AddNewsModal />
      <EditNewsModal news={newsToEdit} />
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
                    editClickHandler={editNews}
                  />
                </div>
              );
            }
          })}

      </div>
    </div>
  );
};

export default NewsManagement;

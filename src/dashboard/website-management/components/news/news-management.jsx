import { Fragment, useEffect, useState } from "react";
import { useStore } from "../../../../hooks-store/store";
import { httpDELETE } from "../../../../http/httpDELETE";
import { httpGET } from "../../../../http/httpGET";
import { api } from "../../../../utility/api";
import ShowModalButton from "../../../components/buttons/show-modal-button";
import AddNewsModal from "./add-news-modal";
import NewsItem from "./news-item";
import EditNewsModal from "./edit-news-modal";
import { openBootstrapModal } from "../../../../utility/open-bootstrap-modal";
import DashboardLoader from "../../../components/loader/dashboardLoader";

const NewsManagement = () => {
  const [state, dispatch] = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const deleteNews = async (newsId) => {
    if (window.confirm("هل تريد الحذف فعلاً؟") === true) {
      const response = await httpDELETE(api.news.delete_news + newsId);
      if (response.status === 400) {
        alert("Network related error");
        return;
      }
      dispatch("DELETE_NEWS", newsId);
    }
  };

  const [newsToEdit, setNewsToEdit] = useState({});
  const editNews = (news) => {
    setNewsToEdit(news);
    openBootstrapModal("showEditNewsModelBtn");
  };

  useEffect(() => {
    //get all newsStore.news from the server
    if (!state.newsStore.isInitiated) {
      setIsLoading(true);
      httpGET(api.news.get_all_news)
        .then((news) => {
          if (news.length !== 0) dispatch("INITIATE_NEWS", news);
          setIsLoading(false);
        })
        .catch((c) => {
          alert("Network error while fetching news!!");
          setIsLoading(false);
        });
    }
  }, []);

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

      <div className="row justify-content-between m-3">
      {isLoading && <DashboardLoader text="جارى تحميل البيانات" />}

        {!isLoading && state.newsStore.news.length > 0 && (
          <Fragment>
            <h1 className="text-center text-white mt-3">الأخبار</h1>
            {state.newsStore.news.length > 0 &&
              state.newsStore.news.map((news) => {
                if (news) {
                  return (
                    <div key={news.id} className="my-1">
                      <NewsItem
                        key={news.id}
                        news={news}
                        deleteClickHandler={deleteNews}
                        editClickHandler={editNews}
                      />
                    </div>
                  );
                } else {
                  return null;
                }
              })}
          </Fragment>
        )}

        {!isLoading && state.newsStore.news.length < 1 && (
          <h1 className="text-center text-white mt-3">
            لم تقم بإضافة أى أخبار حتى الآن
          </h1>
        )}
      </div>
    </div>
  );
};

export default NewsManagement;

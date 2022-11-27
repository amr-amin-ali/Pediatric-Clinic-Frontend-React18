import { Fragment, useEffect, useState } from "react";
import { useStore } from "../../hooks-store/store";
import { httpGET } from "../../http/httpGET";
import { api } from "../../utility/api";
import DashboardLoader from "../components/loader/dashboardLoader";
import FileItem from "./components/file-item";

const ViewAllFiles = () => {
  const [state, dispatch] = useStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //get all articles from the server
    if (!state.articles_store.isInitiated) {
      setIsLoading(true);
      httpGET(api.account.get_all_accounts)
        .then((filesList) => {
          if (filesList.length !== 0) dispatch("INITIATE_FILES", filesList);
          setIsLoading(false);
        })
        .catch((c) => {
          alert("Network error while fetching patients' files!!");
          setIsLoading(false);
        });
    }
  }, []);
  return (
    <div className="col-sm-12 col-lg-8">
      {isLoading && <DashboardLoader text="جارى تحميل البيانات" />}
      {!isLoading && state.accounts_store.files.length > 0 && (
        <Fragment>
          <h1 className="text-white mt-3">جميع الملفات</h1>

          {state.accounts_store.files.map((file) => {
            if (file) {
              return (
                <FileItem key={file.id}
                  fileData={file}
                />
              );
            } else {
              return null;
            }
          })}
        </Fragment>
      )}
      {!isLoading && state.accounts_store.files.length < 1 && (
        <h1 className="text-center text-white mt-3">
          لم تقم بإنشاء ملفات حتى الآن
        </h1>
      )}

    </div>
  );
};
export default ViewAllFiles;

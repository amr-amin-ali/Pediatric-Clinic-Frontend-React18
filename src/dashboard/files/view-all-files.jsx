import { Fragment, useEffect, useState } from "react";
import { useStore } from "../../hooks-store/store";
import { httpGET } from "../../http/httpGET";
import { api } from "../../utility/api";
import DashboardLoader from "../components/loader/dashboardLoader";
import FileItem from "./file-item";

const ViewAllFiles = () => {
  const [state, dispatch] = useStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //get all files from the server
    if (!state.accounts_store.isInitiated) {
      setIsLoading(true);
      httpGET(api.account.get_all_accounts)
        .then((response) => {
          if (response.status === 401) {
            alert("Please login first");
            dispatch("LOGOUT");
          }
          if (response.status === 200) {
            response.json().then((data) => {
              if (data.length !== 0) dispatch("INITIATE_FILES", data);
            });
          }
  
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
      {isLoading && <DashboardLoader text="جارى تحميل الملفات" />}
      {!isLoading && state.accounts_store.files.length > 0 && (
        <Fragment>
          <h1 className="text-white mt-3">جميع الملفات</h1>

          {state.accounts_store.files.map((file) => 
            file ? <FileItem key={file.id} fileData={file} /> : null
          )}
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

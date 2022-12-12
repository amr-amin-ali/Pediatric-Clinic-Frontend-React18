import { Fragment, useEffect, useState } from "react";
import ShowModalButton from "../components/buttons/show-modal-button";
import { useStore } from "../../hooks-store/store";
import DashboardLoader from "../components/loader/dashboardLoader";
import { httpDELETE } from "../../http/httpDELETE";
import { api } from "../../utility/api";
import { httpGET } from "../../http/httpGET";
import DeleteToolModal from "./delete-tool-modal";
import CreateToolModal from "./create-tool-modal";

const Tools = () => {
  const [state, dispatch] = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteTool = async (toolId) => {
    if (window.confirm("هل تريد الحذف فعلاً؟") === true) {
      setIsDeleting(true);
      httpDELETE(api.tools.delete_tool + toolId)
        .then((response) => {
          if (response.status === 204) {
            dispatch("DELETE_TOOL", toolId);
          }
          if (response.status === 404) {
            response.json().then((result) => alert(Object.values(result)[0]));
          }
          if (response.status === 400) {
            response.json().then((result) => alert(Object.values(result)[0]));
          }
          setIsDeleting(false);
        })
        .catch((c) => {
          alert("Network error while deleting article!!");
          setIsDeleting(false);
        });
    }
  };

  useEffect(() => {
    if (!state.tools_store.isInitiated) {
      setIsLoading(true);
      httpGET(api.tools.get_all_tools)
        .then((tools) => {
          if (tools.length !== 0) dispatch("INITIATE_TOOLS", tools);
          setIsLoading(false);
        })
        .catch((c) => {
          alert("Network error while fetching tools!!");
          setIsLoading(false);
        });
    }
  }, []);

  document.title = "الأدوات";
  return (
    <div className="col-8">
      <div className="card text-center m-3">
        <div className="card-header">الخيارات المتاحة</div>
        <div className="card-body">
          <h5 className="card-title mt-4">هذه الإجراءات خاصة بالأدوات</h5>
          <p className="card-text mb-4">
            يمكنك الإختيار ما بين تسجيل آداة جديدة أو تعديل بيانات آداة أو
            إستعراض الأدوات المسجلة أو حتى حذف آداة مسجلة
          </p>

          <div className="row m-0">
            <div className="col-md-4 col-sm-8 offset-md-4 offset-sm-2 d-flex justify-content-center">
              <ShowModalButton
                color="blue"
                modalId="#createNewToolModal"
                title="تسجيل آداة"
              />
            </div>
          </div>
        </div>
        <div className="card-footer text-muted">لا تنسى أن تحظى بيوم سعيد</div>
      </div>

      {isLoading && <DashboardLoader text="جارى تحميل البيانات" />}
      {!isLoading && state.tools_store.tools.length < 1 && (
        <h1 className="text-center text-white mt-3">لم تقم بإضافة أدواتك</h1>
        )}
      {!isLoading && state.tools_store.tools.length > 0 && (
        <h1 className="text-center text-white mt-3"> أدواتك</h1>
        )}

        {isDeleting && <DashboardLoader text="جارى الحذف" />}
      {!isLoading &&
        state.tools_store.tools.length > 0 &&
        state.tools_store.tools.map((tool) => (
          <Fragment key={tool.id}>
            <div className="d-flex justify-content-between px-5 border border-1 border-secondary rounded my-1">
              <span className="text-white"> {tool.name}</span>
              <span
                className="fs-6 fw-bold text-danger cursor-pointer"
                data-bs-toggle="modal"
                data-bs-target={"#" + "deleteToolModal" + tool.id}
              >
                حذف
              </span>
            </div>
            <DeleteToolModal
              tool={tool}
              modalId={"deleteToolModal" + tool.id}
            />
          </Fragment>
        ))}

      <CreateToolModal />
    </div>
  );
};
export default Tools;

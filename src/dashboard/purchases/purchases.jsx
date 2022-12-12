import { useEffect, useState } from "react";
import { useStore } from "../../hooks-store/store";
import DashboardLoader from "../components/loader/dashboardLoader";
import { httpDELETE } from "../../http/httpDELETE";
import { api } from "../../utility/api";
import { httpGET } from "../../http/httpGET";
import ShowModalButton from "../components/buttons/show-modal-button";
import CreatePurchasesModal from "./components/create-purchase-modal";
import { cSharpDateToJsDateConverter } from "../../utility/cSharpDateToJsDateConverter";
import DeletePurchaseModal from "./components/delete-purchase-modal";

const Purchases = () => {
  document.title = "المشتريات";
  const [state, dispatch] = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePurchase = async (purchaseId) => {
    if (window.confirm("هل تريد الحذف فعلاً؟") === true) {
      setIsDeleting(true);
      httpDELETE(api.purchases.delete_purchase + purchaseId)
        .then((response) => {
          if (response.status === 204) {
            dispatch("DELETE_PURCHASE", purchaseId);
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
    if (!state.purchaeses_store.isInitiated) {
      setIsLoading(true);
      httpGET(api.purchases.get_all_purchases)
        .then((purchaeses) => {
          if (purchaeses.length !== 0)
            dispatch("INITIATE_PURCHASES", purchaeses);
          setIsLoading(false);
        })
        .catch((c) => {
          alert("Network error while fetching purchaeses!!");
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <div className="col-8">
      <div className="card text-center m-3">
        <div className="card-header">الخيارات المتاحة</div>
        <div className="card-body">
          <h5 className="card-title mt-4">هذه الإجراءات خاصة بالمشتريات</h5>
          <p className="card-text mb-4">
            يمكنك الإختيار ما بين تسجيل عملية شراء جديدة أو حتى تصفح كل مشترياتك
          </p>
          <hr />
          <div className="row m-0">
            <div className="col-md-4 col-sm-8 offset-md-4 offset-sm-2 d-flex justify-content-center">
              <ShowModalButton
                color="blue"
                modalId="#createNewPurchaseModal"
                title="تسجيل مشتريات"
              />
            </div>
          </div>
        </div>
        <div className="card-footer text-muted">لا تنسى أن تحظى بيوم سعيد</div>
      </div>
      <CreatePurchasesModal />

      {isLoading && <DashboardLoader text="جارى تحميل البيانات" />}
      {!isLoading && state.purchaeses_store.purchaeses.length < 1 && (
        <h1 className="text-center text-white mt-3">لم تقم بإضافة مشتريات</h1>
      )}
      {!isLoading && state.purchaeses_store.purchaeses.length > 0 && (
        <h1 className="text-center text-white mt-3"> مشترياتك</h1>
      )}
      {isDeleting && <DashboardLoader text="جارى الحذف" />}
      {!isLoading && state.purchaeses_store.purchaeses.length > 0 && (
        <div className="table-responsive p-0 m-3">
          <table
            className="table table-dark table-striped rounded-top"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th scope="col">الآداة</th>
                <th scope="col">السعر</th>
                <th scope="col">الكمية</th>
                <th scope="col">الإجمالى</th>
                <th scope="col">خيارات</th>
              </tr>
            </thead>
            <tbody>
              {state.purchaeses_store.purchaeses.map((purchase) => {
                return (
                  <tr key={purchase.id}>
                    <th scope="row">
                      {purchase.tool && purchase.tool.name}
                      <br />
                      <small className="fw-lighter fst-italic">
                        {cSharpDateToJsDateConverter(purchase.createdAt)}
                      </small>
                    </th>
                    <td className="text-warning">{purchase.price}</td>
                    <td className="text-primary">{purchase.quantity}</td>
                    <td className="text-info">
                      {purchase.quantity * purchase.price}
                    </td>
                    <td>
                      <span
                        className="fs-6 fw-bold text-danger cursor-pointer"
                        data-bs-toggle="modal"
                        data-bs-target={"#deletePurchaseModal" + purchase.id}
                      >
                        حذف
                      </span>
                      <DeletePurchaseModal
                        modalId={"deletePurchaseModal" + purchase.id}
                        purchase={purchase}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default Purchases;

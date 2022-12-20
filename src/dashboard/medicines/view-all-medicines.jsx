import { Fragment, useEffect, useState } from "react";
import { useStore } from "../../hooks-store/store";
import { httpGET } from "../../http/httpGET";
import { api } from "../../utility/api";
import DashboardLoader from "../components/loader/dashboardLoader";
import MedicineItem from "./medicine-item";

const ViewAllMedicines = () => {
  const [state, dispatch] = useStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //get all articles from the server
    if (!state.medicines_store.isInitiated) {
      setIsLoading(true);
      httpGET(api.medicines.get_all_medicines)
        .then((response) => {
          if (response.status === 401) {
            alert("Please login first");
            dispatch("LOGOUT");
          }
          if (response.status === 200) {
            response.json().then((data) => {
              if (data.length !== 0) dispatch("INITIATE_MEDICINES", data);
            });
          }
  
          setIsLoading(false);
        })
        .catch((c) => {
          alert("Network error while fetching medicines from server!!");
          setIsLoading(false);
        });
    }
  }, []);
  return (
    <div className="col-sm-12 col-lg-8">
      {isLoading && <DashboardLoader text="جارى تحميل البيانات" />}
      {!isLoading && state.medicines_store.medicines.length > 0 && (
        <Fragment>
          <h1 className="text-white mt-3">جميع الأدوية</h1>

          {state.medicines_store.medicines.map((medicine) => {
            if (medicine) {
              return (
                <MedicineItem key={medicine.id} medicineData={medicine} />
              );
            } else {
              return null;
            }
          })}
        </Fragment>
      )}
      {!isLoading && state.medicines_store.medicines.length < 1 && (
        <h1 className="text-center text-white mt-3">
          لم تقم بإنشاء ملفات حتى الآن
        </h1>
      )}

    </div>
  );
};
export default ViewAllMedicines;

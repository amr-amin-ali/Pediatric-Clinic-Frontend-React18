import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { httpGET } from "../../../http/httpGET";
import { api } from "../../../utility/api";
import DashboardLoader from "../../components/loader/dashboardLoader";
import AllVisitsItem from "./all-visits-item";
import { useStore } from "../../../hooks-store/store";
const ViewAllVisits = () => {
  const dispatch = useStore(false)[1];
  const params = useParams();
  const applicationUserId = params.applicationUserId;
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    httpGET(api.visits.get_all_visits_for_application_user + applicationUserId)
      .then((response) => {
        if (response.status === 401) {
          alert("Please login first");
          dispatch("LOGOUT");
        }
        if (response.status === 200) {
          response.json().then((data) => {
            if (data.length !== 0) setVisits(data);
          });
        }
        setIsLoading(false);
      })
      .catch((c) => {
        alert("Network error while fetching prescriptions!!");
        console.log(c)
        setIsLoading(false);
      });
  }, []);
  return (
    <Fragment>
      {isLoading && <DashboardLoader text="جارى تحميل الروشتات" />}
      {visits.length < 1 && (
        <h1 className="text-center text-warning">
          لا يوجد روشتات لهذه الحالة.
        </h1>
      )}
      {!isLoading &&
        visits.map((visit) => <AllVisitsItem key={visit.id} visit={visit} />)}
    </Fragment>
  );
};
export default ViewAllVisits;

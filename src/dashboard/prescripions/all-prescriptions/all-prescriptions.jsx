import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { httpGET } from "../../../http/httpGET";
import { api } from "../../../utility/api";
import DashboardLoader from "../../components/loader/dashboardLoader";
import AllPrescriptionsItem from "./all-prescriptions-item";
const ViewAllPrescriptions = () => {
  const params = useParams();
  const applicationUserId = params.applicationUserId;
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    httpGET(api.visits.get_all_visits_for_application_user + applicationUserId)
      .then((visitsList) => {
        if (visitsList.length !== 0) setVisits(visitsList);
        setIsLoading(false);
      })
      .catch((c) => {
        alert("Network error while fetching prescriptions!!");
        setIsLoading(false);
      });
  }, []);
  return (
    <Fragment>
      {isLoading && <DashboardLoader text="جارى تحميل الروشتات" />}
      {!isLoading &&
        visits.map((visit) => (
        <AllPrescriptionsItem  visit={visit}/>
        ))}
    </Fragment>
  );
};
export default ViewAllPrescriptions;

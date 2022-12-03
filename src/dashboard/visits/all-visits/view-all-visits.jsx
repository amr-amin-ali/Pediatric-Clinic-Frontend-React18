import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { httpGET } from "../../../http/httpGET";
import { api } from "../../../utility/api";
import DashboardLoader from "../../components/loader/dashboardLoader";
import AllVisitsItem from "./all-visits-item";
const ViewAllVisits = () => {
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
      {visits.length<1 &&  <h1 className="text-center text-warning">لا يوجد روشتات لهذه الحالة.</h1> } 
      {!isLoading &&
        visits.map((visit) => (
        <AllVisitsItem key={visit.id}  visit={visit}/>
        ))}
    </Fragment>
  );
};
export default ViewAllVisits;

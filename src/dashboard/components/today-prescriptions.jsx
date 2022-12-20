import style from "./today-prescriptions.module.css";
import { NavLink } from "react-router-dom";
import Stethoscope from "./icons/stethoscope";
import { useEffect, useState } from "react";
import { useStore } from "../../hooks-store/store";
import { httpGET } from "../../http/httpGET";
import { api } from "../../utility/api";
import DashboardLoader from "../components/loader/dashboardLoader";
import { convertcSharpTimeTo12HourSystem } from "../../utility/date-time-functionalities";
const TodayPrescriptions = () => {
  const [state, dispatch] = useStore();
  const visityOfTypeZero = state.visits_store.visits_of_today.filter(
    (visit) => visit.type === 0
  );
  const visityOfTypeNotZero = state.visits_store.visits_of_today.filter(
    (visit) => visit.type !== 0
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //get visits of today from the server
    if (state.visits_store.visits_of_today.length < 1) {
      setIsLoading(true);
      httpGET(api.visits.get_visits_of_today)
      .then((response) => {
        if (response.status === 401) {
          alert("Please login first");
          dispatch("LOGOUT");
        }
        if (response.status === 200) {
          response.json().then((data) => {
            if (data.length !== 0)
            dispatch("INITIATE_VISITS_OF_TODAY", data);
          });
        }         
          setIsLoading(false);
        })
        .catch((c) => {
          alert("Network error while fetching visits!!");
          setIsLoading(false);
        });
    }
  }, []);
  return (
    <div className="col-lg-4 col-sm-12  px-3 py-3">
      <div className="row m-0">
        <div
          className="menu rounded bg-blue-light overflow-hidden p-0 mb-5"
          style={{ height: "214px" }}
        >
          <h1 className="bg-info text-white m-0 py-3 text-center fs-1">
            <svg width="50" height="50" fill="#FFF" viewBox="0 0 16 16">
              <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
            كشوفات اليوم
          </h1>
          <div
            className="menu-items overflow-scroll scrollbar-style1"
            style={{ height: "133px" }}
          >
            {isLoading && <DashboardLoader />}
            {!isLoading && (
              <ul className="list-unstyled m-0 p-0">
                {visityOfTypeZero.length < 1 ? (
                  <li
                    className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
                  >
                    <span className="ps-3 d-block text-info fs-6">
                      لم تسجل كشوفات لهذا اليوم
                    </span>
                  </li>
                ) : null}

                {visityOfTypeZero.map((v) =>
                  v.type === 0 ? (
                    <li
                      key={v.id}
                      className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
                    >
                      <NavLink
                        to={`/Dashboard/Prescriptions-For/${v.applicationUser.firstName}-${v.applicationUser.middleName}-${v.applicationUser.lastName}/${v.applicationUser.id}`}
                        className="d-flex justify-content-between text-decoration-none d-block text-white fs-5"
                      >
                        <span>
                          <Stethoscope
                            fill="var(--grey-light)"
                            className={`${style.menuItemSvg} mx-3`}
                          />
                          {`${v.applicationUser.firstName} ${v.applicationUser.middleName} ${v.applicationUser.lastName} `}
                        </span>
                        <span
                          className={`${style.menuItemCount} bg-grey-dark text-center px-2 me-3 rounded-pill text-center`}
                        >
                          {convertcSharpTimeTo12HourSystem(v.createdAt)}
                        </span>
                      </NavLink>
                    </li>
                  ) : null
                )}
              </ul>
            )}
          </div>
        </div>

        {/* ***************************************************** */}

        <div
          className="menu rounded bg-blue-light overflow-hidden p-0 mt-2"
          style={{ height: "214px" }}
        >
          <h1 className="bg-danger text-white m-0 py-3 text-center fs-1">
            <svg width="50" height="50" fill="#FFF" viewBox="0 0 16 16">
              <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
            إستشارات اليوم
          </h1>
          <div
            className="menu-items overflow-scroll scrollbar-style1"
            style={{ height: "133px" }}
          >
            {isLoading && <DashboardLoader />}
            {!isLoading && (
              <ul className="list-unstyled m-0 p-0">
                {visityOfTypeNotZero.length < 1 ? (
                  <li
                    className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
                  >
                    <span className="ps-3 d-block text-info fs-6">
                      لم تسجل استشارات لهذا اليوم
                    </span>
                  </li>
                ) : null}
                {visityOfTypeNotZero.map((v) =>
                  v.type !== 0 ? (
                    <li
                      key={v.id}
                      className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
                    >
                      <NavLink
                        to={`/Dashboard/Prescriptions-For/${v.applicationUser.firstName}-${v.applicationUser.middleName}-${v.applicationUser.lastName}/${v.applicationUser.id}`}
                        className="d-flex justify-content-between text-decoration-none d-block text-white fs-5"
                      >
                        <span>
                          <Stethoscope
                            fill="var(--grey-light)"
                            className={`${style.menuItemSvg} mx-3`}
                          />
                          {`${v.applicationUser.firstName} ${v.applicationUser.middleName} ${v.applicationUser.lastName} `}
                        </span>
                        <span
                          className={`${style.menuItemCount} bg-grey-dark text-center px-2 me-3 rounded-pill text-center`}
                        >
                          {convertcSharpTimeTo12HourSystem(v.createdAt)}
                        </span>
                      </NavLink>
                    </li>
                  ) : null
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayPrescriptions;

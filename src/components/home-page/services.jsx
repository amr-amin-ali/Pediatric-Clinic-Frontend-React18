import { Fragment, useEffect, useState } from "react";
import { useStore } from "../../hooks-store/store";
import { httpGET } from "../../http/httpGET";
import { api } from "../../utility/api";

const Services = () => {
  const [state, dispatch] = useStore(false);
  const [isLoading, setIsLoading] = useState(false);
  let isClinicServicesInitiated = false;
  useEffect(() => {
    if (
      state.clinic_services.length < 1 &&
      isClinicServicesInitiated === false
    ) {
      setIsLoading(true);
      httpGET(api.clinic_services.get_all_services).then((result) => {
        dispatch("INITIATE_CLINIC_SERVICES", result);
        setIsLoading(false);
        console.log(result);
      });
    }
    isClinicServicesInitiated = true;
  }, []);
  if (isLoading)
    return <h1 className="text-center text-danger">Loading services</h1>;
  else
    return (
      <Fragment>
        {state.clinic_services.length > 0 && (
          <section id="services" className="py-5 px-1">
            <div className="container">
              <h1 className="main-title">خدمات العيادة</h1>
              <div className="row justify-content-center">
                {state.clinic_services.map((s) => (
                  <div key={s.id} className="col-md-3 col-sm-6 position-relative border border-dark border-opacity-50 rounded-3 m-2 p-1">
                    <img
                      src={api.base_url+'/'+s.image}
                      className="service-image img-fluid rounded-top"
                      style={{ height: "13rem", width: "100%" }}
                      alt=""
                    />
                    <h4 className="p-2 mb-0">{s.title}</h4>
                    <p className="p-1 mb-5">{s.text}</p>
                    <a
                      href="service.html"
                      className="btn btn--services-readmore text-white rounded-pill"
                      style={{ position: "absolute", bottom: "0.5rem" }}
                    >
                      إقرأ المزيد
                      <svg
                        className="bi bi-arrow-left-circle"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                        />
                      </svg>
                    </a>
                  </div>
                ))}

                <span id="appointment"></span>
              </div>
            </div>
          </section>
        )}
      </Fragment>
    );
};
export default Services;

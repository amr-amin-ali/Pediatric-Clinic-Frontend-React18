import { Fragment, useEffect, useState } from "react";
import { useStore } from "../../../hooks-store/store";
import { httpGET } from "../../../http/httpGET";
import { api } from "../../../utility/api";
import SiteLoadindSpiner from "../site-loading-spinner";
import ServiceItem from "./service-item";

const ServicesSection = () => {
  const sliderInterval = 3000;
  const [state, dispatch] = useStore(false);
  const [isLoading, setIsLoading] = useState(false);
  let [isInitiated, setIsInitiated] = useState(false);
  useEffect(() => {
    if (!state.clinic_services_store.isInitiated) {
      setIsLoading(true);
      httpGET(api.clinic_services.get_all_services)
      .then((response) => {
        if (response.status === 401) {
          alert("Please login first");
          dispatch("LOGOUT");
        }
        if (response.status === 200) {
          response.json().then((data) => {            
            dispatch("INITIATE_CLINIC_SERVICES", data);
          });
        }
          setIsLoading(false);
        })
        .catch((c) => {
          alert("Network error while fetching clinic services !!");
          setIsLoading(false);
        });
    }
    setIsInitiated(true);
  }, []);
  if (isLoading) return <SiteLoadindSpiner text="تحميل الخدمات" />;
  else
    return (
      <Fragment>
        {state.clinic_services_store.services.length > 0 && (
          <section id="services" className="py-5 px-1">
            <h1 className="text-success font-family-hacen">خدمات العيادة</h1>

            <div
              id="carouselExampleInterval"
              className="carousel carousel-dark slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {state.clinic_services_store.services.map((srvc) => {
                  return (
                    <div
                      key={srvc.id}
                      className={`carousel-item ${
                        state.clinic_services_store.services[0].id === srvc.id
                          ? "active"
                          : ""
                      }`}
                      data-bs-interval={sliderInterval}
                    >
                      <ServiceItem service={srvc} />
                    </div>
                  );
                })}

                <span id="appointment"></span>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            {/* <div className="row justify-content-center">
                {state.clinic_services.map((srvc) => (
                  <ServiceItem key={srvc.id} service={srvc} />
                ))}

                <span id="appointment"></span>
              </div> */}
          </section>
        )}
      </Fragment>
    );
};

export default ServicesSection;

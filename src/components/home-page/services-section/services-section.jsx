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
  let isClinicServicesInitiated = false;
  useEffect(() => {
    if (
      state.clinic_services.length < 1 &&
      isClinicServicesInitiated === false
    ) {
      setIsLoading(true);
      httpGET(api.clinic_services.get_all_services).then((result) => {
        setIsLoading(false);
        dispatch("INITIATE_CLINIC_SERVICES", result);
      });
    }
    isClinicServicesInitiated = true;
  }, []);
  // if (isLoading) return <h1 className="text-danger text-center">Loading services</h1> ;
  // else
    return (
      <Fragment>
        {state.clinic_services.length > 0 && (
          <section id="services" className="py-5 px-1">
            <h1 className="main-title">خدمات العيادة</h1>

            <div
              id="carouselExampleInterval"
              className="carousel carousel-dark slide"
              data-bs-ride="carousel"
            >
              <div
                className="carousel-inner">
                {state.clinic_services.map((srvc) => {
                  return (
                    <div
                      key={srvc.id}
                      className={`carousel-item ${
                        state.clinic_services[0].id === srvc.id ? "active" : ""
                      }`}
                      data-bs-interval={sliderInterval}
                    >
                      <ServiceItem service={srvc} />
                    </div>
                  );
                })}

                <span id="appointment"></span>

                {/* <div className="carousel-item" data-bs-interval="2000">
    <ServiceItem key={'srvc.id'} service={{id:1,title:'aaaa',text:'aattaatt',image:'https://image.shutterstock.com/image-vector/breaking-news-background-world-global-260nw-719766118.jpg'}} />
    <ServiceItem key={'srvc.idh'} service={{id:2,title:'bbbb',text:'bbttbbtt',image:'https://st.depositphotos.com/1186248/3276/i/600/depositphotos_32760371-stock-photo-breaking-news.jpg'}} />
    </div>
    <div className="carousel-item">
    <ServiceItem key={'srvc.idk'} service={{id:3,title:'cccc',text:'ccttcctt',image:'https://www.nationalbaptist.com/assets/uploads/2018/03/news-768x605.jpg'}} />
    </div> */}
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

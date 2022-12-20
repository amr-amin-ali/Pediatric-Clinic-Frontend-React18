import { api } from "../../../utility/api";
import clinicLogo from "../../../assets/clinicLogo.jpg";

const ServiceItem = ({ service }) => {
  return (
    <div className="row m-0">
      <div className="col-sm-12 col-md-6 shadow mx-auto border border-dark border-opacity-50 rounded-3 p-1">
        <img
          src={service.image ? `${api.base_url}${service.image}` : clinicLogo}
          className="img-fluid rounded-top w--100"
          style={{ height: "270px" }}
          alt={service.title}
        />
        <h4 className="p-2 mb-0 text-danger">{service.title}</h4>
        <p className="p-1 m-0 text-wrap" style={{ height: "4.9rem" }}>
          {service.text}
        </p>
      </div>
    </div>
  );
};

export default ServiceItem;

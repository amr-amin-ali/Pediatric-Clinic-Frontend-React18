import { api } from "../../../utility/api";

const ServiceItem = ({ service }) => {
  return (
    <div className="d-flex flex-row justify-content-center">
      <div className="border border-dark border-opacity-50 rounded-3 p-1">
        <img
          src={api.base_url + service.image}
          className="img-fluid rounded-top"
          style={{ height: "13rem", minWidth: "300px" }}
          alt={service.title}
        />
        <h4 className="p-2 mb-0">{service.title}</h4>
        <p className="p-1 mb-5  text-wrap">{service.text}</p>
      </div>
    </div>
  );
};

export default ServiceItem;

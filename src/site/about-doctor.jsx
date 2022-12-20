import { useState } from "react";
import { Link } from "react-router-dom";
import clinicLogo from "../assets/clinicLogo.jpg";
import { useStore } from "../hooks-store/store";
import { api } from "../utility/api";
import "./about-doctor.css";
const AboutDoctor = () => {
  document.title = "عن الدكتورة";
  const state = useStore(false)[0];

  const [firstTabTextColor, setFirstTabTextColor] = useState(
    "text-yellow-active bg-grey-active"
  );
  const [secondTabTextColor, setSecondTabTextColor] = useState("");
  const [thirdTabTextColor, setThirdTabTextColor] = useState("");
  const firstTabClickHandler = () => {
    setFirstTabTextColor("text-yellow-active bg-grey-active");
    setSecondTabTextColor("");
    setThirdTabTextColor("");
  };
  const secondTabClickHandler = () => {
    setFirstTabTextColor("");
    setSecondTabTextColor("text-green-active bg-grey-active");
    setThirdTabTextColor("");
  };
  const thirdTabClickHandler = () => {
    setFirstTabTextColor("");
    setSecondTabTextColor("");
    setThirdTabTextColor("text-red-active bg-grey-active");
  };
  return (
    <div className="doctor-profile-container">
      <div className="doctor-profile">
        <div className="doctor-profile-picture-container">
          <div className="back-to-home">
            <Link to="/">
              <svg
                className="scale-up-center"
                width="32"
                height="32"
                fill="#9099b7"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
              </svg>
            </Link>
          </div>
          <div className="doctor-profile-picture">
            <img
              src={
                state.metaDatas_store.metaDatas.doctorImage
                  ? `${api.base_url}${state.metaDatas_store.metaDatas.doctorImage}`
                  : clinicLogo
              }
              alt={api.base_url + state.metaDatas_store.metaDatas.doctorImage}
            />
          </div>
        </div>

        <div className="doctor-profile-title">
          <h3>{`${state.metaDatas_store.metaDatas.doctorFirstName ?? ""} ${
            state.metaDatas_store.metaDatas.doctorMiddleName ?? ""
          } ${state.metaDatas_store.metaDatas.doctorLastName ?? ""}`}</h3>
          <p>{state.metaDatas_store.metaDatas.doctorTitle ?? ""}</p>
        </div>

        <div className="doctor-profile-pane">
          <div className="pane-tabs m-0">
            <div
              onClick={firstTabClickHandler}
              className={`first-pane-tab p-2 m-0 text-center text-white  ${firstTabTextColor}`}
            >
              التواصل
            </div>
            <div
              onClick={secondTabClickHandler}
              className={`second-pane-tab p-2 m-0 text-center text-white  ${secondTabTextColor}`}
            >
              علمية
            </div>
            <div
              onClick={thirdTabClickHandler}
              className={`third-pane-tab p-2 m-0 text-center text-white  ${thirdTabTextColor}`}
            >
              مهنية
            </div>
          </div>
          <div className="tabs-content p-2">
            {firstTabTextColor && (
              <div className="first-content">
                <ul>
                  {state.metaDatas_store.metaDatas.doctorPhone1 && (
                    <li>
                      <h4>هاتف:</h4>
                    </li>
                  )}
                  {!state.metaDatas_store.metaDatas.doctorPhone1 &&
                    state.metaDatas_store.metaDatas.doctorPhone2 && (
                      <li>
                        <h4>هاتف:</h4>
                      </li>
                    )}
                  {state.metaDatas_store.metaDatas.doctorPhone1 && (
                    <li className="m-0 ps-5">
                      {state.metaDatas_store.metaDatas.doctorPhone1}
                    </li>
                  )}
                  {state.metaDatas_store.metaDatas.doctorPhone2 && (
                    <li className="m-0 ps-5">
                      {state.metaDatas_store.metaDatas.doctorPhone2}
                    </li>
                  )}

                  {state.metaDatas_store.metaDatas.doctorWhatsapp && (
                    <li>
                      Whatsapp: {state.metaDatas_store.metaDatas.doctorWhatsapp}
                    </li>
                  )}
                  {state.metaDatas_store.metaDatas.doctorTelegram && (
                    <li>
                      Telegram: {state.metaDatas_store.metaDatas.doctorTelegram}
                    </li>
                  )}
                  {state.metaDatas_store.metaDatas.doctorFacebook && (
                    <li>
                      Facebook: {state.metaDatas_store.metaDatas.doctorFacebook}
                    </li>
                  )}
                  {state.metaDatas_store.metaDatas.doctorEmail && (
                    <li>
                      Facebook: {state.metaDatas_store.metaDatas.doctorEmail}
                    </li>
                  )}
                </ul>
              </div>
            )}
            {secondTabTextColor && (
              <p className="second-content">
                {state.metaDatas_store.metaDatas.doctorScientificData}
              </p>
            )}
            {thirdTabTextColor && (
              <p className="third-content">
                {state.metaDatas_store.metaDatas.doctorProfessionalData}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutDoctor;

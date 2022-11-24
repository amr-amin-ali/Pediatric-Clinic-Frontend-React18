import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useStore } from "../../../hooks-store/store";
import { api } from "../../../utility/api";
import BabySvg from "../../dashboard/icons/baby-svg";
import FlowerSvg from "../../dashboard/icons/flower-svg";

const Navbar = () => {
  const [state, dispatch] = useStore(true);
  const navbarTogglerRef = useRef();
  const navlinlClickHandler = () => {
    // Collapse Navbar
    navbarTogglerRef.current.click();
  };

  return (
    <nav className="navbar navbar-expand-lg p-0 border-bottom border-3 border-danger bg-white">
      <div className="container-fluid">
        <NavLink
          to="/"
          className="navbar-brand fw-bolder m-0 fs-6 text-danger navbar-tablet"
          style={{ fontFamily: "var(--hacen-font)" }}
        >
          {state.metaDatas.clinicLogo && (
            <img
              className="me-2 navbar-img-tablet"
              style={{ maxWidth: "3.5rem" }}
              src={api.base_url + state.metaDatas.clinicLogo}
              alt="clinic logo"
            />
          )}

          {!state.metaDatas.clinicLogo && (
            <span className="me-2">
              <BabySvg />
            </span>
          )}

          {state.metaDatas.clinicName ?? "الدكتورة ريهام الشماخ"}
        </NavLink>
        <button
          ref={navbarTogglerRef}
          className="navbar-toggler p-1 collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item  border-1 home-nav-item-desktop  border-bottom border-danger">
              <NavLink
                to="/"
                onClick={navlinlClickHandler}
                className="nav-link text-success fs-5 fw-bold"
                aria-current="page"
              >
                الرئيسية
              </NavLink>
            </li>
            <li className="nav-item  border-1 home-nav-item-desktop  border-bottom border-danger">
              <NavLink
                to="/Articles"
                onClick={navlinlClickHandler}
                className="nav-link text-success fs-5 fw-bold"
              >
                المقالات
              </NavLink>
            </li>
            <li className="nav-item  border-1 home-nav-item-desktop  border-bottom border-danger">
              <NavLink
                to="/News"
                onClick={navlinlClickHandler}
                className="nav-link text-success fs-5 fw-bold"
              >
                الأخبار
              </NavLink>
            </li>
            <li className="nav-item  border-1 home-nav-item-desktop  border-bottom border-danger">
              <NavLink
                to="/Vaccines"
                onClick={navlinlClickHandler}
                className="nav-link text-success fs-5 fw-bold"
              >
                التطعيمات
              </NavLink>
            </li>
            <li className="nav-item  border-1 home-nav-item-desktop  border-bottom border-danger">
              <NavLink
                to="/About-Doctor"
                onClick={navlinlClickHandler}
                className="nav-link text-success fs-5 fw-bold"
              >
                عن الدكتورة
              </NavLink>
            </li>
            {!state.login.isLoggedIn && (
              <li className="nav-item  border-1 home-nav-item-desktop ">
                <NavLink
                  to="/Login"
                  onClick={navlinlClickHandler}
                  className="nav-link text-success fs-5 fw-bold"
                >
                  دخول
                </NavLink>
              </li>
            )}
            {state.login.isLoggedIn && (
              <li className="nav-item  border-1 home-nav-item-desktop ">
                <div className="dropdown-center">
                  <a
                    className="nav-link text-success fs-5 fw-bold"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    خيارات
                  </a>
                  <ul className="dropdown-menu">
                    {state.login.isLoggedIn && state.login.role === "Doctor" && (
                      <li className="nav-item  border-1 home-nav-item-desktop">
                        <NavLink
                          to="/Dashboard"
                          onClick={navlinlClickHandler}
                          className="nav-link text-success fs-5 fw-bold"
                        >
                          الإدارة
                        </NavLink>
                      </li>
                    )}
                    <li>
                      <a
                        className="nav-link text-success fs-5 fw-bold"
                        href="#"
                      >
                        البروفايل
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          dispatch("LOGOUT");
                          navlinlClickHandler();
                        }}
                        className="nav-link text-success fs-5 fw-bold"
                        style={{ color: "red" }}
                        href="#"
                      >
                        خروج
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

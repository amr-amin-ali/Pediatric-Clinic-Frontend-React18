import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useStore } from "../../../hooks-store/store";
import { api } from "../../../utility/api";

const Navbar = () => {
  const [state, dispatch] = useStore(true);
  const navbarTogglerRef = useRef();
  const navlinlClickHandler = () => {
    // Collapse Navbar
    navbarTogglerRef.current.click();
  };

  return (
    <nav className="navbar navbar-expand-lg p-0 site-nav">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand fw-bold m-0 site-navbar-brand">
          {state.metaDatas.clinicLogo && (
            <img
              className="navbar-brand-img"
              src={api.base_url + state.metaDatas.clinicLogo}
              alt="clinic logo"
            />
          )}
          {!state.metaDatas.clinicLogo && (
            <svg fill="green" width="50" height="50" viewBox="0 0 24 24">
              <path d="M19.94 9.377c-1.134-2.615-3.449-4.53-6.253-5.088l-0.055-0.009 1.254-2.007-1.272-0.795-1.655 2.648c-3.529 0.017-6.556 2.15-7.878 5.195l-0.022 0.056c-1.836 0.036-3.31 1.532-3.31 3.373s1.475 3.338 3.307 3.373l0.003 0c1.349 3.113 4.395 5.252 7.94 5.252s6.591-2.138 7.919-5.196l0.022-0.056c1.836-0.036 3.31-1.532 3.31-3.373s-1.475-3.338-3.307-3.373l-0.003-0zM21.213 14.063c-0.332 0.339-0.791 0.552-1.3 0.561l-0.002 0-0.971 0.018-0.38 0.894c-1.114 2.572-3.631 4.339-6.56 4.339s-5.446-1.767-6.542-4.293l-0.018-0.046-0.38-0.894-0.971-0.018c-1.019-0.020-1.838-0.851-1.838-1.874s0.819-1.854 1.836-1.874l0.002-0 0.971-0.018 0.38-0.894c1.114-2.572 3.631-4.339 6.56-4.339s5.446 1.767 6.542 4.293l0.018 0.046 0.38 0.894 0.971 0.018c1.020 0.020 1.838 0.851 1.838 1.873 0 0.512-0.205 0.975-0.537 1.313l0-0z"></path>
              <path d="M7.875 10.875h1.875v1.875h-1.875v-1.875z"></path>
              <path d="M14.25 10.875h1.875v1.875h-1.875v-1.875z"></path>
              <path d="M12 18c2.071 0 3.75-1.679 3.75-3.75v0h-7.5c0 2.071 1.679 3.75 3.75 3.75v0z"></path>
            </svg>
          )}
          {state.metaDatas.clinicName??"  إسم العيادة "}
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
            <li className="nav-item site-nav-item">
              <NavLink
                to="/"
                onClick={navlinlClickHandler}
                className="nav-link fw-bold"
                aria-current="page"
              >
                الرئيسية
              </NavLink>
            </li>
            <li className="nav-item site-nav-item">
              <NavLink
                to="/Articles"
                onClick={navlinlClickHandler}
                className="nav-link fw-bold"
              >
                المقالات
              </NavLink>
            </li>
            <li className="nav-item site-nav-item">
              <NavLink
                to="/News"
                onClick={navlinlClickHandler}
                className="nav-link fw-bold"
              >
                الأخبار
              </NavLink>
            </li>
            <li className="nav-item site-nav-item">
              <NavLink
                to="/Vaccines"
                onClick={navlinlClickHandler}
                className="nav-link fw-bold"
              >
                التطعيمات
              </NavLink>
            </li>
            <li className="nav-item site-nav-item">
              <NavLink
                to="/About-Doctor"
                onClick={navlinlClickHandler}
                className="nav-link fw-bold"
              >
                عن الدكتورة
              </NavLink>
            </li>
            {!state.login.isLoggedIn && (
              <li className="nav-item site-nav-item">
                <NavLink
                  to="/Login"
                  onClick={navlinlClickHandler}
                  className="nav-link fw-bold"
                >
                  دخول
                </NavLink>
              </li>
            )}
            {state.login.isLoggedIn && (
              <li className="nav-item site-nav-item">
                <div className="dropdown-center">
                  <a
                    className="nav-link fw-bold"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    خيارات
                  </a>
                  <ul className="dropdown-menu">
                    {state.login.isLoggedIn && state.login.role === "Doctor" && (
                      <li className="nav-item site-nav-item">
                        <NavLink
                          to="/Dashboard"
                          onClick={navlinlClickHandler}
                          className="nav-link fw-bold"
                        >
                          الإدارة
                        </NavLink>
                      </li>
                    )}
                    <li>
                      <a className="nav-link fw-bold" href="#">
                        البروفايل
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          dispatch("LOGOUT");
                          navlinlClickHandler();
                        }}
                        className="nav-link fw-bold"
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

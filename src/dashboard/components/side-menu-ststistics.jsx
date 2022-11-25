import style from "./side-menu.module.css";
import "./side-menu-statistics.module.css";
import { NavLink } from "react-router-dom";
import Stethoscope from "./icons/stethoscope";
const SideMenuStatistics = () => {
  return (
    <div className="col-lg-4 col-sm-12  px-3 py-3">
      <div className="row m-0">
        <div
          className="menu rounded bg-blue-light overflow-hidden p-0 mb-5"
          style={{ height: "214px" }}
        >
          <h1 className="bg-info text-white m-0 py-3 text-center fs-1">
            <svg width="50" height="50" fill="#FFF" viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
            كشوفات اليوم
          </h1>
          <div
            className="menu-items overflow-scroll scrollbar-style1"
            style={{ height: "133px" }}
          >
            <ul className="list-unstyled m-0 p-0">
              <li
                className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
              >
                <NavLink
                  to="Bookings"
                  className="d-flex justify-content-between text-decoration-none d-block text-white fs-5"
                >
                  <span>
                    <Stethoscope
                      fill="var(--grey-light)"
                      className={`${style.menuItemSvg} mx-3`}
                    />
                    أنس عمرو
                  </span>
                  <span
                    className={`${style.menuItemCount} bg-grey-dark text-center px-2 me-3 rounded-pill text-center`}
                  >
                    pm 08:00
                  </span>
                </NavLink>
              </li>
              <li
                className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
              >
                <NavLink
                  to="Bookings"
                  className="d-flex justify-content-between text-decoration-none d-block text-white fs-5"
                >
                  <span>
                    <Stethoscope
                      fill="var(--grey-light)"
                      className={`${style.menuItemSvg} mx-3`}
                    />
                    أنس عمرو
                  </span>
                  <span
                    className={`${style.menuItemCount} bg-grey-dark text-center px-2 me-3 rounded-pill text-center`}
                  >
                    pm 08:00
                  </span>
                </NavLink>
              </li>
              <li
                className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
              >
                <NavLink
                  to="Bookings"
                  className="d-flex justify-content-between text-decoration-none d-block text-white fs-5"
                >
                  <span>
                    <Stethoscope
                      fill="var(--grey-light)"
                      className={`${style.menuItemSvg} mx-3`}
                    />
                    أنس عمرو
                  </span>
                  <span
                    className={`${style.menuItemCount} bg-grey-dark text-center px-2 me-3 rounded-pill text-center`}
                  >
                    pm 08:00
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* ***************************************************** */}

        <div
          className="menu rounded bg-blue-light overflow-hidden p-0 mt-2"
          style={{ height: "214px" }}
        >
          <h1 className="bg-danger text-white m-0 py-3 text-center fs-1">
            <svg width="50" height="50" fill="#FFF" viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
            إستشارات اليوم
          </h1>
          <div
            className="menu-items overflow-scroll scrollbar-style1"
            style={{ height: "133px" }}
          >
            <ul className="list-unstyled m-0 p-0">
              <li
                className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
              >
                <NavLink
                  to="Bookings"
                  className="d-flex justify-content-between text-decoration-none d-block text-white fs-5"
                >
                  <span>
                    <Stethoscope
                      fill="var(--grey-light)"
                      className={`${style.menuItemSvg} mx-3`}
                    />
                    أنس عمرو
                  </span>
                  <span
                    className={`${style.menuItemCount} bg-grey-dark text-center px-2 me-3 rounded-pill text-center`}
                  >
                    pm 08:00
                  </span>
                </NavLink>
              </li>
              <li
                className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
              >
                <NavLink
                  to="Bookings"
                  className="d-flex justify-content-between text-decoration-none d-block text-white fs-5"
                >
                  <span>
                    <Stethoscope
                      fill="var(--grey-light)"
                      className={`${style.menuItemSvg} mx-3`}
                    />
                    أنس عمرو
                  </span>
                  <span
                    className={`${style.menuItemCount} bg-grey-dark text-center px-2 me-3 rounded-pill text-center`}
                  >
                    pm 08:00
                  </span>
                </NavLink>
              </li>
              <li
                className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
              >
                <NavLink
                  to="Bookings"
                  className="d-flex justify-content-between text-decoration-none d-block text-white fs-5"
                >
                  <span>
                    <Stethoscope
                      fill="var(--grey-light)"
                      className={`${style.menuItemSvg} mx-3`}
                    />
                    أنس عمرو
                  </span>
                  <span
                    className={`${style.menuItemCount} bg-grey-dark text-center px-2 me-3 rounded-pill text-center`}
                  >
                    pm 08:00
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenuStatistics;

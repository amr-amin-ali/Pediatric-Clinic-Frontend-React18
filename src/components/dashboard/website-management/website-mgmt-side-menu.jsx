import { NavLink } from "react-router-dom";
import { useStore } from "../../../hooks-store/store";
import styles from "./website-mgmt-side-menu.module.css";
const WebsiteManagementSideMenu = () => {
  const state = useStore(false)[0];
  // console.log(state.news)
  return (
    <div className="px-3 py-3">
      <div
        className="menu rounded bg-blue-light overflow-hidden"
        style={{ height: "484px" }}
      >
        <h1 className="bg-green-light text-white m-0 py-3 text-center fs-1">
          <svg width="50" height="50" fill="#FFF" viewBox="0 0 16 16">
            <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
          </svg>
          القائمة
        </h1>

        <div
          className="menu-items overflow-scroll scrollbar-style1"
          style={{ height: "402px" }}
        >
          <ul className="list-unstyled m-0 p-0">
            <li
              className={`${styles.menuItem} position-relative py-3 border border-blue-dark`}
            >
              <NavLink
                to="/Dashboard/Website-Management/Meta-Data"
                className="text-decoration-none d-block text-white fs-5"
              >
                <svg
                  className={`${styles.menuItemSvg} mx-3`}
                  width="30"
                  height="30"
                  fill="var(--grey-light)"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                </svg>
                بيانات العيادة
              </NavLink>
            </li>
            <li
              className={`${styles.menuItem} position-relative py-3 border border-blue-dark`}
            >
              <NavLink
                to="/Dashboard/Website-Management/Vaccines"
                className="d-flex justify-content-between text-decoration-none d-block text-white fs-5"
              >
                <span>
                  <svg
                    className={`${styles.menuItemSvg} mx-3`}
                    width="30"
                    height="30"
                    fill="var(--grey-light)"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                  </svg>
                  جدول التطعيمات
                </span>
                {state.vaccins && state.vaccins.length > 0 && (
                  <span
                    className={`${styles.menuItemCount} bg-grey-dark text-center px-2 me-3 rounded-pill text-center`}
                  >
                    {state.vaccins.length}
                  </span>
                )}
              </NavLink>
            </li>
            <li
              className={`${styles.menuItem} position-relative py-3 border border-blue-dark`}
            >
              <NavLink
                to="/Dashboard/Website-Management/News"
                className="d-flex justify-content-between text-decoration-none d-block text-white fs-5"
              >
                <span>
                  <svg
                    className={`${styles.menuItemSvg} mx-3`}
                    width="30"
                    height="30"
                    fill="var(--grey-light)"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                  </svg>
                  أخبار العيادة
                </span>
                {state.news && state.news.length > 0 && (
                  <span
                    className={`${styles.menuItemCount} bg-grey-dark text-center px-2 me-3 rounded-pill text-center`}
                  >
                    {state.news.length}
                  </span>
                )}
              </NavLink>
            </li>

            <li
              className={`${styles.menuItem} position-relative py-3 border border-blue-dark`}
            >
              <NavLink
                to="/Dashboard/Website-Management/Articles"
                className="d-flex justify-content-between text-decoration-none d-block text-white fs-5"
              >
                <span>
                  <svg
                    className={`${styles.menuItemSvg} mx-3`}
                    width="30"
                    height="30"
                    fill="var(--grey-light)"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                  </svg>
                  المقالات
                </span>
                {state.articles && state.articles.length > 0 && (
                  <span
                    className={`${styles.menuItemCount} bg-grey-dark text-center px-2 me-3 rounded-pill text-center`}
                  >
                    {state.articles.length}
                  </span>
                )}
              </NavLink>
            </li>
            <li
              className={`${styles.menuItem} position-relative py-3 border border-blue-dark`}
            >
              <NavLink
                to="/Dashboard/Website-Management/Services"
                className="d-flex justify-content-between text-decoration-none d-block text-white fs-5"
              >
                <span>
                  <svg
                    className={`${styles.menuItemSvg} mx-3`}
                    width="30"
                    height="30"
                    fill="var(--grey-light)"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                  </svg>
                  خدمات العيادة
                </span>
                {state.clinic_services && state.clinic_services.length > 0 && (
                  <span
                    className={`${styles.menuItemCount} bg-grey-dark text-center px-2 me-3 rounded-pill text-center`}
                  >
                    {state.clinic_services.length}
                  </span>
                )}
              </NavLink>
            </li>

            <li
              className={`${styles.menuItem} position-relative py-3 border border-blue-dark`}
            >
              <NavLink
                to="/Dashboard/Website-Management/SliderManagement"
                className="d-flex justify-content-between text-decoration-none d-block text-white fs-5"
              >
                <span>
                  <svg
                    className={`${styles.menuItemSvg} mx-3`}
                    width="30"
                    height="30"
                    fill="var(--grey-light)"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                  </svg>
                  معرض الصور
                </span>
                {state.sliderImages && state.sliderImages.length > 0 && (
                  <span
                    className={`${styles.menuItemCount} bg-grey-dark text-center px-2 me-3 rounded-pill text-center`}
                  >
                    {state.sliderImages.images.length}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default WebsiteManagementSideMenu;

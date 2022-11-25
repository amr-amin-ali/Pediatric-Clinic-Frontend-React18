import { NavLink } from "react-router-dom";
import { useStore } from "../../hooks-store/store";
import style from "./side-menu.module.css";
const SideMenu = () => {
  const state = useStore(true)[0];

  return (
    <div className="col-lg-4 col-sm-12 px-3 py-3">
      <div
        className="menu rounded bg-blue-light overflow-hidden"
        style={{ height: "484px" }}
      >
        <h1 className="bg-green-light text-white m-0 py-3 text-center fs-1">
          <svg width="50" height="50" fill="#FFF" viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
          القائمة
        </h1>

        <div
          className="menu-items overflow-scroll scrollbar-style1"
          style={{ height: "402px" }}
        >
          <ul className="list-unstyled m-0 p-0">
            <li
              className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
            >
              <NavLink
                to="/Dashboard/Website-Management"
                className="text-decoration-none d-block text-white fs-5"
              >
                <svg
                  className={`${style.menuItemSvg} mx-3`}
                  width="30"
                  height="30"
                  fill="var(--grey-light)"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                </svg>
                إدارة الموقع
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
                  <svg
                    className={`${style.menuItemSvg} mx-3`}
                    width="30"
                    height="30"
                    fill="var(--grey-light)"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                  </svg>
                  الحجز
                </span>
                {state.bookings_store.bookings && state.bookings_store.bookings.length > 0 && (
                  <span
                    className={`${style.menuItemCount} bg-grey-dark text-center px-2 me-3 rounded-pill text-center`}
                  >
                    {state.bookings_store.bookings.length}
                  </span>
                )}
              </NavLink>
            </li>

            <li
              className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
            >
              <NavLink
                to="Files"
                className="text-decoration-none d-block text-white fs-5"
              >
                <span>
                  <svg
                    className={`${style.menuItemSvg} mx-3`}
                    width="30"
                    height="30"
                    fill="var(--grey-light)"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                  </svg>
                  الملفات
                </span>
                {state.files && state.files.length > 0 && (
                  <span className="menu-item-count bg-grey-dark text-center px-2 me-3 rounded-pill text-center">
                    {state.files.length}
                  </span>
                )}
              </NavLink>
            </li>
            <li
              className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
            >
              <NavLink
                to="Purchases"
                className="text-decoration-none d-block text-white fs-5"
              >
                <span>
                  <svg
                    className={`${style.menuItemSvg} mx-3`}
                    width="30"
                    height="30"
                    fill="var(--grey-light)"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                  </svg>
                  المشتريات
                </span>
                {state.purchases && state.purchases.length > 0 && (
                  <span className="menu-item-count bg-grey-dark text-center px-2 me-3 rounded-pill text-center">
                    {state.purchases.length}
                  </span>
                )}
              </NavLink>
            </li>

            <li
              className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
            >
              <NavLink
                to="Payments"
                className="text-decoration-none d-block text-white fs-5"
              >
                <span>
                  <svg
                    className={`${style.menuItemSvg} mx-3`}
                    width="30"
                    height="30"
                    fill="var(--grey-light)"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                  </svg>
                  المدفوعات
                </span>
                {state.purchases && state.purchases.length > 0 && (
                  <span className="menu-item-count bg-grey-dark text-center px-2 me-3 rounded-pill text-center">
                    {state.purchases.length}
                  </span>
                )}
              </NavLink>
            </li>

            <li
              className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
            >
              <NavLink
                to="Medicines"
                className="text-decoration-none d-block text-white fs-5"
              >
                <span>
                  <svg
                    className={`${style.menuItemSvg} mx-3`}
                    width="30"
                    height="30"
                    fill="var(--grey-light)"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.02 5.364a3 3 0 0 0-4.242-4.243L1.121 6.778a3 3 0 1 0 4.243 4.243l5.657-5.657Zm-6.413-.657 2.878-2.879a2 2 0 1 1 2.829 2.829L7.435 7.536 4.607 4.707ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-.5 1.041a3 3 0 0 0 0 5.918V9.04Zm1 5.918a3 3 0 0 0 0-5.918v5.918Z"
                    />
                  </svg>
                  الأدوية
                </span>
                {state.medicines && state.medicines.length > 0 && (
                  <span className="menu-item-count bg-grey-dark text-center px-2 me-3 rounded-pill text-center">
                    {state.medicines.length}
                  </span>
                )}
              </NavLink>
            </li>
            <li
              className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
            >
              <NavLink
                to="Tools"
                className="text-decoration-none d-block text-white fs-5"
              >
                <span>
                  <svg
                    className={`${style.menuItemSvg} mx-3`}
                    width="30"
                    height="30"
                    fill="var(--grey-light)"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                  </svg>
                  الأدوات
                </span>
                {state.tools && state.tools.length > 0 && (
                  <span className="menu-item-count bg-grey-dark text-center px-2 me-3 rounded-pill text-center">
                    {state.tools.length}
                  </span>
                )}
              </NavLink>
            </li>
            <li
              className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
            >
              <NavLink
                to="/"
                className="text-decoration-none d-block text-white fs-5"
              >
                <span>
                  <svg
                    className={`${style.menuItemSvg} mx-3`}
                    width="30"
                    height="30"
                    fill="var(--grey-light)"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                  </svg>
                  طباعة روشتة
                </span>
              </NavLink>
            </li>
            <li
              className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
            >
              <NavLink
                to="/"
                className="text-decoration-none d-block text-white fs-5"
                target="_blank"
              >
                <svg
                  className={`${style.menuItemSvg} mx-3`}
                  width="30"
                  height="30"
                  fill="var(--grey-light)"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                </svg>
                Clock 1
              </NavLink>
            </li>
            <li
              className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
            >
              <NavLink
                to="/"
                className="text-decoration-none d-block text-white fs-5"
                target="_blank"
              >
                <svg
                  className={`${style.menuItemSvg} mx-3`}
                  width="30"
                  height="30"
                  fill="var(--grey-light)"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                </svg>
                Clock 2
              </NavLink>
            </li>
            <li
              className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
            >
              <NavLink
                to="/"
                className="text-decoration-none d-block text-white fs-5"
                target="_blank"
              >
                <svg
                  className={`${style.menuItemSvg} mx-3`}
                  width="30"
                  height="30"
                  fill="var(--grey-light)"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                </svg>
                Clock 3
              </NavLink>
            </li>
            <li
              className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
            >
              <NavLink
                to="/"
                className="text-decoration-none d-block text-white fs-5"
              >
                <span>
                  <svg
                    className={`${style.menuItemSvg} mx-3`}
                    width="30"
                    height="30"
                    fill="var(--grey-light)"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                  </svg>
                  الرسائل
                </span>
                {state.tools && state.tools.length > 0 && (
                  <span className="menu-item-count bg-grey-dark text-center px-2 me-3 rounded-pill text-center">
                    {state.tools.length}
                  </span>
                )}
              </NavLink>
            </li>
            <li
              className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
            >
              <NavLink
                to="/"
                className="text-decoration-none d-block text-white fs-5"
              >
                <svg
                  className={`${style.menuItemSvg} mx-3`}
                  width="30"
                  height="30"
                  fill="var(--grey-light)"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 5a2 2 0 0 0-2 2v.5H.5a.5.5 0 0 0 0 1H1V9a2 2 0 0 0 2 2h1a3 3 0 0 0 3-3 1 1 0 1 1 2 0 3 3 0 0 0 3 3h1a2 2 0 0 0 2-2v-.5h.5a.5.5 0 0 0 0-1H15V7a2 2 0 0 0-2-2h-2a2 2 0 0 0-1.888 1.338A1.99 1.99 0 0 0 8 6a1.99 1.99 0 0 0-1.112.338A2 2 0 0 0 5 5H3zm0 1h.941c.264 0 .348.356.112.474l-.457.228a2 2 0 0 0-.894.894l-.228.457C2.356 8.289 2 8.205 2 7.94V7a1 1 0 0 1 1-1z" />
                </svg>
                نظرة عامة
              </NavLink>
            </li>
            <li
              className={`${style.menuItem} position-relative py-3 border border-blue-dark`}
            >
              <NavLink
                to="/"
                className="text-decoration-none d-block text-white fs-5"
              >
                <svg
                  className={`${style.menuItemSvg} mx-3`}
                  width="30"
                  height="30"
                  fill="var(--grey-light)"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A1.993 1.993 0 0 0 8 6c-.532 0-1.016.208-1.375.547zM14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                </svg>
                نظرة مخصصة
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default SideMenu;

import styles from "./backdrop.module.css";
const Backdrop = ({ hideModalHandler, show = false }) => {
  return (
    <div
      onClick={hideModalHandler}
      className={`${styles.backdrop} ${
        show ? styles.BackdropOpen : styles.BackdropClosed
      }`}
    ></div>
  );
};
export default Backdrop;

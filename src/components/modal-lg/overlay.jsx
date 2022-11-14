import styles from "./overlay.module.css";
const Overlay = ({ show = false, children, closed }) => {
  // if (!show) {
  //   return null;
  // }
  return (
    <div
      // hidden={!show}
      className={`${styles.overlay} ${
        show ? styles.overlayOpen : styles.overlayClosed
      }`}
    >
      <div className={styles.modalLgContent}>{children}</div>
    </div>
  );
};
export default Overlay;

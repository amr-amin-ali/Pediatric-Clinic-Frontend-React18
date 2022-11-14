import styles from "./modal-header.module.css";
const ModalLgHeader = ({ title, onClose = null }) => {
  return (
    <div className={styles.modalHeaderContainer}>
      <h4 className={styles.modalHeaderTitle}>
        {title}
        <button
          className="btn p-0 border-0 text-white position-absolute p-0"
          style={{ left: "0%", top: "-15%" }}
          onClick={onClose}
        >
          <svg fill="#f00" width="64" height="64" viewBox="0 0 16 16">
            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
          </svg>
        </button>
      </h4>
    </div>
  );
};
export default ModalLgHeader;

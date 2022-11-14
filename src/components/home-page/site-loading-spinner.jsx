import styles from "./site-loading-spinner.module.css";
const SiteLoadindSpiner = ({ text }) => {
  return (
    <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
        <h4 className={styles.loaderText}>{text}</h4>
    </div>
  );
};
export default SiteLoadindSpiner;

import styles from "./dashboardLoader.module.css";
const DashboardLoader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};
export default DashboardLoader;

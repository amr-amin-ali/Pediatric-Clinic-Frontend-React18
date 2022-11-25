import styles from "./dashboardLoader.module.css";
const DashboardLoader = ({text}) => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
      <h4 className="text-white">{text}</h4>
    </div>
  );
};
export default DashboardLoader;

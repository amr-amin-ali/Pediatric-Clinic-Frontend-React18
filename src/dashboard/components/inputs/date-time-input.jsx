import styles from "./date-time-input.module.css";
const DateTimeInput = ({
  type = "date",
  title,
  onChangeHandler = null,
  name,
  value,
  id = null,
}) => {
  return (
    <div className={`position-relative w-100`}>
      <input
        onChange={onChangeHandler}
        className={`form-control form-control-lg rounded py-1 px-2 w-100 border-1 border-blue-dark bg-grey-dark ${styles.dateInput}`}
        type={type === "date" ? type : "time"}
        name={name}
        id={id || name}
        value={value}
      />
      <label className={styles.label} htmlFor={id || name}>
        {title}
      </label>
    </div>
  );
};
export default DateTimeInput;

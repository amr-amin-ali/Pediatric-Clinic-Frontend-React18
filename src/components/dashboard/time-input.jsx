import styles from "./time-input.module.css";
const TimeInput = ({
  title,
  onChangeHandler = null,
  name,
  value,
  id = null,
}) => {
  return (
    <div className={styles.textInputContainer}>
      <input
        onChange={onChangeHandler}
        className={`form-control form-control-lg ${styles.dateInput}`}
        type="time"
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
export default TimeInput;

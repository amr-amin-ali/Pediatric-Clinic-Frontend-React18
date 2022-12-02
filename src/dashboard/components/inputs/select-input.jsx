import styles from "./select-input.module.css";
const SelectInput = ({
  title,
  onChangeHandler = null,
  items,
  name,
  id = null,
  selectedValue = '',
}) => {
  return (
    <div className="form-floating">
      <select
        name={name}
        onChange={onChangeHandler}
        value={selectedValue}
        className={`form-select ${styles.selectInputStyle}`}
        id={id || name}
        aria-label="Floating label select example"
      >
        <option value="">--- إختر من القائمة ---</option>
        {items &&
          items.map((item) => (
            <option
              key={`${item.value}${item.text}`}
              value={item.value}
            >
              {item.text}
            </option>
          ))}
      </select>
      <label className={styles.label} htmlFor={id || name}>
        {title}
      </label>
    </div>
  );
};
export default SelectInput;

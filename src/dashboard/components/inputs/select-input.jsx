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
        className={`form-select my-dashboard-textAndNumber-inputs  bg-grey-dark border-1 border-blue-dark `}
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
      <label className="my-dashboard-labels" htmlFor={id || name}>
        {title}
      </label>
    </div>
  );
};
export default SelectInput;

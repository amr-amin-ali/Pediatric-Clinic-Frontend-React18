const TextInput = ({
  required = false,
  onChangeHandler = null,
  placeholder,
  name,
  value,
  id = null,
}) => {
  return (
    <div className="form-floating">
      <input
        type="text"
        className={`form-control form-control-lg bg-grey-dark  border-1 border-blue-dark my-dashboard-textAndNumber-inputs`}
        id={id || name}
        name={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        
      />
      <label className="my-dashboard-labels" htmlFor={name}>
        {placeholder}
      </label>
    </div>
  );
};

export default TextInput;

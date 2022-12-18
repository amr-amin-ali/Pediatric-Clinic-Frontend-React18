const NumberInput = ({ step, placeholder,onChangeHandler=null, name, value, id = null }) => {
  return (
    <div className="form-floating">
      <input
      onChange={onChangeHandler}
        step={step || 1}
        type="number"
        className={`form-control form-control-lg bg-grey-dark border-1 border-blue-dark   my-dashboard-textAndNumber-inputs`}
        id={id || name}
        name={name}
        placeholder={placeholder}
        value={value}
      />
      <label className="my-dashboard-labels" htmlFor={name}>
        {placeholder}
      </label>
    </div>
  );
};
export default NumberInput;

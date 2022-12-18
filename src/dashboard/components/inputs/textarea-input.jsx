const TextareaInput = ({
  placeholder,
  onChangeHandler = null,
  name,
  value,
  id = null,
}) => {
  return (
    <div className="form-floating">
      <textarea
        onChange={onChangeHandler}
        style={{height: "180px"}}
        className={`form-control  bg-grey-dark  border-1 border-blue-dark my-dashboard-textAndNumber-inputs`}
        id={id || name}
        name={name}
        placeholder={placeholder}
        value={value}
      ></textarea>
      <label className="my-dashboard-labels" htmlFor={name}>
        {placeholder}
      </label>
    </div>
  );
};
export default TextareaInput;

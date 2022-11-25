import "./switch-input..css";
const SwitchInput = ({ clickAction, on = false }) => {
  return (
      <div onClick={clickAction} className="switch">
        <div className="outer-lane">
          <div className={`inner-lane white ${on ? "off" : ""}`}></div>
          <div className={`inner-lane orange ${on ? "on" : ""}`}></div>
          <div className={`button ${on ? "active" : ""}`}>
            <div className="left circle"></div>
            <div className="right circle"></div>
          </div>
        </div>
      </div>
  );
};

export default SwitchInput;

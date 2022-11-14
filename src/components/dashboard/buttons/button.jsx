import styles from "./button.module.css";
//red green blue yellow
const Button = ({ width, clickHandler, title, color }) => {
  let buttonColor;
  switch (color) {
    case "red":
      buttonColor = styles.red;
      break;
    case "green":
      buttonColor = styles.green;
      break;
    case "yellow":
      buttonColor = styles.yellow;
      break;
    case "blue":
      buttonColor = styles.blue;
      break;
    case "twitter":
      buttonColor = styles.twitter;
      break;

    default:
      buttonColor = styles.twitter;
      break;
  }
  return (
    <button
      style={width && { width: width }}
      onClick={clickHandler}
      className={`${styles.submitButton} ${buttonColor}`}
      type="button"
    >
      {title}
    </button>
  );
};
export default Button;

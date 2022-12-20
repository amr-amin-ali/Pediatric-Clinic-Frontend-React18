export const cSharpDateToJsDateConverter = (cSharpDate) => {
  const jsDateTime = new Date(Date.parse(cSharpDate));
  // const year=jsDateTime.getFullYear();
  // const month=1+jsDateTime.getMonth();
  // const day=jsDateTime.getDate();
  // const hour=jsDateTime.getHours();
  // const minute=jsDateTime.getMinutes();
  // const second=jsDateTime.getSeconds();
  // return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
  // return jsDateTime.toISOString().split('T')[0];
  return jsDateTime.toString().substring(0, 15);
};

export const convertcSharpTimeTo12HourSystem = (cSharpDate) => {
  const jsDateTime = new Date(Date.parse(cSharpDate));
  var hours = jsDateTime.getHours(); // value in 24 hours format
  var minutes = jsDateTime.getMinutes();
  var AmOrPm = hours >= 12 ? "pm" : "am"; 
  hours = hours % 12 || 12;
  hours = hours < 10 ? `0${hours}` : hours; //Add leading zero
  minutes = minutes < 10 ? `0${minutes}` : minutes; //Add leading zero
  return `${hours}:${minutes} ${AmOrPm}`;
};

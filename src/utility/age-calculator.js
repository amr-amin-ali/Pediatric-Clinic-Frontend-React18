export const getAge = (userinput) => {
  var birthDate = new Date(userinput);
  const dayOfBirth = birthDate.getDate();
  const monthOfBirth = 1 + birthDate.getMonth();
  const yearOfBirth = birthDate.getFullYear(); //
  var todayDate = new Date();
  var todayDay = todayDate.getDate();
  var todayMonth = 1 + todayDate.getMonth();
  var todayYear = todayDate.getFullYear();
  var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (dayOfBirth > todayDay) {
    todayDay = todayDay + month[todayMonth - 1];
    todayMonth = todayMonth - 1;
  }
  if (monthOfBirth > todayMonth) {
    todayMonth = todayMonth + 12;
    todayYear = todayYear - 1;
  }

  //Subtract the user's date of birth from the current time and store it at d, m, y constant.
  var daysOfAge = todayDay - dayOfBirth;
  var monthsOfAge = todayMonth - monthOfBirth;
  var yearsOfAge = todayYear - yearOfBirth;
  return {
    age: `${daysOfAge} أيام و ${monthsOfAge} شهور و  ${yearsOfAge} أعوام`,
    birthDate: `${dayOfBirth} - ${monthOfBirth} - ${yearOfBirth}`,
  };
};

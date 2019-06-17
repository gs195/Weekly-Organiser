function selectDay(day) {
  let todayString;
  switch (day) {
    case 0:
      todayString = "Sunday";
      return todayString;
    case 1:
      return (todayString = "Monday");
    case 2:
      return (todayString = "Tuesday");
    case 3:
      return (todayString = "Wednesday");
    case 4:
      return (todayString = "Thursday");
    case 5:
      return (todayString = "Friday");
    default:
      return (todayString = "Saturday");
  }
}

function getTodaysDay(theDay) {
  const today = new Date();
  return selectDay(Number(today.getDay())) === theDay ? "today" : "taskList";
}

function getDateStamp() {
  const today = new Date();
  let dayToday = selectDay(Number(today.getDay()));
  let monthToday;
  let dateToday = today.getDate();
  switch (Number(today.getMonth())) {
    case 0:
      monthToday = "January";
      break;
    case 1:
      monthToday = "February";
      break;
    case 2:
      monthToday = "March";
      break;
    case 3:
      monthToday = "April";
      break;
    case 4:
      monthToday = "May";
      break;
    case 5:
      monthToday = "June";
      break;
    case 6:
      monthToday = "July";
      break;
    case 7:
      monthToday = "August";
      break;
    case 8:
      monthToday = "September";
      break;
    case 9:
      monthToday = "October";
      break;
    case 10:
      monthToday = "November";
      break;
    default:
      monthToday = "December";
      break;
  }

  return `${dayToday}, ${dateToday} ${monthToday}`;
}

export { getDateStamp, getTodaysDay };

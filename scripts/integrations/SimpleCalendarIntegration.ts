export default class SimpleCalendarIntegration {
  static IsEnabled() {
    return typeof SimpleCalendar !== "undefined";
  }

  static GetCurrentDateToString() {
    return `${SimpleCalendar.api.getCurrentDay()?.name} ${
      SimpleCalendar.api?.getCurrentMonth()?.name
    } ${SimpleCalendar.api?.getCurrentYear()?.numericRepresentation} ${
      SimpleCalendar.api?.getCurrentYear()?.postfix
    }`;
  }
}

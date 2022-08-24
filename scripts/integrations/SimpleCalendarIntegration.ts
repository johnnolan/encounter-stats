export default class SimpleCalendarIntegration {
  static IsEnabled() {
    return window.SimpleCalendar !== undefined;
  }

  static GetCurrentDate() {
    return {
      day: window.SimpleCalendar.api.getCurrentDay().name,
      month: window.SimpleCalendar.api.getCurrentMonth().name,
      year: `${
        window.SimpleCalendar.api.getCurrentYear().numericRepresentation
      } ${window.SimpleCalendar.api.getCurrentYear().postfix}`,
    };
  }

  static GetCurrentDateToString() {
    const d = this.GetCurrentDate();
    return `${d.day} ${d.month} ${d.year}`;
  }
}

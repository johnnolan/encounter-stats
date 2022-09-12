import dayjs from "dayjs";

class Dates {
  static get now(): DateOptions {
    const currentDate = dayjs();
    return {
      id: currentDate.toISOString().replace(/[-]/g, "").substring(0, 8),
      dateTimeDisplay: currentDate.format("DD MMMM YYYY HH:mm"),
      dateDisplay: currentDate.format("DD MMMM YYYY"),
    };
  }
}

export default Dates;

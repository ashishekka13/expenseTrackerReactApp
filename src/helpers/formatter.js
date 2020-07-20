import moment from "moment";

export const date = (date, format) =>
  moment(date).format(format || "DD-MM-YYYY");

import moment from "moment";

export function human(date) {
  return moment(date).format("MMMM Do, YYYY");
}

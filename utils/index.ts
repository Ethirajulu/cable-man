import { House, NOT_PAID, PAID, PAID_FOR_FORMAT } from "../redux/types";
import moment from "moment";

export const getHousesByStatus = (
  houses: House[],
  filterValue: string
): House[] => {
  let filteredHouses = houses;
  if (filterValue === PAID) {
    filteredHouses = houses.filter((house) => checkIsPaid(house.last_paid));
  } else if (filterValue === NOT_PAID) {
    filteredHouses = houses.filter((house) => !checkIsPaid(house.last_paid));
  }
  return filteredHouses;
};

export const checkIsPaid = (lastPaidDate: string): boolean => {
  const todaysDate = moment().format(PAID_FOR_FORMAT).toString();
  let isPaid = false;
  if (lastPaidDate === todaysDate) {
    isPaid = true;
  }
  return isPaid;
};

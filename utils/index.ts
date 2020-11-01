import {
  House,
  Log,
  NOT_PAID,
  PAID,
  PAID_FOR_FORMAT,
  PAID_ON_FORMAT,
} from "../redux/types";
import moment from "moment";
import { db } from "../config/fire-config";
import { message } from "antd";

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

export const getTodaysCollectionThunk = async () => {
  let totalAmount: number | string = 0;
  try {
    const todaysDate = moment().format(PAID_ON_FORMAT).toString();
    const docs = (
      await db.collection("logs").where("paid_on", "==", todaysDate).get()
    ).docs;
    let log = null;
    docs.forEach((doc) => {
      log = doc.data();
      totalAmount = totalAmount + log.paid_amt;
    });
  } catch (err) {
    totalAmount = "--";
    message.error("getting total amount failed");
  } finally {
    return totalAmount;
  }
};

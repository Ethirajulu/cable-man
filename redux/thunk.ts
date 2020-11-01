import { message } from "antd";
import moment from "moment";
import { db } from "../config/fire-config";
import {
  addArea,
  addHouse,
  deleteArea,
  deleteHouse,
  setAreas,
  setHouses,
  setLoading,
  setLogs,
  updateArea,
  updateHouse,
} from "./actions";
import { AppThunk } from "./store";
import { Area, House, Log, PAID_FOR_FORMAT } from "./types";

export const getAreasThunk = (): AppThunk => async (dispatch) => {
  try {
    const docs = (await db.collection("areas").get()).docs;
    let areas: Area[] = [];
    let area: Area;
    docs.forEach((doc) => {
      area = { id: doc.id, name: doc.data().name };
      areas.push(area);
    });
    dispatch(setAreas(areas));
  } catch (err) {
    message.error("Listing areas failed");
    dispatch(setLoading(false));
  }
};

export const addAreaThunk = (name: string): AppThunk => async (dispatch) => {
  try {
    const docs = await db.collection("areas").add({ name });
    dispatch(
      addArea({
        id: docs.id,
        name,
      })
    );
    message.success("Area successfully added");
  } catch (err) {
    message.error("Adding area failed");
    dispatch(setLoading(false));
  }
};

export const updateAreaThunk = (id: string, name: string): AppThunk => async (
  dispatch
) => {
  try {
    await db.collection("areas").doc(id).set({ name });
    dispatch(updateArea({ id, name }));
    message.success("Area updated successfully");
  } catch (err) {
    message.error("Updating area failed");
    dispatch(setLoading(false));
  }
};

export const deleteAreaThunk = (id: string): AppThunk => async (dispatch) => {
  try {
    await db.collection("areas").doc(id).delete();
    await db
      .collection("houses")
      .where("area_id", "==", id)
      .get()
      .then(function (querySnapshot) {
        // Once we get the results, begin a batch
        var batch = db.batch();

        querySnapshot.forEach(function (doc) {
          // For each doc, add a delete operation to the batch
          batch.delete(doc.ref);
        });

        // Commit the batch
        return batch.commit();
      });
    dispatch(deleteArea(id));
    message.success("Area deleted successfully");
  } catch (err) {
    message.error("Deleting area failed");
    dispatch(setLoading(false));
  }
};

export const getHousesThunk = (areaId: string): AppThunk => async (
  dispatch
) => {
  try {
    const docs = (
      await db.collection("houses").where("area_id", "==", areaId).get()
    ).docs;
    let houses: House[] = [];
    let house: House;
    let data = null;
    docs.forEach((doc) => {
      data = doc.data();
      house = { id: doc.id, ...data };
      houses.push(house);
    });
    dispatch(setHouses(houses));
  } catch (err) {
    message.error("Listing houses failed");
    dispatch(setLoading(false));
  }
};

export const addHouseThunk = (house: House): AppThunk => async (dispatch) => {
  try {
    const { id, ...rest } = house;
    const docs = await db.collection("houses").add(rest);
    dispatch(
      addHouse({
        id: docs.id,
        ...rest,
      })
    );
    message.success("House successfully added");
  } catch (err) {
    message.error("Adding house failed");
    dispatch(setLoading(false));
  }
};

export const updateHouseThunk = (house: House): AppThunk => async (
  dispatch
) => {
  try {
    const { id, ...rest } = house;
    await db.collection("houses").doc(id).set(rest);
    dispatch(updateHouse(house));
    message.success("House updated successfully");
  } catch (err) {
    message.error("Updating house failed");
    dispatch(setLoading(false));
  }
};

export const deleteHouseThunk = (id: string): AppThunk => async (dispatch) => {
  try {
    await db.collection("houses").doc(id).delete();
    dispatch(deleteHouse(id));
    message.success("House deleted successfully");
  } catch (err) {
    message.error("Deleting house failed");
    dispatch(setLoading(false));
  }
};

export const updatePaymentThunk = (
  log: Log,
  house: House,
  reset: () => void
): AppThunk => async (dispatch) => {
  try {
    await db.collection("logs").add(log);
    const currentMonth = moment().format(PAID_FOR_FORMAT).toString();
    if (currentMonth === log.paid_for) {
      const newHouse: House = {
        ...house,
        last_paid: log.paid_for,
      };
      await db.collection("houses").doc(log.house_id).set(newHouse);
      dispatch(updateHouse(newHouse));
    } else {
      reset();
      message.success(`Marked paid for ${log.paid_for}`);
      dispatch(setLoading(false));
    }
  } catch (err) {
    message.error("Payment failed");
    dispatch(setLoading(false));
  }
};

export const getLogsThunk = (houseId: string): AppThunk => async (dispatch) => {
  try {
    const docs = (
      await db.collection("logs").where("house_id", "==", houseId).get()
    ).docs;
    let logs: Log[] = [];
    let log: Log;
    let data = null;
    docs.forEach((doc) => {
      data = doc.data();
      log = { id: doc.id, ...data };
      logs.push(log);
    });
    dispatch(setLogs(logs));
  } catch (err) {
    message.error("Listing old logs failed");
    dispatch(setLoading(false));
  }
};

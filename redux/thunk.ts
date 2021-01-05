import { message } from "antd";
import moment from "moment";
import { db } from "../config/fire-config";
import { sortHouses } from "../utils";
import {
  addArea,
  addHouse,
  deleteArea,
  deleteHouse,
  setAreas,
  setHouses,
  setLoading,
  setLogs,
  setSortedHouses,
  updateArea,
  updateHouse,
} from "./actions";
import { AppThunk } from "./store";
import {
  Area,
  AREAS_COLLECTION,
  EMPTY_STRING,
  House,
  HOUSES_COLLECTION,
  SORTED_HOUSES_COLLECTION,
  Log,
  LOGS_COLLECTION,
  PAID_FOR_FORMAT,
  Sorted,
} from "./types";

export const getAreasThunk = (): AppThunk => async (dispatch) => {
  try {
    const docs = (await db.collection(AREAS_COLLECTION).get()).docs;
    let areas: Area[] = [];
    let area: Area;
    docs.forEach((doc) => {
      area = { id: doc.id, name: doc.data().name };
      areas.push(area);
    });
    dispatch(setAreas(areas));
  } catch (err) {
    console.error("Listing areas failed: ", err);
  }
};

export const addAreaThunk = (name: string): AppThunk => async (dispatch) => {
  try {
    const doc = await db.collection(AREAS_COLLECTION).add({ name });
    dispatch(
      addArea({
        id: doc.id,
        name,
      })
    );
    await db
      .collection(SORTED_HOUSES_COLLECTION)
      .add({ area_id: doc.id, house_ids: [] });
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
    await db.collection(AREAS_COLLECTION).doc(id).set({ name });
    dispatch(updateArea({ id, name }));
    message.success("Area updated successfully");
  } catch (err) {
    message.error("Updating area failed");
    dispatch(setLoading(false));
  }
};

export const deleteAreaThunk = (id: string): AppThunk => async (dispatch) => {
  try {
    await db.collection(AREAS_COLLECTION).doc(id).delete();
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
      await db
        .collection(HOUSES_COLLECTION)
        .where("area_id", "==", areaId)
        .get()
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
    console.error("Listing houses failed: ", err);
  }
};

export const addHouseThunk = (
  house: House,
  sorted: Sorted,
  indexToAdd: number
): AppThunk => async (dispatch) => {
  try {
    const { id, ...rest } = house;
    const doc = await db.collection(HOUSES_COLLECTION).add(rest);
    dispatch(
      addHouse({
        id: doc.id,
        ...rest,
      })
    );
    const newSortedHouses = [...sorted.house_ids];
    newSortedHouses.splice(indexToAdd, 0, doc.id);
    let newSorted: Sorted = {
      area_id: sorted.area_id,
      house_ids: newSortedHouses,
    };
    await db.collection(SORTED_HOUSES_COLLECTION).doc(sorted.id).set(newSorted);
    newSorted.id = sorted.id;
    dispatch(setSortedHouses(newSorted));
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
    await db.collection(HOUSES_COLLECTION).doc(id).set(rest);
    dispatch(updateHouse(house));
    message.success("House updated successfully");
  } catch (err) {
    message.error("Updating house failed");
    dispatch(setLoading(false));
  }
};

export const deleteHouseThunk = (
  id: string,
  sorted: Sorted
): AppThunk => async (dispatch) => {
  try {
    await db.collection(HOUSES_COLLECTION).doc(id).delete();
    dispatch(deleteHouse(id));
    const newSortedHouses = sorted.house_ids.filter(
      (houseId) => houseId !== id
    );
    let newSorted: Sorted = {
      area_id: sorted.area_id,
      house_ids: newSortedHouses,
    };
    await db.collection(SORTED_HOUSES_COLLECTION).doc(sorted.id).set(newSorted);
    newSorted.id = sorted.id;
    dispatch(setSortedHouses(newSorted));
    message.success("House deleted successfully");
  } catch (err) {
    message.error("Deleting house failed");
    dispatch(setLoading(false));
  }
};

export const getSortedHousesThunk = (areaId: string): AppThunk => async (
  dispatch
) => {
  try {
    const docs = (
      await db
        .collection(SORTED_HOUSES_COLLECTION)
        .where("area_id", "==", areaId)
        .get()
    ).docs;
    if (docs?.length) {
      const doc = docs[0];
      const data = doc.data();
      let sorted: Sorted = {
        id: doc.id,
        area_id: data.area_id,
        house_ids: data.house_ids,
      };
      dispatch(setSortedHouses(sorted));
    }
  } catch (err) {
    console.error("Retrieving sorted houses failed");
  }
};

export const makePaymentThunk = (
  log: Log,
  house: House,
  reset: () => void
): AppThunk => async (dispatch) => {
  try {
    const doc = await db.collection(LOGS_COLLECTION).add(log);
    const currentMonth = moment().format(PAID_FOR_FORMAT).toString();
    if (currentMonth === log.paid_for) {
      const newHouse: House = {
        ...house,
        last_paid: log.paid_for,
        payment_id: doc.id,
      };
      await db.collection(HOUSES_COLLECTION).doc(log.house_id).set(newHouse);
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

export const markNotPaidThunk = (house: House): AppThunk => async (
  dispatch
) => {
  try {
    await db.collection(LOGS_COLLECTION).doc(house.payment_id).delete();
    const newHouse: House = {
      ...house,
      last_paid: EMPTY_STRING,
      payment_id: EMPTY_STRING,
    };
    await db.collection(HOUSES_COLLECTION).doc(house.id).set(newHouse);
    message.success(`Marked not Paid for ${house.name}`);
    dispatch(updateHouse(newHouse));
    dispatch(setLoading(false));
  } catch (err) {
    message.error("Mark not paid failed");
    dispatch(setLoading(false));
  }
};

export const getLogsThunk = (houseId: string): AppThunk => async (dispatch) => {
  try {
    const docs = (
      await db
        .collection(LOGS_COLLECTION)
        .where("house_id", "==", houseId)
        .get()
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
    console.error("Listing old logs failed: ", err);
    dispatch(setLoading(false));
  }
};

// export const addAllHouses = async () => {
//   try {
//     const docs = (await db.collection(AREAS_COLLECTION).get()).docs;
//     let areas: Area[] = [];
//     let area: Area;
//     docs.forEach((doc) => {
//       area = { id: doc.id, name: doc.data().name };
//       areas.push(area);
//     });
//     await asyncForEach(areas, async (area: Area) => {
//       const docs = (
//         await db
//           .collection(HOUSES_COLLECTION)
//           .where("area_id", "==", area.id)
//           .get()
//       ).docs;
//       let houses: House[] = [];
//       let house: House;
//       let houseIds: string[] = [];
//       let data = null;
//       docs.forEach((doc) => {
//         data = doc.data();
//         house = { id: doc.id, ...data };
//         houses.push(house);
//       });
//       const sortedHouses = sortHouses(houses);
//       sortedHouses.forEach((house) => houseIds.push(house.id));
//       await db
//         .collection(SORTED_HOUSES_COLLECTION)
//         .add({ area_id: area.id, house_ids: houseIds });
//     });
//     message.success("Added sorted house");
//   } catch (err) {
//     message.error("Error occurred when coping");
//   }
// };

// const asyncForEach = async (array, callback) => {
//   for (let index = 0; index < array.length; index++) {
//     await callback(array[index], index, array);
//   }
// };

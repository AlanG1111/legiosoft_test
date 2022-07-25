import { call, takeEvery, put } from "redux-saga/effects";
import { users } from "../../mockData";
import { responseType } from "../../types";
import { fetchCVSFile, getData } from "../slice";

const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

const mock = new MockAdapter(axios);

mock.onGet("/transactions").reply(200, {
  users: users,
});

export const sagaActions = {
  FETCH_DATA_SAGA: getData,
};

let callAPI = async () => {
  return await axios
    .get("/transactions")
    .then(function (response: responseType) {
      return response.data;
    });
};

export function* fetchDataSaga() {
  try {
    let result: responseType = yield call(() => callAPI());
    yield put(fetchCVSFile(result));
  } catch (e) {
    console.log(e);
  }
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.FETCH_DATA_SAGA, fetchDataSaga);
}

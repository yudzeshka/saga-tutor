import { take, takeEvery } from "redux-saga/effects";

export function* workerSaga() {
  console.log("click from page");
}

export function* watchClicksSaga() {
  //   while (true) {
  //     yield take("CLICK");
  //     yield workerSaga();
  //   }
  yield takeEvery("CLICK", workerSaga);
}

export default function* rootSaga() {
  yield watchClicksSaga();
}

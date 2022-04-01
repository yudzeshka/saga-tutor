import { LOCATION_CHANGE } from "connected-react-router";
import { matchPath } from "react-router-dom";
import {
  apply,
  call,
  fork,
  put,
  select,
  take,
  takeEvery,
} from "redux-saga/effects";
import {
  getRouteConfig,
  MAIN_ROUTE,
  PEOPLE_DETAILS_ROUTE,
} from "../../../routes";
import { LOAD_USERS, LOAD_USERS_SUCCESS } from "../../reducers/people/actions";
import { selectPeople } from "../../reducers/people/selectors";

export function* loadPeopleDetails() {}

export function* loadPeopleList({ payload }) {
  const { page, search } = payload;
  const request = yield call(
    fetch,
    `https://swapi.dev/api/people?page=${page}&search=${search}`
  );
  const data = yield apply(request, request.json);
  yield put({ type: LOAD_USERS_SUCCESS, payload: data });
}

export function* routeChangeSaga() {
  while (true) {
    const action = yield take(LOCATION_CHANGE);

    if (
      matchPath(action.payload.location.pathname, getRouteConfig(MAIN_ROUTE))
    ) {
      const state = yield select(selectPeople);
      const { page, search } = state;
      yield put({ type: LOAD_USERS, payload: { page, search } });
    }
    const detailsPage = matchPath(
      action.payload.location.pathname,
      getRouteConfig(PEOPLE_DETAILS_ROUTE)
    );
    if (detailsPage) {
      console.log("d<<<<", detailsPage);
    }
  }
}

export default function* peopleSaga() {
  yield fork(routeChangeSaga);
  yield takeEvery(LOAD_USERS, loadPeopleList);
}

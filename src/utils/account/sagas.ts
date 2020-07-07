import { call, put, takeLatest } from "redux-saga/effects";
import runSagas from "store/sagas";
import { logError } from "env";
import AccountSettings from "interface/AccountSettings";

import accountServices from "./service";
import { loadAccountActions, logOutActions } from "./actions";
import { loadAccountActionTypes, logOutActionTypes } from "./reducer";

export function* loadAccountSettings() {
  try {
    const accountSettings: AccountSettings = yield call(
      accountServices.getAccountSettings
    );
    if (accountSettings.userNotAuthorized) {
      yield put(
        loadAccountActions.receive({
          accountSettings: undefined,
        })
      );
      return;
    }
    yield put(
      loadAccountActions.receive({
        accountSettings,
      })
    );
  } catch (err) {
    logError(err);
    yield put(loadAccountActions.fail({ error: err }));
  }
}

export function* logout() {
  try {
    yield call(accountServices.logout);
    yield put(logOutActions.receive({ loggedOut: true }));
  } catch (err) {
    logError(err);
    yield put(logOutActions.fail({ error: err }));
  }
}

export function* addWatchers() {
  yield takeLatest(loadAccountActionTypes.REQUEST, loadAccountSettings);
  yield takeLatest(logOutActionTypes.REQUEST, logout);
}

runSagas(addWatchers);

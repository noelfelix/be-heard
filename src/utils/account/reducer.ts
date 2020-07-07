import { combineReducers } from "redux";
import Cookies from "js-cookie";

import { makeFetchActionTypes } from "store/fetch";
import AccountSettings from "interface/AccountSettings";
import { Results } from "interface/Results";
import { Action } from "interface/Action";

import { LOAD_ACCOUNT, LOG_OUT, NAMESPACE } from "./constants";
import actionTypes from "./actionTypes";
import { LoadAccountActionType } from "./actions";

import "./sagas";

export const loadAccountActionTypes = makeFetchActionTypes(
  `${NAMESPACE}/${LOAD_ACCOUNT}`
);
export const logOutActionTypes = makeFetchActionTypes(
  `${NAMESPACE}/${LOG_OUT}`
);

export interface AccountState {
  accountSettings?: AccountSettings;
  loading?: boolean;
  results?: Results;
  language?: string;
  loggedOut?: boolean;
}

export function account(
  state = {
    accountSettings: undefined,
    loading: false,
    results: undefined,
    loggedOut: undefined,
    language: Cookies.getJSON("jslang"),
  },
  action: Action<LoadAccountActionType>
) {
  switch (action.type) {
    case loadAccountActionTypes.REQUEST:
      return {
        ...state,
        loading: action.payload ?? true,
        results: null,
        loggedOut: undefined,
      };
    case loadAccountActionTypes.RECEIVE:
      return {
        ...state,
        accountSettings: action.payload?.accountSettings,
        loading: false,
      };
    case loadAccountActionTypes.FAIL:
      return {
        ...state,
        loading: false,
        results: { error: action.payload?.error },
      };
    case actionTypes.setLanguage: {
      return {
        ...state,
        language: action.payload,
      };
    }
    case logOutActionTypes.REQUEST:
      return {
        ...state,
        loading: true,
        accountSettings: undefined,
        results: undefined,
      };
    case logOutActionTypes.RECEIVE:
      return {
        ...state,
        loading: false,
        loggedOut: action.payload?.loggedOut,
      };
    case logOutActionTypes.FAIL:
      return {
        ...state,
        loading: false,
        loggedOut: true,
      };
    default:
      return state;
  }
}

export default combineReducers({
  account,
});

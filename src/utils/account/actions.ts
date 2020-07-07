/* istanbul ignore file */

import { makeFetchActionCreators } from "store/fetch";
import { Action } from "interface/Action";
import AccountSettings from "interface/AccountSettings";

import { LOAD_ACCOUNT, LOG_OUT, NAMESPACE } from "./constants";
import actionTypes from "./actionTypes";

export interface LoadAccountActionType {
  accountSettings?: AccountSettings;
  error?: Error;
  loggedOut?: boolean;
}

export const loadAccountActions = makeFetchActionCreators<
  boolean,
  LoadAccountActionType
>(`${NAMESPACE}/${LOAD_ACCOUNT}`);
export const logOutActions = makeFetchActionCreators<
  undefined,
  LoadAccountActionType
>(`${NAMESPACE}/${LOG_OUT}`);

export type SetLanguageAction = Action<string>;

export function setLanguage(language: string): SetLanguageAction {
  return {
    type: actionTypes.setLanguage,
    payload: language,
  };
}

export interface AccountActions {
  loadAccount(loading?: boolean): Action<boolean>;
  logOut(): Action;
  setLanguage(language: string): Action<string>;
}

const actions: AccountActions = {
  loadAccount: loadAccountActions.request,
  logOut: logOutActions.request,
  setLanguage,
};

export default actions;

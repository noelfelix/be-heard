/* istanbul ignore file */

import { AccountState } from "./reducer";

export const getAccount = (state: any): AccountState => ({
  ...(state?.account?.account ?? {}),
});

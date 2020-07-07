/* istanbul ignore file */

import api from "utils/api";

const AccountService = {
  getAccountSettings: () =>
    api.doFetch("accountSettings", {
      queryParams: {
        // foo: true,
      },
    }),
  logout: () => api.doFetch("logout"),
};

export default AccountService;

import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { i18n } from "i18next";

import { bindGlobalEvents, rootContext } from "const/globals";
import { FEATURE_FLAGS } from "views/features/availableFeatures";
import featureFlags from "views/features/featureFlags";
import actions, { AccountActions } from "utils/account/actions";
import { logError } from "env";
import iframe from "utils/iframe";
import documentUtils from "utils/document";
import windowUtils from "utils/window";
import { THEME } from "utils/theme";

import appUtils from "./appUtils";
import mapStateToProps, { AppStateProps } from "./state/mapStateToProps";
import Routes from "../Routes";

import "./app.scss";

const rootClass = "app";

interface AppProps extends AccountActions, AppStateProps {
  i18n: i18n;
}

export const App: React.FC<AppProps> = (props: AppProps) => {
  const {
    loadAccount,
    account,
    navigation: { visible: navigationVisible },
    i18n,
  } = props;
  const { loading, results, accountSettings, language, loggedOut } = account;

  useEffect(() => {
    const params = documentUtils.urlSearchParams(window.location.search);
    if (params.get("useMocks") === "true") {
      featureFlags.setFeatureFlag(FEATURE_FLAGS.MOCK, true);
    }
    const mockUser = params.get("mockUser");
    if (mockUser) {
      featureFlags.setFeatureFlagValue(FEATURE_FLAGS.MOCK_USER, mockUser);
    }
    loadAccount();
    appUtils.toggleRootClassStyle(theme);
    bindGlobalEvents();
  }, []);

  useEffect(() => {
    if (theme) {
      appUtils.toggleRootClassStyle(theme);
    }
  }, [theme]);

  useEffect(() => {
    if (loggedOut === true) {
      windowUtils.setLocationHref(`${rootContext}/`);
    }
  }, [loggedOut]);

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language, (err) => {
        /* istanbul ignore next */
        if (err) {
          logError(`Failed to load language ${language}`);
        }
      });
      iframe.postMessage({
        actonSetLanguage: language,
      });
    }
  }, [language]);

  const isError = results?.error !== undefined;
  if (
    !isError &&
    (loading || (accountSettings === undefined && isAuthorized === undefined))
  ) {
    return (
      <div className={`${rootClass}__loading`}>
        <Svg name="spinner" />
      </div>
    );
  }

  return (
    <>
      <Router>
        {appUtils.renderDevFlag()}
        <Navigation />
        <div className={`${rootClass}__right`}>
          <TopBar />
          <div id="body">
            <Routes />
            <IFrameView
              account={account}
              navigationVisible={navigationVisible}
            />
          </div>
        </div>
        <CustomCSS account={account} />
      </Router>
    </>
  );
};

/* istanbul ignore next */
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ ...actions }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);

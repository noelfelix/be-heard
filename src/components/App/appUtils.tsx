import React from "react";
import { Link } from "react-router-dom";

import globals, { rootContext } from "const/globals";
import { THEME } from "utils/theme";
import documentUtils from "utils/document";
import { SkinParams } from "interface/AccountSettings";

const rootClassFlag = "feature-flag";

export const renderDevFlag = () =>
  globals.isLocal() && (
    <Link className={`${rootClassFlag}`} to={`${rootContext}/features`}>
      🚩
    </Link>
  );

export function toggleRootClassStyle(theme: THEME) {
  const root = documentUtils.getElementById("root");
  if (!root) return;
  if (theme === THEME.DARK) {
    root.classList.add("root--theme-dark");
    root.classList.remove("root--theme-light");
    root.classList.remove("root--theme-custom");
  } else if (theme === THEME.LIGHT) {
    root.classList.remove("root--theme-dark");
    root.classList.add("root--theme-light");
    root.classList.remove("root--theme-custom");
  } else if (theme === THEME.CUSTOM) {
    root.classList.remove("root--theme-dark");
    root.classList.remove("root--theme-light");
    root.classList.add("root--theme-custom");
  }
}

export function renderCustomStylesheet(skinParams?: SkinParams) {
  if (!skinParams) return null;
  return (
    <style type="text/css">{`
    .root--theme-custom .navigation {
      border-right: $standard-border-width solid ${skinParams.navSubDividerColor};
      background-color: ${skinParams.navBackgroundColor};
    }
    
    .root--theme-custom .navigation__expander {
      border-top: $standard-border-width solid ${skinParams.navSubDividerColor};
      background-color: ${skinParams.navBackgroundColor};
    }

    .root--theme-custom .navigation__expander svg {
      fill: ${skinParams.navFontColor};
    }
    
    .root--theme-custom .navigation__expander span {
      color: ${skinParams.navFontColor};
    }
    
    .root--theme-custom .navigation__expander:hover span {
      color: ${skinParams.navFontActiveColor};
    }

    .root--theme-custom .navigation__expander:hover svg {
      fill: ${skinParams.navFontActiveColor};
    }
 
    .root--theme-custom .navigation__item-name label {
      color: ${skinParams.navFontColor};
    }
    
    .root--theme-custom .navigation__item-name--active > label {
      background-color: ${skinParams.navSubBackgroundColor};
      color: ${skinParams.navFontHighlightColor};
    }
    
    .root--theme-custom .navigation__item-name--root {
      background-color: ${skinParams.navBackgroundColor};
    }
    
    .root--theme-custom .navigation__item-name--root-active > label {
      color: ${skinParams.navFontActiveColor};
    }
    
    .root--theme-custom .navigation__item-name--root:hover > label {
      color: ${skinParams.navFontActiveColor};
    }
    
    .root--theme-custom .navigation__item-name--not-active:hover > label {
      color: ${skinParams.navFontActiveColor};
    }
    
    .root--theme-custom .navigation__item-name:hover label {
      color: ${skinParams.navFontActiveColor};
    }
    
    .root--theme-custom .navigation__item-name:hover svg {
      fill: ${skinParams.navFontActiveColor};
    }
    
    .root--theme-custom .navigation__item-name--active:hover > label {
      color: ${skinParams.navFontActiveColor};
    }

    .root--theme-custom .navigation__group--visible-hover.navigation__group--depth-1 {
      background-color: ${skinParams.navBackgroundColor};
    }
    
    .root--theme-custom .navigation__group--depth-1 .navigation__mobile-header {
      color: ${skinParams.navFontActiveColor};
    }
    
    .root--theme-custom .navigation__item-icon-default {
      fill: ${skinParams.navFontColor};
    }
    
    .root--theme-custom .navigation__item-icon-selected {
      fill: ${skinParams.navFontActiveColor};
    }
    
    .root--theme-custom .navigation__item-caret {
      fill: ${skinParams.navFontColor};
    }
    `}</style>
  );
}

export default {
  toggleRootClassStyle,
};

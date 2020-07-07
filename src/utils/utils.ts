import React from "react";
import documentUtils from "utils/document";

export const getApplicationRoot = () =>
  documentUtils.getElementById("root") as HTMLDivElement;

export function usePrevious<T>(value: T) {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default {
  getApplicationRoot,
  usePrevious,
};

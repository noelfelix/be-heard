import React from "react";
import documentUtils from "utils/document";
import { getApplicationRoot, usePrevious } from "../utils";

describe("utils", () => {
  it("getApplicationRoot() should return `root` element", () => {
    jest.spyOn(documentUtils, "getElementById").mockImplementation(((
      id: string
    ) => {
      if (id === "root") {
        return true;
      }
      return false;
    }) as any);
    expect(getApplicationRoot()).toBe(true);
  });

  describe("usePrevious()", () => {
    it("should return ref current", () => {
      const ref = {
        current: "curValue",
      } as any;
      jest.spyOn(React, "useRef").mockImplementation(() => ref);
      jest.spyOn(React, "useEffect").mockImplementation(() => undefined);
      expect(usePrevious("" as any)).toEqual(ref.current);
    });

    it("should set ref.current to value with useEffect", () => {
      const ref = {
        current: "curValue",
      } as any;
      jest.spyOn(React, "useRef").mockImplementation(() => ref);
      jest.spyOn(React, "useEffect").mockImplementation((f) => f());
      expect(usePrevious("newValue" as any)).toEqual("newValue");
      expect(ref.current).toEqual("newValue");
    });
  });
});

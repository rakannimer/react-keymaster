import * as React from "react";
import { render, fireEvent } from "react-testing-library";
import ReactKeyMaster from "../";

describe("React-Keymaster", () => {
  test("works", async () => {
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();
    const { container } = render(
      <ReactKeyMaster keyName="a" onKeyDown={onKeyDown} onKeyUp={onKeyUp} />
    );
    fireEvent.keyDown(container, {
      key: "a",
      keyCode: 65,
      which: 65
    });
    expect(onKeyDown.mock.calls.length).toEqual(1);
    fireEvent.keyUp(container, {
      key: "a",
      keyCode: 65,
      which: 65
    });
    expect(onKeyUp.mock.calls.length).toEqual(1);
  });
});

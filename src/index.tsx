import * as React from "react";
//@ts-ignore
import keymaster from "keymaster";

const callIfExists = (fnc?: (...a: any[]) => any, ...args: any[]) => {
  if (fnc) {
    return fnc(...args);
  }
  return null;
};
keymaster.filter = function(event: any) {
  const tagName = (event.target || event.srcElement).tagName;
  keymaster.setScope(
    /^(INPUT|TEXTAREA|SELECT)$/.test(tagName) ? "input" : "other"
  );
  return true;
};
type ReactKeymasterProps = {
  keyName?: string;
  onKeyDown?: (...args: any[]) => any;
  onKeyUp?: (...args: any[]) => any;
};
export default class ReactKeymaster extends React.Component<
  ReactKeymasterProps,
  {}
> {
  isKeyDown = false;
  componentDidMount() {
    keymaster.unbind(this.props.keyName);
    keymaster(this.props.keyName, this.onKeyDown);
    document.addEventListener("keyup", this.handleKeyUpEvent);
  }
  componentWillUnmount() {
    keymaster.unbind(this.props.keyName);
    this.isKeyDown = false;
    document.removeEventListener("keyup", this.handleKeyUpEvent);
  }
  onKeyUp = () => {
    callIfExists(this.props.onKeyUp, this.props.keyName);
  };
  onKeyDown = () => {
    if (this.isKeyDown) return;
    this.isKeyDown = true;
    callIfExists(this.props.onKeyDown, this.props.keyName);
  };
  handleKeyUpEvent = (e: KeyboardEvent) => {
//     if (!this.isKeyDown) return;
    this.isKeyDown = false;
    const pressedKey = String.fromCharCode(e.keyCode).toLowerCase();
    if (pressedKey !== this.props.keyName) return;
    this.onKeyUp();
  };
  render() {
    return this.props.children || null;
  }
}

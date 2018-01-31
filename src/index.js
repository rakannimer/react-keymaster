import React from 'react';
import PropTypes from 'prop-types';
import keymaster from 'keymaster';

const callIfExists = (fnc, ...args) => {
  if (fnc) {
    return fnc(...args);
  }
  return null;
};

keymaster.filter = function (event) {
  const tagName = (event.target || event.srcElement).tagName;
  keymaster.setScope(/^(INPUT|TEXTAREA|SELECT)$/.test(tagName) ? 'input' : 'other');
  return true;
};

class ReactKeymaster extends React.Component {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.handleKeyUpEvent = this.handleKeyUpEvent.bind(this);
    this.isKeyDown = false;
  }

  componentDidMount() {
    keymaster.unbind(this.props.keyName);
    keymaster(this.props.keyName, this.onKeyDown);
    document.addEventListener('keyup', this.handleKeyUpEvent);
  }
  componentWillUnmount() {
    keymaster.unbind(this.props.keyName);
    this.isKeyDown = false;
    document.removeEventListener('keyup', this.handleKeyUpEvent);
  }
  onKeyUp() {
    callIfExists(this.props.onKeyUp, this.props.keyName);
  }
  onKeyDown() {
    if (this.isKeyDown) return;
    this.isKeyDown = true;
    callIfExists(this.props.onKeyDown, this.props.keyName);
    // this.props.onKeyDown(this.props.keyName);
  }
  handleKeyUpEvent(e) {
    if (!this.isKeyDown) return;
    this.isKeyDown = false;
    const pressedKey = String.fromCharCode(e.keyCode).toLowerCase();
    if (pressedKey !== this.props.keyName) return;
    this.onKeyUp();
  }
  render() {
    return this.props.children || <div />;
  }
}

ReactKeymaster.propTypes = {
  keyName: PropTypes.string,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
};
export default ReactKeymaster;

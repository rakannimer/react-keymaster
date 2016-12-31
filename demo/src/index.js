import React from 'react';
import { render } from 'react-dom';

import ReactKeymaster from '../../src';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: 'Hello, I am a component that listens to keydown and keyup of a',
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }
  onKeyDown(keyName) {
    this.setState({
      output: `keydown ${keyName}`,
    });
  }
  onKeyUp(keyName) {
    this.setState({
      output: `keyup ${keyName}`,
    });
  }
  render() {
    return (<div>
      <h1>react-keymaster demo</h1>
      <ReactKeymaster
        keyName="a"
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
      />
      <div>
        {
          this.state.output
        }
      </div>
    </div>);
  }
}

render(<Demo />, document.querySelector('#demo'));

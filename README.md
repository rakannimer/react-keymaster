# react-keymaster

A react component that listens to KeyDown And KeyUp event.

Uses [a fork](https://github.com/RakanNimer/keymaster) of [keymaster](https://github.com/madrobby/keymaster) for keydown detection of special characters.

## Example

### Install

```sh
yarn add react-keymaster
```

### Code

```javascript
import React from 'react';

import ReactKeymaster from 'react-keymaster';

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

```

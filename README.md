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
import React from "react";
import ReactKeymaster from "react-keymaster";
class Demo extends React.Component {
  state = {
    output: "Hello, I am a component that listens to keydown and keyup of a"
  };
  render() {
    return (
      <div>
        <h1>react-keymaster demo</h1>
        <ReactKeymaster
          keyName="a"
          onKeyDown={keyname => {
            this.setState({
              output: `keyup ${keyName}`
            });
          }}
          onKeyUp={keyName => {
            this.setState({
              output: `keyup ${keyName}`
            });
          }}
        />
        <div>{this.state.output}</div>
      </div>
    );
  }
}
```

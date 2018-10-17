import * as ReactDOM from "react-dom";
import * as React from "react";

import ReactKeyMaster from "../src";

ReactDOM.render(
  <ReactKeyMaster
    keyName="a"
    onKeyDown={() => alert("keydown")}
    onKeyUp={() => alert("keyup")}
  >
    <div>
      Press <pre>a</pre> on your keyboard
    </div>
  </ReactKeyMaster>,
  document.getElementById("app")
);

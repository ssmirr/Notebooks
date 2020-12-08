<!--
setup:
  local:
    cwd: .
-->

# Child processes

When writing scripts or your own configuration tools, you will often find that you will have to create new processes to help you perform a task. While might seem straightforward, there are many caveats that can quickly add up, and require a richer and deeper understanding of processes and their behavior and properties.



```js| {type:'script'}
const child = require('child_process')
let output = child.execSync("date").toString();
console.log( output );
```


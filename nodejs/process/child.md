<!--
setup:
  local:
    cwd: .
-->

# Child processes

When writing scripts or your own configuration tools, you will often find that you will have to create new processes to help you perform a task. While might seem straightforward, there are many caveats that can quickly add up, and require a richer and deeper understanding of processes and their behavior and properties.

Let's start with a simple execution of the `date` command. We will execute the command as a child process, wait until it completes, and read its output.

```js| {type:'script'}
const child = require('child_process')
let output = child.execSync("date").toString();
console.log( output );
```

When running commands in an configuration or tool automation context, we usually need to know a little more about the status of the command, respond to any errors, parse output, or even potentially provide input. We may also have to handle issues related to passing complex data, escaping certain string characters, and dealing with various oddities associated with shells and OS platforms. Finally, we have to be mindful of the lifecycle of a process and manage any necessary concurrency constraints.

As you might imagine, this makes programming involving processes a bit more difficult.

```js| {type:'script'}
const child = require('child_process');

// Introducing top-level async block
(async ()=>{
    await run("date");
})();

async function run(cmd)
{
    let process = child.exec(cmd, (error, stdout, stderr) => {
        console.log( stdout );
        console.log( stderr );
    });

    process.on('close', (code) => {
        console.log(`exit with ${code}`);
    });
}

```
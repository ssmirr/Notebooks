# CLI arguments in nodejs

## Overview 

Arguments are typically provided to a program in an array of strings. There are several types of arguments that programs receive.

* **options**: are modifiers to commands, like `ls -l`.
* **parameters**: provide information to commands, such as `-o output_dir`.
* **subcommands**: allow a program to operate in multiple modes, and support more complex families of commands like `git commit` or `git submodule pull`.

Options can be combined, such as `-a -l` being expressed as `-al`, which means the program must be able to handle multiple ways of receiving options. Some parameters can appear anywhere, while others are to be expected to appear at a specific _position_ as part of the command sequence.

Finally, some commands expect other commands or complex input. In some shells, the syntax `--` can be used to help indicate when to stop parsing options. For example, `ls -- -l` will look for a file named `-l`. This is useful for when writing more complex commands, such as `ssh root@me -- ls -l`.


## Processing CLI arguments

In nodejs, the CLI arguments are made available in an array called `process.argv`.

Run this code. What do you think it will contain?

```bash | {type: 'command'}
node -e "console.log( process.argv )"
```

Because of all the complexity associated with handling the variety of arguments a program can receive, it is best to use a library or tool to help you parse and act on them. We're going to be using [yargs](https://github.com/yargs/yargs).

Install the `yargs` package with the following command.

```bash | {type: 'command', failed_when: 'exitCode != 0' }
npm install yargs --no-save
```

1. Let's first create our sample program and see what it does.

```js | {type: 'file', path: 'cli.js'}
require('yargs')
  .usage('$0 <cmd> [args]')
  .command('hello [name]', 'welcome ter yargs!', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'Cambi',
      describe: 'the name to say hello to'
    })
  }, function (argv) {
    console.log('hello', argv.name, 'welcome to yargs!')
  })
  .help()
  .argv
```

2. Try running your program with `node cli.js hello name`

```bash | {type: 'repl'}
```

3. Modify the program to accept the and print out the following options:

* node cli.js hello [name]
* node cli.js -i
* node cli.js -o file

### Verification

```bash | {type: 'command'}
node cli.js hello bob
node cli.js -i
```
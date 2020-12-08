# Processing CLI arguments

```bash | {type: 'command'}
node -e "console.log( process.argv )"
```

Parameters general come in two families:

* **options**: are modifiers to commands, like `ls -l`.
* **parameters**: provide information to commands, such as `-o output_dir`.
* **subcommands**: allow a program to operate in multiple modes, and support more complex families of commands like `git commit` or `git submodule pull`.

Options can be combined, such as `-a -l` being expressed as `-al`, which means the program must be able to handle multiple ways of receiving options. Some parameters can appear anywhere, while others are to be expected to appear at a specific _position_ as part of the command sequence.

Finally, some commands expect other commands or complex input. In some shells, the syntax `--` can be used to help indicate when to stop parsing options. For example, `ls -- -l` will look for a file named `-l`. This is useful for when writing more complex commands, such as `ssh root@me -- ls -l`.


```bash | {type: 'command', failed_when: 'exitCode != 0' }
npm install yargs --no-save
```


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

Try running your program with `node cli.js hello name`

**Modify the program to accept the and print out the following options**:

* node cli.js hello [name]
* node cli.js -i
* node cli.js -o file


```bash | {type: 'repl'}
```
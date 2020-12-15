<!--
setup:
  local:
    cwd: .
-->

# Yaml

Many configuration tools, need a syntax for describing structured for commands and properties of systems. For example, Ansible playbooks are essentially files formatted as [yaml](http://docs.ansible.com/ansible/YAMLSyntax.html). Some pipelines architectures, such as "gitops", are driven entirely by declarative logic provided in JSON or YAML files.

_YAML_ (YAML Ain't Markup Language or formally Yet Another Markup Language), is a structured text format that is also [a superset of JSON](https://stackoverflow.com/questions/1726802/what-is-the-difference-between-yaml-and-json/1729545#1729545). Unlike Markdown, YAML is better suited for describing objects, lists, strings, and numbers. 

## Understanding a yaml document

Here is an example yaml document. It contains an top-level property, `objects`, which contains a list of objects (denoted by the `-`). Each object in the list also contains properties, such as `name` and `content`.

```yaml
objects:
   - name: file.txt
     content: abc
   - name: file2.txt
     content: def
```

*Note*: YAML can be very picky about indentation.
The same content could also be represented as JSON, as follows:

```json
{ 
  "objects": [
    {"name": "file.txt", "content": "abc"}, 
    {"name": "file2.txt", "content": "def"}
  ]
}
```

## Exercise: Parsing a yaml document

You can read a [nice overview](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html) on the syntax, especially rules related to representing strings. But first, we will make a first pass in understanding it by parsing and doing something with YAML. 

1. Create the following yaml document by *clicking* the edit button 📝 in the notebook cell. 

   Any updates you make will inside the cell be updated in the file, after you leave focus.

```yaml |{type:'file', path: '/tmp/resources/objects.yaml'}
objects:
   - name: biblo.txt
     content: >
      hello
      this is content
      for this object.
   - name: tango.txt
     content: "string"
     readonly: true 
   - name: aditi.txt
     content: It is a simple name that comes from Sanskrit and means "free," "boundless," "unimpaired," or "entire."

```

2. Edit the following script cell. Run by *clicking* run button ▶️ or typing Ctrl-Enter.

   Extend the following code so that you can read the yaml contents and create files with the associated content. To help us parse the yaml, we use a package, called [js-yaml](https://github.com/nodeca/js-yaml]). 

   To create the file content, take advantage of the following functions:

     * `fs.writeFileSync(path, stringContent)`
     * `fs.existsSync( path )`
     * `fs.mkdirSync( path )`
     * `fs.chmodSync(path, octalValue)`

```js |{type:'script'}
const yaml = require('js-yaml');
const fs = require('fs');
const doc = yaml.safeLoad(fs.readFileSync('/tmp/resources/objects.yaml', 'utf8'));
for( var obj of doc.objects )
{
   console.log( obj );
   // TODO: Create file with obj.name, filled with obj.content inside an "objects" directory.

   // TODO: If readonly attribute exists, remove writable attribute. 
   
}
```


### Checking your work

4. To verify your solution is correct, run the following cell to check your code.

```bash | {type: 'command', shell: 'bash'}
# Checking for files with content
grep "for this object" /tmp/objects/biblo.txt
grep "string" /tmp/objects/tango.txt
grep "free" /tmp/objects/aditi.txt

# Checking read-only property
STAT=$(stat objects/aditi.txt -c%A)
if [[ $STAT == "-r--r--r--" ]]; then
    echo "Read only!";
else
    echo "Not read only: $STAT" || exit 1
fi
```


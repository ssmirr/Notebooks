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

### Creating a yaml file

Create the following yaml document by *clicking* the edit button 📝 in the notebook cell. 
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

### Parsing yaml with node

To help us parse the yaml, we use a package, called [js-yaml](https://github.com/nodeca/js-yaml]).
`js-yaml` will help use turn the yaml into a JSON object that can be manipulated and used in code.

Run the following code by *clicking* run button ▶️ or typing Ctrl-Enter. You should see the JSON representation of the yaml file printed out.

```js |{type:'script'}
const yaml = require('js-yaml');
const fs = require('fs');
const dir = require('os').tmpdir();
const doc = yaml.safeLoad(fs.readFileSync(`${dir}/resources/objects.yaml`, 'utf8'));
console.log( doc );
```

Now, let's extend the code so that you can process the yaml contents. In this case, we will use the yaml file to dynamically create files with the associated content. You could imagine a more advanced version of this being used to help create configuration files for a program.

### Simple yaml-based file creation tool.

Edit the following script cell. To dynamically create the files and write content, take advantage of the following functions:

* `fs.writeFileSync(path, stringContent)`
* `fs.existsSync( path )`
* `fs.mkdirSync( path )`
* `fs.chmodSync(path, octalValue)`

```js |{type:'script'}
const yaml = require('js-yaml');
const fs = require('fs');
const dir = require('os').tmpdir();
const doc = yaml.safeLoad(fs.readFileSync(`${dir}/resources/objects.yaml`, 'utf8'));

for( var obj of doc.objects )
{
    console.log( obj );
    // TODO: Create file with obj.name, filled with obj.content inside an "objects" directory.
  
    // TODO: If readonly attribute exists, remove writable attribute. 
   
}
```


### Checking your work

To verify your solution is correct, run the following cell to check your code.

```bash | {type: 'command', shell: 'bash'}
# Checking for files with content
grep "for this object" /tmp/objects/biblo.txt
grep "string" /tmp/objects/tango.txt
grep "free" /tmp/objects/aditi.txt

# Checking read-only property
STAT=$(stat /tmp/objects/aditi.txt -c%A)
if [[ $STAT == "-r--r--r--" ]]; then
    echo "Read only!";
else
    echo && echo "Not read only: $STAT" && exit 1
fi
```


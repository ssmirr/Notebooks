### Yaml

Parse yaml with node.js

```yaml |{type:'file', path: 'resources/objects.yaml'}
objects:
   - name: biblo
     content: >
      hello
      this is content
      for this object.
   - name: tango
     content: "string"
     readonly: true 
   - name: aditi
     content: It is a simple name that comes from Sanskrit and means "free," "boundless," "unimpaired," or "entire."

```

Let's install a package for parsing yaml.

```bash | {type:'command', failed_when: 'exitCode != 0' }
npm install js-yaml --no-save
```

```js |{type:'file', path: 'yaml.js'}
const yaml = require('js-yaml');
const fs = require('fs');
const doc = yaml.safeLoad(fs.readFileSync('resources/objects.yaml', 'utf8'));
for( var obj of doc.objects )
{
   console.log( obj );
   // TODO: Create file with obj.name, filled with obj.content inside an "objects" directory.

   // If readonly attribute exists, remove writable attribute. 
   
}
```

### Run your command to generate tree or debug stuff.

```bash|{type:'repl'}
```
### Yaml

Parse yaml with node.js

```yaml |{type:'file', path: 'resources/tree.yaml'}
- dir
   - file
- dir2
   - file2
```

👽 Interesting... running npm install, where do node_modules live? I guess just inside notebook dir? But makes this harder to use "script" type...

```js |{type:'script'}
const yaml = require('js-yaml');
// read file
// create directory/file structure
```

👽 Any way to live update files if they cells are also edited?

### Run your command to generate tree or debug stuff.

```bash|{type:'repl'}
```
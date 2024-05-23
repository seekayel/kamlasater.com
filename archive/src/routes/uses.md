# Uses

**Here's some stuff I use**

- SvelteKit
- VS Code
- Emojis 😎


**Fun snippet to count by type**
```js
let items = [{type:'a'},{type:'a'},{type:'b'},{type:'a'},{type:'b'},{type:'a'},{type:'c'}]
let counts = items.reduce((acc,cur)=> { (acc[cur.type])? acc[cur.type]++ : acc[cur.type] = 1; return acc}, {})
console.log(JSON.stringify(counts,null,2))
```

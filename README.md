This is a [remark][] plugin to automaticall transform javascript/jsx
codeblocks through [jscodeshift][].

### Usage

```bash
yarn add remark
yarn add remark-jscodeshift
remark -o --use remark-jscodeshift=transform:\"my-jscodeshift-transform.js\" File.md
```

### Example

Let's say you have a markdown file with explanations on how to use a React component:

`example.md`

``````markdown
# My component

To use my component, you should do:

```jsx
import MyComponent from 'my-ui-kit/MyComponent'

<MyComponent />
```

``````

Now, if your component API changes, or if the path of import has changed, and you
have written a codemod to automatically do the change, you can also apply this
codemod to the markdown docs.

Here the codemod automatically adds the `attr` prop with the value "value".
`my-jscodeshift-transform.js`

```js
const addPropToMyComponent = (file, api) => {
  const j = api.jscodeshift
  const root = j(file.source)

  root.find(j.JSXOpeningElement).forEach((path) => {
    path.node.attributes.push(
      j.jsxAttribute(j.jsxIdentifier("attr"), j.literal('value'))
    );
  });

  return root.toSource({ quote: 'single' })
}

module.exports = addPropToMyComponent;
```

With jscodeshift, you can already do:

```bash
jscodeshift -t my-jscodeshift-transform.js *.js
```

With this plugin, you can do:

```bash
remark -o --use remark-jscodeshift=transform:\"my-jscodeshift-transform.js\" Example.md
```

to automatically transform the code examples in you markdown files.

Here is the resulting diff on `example.md`:

```patch
- <MyComponent />
+ <MyComponent attr="value" />
```

This is particularly convenient when dealing with a large repository of markdown examples,
for example if you are maintaining a styleguide with [react-styleguidist][].

### Options

- `transform`: File path to the jscodeshift transform file
- `allowNoLang`: By default, remark-jscodeshift will only consider codeblocks whose language
  is `js`, `javascript` or `jsx`. By setting this option, it will also consider codeblocks
  with no language.

[remark]: https://github.com/remarkjs/remark
[jscodeshift]: https://github.com/facebook/jscodeshift
[react-styleguidist]: https://github.com/styleguidist/react-styleguidist

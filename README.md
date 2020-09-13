This is a [remark][] plugin to automaticall transform javascript/jsx
codeblocks through [jscodeshift][].

### Usage

```
yarn add remark
yarn add remark-jscodeshift
remark -o --use remark-jscodeshift=transform:\"my-jscodeshift-transform.js\" File.md
```

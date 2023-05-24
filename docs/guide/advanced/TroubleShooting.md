---
outline: deep
---

# TroubleShooting

## Debug 
If you are having trouble, deubgging might help. Turn on the debug mode using `generateTspec()` parameters. 

```js{3}
await generateTspec({
  ...
  debug: true
})
```


## Loading program
If you are getting empty OpenAPI documents, it is possible that you failed to pass the program to `generateTspec` method. Here are some settings that might help.

**Basic setting**
Pass the path to the `tsconfig.json` file using `tsconfigPath` parmater.
```js{3}
await generateTspec({
  ...
  tsconfigPath: '/path/to/program/tsconfig.json'
})
```

**Loading programs with errors**
Set `ignoreErrors` to `true` in order to use programs that includes errors.
```js{3}
await generateTspec({
  ...
  ignoreErrors: true
})
```

**Passing program paths**
If the program fails to find the location of the source files, you can directly pass program source file paths using `specPathGlobs`
```js{3}
await generateTspec({
  ...
  specPathGlobs: ['/path/to/src1', '/path/to/src2']
})
```
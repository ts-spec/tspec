---
outline: deep
---

# TroubleShooting

## Debug 
Turn on the debug mode using `generateTspec()` parameters. 

```js{3}
await generateTspec({
  ...
  debug: true
})
```


## Loading program
If you get empty OpenAPI documents as a result, you might have failed to pass program to the function. Setting `generateTspec()` parameters can help.

**Basic setting**
Pass the path to `tsconfig.json` via `tsconfigPath`
```js{3}
await generateTspec({
  ...
  tsconfigPath: '/path/to/program/tsconfig.json'
})
```

**Loading programs with errors**
Set `ignoreErrors` to `true` in order to use programs including errors.
```js{3}
await generateTspec({
  ...
  ignoreErrors: true
})
```

**Passing program paths**
Directly pass program source file paths via `specPathGlobs`
```js{3}
await generateTspec({
  ...
  specPathGlobs: ['/path/to/src1', '/path/to/src2']
})
```
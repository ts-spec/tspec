export const assertNever = (x: never): never => {
  throw new Error("Was not never: " + x);
}

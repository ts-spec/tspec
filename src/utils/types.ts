export function isDefined<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null;
}

export function assertIsDefined<T>(
  val: T,
  msg?: string,
): asserts val is NonNullable<T> {
  if (!isDefined(val)) {
    throw new Error(
      `Expected 'val' to be defined, but received: ${val};${msg || ''}`,
    );
  }
}

/**
 * NOTE(hyeonseong): This function does exhaustiveness checking to ensure
 * that you have discriminated a union so that no type remains.
 * Use this to get the typescript compiler to help discover cases that were not considered.
 */
export function checkNever(x: never) {
  throw new Error(`Unexpected object: ${JSON.stringify(x)}`);
}

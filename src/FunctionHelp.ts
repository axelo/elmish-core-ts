const stepFun = (prevRetVal: unknown, fun: (a: unknown) => unknown) =>
  fun(prevRetVal);

/**
 * Given a value, returns exactly the same value.
 */
export const identity = <A>(a: A) => a;

/**
 * Create a function that always returns the same value.
 */
export const always = <A>(a: A): ((ignored?: unknown) => A) => () => a;

/**
 * Create a function that always returns `void`.
 */
export const alwaysVoid = (_ignored?: unknown): void => {};

/**
 * Create a function that always returns `void` but its type signature is `never`.
 */
export const alwaysNever = alwaysVoid as (ignored?: unknown) => never;

/**
 * Flip the order of two curried arguments.
 */
export const flip = <A, B, C>(
  f: (a: A) => (b: B) => C
): ((a: B) => (b: A) => C) => b => a => f(a)(b);

/**
 * Access the value at `key` of `record` without having to create a specific function.
 */
export const dot = <A, K extends keyof A>(key: K) => (record: A): A[K] =>
  record[key];

/**
 * Compose a list of functions into one function.
 */
// prettier-ignore
export const compose: {
  <A, B, C>(b: (a: A) => B, c: (b: B) => C): (a: A) => C;
  <A, B, C>(b: (a: A) => B, c: (b: B) => C): (a: A) => C;
  <A, B, C, D>(b: (a: A) => B, c: (b: B) => C, d: (c: C) => D): (a: A) => D;
  <A, B, C, D, E>(b: (a: A) => B, c: (b: B) => C, d: (c: C) => D, e: (d: D) => E): (a: A) => E;
  <A, B, C, D, E, F>(b: (a: A) => B, c: (b: B) => C, d: (c: C) => D, e: (d: D) => E, f: (e: E) => F): (a: A) => F;
  <A, B, C, D, E, F, G>(b: (a: A) => B, c: (b: B) => C, d: (c: C) => D, e: (d: D) => E, f: (e: E) => F, g:(f: F) => G): (a: A) => G;
} =(
  ...funs: ((_: unknown) => unknown)[]
): (a: unknown) => unknown => 
  a => funs.reduce(stepFun, a);

/**
 * Pipe a value through a list of functions. Transforming the value through each step.
 */
// prettier-ignore
export const pipe: {
  <A, B>(a: A, b: (a: A) => B): B;
  <A, B, C>(a: A, b: (a: A) => B, c: (b: B) => C): C;
  <A, B, C, D>(a: A, b: (a: A) => B, c: (b: B) => C, d: (c: C) => D): D;
  <A, B, C, D, E>(a: A, b: (a: A) => B, c: (b: B) => C, d: (c: C) => D, e:(d:D) => E): E;
  <A, B, C, D, E, F>(a: A, b: (a: A) => B, c: (b: B) => C, d: (c: C) => D, e: (d: D) => E, f: (e: E) => F): F;
  <A, B, C, D, E, F, G>(a: A, b: (a: A) => B, c: (b: B) => C, d: (c: C) => D, e: (d: D) => E, f: (e: E) => F, g: (f: F) => G): G;
} = (a: unknown, ...funs: ((_: unknown) => unknown)[]): unknown => 
  funs.reduce(stepFun, a);

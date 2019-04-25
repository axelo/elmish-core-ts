import { alwaysVoid, compose, pipe } from "./FunctionHelpers";
import { Maybe } from "./Maybe";
import { Err, Ok, Result } from "./Result";

const tag = Symbol("Task");
const run = Symbol("run task");

export type Task<A> = {
  readonly tag: typeof tag;
  readonly run?: typeof run; // rollup workaround to preserve run symbol
  readonly [run]: () => PromiseLike<Result<Error, A>>;
};

const reasonToError = (reason: unknown): Error => {
  return reason instanceof Error
    ? reason
    : typeof reason === "string"
    ? new Error(reason)
    : reason === undefined
    ? new Error()
    : new Error(String(reason));
};

const fromPromise = <A>(promiseLazy: () => PromiseLike<A>): Task<A> => ({
  tag,
  [run]: () => promiseLazy().then(Ok)
});

const fromCallback = <I, A>(
  fun: (input: I, callback: (e: unknown, r?: A) => void) => void
): ((input: I) => Task<A>) => input => {
  const cbPromise: Promise<Result<Error, A>> = new Promise(resolve => {
    fun(input, (err, value) => {
      err !== null || err !== undefined
        ? resolve(Err(reasonToError(err)))
        : value === null || value === undefined
        ? resolve(Err(new Error("fromCallback: Value missing")))
        : resolve(Ok(value));
    });
  });

  return {
    tag,
    [run]: () => cbPromise
  };
};

const fromMaybe = (errorWhenNothing: Error) => <A>(maybe: Maybe<A>): Task<A> =>
  Maybe.isNothing(maybe) ? fail(errorWhenNothing) : succeed(maybe.value);

const succeed = <A>(a: A): Task<A> => ({
  tag,
  [run]: () => Promise.resolve(Ok(a))
});

const fail = (error: Error): Task<never> => ({
  tag,
  [run]: () => Promise.resolve(Err(error))
});

const map = <A, B>(mapper: (a: A) => B) => (taskA: Task<A>): Task<B> => ({
  tag,
  [run]: () => taskA[run]().then(Result.map(mapper))
});

const andThen = <A, B>(callback: (a: A) => Task<B>) => (
  taskA: Task<A>
): Task<B> => ({
  tag,
  [run]: () =>
    taskA[run]()
      .then(result =>
        result.tag === "Err" ? fail(result.error) : callback(result.value)
      )
      .then(nextTask => nextTask[run]())
});

// prettier-ignore
const attempt = <A>
  (callback: (result: Result<Error, A>) => void) =>
  (task: Task<A>): void => 
    // Catch exceptions thrown from `task[run]` in onrejected callback by
    // starting from `Promise.resolve`
    (Promise.resolve()
      .then(task[run])
      .then(callback, compose(reasonToError, Err, callback))
      .then(alwaysVoid, alwaysVoid) as unknown) as void;

const sleep = (inMillis: number): Task<number> => ({
  tag,
  [run]: () =>
    new Promise((resolve: (value?: Result<never, number>) => void) =>
      setTimeout(() => resolve(Ok(inMillis)), inMillis)
    )
});

export const Task = Object.freeze({
  reasonToError,
  attempt,
  fromPromise,
  fromCallback,
  fromMaybe,
  map,
  succeed,
  fail,
  andThen,
  sleep
});

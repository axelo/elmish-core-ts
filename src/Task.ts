import { alwaysNever } from "./FunctionHelp";
import { Maybe } from "./Maybe";
import { Err, Ok, Result } from "./Result";

const taskTag = Symbol("task");

export type Task<X, A> = {
  readonly tag: typeof taskTag;
  readonly [taskTag]: () => PromiseLike<Result<X, A>>;
};

const reasonToError = (reason: unknown): Error =>
  reason instanceof Error
    ? reason
    : typeof reason === "string"
    ? new Error(reason)
    : reason === undefined
    ? new Error()
    : new Error(String(reason));

const fromPromise = <X, A>(
  promiseLazy: () => PromiseLike<A>,
  onrejected: (reason: unknown) => X
): Task<X, A> => ({
  tag: taskTag,
  [taskTag]: () =>
    // Catch exceptions thrown from `promiseLazy` in onrejected callback by
    // starting from `Promise.resolve`
    Promise.resolve()
      .then(promiseLazy)
      .then(value => Ok(value), reason => Err(onrejected(reason)))
});

const fromCallback = <I, X, A>(
  fun: (input: I, callback: (e: X, r?: A) => void) => void
): ((input: I) => Task<X, A>) => input => {
  const cbPromise: PromiseLike<Result<X, A>> = new Promise(resolve => {
    fun(input, (err, value) => {
      err !== null || err !== undefined
        ? resolve(Err(err))
        : resolve(Ok(value as A));
    });
  });

  return {
    tag: taskTag,
    [taskTag]: () => cbPromise
  };
};

const fromMaybe = <X>(errorWhenNothing: X) => <A>(
  maybe: Maybe<A>
): Task<X, A> =>
  Maybe.isNothing(maybe) ? fail(errorWhenNothing) : succeed(maybe.value);

const succeed = <A, X = never>(a: A): Task<X, A> => ({
  tag: taskTag,
  [taskTag]: () => Promise.resolve(Ok(a))
});

const fail = <X, A = never>(error: X): Task<X, A> => ({
  tag: taskTag,
  [taskTag]: () => Promise.resolve(Err(error))
});

const map = <X, A, B>(mapper: (a: A) => B) => (
  taskA: Task<X, A>
): Task<X, B> => ({
  tag: taskTag,
  [taskTag]: () => taskA[taskTag]().then(Result.map(mapper))
});

const andThen = <X, A, B>(callback: (a: A) => Task<X, B>) => (
  taskA: Task<X, A>
): Task<X, B> => ({
  tag: taskTag,
  [taskTag]: () =>
    taskA[taskTag]().then((result: Result<X, A>) =>
      (result.tag === "Err"
        ? fail<X, B>(result.error)
        : callback(result.value))[taskTag]()
    )
});

const attempt = <X, A>(callback: (result: Result<X, A>) => void) => (
  task: Task<X, A>
) => task[taskTag]().then(callback) as PromiseLike<never>;

const now = (): Task<never, Date> =>
  fromPromise(() => Promise.resolve(new Date()), alwaysNever);

const sleep = (inMillis: number): Task<never, number> =>
  fromPromise(
    () => new Promise(resolve => setTimeout(resolve, inMillis)),
    alwaysNever
  );

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
  now,
  sleep
});

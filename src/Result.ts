export type Result<X, Value> = Ok<Value> | Err<X>;

type Ok<A> = {
  readonly tag: "Ok";
  readonly value: A;
};

type Err<X> = {
  readonly tag: "Err";
  readonly error: X;
};

export const Ok = <X, A>(value: A): Result<X, A> => ({
  tag: "Ok",
  value
});

export const Err = <X, A>(error: X): Result<X, A> => ({
  tag: "Err",
  error
});

// prettier-ignore
const map = <X, A, B>
  (mapper: (a: A) => B) => (resultA: Result<X, A>): Result<X, B> =>
    resultA.tag === "Err" ? resultA : Ok(mapper(resultA.value));

// prettier-ignore
const mapError = <X, Y, A>
  (mapper: (a: X) => Y) => (resultA: Result<X, A>): Result<Y, A> =>
    resultA.tag === "Ok" ? resultA : Err(mapper(resultA.error));

export const Result = Object.freeze({
  /**
   * Apply a function to a result. If the result is Ok, it will be converted. If the result is an Err, the same error value will propagate through.
   */
  map,

  /**
   * Transform an Err value.
   */
  mapError
});

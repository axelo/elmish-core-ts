export type Result<ErrResult, Value> = Ok<Value> | Err<ErrResult>;

type Ok<A> = { tag: "Ok"; value: A };
type Err<X> = { tag: "Err"; error: X };

export const Ok = <A>(value: A): Ok<A> => ({
  tag: "Ok",
  value
});

export const Err = <X>(error: X): Err<X> => ({
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
  map,
  mapError
});

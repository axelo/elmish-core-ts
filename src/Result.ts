export type Result<X, Value> = Ok<Value> | Err<X>;

type Ok<A> = { readonly tag: "Ok"; readonly value: A };
type Err<X> = { readonly tag: "Err"; readonly error: X };

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

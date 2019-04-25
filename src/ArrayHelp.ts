import { Just, Maybe, Nothing } from "./Maybe";
import { Comparable } from "./Comparable";

const concat = <AS extends ReadonlyArray<unknown>>(
  nested: ReadonlyArray<AS>
): Readonly<AS> => (([] as unknown[]).concat(...nested) as unknown) as AS;

const filter = <A>(predicate: (a: A) => boolean) => (
  as: ReadonlyArray<A>
): ReadonlyArray<A> => as.filter(predicate);

const map = <B, A>(mapper: (a: A) => B) => (
  as: ReadonlyArray<A>
): ReadonlyArray<B> => as.map(mapper);

const findLast = <A>(predicate: (a: A) => boolean) => (
  as: ReadonlyArray<A>
): Maybe<A> => {
  for (let i = as.length - 1; i >= 0; --i) {
    const a = as[i];

    if (predicate(a)) {
      return Just(a);
    }
  }

  return Nothing;
};

const sortBy = <A>(compareBy: Comparable<A>) => (
  as: ReadonlyArray<A>
): ReadonlyArray<A> => as.slice().sort((a, b) => compareBy(a) - compareBy(b));

const head = <A>(as: ReadonlyArray<A>): Maybe<A> =>
  as.length === 0 ? Nothing : Just(as[0]);

export const FArray = Object.freeze({
  concat,
  filter,
  map,
  findLast,
  sortBy,
  head
});

// const a = flip(filter)([1, 2, 3])(_ => true);
// const b = concat([[1], [2]]);

// const cc = map(val => true)([1, 2, 3]);
// const c = flip(map)([1, 2, 3])((val): boolean => true);

// const cc2 = cc[0];

// const aa = pipe(
//   [1, 2, 3],
//   map(_ => true)
// );

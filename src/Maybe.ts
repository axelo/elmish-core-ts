import { FptsEither, FptsOption } from "./FptsTypes";

export type Maybe<A> = Just<A> | Nothing;

type Just<A> = { readonly tag: "Just"; value: A };
type Nothing = { readonly tag: "Nothing" };

const fromNullable = <A>(nullable: A | undefined | null): Maybe<A> =>
  nullable === null || nullable === undefined ? Nothing : Just(nullable);

const isNothing = <A>(maybe: Maybe<A>): maybe is Nothing => maybe === Nothing;

const withDefault = <A>(a: A) => (maybe: Maybe<A>) =>
  isNothing(maybe) ? a : maybe.value;

// prettier-ignore
const map = <A, B>
  (mapper: (a: A) => B) => (maybeA: Maybe<A>): Maybe<B> =>
    isNothing(maybeA) ? Nothing : Just(mapper(maybeA.value));

// prettier-ignore
const map2 = <A, B, Value>
  (mapper: (a: A) => (b: B) => Value) => (maybeA: Maybe<A>) => (maybeB: Maybe<B>): Maybe<Value> =>
    isNothing(maybeA) || isNothing(maybeB)
      ? Nothing
      : Just(mapper(maybeA.value)(maybeB.value));

// prettier-ignore
const andThen = <A, B>
  (callback: (a: A) => Maybe<B>) => (maybeA: Maybe<A>): Maybe<B> =>
    isNothing(maybeA)
      ? Nothing
      : callback(maybeA.value);

const Fpts = Object.freeze({
  fromEither: <A>(either: FptsEither<unknown, A>): Maybe<A> =>
    either._tag === "Left" ? Nothing : Just(either.value),

  fromOption: <A>(option: FptsOption<A>): Maybe<A> =>
    option._tag === "None" ? Nothing : Just(option.value)
});

/**
 * Construct Just `a` value.
 */
export const Just = <A>(a: A): Just<A> => ({ tag: "Just", value: a });

/**
 * Nothing.
 */
export const Nothing: Nothing = Object.freeze({ tag: "Nothing" });

export const Maybe = Object.freeze({
  Fpts,
  fromNullable,
  isNothing,

  /**
   * Provide a default value, turning a Maybe value into a normal value.
   */
  withDefault,

  /**
   * Transform a Maybe value with a given function.
   */

  map,
  /**
   * Apply a function if all the arguments are Just a value.
   */
  map2,

  /**
   * Chain together many computations that may fail.
   */
  andThen
});
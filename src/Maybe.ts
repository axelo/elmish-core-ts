import { FptsEither, FptsOption } from "./FptsTypes";

export type Maybe<A> = Just<A> | Nothing;

type Just<A> = {
  readonly tag: "Just";
  readonly value: A;
};

type Nothing = {
  readonly tag: "Nothing";
};

const fromNullable = <A>(nullable: A | undefined | null): Maybe<A> =>
  nullable === null || nullable === undefined ? Nothing : Just(nullable);

const fromFptsEither = <A>(either: FptsEither<unknown, A>): Maybe<A> =>
  either._tag === "Left" ? Nothing : Just(either.value);

const fromFptsOption = <A>(option: FptsOption<A>): Maybe<A> =>
  option._tag === "None" ? Nothing : Just(option.value);

const isNothing = <A>(maybe: Maybe<A>): maybe is Nothing =>
  maybe.tag === "Nothing";

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

/**
 * Construct Just `a` value.
 */
export const Just = <A>(a: A): Maybe<A> => ({ tag: "Just", value: a });

/**
 * Nothing.
 */
export const Nothing: Maybe<never> = Object.freeze({
  tag: "Nothing"
});

/**
 * A Maybe can be used instead of `null` or `undefined`.
 */
export const Maybe = Object.freeze({
  /**
   * Convert a value that can be `undefined` or `null` to a Maybe value.
   */
  fromNullable,

  /**
   * Convert from fp-ts `Either`.
   */
  fromFptsEither,

  /**
   * Convert from fp-ts `Option`.
   */
  fromFptsOption,

  /**
   * Check if a Maybe value is Nothing.
   */
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

import { Maybe, pipe, Just, Nothing } from "../src/";
import * as Assert from "./Assert";

const assert = Assert.fromFile(__filename);

assert(Just(42) !== Just(42), "same reference :O");

assert(Nothing === Nothing, "Nothing is always the same reference");

// withDefault

assert(Maybe.withDefault(1337)(Nothing) === 1337, "withDefault when Nothing");

assert(Maybe.withDefault(1337)(Just(42)) === 42, "Skip withDefault when Just");
assert(
  Maybe.withDefault(false)(Just(true)) === true,
  "Skip withDefault when Just"
);

// map

assert(
  pipe(
    Just(9),
    Maybe.map(Math.sqrt),
    Maybe.withDefault(0)
  ) === 3,
  "map is called on Just"
);

assert(Maybe.map(Math.sqrt)(Nothing) === Nothing, "Only map when Just");

// map2

assert(
  pipe(
    Maybe.map2((a: number) => (b: string) => a + Number(b))(Just(40))(
      Just("2")
    ),
    Maybe.withDefault(0)
  ) === 42,
  "map2 when two Justs"
);

// andThen

const parseMonth: (userInput: string) => Maybe<number> = userInput =>
  pipe(
    userInput, //
    stringToPosInt,
    Maybe.andThen(toValidMonth)
  );

const stringToPosInt: (s: string) => Maybe<number> = s =>
  /^\d+$/.test(s) ? Just(Number(s)) : Nothing;

const toValidMonth: (month: number) => Maybe<number> = month =>
  1 <= month && month <= 12 ? Just(month) : Nothing;

assert(
  pipe(
    parseMonth("4"), //
    Maybe.withDefault(-1)
  ) === 4,
  "andThen chains Maybes when Just"
);

assert(
  pipe(
    Just(4),
    Maybe.map2((a: number) => (b: number) => a === b)(parseMonth("4")),
    Maybe.withDefault(false as boolean)
  ) === true,
  "andThen chains with map2"
);

assert(
  parseMonth("not a number") === Nothing,
  "andThen short circuit when Nothing"
);

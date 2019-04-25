import {
  always,
  compose,
  dot,
  flip,
  identity,
  pipe
} from "../src/FunctionHelp";
import * as Assert from "./Assert";

// HELPERS

const assert = Assert.fromFile(__filename);

const addOne = (val: number) => val + 1;
const sub = (a: number) => (b: number) => a - b;

// IDENTITY

assert(identity("a") === "a", "identity should return input`");

assert(identity("a") !== ("b" as unknown), "identity should return input`");

assert(identity("a") === identity("a"), "identity should return input`");

assert(
  identity("a") !== (identity("b") as unknown),
  "different input should not be ref. eq`"
);

// ALWAYS

assert(always("a")() === "a", "always should return locked input`");

assert(always("a")("b") === "a", "always should return locked input`");

// FLIP

assert(sub(1)(2) === -1, "sub works as expected");
assert(flip(sub)(1)(2) === 1, "flip of sub changes the result");

// DOT

// assert(
//   dot("key")({ key: "1337" }) === "1337",
//   "dot extract value of key from object"
// );

assert(
  flip(dot)({ key: "1337" })("key") === "1337",
  "dot extract value of key from object"
);

// const k = pipe(
//   { key: "1337" },
//   dot("key")
// );
// const k2 = pipe(
//   Just({ key: "1337" }),
//   Maybe.map(dot("key"))
// );
// const k3 = pipe(
//   FArray.concat([[{ key: "1337", val: 1337 }]]),
//   FArray.filter(e => true),
//   FArray.map(dot("key"))
// );

// PIPE

assert(
  pipe(
    1,
    identity
  ) === 1,
  "pipe one"
);

assert(
  pipe(
    1,
    identity,
    addOne
  ) === 2,
  "pipe two"
);

// COMPOSE

const alwaysTwo = compose(
  always(1),
  addOne
);

assert(alwaysTwo("dummy") === 2, "compose with always");

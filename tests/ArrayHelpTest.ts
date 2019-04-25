import { Comparable, ArrayHelp, pipe, dot, compose } from "../src";
import * as Assert from "./Assert";

const assert = Assert.fromFile2v(__filename);

// CONCAT

pipe(
  pipe(
    ArrayHelp.concat([[1], [2, 3], [4]]),
    JSON.stringify
  ) ===
    pipe(
      [1, 2, 3, 4],
      JSON.stringify
    ),
  assert("concat flattens an array of arrays")
);

// MAP

pipe(
  pipe(
    [1, 2, 3],
    ArrayHelp.map(val => val + 1),
    JSON.stringify
  ) ===
    pipe(
      [2, 3, 4],
      JSON.stringify
    ),
  assert("map each element")
);

// SORTBY

pipe(
  pipe(
    [new Date(1), new Date(0), new Date(2)],
    ArrayHelp.sortBy(Comparable.date),
    ArrayHelp.map(d => d.valueOf()),
    JSON.stringify
  ) === JSON.stringify([0, 1, 2]),
  assert("sortBy asc order")
);

pipe(
  pipe(
    [{ t: new Date(1) }, { t: new Date(0) }, { t: new Date(2) }],
    ArrayHelp.sortBy(item => Comparable.date(item.t)),
    ArrayHelp.map(d => d.t.valueOf()),
    JSON.stringify
  ) === JSON.stringify([0, 1, 2]),
  assert("sortBy asc order")
);

pipe(
  pipe(
    [{ t: new Date(1) }, { t: new Date(0) }, { t: new Date(2) }],
    ArrayHelp.sortBy(
      compose(
        dot("t"),
        Comparable.date
      )
    ),
    ArrayHelp.map(d => d.t.valueOf()),
    JSON.stringify
  ) === JSON.stringify([0, 1, 2]),
  assert("sortBy asc order")
);

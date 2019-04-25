import { Comparable, FArray, pipe, dot, compose } from "../src";
import * as Assert from "./Assert";

const assert = Assert.fromFile2v(__filename);

// CONCAT

pipe(
  pipe(
    FArray.concat([[1], [2, 3], [4]]),
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
    FArray.map(val => val + 1),
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
    FArray.sortBy(Comparable.date),
    FArray.map(d => d.valueOf()),
    JSON.stringify
  ) === JSON.stringify([0, 1, 2]),
  assert("sortBy asc order")
);

pipe(
  pipe(
    [{ t: new Date(1) }, { t: new Date(0) }, { t: new Date(2) }],
    FArray.sortBy(item => Comparable.date(item.t)),
    FArray.map(d => d.t.valueOf()),
    JSON.stringify
  ) === JSON.stringify([0, 1, 2]),
  assert("sortBy asc order")
);

pipe(
  pipe(
    [{ t: new Date(1) }, { t: new Date(0) }, { t: new Date(2) }],
    FArray.sortBy(
      compose(
        dot("t"),
        Comparable.date
      )
    ),
    FArray.map(d => d.t.valueOf()),
    JSON.stringify
  ) === JSON.stringify([0, 1, 2]),
  assert("sortBy asc order")
);

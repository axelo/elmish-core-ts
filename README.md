# elmish-core-ts

A library for writing more functional the Elm way with your TypeScript.

## Examples

### pipe

```typescript
import { pipe } from "elmish-core-ts";

const addOne = (val: number) => val + 1;
const addWith = (withWhat: number) => (val: number) => val + withWhat;
const toString = (val: number): string => String(val);
const appendWith = (withWhat: string) => (val: string) => val + withWhat;

console.log(
  pipe(
    addOne(0), // 0 + 1
    addWith(5), // 1 + 5
    toString, // "6"
    appendWith("!") // "6!"
  )
); // 6!
```

### Maybe

```typescript
import { Just, Maybe, Nothing, pipe } from "elmish-core-ts";

console.log(Maybe.withDefault("1970-01-01")(Just("1999-12-31"))); // 1999-12-31

console.log(Maybe.withDefault("1970-01-01")(Nothing)); // 1970-01-01

console.log(
  pipe(
    Just("1999-12-31"),
    Maybe.withDefault("1970-01-01")
  )
); // 1999-12-31

console.log(
  pipe(
    Nothing,
    Maybe.withDefault("1970-01-01")
  )
); // 1970-12-31
```

### Realworld examples

* [dagartilllon](https://github.com/axelo/dagartilllon/blob/master/app.ts)

# elmish-core-ts

A library for writing more functional the Elm way with your TypeScript.


## Examples

### Maybe

```typescript
import { Just, Nothing, Maybe, pipe, compose } from "elmish-core-ts";

type User = Readonly<{
  username: string;
  role: "admin" | "user";
  updatedAt: Maybe<Date>;
}>;

const bob: User = {
  username: "Bob",
  role: "admin",
  updatedAt: Just(new Date(1337))
};

const alice: User = {
  username: "Alice",
  role: "user",
  updatedAt: Nothing
};

const updatedAt: Date = Maybe.withDefault(new Date(0))(bob.updatedAt);

const updatedAt_ = pipe(
  bob.updatedAt,
  Maybe.withDefault(new Date(0))
);

const withDefaultDate = compose(
  (t: number) => new Date(t),
  Maybe.withDefault
);

const updatedAt__: Date = withDefaultDate(0)(bob.updatedAt);
const updatedAt___: Date = pipe(
  bob.updatedAt,
  withDefaultDate(0)
);
```
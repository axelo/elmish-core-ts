import { Just, Maybe, Nothing, pipe } from "../lib";

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

const maybeAnswer = Just(42);

switch (maybeAnswer.tag) {
  case "Just":
    console.log(maybeAnswer.value);
    break;
  case "Nothing":
    console.log("Nothing");
    break;
}

const maybeNextAnswer = Nothing;

switch (maybeNextAnswer.tag) {
  case "Just":
    console.log(maybeNextAnswer.value);
    break;
  case "Nothing":
    console.log("Nothing");
    break;
}

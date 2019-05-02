// import * as Assert from "./Assert";
import { Debug, pipe, Task } from "../src";

(async () => {
  const addExpl = (s: string) => s + "!";
  const addQues = (s: string) => s + "?";

  await pipe(
    Task.succeed("ok"),
    Task.andThen(status =>
      status === "ok"
        ? Task.fail(new Error("Missing 'dagar'"))
        : Task.succeed(1337)
    ),
    Task.map(a => a),
    Task.attempt(Debug.log("Result"))
  );

  await pipe(
    Task.fromPromise(() => {
      throw new Error("Throw from fromPromise");
    }, Task.reasonToError),
    // Task.succeed("ok!"),
    Task.map(_ => {
      throw new Error("Throw from Map");
    }),
    Task.attempt(Debug.log("Result"))
  );

  await pipe(
    Task.succeed("ok!"),
    Task.map((msg: string) => msg + "!!"),
    Task.attempt(Debug.log("Result"))
  );

  // await pipe(
  //   Task.succeed("Yey"),
  //   Task.andThen(_ => {
  //     // throw new Error("ONLY ERROR2");
  //     return Task.fail("Dayum");
  //   }),
  //   Task.mapError(_ => "STRING ERROR!"),
  //   Task.attempt(Debug.log("only error2?"))
  // );

  // await Task.attempt(Debug.log("Performed!"))(t);
  // await pipe(
  //   t,
  //   Task.attempt(Debug.log("Performed!"))
  // );

  // await Task.attempt(Debug.log(""))(Task.succeed("yeah!"));
  // await Task.attempt(Debug.log(""))(Task.fail("dayum!"));

  await pipe(
    Task.sleep(1000),
    Task.andThen(() => Task.succeed("SOVIT!!!")),
    Task.attempt(Debug.log(""))
  );

  // const t1 = pipe(
  //   "yeah",
  //   Task.succeed,
  //   Task.andThen(_ =>
  //     Task.fromPromise(() => {
  //       throw new Error("nooo");
  //     }, Task.reasonToError)
  //   ),
  //   Task.andThen(_s => Task.succeed("ok?") as Task<unknown, string>), // never wont compile with ts-node as we are changing the error type, correct?
  //   Task.mapError(_e => "BROKEN!")
  // );

  // await Task.attempt(Debug.log("COol"))(t1);
  // await Task.attempt(Debug.log("NEHE?"))(
  //   Task.fromPromise(() => {
  //     console.log("WOOTae");
  //     throw new Error("Woot");
  //   }, Task.reasonToError)
  // );

  // await pipe(
  //   Task.succeed("Step1"),
  //   Task.andThen(step => Task.succeed(step + " step2")),
  //   Task.andThen(step2 => Task.succeed(step2 + " step3")),
  //   Task.attempt(Debug.log(""))
  // );

  // await pipe(
  //   Task.succeed("Step1"),
  //   Task.andThen(_ => {
  //     throw new Error("Ops");
  //   }),
  //   Task.attempt(res => {
  //     switch (res.tag) {
  //       case "Err":
  //         Debug.log("Opsi dopsie")(res);
  //         break;
  //       case "Ok":
  //         Debug.log("Success")(res);
  //     }
  //   })
  // );

  // await pipe(
  //   Task.fail("OJ :O"),
  //   Task.andThen(_ => Task.fail(":))")),
  //   Task.attempt(Debug.log(""))
  // );

  // await pipe(
  //   Task.succeed("OJ :O"),
  //   Task.andThen(_ => Task.fail(":))")),
  //   Task.attempt(Debug.log(""))
  // );

  // await pipe(
  //   Task.fail(1337),
  //   Task.map(always(42)),
  //   Task.mapError(e => e + 3),
  //   Task.attempt(
  //     compose(
  //       Debug.log("Next attempt after"),
  //       always(Task.sleep(2000)),
  //       Task.andThen(() => Task.succeed("cont")),
  //       Task.attempt(Debug.log("Attempt done!"))
  //     )
  //   )
  // );

  Debug.log("DOne!")("");
})();

import * as Assert from "./Assert";
import { Err, Ok } from "../src";

const assert = Assert.fromFile(__filename);

const err = Err("bad");

assert(err.tag === "Err" && err.error === "bad", "Err preserves value");

const ok = Ok("success");

assert(ok.tag === "Ok" && ok.value === "success", "Ok preserves value");

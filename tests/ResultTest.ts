import * as Assert from "./Assert";
import { Err, Ok } from "../src";

const assert = Assert.fromFile(__filename);

assert(Err("bad").error === "bad", "Err preserves value");

assert(Ok("success").value === "success", "Ok preserves value");

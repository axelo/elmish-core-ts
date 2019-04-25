import * as path from "path";
import * as assert from "assert";

export const fromFile = (filename: string) => (
  condition: boolean,
  failureMessage: string
) => assert(condition, `[${path.basename(filename)}] ${failureMessage}`);

export const fromFile2v = (filename: string) => (failureMessage: string) => (
  condition: boolean
) => assert(condition, `[${path.basename(filename)}] ${failureMessage}`);

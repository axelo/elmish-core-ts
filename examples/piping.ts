import { pipe } from "../lib";

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

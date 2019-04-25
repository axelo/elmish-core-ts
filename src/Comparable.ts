export type Comparable<C> = (c: C) => number;

const date: Comparable<Date> = d => d.valueOf();

export const Comparable = Object.freeze({
  date
});

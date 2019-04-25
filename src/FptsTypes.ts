export type FptsEither<L, A> = FptsLeft<L, A> | FptsRight<L, A>;

export type FptsLeft<L, A> = {
  readonly value: L;
  readonly _tag: "Left";
  readonly _A: A;
  readonly _L: L;
};

export type FptsRight<L, A> = {
  readonly value: A;
  readonly _tag: "Right";
  readonly _A: A;
  readonly _L: L;
};

export type FptsOption<A> = FptsNone<A> | FptsSome<A>;

export type FptsNone<A> = {
  readonly _tag: "None";
  readonly _A: A;
};

export type FptsSome<A> = {
  readonly value: A;
  readonly _tag: "Some";
  readonly _A: A;
};

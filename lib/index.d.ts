declare type FptsEither<L, A> = FptsLeft<L, A> | FptsRight<L, A>;
declare type FptsLeft<L, A> = {
    readonly value: L;
    readonly _tag: "Left";
    readonly _A: A;
    readonly _L: L;
};
declare type FptsRight<L, A> = {
    readonly value: A;
    readonly _tag: "Right";
    readonly _A: A;
    readonly _L: L;
};
declare type FptsOption<A> = FptsNone<A> | FptsSome<A>;
declare type FptsNone<A> = {
    readonly _tag: "None";
    readonly _A: A;
};
declare type FptsSome<A> = {
    readonly value: A;
    readonly _tag: "Some";
    readonly _A: A;
};

declare type Maybe<A> = Just<A> | Nothing;
declare type Just<A> = {
    readonly tag: "Just";
    value: A;
};
declare type Nothing = {
    readonly tag: "Nothing";
};
/**
 * Construct Just `a` value.
 */
declare const Just: <A>(a: A) => Just<A>;
/**
 * Nothing.
 */
declare const Nothing: Nothing;
declare const Maybe: Readonly<{
    Fpts: Readonly<{
        fromEither: <A>(either: FptsEither<unknown, A>) => Maybe<A>;
        fromOption: <A>(option: FptsOption<A>) => Maybe<A>;
    }>;
    fromNullable: <A>(nullable: A | null | undefined) => Maybe<A>;
    isNothing: <A>(maybe: Maybe<A>) => maybe is Nothing;
    /**
     * Provide a default value, turning a Maybe value into a normal value.
     */
    withDefault: <A>(a: A) => (maybe: Maybe<A>) => A;
    /**
     * Transform a Maybe value with a given function.
     */
    map: <A, B>(mapper: (a: A) => B) => (maybeA: Maybe<A>) => Maybe<B>;
    /**
     * Apply a function if all the arguments are Just a value.
     */
    map2: <A, B, Value>(mapper: (a: A) => (b: B) => Value) => (maybeA: Maybe<A>) => (maybeB: Maybe<B>) => Maybe<Value>;
    /**
     * Chain together many computations that may fail.
     */
    andThen: <A, B>(callback: (a: A) => Maybe<B>) => (maybeA: Maybe<A>) => Maybe<B>;
}>;

declare type Comparable<C> = (c: C) => number;
declare const Comparable: Readonly<{
    date: Comparable<Date>;
}>;

declare const ArrayHelp: Readonly<{
    concat: <AS extends readonly unknown[]>(nested: readonly AS[]) => Readonly<AS>;
    filter: <A>(predicate: (a: A) => boolean) => (as: readonly A[]) => readonly A[];
    map: <B, A>(mapper: (a: A) => B) => (as: readonly A[]) => readonly B[];
    findLast: <A>(predicate: (a: A) => boolean) => (as: readonly A[]) => Maybe<A>;
    sortBy: <A>(compareBy: Comparable<A>) => (as: readonly A[]) => readonly A[];
    head: <A>(as: readonly A[]) => Maybe<A>;
}>;

declare const Debug: Readonly<{
    log: (message: string) => <A>(a: A) => A;
}>;

/**
 * Given a value, returns exactly the same value.
 */
declare const identity: <A>(a: A) => A;
/**
 * Create a function that always returns the same value.
 */
declare const always: <A>(a: A) => (ignored?: unknown) => A;
/**
 * Create a function that always returns `void`.
 */
declare const alwaysVoid: (_ignored?: unknown) => void;
/**
 * Create a function that always returns `void` but its type signature is `never`.
 */
declare const alwaysNever: (ignored?: unknown) => never;
declare const flip: <A, B, C>(f: (a: A) => (b: B) => C) => (a: B) => (b: A) => C;
declare const dot: <A, K extends keyof A>(key: K) => (record: A) => A[K];
declare const compose: {
    <A, B, C>(b: (a: A) => B, c: (b: B) => C): (a: A) => C;
    <A, B, C>(b: (a: A) => B, c: (b: B) => C): (a: A) => C;
    <A, B, C, D>(b: (a: A) => B, c: (b: B) => C, d: (c: C) => D): (a: A) => D;
    <A, B, C, D, E>(b: (a: A) => B, c: (b: B) => C, d: (c: C) => D, e: (d: D) => E): (a: A) => E;
    <A, B, C, D, E, F>(b: (a: A) => B, c: (b: B) => C, d: (c: C) => D, e: (d: D) => E, f: (e: E) => F): (a: A) => F;
    <A, B, C, D, E, F, G>(b: (a: A) => B, c: (b: B) => C, d: (c: C) => D, e: (d: D) => E, f: (e: E) => F, g: (f: F) => G): (a: A) => G;
};
declare const pipe: {
    <A, B>(a: A, b: (a: A) => B): B;
    <A, B, C>(a: A, b: (a: A) => B, c: (b: B) => C): C;
    <A, B, C, D>(a: A, b: (a: A) => B, c: (b: B) => C, d: (c: C) => D): D;
    <A, B, C, D, E>(a: A, b: (a: A) => B, c: (b: B) => C, d: (c: C) => D, e: (d: D) => E): E;
    <A, B, C, D, E, F>(a: A, b: (a: A) => B, c: (b: B) => C, d: (c: C) => D, e: (d: D) => E, f: (e: E) => F): F;
    <A, B, C, D, E, F, G>(a: A, b: (a: A) => B, c: (b: B) => C, d: (c: C) => D, e: (d: D) => E, f: (e: E) => F, g: (f: F) => G): G;
};

declare type Result<ErrResult, Value> = Ok<Value> | Err<ErrResult>;
declare type Ok<A> = {
    tag: "Ok";
    value: A;
};
declare type Err<X> = {
    tag: "Err";
    error: X;
};
declare const Ok: <A>(value: A) => Ok<A>;
declare const Err: <X>(error: X) => Err<X>;
declare const Result: Readonly<{
    map: <X, A, B>(mapper: (a: A) => B) => (resultA: Result<X, A>) => Result<X, B>;
    mapError: <X, Y, A>(mapper: (a: X) => Y) => (resultA: Result<X, A>) => Result<Y, A>;
}>;

declare const tag: unique symbol;
declare const run: unique symbol;
declare type Task<A> = {
    readonly tag: typeof tag;
    readonly run?: typeof run;
    readonly [run]: () => PromiseLike<Result<Error, A>>;
};
declare const Task: Readonly<{
    reasonToError: (reason: unknown) => Error;
    attempt: <A>(callback: (result: Result<Error, A>) => void) => (task: Task<A>) => void;
    fromPromise: <A>(promiseLazy: () => PromiseLike<A>) => Task<A>;
    fromCallback: <I, A>(fun: (input: I, callback: (e: unknown, r?: A | undefined) => void) => void) => (input: I) => Task<A>;
    fromMaybe: (errorWhenNothing: Error) => <A>(maybe: Maybe<A>) => Task<A>;
    map: <A, B>(mapper: (a: A) => B) => (taskA: Task<A>) => Task<B>;
    succeed: <A>(a: A) => Task<A>;
    fail: (error: Error) => Task<never>;
    andThen: <A, B>(callback: (a: A) => Task<B>) => (taskA: Task<A>) => Task<B>;
    sleep: (inMillis: number) => Task<number>;
}>;

export { ArrayHelp, Comparable, Debug, Err, Just, Maybe, Nothing, Ok, Result, Task, always, alwaysNever, alwaysVoid, compose, dot, flip, identity, pipe };

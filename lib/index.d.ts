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
    readonly value: A;
};
declare type Nothing = {
    readonly tag: "Nothing";
};
/**
 * Construct Just `a` value.
 */
declare const Just: <A>(a: A) => Maybe<A>;
/**
 * Nothing.
 */
declare const Nothing: Maybe<never>;
/**
 * A Maybe can be used instead of `null` or `undefined`.
 */
declare const Maybe: Readonly<{
    /**
     * Convert a value that can be `undefined` or `null` to a Maybe value.
     */
    fromNullable: <A>(nullable: A | null | undefined) => Maybe<A>;
    /**
     * Convert from fp-ts `Either`.
     */
    fromFptsEither: <A>(either: FptsEither<unknown, A>) => Maybe<A>;
    /**
     * Convert from fp-ts `Option`.
     */
    fromFptsOption: <A>(option: FptsOption<A>) => Maybe<A>;
    /**
     * Check if a Maybe value is Nothing.
     */
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
    /**
     * Console log a value with a message.
     */
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
/**
 * Flip the order of two curried arguments.
 */
declare const flip: <A, B, C>(f: (a: A) => (b: B) => C) => (a: B) => (b: A) => C;
/**
 * Access the value at `key` of `record` without having to create a specific function.
 */
declare const dot: <A, K extends keyof A>(key: K) => (record: A) => A[K];
/**
 * Compose a list of functions into one function.
 */
declare const compose: {
    <A, B, C>(b: (a: A) => B, c: (b: B) => C): (a: A) => C;
    <A, B, C>(b: (a: A) => B, c: (b: B) => C): (a: A) => C;
    <A, B, C, D>(b: (a: A) => B, c: (b: B) => C, d: (c: C) => D): (a: A) => D;
    <A, B, C, D, E>(b: (a: A) => B, c: (b: B) => C, d: (c: C) => D, e: (d: D) => E): (a: A) => E;
    <A, B, C, D, E, F>(b: (a: A) => B, c: (b: B) => C, d: (c: C) => D, e: (d: D) => E, f: (e: E) => F): (a: A) => F;
    <A, B, C, D, E, F, G>(b: (a: A) => B, c: (b: B) => C, d: (c: C) => D, e: (d: D) => E, f: (e: E) => F, g: (f: F) => G): (a: A) => G;
};
/**
 * Pipe a value through a list of functions. Transforming the value through each step.
 */
declare const pipe: {
    <A, B>(a: A, b: (a: A) => B): B;
    <A, B, C>(a: A, b: (a: A) => B, c: (b: B) => C): C;
    <A, B, C, D>(a: A, b: (a: A) => B, c: (b: B) => C, d: (c: C) => D): D;
    <A, B, C, D, E>(a: A, b: (a: A) => B, c: (b: B) => C, d: (c: C) => D, e: (d: D) => E): E;
    <A, B, C, D, E, F>(a: A, b: (a: A) => B, c: (b: B) => C, d: (c: C) => D, e: (d: D) => E, f: (e: E) => F): F;
    <A, B, C, D, E, F, G>(a: A, b: (a: A) => B, c: (b: B) => C, d: (c: C) => D, e: (d: D) => E, f: (e: E) => F, g: (f: F) => G): G;
};

declare type Result<X, Value> = Ok<Value> | Err<X>;
declare type Ok<A> = {
    readonly tag: "Ok";
    readonly value: A;
};
declare type Err<X> = {
    readonly tag: "Err";
    readonly error: X;
};
declare const Ok: <X, A>(value: A) => Result<X, A>;
declare const Err: <X, A>(error: X) => Result<X, A>;
declare const Result: Readonly<{
    /**
     * Apply a function to a result. If the result is Ok, it will be converted. If the result is an Err, the same error value will propagate through.
     */
    map: <X, A, B>(mapper: (a: A) => B) => (resultA: Result<X, A>) => Result<X, B>;
    /**
     * Transform an Err value.
     */
    mapError: <X, Y, A>(mapper: (a: X) => Y) => (resultA: Result<X, A>) => Result<Y, A>;
}>;

declare const taskTag: unique symbol;
declare type Task<X, A> = {
    readonly tag: typeof taskTag;
    readonly [taskTag]: () => PromiseLike<Result<X, A>>;
};
declare const Task: Readonly<{
    reasonToError: (reason: unknown) => Error;
    attempt: <X, A>(callback: (result: Result<X, A>) => void) => (task: Task<X, A>) => PromiseLike<never>;
    fromPromise: <X, A>(promiseLazy: () => PromiseLike<A>, onrejected: (reason: unknown) => X) => Task<X, A>;
    fromCallback: <I, X, A>(fun: (input: I, callback: (e: X, r?: A | undefined) => void) => void) => (input: I) => Task<X, A>;
    fromMaybe: <X>(errorWhenNothing: X) => <A>(maybe: Maybe<A>) => Task<X, A>;
    map: <X, A, B>(mapper: (a: A) => B) => (taskA: Task<X, A>) => Task<X, B>;
    succeed: <A, X = never>(a: A) => Task<X, A>;
    fail: <X, A = never>(error: X) => Task<X, A>;
    andThen: <X, A, B>(callback: (a: A) => Task<X, B>) => (taskA: Task<X, A>) => Task<X, B>;
    now: () => Task<never, Date>;
    sleep: (inMillis: number) => Task<never, number>;
}>;

export { ArrayHelp, Comparable, Debug, Err, Just, Maybe, Nothing, Ok, Result, Task, always, alwaysNever, alwaysVoid, compose, dot, flip, identity, pipe };

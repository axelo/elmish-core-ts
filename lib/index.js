'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const fromNullable = (nullable) => nullable === null || nullable === undefined ? Nothing : Just(nullable);
const fromFptsEither = (either) => either._tag === "Left" ? Nothing : Just(either.value);
const fromFptsOption = (option) => option._tag === "None" ? Nothing : Just(option.value);
const isNothing = (maybe) => maybe.tag === "Nothing";
const withDefault = (a) => (maybe) => isNothing(maybe) ? a : maybe.value;
const map = (mapper) => (maybeA) => isNothing(maybeA) ? Nothing : Just(mapper(maybeA.value));
const map2 = (mapper) => (maybeA) => (maybeB) => isNothing(maybeA) || isNothing(maybeB)
    ? Nothing
    : Just(mapper(maybeA.value)(maybeB.value));
const andThen = (callback) => (maybeA) => isNothing(maybeA)
    ? Nothing
    : callback(maybeA.value);
const Just = (a) => ({ tag: "Just", value: a });
const Nothing = Object.freeze({
    tag: "Nothing"
});
const Maybe = Object.freeze({
    fromNullable,
    fromFptsEither,
    fromFptsOption,
    isNothing,
    withDefault,
    map,
    map2,
    andThen
});

const concat = (nested) => [].concat(...nested);
const filter = (predicate) => (as) => as.filter(predicate);
const map$1 = (mapper) => (as) => as.map(mapper);
const findLast = (predicate) => (as) => {
    for (let i = as.length - 1; i >= 0; --i) {
        const a = as[i];
        if (predicate(a)) {
            return Just(a);
        }
    }
    return Nothing;
};
const sortBy = (compareBy) => (as) => as.slice().sort((a, b) => compareBy(a) - compareBy(b));
const head = (as) => as.length === 0 ? Nothing : Just(as[0]);
const ArrayHelp = Object.freeze({
    concat,
    filter,
    map: map$1,
    findLast,
    sortBy,
    head
});

const date = d => d.valueOf();
const Comparable = Object.freeze({
    date
});

const log = (message) => (a) => {
    message.length > 0 ? console.log(message, a) : console.log(a);
    return a;
};
const Debug = Object.freeze({
    log
});

const stepFun = (prevRetVal, fun) => fun(prevRetVal);
const identity = (a) => a;
const always = (a) => () => a;
const alwaysVoid = (_ignored) => { };
const alwaysNever = alwaysVoid;
const flip = (f) => b => a => f(a)(b);
const dot = (key) => (record) => record[key];
const compose = (...funs) => a => funs.reduce(stepFun, a);
const pipe = (a, ...funs) => funs.reduce(stepFun, a);

const Ok = (value) => ({
    tag: "Ok",
    value
});
const Err = (error) => ({
    tag: "Err",
    error
});
const map$2 = (mapper) => (resultA) => resultA.tag === "Err" ? resultA : Ok(mapper(resultA.value));
const mapError = (mapper) => (resultA) => resultA.tag === "Ok" ? resultA : Err(mapper(resultA.error));
const Result = Object.freeze({
    map: map$2,
    mapError
});

const taskTag = Symbol("task");
const reasonToError = (reason) => reason instanceof Error
    ? reason
    : typeof reason === "string"
        ? new Error(reason)
        : reason === undefined
            ? new Error()
            : new Error(String(reason));
const fromPromise = (promiseLazy, onrejected) => ({
    tag: taskTag,
    [taskTag]: () => Promise.resolve()
        .then(promiseLazy)
        .then(value => Ok(value), reason => Err(onrejected(reason)))
});
const fromCallback = (fun) => input => {
    const cbPromise = new Promise(resolve => {
        fun(input, (err, value) => {
            err !== null || err !== undefined
                ? resolve(Err(err))
                : resolve(Ok(value));
        });
    });
    return {
        tag: taskTag,
        [taskTag]: () => cbPromise
    };
};
const fromMaybe = (errorWhenNothing) => (maybe) => Maybe.isNothing(maybe) ? fail(errorWhenNothing) : succeed(maybe.value);
const succeed = (a) => ({
    tag: taskTag,
    [taskTag]: () => Promise.resolve(Ok(a))
});
const fail = (error) => ({
    tag: taskTag,
    [taskTag]: () => Promise.resolve(Err(error))
});
const map$3 = (mapper) => (taskA) => ({
    tag: taskTag,
    [taskTag]: () => taskA[taskTag]().then(Result.map(mapper))
});
const andThen$1 = (callback) => (taskA) => ({
    tag: taskTag,
    [taskTag]: () => taskA[taskTag]().then((result) => (result.tag === "Err"
        ? fail(result.error)
        : callback(result.value))[taskTag]())
});
const attempt = (callback) => (task) => task[taskTag]()
    .then(callback)
    .then(alwaysVoid, () => {
    console.error("Should not have been called");
});
const sleep = (inMillis) => fromPromise(() => new Promise(resolve => setTimeout(resolve, inMillis)), alwaysNever);
const Task = Object.freeze({
    reasonToError,
    attempt,
    fromPromise,
    fromCallback,
    fromMaybe,
    map: map$3,
    succeed,
    fail,
    andThen: andThen$1,
    sleep
});

exports.ArrayHelp = ArrayHelp;
exports.Comparable = Comparable;
exports.Debug = Debug;
exports.Err = Err;
exports.Just = Just;
exports.Maybe = Maybe;
exports.Nothing = Nothing;
exports.Ok = Ok;
exports.Result = Result;
exports.Task = Task;
exports.always = always;
exports.alwaysNever = alwaysNever;
exports.alwaysVoid = alwaysVoid;
exports.compose = compose;
exports.dot = dot;
exports.flip = flip;
exports.identity = identity;
exports.pipe = pipe;

import { Result, Ok, Err } from "@marionebl/result";

export interface Some<Payload> {
  /**
   * Returns true if the option is a `Some` value.
   *
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const some = Option.Some(2);
   * assert.strictEqual(some.isSome(), true);
   *
   * const none = Option.None();
   * assert.strictEqual(some.isNone(), false);
   * ```
   */
  isSome(): true;

  /**
   * Returns true if the option is a `None` value.
   *
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const some = Option.Some(2);
   * assert.strictEqual(some.isNone(), false);
   *
   * const none = Option.None();
   * assert.strictEqual(some.isNone(), true);
   * ```
   */
  isNone(): false;

  /**
   * Unwraps an option, yielding the content of a `Some`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const some = Option.Some(2);
   * assert.strictEqual(some.expect("something bad"), 2);
   *
   * const none = Option.None();
   * assert.throws(() => none.expect("something bad"), new Error("something bad"));
   * ```
   * 
   * @throws Throws if the value is a `None` with a custom error message provided by {message}.
   */
  expect(message: string): Payload;

  /**
   * Unwraps an option, yielding the content of a `Some`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const some = Option.Some(2);
   * assert.strictEqual(some.unwrap(), 2);
   *
   * const none = Option.None();
   * assert.throws(() => none.unwrap());
   * ```
   * 
   * @throws Throws if the value is a `None`
   */
  unwrap(): Payload;

  /**
   * Returns the contained value or a `fallback`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const some = Option.Some(1);
   * assert.strictEqual(some.unwrapOr(2), 1);
   *
   * const none = Option.None();
   * assert.strictEqual(none.unwrapOr(2), 2);
   * ```
   */
  unwrapOr<Fallback>(fallback: Fallback): Payload | Fallback;

  /**
   * Returns the contained value or computes it from a closure.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const some = Option.Some(1);
   * assert.strictEqual(some.unwrapOrElse(() => 2), 1);
   *
   * const none = Option.None();
   * assert.strictEqual(none.unwrapOr(() => 2), 2);
   * ```
   */
  unwrapOrElse<Fallback>(fallback: () => Fallback): Payload | Fallback;

  /**
   * Maps an Option<P> to Option<T> by applying a function `(p: P) => T` to a contained value `p`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const someString = Option.Some("Hello, World!");
   * const someLength = someString.map((s) => s.length);
   *
   * assert.strictEqual(someLength.unwrap(), 13);
   * 
   * const none = Option.None()
   * const maybe = someString.map((s) => s.length);
   * 
   * assert.strictEqual(maybe.isNone(), true);
   * assert.throws(() => maybe.unwrap());
   * ```
   */
  map<T>(fn: (self: Payload) => T): Option<T>;


  /**
   * Applies a function `(p: P) => T` to the contained value `p` (if any), or returns the provided fallback (if not).
   * 
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const someString = Option.Some("Thing");
   * const someLength = someString.mapOr((s) => s.length, 42);
   *
   * assert.strictEqual(someLength.unwrap(), 5);
   * 
   * const none = Option.None();
   * const maybe = someString.mapOr((s) => s.length, 42);
   * 
   * assert.strictEqual(someLength.isSome(), true);
   * assert.strictEqual(someLength.unwrap(), 42);
   * ```
   */
  mapOr<V, T>(fallback: V, fn: (payload: Payload) => T): T;

  /**
   * Applies a function `(p: P) => T` to the contained value `p` (if any), or computes a fallback via a function `() => V` (if not).
   * 
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const someString = Option.Some("Thing");
   * const someLength = someString.mapOr((s) => s.length, () => 42);
   *
   * assert.strictEqual(someLength.unwrap(), 5);
   * 
   * const none = Option.None();
   * const maybe = someString.mapOr((s) => s.length, () => 42);
   * 
   * assert.strictEqual(someLength.isSome(), true);
   * assert.strictEqual(someLength.unwrap(), 42);
   * ```
   */
  mapOrElse<V, T>(fallback: () => V, fn: (payload: Payload) => T): T;

  /**
   * Transforms the `Option<Payload>` into a `Result<Payload, Error>`, mapping `Some(Payload)` to `Ok(Payload)` and `None` to `Err(err)`.
   * 
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * import { Result } from '@marionebl/result';
   *
   * const some = Option.Some("Thing");
   * const ok = some.okOr("Something went wrong");
   *
   * assert.deepStrictEqual(ok, Result.Ok("Thing"));
   * 
   * const none = Option.None();
   * const err = some.okOr("Something went wrong");
   * 
   * assert.deepStrictEqual(err, Result.Err(new Error("Something went wrong")));
   * ```
   */
  okOr(message: string): Ok<Payload>;

  /**
   * Transforms the `Option<Payload>` into a `Result<Payload, Error>`, mapping `Some(Payload)` to `Ok(Payload)` and `None` to `Err(err)`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * import { Result } from '@marionebl/result';
   *
   * const some = Option.Some("Thing");
   * const ok = some.okOrElse(() => "Something went wrong");
   *
   * assert.deepStrictEqual(ok, Result.Ok("Thing"));
   * 
   * const none = Option.None();
   * const err = some.okOrElse(() => "Something went wrong");
   * 
   * assert.deepStrictEqual(err, Result.Err(new Error("Something went wrong")));
   * ```
   */
  okOrElse(fn: () => string | [string, any]): Ok<Payload>;

  /**
   * Returns `None` if the option is `None`, otherwise returns `b`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * {
   *  const some = Option.Some("Thing");
   *  const none = Option.None();
   *  assert.deepStrictEqual(some.and(none), Option.None());
   * }
   *
   * {
   *  const none = Option.None();
   *  const some = Option.Some("Thing");
   *  assert.deepStrictEqual(none.and(some), Option.None());
   * }
   * 
   * {
   *  const a = Option.Some("a");
   *  const b = Option.Some("b");
   *  assert.deepStrictEqual(a.and(b), b);
   * }
   * ```
   */
  and(b: None): None;
  and<T extends Some<V>, V>(b: T): T;
  and<T extends Option<V>, V>(b: T): T | None;

  /**
   * Returns `None` if the option is `None`, otherwise calls `fn: (p: Payload) => T` with the wrapped value `p` and returns the result `T`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * const square = (input: number) => Option.Some(input * input);
   * const nope = (_: unknown) => Option.None();
   *
   * const a = Some(2)
   *  .andThen(square)
   *  .andThen(square);
   *
   * assert.deepStrictEqual(a, Option.Some(16));
   * 
   * const b = Some(2)
   *  .andThen(square)
   *  .andThen(nope);
   *
   * assert.deepStrictEqual(b, None);
   * 
   * const c = Some(2)
   *  .andThen(nope)
   *  .andThen(square);
   *
   * assert.deepStrictEqual(c, None);
   * 
   * const d = None()
   *  .andThen(square)
   *  .andThen(square);
   *
   * assert.deepStrictEqual(d, None);
   * ```
   */
  andThen(fn: (p: Payload) => None): None;
  andThen<T extends Some<V>, V>(fn: (p: Payload) => T): T;
  andThen<T extends Option<V>, V>(fn: (p: Payload) => T): T;

  /**
   * Returns None if the option is None, otherwise calls predicate with the wrapped value and returns:
   * 
   * * Some(t) if predicate returns true (where t is the wrapped value), and
   * * None if predicate returns false.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * const isEven = (input: number) => input % 2 === 0;
   *
   * assert.deepStrictEqual(Option.None().map(isEven), Option.None);
   * assert.deepStrictEqual(Option.Some(3).map(isEven), Option.None);
   * assert.deepStrictEqual(Option.Some(4).map(isEven), Option.Some(4));
   * ```
   */
  filter(fn: (payload: Payload) => boolean): Option<Payload>;

  /**
   * Returns the option if it contains a value, otherwise returns `b`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * {
   *   const some = Option.Some(2);
   *   const none = Option.None();
   *   assert.deepStrictEqual(some.or(none), Option.Some(2));
   * }
   * 
   * {
   *   const none = Option.None();
   *   const some = Option.Some(2);
   *   assert.deepStrictEqual(none.or(some), Option.Some(2));
   * }
   * 
   * {
   *   const a = Option.Some(100);
   *   const b = Option.Some(2);
   *   assert.deepStrictEqual(a.or(b), a);
   * }
   * 
   * {
   *   const a = Option.None();
   *   const b = Option.None();
   *   assert.deepStrictEqual(a.or(b), Option.None());
   * }
   * ```
   */
  or<T extends Option<V>, V>(b: T): this;

  /**
   * Returns the option if it contains a value, otherwise calls `fn` and returns the result.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * {
   *   const some = Option.Some(2);
   *   const none = Option.None();
   *   assert.deepStrictEqual(some.orElse(() => none), Option.Some(2));
   * }
   * 
   * {
   *   const none = Option.None();
   *   const some = Option.Some(2);
   *   assert.deepStrictEqual(none.orElse(() => some), Option.Some(2));
   * }
   * 
   * {
   *   const a = Option.Some(100);
   *   const b = Option.Some(2);
   *   assert.deepStrictEqual(a.orElse(() => b), a);
   * }
   * 
   * {
   *   const a = Option.None();
   *   const b = Option.None();
   *   assert.deepStrictEqual(a.orElse(() => b), Option.None());
   * }
   * ```
   */
  orElse<T extends Option<V>, V>(fn: () => T): this;

  /**
   * Returns `Some` if exactly one of `this` or `b` is `Some`, otherwise returns `None`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * {
   *   const some = Option.Some(2);
   *   const none = Option.None();
   *   assert.deepStrictEqual(some.xor(none), Option.Some(2));
   * }
   * 
   * {
   *   const none = Option.None();
   *   const some = Option.Some(2);
   *   assert.deepStrictEqual(none.xor(some, Option.Some(2));
   * }
   * 
   * {
   *   const a = Option.Some(100);
   *   const b = Option.Some(2);
   *   assert.deepStrictEqual(a.xor(b), Option.None());
   * }
   * 
   * {
   *   const a = Option.None();
   *   const b = Option.None();
   *   assert.deepStrictEqual(a.xor(b), Option.None());
   * }
   * ```
   */
  xor(b: None): this;
  xor<T extends Some<V>, V>(b: T): None;
  xor<T extends Option<V>, V>(b: T): this | T;

  /**
   * Inserts `payload` into the option if it is `None`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * const some = Option.Some(2);
   * const none = Option.None();
   * 
   * const got = some.getOrInsert(5);
   * const inserted = none.getOrInsert(5);
   * 
   * assert.deepStrictEqual(got, some);
   * assert.deepStrictEqual(got, Option.Some(5));
   * ```
   */
  getOrInsert(payload: Payload): this;

  /**
   * Inserts a value computed from `fn` into the option if it is `None`
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * const some = Option.Some(2);
   * const none = Option.None();
   * 
   * const got = some.getOrInsert(() => 5);
   * const inserted = none.getOrInsert(() => 5);
   * 
   * assert.deepStrictEqual(got, some);
   * assert.deepStrictEqual(got, Option.Some(5));
   * ```
   */
  getOrInsertWith(fn: () => Payload): this;

  /**
   * Takes the value out of the option, leaving a `None` in its place.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * const a = Option.Some(2);
   * const b = a.take();
   * 
   * assert.deepStrictEqual(a, Option.None());
   * assert.deepStrictEqual(b, Option.Some(2));
   * ```
   */
  take(): Some<Payload>;


  /**
   * Replaces the actual value in the option by the value given in parameter, 
   * returning the old value if present, leaving a `Some` in its place.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * const a = Option.Some(2);
   * const b = a.replace(5);
   * 
   * assert.deepStrictEqual(a, Option.Some(2));
   * assert.deepStrictEqual(b, Option.Some(5));
   * ```
   */
  replace(payload: Payload): Some<Payload>;

  /**
   * Transposes an `Option` of a `Result` into `Result` of an `Option`.
   * 
   * `None` will be mapped to `Ok(None)`. `Some(Ok(_))` and `Some(Err(_))` will be mapped to `Ok(Some(_))` and `Err(_)`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * import { Result } from '@marionebl/result';
   * 
   * const ok = Result.Ok(Option.Some(2));
   * const some = Option.Some(Result.Ok(2));
   * 
   * assert.deepStrictEqual(ok, some.transpose());
   * ```
   */
  transpose(): Promise<Result<Some<Payload>, unknown>>;
}

export interface None {
  /**
   * Returns true if the option is a `Some` value.
   *
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const some = Option.Some(2);
   * assert.strictEqual(some.isSome(), true);
   *
   * const none = Option.None();
   * assert.strictEqual(some.isNone(), false);
   * ```
   */
  isSome(): false;

  /**
   * Returns true if the option is a `None` value.
   *
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const some = Option.Some(2);
   * assert.strictEqual(some.isNone(), false);
   *
   * const none = Option.None();
   * assert.strictEqual(some.isNone(), true);
   * ```
   */
  isNone(): true;

  /**
   * Unwraps an option, yielding the content of a `Some`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const some = Option.Some(2);
   * assert.strictEqual(some.expect("something bad"), 2);
   *
   * const none = Option.None();
   * assert.throws(() => none.expect("something bad"), new Error("something bad"));
   * ```
   * 
   * @throws Throws if the value is a `None` with a custom error message provided by message.
   */
  expect(message: string): any;

  /**
   * Unwraps an option, yielding the content of a `Some`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const some = Option.Some(2);
   * assert.strictEqual(some.unwrap(), 2);
   *
   * const none = Option.None();
   * assert.throws(() => none.unwrap());
   * ```
   * 
   * @throws Throws if the value is a `None`
   */
  unwrap(): any;

  /**
   * Returns the contained value or a `fallback`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const some = Option.Some(1);
   * assert.strictEqual(some.unwrapOr(2), 1);
   *
   * const none = Option.None();
   * assert.strictEqual(none.unwrapOr(2), 2);
   * ```
   */
  unwrapOr<Fallback>(fallback: Fallback): Fallback;


  /**
   * Returns the contained value or computes it from a closure.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const some = Option.Some(1);
   * assert.strictEqual(some.unwrapOrElse(() => 2), 1);
   *
   * const none = Option.None();
   * assert.strictEqual(none.unwrapOr(() => 2), 2);
   * ```
   */
  unwrapOrElse<Fallback>(fallback: () => Fallback): Fallback;

  /**
   * Maps an Option<P> to Option<T> by applying a function `(p: P) => T` to a contained value `p`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const someString = Option.Some("Hello, World!");
   * const someLength = someString.map((s) => s.length);
   *
   * assert.strictEqual(someLength.unwrap(), 13);
   * 
   * const none = Option.None()
   * const maybe = someString.map((s) => s.length);
   * 
   * assert.strictEqual(maybe.isNone(), true);
   * assert.throws(() => maybe.unwrap());
   * ```
   */
  map<T>(fn: (self: any) => T): None;

  /**
   * Applies a function `(p: P) => T` to the contained value `p` (if any), or returns the provided fallback (if not).
   * 
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const someString = Option.Some("Thing");
   * const someLength = someString.mapOr((s) => s.length, 42);
   *
   * assert.strictEqual(someLength.unwrap(), 5);
   * 
   * const none = Option.None();
   * const maybe = someString.mapOr((s) => s.length, 42);
   * 
   * assert.strictEqual(someLength.isSome(), true);
   * assert.strictEqual(someLength.unwrap(), 42);
   * ```
   */
  mapOr<V, T>(fallback: V, fn: (payload: any) => T): V;

  /**
   * Applies a function `(p: P) => T` to the contained value `p` (if any), or computes a fallback via a function `() => V` (if not).
   * 
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const someString = Option.Some("Thing");
   * const someLength = someString.mapOr((s) => s.length, () => 42);
   *
   * assert.strictEqual(someLength.unwrap(), 5);
   * 
   * const none = Option.None();
   * const maybe = someString.mapOr((s) => s.length, () => 42);
   * 
   * assert.strictEqual(someLength.isSome(), true);
   * assert.strictEqual(someLength.unwrap(), 42);
   * ```
   */
  mapOrElse<V, T>(fallback: () => V, fn: (payload: any) => T): V;

  /**
   * Transforms the `Option<Payload>` into a `Result<Payload, Error>`, mapping `Some(Payload)` to `Ok(Payload)` and `None` to `Err(err)`.
   * 
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * import { Result } from '@marionebl/result';
   *
   * const some = Option.Some("Thing");
   * const ok = some.okOr("Something went wrong");
   *
   * assert.deepStrictEqual(ok, Result.Ok("Thing"));
   * 
   * const none = Option.None();
   * const err = some.okOr("Something went wrong");
   * 
   * assert.deepStrictEqual(err, Result.Err(new Error("Something went wrong")));
   * ```
   */
  okOr<C = unknown>(message: string, code?: C): Err<C>;

  /**
   * Transforms the `Option<Payload>` into a `Result<Payload, Error>`, mapping `Some(Payload)` to `Ok(Payload)` and `None` to `Err(err)`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * import { Result } from '@marionebl/result';
   *
   * const some = Option.Some("Thing");
   * const ok = some.okOrElse(() => "Something went wrong");
   *
   * assert.deepStrictEqual(ok, Result.Ok("Thing"));
   * 
   * const none = Option.None();
   * const err = some.okOrElse(() => "Something went wrong");
   * 
   * assert.deepStrictEqual(err, Result.Err(new Error("Something went wrong")));
   * ```
   */
  okOrElse<C = unknown>(fn: () => string | [string, C]): Err<C>;

  /**
   * Returns `None` if the option is `None`, otherwise returns `b`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * {
   *  const some = Option.Some("Thing");
   *  const none = Option.None();
   *  assert.deepStrictEqual(some.and(none), Option.None());
   * }
   *
   * {
   *  const none = Option.None();
   *  const some = Option.Some("Thing");
   *  assert.deepStrictEqual(none.and(some), Option.None());
   * }
   * 
   * {
   *  const a = Option.Some("a");
   *  const b = Option.Some("b");
   *  assert.deepStrictEqual(a.and(b), b);
   * }
   * ```
   */
  and<T extends Option<V>, V>(b: T): None;

  /**
   * Returns `None` if the option is `None`, otherwise calls `fn: (p: Payload) => T` with the wrapped value `p` and returns the result `T`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * const square = (input: number) => Option.Some(input * input);
   * const nope = (_: unknown) => Option.None();
   *
   * const a = Some(2)
   *  .andThen(square)
   *  .andThen(square);
   *
   * assert.deepStrictEqual(a, Option.Some(16));
   * 
   * const b = Some(2)
   *  .andThen(square)
   *  .andThen(nope);
   *
   * assert.deepStrictEqual(b, None);
   * 
   * const c = Some(2)
   *  .andThen(nope)
   *  .andThen(square);
   *
   * assert.deepStrictEqual(c, None);
   * 
   * const d = None()
   *  .andThen(square)
   *  .andThen(square);
   *
   * assert.deepStrictEqual(d, None);
   * ```
   */
  andThen<T extends Option<V>, V>(fn: (p: any) => T): None;

  /**
   * Returns None if the option is None, otherwise calls predicate with the wrapped value and returns:
   * 
   * * Some(t) if predicate returns true (where t is the wrapped value), and
   * * None if predicate returns false.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * const isEven = (input: number) => input % 2 === 0;
   *
   * assert.deepStrictEqual(Option.None().map(isEven), Option.None);
   * assert.deepStrictEqual(Option.Some(3).map(isEven), Option.None);
   * assert.deepStrictEqual(Option.Some(4).map(isEven), Option.Some(4));
   * ```
   */
  filter(fn: (payload: any) => boolean): None;

  /**
   * Returns the option if it contains a value, otherwise returns `b`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * {
   *   const some = Option.Some(2);
   *   const none = Option.None();
   *   assert.deepStrictEqual(some.or(none), Option.Some(2));
   * }
   * 
   * {
   *   const none = Option.None();
   *   const some = Option.Some(2);
   *   assert.deepStrictEqual(none.or(some), Option.Some(2));
   * }
   * 
   * {
   *   const a = Option.Some(100);
   *   const b = Option.Some(2);
   *   assert.deepStrictEqual(a.or(b), a);
   * }
   * 
   * {
   *   const a = Option.None();
   *   const b = Option.None();
   *   assert.deepStrictEqual(a.or(b), Option.None());
   * }
   * ```
   */
  or<T extends Option<V>, V>(b: T): T;

  /**
   * Returns the option if it contains a value, otherwise calls `fn` and returns the result.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * {
   *   const some = Option.Some(2);
   *   const none = Option.None();
   *   assert.deepStrictEqual(some.orElse(() => none), Option.Some(2));
   * }
   * 
   * {
   *   const none = Option.None();
   *   const some = Option.Some(2);
   *   assert.deepStrictEqual(none.orElse(() => some), Option.Some(2));
   * }
   * 
   * {
   *   const a = Option.Some(100);
   *   const b = Option.Some(2);
   *   assert.deepStrictEqual(a.orElse(() => b), a);
   * }
   * 
   * {
   *   const a = Option.None();
   *   const b = Option.None();
   *   assert.deepStrictEqual(a.orElse(() => b), Option.None());
   * }
   * ```
   */
  orElse<T extends Option<V>, V>(fn: () => T): T;

  /**
   * Returns `Some` if exactly one of `this` or `b` is `Some`, otherwise returns `None`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * {
   *   const some = Option.Some(2);
   *   const none = Option.None();
   *   assert.deepStrictEqual(some.xor(none), Option.Some(2));
   * }
   * 
   * {
   *   const none = Option.None();
   *   const some = Option.Some(2);
   *   assert.deepStrictEqual(none.xor(some, Option.Some(2));
   * }
   * 
   * {
   *   const a = Option.Some(100);
   *   const b = Option.Some(2);
   *   assert.deepStrictEqual(a.xor(b), Option.None());
   * }
   * 
   * {
   *   const a = Option.None();
   *   const b = Option.None();
   *   assert.deepStrictEqual(a.xor(b), Option.None());
   * }
   * ```
   */
  xor(b: None): this;
  xor<T extends Some<V>, V>(b: T): T;
  xor<T extends Option<V>, V>(b: T): this;

  /**
   * Inserts `payload` into the option if it is `None`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * const some = Option.Some(2);
   * const none = Option.None();
   * 
   * const got = some.getOrInsert(5);
   * const inserted = none.getOrInsert(5);
   * 
   * assert.deepStrictEqual(got, some);
   * assert.deepStrictEqual(got, Option.Some(5));
   * ```
   */
  getOrInsert<T>(payload: T): Some<T>;

  /**
   * Inserts a value computed from `fn` into the option if it is `None`
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * const some = Option.Some(2);
   * const none = Option.None();
   * 
   * const got = some.getOrInsert(() => 5);
   * const inserted = none.getOrInsert(() => 5);
   * 
   * assert.deepStrictEqual(got, some);
   * assert.deepStrictEqual(got, Option.Some(5));
   * ```
   */
  getOrInsertWith<T>(fn: () => T): Some<T>;

  /**
   * Takes the value out of the option, leaving a `None` in its place.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * const a = Option.Some(2);
   * const b = a.take();
   * 
   * assert.deepStrictEqual(a, Option.None());
   * assert.deepStrictEqual(b, Option.Some(2));
   * ```
   */
  take(): None;

  /**
   * Replaces the actual value in the option by the value given in parameter, 
   * returning the old value if present, leaving a `Some` in its place.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * const a = Option.Some(2);
   * const b = a.replace(5);
   * 
   * assert.deepStrictEqual(a, Option.Some(2));
   * assert.deepStrictEqual(b, Option.Some(5));
   * ```
   */
  replace<T>(p: T): Some<T>;

  /**
   * Transposes an `Option` of a `Result` into `Result` of an `Option`.
   * 
   * `None` will be mapped to `Ok(None)`. `Some(Ok(_))` and `Some(Err(_))` will be mapped to `Ok(Some(_))` and `Err(_)`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * import { Result } from '@marionebl/result';
   * 
   * const ok = Result.Ok(Option.Some(2));
   * const some = Option.Some(Result.Ok(2));
   * 
   * assert.deepStrictEqual(ok, some.transpose());
   * ```
   */
  transpose(): Promise<Result<None, unknown>>;
}

export class Option<Payload> {
  private payload?: Payload;

  private constructor({ payload }: { payload?: Payload }) {
    this.payload = payload;
  }

  /**
   * Create a new Option from `unknown` input
   *
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const some = Option.from(2);
   * assert.strictEqual(some.isSome(), true);
   * assert.strictEqual(some.unwrap(), 2);
   *
   * const none = Option.from(undefined);
   * assert.strictEqual(some.isNone(), true);
   * ```
   */
  static from<Payload>(payload?: Payload): Option<Payload> {
    return new Option({ payload });
  }

  /**
   * Create a `Some` value Option
   *
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const some = Option.Some(2);
   * assert.strictEqual(some.isSome(), true);
   * assert.strictEqual(some.unwrap(), 2);
   * ```
   */
  static Some<Payload>(payload: Payload): Some<Payload> {
    return new Option({ payload }) as Some<Payload>;
  }

  /**
   * Create a `None` value Option
   *
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const none = Option.from(undefined);
   * assert.strictEqual(some.isNone(), true);
   * ```
   */
  static None(): None {
    return new Option({ payload: undefined }) as None;
  }

  /**
   * Returns true if the option is a `Some` value.
   *
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const some = Option.Some(2);
   * assert.strictEqual(some.isSome(), true);
   *
   * const none = Option.None();
   * assert.strictEqual(some.isNone(), false);
   * ```
   */
  public isSome(): this is Some<Payload> {
    return typeof this.payload !== "undefined";
  }

  /**
   * Returns true if the option is a `None` value.
   *
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const some = Option.Some(2);
   * assert.strictEqual(some.isNone(), false);
   *
   * const none = Option.None();
   * assert.strictEqual(some.isNone(), true);
   * ```
   */
  public isNone(): this is None {
    return typeof this.payload === "undefined";
  }

  /**
   * Unwraps an option, yielding the content of a `Some`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const some = Option.Some(2);
   * assert.strictEqual(some.expect("something bad"), 2);
   *
   * const none = Option.None();
   * assert.throws(() => none.expect("something bad"), new Error("something bad"));
   * ```
   * 
   * @throws Throws if the value is a `None` with a custom error message provided by {message}.
   */
  public expect(message: string): Payload {
    if (typeof this.payload === "undefined") {
      throw new Error(message);
    }

    return this.payload;
  }

  /**
   * Unwraps an option, yielding the content of a `Some`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const some = Option.Some(2);
   * assert.strictEqual(some.unwrap(), 2);
   *
   * const none = Option.None();
   * assert.throws(() => none.unwrap());
   * ```
   * 
   * @throws Throws if the value is a `None`
   */
  public unwrap(): Payload {
    if (typeof this.payload === "undefined") {
      throw new Error("unwrap: Expected Some(), was None()");
    }

    return this.payload;
  }

  /**
   * Returns the contained value or a `fallback`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const some = Option.Some(1);
   * assert.strictEqual(some.unwrapOr(2), 1);
   *
   * const none = Option.None();
   * assert.strictEqual(none.unwrapOr(2), 2);
   * ```
   */
  public unwrapOr<T>(fallback: T): Payload | T {
    if (typeof this.payload === "undefined") {
      return fallback;
    }

    return this.payload;
  }


  /**
   * Returns the contained value or computes it from a closure.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const some = Option.Some(1);
   * assert.strictEqual(some.unwrapOrElse(() => 2), 1);
   *
   * const none = Option.None();
   * assert.strictEqual(none.unwrapOr(() => 2), 2);
   * ```
   */
  public unwrapOrElse<T>(fn: () => T): Payload | T {
    if (typeof this.payload === "undefined") {
      return fn();
    }

    return this.payload;
  }

  /**
   * Maps an Option<P> to Option<T> by applying a function `(p: P) => T` to a contained value `p`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const someString = Option.Some("Hello, World!");
   * const someLength = someString.map((s) => s.length);
   *
   * assert.strictEqual(someLength.unwrap(), 13);
   * 
   * const none = Option.None()
   * const maybe = someString.map((s) => s.length);
   * 
   * assert.strictEqual(maybe.isNone(), true);
   * assert.throws(() => maybe.unwrap());
   * ```
   */
  public map<T>(fn: (self: Payload) => T): Option<T> {
    if (typeof this.payload === "undefined") {
      return this as None;
    }

    return Option.from(fn(this.payload));
  }

  /**
   * Applies a function `(p: P) => T` to the contained value `p` (if any), or returns the provided fallback (if not).
   * 
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const someString = Option.Some("Thing");
   * const someLength = someString.mapOr((s) => s.length, 42);
   *
   * assert.strictEqual(someLength.unwrap(), 5);
   * 
   * const none = Option.None();
   * const maybe = someString.mapOr((s) => s.length, 42);
   * 
   * assert.strictEqual(someLength.isSome(), true);
   * assert.strictEqual(someLength.unwrap(), 42);
   * ```
   */
  public mapOr<V, T>(fallback: V, fn: (payload: Payload) => T): V | T {
    if (typeof this.payload !== "undefined") {
      return fn(this.payload);
    }

    return fallback;
  }

  /**
   * Applies a function `(p: P) => T` to the contained value `p` (if any), or computes a fallback via a function `() => V` (if not).
   * 
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * const someString = Option.Some("Thing");
   * const someLength = someString.mapOr((s) => s.length, () => 42);
   *
   * assert.strictEqual(someLength.unwrap(), 5);
   * 
   * const none = Option.None();
   * const maybe = someString.mapOr((s) => s.length, () => 42);
   * 
   * assert.strictEqual(someLength.isSome(), true);
   * assert.strictEqual(someLength.unwrap(), 42);
   * ```
   */
  public mapOrElse<V, T>(
    fallback: () => V,
    fn: (payload: Payload) => T
  ): V | T {
    if (typeof this.payload !== "undefined") {
      return fn(this.payload);
    }

    return fallback();
  }

  /**
   * Transforms the `Option<Payload>` into a `Result<Payload, Error>`, mapping `Some(Payload)` to `Ok(Payload)` and `None` to `Err(err)`.
   * 
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * import { Result } from '@marionebl/result';
   *
   * const some = Option.Some("Thing");
   * const ok = some.okOr("Something went wrong");
   *
   * assert.deepStrictEqual(ok, Result.Ok("Thing"));
   * 
   * const none = Option.None();
   * const err = some.okOr("Something went wrong");
   * 
   * assert.deepStrictEqual(err, Result.Err(new Error("Something went wrong")));
   * ```
   */
  public okOr<C = unknown>(message: string, c?: C): Result<Payload, C> {
    if (typeof this.payload !== "undefined") {
      return Result.Ok(this.payload);
    }

    return Result.Err(message);
  }

  /**
   * Transforms the `Option<Payload>` into a `Result<Payload, Error>`, mapping `Some(Payload)` to `Ok(Payload)` and `None` to `Err(err)`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * import { Result } from '@marionebl/result';
   *
   * const some = Option.Some("Thing");
   * const ok = some.okOrElse(() => "Something went wrong");
   *
   * assert.deepStrictEqual(ok, Result.Ok("Thing"));
   * 
   * const none = Option.None();
   * const err = some.okOrElse(() => "Something went wrong");
   * 
   * assert.deepStrictEqual(err, Result.Err(new Error("Something went wrong")));
   * ```
   */
  public okOrElse<C>(fn: () => string | [string, C]): Result<Payload, C> {
    if (typeof this.payload !== "undefined") {
      return Result.Ok(this.payload);
    }

    const args = fn();
    return Array.isArray(args) ? Result.Err(...args) : Result.Err(args);
  }

  /**
   * Returns `None` if the option is `None`, otherwise returns `b`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   *
   * {
   *  const some = Option.Some("Thing");
   *  const none = Option.None();
   *  assert.deepStrictEqual(some.and(none), Option.None());
   * }
   *
   * {
   *  const none = Option.None();
   *  const some = Option.Some("Thing");
   *  assert.deepStrictEqual(none.and(some), Option.None());
   * }
   * 
   * {
   *  const a = Option.Some("a");
   *  const b = Option.Some("b");
   *  assert.deepStrictEqual(a.and(b), b);
   * }
   * ```
   */
  public and<T extends Option<V>, V>(b: T): T | None {
    if (this.isNone() || b.isNone()) {
      return Option.None();
    }

    return b;
  }

  /**
   * Returns `None` if the option is `None`, otherwise calls `fn: (p: Payload) => T` with the wrapped value `p` and returns the result `T`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * const square = (input: number) => Option.Some(input * input);
   * const nope = (_: unknown) => Option.None();
   *
   * const a = Some(2)
   *  .andThen(square)
   *  .andThen(square);
   *
   * assert.deepStrictEqual(a, Option.Some(16));
   * 
   * const b = Some(2)
   *  .andThen(square)
   *  .andThen(nope);
   *
   * assert.deepStrictEqual(b, None);
   * 
   * const c = Some(2)
   *  .andThen(nope)
   *  .andThen(square);
   *
   * assert.deepStrictEqual(c, None);
   * 
   * const d = None()
   *  .andThen(square)
   *  .andThen(square);
   *
   * assert.deepStrictEqual(d, None);
   * ```
   */
  public andThen<T extends Option<V>, V>(
    fn: (payload: Payload) => T
  ): T | None {
    if (this.isNone()) {
      return this;
    }

    return fn(this.payload!);
  }

  /**
   * Returns None if the option is None, otherwise calls predicate with the wrapped value and returns:
   * 
   * * Some(t) if predicate returns true (where t is the wrapped value), and
   * * None if predicate returns false.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * const isEven = (input: number) => input % 2 === 0;
   *
   * assert.deepStrictEqual(Option.None().map(isEven), Option.None);
   * assert.deepStrictEqual(Option.Some(3).map(isEven), Option.None);
   * assert.deepStrictEqual(Option.Some(4).map(isEven), Option.Some(4));
   * ```
   */
  public filter(fn: (payload: Payload) => boolean): Option<Payload> {
    if (this.isNone()) {
      return this;
    }

    if (fn(this.payload!)) {
      return Option.Some(this.payload!);
    } else {
      return Option.None();
    }
  }

  /**
   * Returns the option if it contains a value, otherwise returns `b`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * {
   *   const some = Option.Some(2);
   *   const none = Option.None();
   *   assert.deepStrictEqual(some.or(none), Option.Some(2));
   * }
   * 
   * {
   *   const none = Option.None();
   *   const some = Option.Some(2);
   *   assert.deepStrictEqual(none.or(some), Option.Some(2));
   * }
   * 
   * {
   *   const a = Option.Some(100);
   *   const b = Option.Some(2);
   *   assert.deepStrictEqual(a.or(b), a);
   * }
   * 
   * {
   *   const a = Option.None();
   *   const b = Option.None();
   *   assert.deepStrictEqual(a.or(b), Option.None());
   * }
   * ```
   */
  public or<T extends Option<V>, V>(b: T): this | T {
    if (this.isSome()) {
      return this;
    }

    return b;
  }

  /**
   * Returns the option if it contains a value, otherwise calls `fn` and returns the result.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * {
   *   const some = Option.Some(2);
   *   const none = Option.None();
   *   assert.deepStrictEqual(some.orElse(() => none), Option.Some(2));
   * }
   * 
   * {
   *   const none = Option.None();
   *   const some = Option.Some(2);
   *   assert.deepStrictEqual(none.orElse(() => some), Option.Some(2));
   * }
   * 
   * {
   *   const a = Option.Some(100);
   *   const b = Option.Some(2);
   *   assert.deepStrictEqual(a.orElse(() => b), a);
   * }
   * 
   * {
   *   const a = Option.None();
   *   const b = Option.None();
   *   assert.deepStrictEqual(a.orElse(() => b), Option.None());
   * }
   * ```
   */
  public orElse<T extends Option<V>, V>(fn: () => T): this | T {
    if (this.isSome()) {
      return this;
    }

    return fn();
  }

  /**
   * Returns `Some` if exactly one of `this` or `b` is `Some`, otherwise returns `None`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * {
   *   const some = Option.Some(2);
   *   const none = Option.None();
   *   assert.deepStrictEqual(some.xor(none), Option.Some(2));
   * }
   * 
   * {
   *   const none = Option.None();
   *   const some = Option.Some(2);
   *   assert.deepStrictEqual(none.xor(some, Option.Some(2));
   * }
   * 
   * {
   *   const a = Option.Some(100);
   *   const b = Option.Some(2);
   *   assert.deepStrictEqual(a.xor(b), Option.None());
   * }
   * 
   * {
   *   const a = Option.None();
   *   const b = Option.None();
   *   assert.deepStrictEqual(a.xor(b), Option.None());
   * }
   * ```
   */
  public xor<T extends Option<V>, V>(b: T): this | T | None {
    if (this.isSome() && b.isNone()) {
      return this;
    }

    if (this.isNone() && b.isSome()) {
      return b;
    }

    return Option.None();
  }

  /**
   * Inserts `payload` into the option if it is `None`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * const some = Option.Some(2);
   * const none = Option.None();
   * 
   * const got = some.getOrInsert(5);
   * const inserted = none.getOrInsert(5);
   * 
   * assert.deepStrictEqual(got, some);
   * assert.deepStrictEqual(got, Option.Some(5));
   * ```
   */
  public getOrInsert(payload: Payload): Some<Payload> {
    if (this.isSome()) {
      return this;
    }

    this.payload = payload;
    return this as Some<Payload>;
  }

  /**
   * Inserts a value computed from `fn` into the option if it is `None`
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * const some = Option.Some(2);
   * const none = Option.None();
   * 
   * const got = some.getOrInsert(() => 5);
   * const inserted = none.getOrInsert(() => 5);
   * 
   * assert.deepStrictEqual(got, some);
   * assert.deepStrictEqual(got, Option.Some(5));
   * ```
   */
  public getOrInsertWith(fn: () => Payload): Some<Payload> {
    if (this.isSome()) {
      return this;
    }

    this.payload = fn();
    return this as Some<Payload>;
  }

  /**
   * Takes the value out of the option, leaving a `None` in its place.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * const a = Option.Some(2);
   * const b = a.take();
   * 
   * assert.deepStrictEqual(a, Option.None());
   * assert.deepStrictEqual(b, Option.Some(2));
   * ```
   */
  public take(): Option<Payload> {
    const payload = this.payload;
    this.payload = undefined;

    return Option.from(payload);
  }

  /**
   * Replaces the actual value in the option by the value given in parameter, 
   * returning the old value if present, leaving a `Some` in its place.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * 
   * const a = Option.Some(2);
   * const b = a.replace(5);
   * 
   * assert.deepStrictEqual(a, Option.Some(2));
   * assert.deepStrictEqual(b, Option.Some(5));
   * ```
   */
  public replace(payload: Payload): Option<Payload> {
    const old = this.payload;
    this.payload = payload;

    return Option.from(old);
  }

  /**
   * Transposes an `Option` of a `Result` into `Result` of an `Option`.
   * 
   * `None` will be mapped to `Ok(None)`. `Some(Ok(_))` and `Some(Err(_))` will be mapped to `Ok(Some(_))` and `Err(_)`.
   * 
   * ```ts
   * import * as assert from 'assert';
   * import { Option } from '@marionebl/option';
   * import { Result } from '@marionebl/result';
   * 
   * const ok = Result.Ok(Option.Some(2));
   * const some = Option.Some(Result.Ok(2));
   * 
   * assert.deepStrictEqual(ok, some.transpose());
   * ```
   */
  public async transpose<C>(): Promise<Result<Option<Payload>, C>> {
    if (this.payload instanceof Result) {
      if (await this.payload.isErr()) {
        const err = await this.payload.unwrapErr();
        return Result.Err(err.message);
      }

      if (await this.payload.isOk()) {
        return Result.Ok(Option.from(await this.payload.unwrap()));
      }
    }

    return Result.Ok(Option.None());
  }
}

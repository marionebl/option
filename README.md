> Rust Options for JavaScript

# @marionebl/option

[![][ci-badge]][ci-url] [![][npm-badge]][npm-url]

* Implements full [Rust Options API](https://doc.rust-lang.org/std/option/enum.Option.html#methods)
* Narrow types for easy usage
* Extensive [documentation](#API)

---

## Named Constructors

* [.from](#from)
* [.None](#none)
* [.Some](#some)

## Methods

* [and](#and)
* [andThen](#andthen)
* [expect](#expect)
* [filter](#filter)
* [getOrInsert](#getorinsert)
* [getOrInsertWith](#getorinsertwith)
* [isNone](#isnone)
* [isSome](#issome)
* [map](#map)
* [mapOr](#mapor)
* [mapOrElse](#maporelse)
* [okOr](#okor)
* [okOrElse](#okorelse)
* [or](#or)
* [orElse](#orelse)
* [replace](#replace)
* [take](#take)
* [transpose](#transpose)
* [unwrap](#unwrap)
* [unwrapOr](#unwrapor)
* [unwrapOrElse](#unwraporelse)
* [xor](#xor)
* [None](#none)
* [Some](#some)
* [from](#from)

---

## Named Constructors

<a id="none"></a>

### None

▸ **None**(): [None](#none)

*Defined in [option.ts:1037](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1037)*

Create a `None` value Option

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

const none = Option.from(undefined);
assert.strictEqual(some.isNone(), true);
```

**Returns:** [None](#none)

___
<a id="some"></a>

### Some

▸ **Some**<`Payload`>(payload: *`Payload`*): [Some](#some)<`Payload`>

*Defined in [option.ts:1022](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1022)*

Create a `Some` value Option

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

const some = Option.Some(2);
assert.strictEqual(some.isSome(), true);
assert.strictEqual(some.unwrap(), 2);
```

**Type parameters:**

#### Payload 
**Parameters:**

| Name | Type |
| ------ | ------ |
| payload | `Payload` |

**Returns:** [Some](#some)<`Payload`>

___
<a id="from"></a>

### from

▸ **from**<`Payload`>(payload?: *[Payload]()*): [Option]()<`Payload`>

*Defined in [option.ts:1006](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1006)*

Create a new Option from `unknown` input

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

const some = Option.from(2);
assert.strictEqual(some.isSome(), true);
assert.strictEqual(some.unwrap(), 2);

const none = Option.from(undefined);
assert.strictEqual(some.isNone(), true);
```

**Type parameters:**

#### Payload 
**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` payload | [Payload]() |

**Returns:** [Option]()<`Payload`>

___

## Methods

<a id="and"></a>

###  and

▸ **and**<`T`,`V`>(b: *`T`*): `T` \| [None](#none)

*Defined in [option.ts:1337](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1337)*

Returns `None` if the option is `None`, otherwise returns `b`.

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

{
 const some = Option.Some("Thing");
 const none = Option.None();
 assert.deepStrictEqual(some.and(none), Option.None());
}

{
 const none = Option.None();
 const some = Option.Some("Thing");
 assert.deepStrictEqual(none.and(some), Option.None());
}

{
 const a = Option.Some("a");
 const b = Option.Some("b");
 assert.deepStrictEqual(a.and(b), b);
}
```

**Type parameters:**

#### T :  [Option]()<`V`>
#### V 
**Parameters:**

| Name | Type |
| ------ | ------ |
| b | `T` |

**Returns:** `T` \| [None](#none)

___
<a id="andthen"></a>

###  andThen

▸ **andThen**<`T`,`V`>(fn: *`function`*): `T` \| [None](#none)

*Defined in [option.ts:1380](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1380)*

Returns `None` if the option is `None`, otherwise calls `fn: (p: Payload) => T` with the wrapped value `p` and returns the result `T`.

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

const square = (input: number) => Option.Some(input * input);
const nope = (_: unknown) => Option.None();

const a = Some(2)
 .andThen(square)
 .andThen(square);

assert.deepStrictEqual(a, Option.Some(16));

const b = Some(2)
 .andThen(square)
 .andThen(nope);

assert.deepStrictEqual(b, None);

const c = Some(2)
 .andThen(nope)
 .andThen(square);

assert.deepStrictEqual(c, None);

const d = None()
 .andThen(square)
 .andThen(square);

assert.deepStrictEqual(d, None);
```

**Type parameters:**

#### T :  [Option]()<`V`>
#### V 
**Parameters:**

| Name | Type |
| ------ | ------ |
| fn | `function` |

**Returns:** `T` \| [None](#none)

___
<a id="expect"></a>

###  expect

▸ **expect**(message: *`string`*): `Payload`

*Defined in [option.ts:1093](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1093)*

Unwraps an option, yielding the content of a `Some`.

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

const some = Option.Some(2);
assert.strictEqual(some.expect("something bad"), 2);

const none = Option.None();
assert.throws(() => none.expect("something bad"), new Error("something bad"));
```

*__throws__*: Throws if the value is a `None` with a custom error message provided by {message}.

**Parameters:**

| Name | Type |
| ------ | ------ |
| message | `string` |

**Returns:** `Payload`

___
<a id="filter"></a>

###  filter

▸ **filter**(fn: *`function`*): [Option]()<`Payload`>

*Defined in [option.ts:1407](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1407)*

Returns None if the option is None, otherwise calls predicate with the wrapped value and returns:

*   Some(t) if predicate returns true (where t is the wrapped value), and
*   None if predicate returns false.

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

const isEven = (input: number) => input % 2 === 0;

assert.deepStrictEqual(Option.None().map(isEven), Option.None);
assert.deepStrictEqual(Option.Some(3).map(isEven), Option.None);
assert.deepStrictEqual(Option.Some(4).map(isEven), Option.Some(4));
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| fn | `function` |

**Returns:** [Option]()<`Payload`>

___
<a id="getorinsert"></a>

###  getOrInsert

▸ **getOrInsert**(payload: *`Payload`*): [Some](#some)<`Payload`>

*Defined in [option.ts:1560](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1560)*

Inserts `payload` into the option if it is `None`.

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

const some = Option.Some(2);
const none = Option.None();

const got = some.getOrInsert(5);
const inserted = none.getOrInsert(5);

assert.deepStrictEqual(got, some);
assert.deepStrictEqual(got, Option.Some(5));
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| payload | `Payload` |

**Returns:** [Some](#some)<`Payload`>

___
<a id="getorinsertwith"></a>

###  getOrInsertWith

▸ **getOrInsertWith**(fn: *`function`*): [Some](#some)<`Payload`>

*Defined in [option.ts:1586](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1586)*

Inserts a value computed from `fn` into the option if it is `None`

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

const some = Option.Some(2);
const none = Option.None();

const got = some.getOrInsert(() => 5);
const inserted = none.getOrInsert(() => 5);

assert.deepStrictEqual(got, some);
assert.deepStrictEqual(got, Option.Some(5));
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| fn | `function` |

**Returns:** [Some](#some)<`Payload`>

___
<a id="isnone"></a>

###  isNone

▸ **isNone**(): `boolean`

*Defined in [option.ts:1073](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1073)*

Returns true if the option is a `None` value.

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

const some = Option.Some(2);
assert.strictEqual(some.isNone(), false);

const none = Option.None();
assert.strictEqual(some.isNone(), true);
```

**Returns:** `boolean`

___
<a id="issome"></a>

###  isSome

▸ **isSome**(): `boolean`

*Defined in [option.ts:1055](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1055)*

Returns true if the option is a `Some` value.

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

const some = Option.Some(2);
assert.strictEqual(some.isSome(), true);

const none = Option.None();
assert.strictEqual(some.isNone(), false);
```

**Returns:** `boolean`

___
<a id="map"></a>

###  map

▸ **map**<`T`>(fn: *`function`*): [Option]()<`T`>

*Defined in [option.ts:1189](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1189)*

Maps an Option

to Option by applying a function `(p: P) => T` to a contained value `p`.

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

const someString = Option.Some("Hello, World!");
const someLength = someString.map((s) => s.length);

assert.strictEqual(someLength.unwrap(), 13);

const none = Option.None()
const maybe = someString.map((s) => s.length);

assert.strictEqual(maybe.isNone(), true);
assert.throws(() => maybe.unwrap());
```

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| fn | `function` |

**Returns:** [Option]()<`T`>

___
<a id="mapor"></a>

###  mapOr

▸ **mapOr**<`V`,`T`>(fallback: *`V`*, fn: *`function`*): `V` \| `T`

*Defined in [option.ts:1217](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1217)*

Applies a function `(p: P) => T` to the contained value `p` (if any), or returns the provided fallback (if not).

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

const someString = Option.Some("Thing");
const someLength = someString.mapOr((s) => s.length, 42);

assert.strictEqual(someLength.unwrap(), 5);

const none = Option.None();
const maybe = someString.mapOr((s) => s.length, 42);

assert.strictEqual(someLength.isSome(), true);
assert.strictEqual(someLength.unwrap(), 42);
```

**Type parameters:**

#### V 
#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| fallback | `V` |
| fn | `function` |

**Returns:** `V` \| `T`

___
<a id="maporelse"></a>

###  mapOrElse

▸ **mapOrElse**<`V`,`T`>(fallback: *`function`*, fn: *`function`*): `V` \| `T`

*Defined in [option.ts:1245](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1245)*

Applies a function `(p: P) => T` to the contained value `p` (if any), or computes a fallback via a function `() => V` (if not).

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

const someString = Option.Some("Thing");
const someLength = someString.mapOr((s) => s.length, () => 42);

assert.strictEqual(someLength.unwrap(), 5);

const none = Option.None();
const maybe = someString.mapOr((s) => s.length, () => 42);

assert.strictEqual(someLength.isSome(), true);
assert.strictEqual(someLength.unwrap(), 42);
```

**Type parameters:**

#### V 
#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| fallback | `function` |
| fn | `function` |

**Returns:** `V` \| `T`

___
<a id="okor"></a>

###  okOr

▸ **okOr**(message: *`string`*): `Result`<`Payload`>

*Defined in [option.ts:1276](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1276)*

Transforms the `Option<Payload>` into a `Result<Payload, Error>`, mapping `Some(Payload)` to `Ok(Payload)` and `None` to `Err(err)`.

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';
import { Result } from '@marionebl/result';

const some = Option.Some("Thing");
const ok = some.okOr("Something went wrong");

assert.deepStrictEqual(ok, Result.Ok("Thing"));

const none = Option.None();
const err = some.okOr("Something went wrong");

assert.deepStrictEqual(err, Result.Err(new Error("Something went wrong")));
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| message | `string` |

**Returns:** `Result`<`Payload`>

___
<a id="okorelse"></a>

###  okOrElse

▸ **okOrElse**(fn: *`function`*): `Result`<`Payload`>

*Defined in [option.ts:1303](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1303)*

Transforms the `Option<Payload>` into a `Result<Payload, Error>`, mapping `Some(Payload)` to `Ok(Payload)` and `None` to `Err(err)`.

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';
import { Result } from '@marionebl/result';

const some = Option.Some("Thing");
const ok = some.okOrElse(() => "Something went wrong");

assert.deepStrictEqual(ok, Result.Ok("Thing"));

const none = Option.None();
const err = some.okOrElse(() => "Something went wrong");

assert.deepStrictEqual(err, Result.Err(new Error("Something went wrong")));
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| fn | `function` |

**Returns:** `Result`<`Payload`>

___
<a id="or"></a>

###  or

▸ **or**<`T`,`V`>(b: *`T`*): `this` \| `T`

*Defined in [option.ts:1451](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1451)*

Returns the option if it contains a value, otherwise returns `b`.

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

{
  const some = Option.Some(2);
  const none = Option.None();
  assert.deepStrictEqual(some.or(none), Option.Some(2));
}

{
  const none = Option.None();
  const some = Option.Some(2);
  assert.deepStrictEqual(none.or(some), Option.Some(2));
}

{
  const a = Option.Some(100);
  const b = Option.Some(2);
  assert.deepStrictEqual(a.or(b), a);
}

{
  const a = Option.None();
  const b = Option.None();
  assert.deepStrictEqual(a.or(b), Option.None());
}
```

**Type parameters:**

#### T :  [Option]()<`V`>
#### V 
**Parameters:**

| Name | Type |
| ------ | ------ |
| b | `T` |

**Returns:** `this` \| `T`

___
<a id="orelse"></a>

###  orElse

▸ **orElse**<`T`,`V`>(fn: *`function`*): `this` \| `T`

*Defined in [option.ts:1491](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1491)*

Returns the option if it contains a value, otherwise calls `fn` and returns the result.

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

{
  const some = Option.Some(2);
  const none = Option.None();
  assert.deepStrictEqual(some.orElse(() => none), Option.Some(2));
}

{
  const none = Option.None();
  const some = Option.Some(2);
  assert.deepStrictEqual(none.orElse(() => some), Option.Some(2));
}

{
  const a = Option.Some(100);
  const b = Option.Some(2);
  assert.deepStrictEqual(a.orElse(() => b), a);
}

{
  const a = Option.None();
  const b = Option.None();
  assert.deepStrictEqual(a.orElse(() => b), Option.None());
}
```

**Type parameters:**

#### T :  [Option]()<`V`>
#### V 
**Parameters:**

| Name | Type |
| ------ | ------ |
| fn | `function` |

**Returns:** `this` \| `T`

___
<a id="replace"></a>

###  replace

▸ **replace**(payload: *`Payload`*): [Option]()<`Payload`>

*Defined in [option.ts:1631](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1631)*

Replaces the actual value in the option by the value given in parameter, returning the old value if present, leaving a `Some` in its place.

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

const a = Option.Some(2);
const b = a.replace(5);

assert.deepStrictEqual(a, Option.Some(2));
assert.deepStrictEqual(b, Option.Some(5));
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| payload | `Payload` |

**Returns:** [Option]()<`Payload`>

___
<a id="take"></a>

###  take

▸ **take**(): [Option]()<`Payload`>

*Defined in [option.ts:1609](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1609)*

Takes the value out of the option, leaving a `None` in its place.

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

const a = Option.Some(2);
const b = a.take();

assert.deepStrictEqual(a, Option.None());
assert.deepStrictEqual(b, Option.Some(2));
```

**Returns:** [Option]()<`Payload`>

___
<a id="transpose"></a>

###  transpose

▸ **transpose**(): `Promise`<`Result`<[Option]()<`Payload`>>>

*Defined in [option.ts:1654](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1654)*

Transposes an `Option` of a `Result` into `Result` of an `Option`.

`None` will be mapped to `Ok(None)`. `Some(Ok(_))` and `Some(Err(_))` will be mapped to `Ok(Some(_))` and `Err(_)`.

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';
import { Result } from '@marionebl/result';

const ok = Result.Ok(Option.Some(2));
const some = Option.Some(Result.Ok(2));

assert.deepStrictEqual(ok, some.transpose());
```

**Returns:** `Promise`<`Result`<[Option]()<`Payload`>>>

___
<a id="unwrap"></a>

###  unwrap

▸ **unwrap**(): `Payload`

*Defined in [option.ts:1117](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1117)*

Unwraps an option, yielding the content of a `Some`.

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

const some = Option.Some(2);
assert.strictEqual(some.unwrap(), 2);

const none = Option.None();
assert.throws(() => none.unwrap());
```

*__throws__*: Throws if the value is a `None`

**Returns:** `Payload`

___
<a id="unwrapor"></a>

###  unwrapOr

▸ **unwrapOr**<`T`>(fallback: *`T`*): `Payload` \| `T`

*Defined in [option.ts:1139](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1139)*

Returns the contained value or a `fallback`.

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

const some = Option.Some(1);
assert.strictEqual(some.unwrapOr(2), 1);

const none = Option.None();
assert.strictEqual(none.unwrapOr(2), 2);
```

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| fallback | `T` |

**Returns:** `Payload` \| `T`

___
<a id="unwraporelse"></a>

###  unwrapOrElse

▸ **unwrapOrElse**<`T`>(fn: *`function`*): `Payload` \| `T`

*Defined in [option.ts:1162](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1162)*

Returns the contained value or computes it from a closure.

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

const some = Option.Some(1);
assert.strictEqual(some.unwrapOrElse(() => 2), 1);

const none = Option.None();
assert.strictEqual(none.unwrapOr(() => 2), 2);
```

**Type parameters:**

#### T 
**Parameters:**

| Name | Type |
| ------ | ------ |
| fn | `function` |

**Returns:** `Payload` \| `T`

___
<a id="xor"></a>

###  xor

▸ **xor**<`T`,`V`>(b: *`T`*): `this` \| `T` \| [None](#none)

*Defined in [option.ts:1531](https://github.com/marionebl/option/blob/2f4b196/src/option.ts#L1531)*

Returns `Some` if exactly one of `this` or `b` is `Some`, otherwise returns `None`.

```ts
import * as assert from 'assert';
import { Option } from '@marionebl/option';

{
  const some = Option.Some(2);
  const none = Option.None();
  assert.deepStrictEqual(some.xor(none), Option.Some(2));
}

{
  const none = Option.None();
  const some = Option.Some(2);
  assert.deepStrictEqual(none.xor(some, Option.Some(2));
}

{
  const a = Option.Some(100);
  const b = Option.Some(2);
  assert.deepStrictEqual(a.xor(b), Option.None());
}

{
  const a = Option.None();
  const b = Option.None();
  assert.deepStrictEqual(a.xor(b), Option.None());
}
```

**Type parameters:**

#### T :  [Option]()<`V`>
#### V 
**Parameters:**

| Name | Type |
| ------ | ------ |
| b | `T` |

**Returns:** `this` \| `T` \| [None](#none)


## License

MIT. Copyright 2019 - present Mario Nebl


[ci-badge]: https://img.shields.io/circleci/project/github/marionebl/option/master.svg?style=flat-square
[ci-url]: https://circleci.com/gh/marionebl/option

[npm-badge]: https://img.shields.io/npm/v/@marionebl/option.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@marionebl/option
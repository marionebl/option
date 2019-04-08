import { Option } from "./option";
import { Result } from "@marionebl/result";

describe(".isSome", () => {
  test("return true for Some()", () => {
    const some = Option.Some("something");
    expect(some.isSome()).toBe(true);
  });

  test("return false for None()", () => {
    const none = Option.None();
    expect(none.isSome()).toBe(false);
  });
});

describe(".isNone", () => {
  test("return false for Some()", () => {
    const some = Option.Some("something");
    expect(some.isNone()).toBe(false);
  });

  test("return true for None()", () => {
    const none = Option.None();
    expect(none.isNone()).toBe(true);
  });
});

describe(".expect", () => {
  test("return payload for Some()", () => {
    const some = Option.Some("something");
    expect(some.expect('expected "something"')).toBe("something");
  });

  test("throw for None()", () => {
    const none = Option.None();
    expect(() => none.expect('expected "something"')).toThrowError(
      'expected "something"'
    );
  });
});

describe(".unwrap", () => {
  test("return payload for Some()", () => {
    const some = Option.Some("something");
    expect(some.unwrap()).toBe("something");
  });

  test("throw for None()", () => {
    const none = Option.None();
    expect(() => none.unwrap()).toThrowError(
      "unwrap: Expected Some(), was None()"
    );
  });
});

describe(".unwrapOr", () => {
  test("return payload for Some()", () => {
    const some = Option.Some("something");
    expect(some.unwrapOr("anotherthinng")).toBe("something");
  });

  test("return fallback for None()", () => {
    const none = Option.None();
    expect(none.unwrapOr("anotherthing")).toBe("anotherthing");
  });
});

describe(".unwrapOrElse", () => {
  test("return payload for Some()", () => {
    const some = Option.Some("something");
    expect(some.unwrapOrElse(() => "anotherthinng")).toBe("something");
  });

  test("return fallback for None()", () => {
    const none = Option.None();
    expect(none.unwrapOrElse(() => "anotherthing")).toBe("anotherthing");
  });
});

describe(".unwrapOrElse", () => {
  test("return payload for Some()", () => {
    const some = Option.Some("something");
    expect(some.unwrapOrElse(() => "anotherthinng")).toBe("something");
  });

  test("return fallback for None()", () => {
    const none = Option.None();
    expect(none.unwrapOrElse(() => "anotherthing")).toBe("anotherthing");
  });
});

describe(".map", () => {
  test("return payload for Some()", () => {
    const some = Option.Some("something");
    expect(some.map(() => "anotherthing")).toEqual({ payload: "anotherthing" });
  });

  test("call fn for Some()", () => {
    const some = Option.Some("something");
    const map = jest.fn(() => "anotherthing");
    some.map(map);
  
    expect(map).toHaveBeenCalledTimes(1);
  });

  test("call fn for Some() with payload", () => {
    const some = Option.Some("something");
    const map = jest.fn(() => "anotherthing");
    some.map(map);
  
    expect(map).toHaveBeenCalledWith("something");
  });

  test("return None", () => {
    const none = Option.None();
    expect(none.map(() => "anotherthing")).toBe(none);
  });
});

describe(".mapOr", () => {
  test("return payload for Some()", () => {
    const some = Option.Some("thing");
    expect(some.mapOr("anotherthing", () => "something")).toBe("something");
  });

  test("return None", () => {
    const none = Option.None();
    expect(none.mapOr("anotherthing", () => "something")).toBe("anotherthing");
  });
});

describe(".mapOrElse", () => {
  test("return value of fn() for Some()", () => {
    const some = Option.Some(1);
    expect(some.mapOrElse(() => 2, value => value + 2)).toBe(3);
  });

  test("return value of fallback() for None", () => {
    const none = Option.None();
    expect(none.mapOrElse(() => 2, value => value + 2)).toBe(2);
  });
});

describe(".okOr", () => {
  test("return Ok() for Some()", () => {
    const some = Option.Some(1);
    expect(some.okOr("Something went wrong")).toEqual(Result.Ok(1));
  });

  test("return value of fallback() for None", () => {
    const none = Option.None();
    expect(none.okOr("Something went wrong")).toEqual(
      Result.Err(new Error("Something went wrong"))
    );
  });
});

describe(".okOrErlse", () => {
  test("return Ok() for Some()", () => {
    const some = Option.Some(1);
    expect(some.okOrElse(() => "Something went wrong")).toEqual(Result.Ok(1));
  });

  test("return value of fallback() for None", () => {
    const none = Option.None();
    expect(none.okOrElse(() => "Something went wrong")).toEqual(
      Result.Err(new Error("Something went wrong"))
    );
  });
});

describe(".and", () => {
  test("someA.and(someB) returns someB", () => {
    const someA = Option.Some("a");
    const someB = Option.Some("b");

    expect(someA.and(someB)).toEqual(someB);
  });

  test("none.and(someB) returns none", () => {
    const none = Option.None();
    const someB = Option.Some("b");

    expect(none.and(someB)).toEqual(none);
  });

  test("someA.and(none) returns none", () => {
    const someA = Option.Some("a");
    const none = Option.None();

    expect(someA.and(none)).toEqual(none);
  });

  test("noneA.and(noneB) returns none", () => {
    const noneA = Option.None();
    const noneB = Option.None();

    expect(noneA.and(noneB)).toEqual(noneA);
  });
});

describe(".andThen", () => {
  test("someA.andThen(() => someB) returns someB", () => {
    const someA = Option.Some("a");
    const someB = Option.Some("b");

    expect(someA.andThen(() => someB)).toEqual(someB);
  });

  test("none.andThen(() => someB) returns none", () => {
    const none = Option.None();
    const someB = Option.Some("b");

    expect(none.andThen(() => someB)).toEqual(none);
  });

  test("someA.andThen(() => none) returns none", () => {
    const someA = Option.Some("a");
    const none = Option.None();

    expect(someA.andThen(() => none)).toEqual(none);
  });

  test("noneA.andThen(() => noneB) returns none", () => {
    const noneA = Option.None();
    const noneB = Option.None();

    expect(noneA.andThen(() => noneB)).toEqual(noneA);
  });

  test("Some(2).andThen(square) * 3 returns Some(256)", () => {
    const square = jest.fn((input: number) => Option.Some(input * input));

    const result = Option.Some(2)
      .andThen(square)
      .andThen(square)
      .andThen(square);

    expect(square).toHaveBeenCalledTimes(3);
    expect(result).toEqual(Option.Some(256));
  });

  test("nope aborts chain", () => {
    const square = jest.fn((input: number) => Option.Some(input * input));
    const nope = jest.fn(() => Option.None());

    const result = Option.Some(2)
      .andThen(square)
      .andThen(nope)
      .andThen(square);

    expect(square).toHaveBeenCalledTimes(1);
    expect(nope).toHaveBeenCalledTimes(1);
    expect(result).toEqual(Option.None());
  });
});

describe(".filter", () => {
  test("returns None() for () => false", () => {
    const nope = jest.fn(() => false);
    const result = Option.Some(2).filter(nope);

    expect(nope).toHaveBeenCalledTimes(1);
    expect(result).toEqual(Option.None());
  });

  test("returns Some() for () => true", () => {
    const yo = jest.fn(() => true);
    const result = Option.Some(2).filter(yo);

    expect(yo).toHaveBeenCalledTimes(1);
    expect(result).toEqual(Option.Some(2));
  });

  test("returns None() for None()", () => {
    const yo = jest.fn(() => true);
    const result = Option.None().filter(yo);

    expect(yo).not.toHaveBeenCalled();
    expect(result).toEqual(Option.None());
  });
});

describe(".or", () => {
  test("some.or(none) returns some", () => {
    const some = Option.Some("a");
    const none = Option.None();

    expect(some.or(none)).toEqual(some);
  });

  test("none.or(some) returns some", () => {
    const some = Option.Some("a");
    const none = Option.None();

    expect(none.or(some)).toEqual(some);
  });

  test("someA.or(someB) returns someA", () => {
    const someA = Option.Some("a");
    const someB = Option.Some("b");

    expect(someA.or(someB)).toEqual(someA);
  });

  test("someB.or(someA) returns someB", () => {
    const someA = Option.Some("a");
    const someB = Option.Some("b");

    expect(someB.or(someA)).toEqual(someB);
  });
});

describe(".orElse", () => {
  test("some.orElse(() => none) returns some", () => {
    const some = Option.Some("a");
    const none = Option.None();

    expect(some.orElse(() => none)).toEqual(some);
  });

  test("none.orElse(() => some) returns some", () => {
    const some = Option.Some("a");
    const none = Option.None();

    expect(none.orElse(() => some)).toEqual(some);
  });

  test("someA.orElse(() => someB) returns someA", () => {
    const someA = Option.Some("a");
    const someB = Option.Some("b");

    expect(someA.orElse(() => someB)).toEqual(someA);
  });

  test("someB.orElse(() => someA) returns someB", () => {
    const someA = Option.Some("a");
    const someB = Option.Some("b");

    expect(someB.orElse(() => someA)).toEqual(someB);
  });
});

describe(".xor", () => {
  test("some.xor(none) returns some", () => {
    const some = Option.Some("a");
    const none = Option.None();

    expect(some.xor(none)).toEqual(some);
  });

  test("none.xor(some) returns some", () => {
    const some = Option.Some("a");
    const none = Option.None();

    expect(none.xor(some)).toEqual(some);
  });

  test("someA.xor(someB) returns None", () => {
    const someA = Option.Some("a");
    const someB = Option.Some("b");

    expect(someA.xor(someB)).toEqual(Option.None());
  });

  test("noneA.xor(noneB) returns None", () => {
    const noneA = Option.None();
    const noneB = Option.None();

    expect(noneA.xor(noneB)).toEqual(Option.None());
  });
});

describe(".getOrInsert", () => {
  test("inserts payload on None", () => {
    const none = Option.None();
    expect(none.getOrInsert(1)).toEqual(Option.Some(1));
  });

  test("retains payload on Some", () => {
    const some = Option.Some(0);
    expect(some.getOrInsert(1)).toEqual(Option.Some(0));
  });
});

describe(".getOrInsertWith", () => {
  test("inserts payload on None", () => {
    const none = Option.None();
    expect(none.getOrInsertWith(() => 1)).toEqual(Option.Some(1));
  });

  test("calls payload on Some", () => {
    const none = Option.None();
    const fn = jest.fn(() => 1);
    none.getOrInsertWith(fn);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("retains payload on Some", () => {
    const some = Option.Some(0);
    expect(some.getOrInsertWith(() => 1)).toEqual(some);
  });

  test("does not call fn on Some", () => {
    const some = Option.Some(0);
    const fn = jest.fn(() => 1);
    some.getOrInsertWith(fn);
    expect(fn).not.toHaveBeenCalled();
  });
});

describe(".take", () => {
  test("none => None, None", () => {
    const none = Option.None();
    const result = none.take();

    expect(none).toEqual(Option.None());
    expect(result).toEqual(Option.None());
  });

  test("some => None, Some", () => {
    const some = Option.Some(1);
    const result = some.take();

    expect(some).toEqual(Option.None());
    expect(result).toEqual(Option.Some(1));
  });
});

describe(".replace", () => {
  test("none.replace(1) => Some(1)", () => {
    const none = Option.None();
    const result = none.replace(1);

    expect(none).toEqual(Option.Some(1));
    expect(result).toEqual(Option.None());
  });

  test("some => None, Some", () => {
    const some = Option.Some(1);
    const result = some.replace(2);

    expect(some).toEqual(Option.Some(2));
    expect(result).toEqual(Option.Some(1));
  });
});

describe(".transpose", () => {
  test("Some<Ok<P>> => Ok<Some<P>>", async () => {
    const some = Option.Some(Result.Ok(1));
    const result = await some.transpose();

    expect(await result.isOk()).toEqual(true);
    expect(await result.unwrap()).toEqual(Option.Some(1));
  });

  test("None => Ok<None>", async () => {
    const none = Option.None();
    const result = await none.transpose();

    expect(await result.isOk()).toEqual(true);
    expect(await result.unwrap()).toEqual(Option.None());
  });

  test("Some<Err> => Err", async () => {
    const some = Option.Some(Result.Err(new Error("Something went wrong")));
    const result = await some.transpose();

    expect(await result.isErr()).toEqual(true);
    expect(await result.unwrapErr()).toBeInstanceOf(Error);
  });

  test("Some<1> => Ok<None>", async () => {
    const some = Option.Some(1);
    const result = await some.transpose();

    expect(await result.isOk()).toEqual(true);
    expect(await result.unwrap()).toEqual(Option.None());
  });
});

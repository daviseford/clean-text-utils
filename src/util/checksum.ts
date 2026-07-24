import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import type { Algorithm } from "../definitions/module";

const ALGORITHMS: readonly Algorithm[] = ["sha", "sha1", "sha256", "sha512", "md5"];
const SERIALIZATION_PREFIX = "\0clean-text-utils:";
const UNSUPPORTED_OBJECT_TAGS = new Set([
  "[object Error]",
  "[object FinalizationRegistry]",
  "[object Promise]",
  "[object Symbol]",
  "[object WeakMap]",
  "[object WeakRef]",
  "[object WeakSet]",
]);

const getAlgorithm = (algorithm: unknown): Algorithm => {
  return typeof algorithm === "string" && ALGORITHMS.includes(algorithm as Algorithm)
    ? (algorithm as Algorithm)
    : "sha256";
};

const serializeNumber = (value: number): string => {
  if (Number.isNaN(value)) {
    return "number:NaN";
  }
  if (!Number.isFinite(value)) {
    return `number:${value > 0 ? "Infinity" : "-Infinity"}`;
  }
  if (Object.is(value, -0)) {
    return "number:-0";
  }
  return `number:${value}`;
};

const serializeValue = (value: unknown, seen: WeakSet<object>): string => {
  if (value === null) {
    return "null";
  }

  switch (typeof value) {
    case "undefined":
      return "undefined";
    case "string":
      return `string:${JSON.stringify(value)}`;
    case "boolean":
      return `boolean:${value}`;
    case "number":
      return serializeNumber(value);
    case "bigint":
      return `bigint:${value}`;
    case "symbol":
    case "function":
      throw new TypeError(`Cannot checksum ${typeof value} values`);
  }

  if (seen.has(value)) {
    throw new TypeError("Cannot checksum circular data");
  }

  const objectTag = Object.prototype.toString.call(value);
  if (UNSUPPORTED_OBJECT_TAGS.has(objectTag)) {
    throw new TypeError(`Cannot checksum ${objectTag.slice(8, -1)} values`);
  }
  if (Object.getOwnPropertySymbols(value).length > 0) {
    throw new TypeError("Cannot checksum symbol-keyed properties");
  }

  if (Buffer.isBuffer(value)) {
    return `buffer:${value.toString("hex")}`;
  }
  if (value instanceof Date) {
    return `date:${Number.isNaN(value.getTime()) ? "invalid" : value.toISOString()}`;
  }
  if (value instanceof RegExp) {
    return `regexp:${value.source}/${value.flags}`;
  }
  if (value instanceof URL) {
    return `url:${value.href}`;
  }
  if (value instanceof ArrayBuffer) {
    return `array-buffer:${Buffer.from(value).toString("hex")}`;
  }
  if (ArrayBuffer.isView(value)) {
    const bytes = Buffer.from(value.buffer, value.byteOffset, value.byteLength);
    return `${value.constructor.name}:${bytes.toString("hex")}`;
  }

  seen.add(value);
  try {
    if (Array.isArray(value)) {
      const entries = Array.from({ length: value.length }, (_, index) =>
        index in value ? serializeValue(value[index], seen) : "hole",
      );
      return `array:[${entries.join(",")}]`;
    }

    if (value instanceof Map) {
      const entries = Array.from(value, ([key, entryValue]) => {
        return `${serializeValue(key, seen)}=>${serializeValue(entryValue, seen)}`;
      }).sort();
      return `map:{${entries.join(",")}}`;
    }

    if (value instanceof Set) {
      const entries = Array.from(value, (entry) => serializeValue(entry, seen)).sort();
      return `set:{${entries.join(",")}}`;
    }

    const record = value as Record<string, unknown>;
    const entries = Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${serializeValue(record[key], seen)}`);
    const type = value.constructor?.name ?? "Object";
    if (type !== "Object" && entries.length === 0) {
      throw new TypeError(`Cannot checksum ${type} values`);
    }
    return `object:${type}:{${entries.join(",")}}`;
  } finally {
    seen.delete(value);
  }
};

/**
 * Pass any supported JavaScript value and receive a stable checksum.
 * Strings retain their standard digest; other values use deterministic,
 * type-aware serialization before hashing.
 */
const checksum = (data: unknown, algorithm?: string): string => {
  const serialized = typeof data === "string" ? data : SERIALIZATION_PREFIX + serializeValue(data, new WeakSet());
  return createHash(getAlgorithm(algorithm)).update(serialized).digest("hex");
};

export { checksum };
export default checksum;

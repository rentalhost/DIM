import _ from 'lodash';
import memoizeOne from 'memoize-one';

/**
 * Count the number of values in the list that pass the predicate.
 */
export function count<T>(list: T[], predicate: (value: T) => boolean): number {
  return _.sumBy(list, (item) => {
    return predicate(item) ? 1 : 0;
  });
}

/** A shallow copy (just top level properties) of an object, preserving its prototype. */
export function shallowCopy<T>(o: T): T {
  return Object.assign(Object.create(Object.getPrototypeOf(o)), o);
}

export function preventNaN(testValue, defaultValue) {
  return !isNaN(testValue) ? testValue : defaultValue;
}

/**
 * Produce a function that can memoize a calculation about an item. The cache is backed by
 * a WeakMap so when the item is garbage collected the cache is freed up too.
 */
export function weakMemoize<T extends object, R>(func: (T) => R): (T) => R {
  const cache = new WeakMap<T, R>();
  return (arg: T): R => {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }

    const value = func(arg);
    cache.set(arg, value);
    return value;
  };
}

/**
 * A memoized number formatter.
 */
export const numberFormatter = memoizeOne((language: string) => {
  if (!('Intl' in window)) {
    return {
      format: (num: number) => num.toString()
    };
  }
  try {
    return new Intl.NumberFormat(language);
  } catch (e) {}

  if (language.includes('-')) {
    try {
      return new Intl.NumberFormat(language.split('-')[0]);
    } catch (e) {}
  }

  return new Intl.NumberFormat('en');
});

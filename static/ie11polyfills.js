;(function (w) {
  w.URLSearchParams =
    w.URLSearchParams ||
    function (searchString) {
      // @ts-ignore
      const self = this
      self.searchString = searchString
      self.get = function (name) {
        const results = new RegExp('[?&]' + name + '=([^&#]*)').exec(self.searchString)
        if (results == null) {
          return null
        } else {
          return decodeURI(results[1]) || 0
        }
      }
    }
})(window)

// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function (predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined')
      }

      const o = Object(this)

      // 2. Let len be ? ToLength(? Get(O, "length")).
      const len = o.length >>> 0

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function')
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      const thisArg = arguments[1]

      // 5. Let k be 0.
      let k = 0

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        const kValue = o[k]
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue
        }
        // e. Increase k by 1.
        k++
      }

      // 7. Return undefined.
      return undefined
    },
  })
}

if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    'use strict'
    if (typeof start !== 'number') {
      start = 0
    }

    if (start + search.length > this.length) {
      return false
    } else {
      return this.indexOf(search, start) !== -1
    }
  }
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0
    return this.substr(position, searchString.length) === searchString
  }
}

if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

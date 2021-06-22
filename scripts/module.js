'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$K =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$_ = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$Z = fails$_;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$Z(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$8 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$8 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$8(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable$1;

var createPropertyDescriptor$9 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var toString$2 = {}.toString;

var classofRaw$1 = function (it) {
  return toString$2.call(it).slice(8, -1);
};

var fails$Y = fails$_;
var classof$d = classofRaw$1;

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$Y(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$d(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$h = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$4 = indexedObject;
var requireObjectCoercible$g = requireObjectCoercible$h;

var toIndexedObject$d = function (it) {
  return IndexedObject$4(requireObjectCoercible$g(it));
};

var isObject$y = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var isObject$x = isObject$y;

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive$b = function (input, PREFERRED_STRING) {
  if (!isObject$x(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$x(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject$x(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$x(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var requireObjectCoercible$f = requireObjectCoercible$h;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$o = function (argument) {
  return Object(requireObjectCoercible$f(argument));
};

var toObject$n = toObject$o;

var hasOwnProperty = {}.hasOwnProperty;

var has$k = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject$n(it), key);
};

var global$J = global$K;
var isObject$w = isObject$y;

var document$3 = global$J.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject$w(document$3) && isObject$w(document$3.createElement);

var documentCreateElement$1 = function (it) {
  return EXISTS ? document$3.createElement(it) : {};
};

var DESCRIPTORS$v = descriptors;
var fails$X = fails$_;
var createElement$1 = documentCreateElement$1;

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !DESCRIPTORS$v && !fails$X(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement$1('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var DESCRIPTORS$u = descriptors;
var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable;
var createPropertyDescriptor$8 = createPropertyDescriptor$9;
var toIndexedObject$c = toIndexedObject$d;
var toPrimitive$a = toPrimitive$b;
var has$j = has$k;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$u ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$c(O);
  P = toPrimitive$a(P, true);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) { /* empty */ }
  if (has$j(O, P)) return createPropertyDescriptor$8(!propertyIsEnumerableModule$2.f.call(O, P), O[P]);
};

var objectDefineProperty = {};

var isObject$v = isObject$y;

var anObject$y = function (it) {
  if (!isObject$v(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

var DESCRIPTORS$t = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var anObject$x = anObject$y;
var toPrimitive$9 = toPrimitive$b;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty$1 = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$t ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
  anObject$x(O);
  P = toPrimitive$9(P, true);
  anObject$x(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty$1(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$s = descriptors;
var definePropertyModule$c = objectDefineProperty;
var createPropertyDescriptor$7 = createPropertyDescriptor$9;

var createNonEnumerableProperty$h = DESCRIPTORS$s ? function (object, key, value) {
  return definePropertyModule$c.f(object, key, createPropertyDescriptor$7(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var redefine$g = {exports: {}};

var global$I = global$K;
var createNonEnumerableProperty$g = createNonEnumerableProperty$h;

var setGlobal$3 = function (key, value) {
  try {
    createNonEnumerableProperty$g(global$I, key, value);
  } catch (error) {
    global$I[key] = value;
  } return value;
};

var global$H = global$K;
var setGlobal$2 = setGlobal$3;

var SHARED = '__core-js_shared__';
var store$3 = global$H[SHARED] || setGlobal$2(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

var functionToString = Function.toString;

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store$2.inspectSource != 'function') {
  store$2.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource$3 = store$2.inspectSource;

var global$G = global$K;
var inspectSource$2 = inspectSource$3;

var WeakMap$1 = global$G.WeakMap;

var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource$2(WeakMap$1));

var shared$5 = {exports: {}};

var isPure = false;

var store$1 = sharedStore;

(shared$5.exports = function (key, value) {
  return store$1[key] || (store$1[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.15.1',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

var id$2 = 0;
var postfix = Math.random();

var uid$5 = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id$2 + postfix).toString(36);
};

var shared$4 = shared$5.exports;
var uid$4 = uid$5;

var keys$3 = shared$4('keys');

var sharedKey$4 = function (key) {
  return keys$3[key] || (keys$3[key] = uid$4(key));
};

var hiddenKeys$6 = {};

var NATIVE_WEAK_MAP$1 = nativeWeakMap;
var global$F = global$K;
var isObject$u = isObject$y;
var createNonEnumerableProperty$f = createNonEnumerableProperty$h;
var objectHas = has$k;
var shared$3 = sharedStore;
var sharedKey$3 = sharedKey$4;
var hiddenKeys$5 = hiddenKeys$6;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global$F.WeakMap;
var set$3, get$2, has$i;

var enforce = function (it) {
  return has$i(it) ? get$2(it) : set$3(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$u(it) || (state = get$2(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP$1 || shared$3.state) {
  var store = shared$3.state || (shared$3.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set$3 = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get$2 = function (it) {
    return wmget.call(store, it) || {};
  };
  has$i = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey$3('state');
  hiddenKeys$5[STATE] = true;
  set$3 = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$f(it, STATE, metadata);
    return metadata;
  };
  get$2 = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has$i = function (it) {
    return objectHas(it, STATE);
  };
}

var internalState = {
  set: set$3,
  get: get$2,
  has: has$i,
  enforce: enforce,
  getterFor: getterFor
};

var global$E = global$K;
var createNonEnumerableProperty$e = createNonEnumerableProperty$h;
var has$h = has$k;
var setGlobal$1 = setGlobal$3;
var inspectSource$1 = inspectSource$3;
var InternalStateModule$b = internalState;

var getInternalState$a = InternalStateModule$b.get;
var enforceInternalState$1 = InternalStateModule$b.enforce;
var TEMPLATE = String(String).split('String');

(redefine$g.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has$h(value, 'name')) {
      createNonEnumerableProperty$e(value, 'name', key);
    }
    state = enforceInternalState$1(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global$E) {
    if (simple) O[key] = value;
    else setGlobal$1(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty$e(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState$a(this).source || inspectSource$1(this);
});

var global$D = global$K;

var path$2 = global$D;

var path$1 = path$2;
var global$C = global$K;

var aFunction$h = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn$d = function (namespace, method) {
  return arguments.length < 2 ? aFunction$h(path$1[namespace]) || aFunction$h(global$C[namespace])
    : path$1[namespace] && path$1[namespace][method] || global$C[namespace] && global$C[namespace][method];
};

var objectGetOwnPropertyNames = {};

var ceil$2 = Math.ceil;
var floor$a = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
var toInteger$e = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$a : ceil$2)(argument);
};

var toInteger$d = toInteger$e;

var min$9 = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$v = function (argument) {
  return argument > 0 ? min$9(toInteger$d(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toInteger$c = toInteger$e;

var max$5 = Math.max;
var min$8 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$8 = function (index, length) {
  var integer = toInteger$c(index);
  return integer < 0 ? max$5(integer + length, 0) : min$8(integer, length);
};

var toIndexedObject$b = toIndexedObject$d;
var toLength$u = toLength$v;
var toAbsoluteIndex$7 = toAbsoluteIndex$8;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$6 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$b($this);
    var length = toLength$u(O.length);
    var index = toAbsoluteIndex$7(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$6(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$6(false)
};

var has$g = has$k;
var toIndexedObject$a = toIndexedObject$d;
var indexOf = arrayIncludes.indexOf;
var hiddenKeys$4 = hiddenKeys$6;

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$a(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has$g(hiddenKeys$4, key) && has$g(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has$g(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;

var hiddenKeys$3 = enumBugKeys$2.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$3);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$c = getBuiltIn$d;
var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols;
var anObject$w = anObject$y;

// all object keys, includes non-enumerable and symbols
var ownKeys$3 = getBuiltIn$c('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule$1.f(anObject$w(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule$2.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var has$f = has$k;
var ownKeys$2 = ownKeys$3;
var getOwnPropertyDescriptorModule$6 = objectGetOwnPropertyDescriptor;
var definePropertyModule$b = objectDefineProperty;

var copyConstructorProperties$2 = function (target, source) {
  var keys = ownKeys$2(source);
  var defineProperty = definePropertyModule$b.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$6.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has$f(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var fails$W = fails$_;

var replacement = /#|\.prototype\./;

var isForced$5 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails$W(detection)
    : !!detection;
};

var normalize = isForced$5.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$5.data = {};
var NATIVE = isForced$5.NATIVE = 'N';
var POLYFILL = isForced$5.POLYFILL = 'P';

var isForced_1 = isForced$5;

var global$B = global$K;
var getOwnPropertyDescriptor$7 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$d = createNonEnumerableProperty$h;
var redefine$f = redefine$g.exports;
var setGlobal = setGlobal$3;
var copyConstructorProperties$1 = copyConstructorProperties$2;
var isForced$4 = isForced_1;

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$B;
  } else if (STATIC) {
    target = global$B[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global$B[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$7(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced$4(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties$1(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty$d(sourceProperty, 'sham', true);
    }
    // extend global
    redefine$f(target, key, sourceProperty, options);
  }
};

var getBuiltIn$b = getBuiltIn$d;

var engineUserAgent = getBuiltIn$b('navigator', 'userAgent') || '';

var global$A = global$K;
var userAgent$6 = engineUserAgent;

var process$4 = global$A.process;
var versions = process$4 && process$4.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (userAgent$6) {
  match = userAgent$6.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent$6.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

/* eslint-disable es/no-symbol -- required for testing */

var V8_VERSION$3 = engineV8Version;
var fails$V = fails$_;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$V(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
});

/* eslint-disable es/no-symbol -- required for testing */

var NATIVE_SYMBOL$2 = nativeSymbol;

var useSymbolAsUid = NATIVE_SYMBOL$2
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var classof$c = classofRaw$1;

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray$7 = Array.isArray || function isArray(arg) {
  return classof$c(arg) == 'Array';
};

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys$4 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};

var DESCRIPTORS$r = descriptors;
var definePropertyModule$a = objectDefineProperty;
var anObject$v = anObject$y;
var objectKeys$3 = objectKeys$4;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
var objectDefineProperties = DESCRIPTORS$r ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$v(O);
  var keys = objectKeys$3(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule$a.f(O, key = keys[index++], Properties[key]);
  return O;
};

var getBuiltIn$a = getBuiltIn$d;

var html$2 = getBuiltIn$a('document', 'documentElement');

var anObject$u = anObject$y;
var defineProperties$2 = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys$2 = hiddenKeys$6;
var html$1 = html$2;
var documentCreateElement = documentCreateElement$1;
var sharedKey$2 = sharedKey$4;

var GT = '>';
var LT = '<';
var PROTOTYPE$2 = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey$2('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html$1.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject -- old IE */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE$2][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys$2[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE$2] = anObject$u(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE$2] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties$2(result, Properties);
};

var objectGetOwnPropertyNamesExternal = {};

/* eslint-disable es/no-object-getownpropertynames -- safe */

var toIndexedObject$9 = toIndexedObject$d;
var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;

var toString$1 = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames$1(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]'
    ? getWindowNames(it)
    : $getOwnPropertyNames$1(toIndexedObject$9(it));
};

var global$z = global$K;
var shared$2 = shared$5.exports;
var has$e = has$k;
var uid$3 = uid$5;
var NATIVE_SYMBOL$1 = nativeSymbol;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var WellKnownSymbolsStore$1 = shared$2('wks');
var Symbol$1 = global$z.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$3;

var wellKnownSymbol$w = function (name) {
  if (!has$e(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$1 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
    if (NATIVE_SYMBOL$1 && has$e(Symbol$1, name)) {
      WellKnownSymbolsStore$1[name] = Symbol$1[name];
    } else {
      WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore$1[name];
};

var wellKnownSymbolWrapped = {};

var wellKnownSymbol$v = wellKnownSymbol$w;

wellKnownSymbolWrapped.f = wellKnownSymbol$v;

var path = path$2;
var has$d = has$k;
var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
var defineProperty$c = objectDefineProperty.f;

var defineWellKnownSymbol$e = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has$d(Symbol, NAME)) defineProperty$c(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule$1.f(NAME)
  });
};

var defineProperty$b = objectDefineProperty.f;
var has$c = has$k;
var wellKnownSymbol$u = wellKnownSymbol$w;

var TO_STRING_TAG$4 = wellKnownSymbol$u('toStringTag');

var setToStringTag$b = function (it, TAG, STATIC) {
  if (it && !has$c(it = STATIC ? it : it.prototype, TO_STRING_TAG$4)) {
    defineProperty$b(it, TO_STRING_TAG$4, { configurable: true, value: TAG });
  }
};

var aFunction$g = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

var aFunction$f = aFunction$g;

// optional / simple context binding
var functionBindContext = function (fn, that, length) {
  aFunction$f(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var isObject$t = isObject$y;
var isArray$6 = isArray$7;
var wellKnownSymbol$t = wellKnownSymbol$w;

var SPECIES$6 = wellKnownSymbol$t('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate$5 = function (originalArray, length) {
  var C;
  if (isArray$6(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray$6(C.prototype))) C = undefined;
    else if (isObject$t(C)) {
      C = C[SPECIES$6];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var bind$a = functionBindContext;
var IndexedObject$3 = indexedObject;
var toObject$m = toObject$o;
var toLength$t = toLength$v;
var arraySpeciesCreate$4 = arraySpeciesCreate$5;

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
var createMethod$5 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_OUT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject$m($this);
    var self = IndexedObject$3(O);
    var boundFunction = bind$a(callbackfn, that, 3);
    var length = toLength$t(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate$4;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push.call(target, value); // filterOut
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$5(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod$5(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod$5(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod$5(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod$5(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod$5(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$5(6),
  // `Array.prototype.filterOut` method
  // https://github.com/tc39/proposal-array-filtering
  filterOut: createMethod$5(7)
};

var $$2q = _export;
var global$y = global$K;
var getBuiltIn$9 = getBuiltIn$d;
var DESCRIPTORS$q = descriptors;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;
var fails$U = fails$_;
var has$b = has$k;
var isArray$5 = isArray$7;
var isObject$s = isObject$y;
var anObject$t = anObject$y;
var toObject$l = toObject$o;
var toIndexedObject$8 = toIndexedObject$d;
var toPrimitive$8 = toPrimitive$b;
var createPropertyDescriptor$6 = createPropertyDescriptor$9;
var nativeObjectCreate = objectCreate;
var objectKeys$2 = objectKeys$4;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
var getOwnPropertyDescriptorModule$5 = objectGetOwnPropertyDescriptor;
var definePropertyModule$9 = objectDefineProperty;
var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
var createNonEnumerableProperty$c = createNonEnumerableProperty$h;
var redefine$e = redefine$g.exports;
var shared$1 = shared$5.exports;
var sharedKey$1 = sharedKey$4;
var hiddenKeys$1 = hiddenKeys$6;
var uid$2 = uid$5;
var wellKnownSymbol$s = wellKnownSymbol$w;
var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
var defineWellKnownSymbol$d = defineWellKnownSymbol$e;
var setToStringTag$a = setToStringTag$b;
var InternalStateModule$a = internalState;
var $forEach$2 = arrayIteration.forEach;

var HIDDEN = sharedKey$1('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE$1 = 'prototype';
var TO_PRIMITIVE$1 = wellKnownSymbol$s('toPrimitive');
var setInternalState$a = InternalStateModule$a.set;
var getInternalState$9 = InternalStateModule$a.getterFor(SYMBOL);
var ObjectPrototype$3 = Object[PROTOTYPE$1];
var $Symbol = global$y.Symbol;
var $stringify$1 = getBuiltIn$9('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor$2 = getOwnPropertyDescriptorModule$5.f;
var nativeDefineProperty$1 = definePropertyModule$9.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule$1.f;
var AllSymbols = shared$1('symbols');
var ObjectPrototypeSymbols = shared$1('op-symbols');
var StringToSymbolRegistry = shared$1('string-to-symbol-registry');
var SymbolToStringRegistry = shared$1('symbol-to-string-registry');
var WellKnownSymbolsStore = shared$1('wks');
var QObject = global$y.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS$q && fails$U(function () {
  return nativeObjectCreate(nativeDefineProperty$1({}, 'a', {
    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$2(ObjectPrototype$3, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype$3[P];
  nativeDefineProperty$1(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$3) {
    nativeDefineProperty$1(ObjectPrototype$3, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty$1;

var wrap$1 = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE$1]);
  setInternalState$a(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS$q) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype$3) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject$t(O);
  var key = toPrimitive$8(P, true);
  anObject$t(Attributes);
  if (has$b(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has$b(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor$6(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has$b(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$6(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty$1(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject$t(O);
  var properties = toIndexedObject$8(Properties);
  var keys = objectKeys$2(properties).concat($getOwnPropertySymbols(properties));
  $forEach$2(keys, function (key) {
    if (!DESCRIPTORS$q || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive$8(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype$3 && has$b(AllSymbols, P) && !has$b(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has$b(this, P) || !has$b(AllSymbols, P) || has$b(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject$8(O);
  var key = toPrimitive$8(P, true);
  if (it === ObjectPrototype$3 && has$b(AllSymbols, key) && !has$b(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor$2(it, key);
  if (descriptor && has$b(AllSymbols, key) && !(has$b(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject$8(O));
  var result = [];
  $forEach$2(names, function (key) {
    if (!has$b(AllSymbols, key) && !has$b(hiddenKeys$1, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$3;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$8(O));
  var result = [];
  $forEach$2(names, function (key) {
    if (has$b(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$b(ObjectPrototype$3, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid$2(description);
    var setter = function (value) {
      if (this === ObjectPrototype$3) setter.call(ObjectPrototypeSymbols, value);
      if (has$b(this, HIDDEN) && has$b(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor$6(1, value));
    };
    if (DESCRIPTORS$q && USE_SETTER) setSymbolDescriptor(ObjectPrototype$3, tag, { configurable: true, set: setter });
    return wrap$1(tag, description);
  };

  redefine$e($Symbol[PROTOTYPE$1], 'toString', function toString() {
    return getInternalState$9(this).tag;
  });

  redefine$e($Symbol, 'withoutSetter', function (description) {
    return wrap$1(uid$2(description), description);
  });

  propertyIsEnumerableModule$1.f = $propertyIsEnumerable;
  definePropertyModule$9.f = $defineProperty;
  getOwnPropertyDescriptorModule$5.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule$1.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap$1(wellKnownSymbol$s(name), name);
  };

  if (DESCRIPTORS$q) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState$9(this).description;
      }
    });
    {
      redefine$e(ObjectPrototype$3, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$$2q({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach$2(objectKeys$2(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol$d(name);
});

$$2q({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has$b(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has$b(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$$2q({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS$q }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$$2q({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$$2q({ target: 'Object', stat: true, forced: fails$U(function () { getOwnPropertySymbolsModule$1.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule$1.f(toObject$l(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify
if ($stringify$1) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails$U(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify$1([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify$1({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify$1(Object(symbol)) != '{}';
  });

  $$2q({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject$s(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray$5(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify$1.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE$1]) {
  createNonEnumerableProperty$c($Symbol[PROTOTYPE$1], TO_PRIMITIVE$1, $Symbol[PROTOTYPE$1].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag$a($Symbol, SYMBOL);

hiddenKeys$1[HIDDEN] = true;

var $$2p = _export;
var DESCRIPTORS$p = descriptors;
var global$x = global$K;
var has$a = has$k;
var isObject$r = isObject$y;
var defineProperty$a = objectDefineProperty.f;
var copyConstructorProperties = copyConstructorProperties$2;

var NativeSymbol = global$x.Symbol;

if (DESCRIPTORS$p && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty$a(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject$r(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has$a(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $$2p({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}

var defineWellKnownSymbol$c = defineWellKnownSymbol$e;

// `Symbol.asyncIterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.asynciterator
defineWellKnownSymbol$c('asyncIterator');

var defineWellKnownSymbol$b = defineWellKnownSymbol$e;

// `Symbol.hasInstance` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.hasinstance
defineWellKnownSymbol$b('hasInstance');

var defineWellKnownSymbol$a = defineWellKnownSymbol$e;

// `Symbol.isConcatSpreadable` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.isconcatspreadable
defineWellKnownSymbol$a('isConcatSpreadable');

var defineWellKnownSymbol$9 = defineWellKnownSymbol$e;

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol$9('iterator');

var defineWellKnownSymbol$8 = defineWellKnownSymbol$e;

// `Symbol.match` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.match
defineWellKnownSymbol$8('match');

var defineWellKnownSymbol$7 = defineWellKnownSymbol$e;

// `Symbol.matchAll` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.matchall
defineWellKnownSymbol$7('matchAll');

var defineWellKnownSymbol$6 = defineWellKnownSymbol$e;

// `Symbol.replace` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.replace
defineWellKnownSymbol$6('replace');

var defineWellKnownSymbol$5 = defineWellKnownSymbol$e;

// `Symbol.search` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.search
defineWellKnownSymbol$5('search');

var defineWellKnownSymbol$4 = defineWellKnownSymbol$e;

// `Symbol.species` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.species
defineWellKnownSymbol$4('species');

var defineWellKnownSymbol$3 = defineWellKnownSymbol$e;

// `Symbol.split` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.split
defineWellKnownSymbol$3('split');

var defineWellKnownSymbol$2 = defineWellKnownSymbol$e;

// `Symbol.toPrimitive` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.toprimitive
defineWellKnownSymbol$2('toPrimitive');

var defineWellKnownSymbol$1 = defineWellKnownSymbol$e;

// `Symbol.toStringTag` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.tostringtag
defineWellKnownSymbol$1('toStringTag');

var defineWellKnownSymbol = defineWellKnownSymbol$e;

// `Symbol.unscopables` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.unscopables
defineWellKnownSymbol('unscopables');

var fails$T = fails$_;

var correctPrototypeGetter = !fails$T(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var has$9 = has$k;
var toObject$k = toObject$o;
var sharedKey = sharedKey$4;
var CORRECT_PROTOTYPE_GETTER$2 = correctPrototypeGetter;

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype$2 = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
var objectGetPrototypeOf$1 = CORRECT_PROTOTYPE_GETTER$2 ? Object.getPrototypeOf : function (O) {
  O = toObject$k(O);
  if (has$9(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype$2 : null;
};

var isObject$q = isObject$y;

var aPossiblePrototype$2 = function (it) {
  if (!isObject$q(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

/* eslint-disable no-proto -- safe */

var anObject$s = anObject$y;
var aPossiblePrototype$1 = aPossiblePrototype$2;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
var objectSetPrototypeOf$1 = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject$s(O);
    aPossiblePrototype$1(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var iterators = {};

var wellKnownSymbol$r = wellKnownSymbol$w;
var Iterators$4 = iterators;

var ITERATOR$8 = wellKnownSymbol$r('iterator');
var ArrayPrototype$1 = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$3 = function (it) {
  return it !== undefined && (Iterators$4.Array === it || ArrayPrototype$1[ITERATOR$8] === it);
};

var wellKnownSymbol$q = wellKnownSymbol$w;

var TO_STRING_TAG$3 = wellKnownSymbol$q('toStringTag');
var test$2 = {};

test$2[TO_STRING_TAG$3] = 'z';

var toStringTagSupport = String(test$2) === '[object z]';

var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
var classofRaw = classofRaw$1;
var wellKnownSymbol$p = wellKnownSymbol$w;

var TO_STRING_TAG$2 = wellKnownSymbol$p('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$b = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

var classof$a = classof$b;
var Iterators$3 = iterators;
var wellKnownSymbol$o = wellKnownSymbol$w;

var ITERATOR$7 = wellKnownSymbol$o('iterator');

var getIteratorMethod$5 = function (it) {
  if (it != undefined) return it[ITERATOR$7]
    || it['@@iterator']
    || Iterators$3[classof$a(it)];
};

var anObject$r = anObject$y;

var iteratorClose$2 = function (iterator) {
  var returnMethod = iterator['return'];
  if (returnMethod !== undefined) {
    return anObject$r(returnMethod.call(iterator)).value;
  }
};

var anObject$q = anObject$y;
var isArrayIteratorMethod$2 = isArrayIteratorMethod$3;
var toLength$s = toLength$v;
var bind$9 = functionBindContext;
var getIteratorMethod$4 = getIteratorMethod$5;
var iteratorClose$1 = iteratorClose$2;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate$8 = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind$9(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose$1(iterator);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$q(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod$4(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod$2(iterFn)) {
      for (index = 0, length = toLength$s(iterable.length); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose$1(iterator);
      throw error;
    }
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

var $$2o = _export;
var getPrototypeOf$9 = objectGetPrototypeOf$1;
var setPrototypeOf$7 = objectSetPrototypeOf$1;
var create$9 = objectCreate;
var createNonEnumerableProperty$b = createNonEnumerableProperty$h;
var createPropertyDescriptor$5 = createPropertyDescriptor$9;
var iterate$7 = iterate$8;

var $AggregateError = function AggregateError(errors, message) {
  var that = this;
  if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message);
  if (setPrototypeOf$7) {
    // eslint-disable-next-line unicorn/error-message -- expected
    that = setPrototypeOf$7(new Error(undefined), getPrototypeOf$9(that));
  }
  if (message !== undefined) createNonEnumerableProperty$b(that, 'message', String(message));
  var errorsArray = [];
  iterate$7(errors, errorsArray.push, { that: errorsArray });
  createNonEnumerableProperty$b(that, 'errors', errorsArray);
  return that;
};

$AggregateError.prototype = create$9(Error.prototype, {
  constructor: createPropertyDescriptor$5(5, $AggregateError),
  message: createPropertyDescriptor$5(5, ''),
  name: createPropertyDescriptor$5(5, 'AggregateError')
});

// `AggregateError` constructor
// https://tc39.es/ecma262/#sec-aggregate-error-constructor
$$2o({ global: true }, {
  AggregateError: $AggregateError
});

var toPrimitive$7 = toPrimitive$b;
var definePropertyModule$8 = objectDefineProperty;
var createPropertyDescriptor$4 = createPropertyDescriptor$9;

var createProperty$7 = function (object, key, value) {
  var propertyKey = toPrimitive$7(key);
  if (propertyKey in object) definePropertyModule$8.f(object, propertyKey, createPropertyDescriptor$4(0, value));
  else object[propertyKey] = value;
};

var fails$S = fails$_;
var wellKnownSymbol$n = wellKnownSymbol$w;
var V8_VERSION$2 = engineV8Version;

var SPECIES$5 = wellKnownSymbol$n('species');

var arrayMethodHasSpeciesSupport$5 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION$2 >= 51 || !fails$S(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$5] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var $$2n = _export;
var fails$R = fails$_;
var isArray$4 = isArray$7;
var isObject$p = isObject$y;
var toObject$j = toObject$o;
var toLength$r = toLength$v;
var createProperty$6 = createProperty$7;
var arraySpeciesCreate$3 = arraySpeciesCreate$5;
var arrayMethodHasSpeciesSupport$4 = arrayMethodHasSpeciesSupport$5;
var wellKnownSymbol$m = wellKnownSymbol$w;
var V8_VERSION$1 = engineV8Version;

var IS_CONCAT_SPREADABLE = wellKnownSymbol$m('isConcatSpreadable');
var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION$1 >= 51 || !fails$R(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$4('concat');

var isConcatSpreadable = function (O) {
  if (!isObject$p(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray$4(O);
};

var FORCED$p = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$$2n({ target: 'Array', proto: true, forced: FORCED$p }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject$j(this);
    var A = arraySpeciesCreate$3(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength$r(E.length);
        if (n + len > MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty$6(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty$6(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

var toObject$i = toObject$o;
var toAbsoluteIndex$6 = toAbsoluteIndex$8;
var toLength$q = toLength$v;

var min$7 = Math.min;

// `Array.prototype.copyWithin` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.copywithin
// eslint-disable-next-line es/no-array-prototype-copywithin -- safe
var arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject$i(this);
  var len = toLength$q(O.length);
  var to = toAbsoluteIndex$6(target, len);
  var from = toAbsoluteIndex$6(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = min$7((end === undefined ? len : toAbsoluteIndex$6(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};

var wellKnownSymbol$l = wellKnownSymbol$w;
var create$8 = objectCreate;
var definePropertyModule$7 = objectDefineProperty;

var UNSCOPABLES = wellKnownSymbol$l('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule$7.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create$8(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables$8 = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

var $$2m = _export;
var copyWithin = arrayCopyWithin;
var addToUnscopables$7 = addToUnscopables$8;

// `Array.prototype.copyWithin` method
// https://tc39.es/ecma262/#sec-array.prototype.copywithin
$$2m({ target: 'Array', proto: true }, {
  copyWithin: copyWithin
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables$7('copyWithin');

var fails$Q = fails$_;

var arrayMethodIsStrict$9 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails$Q(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

var $$2l = _export;
var $every$1 = arrayIteration.every;
var arrayMethodIsStrict$8 = arrayMethodIsStrict$9;

var STRICT_METHOD$8 = arrayMethodIsStrict$8('every');

// `Array.prototype.every` method
// https://tc39.es/ecma262/#sec-array.prototype.every
$$2l({ target: 'Array', proto: true, forced: !STRICT_METHOD$8 }, {
  every: function every(callbackfn /* , thisArg */) {
    return $every$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var toObject$h = toObject$o;
var toAbsoluteIndex$5 = toAbsoluteIndex$8;
var toLength$p = toLength$v;

// `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill
var arrayFill$1 = function fill(value /* , start = 0, end = @length */) {
  var O = toObject$h(this);
  var length = toLength$p(O.length);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex$5(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex$5(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

var $$2k = _export;
var fill = arrayFill$1;
var addToUnscopables$6 = addToUnscopables$8;

// `Array.prototype.fill` method
// https://tc39.es/ecma262/#sec-array.prototype.fill
$$2k({ target: 'Array', proto: true }, {
  fill: fill
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables$6('fill');

var $$2j = _export;
var $filter$1 = arrayIteration.filter;
var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$5;

var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport$3('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$$2j({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $$2i = _export;
var $find$1 = arrayIteration.find;
var addToUnscopables$5 = addToUnscopables$8;

var FIND = 'find';
var SKIPS_HOLES$1 = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES$1 = false; });

// `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find
$$2i({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables$5(FIND);

var $$2h = _export;
var $findIndex$1 = arrayIteration.findIndex;
var addToUnscopables$4 = addToUnscopables$8;

var FIND_INDEX = 'findIndex';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

// `Array.prototype.findIndex` method
// https://tc39.es/ecma262/#sec-array.prototype.findindex
$$2h({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $findIndex$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables$4(FIND_INDEX);

var isArray$3 = isArray$7;
var toLength$o = toLength$v;
var bind$8 = functionBindContext;

// `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var flattenIntoArray$2 = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind$8(mapper, thisArg, 3) : false;
  var element;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray$3(element)) {
        targetIndex = flattenIntoArray$2(target, original, element, toLength$o(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
};

var flattenIntoArray_1 = flattenIntoArray$2;

var $$2g = _export;
var flattenIntoArray$1 = flattenIntoArray_1;
var toObject$g = toObject$o;
var toLength$n = toLength$v;
var toInteger$b = toInteger$e;
var arraySpeciesCreate$2 = arraySpeciesCreate$5;

// `Array.prototype.flat` method
// https://tc39.es/ecma262/#sec-array.prototype.flat
$$2g({ target: 'Array', proto: true }, {
  flat: function flat(/* depthArg = 1 */) {
    var depthArg = arguments.length ? arguments[0] : undefined;
    var O = toObject$g(this);
    var sourceLen = toLength$n(O.length);
    var A = arraySpeciesCreate$2(O, 0);
    A.length = flattenIntoArray$1(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger$b(depthArg));
    return A;
  }
});

var $$2f = _export;
var flattenIntoArray = flattenIntoArray_1;
var toObject$f = toObject$o;
var toLength$m = toLength$v;
var aFunction$e = aFunction$g;
var arraySpeciesCreate$1 = arraySpeciesCreate$5;

// `Array.prototype.flatMap` method
// https://tc39.es/ecma262/#sec-array.prototype.flatmap
$$2f({ target: 'Array', proto: true }, {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject$f(this);
    var sourceLen = toLength$m(O.length);
    var A;
    aFunction$e(callbackfn);
    A = arraySpeciesCreate$1(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return A;
  }
});

var $forEach$1 = arrayIteration.forEach;
var arrayMethodIsStrict$7 = arrayMethodIsStrict$9;

var STRICT_METHOD$7 = arrayMethodIsStrict$7('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
var arrayForEach = !STRICT_METHOD$7 ? function forEach(callbackfn /* , thisArg */) {
  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;

var $$2e = _export;
var forEach$2 = arrayForEach;

// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
$$2e({ target: 'Array', proto: true, forced: [].forEach != forEach$2 }, {
  forEach: forEach$2
});

var anObject$p = anObject$y;
var iteratorClose = iteratorClose$2;

// call something on iterator step with safe closing on error
var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject$p(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator);
    throw error;
  }
};

var bind$7 = functionBindContext;
var toObject$e = toObject$o;
var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
var isArrayIteratorMethod$1 = isArrayIteratorMethod$3;
var toLength$l = toLength$v;
var createProperty$5 = createProperty$7;
var getIteratorMethod$3 = getIteratorMethod$5;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
var arrayFrom$1 = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject$e(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod$3(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind$7(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod$1(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty$5(result, index, value);
    }
  } else {
    length = toLength$l(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty$5(result, index, value);
    }
  }
  result.length = index;
  return result;
};

var wellKnownSymbol$k = wellKnownSymbol$w;

var ITERATOR$6 = wellKnownSymbol$k('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$6] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration$4 = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$6] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var $$2d = _export;
var from = arrayFrom$1;
var checkCorrectnessOfIteration$3 = checkCorrectnessOfIteration$4;

var INCORRECT_ITERATION$1 = !checkCorrectnessOfIteration$3(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$$2d({ target: 'Array', stat: true, forced: INCORRECT_ITERATION$1 }, {
  from: from
});

var $$2c = _export;
var $includes$1 = arrayIncludes.includes;
var addToUnscopables$3 = addToUnscopables$8;

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$$2c({ target: 'Array', proto: true }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes$1(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables$3('includes');

/* eslint-disable es/no-array-prototype-indexof -- required for testing */
var $$2b = _export;
var $indexOf$1 = arrayIncludes.indexOf;
var arrayMethodIsStrict$6 = arrayMethodIsStrict$9;

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO$1 = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD$6 = arrayMethodIsStrict$6('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.indexof
$$2b({ target: 'Array', proto: true, forced: NEGATIVE_ZERO$1 || !STRICT_METHOD$6 }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO$1
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf$1(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $$2a = _export;
var isArray$2 = isArray$7;

// `Array.isArray` method
// https://tc39.es/ecma262/#sec-array.isarray
$$2a({ target: 'Array', stat: true }, {
  isArray: isArray$2
});

var fails$P = fails$_;
var getPrototypeOf$8 = objectGetPrototypeOf$1;
var createNonEnumerableProperty$a = createNonEnumerableProperty$h;
var has$8 = has$k;
var wellKnownSymbol$j = wellKnownSymbol$w;

var ITERATOR$5 = wellKnownSymbol$j('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false;

var returnThis$2 = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$8(getPrototypeOf$8(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$P(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype$2[ITERATOR$5].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!has$8(IteratorPrototype$2, ITERATOR$5)) {
  createNonEnumerableProperty$a(IteratorPrototype$2, ITERATOR$5, returnThis$2);
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var create$7 = objectCreate;
var createPropertyDescriptor$3 = createPropertyDescriptor$9;
var setToStringTag$9 = setToStringTag$b;
var Iterators$2 = iterators;

var returnThis$1 = function () { return this; };

var createIteratorConstructor$3 = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create$7(IteratorPrototype$1, { next: createPropertyDescriptor$3(1, next) });
  setToStringTag$9(IteratorConstructor, TO_STRING_TAG, false);
  Iterators$2[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var $$29 = _export;
var createIteratorConstructor$2 = createIteratorConstructor$3;
var getPrototypeOf$7 = objectGetPrototypeOf$1;
var setPrototypeOf$6 = objectSetPrototypeOf$1;
var setToStringTag$8 = setToStringTag$b;
var createNonEnumerableProperty$9 = createNonEnumerableProperty$h;
var redefine$d = redefine$g.exports;
var wellKnownSymbol$i = wellKnownSymbol$w;
var Iterators$1 = iterators;
var IteratorsCore = iteratorsCore;

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$4 = wellKnownSymbol$i('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

var defineIterator$3 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor$2(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$4]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf$7(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (getPrototypeOf$7(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf$6) {
          setPrototypeOf$6(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
          createNonEnumerableProperty$9(CurrentIteratorPrototype, ITERATOR$4, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag$8(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if (IterablePrototype[ITERATOR$4] !== defaultIterator) {
    createNonEnumerableProperty$9(IterablePrototype, ITERATOR$4, defaultIterator);
  }
  Iterators$1[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine$d(IterablePrototype, KEY, methods[KEY]);
      }
    } else $$29({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

var toIndexedObject$7 = toIndexedObject$d;
var addToUnscopables$2 = addToUnscopables$8;
var Iterators = iterators;
var InternalStateModule$9 = internalState;
var defineIterator$2 = defineIterator$3;

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$9 = InternalStateModule$9.set;
var getInternalState$8 = InternalStateModule$9.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator$2(Array, 'Array', function (iterated, kind) {
  setInternalState$9(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject$7(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$8(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables$2('keys');
addToUnscopables$2('values');
addToUnscopables$2('entries');

var $$28 = _export;
var IndexedObject$2 = indexedObject;
var toIndexedObject$6 = toIndexedObject$d;
var arrayMethodIsStrict$5 = arrayMethodIsStrict$9;

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject$2 != Object;
var STRICT_METHOD$5 = arrayMethodIsStrict$5('join', ',');

// `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join
$$28({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$5 }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject$6(this), separator === undefined ? ',' : separator);
  }
});

/* eslint-disable es/no-array-prototype-lastindexof -- safe */
var toIndexedObject$5 = toIndexedObject$d;
var toInteger$a = toInteger$e;
var toLength$k = toLength$v;
var arrayMethodIsStrict$4 = arrayMethodIsStrict$9;

var min$6 = Math.min;
var $lastIndexOf$1 = [].lastIndexOf;
var NEGATIVE_ZERO = !!$lastIndexOf$1 && 1 / [1].lastIndexOf(1, -0) < 0;
var STRICT_METHOD$4 = arrayMethodIsStrict$4('lastIndexOf');
var FORCED$o = NEGATIVE_ZERO || !STRICT_METHOD$4;

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
var arrayLastIndexOf = FORCED$o ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return $lastIndexOf$1.apply(this, arguments) || 0;
  var O = toIndexedObject$5(this);
  var length = toLength$k(O.length);
  var index = length - 1;
  if (arguments.length > 1) index = min$6(index, toInteger$a(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
  return -1;
} : $lastIndexOf$1;

var $$27 = _export;
var lastIndexOf = arrayLastIndexOf;

// `Array.prototype.lastIndexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
// eslint-disable-next-line es/no-array-prototype-lastindexof -- required for testing
$$27({ target: 'Array', proto: true, forced: lastIndexOf !== [].lastIndexOf }, {
  lastIndexOf: lastIndexOf
});

var $$26 = _export;
var $map$1 = arrayIteration.map;
var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$5;

var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$$26({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $$25 = _export;
var fails$O = fails$_;
var createProperty$4 = createProperty$7;

var ISNT_GENERIC = fails$O(function () {
  function F() { /* empty */ }
  // eslint-disable-next-line es/no-array-of -- required for testing
  return !(Array.of.call(F) instanceof F);
});

// `Array.of` method
// https://tc39.es/ecma262/#sec-array.of
// WebKit Array.of isn't generic
$$25({ target: 'Array', stat: true, forced: ISNT_GENERIC }, {
  of: function of(/* ...args */) {
    var index = 0;
    var argumentsLength = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(argumentsLength);
    while (argumentsLength > index) createProperty$4(result, index, arguments[index++]);
    result.length = argumentsLength;
    return result;
  }
});

var aFunction$d = aFunction$g;
var toObject$d = toObject$o;
var IndexedObject$1 = indexedObject;
var toLength$j = toLength$v;

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod$4 = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction$d(callbackfn);
    var O = toObject$d(that);
    var self = IndexedObject$1(O);
    var length = toLength$j(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod$4(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod$4(true)
};

var classof$9 = classofRaw$1;
var global$w = global$K;

var engineIsNode = classof$9(global$w.process) == 'process';

var $$24 = _export;
var $reduce$1 = arrayReduce.left;
var arrayMethodIsStrict$3 = arrayMethodIsStrict$9;
var CHROME_VERSION$1 = engineV8Version;
var IS_NODE$5 = engineIsNode;

var STRICT_METHOD$3 = arrayMethodIsStrict$3('reduce');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG$1 = !IS_NODE$5 && CHROME_VERSION$1 > 79 && CHROME_VERSION$1 < 83;

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$$24({ target: 'Array', proto: true, forced: !STRICT_METHOD$3 || CHROME_BUG$1 }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce$1(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $$23 = _export;
var $reduceRight$1 = arrayReduce.right;
var arrayMethodIsStrict$2 = arrayMethodIsStrict$9;
var CHROME_VERSION = engineV8Version;
var IS_NODE$4 = engineIsNode;

var STRICT_METHOD$2 = arrayMethodIsStrict$2('reduceRight');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE$4 && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduceRight` method
// https://tc39.es/ecma262/#sec-array.prototype.reduceright
$$23({ target: 'Array', proto: true, forced: !STRICT_METHOD$2 || CHROME_BUG }, {
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduceRight$1(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $$22 = _export;
var isArray$1 = isArray$7;

var nativeReverse = [].reverse;
var test$1 = [1, 2];

// `Array.prototype.reverse` method
// https://tc39.es/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794
$$22({ target: 'Array', proto: true, forced: String(test$1) === String(test$1.reverse()) }, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign -- dirty hack
    if (isArray$1(this)) this.length = this.length;
    return nativeReverse.call(this);
  }
});

var $$21 = _export;
var isObject$o = isObject$y;
var isArray = isArray$7;
var toAbsoluteIndex$4 = toAbsoluteIndex$8;
var toLength$i = toLength$v;
var toIndexedObject$4 = toIndexedObject$d;
var createProperty$3 = createProperty$7;
var wellKnownSymbol$h = wellKnownSymbol$w;
var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$5;

var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('slice');

var SPECIES$4 = wellKnownSymbol$h('species');
var nativeSlice = [].slice;
var max$4 = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$$21({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
  slice: function slice(start, end) {
    var O = toIndexedObject$4(this);
    var length = toLength$i(O.length);
    var k = toAbsoluteIndex$4(start, length);
    var fin = toAbsoluteIndex$4(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject$o(Constructor)) {
        Constructor = Constructor[SPECIES$4];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max$4(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty$3(result, n, O[k]);
    result.length = n;
    return result;
  }
});

var $$20 = _export;
var $some$1 = arrayIteration.some;
var arrayMethodIsStrict$1 = arrayMethodIsStrict$9;

var STRICT_METHOD$1 = arrayMethodIsStrict$1('some');

// `Array.prototype.some` method
// https://tc39.es/ecma262/#sec-array.prototype.some
$$20({ target: 'Array', proto: true, forced: !STRICT_METHOD$1 }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// TODO: use something more complex like timsort?
var floor$9 = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor$9(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(
    mergeSort(array.slice(0, middle), comparefn),
    mergeSort(array.slice(middle), comparefn),
    comparefn
  );
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];
    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }
    if (j !== i++) array[j] = element;
  } return array;
};

var merge = function (left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;
  var result = [];

  while (lindex < llength || rindex < rlength) {
    if (lindex < llength && rindex < rlength) {
      result.push(comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]);
    } else {
      result.push(lindex < llength ? left[lindex++] : right[rindex++]);
    }
  } return result;
};

var arraySort = mergeSort;

var userAgent$5 = engineUserAgent;

var firefox = userAgent$5.match(/firefox\/(\d+)/i);

var engineFfVersion = !!firefox && +firefox[1];

var UA = engineUserAgent;

var engineIsIeOrEdge = /MSIE|Trident/.test(UA);

var userAgent$4 = engineUserAgent;

var webkit = userAgent$4.match(/AppleWebKit\/(\d+)\./);

var engineWebkitVersion = !!webkit && +webkit[1];

var $$1$ = _export;
var aFunction$c = aFunction$g;
var toObject$c = toObject$o;
var toLength$h = toLength$v;
var fails$N = fails$_;
var internalSort$1 = arraySort;
var arrayMethodIsStrict = arrayMethodIsStrict$9;
var FF$1 = engineFfVersion;
var IE_OR_EDGE$1 = engineIsIeOrEdge;
var V8$1 = engineV8Version;
var WEBKIT$2 = engineWebkitVersion;

var test = [];
var nativeSort$1 = test.sort;

// IE8-
var FAILS_ON_UNDEFINED = fails$N(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails$N(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var STABLE_SORT$1 = !fails$N(function () {
  // feature detection can be too slow, so check engines versions
  if (V8$1) return V8$1 < 70;
  if (FF$1 && FF$1 > 3) return;
  if (IE_OR_EDGE$1) return true;
  if (WEBKIT$2) return WEBKIT$2 < 603;

  var result = '';
  var code, chr, value, index;

  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);

    switch (code) {
      case 66: case 69: case 70: case 72: value = 3; break;
      case 68: case 71: value = 4; break;
      default: value = 2;
    }

    for (index = 0; index < 47; index++) {
      test.push({ k: chr + index, v: value });
    }
  }

  test.sort(function (a, b) { return b.v - a.v; });

  for (index = 0; index < test.length; index++) {
    chr = test[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr) result += chr;
  }

  return result !== 'DGBEFHACIJK';
});

var FORCED$n = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT$1;

var getSortCompare$1 = function (comparefn) {
  return function (x, y) {
    if (y === undefined) return -1;
    if (x === undefined) return 1;
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    return String(x) > String(y) ? 1 : -1;
  };
};

// `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort
$$1$({ target: 'Array', proto: true, forced: FORCED$n }, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aFunction$c(comparefn);

    var array = toObject$c(this);

    if (STABLE_SORT$1) return comparefn === undefined ? nativeSort$1.call(array) : nativeSort$1.call(array, comparefn);

    var items = [];
    var arrayLength = toLength$h(array.length);
    var itemsLength, index;

    for (index = 0; index < arrayLength; index++) {
      if (index in array) items.push(array[index]);
    }

    items = internalSort$1(items, getSortCompare$1(comparefn));
    itemsLength = items.length;
    index = 0;

    while (index < itemsLength) array[index] = items[index++];
    while (index < arrayLength) delete array[index++];

    return array;
  }
});

var getBuiltIn$8 = getBuiltIn$d;
var definePropertyModule$6 = objectDefineProperty;
var wellKnownSymbol$g = wellKnownSymbol$w;
var DESCRIPTORS$o = descriptors;

var SPECIES$3 = wellKnownSymbol$g('species');

var setSpecies$6 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$8(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule$6.f;

  if (DESCRIPTORS$o && Constructor && !Constructor[SPECIES$3]) {
    defineProperty(Constructor, SPECIES$3, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var setSpecies$5 = setSpecies$6;

// `Array[@@species]` getter
// https://tc39.es/ecma262/#sec-get-array-@@species
setSpecies$5('Array');

var $$1_ = _export;
var toAbsoluteIndex$3 = toAbsoluteIndex$8;
var toInteger$9 = toInteger$e;
var toLength$g = toLength$v;
var toObject$b = toObject$o;
var arraySpeciesCreate = arraySpeciesCreate$5;
var createProperty$2 = createProperty$7;
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$5;

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

var max$3 = Math.max;
var min$5 = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$$1_({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject$b(this);
    var len = toLength$g(O.length);
    var actualStart = toAbsoluteIndex$3(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min$5(max$3(toInteger$9(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty$2(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables$1 = addToUnscopables$8;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables$1('flat');

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = addToUnscopables$8;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('flatMap');

// eslint-disable-next-line es/no-typed-arrays -- safe
var arrayBufferNative = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined';

var redefine$c = redefine$g.exports;

var redefineAll$6 = function (target, src, options) {
  for (var key in src) redefine$c(target, key, src[key], options);
  return target;
};

var anInstance$8 = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};

var toInteger$8 = toInteger$e;
var toLength$f = toLength$v;

// `ToIndex` abstract operation
// https://tc39.es/ecma262/#sec-toindex
var toIndex$2 = function (it) {
  if (it === undefined) return 0;
  var number = toInteger$8(it);
  var length = toLength$f(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};

// IEEE754 conversions based on https://github.com/feross/ieee754
var abs$7 = Math.abs;
var pow$4 = Math.pow;
var floor$8 = Math.floor;
var log$8 = Math.log;
var LN2$2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = new Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow$4(2, -24) - pow$4(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs$7(number);
  // eslint-disable-next-line no-self-compare -- NaN check
  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare -- NaN check
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor$8(log$8(number) / LN2$2);
    if (number * (c = pow$4(2, -exponent)) < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow$4(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow$4(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow$4(2, eBias - 1) * pow$4(2, mantissaLength);
      exponent = 0;
    }
  }
  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
  buffer[--index] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow$4(2, mantissaLength);
    exponent = exponent - eBias;
  } return (sign ? -1 : 1) * mantissa * pow$4(2, exponent - mantissaLength);
};

var ieee754 = {
  pack: pack,
  unpack: unpack
};

var global$v = global$K;
var DESCRIPTORS$n = descriptors;
var NATIVE_ARRAY_BUFFER$2 = arrayBufferNative;
var createNonEnumerableProperty$8 = createNonEnumerableProperty$h;
var redefineAll$5 = redefineAll$6;
var fails$M = fails$_;
var anInstance$7 = anInstance$8;
var toInteger$7 = toInteger$e;
var toLength$e = toLength$v;
var toIndex$1 = toIndex$2;
var IEEE754 = ieee754;
var getPrototypeOf$6 = objectGetPrototypeOf$1;
var setPrototypeOf$5 = objectSetPrototypeOf$1;
var getOwnPropertyNames$4 = objectGetOwnPropertyNames.f;
var defineProperty$9 = objectDefineProperty.f;
var arrayFill = arrayFill$1;
var setToStringTag$7 = setToStringTag$b;
var InternalStateModule$8 = internalState;

var getInternalState$7 = InternalStateModule$8.get;
var setInternalState$8 = InternalStateModule$8.set;
var ARRAY_BUFFER$1 = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH$1 = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer$1 = global$v[ARRAY_BUFFER$1];
var $ArrayBuffer = NativeArrayBuffer$1;
var $DataView = global$v[DATA_VIEW];
var $DataViewPrototype = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype$1 = Object.prototype;
var RangeError$2 = global$v.RangeError;

var packIEEE754 = IEEE754.pack;
var unpackIEEE754 = IEEE754.unpack;

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter$1 = function (Constructor, key) {
  defineProperty$9(Constructor[PROTOTYPE], key, { get: function () { return getInternalState$7(this)[key]; } });
};

var get$1 = function (view, count, index, isLittleEndian) {
  var intIndex = toIndex$1(index);
  var store = getInternalState$7(view);
  if (intIndex + count > store.byteLength) throw RangeError$2(WRONG_INDEX);
  var bytes = getInternalState$7(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = bytes.slice(start, start + count);
  return isLittleEndian ? pack : pack.reverse();
};

var set$2 = function (view, count, index, conversion, value, isLittleEndian) {
  var intIndex = toIndex$1(index);
  var store = getInternalState$7(view);
  if (intIndex + count > store.byteLength) throw RangeError$2(WRONG_INDEX);
  var bytes = getInternalState$7(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);
  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER$2) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance$7(this, $ArrayBuffer, ARRAY_BUFFER$1);
    var byteLength = toIndex$1(length);
    setInternalState$8(this, {
      bytes: arrayFill.call(new Array(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS$n) this.byteLength = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance$7(this, $DataView, DATA_VIEW);
    anInstance$7(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = getInternalState$7(buffer).byteLength;
    var offset = toInteger$7(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError$2('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength$e(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError$2(WRONG_LENGTH$1);
    setInternalState$8(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });
    if (!DESCRIPTORS$n) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  if (DESCRIPTORS$n) {
    addGetter$1($ArrayBuffer, 'byteLength');
    addGetter$1($DataView, 'buffer');
    addGetter$1($DataView, 'byteLength');
    addGetter$1($DataView, 'byteOffset');
  }

  redefineAll$5($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get$1(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get$1(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get$1(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get$1(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get$1(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set$2(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set$2(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set$2(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set$2(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set$2(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set$2(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set$2(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set$2(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
} else {
  /* eslint-disable no-new -- required for testing */
  if (!fails$M(function () {
    NativeArrayBuffer$1(1);
  }) || !fails$M(function () {
    new NativeArrayBuffer$1(-1);
  }) || fails$M(function () {
    new NativeArrayBuffer$1();
    new NativeArrayBuffer$1(1.5);
    new NativeArrayBuffer$1(NaN);
    return NativeArrayBuffer$1.name != ARRAY_BUFFER$1;
  })) {
  /* eslint-enable no-new -- required for testing */
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance$7(this, $ArrayBuffer);
      return new NativeArrayBuffer$1(toIndex$1(length));
    };
    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE] = NativeArrayBuffer$1[PROTOTYPE];
    for (var keys$2 = getOwnPropertyNames$4(NativeArrayBuffer$1), j$1 = 0, key$1; keys$2.length > j$1;) {
      if (!((key$1 = keys$2[j$1++]) in $ArrayBuffer)) {
        createNonEnumerableProperty$8($ArrayBuffer, key$1, NativeArrayBuffer$1[key$1]);
      }
    }
    ArrayBufferPrototype.constructor = $ArrayBuffer;
  }

  // WebKit bug - the same parent prototype for typed arrays and data view
  if (setPrototypeOf$5 && getPrototypeOf$6($DataViewPrototype) !== ObjectPrototype$1) {
    setPrototypeOf$5($DataViewPrototype, ObjectPrototype$1);
  }

  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataViewPrototype.setInt8;
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll$5($DataViewPrototype, {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag$7($ArrayBuffer, ARRAY_BUFFER$1);
setToStringTag$7($DataView, DATA_VIEW);

var arrayBuffer = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};

var $$1Z = _export;
var global$u = global$K;
var arrayBufferModule = arrayBuffer;
var setSpecies$4 = setSpecies$6;

var ARRAY_BUFFER = 'ArrayBuffer';
var ArrayBuffer$4 = arrayBufferModule[ARRAY_BUFFER];
var NativeArrayBuffer = global$u[ARRAY_BUFFER];

// `ArrayBuffer` constructor
// https://tc39.es/ecma262/#sec-arraybuffer-constructor
$$1Z({ global: true, forced: NativeArrayBuffer !== ArrayBuffer$4 }, {
  ArrayBuffer: ArrayBuffer$4
});

setSpecies$4(ARRAY_BUFFER);

var NATIVE_ARRAY_BUFFER$1 = arrayBufferNative;
var DESCRIPTORS$m = descriptors;
var global$t = global$K;
var isObject$n = isObject$y;
var has$7 = has$k;
var classof$8 = classof$b;
var createNonEnumerableProperty$7 = createNonEnumerableProperty$h;
var redefine$b = redefine$g.exports;
var defineProperty$8 = objectDefineProperty.f;
var getPrototypeOf$5 = objectGetPrototypeOf$1;
var setPrototypeOf$4 = objectSetPrototypeOf$1;
var wellKnownSymbol$f = wellKnownSymbol$w;
var uid$1 = uid$5;

var Int8Array$3 = global$t.Int8Array;
var Int8ArrayPrototype = Int8Array$3 && Int8Array$3.prototype;
var Uint8ClampedArray = global$t.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray$1 = Int8Array$3 && getPrototypeOf$5(Int8Array$3);
var TypedArrayPrototype$1 = Int8ArrayPrototype && getPrototypeOf$5(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var isPrototypeOf = ObjectPrototype.isPrototypeOf;

var TO_STRING_TAG$1 = wellKnownSymbol$f('toStringTag');
var TYPED_ARRAY_TAG$1 = uid$1('TYPED_ARRAY_TAG');
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS$3 = NATIVE_ARRAY_BUFFER$1 && !!setPrototypeOf$4 && classof$8(global$t.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQIRED = false;
var NAME$1;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};

var isView = function isView(it) {
  if (!isObject$n(it)) return false;
  var klass = classof$8(it);
  return klass === 'DataView'
    || has$7(TypedArrayConstructorsList, klass)
    || has$7(BigIntArrayConstructorsList, klass);
};

var isTypedArray$1 = function (it) {
  if (!isObject$n(it)) return false;
  var klass = classof$8(it);
  return has$7(TypedArrayConstructorsList, klass)
    || has$7(BigIntArrayConstructorsList, klass);
};

var aTypedArray$m = function (it) {
  if (isTypedArray$1(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor$6 = function (C) {
  if (setPrototypeOf$4) {
    if (isPrototypeOf.call(TypedArray$1, C)) return C;
  } else for (var ARRAY in TypedArrayConstructorsList) if (has$7(TypedArrayConstructorsList, NAME$1)) {
    var TypedArrayConstructor = global$t[ARRAY];
    if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
      return C;
    }
  } throw TypeError('Target is not a typed array constructor');
};

var exportTypedArrayMethod$n = function (KEY, property, forced) {
  if (!DESCRIPTORS$m) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global$t[ARRAY];
    if (TypedArrayConstructor && has$7(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) { /* empty */ }
  }
  if (!TypedArrayPrototype$1[KEY] || forced) {
    redefine$b(TypedArrayPrototype$1, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS$3 && Int8ArrayPrototype[KEY] || property);
  }
};

var exportTypedArrayStaticMethod$2 = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS$m) return;
  if (setPrototypeOf$4) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global$t[ARRAY];
      if (TypedArrayConstructor && has$7(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) { /* empty */ }
    }
    if (!TypedArray$1[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return redefine$b(TypedArray$1, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$3 && TypedArray$1[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global$t[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      redefine$b(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME$1 in TypedArrayConstructorsList) {
  if (!global$t[NAME$1]) NATIVE_ARRAY_BUFFER_VIEWS$3 = false;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS$3 || typeof TypedArray$1 != 'function' || TypedArray$1 === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray$1 = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS$3) for (NAME$1 in TypedArrayConstructorsList) {
    if (global$t[NAME$1]) setPrototypeOf$4(global$t[NAME$1], TypedArray$1);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS$3 || !TypedArrayPrototype$1 || TypedArrayPrototype$1 === ObjectPrototype) {
  TypedArrayPrototype$1 = TypedArray$1.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS$3) for (NAME$1 in TypedArrayConstructorsList) {
    if (global$t[NAME$1]) setPrototypeOf$4(global$t[NAME$1].prototype, TypedArrayPrototype$1);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS$3 && getPrototypeOf$5(Uint8ClampedArrayPrototype) !== TypedArrayPrototype$1) {
  setPrototypeOf$4(Uint8ClampedArrayPrototype, TypedArrayPrototype$1);
}

if (DESCRIPTORS$m && !has$7(TypedArrayPrototype$1, TO_STRING_TAG$1)) {
  TYPED_ARRAY_TAG_REQIRED = true;
  defineProperty$8(TypedArrayPrototype$1, TO_STRING_TAG$1, { get: function () {
    return isObject$n(this) ? this[TYPED_ARRAY_TAG$1] : undefined;
  } });
  for (NAME$1 in TypedArrayConstructorsList) if (global$t[NAME$1]) {
    createNonEnumerableProperty$7(global$t[NAME$1], TYPED_ARRAY_TAG$1, NAME$1);
  }
}

var arrayBufferViewCore = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS$3,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG$1,
  aTypedArray: aTypedArray$m,
  aTypedArrayConstructor: aTypedArrayConstructor$6,
  exportTypedArrayMethod: exportTypedArrayMethod$n,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod$2,
  isView: isView,
  isTypedArray: isTypedArray$1,
  TypedArray: TypedArray$1,
  TypedArrayPrototype: TypedArrayPrototype$1
};

var $$1Y = _export;
var ArrayBufferViewCore$o = arrayBufferViewCore;

var NATIVE_ARRAY_BUFFER_VIEWS$2 = ArrayBufferViewCore$o.NATIVE_ARRAY_BUFFER_VIEWS;

// `ArrayBuffer.isView` method
// https://tc39.es/ecma262/#sec-arraybuffer.isview
$$1Y({ target: 'ArrayBuffer', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS$2 }, {
  isView: ArrayBufferViewCore$o.isView
});

var anObject$o = anObject$y;
var aFunction$b = aFunction$g;
var wellKnownSymbol$e = wellKnownSymbol$w;

var SPECIES$2 = wellKnownSymbol$e('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
var speciesConstructor$9 = function (O, defaultConstructor) {
  var C = anObject$o(O).constructor;
  var S;
  return C === undefined || (S = anObject$o(C)[SPECIES$2]) == undefined ? defaultConstructor : aFunction$b(S);
};

var $$1X = _export;
var fails$L = fails$_;
var ArrayBufferModule$2 = arrayBuffer;
var anObject$n = anObject$y;
var toAbsoluteIndex$2 = toAbsoluteIndex$8;
var toLength$d = toLength$v;
var speciesConstructor$8 = speciesConstructor$9;

var ArrayBuffer$3 = ArrayBufferModule$2.ArrayBuffer;
var DataView$2 = ArrayBufferModule$2.DataView;
var nativeArrayBufferSlice = ArrayBuffer$3.prototype.slice;

var INCORRECT_SLICE = fails$L(function () {
  return !new ArrayBuffer$3(2).slice(1, undefined).byteLength;
});

// `ArrayBuffer.prototype.slice` method
// https://tc39.es/ecma262/#sec-arraybuffer.prototype.slice
$$1X({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
  slice: function slice(start, end) {
    if (nativeArrayBufferSlice !== undefined && end === undefined) {
      return nativeArrayBufferSlice.call(anObject$n(this), start); // FF fix
    }
    var length = anObject$n(this).byteLength;
    var first = toAbsoluteIndex$2(start, length);
    var fin = toAbsoluteIndex$2(end === undefined ? length : end, length);
    var result = new (speciesConstructor$8(this, ArrayBuffer$3))(toLength$d(fin - first));
    var viewSource = new DataView$2(this);
    var viewTarget = new DataView$2(result);
    var index = 0;
    while (first < fin) {
      viewTarget.setUint8(index++, viewSource.getUint8(first++));
    } return result;
  }
});

var $$1W = _export;
var ArrayBufferModule$1 = arrayBuffer;
var NATIVE_ARRAY_BUFFER = arrayBufferNative;

// `DataView` constructor
// https://tc39.es/ecma262/#sec-dataview-constructor
$$1W({ global: true, forced: !NATIVE_ARRAY_BUFFER }, {
  DataView: ArrayBufferModule$1.DataView
});

var $$1V = _export;

var getFullYear = Date.prototype.getFullYear;

// `Date.prototype.getYear` method
// https://tc39.es/ecma262/#sec-date.prototype.getyear
$$1V({ target: 'Date', proto: true }, {
  getYear: function getYear() {
    return getFullYear.call(this) - 1900;
  }
});

var $$1U = _export;

// `Date.now` method
// https://tc39.es/ecma262/#sec-date.now
$$1U({ target: 'Date', stat: true }, {
  now: function now() {
    return new Date().getTime();
  }
});

var $$1T = _export;
var toInteger$6 = toInteger$e;

var getTime$2 = Date.prototype.getTime;
var setFullYear = Date.prototype.setFullYear;

// `Date.prototype.setYear` method
// https://tc39.es/ecma262/#sec-date.prototype.setyear
$$1T({ target: 'Date', proto: true }, {
  setYear: function setYear(year) {
    // validate
    getTime$2.call(this);
    var yi = toInteger$6(year);
    var yyyy = 0 <= yi && yi <= 99 ? yi + 1900 : yi;
    return setFullYear.call(this, yyyy);
  }
});

var $$1S = _export;

// `Date.prototype.toGMTString` method
// https://tc39.es/ecma262/#sec-date.prototype.togmtstring
$$1S({ target: 'Date', proto: true }, {
  toGMTString: Date.prototype.toUTCString
});

var toInteger$5 = toInteger$e;
var requireObjectCoercible$e = requireObjectCoercible$h;

// `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat
var stringRepeat = function repeat(count) {
  var str = String(requireObjectCoercible$e(this));
  var result = '';
  var n = toInteger$5(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};

// https://github.com/tc39/proposal-string-pad-start-end
var toLength$c = toLength$v;
var repeat$2 = stringRepeat;
var requireObjectCoercible$d = requireObjectCoercible$h;

var ceil$1 = Math.ceil;

// `String.prototype.{ padStart, padEnd }` methods implementation
var createMethod$3 = function (IS_END) {
  return function ($this, maxLength, fillString) {
    var S = String(requireObjectCoercible$d($this));
    var stringLength = S.length;
    var fillStr = fillString === undefined ? ' ' : String(fillString);
    var intMaxLength = toLength$c(maxLength);
    var fillLen, stringFiller;
    if (intMaxLength <= stringLength || fillStr == '') return S;
    fillLen = intMaxLength - stringLength;
    stringFiller = repeat$2.call(fillStr, ceil$1(fillLen / fillStr.length));
    if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
    return IS_END ? S + stringFiller : stringFiller + S;
  };
};

var stringPad = {
  // `String.prototype.padStart` method
  // https://tc39.es/ecma262/#sec-string.prototype.padstart
  start: createMethod$3(false),
  // `String.prototype.padEnd` method
  // https://tc39.es/ecma262/#sec-string.prototype.padend
  end: createMethod$3(true)
};

var fails$K = fails$_;
var padStart = stringPad.start;

var abs$6 = Math.abs;
var DatePrototype$2 = Date.prototype;
var getTime$1 = DatePrototype$2.getTime;
var nativeDateToISOString = DatePrototype$2.toISOString;

// `Date.prototype.toISOString` method implementation
// https://tc39.es/ecma262/#sec-date.prototype.toisostring
// PhantomJS / old WebKit fails here:
var dateToIsoString = (fails$K(function () {
  return nativeDateToISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails$K(function () {
  nativeDateToISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime$1.call(this))) throw RangeError('Invalid time value');
  var date = this;
  var year = date.getUTCFullYear();
  var milliseconds = date.getUTCMilliseconds();
  var sign = year < 0 ? '-' : year > 9999 ? '+' : '';
  return sign + padStart(abs$6(year), sign ? 6 : 4, 0) +
    '-' + padStart(date.getUTCMonth() + 1, 2, 0) +
    '-' + padStart(date.getUTCDate(), 2, 0) +
    'T' + padStart(date.getUTCHours(), 2, 0) +
    ':' + padStart(date.getUTCMinutes(), 2, 0) +
    ':' + padStart(date.getUTCSeconds(), 2, 0) +
    '.' + padStart(milliseconds, 3, 0) +
    'Z';
} : nativeDateToISOString;

var $$1R = _export;
var toISOString = dateToIsoString;

// `Date.prototype.toISOString` method
// https://tc39.es/ecma262/#sec-date.prototype.toisostring
// PhantomJS / old WebKit has a broken implementations
$$1R({ target: 'Date', proto: true, forced: Date.prototype.toISOString !== toISOString }, {
  toISOString: toISOString
});

var $$1Q = _export;
var fails$J = fails$_;
var toObject$a = toObject$o;
var toPrimitive$6 = toPrimitive$b;

var FORCED$m = fails$J(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
});

// `Date.prototype.toJSON` method
// https://tc39.es/ecma262/#sec-date.prototype.tojson
$$1Q({ target: 'Date', proto: true, forced: FORCED$m }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  toJSON: function toJSON(key) {
    var O = toObject$a(this);
    var pv = toPrimitive$6(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

var anObject$m = anObject$y;
var toPrimitive$5 = toPrimitive$b;

// `Date.prototype[@@toPrimitive](hint)` method implementation
// https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive
var dateToPrimitive$1 = function (hint) {
  if (hint !== 'string' && hint !== 'number' && hint !== 'default') {
    throw TypeError('Incorrect hint');
  } return toPrimitive$5(anObject$m(this), hint !== 'number');
};

var createNonEnumerableProperty$6 = createNonEnumerableProperty$h;
var dateToPrimitive = dateToPrimitive$1;
var wellKnownSymbol$d = wellKnownSymbol$w;

var TO_PRIMITIVE = wellKnownSymbol$d('toPrimitive');
var DatePrototype$1 = Date.prototype;

// `Date.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive
if (!(TO_PRIMITIVE in DatePrototype$1)) {
  createNonEnumerableProperty$6(DatePrototype$1, TO_PRIMITIVE, dateToPrimitive);
}

var redefine$a = redefine$g.exports;

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING$1 = 'toString';
var nativeDateToString = DatePrototype[TO_STRING$1];
var getTime = DatePrototype.getTime;

// `Date.prototype.toString` method
// https://tc39.es/ecma262/#sec-date.prototype.tostring
if (new Date(NaN) + '' != INVALID_DATE) {
  redefine$a(DatePrototype, TO_STRING$1, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare -- NaN check
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}

var $$1P = _export;

var raw = /[\w*+\-./@]/;

var hex$1 = function (code, length) {
  var result = code.toString(16);
  while (result.length < length) result = '0' + result;
  return result;
};

// `escape` method
// https://tc39.es/ecma262/#sec-escape-string
$$1P({ global: true }, {
  escape: function escape(string) {
    var str = String(string);
    var result = '';
    var length = str.length;
    var index = 0;
    var chr, code;
    while (index < length) {
      chr = str.charAt(index++);
      if (raw.test(chr)) {
        result += chr;
      } else {
        code = chr.charCodeAt(0);
        if (code < 256) {
          result += '%' + hex$1(code, 2);
        } else {
          result += '%u' + hex$1(code, 4).toUpperCase();
        }
      }
    } return result;
  }
});

var aFunction$a = aFunction$g;
var isObject$m = isObject$y;

var slice$2 = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func -- we have no proper alternatives, IE8- only
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
var functionBind = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction$a(this);
  var partArgs = slice$2.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice$2.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject$m(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};

var $$1O = _export;
var bind$6 = functionBind;

// `Function.prototype.bind` method
// https://tc39.es/ecma262/#sec-function.prototype.bind
$$1O({ target: 'Function', proto: true }, {
  bind: bind$6
});

var isObject$l = isObject$y;
var definePropertyModule$5 = objectDefineProperty;
var getPrototypeOf$4 = objectGetPrototypeOf$1;
var wellKnownSymbol$c = wellKnownSymbol$w;

var HAS_INSTANCE = wellKnownSymbol$c('hasInstance');
var FunctionPrototype$1 = Function.prototype;

// `Function.prototype[@@hasInstance]` method
// https://tc39.es/ecma262/#sec-function.prototype-@@hasinstance
if (!(HAS_INSTANCE in FunctionPrototype$1)) {
  definePropertyModule$5.f(FunctionPrototype$1, HAS_INSTANCE, { value: function (O) {
    if (typeof this != 'function' || !isObject$l(O)) return false;
    if (!isObject$l(this.prototype)) return O instanceof this;
    // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
    while (O = getPrototypeOf$4(O)) if (this.prototype === O) return true;
    return false;
  } });
}

var DESCRIPTORS$l = descriptors;
var defineProperty$7 = objectDefineProperty.f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS$l && !(NAME in FunctionPrototype)) {
  defineProperty$7(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}

var $$1N = _export;
var global$s = global$K;

// `globalThis` object
// https://tc39.es/ecma262/#sec-globalthis
$$1N({ global: true }, {
  globalThis: global$s
});

var $$1M = _export;
var getBuiltIn$7 = getBuiltIn$d;
var fails$I = fails$_;

var $stringify = getBuiltIn$7('JSON', 'stringify');
var re = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var fix = function (match, offset, string) {
  var prev = string.charAt(offset - 1);
  var next = string.charAt(offset + 1);
  if ((low.test(match) && !hi.test(next)) || (hi.test(match) && !low.test(prev))) {
    return '\\u' + match.charCodeAt(0).toString(16);
  } return match;
};

var FORCED$l = fails$I(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

if ($stringify) {
  // `JSON.stringify` method
  // https://tc39.es/ecma262/#sec-json.stringify
  // https://github.com/tc39/proposal-well-formed-stringify
  $$1M({ target: 'JSON', stat: true, forced: FORCED$l }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var result = $stringify.apply(null, arguments);
      return typeof result == 'string' ? result.replace(re, fix) : result;
    }
  });
}

var global$r = global$K;
var setToStringTag$6 = setToStringTag$b;

// JSON[@@toStringTag] property
// https://tc39.es/ecma262/#sec-json-@@tostringtag
setToStringTag$6(global$r.JSON, 'JSON', true);

var internalMetadata = {exports: {}};

var fails$H = fails$_;

var freezing = !fails$H(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});

var hiddenKeys = hiddenKeys$6;
var isObject$k = isObject$y;
var has$6 = has$k;
var defineProperty$6 = objectDefineProperty.f;
var uid = uid$5;
var FREEZING$4 = freezing;

var METADATA = uid('meta');
var id$1 = 0;

// eslint-disable-next-line es/no-object-isextensible -- safe
var isExtensible$1 = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty$6(it, METADATA, { value: {
    objectID: 'O' + ++id$1, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey$1 = function (it, create) {
  // return a primitive with prefix
  if (!isObject$k(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has$6(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible$1(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData$1 = function (it, create) {
  if (!has$6(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible$1(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze$3 = function (it) {
  if (FREEZING$4 && meta.REQUIRED && isExtensible$1(it) && !has$6(it, METADATA)) setMetadata(it);
  return it;
};

var meta = internalMetadata.exports = {
  REQUIRED: false,
  fastKey: fastKey$1,
  getWeakData: getWeakData$1,
  onFreeze: onFreeze$3
};

hiddenKeys[METADATA] = true;

var isObject$j = isObject$y;
var setPrototypeOf$3 = objectSetPrototypeOf$1;

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired$4 = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf$3 &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject$j(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf$3($this, NewTargetPrototype);
  return $this;
};

var $$1L = _export;
var global$q = global$K;
var isForced$3 = isForced_1;
var redefine$9 = redefine$g.exports;
var InternalMetadataModule$1 = internalMetadata.exports;
var iterate$6 = iterate$8;
var anInstance$6 = anInstance$8;
var isObject$i = isObject$y;
var fails$G = fails$_;
var checkCorrectnessOfIteration$2 = checkCorrectnessOfIteration$4;
var setToStringTag$5 = setToStringTag$b;
var inheritIfRequired$3 = inheritIfRequired$4;

var collection$4 = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global$q[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine$9(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        nativeMethod.call(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject$i(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject$i(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject$i(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        nativeMethod.call(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  var REPLACE = isForced$3(
    CONSTRUCTOR_NAME,
    typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails$G(function () {
      new NativeConstructor().entries().next();
    }))
  );

  if (REPLACE) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule$1.REQUIRED = true;
  } else if (isForced$3(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails$G(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new -- required for testing
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration$2(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails$G(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance$6(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired$3(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate$6(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $$1L({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag$5(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};

var defineProperty$5 = objectDefineProperty.f;
var create$6 = objectCreate;
var redefineAll$4 = redefineAll$6;
var bind$5 = functionBindContext;
var anInstance$5 = anInstance$8;
var iterate$5 = iterate$8;
var defineIterator$1 = defineIterator$3;
var setSpecies$3 = setSpecies$6;
var DESCRIPTORS$k = descriptors;
var fastKey = internalMetadata.exports.fastKey;
var InternalStateModule$7 = internalState;

var setInternalState$7 = InternalStateModule$7.set;
var internalStateGetterFor$1 = InternalStateModule$7.getterFor;

var collectionStrong$2 = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance$5(that, C, CONSTRUCTOR_NAME);
      setInternalState$7(that, {
        type: CONSTRUCTOR_NAME,
        index: create$6(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS$k) that.size = 0;
      if (iterable != undefined) iterate$5(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS$k) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll$4(C.prototype, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS$k) state.size = 0;
        else that.size = 0;
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS$k) state.size--;
          else that.size--;
        } return !!entry;
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind$5(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll$4(C.prototype, IS_MAP ? {
      // `Map.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-map.prototype.get
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // `Map.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-map.prototype.set
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // `Set.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-set.prototype.add
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS$k) defineProperty$5(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor$1(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor$1(ITERATOR_NAME);
    // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
    // https://tc39.es/ecma262/#sec-map.prototype.entries
    // https://tc39.es/ecma262/#sec-map.prototype.keys
    // https://tc39.es/ecma262/#sec-map.prototype.values
    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
    // https://tc39.es/ecma262/#sec-set.prototype.entries
    // https://tc39.es/ecma262/#sec-set.prototype.keys
    // https://tc39.es/ecma262/#sec-set.prototype.values
    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
    defineIterator$1(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState$7(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // `{ Map, Set }.prototype[@@species]` accessors
    // https://tc39.es/ecma262/#sec-get-map-@@species
    // https://tc39.es/ecma262/#sec-get-set-@@species
    setSpecies$3(CONSTRUCTOR_NAME);
  }
};

var collection$3 = collection$4;
var collectionStrong$1 = collectionStrong$2;

// `Map` constructor
// https://tc39.es/ecma262/#sec-map-objects
collection$3('Map', function (init) {
  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong$1);

var log$7 = Math.log;

// `Math.log1p` method implementation
// https://tc39.es/ecma262/#sec-math.log1p
// eslint-disable-next-line es/no-math-log1p -- safe
var mathLog1p = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log$7(1 + x);
};

var $$1K = _export;
var log1p$1 = mathLog1p;

// eslint-disable-next-line es/no-math-acosh -- required for testing
var $acosh = Math.acosh;
var log$6 = Math.log;
var sqrt$2 = Math.sqrt;
var LN2$1 = Math.LN2;

var FORCED$k = !$acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  || Math.floor($acosh(Number.MAX_VALUE)) != 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  || $acosh(Infinity) != Infinity;

// `Math.acosh` method
// https://tc39.es/ecma262/#sec-math.acosh
$$1K({ target: 'Math', stat: true, forced: FORCED$k }, {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? log$6(x) + LN2$1
      : log1p$1(x - 1 + sqrt$2(x - 1) * sqrt$2(x + 1));
  }
});

var $$1J = _export;

// eslint-disable-next-line es/no-math-asinh -- required for testing
var $asinh = Math.asinh;
var log$5 = Math.log;
var sqrt$1 = Math.sqrt;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log$5(x + sqrt$1(x * x + 1));
}

// `Math.asinh` method
// https://tc39.es/ecma262/#sec-math.asinh
// Tor Browser bug: Math.asinh(0) -> -0
$$1J({ target: 'Math', stat: true, forced: !($asinh && 1 / $asinh(0) > 0) }, {
  asinh: asinh
});

var $$1I = _export;

// eslint-disable-next-line es/no-math-atanh -- required for testing
var $atanh = Math.atanh;
var log$4 = Math.log;

// `Math.atanh` method
// https://tc39.es/ecma262/#sec-math.atanh
// Tor Browser bug: Math.atanh(-0) -> 0
$$1I({ target: 'Math', stat: true, forced: !($atanh && 1 / $atanh(-0) < 0) }, {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : log$4((1 + x) / (1 - x)) / 2;
  }
});

// `Math.sign` method implementation
// https://tc39.es/ecma262/#sec-math.sign
// eslint-disable-next-line es/no-math-sign -- safe
var mathSign = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

var $$1H = _export;
var sign$2 = mathSign;

var abs$5 = Math.abs;
var pow$3 = Math.pow;

// `Math.cbrt` method
// https://tc39.es/ecma262/#sec-math.cbrt
$$1H({ target: 'Math', stat: true }, {
  cbrt: function cbrt(x) {
    return sign$2(x = +x) * pow$3(abs$5(x), 1 / 3);
  }
});

var $$1G = _export;

var floor$7 = Math.floor;
var log$3 = Math.log;
var LOG2E = Math.LOG2E;

// `Math.clz32` method
// https://tc39.es/ecma262/#sec-math.clz32
$$1G({ target: 'Math', stat: true }, {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - floor$7(log$3(x + 0.5) * LOG2E) : 32;
  }
});

// eslint-disable-next-line es/no-math-expm1 -- safe
var $expm1 = Math.expm1;
var exp$2 = Math.exp;

// `Math.expm1` method implementation
// https://tc39.es/ecma262/#sec-math.expm1
var mathExpm1 = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp$2(x) - 1;
} : $expm1;

var $$1F = _export;
var expm1$3 = mathExpm1;

// eslint-disable-next-line es/no-math-cosh -- required for testing
var $cosh = Math.cosh;
var abs$4 = Math.abs;
var E$1 = Math.E;

// `Math.cosh` method
// https://tc39.es/ecma262/#sec-math.cosh
$$1F({ target: 'Math', stat: true, forced: !$cosh || $cosh(710) === Infinity }, {
  cosh: function cosh(x) {
    var t = expm1$3(abs$4(x) - 1) + 1;
    return (t + 1 / (t * E$1 * E$1)) * (E$1 / 2);
  }
});

var $$1E = _export;
var expm1$2 = mathExpm1;

// `Math.expm1` method
// https://tc39.es/ecma262/#sec-math.expm1
// eslint-disable-next-line es/no-math-expm1 -- required for testing
$$1E({ target: 'Math', stat: true, forced: expm1$2 != Math.expm1 }, { expm1: expm1$2 });

var sign$1 = mathSign;

var abs$3 = Math.abs;
var pow$2 = Math.pow;
var EPSILON = pow$2(2, -52);
var EPSILON32 = pow$2(2, -23);
var MAX32 = pow$2(2, 127) * (2 - EPSILON32);
var MIN32 = pow$2(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

// `Math.fround` method implementation
// https://tc39.es/ecma262/#sec-math.fround
// eslint-disable-next-line es/no-math-fround -- safe
var mathFround = Math.fround || function fround(x) {
  var $abs = abs$3(x);
  var $sign = sign$1(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare -- NaN check
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

var $$1D = _export;
var fround = mathFround;

// `Math.fround` method
// https://tc39.es/ecma262/#sec-math.fround
$$1D({ target: 'Math', stat: true }, { fround: fround });

var $$1C = _export;

// eslint-disable-next-line es/no-math-hypot -- required for testing
var $hypot = Math.hypot;
var abs$2 = Math.abs;
var sqrt = Math.sqrt;

// Chrome 77 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=9546
var BUGGY = !!$hypot && $hypot(Infinity, NaN) !== Infinity;

// `Math.hypot` method
// https://tc39.es/ecma262/#sec-math.hypot
$$1C({ target: 'Math', stat: true, forced: BUGGY }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  hypot: function hypot(value1, value2) {
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs$2(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * sqrt(sum);
  }
});

var $$1B = _export;
var fails$F = fails$_;

// eslint-disable-next-line es/no-math-imul -- required for testing
var $imul = Math.imul;

var FORCED$j = fails$F(function () {
  return $imul(0xFFFFFFFF, 5) != -5 || $imul.length != 2;
});

// `Math.imul` method
// https://tc39.es/ecma262/#sec-math.imul
// some WebKit versions fails with big numbers, some has wrong arity
$$1B({ target: 'Math', stat: true, forced: FORCED$j }, {
  imul: function imul(x, y) {
    var UINT16 = 0xFFFF;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

var $$1A = _export;

var log$2 = Math.log;
var LOG10E = Math.LOG10E;

// `Math.log10` method
// https://tc39.es/ecma262/#sec-math.log10
$$1A({ target: 'Math', stat: true }, {
  log10: function log10(x) {
    return log$2(x) * LOG10E;
  }
});

var $$1z = _export;
var log1p = mathLog1p;

// `Math.log1p` method
// https://tc39.es/ecma262/#sec-math.log1p
$$1z({ target: 'Math', stat: true }, { log1p: log1p });

var $$1y = _export;

var log$1 = Math.log;
var LN2 = Math.LN2;

// `Math.log2` method
// https://tc39.es/ecma262/#sec-math.log2
$$1y({ target: 'Math', stat: true }, {
  log2: function log2(x) {
    return log$1(x) / LN2;
  }
});

var $$1x = _export;
var sign = mathSign;

// `Math.sign` method
// https://tc39.es/ecma262/#sec-math.sign
$$1x({ target: 'Math', stat: true }, {
  sign: sign
});

var $$1w = _export;
var fails$E = fails$_;
var expm1$1 = mathExpm1;

var abs$1 = Math.abs;
var exp$1 = Math.exp;
var E = Math.E;

var FORCED$i = fails$E(function () {
  // eslint-disable-next-line es/no-math-sinh -- required for testing
  return Math.sinh(-2e-17) != -2e-17;
});

// `Math.sinh` method
// https://tc39.es/ecma262/#sec-math.sinh
// V8 near Chromium 38 has a problem with very small numbers
$$1w({ target: 'Math', stat: true, forced: FORCED$i }, {
  sinh: function sinh(x) {
    return abs$1(x = +x) < 1 ? (expm1$1(x) - expm1$1(-x)) / 2 : (exp$1(x - 1) - exp$1(-x - 1)) * (E / 2);
  }
});

var $$1v = _export;
var expm1 = mathExpm1;

var exp = Math.exp;

// `Math.tanh` method
// https://tc39.es/ecma262/#sec-math.tanh
$$1v({ target: 'Math', stat: true }, {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

var setToStringTag$4 = setToStringTag$b;

// Math[@@toStringTag] property
// https://tc39.es/ecma262/#sec-math-@@tostringtag
setToStringTag$4(Math, 'Math', true);

var $$1u = _export;

var ceil = Math.ceil;
var floor$6 = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
$$1u({ target: 'Math', stat: true }, {
  trunc: function trunc(it) {
    return (it > 0 ? floor$6 : ceil)(it);
  }
});

// a string of all valid unicode whitespaces
var whitespaces$4 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var requireObjectCoercible$c = requireObjectCoercible$h;
var whitespaces$3 = whitespaces$4;

var whitespace = '[' + whitespaces$3 + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod$2 = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible$c($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod$2(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod$2(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod$2(3)
};

var DESCRIPTORS$j = descriptors;
var global$p = global$K;
var isForced$2 = isForced_1;
var redefine$8 = redefine$g.exports;
var has$5 = has$k;
var classof$7 = classofRaw$1;
var inheritIfRequired$2 = inheritIfRequired$4;
var toPrimitive$4 = toPrimitive$b;
var fails$D = fails$_;
var create$5 = objectCreate;
var getOwnPropertyNames$3 = objectGetOwnPropertyNames.f;
var getOwnPropertyDescriptor$6 = objectGetOwnPropertyDescriptor.f;
var defineProperty$4 = objectDefineProperty.f;
var trim$2 = stringTrim.trim;

var NUMBER = 'Number';
var NativeNumber = global$p[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof$7(create$5(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive$4(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim$2(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
if (isForced$2(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails$D(function () { NumberPrototype.valueOf.call(dummy); }) : classof$7(dummy) != NUMBER)
        ? inheritIfRequired$2(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys$1 = DESCRIPTORS$j ? getOwnPropertyNames$3(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys$1.length > j; j++) {
    if (has$5(NativeNumber, key = keys$1[j]) && !has$5(NumberWrapper, key)) {
      defineProperty$4(NumberWrapper, key, getOwnPropertyDescriptor$6(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine$8(global$p, NUMBER, NumberWrapper);
}

var $$1t = _export;

// `Number.EPSILON` constant
// https://tc39.es/ecma262/#sec-number.epsilon
$$1t({ target: 'Number', stat: true }, {
  EPSILON: Math.pow(2, -52)
});

var global$o = global$K;

var globalIsFinite = global$o.isFinite;

// `Number.isFinite` method
// https://tc39.es/ecma262/#sec-number.isfinite
// eslint-disable-next-line es/no-number-isfinite -- safe
var numberIsFinite$1 = Number.isFinite || function isFinite(it) {
  return typeof it == 'number' && globalIsFinite(it);
};

var $$1s = _export;
var numberIsFinite = numberIsFinite$1;

// `Number.isFinite` method
// https://tc39.es/ecma262/#sec-number.isfinite
$$1s({ target: 'Number', stat: true }, { isFinite: numberIsFinite });

var isObject$h = isObject$y;

var floor$5 = Math.floor;

// `Number.isInteger` method implementation
// https://tc39.es/ecma262/#sec-number.isinteger
var isInteger$2 = function isInteger(it) {
  return !isObject$h(it) && isFinite(it) && floor$5(it) === it;
};

var $$1r = _export;
var isInteger$1 = isInteger$2;

// `Number.isInteger` method
// https://tc39.es/ecma262/#sec-number.isinteger
$$1r({ target: 'Number', stat: true }, {
  isInteger: isInteger$1
});

var $$1q = _export;

// `Number.isNaN` method
// https://tc39.es/ecma262/#sec-number.isnan
$$1q({ target: 'Number', stat: true }, {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare -- NaN check
    return number != number;
  }
});

var $$1p = _export;
var isInteger = isInteger$2;

var abs = Math.abs;

// `Number.isSafeInteger` method
// https://tc39.es/ecma262/#sec-number.issafeinteger
$$1p({ target: 'Number', stat: true }, {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1FFFFFFFFFFFFF;
  }
});

var $$1o = _export;

// `Number.MAX_SAFE_INTEGER` constant
// https://tc39.es/ecma262/#sec-number.max_safe_integer
$$1o({ target: 'Number', stat: true }, {
  MAX_SAFE_INTEGER: 0x1FFFFFFFFFFFFF
});

var $$1n = _export;

// `Number.MIN_SAFE_INTEGER` constant
// https://tc39.es/ecma262/#sec-number.min_safe_integer
$$1n({ target: 'Number', stat: true }, {
  MIN_SAFE_INTEGER: -0x1FFFFFFFFFFFFF
});

var global$n = global$K;
var trim$1 = stringTrim.trim;
var whitespaces$2 = whitespaces$4;

var $parseFloat = global$n.parseFloat;
var FORCED$h = 1 / $parseFloat(whitespaces$2 + '-0') !== -Infinity;

// `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string
var numberParseFloat = FORCED$h ? function parseFloat(string) {
  var trimmedString = trim$1(String(string));
  var result = $parseFloat(trimmedString);
  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

var $$1m = _export;
var parseFloat$1 = numberParseFloat;

// `Number.parseFloat` method
// https://tc39.es/ecma262/#sec-number.parseFloat
// eslint-disable-next-line es/no-number-parsefloat -- required for testing
$$1m({ target: 'Number', stat: true, forced: Number.parseFloat != parseFloat$1 }, {
  parseFloat: parseFloat$1
});

var global$m = global$K;
var trim = stringTrim.trim;
var whitespaces$1 = whitespaces$4;

var $parseInt = global$m.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED$g = $parseInt(whitespaces$1 + '08') !== 8 || $parseInt(whitespaces$1 + '0x16') !== 22;

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
var numberParseInt = FORCED$g ? function parseInt(string, radix) {
  var S = trim(String(string));
  return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
} : $parseInt;

var $$1l = _export;
var parseInt$1 = numberParseInt;

// `Number.parseInt` method
// https://tc39.es/ecma262/#sec-number.parseint
// eslint-disable-next-line es/no-number-parseint -- required for testing
$$1l({ target: 'Number', stat: true, forced: Number.parseInt != parseInt$1 }, {
  parseInt: parseInt$1
});

var classof$6 = classofRaw$1;

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
var thisNumberValue$2 = function (value) {
  if (typeof value != 'number' && classof$6(value) != 'Number') {
    throw TypeError('Incorrect invocation');
  }
  return +value;
};

var $$1k = _export;
var toInteger$4 = toInteger$e;
var thisNumberValue$1 = thisNumberValue$2;
var repeat$1 = stringRepeat;
var fails$C = fails$_;

var nativeToFixed = 1.0.toFixed;
var floor$4 = Math.floor;

var pow$1 = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow$1(x, n - 1, acc * x) : pow$1(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var multiply = function (data, n, c) {
  var index = -1;
  var c2 = c;
  while (++index < 6) {
    c2 += n * data[index];
    data[index] = c2 % 1e7;
    c2 = floor$4(c2 / 1e7);
  }
};

var divide = function (data, n) {
  var index = 6;
  var c = 0;
  while (--index >= 0) {
    c += data[index];
    data[index] = floor$4(c / n);
    c = (c % n) * 1e7;
  }
};

var dataToString = function (data) {
  var index = 6;
  var s = '';
  while (--index >= 0) {
    if (s !== '' || index === 0 || data[index] !== 0) {
      var t = String(data[index]);
      s = s === '' ? t : s + repeat$1.call('0', 7 - t.length) + t;
    }
  } return s;
};

var FORCED$f = nativeToFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !fails$C(function () {
  // V8 ~ Android 4.3-
  nativeToFixed.call({});
});

// `Number.prototype.toFixed` method
// https://tc39.es/ecma262/#sec-number.prototype.tofixed
$$1k({ target: 'Number', proto: true, forced: FORCED$f }, {
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue$1(this);
    var fractDigits = toInteger$4(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare -- NaN check
    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow$1(2, 69, 1)) - 69;
      z = e < 0 ? number * pow$1(2, -e, 1) : number / pow$1(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(data, 0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(data, 1e7, 0);
          j -= 7;
        }
        multiply(data, pow$1(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(data, 1 << 23);
          j -= 23;
        }
        divide(data, 1 << j);
        multiply(data, 1, 1);
        divide(data, 2);
        result = dataToString(data);
      } else {
        multiply(data, 0, z);
        multiply(data, 1 << -e, 0);
        result = dataToString(data) + repeat$1.call('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + repeat$1.call('0', fractDigits - k) + result
        : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});

var $$1j = _export;
var fails$B = fails$_;
var thisNumberValue = thisNumberValue$2;

var nativeToPrecision = 1.0.toPrecision;

var FORCED$e = fails$B(function () {
  // IE7-
  return nativeToPrecision.call(1, undefined) !== '1';
}) || !fails$B(function () {
  // V8 ~ Android 4.3-
  nativeToPrecision.call({});
});

// `Number.prototype.toPrecision` method
// https://tc39.es/ecma262/#sec-number.prototype.toprecision
$$1j({ target: 'Number', proto: true, forced: FORCED$e }, {
  toPrecision: function toPrecision(precision) {
    return precision === undefined
      ? nativeToPrecision.call(thisNumberValue(this))
      : nativeToPrecision.call(thisNumberValue(this), precision);
  }
});

var DESCRIPTORS$i = descriptors;
var fails$A = fails$_;
var objectKeys$1 = objectKeys$4;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var toObject$9 = toObject$o;
var IndexedObject = indexedObject;

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty$3 = Object.defineProperty;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
var objectAssign = !$assign || fails$A(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS$i && $assign({ b: 1 }, $assign(defineProperty$3({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty$3(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys$1($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject$9(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys$1(S).concat(getOwnPropertySymbols(S)) : objectKeys$1(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS$i || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

var $$1i = _export;
var assign$1 = objectAssign;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$$1i({ target: 'Object', stat: true, forced: Object.assign !== assign$1 }, {
  assign: assign$1
});

var $$1h = _export;
var DESCRIPTORS$h = descriptors;
var create$4 = objectCreate;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
$$1h({ target: 'Object', stat: true, sham: !DESCRIPTORS$h }, {
  create: create$4
});

var global$l = global$K;
var fails$z = fails$_;
var WEBKIT$1 = engineWebkitVersion;

// Forced replacement object prototype accessors methods
var objectPrototypeAccessorsForced = !fails$z(function () {
  // This feature detection crashes old WebKit
  // https://github.com/zloirock/core-js/issues/232
  if (WEBKIT$1 && WEBKIT$1 < 535) return;
  var key = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call -- required for testing
  __defineSetter__.call(null, key, function () { /* empty */ });
  delete global$l[key];
});

var $$1g = _export;
var DESCRIPTORS$g = descriptors;
var FORCED$d = objectPrototypeAccessorsForced;
var toObject$8 = toObject$o;
var aFunction$9 = aFunction$g;
var definePropertyModule$4 = objectDefineProperty;

// `Object.prototype.__defineGetter__` method
// https://tc39.es/ecma262/#sec-object.prototype.__defineGetter__
if (DESCRIPTORS$g) {
  $$1g({ target: 'Object', proto: true, forced: FORCED$d }, {
    __defineGetter__: function __defineGetter__(P, getter) {
      definePropertyModule$4.f(toObject$8(this), P, { get: aFunction$9(getter), enumerable: true, configurable: true });
    }
  });
}

var $$1f = _export;
var DESCRIPTORS$f = descriptors;
var defineProperties$1 = objectDefineProperties;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
$$1f({ target: 'Object', stat: true, forced: !DESCRIPTORS$f, sham: !DESCRIPTORS$f }, {
  defineProperties: defineProperties$1
});

var $$1e = _export;
var DESCRIPTORS$e = descriptors;
var objectDefinePropertyModile = objectDefineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
$$1e({ target: 'Object', stat: true, forced: !DESCRIPTORS$e, sham: !DESCRIPTORS$e }, {
  defineProperty: objectDefinePropertyModile.f
});

var $$1d = _export;
var DESCRIPTORS$d = descriptors;
var FORCED$c = objectPrototypeAccessorsForced;
var toObject$7 = toObject$o;
var aFunction$8 = aFunction$g;
var definePropertyModule$3 = objectDefineProperty;

// `Object.prototype.__defineSetter__` method
// https://tc39.es/ecma262/#sec-object.prototype.__defineSetter__
if (DESCRIPTORS$d) {
  $$1d({ target: 'Object', proto: true, forced: FORCED$c }, {
    __defineSetter__: function __defineSetter__(P, setter) {
      definePropertyModule$3.f(toObject$7(this), P, { set: aFunction$8(setter), enumerable: true, configurable: true });
    }
  });
}

var DESCRIPTORS$c = descriptors;
var objectKeys = objectKeys$4;
var toIndexedObject$3 = toIndexedObject$d;
var propertyIsEnumerable = objectPropertyIsEnumerable.f;

// `Object.{ entries, values }` methods implementation
var createMethod$1 = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject$3(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS$c || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

var objectToArray = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod$1(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod$1(false)
};

var $$1c = _export;
var $entries = objectToArray.entries;

// `Object.entries` method
// https://tc39.es/ecma262/#sec-object.entries
$$1c({ target: 'Object', stat: true }, {
  entries: function entries(O) {
    return $entries(O);
  }
});

var $$1b = _export;
var FREEZING$3 = freezing;
var fails$y = fails$_;
var isObject$g = isObject$y;
var onFreeze$2 = internalMetadata.exports.onFreeze;

// eslint-disable-next-line es/no-object-freeze -- safe
var $freeze = Object.freeze;
var FAILS_ON_PRIMITIVES$9 = fails$y(function () { $freeze(1); });

// `Object.freeze` method
// https://tc39.es/ecma262/#sec-object.freeze
$$1b({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$9, sham: !FREEZING$3 }, {
  freeze: function freeze(it) {
    return $freeze && isObject$g(it) ? $freeze(onFreeze$2(it)) : it;
  }
});

var $$1a = _export;
var iterate$4 = iterate$8;
var createProperty$1 = createProperty$7;

// `Object.fromEntries` method
// https://github.com/tc39/proposal-object-from-entries
$$1a({ target: 'Object', stat: true }, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate$4(iterable, function (k, v) {
      createProperty$1(obj, k, v);
    }, { AS_ENTRIES: true });
    return obj;
  }
});

var $$19 = _export;
var fails$x = fails$_;
var toIndexedObject$2 = toIndexedObject$d;
var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var DESCRIPTORS$b = descriptors;

var FAILS_ON_PRIMITIVES$8 = fails$x(function () { nativeGetOwnPropertyDescriptor$1(1); });
var FORCED$b = !DESCRIPTORS$b || FAILS_ON_PRIMITIVES$8;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
$$19({ target: 'Object', stat: true, forced: FORCED$b, sham: !DESCRIPTORS$b }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor$1(toIndexedObject$2(it), key);
  }
});

var $$18 = _export;
var DESCRIPTORS$a = descriptors;
var ownKeys$1 = ownKeys$3;
var toIndexedObject$1 = toIndexedObject$d;
var getOwnPropertyDescriptorModule$4 = objectGetOwnPropertyDescriptor;
var createProperty = createProperty$7;

// `Object.getOwnPropertyDescriptors` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
$$18({ target: 'Object', stat: true, sham: !DESCRIPTORS$a }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject$1(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$4.f;
    var keys = ownKeys$1(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});

var $$17 = _export;
var fails$w = fails$_;
var getOwnPropertyNames$2 = objectGetOwnPropertyNamesExternal.f;

// eslint-disable-next-line es/no-object-getownpropertynames -- required for testing
var FAILS_ON_PRIMITIVES$7 = fails$w(function () { return !Object.getOwnPropertyNames(1); });

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
$$17({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$7 }, {
  getOwnPropertyNames: getOwnPropertyNames$2
});

var $$16 = _export;
var fails$v = fails$_;
var toObject$6 = toObject$o;
var nativeGetPrototypeOf = objectGetPrototypeOf$1;
var CORRECT_PROTOTYPE_GETTER$1 = correctPrototypeGetter;

var FAILS_ON_PRIMITIVES$6 = fails$v(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
$$16({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$6, sham: !CORRECT_PROTOTYPE_GETTER$1 }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject$6(it));
  }
});

// `SameValue` abstract operation
// https://tc39.es/ecma262/#sec-samevalue
// eslint-disable-next-line es/no-object-is -- safe
var sameValue$1 = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

var $$15 = _export;
var is = sameValue$1;

// `Object.is` method
// https://tc39.es/ecma262/#sec-object.is
$$15({ target: 'Object', stat: true }, {
  is: is
});

var $$14 = _export;
var fails$u = fails$_;
var isObject$f = isObject$y;

// eslint-disable-next-line es/no-object-isextensible -- safe
var $isExtensible = Object.isExtensible;
var FAILS_ON_PRIMITIVES$5 = fails$u(function () { $isExtensible(1); });

// `Object.isExtensible` method
// https://tc39.es/ecma262/#sec-object.isextensible
$$14({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$5 }, {
  isExtensible: function isExtensible(it) {
    return isObject$f(it) ? $isExtensible ? $isExtensible(it) : true : false;
  }
});

var $$13 = _export;
var fails$t = fails$_;
var isObject$e = isObject$y;

// eslint-disable-next-line es/no-object-isfrozen -- safe
var $isFrozen = Object.isFrozen;
var FAILS_ON_PRIMITIVES$4 = fails$t(function () { $isFrozen(1); });

// `Object.isFrozen` method
// https://tc39.es/ecma262/#sec-object.isfrozen
$$13({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$4 }, {
  isFrozen: function isFrozen(it) {
    return isObject$e(it) ? $isFrozen ? $isFrozen(it) : false : true;
  }
});

var $$12 = _export;
var fails$s = fails$_;
var isObject$d = isObject$y;

// eslint-disable-next-line es/no-object-issealed -- safe
var $isSealed = Object.isSealed;
var FAILS_ON_PRIMITIVES$3 = fails$s(function () { $isSealed(1); });

// `Object.isSealed` method
// https://tc39.es/ecma262/#sec-object.issealed
$$12({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$3 }, {
  isSealed: function isSealed(it) {
    return isObject$d(it) ? $isSealed ? $isSealed(it) : false : true;
  }
});

var $$11 = _export;
var toObject$5 = toObject$o;
var nativeKeys = objectKeys$4;
var fails$r = fails$_;

var FAILS_ON_PRIMITIVES$2 = fails$r(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$$11({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$2 }, {
  keys: function keys(it) {
    return nativeKeys(toObject$5(it));
  }
});

var $$10 = _export;
var DESCRIPTORS$9 = descriptors;
var FORCED$a = objectPrototypeAccessorsForced;
var toObject$4 = toObject$o;
var toPrimitive$3 = toPrimitive$b;
var getPrototypeOf$3 = objectGetPrototypeOf$1;
var getOwnPropertyDescriptor$5 = objectGetOwnPropertyDescriptor.f;

// `Object.prototype.__lookupGetter__` method
// https://tc39.es/ecma262/#sec-object.prototype.__lookupGetter__
if (DESCRIPTORS$9) {
  $$10({ target: 'Object', proto: true, forced: FORCED$a }, {
    __lookupGetter__: function __lookupGetter__(P) {
      var O = toObject$4(this);
      var key = toPrimitive$3(P, true);
      var desc;
      do {
        if (desc = getOwnPropertyDescriptor$5(O, key)) return desc.get;
      } while (O = getPrototypeOf$3(O));
    }
  });
}

var $$$ = _export;
var DESCRIPTORS$8 = descriptors;
var FORCED$9 = objectPrototypeAccessorsForced;
var toObject$3 = toObject$o;
var toPrimitive$2 = toPrimitive$b;
var getPrototypeOf$2 = objectGetPrototypeOf$1;
var getOwnPropertyDescriptor$4 = objectGetOwnPropertyDescriptor.f;

// `Object.prototype.__lookupSetter__` method
// https://tc39.es/ecma262/#sec-object.prototype.__lookupSetter__
if (DESCRIPTORS$8) {
  $$$({ target: 'Object', proto: true, forced: FORCED$9 }, {
    __lookupSetter__: function __lookupSetter__(P) {
      var O = toObject$3(this);
      var key = toPrimitive$2(P, true);
      var desc;
      do {
        if (desc = getOwnPropertyDescriptor$4(O, key)) return desc.set;
      } while (O = getPrototypeOf$2(O));
    }
  });
}

var $$_ = _export;
var isObject$c = isObject$y;
var onFreeze$1 = internalMetadata.exports.onFreeze;
var FREEZING$2 = freezing;
var fails$q = fails$_;

// eslint-disable-next-line es/no-object-preventextensions -- safe
var $preventExtensions = Object.preventExtensions;
var FAILS_ON_PRIMITIVES$1 = fails$q(function () { $preventExtensions(1); });

// `Object.preventExtensions` method
// https://tc39.es/ecma262/#sec-object.preventextensions
$$_({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1, sham: !FREEZING$2 }, {
  preventExtensions: function preventExtensions(it) {
    return $preventExtensions && isObject$c(it) ? $preventExtensions(onFreeze$1(it)) : it;
  }
});

var $$Z = _export;
var isObject$b = isObject$y;
var onFreeze = internalMetadata.exports.onFreeze;
var FREEZING$1 = freezing;
var fails$p = fails$_;

// eslint-disable-next-line es/no-object-seal -- safe
var $seal = Object.seal;
var FAILS_ON_PRIMITIVES = fails$p(function () { $seal(1); });

// `Object.seal` method
// https://tc39.es/ecma262/#sec-object.seal
$$Z({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING$1 }, {
  seal: function seal(it) {
    return $seal && isObject$b(it) ? $seal(onFreeze(it)) : it;
  }
});

var $$Y = _export;
var setPrototypeOf$2 = objectSetPrototypeOf$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
$$Y({ target: 'Object', stat: true }, {
  setPrototypeOf: setPrototypeOf$2
});

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
var classof$5 = classof$b;

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
  return '[object ' + classof$5(this) + ']';
};

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var redefine$7 = redefine$g.exports;
var toString = objectToString;

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine$7(Object.prototype, 'toString', toString, { unsafe: true });
}

var $$X = _export;
var $values = objectToArray.values;

// `Object.values` method
// https://tc39.es/ecma262/#sec-object.values
$$X({ target: 'Object', stat: true }, {
  values: function values(O) {
    return $values(O);
  }
});

var $$W = _export;
var parseFloatImplementation = numberParseFloat;

// `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string
$$W({ global: true, forced: parseFloat != parseFloatImplementation }, {
  parseFloat: parseFloatImplementation
});

var $$V = _export;
var parseIntImplementation = numberParseInt;

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
$$V({ global: true, forced: parseInt != parseIntImplementation }, {
  parseInt: parseIntImplementation
});

var global$k = global$K;

var nativePromiseConstructor = global$k.Promise;

var userAgent$3 = engineUserAgent;

var engineIsIos = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent$3);

var global$j = global$K;
var fails$o = fails$_;
var bind$4 = functionBindContext;
var html = html$2;
var createElement = documentCreateElement$1;
var IS_IOS$1 = engineIsIos;
var IS_NODE$3 = engineIsNode;

var location = global$j.location;
var set$1 = global$j.setImmediate;
var clear = global$j.clearImmediate;
var process$3 = global$j.process;
var MessageChannel = global$j.MessageChannel;
var Dispatch = global$j.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global$j.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set$1 || !clear) {
  set$1 = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE$3) {
    defer = function (id) {
      process$3.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS$1) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind$4(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global$j.addEventListener &&
    typeof postMessage == 'function' &&
    !global$j.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails$o(post)
  ) {
    defer = post;
    global$j.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

var task$2 = {
  set: set$1,
  clear: clear
};

var userAgent$2 = engineUserAgent;

var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent$2);

var global$i = global$K;
var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
var macrotask = task$2.set;
var IS_IOS = engineIsIos;
var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
var IS_NODE$2 = engineIsNode;

var MutationObserver = global$i.MutationObserver || global$i.WebKitMutationObserver;
var document$2 = global$i.document;
var process$2 = global$i.process;
var Promise$1 = global$i.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor$3(global$i, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify$1, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE$2 && (parent = process$2.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify$1();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE$2 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
    toggle = true;
    node = document$2.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify$1 = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise$1.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise$1;
    then = promise.then;
    notify$1 = function () {
      then.call(promise, flush);
    };
  // Node.js without promises
  } else if (IS_NODE$2) {
    notify$1 = function () {
      process$2.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify$1 = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global$i, flush);
    };
  }
}

var microtask$2 = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify$1();
  } last = task;
};

var newPromiseCapability$2 = {};

var aFunction$7 = aFunction$g;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction$7(resolve);
  this.reject = aFunction$7(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
newPromiseCapability$2.f = function (C) {
  return new PromiseCapability(C);
};

var anObject$l = anObject$y;
var isObject$a = isObject$y;
var newPromiseCapability$1 = newPromiseCapability$2;

var promiseResolve$2 = function (C, x) {
  anObject$l(C);
  if (isObject$a(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability$1.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var global$h = global$K;

var hostReportErrors$1 = function (a, b) {
  var console = global$h.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

var perform$3 = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

var engineIsBrowser = typeof window == 'object';

var $$U = _export;
var global$g = global$K;
var getBuiltIn$6 = getBuiltIn$d;
var NativePromise$1 = nativePromiseConstructor;
var redefine$6 = redefine$g.exports;
var redefineAll$3 = redefineAll$6;
var setPrototypeOf$1 = objectSetPrototypeOf$1;
var setToStringTag$3 = setToStringTag$b;
var setSpecies$2 = setSpecies$6;
var isObject$9 = isObject$y;
var aFunction$6 = aFunction$g;
var anInstance$4 = anInstance$8;
var inspectSource = inspectSource$3;
var iterate$3 = iterate$8;
var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$4;
var speciesConstructor$7 = speciesConstructor$9;
var task$1 = task$2.set;
var microtask$1 = microtask$2;
var promiseResolve$1 = promiseResolve$2;
var hostReportErrors = hostReportErrors$1;
var newPromiseCapabilityModule$2 = newPromiseCapability$2;
var perform$2 = perform$3;
var InternalStateModule$6 = internalState;
var isForced$1 = isForced_1;
var wellKnownSymbol$b = wellKnownSymbol$w;
var IS_BROWSER = engineIsBrowser;
var IS_NODE$1 = engineIsNode;
var V8_VERSION = engineV8Version;

var SPECIES$1 = wellKnownSymbol$b('species');
var PROMISE = 'Promise';
var getInternalState$6 = InternalStateModule$6.get;
var setInternalState$6 = InternalStateModule$6.set;
var getInternalPromiseState = InternalStateModule$6.getterFor(PROMISE);
var NativePromisePrototype = NativePromise$1 && NativePromise$1.prototype;
var PromiseConstructor = NativePromise$1;
var PromiseConstructorPrototype = NativePromisePrototype;
var TypeError$1 = global$g.TypeError;
var document$1 = global$g.document;
var process$1 = global$g.process;
var newPromiseCapability = newPromiseCapabilityModule$2.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$g.dispatchEvent);
var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED$8 = isForced$1(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new PromiseConstructor(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES$1] = FakePromise;
  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});

var INCORRECT_ITERATION = FORCED$8 || !checkCorrectnessOfIteration$1(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject$9(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask$1(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$1.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global$g.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_REJECTION_EVENT && (handler = global$g['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  task$1.call(global$g, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform$2(function () {
        if (IS_NODE$1) {
          process$1.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  task$1.call(global$g, function () {
    var promise = state.facade;
    if (IS_NODE$1) {
      process$1.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind$3 = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask$1(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind$3(internalResolve, wrapper, state),
            bind$3(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED$8) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance$4(this, PromiseConstructor, PROMISE);
    aFunction$6(executor);
    Internal.call(this);
    var state = getInternalState$6(this);
    try {
      executor(bind$3(internalResolve, state), bind$3(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  PromiseConstructorPrototype = PromiseConstructor.prototype;
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState$6(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll$3(PromiseConstructorPrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor$7(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE$1 ? process$1.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState$6(promise);
    this.promise = promise;
    this.resolve = bind$3(internalResolve, state);
    this.reject = bind$3(internalReject, state);
  };
  newPromiseCapabilityModule$2.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (typeof NativePromise$1 == 'function' && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine$6(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          nativeThen.call(that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });

      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
      redefine$6(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf$1) {
      setPrototypeOf$1(NativePromisePrototype, PromiseConstructorPrototype);
    }
  }
}

$$U({ global: true, wrap: true, forced: FORCED$8 }, {
  Promise: PromiseConstructor
});

setToStringTag$3(PromiseConstructor, PROMISE, false);
setSpecies$2(PROMISE);

PromiseWrapper = getBuiltIn$6(PROMISE);

// statics
$$U({ target: PROMISE, stat: true, forced: FORCED$8 }, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$$U({ target: PROMISE, stat: true, forced: FORCED$8 }, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve$1(this, x);
  }
});

$$U({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform$2(function () {
      var $promiseResolve = aFunction$6(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate$3(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform$2(function () {
      var $promiseResolve = aFunction$6(C.resolve);
      iterate$3(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var $$T = _export;
var aFunction$5 = aFunction$g;
var newPromiseCapabilityModule$1 = newPromiseCapability$2;
var perform$1 = perform$3;
var iterate$2 = iterate$8;

// `Promise.allSettled` method
// https://tc39.es/ecma262/#sec-promise.allsettled
$$T({ target: 'Promise', stat: true }, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$1.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform$1(function () {
      var promiseResolve = aFunction$5(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate$2(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'fulfilled', value: value };
          --remaining || resolve(values);
        }, function (error) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'rejected', reason: error };
          --remaining || resolve(values);
        });
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var $$S = _export;
var aFunction$4 = aFunction$g;
var getBuiltIn$5 = getBuiltIn$d;
var newPromiseCapabilityModule = newPromiseCapability$2;
var perform = perform$3;
var iterate$1 = iterate$8;

var PROMISE_ANY_ERROR = 'No one promise resolved';

// `Promise.any` method
// https://tc39.es/ecma262/#sec-promise.any
$$S({ target: 'Promise', stat: true }, {
  any: function any(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction$4(C.resolve);
      var errors = [];
      var counter = 0;
      var remaining = 1;
      var alreadyResolved = false;
      iterate$1(iterable, function (promise) {
        var index = counter++;
        var alreadyRejected = false;
        errors.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyResolved = true;
          resolve(value);
        }, function (error) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyRejected = true;
          errors[index] = error;
          --remaining || reject(new (getBuiltIn$5('AggregateError'))(errors, PROMISE_ANY_ERROR));
        });
      });
      --remaining || reject(new (getBuiltIn$5('AggregateError'))(errors, PROMISE_ANY_ERROR));
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var $$R = _export;
var NativePromise = nativePromiseConstructor;
var fails$n = fails$_;
var getBuiltIn$4 = getBuiltIn$d;
var speciesConstructor$6 = speciesConstructor$9;
var promiseResolve = promiseResolve$2;
var redefine$5 = redefine$g.exports;

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!NativePromise && fails$n(function () {
  NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.es/ecma262/#sec-promise.prototype.finally
$$R({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor$6(this, getBuiltIn$4('Promise'));
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

// makes sure that native promise-based APIs `Promise#finally` properly works with patched `Promise#then`
if (typeof NativePromise == 'function') {
  var method = getBuiltIn$4('Promise').prototype['finally'];
  if (NativePromise.prototype['finally'] !== method) {
    redefine$5(NativePromise.prototype, 'finally', method, { unsafe: true });
  }
}

var $$Q = _export;
var getBuiltIn$3 = getBuiltIn$d;
var aFunction$3 = aFunction$g;
var anObject$k = anObject$y;
var fails$m = fails$_;

var nativeApply = getBuiltIn$3('Reflect', 'apply');
var functionApply = Function.apply;

// MS Edge argumentsList argument is optional
var OPTIONAL_ARGUMENTS_LIST = !fails$m(function () {
  nativeApply(function () { /* empty */ });
});

// `Reflect.apply` method
// https://tc39.es/ecma262/#sec-reflect.apply
$$Q({ target: 'Reflect', stat: true, forced: OPTIONAL_ARGUMENTS_LIST }, {
  apply: function apply(target, thisArgument, argumentsList) {
    aFunction$3(target);
    anObject$k(argumentsList);
    return nativeApply
      ? nativeApply(target, thisArgument, argumentsList)
      : functionApply.call(target, thisArgument, argumentsList);
  }
});

var $$P = _export;
var getBuiltIn$2 = getBuiltIn$d;
var aFunction$2 = aFunction$g;
var anObject$j = anObject$y;
var isObject$8 = isObject$y;
var create$3 = objectCreate;
var bind$2 = functionBind;
var fails$l = fails$_;

var nativeConstruct = getBuiltIn$2('Reflect', 'construct');

// `Reflect.construct` method
// https://tc39.es/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails$l(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails$l(function () {
  nativeConstruct(function () { /* empty */ });
});
var FORCED$7 = NEW_TARGET_BUG || ARGS_BUG;

$$P({ target: 'Reflect', stat: true, forced: FORCED$7, sham: FORCED$7 }, {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction$2(Target);
    anObject$j(args);
    var newTarget = arguments.length < 3 ? Target : aFunction$2(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind$2.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create$3(isObject$8(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject$8(result) ? result : instance;
  }
});

var $$O = _export;
var DESCRIPTORS$7 = descriptors;
var anObject$i = anObject$y;
var toPrimitive$1 = toPrimitive$b;
var definePropertyModule$2 = objectDefineProperty;
var fails$k = fails$_;

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
var ERROR_INSTEAD_OF_FALSE = fails$k(function () {
  // eslint-disable-next-line es/no-reflect -- required for testing
  Reflect.defineProperty(definePropertyModule$2.f({}, 1, { value: 1 }), 1, { value: 2 });
});

// `Reflect.defineProperty` method
// https://tc39.es/ecma262/#sec-reflect.defineproperty
$$O({ target: 'Reflect', stat: true, forced: ERROR_INSTEAD_OF_FALSE, sham: !DESCRIPTORS$7 }, {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject$i(target);
    var key = toPrimitive$1(propertyKey, true);
    anObject$i(attributes);
    try {
      definePropertyModule$2.f(target, key, attributes);
      return true;
    } catch (error) {
      return false;
    }
  }
});

var $$N = _export;
var anObject$h = anObject$y;
var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;

// `Reflect.deleteProperty` method
// https://tc39.es/ecma262/#sec-reflect.deleteproperty
$$N({ target: 'Reflect', stat: true }, {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var descriptor = getOwnPropertyDescriptor$2(anObject$h(target), propertyKey);
    return descriptor && !descriptor.configurable ? false : delete target[propertyKey];
  }
});

var $$M = _export;
var isObject$7 = isObject$y;
var anObject$g = anObject$y;
var has$4 = has$k;
var getOwnPropertyDescriptorModule$3 = objectGetOwnPropertyDescriptor;
var getPrototypeOf$1 = objectGetPrototypeOf$1;

// `Reflect.get` method
// https://tc39.es/ecma262/#sec-reflect.get
function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var descriptor, prototype;
  if (anObject$g(target) === receiver) return target[propertyKey];
  if (descriptor = getOwnPropertyDescriptorModule$3.f(target, propertyKey)) return has$4(descriptor, 'value')
    ? descriptor.value
    : descriptor.get === undefined
      ? undefined
      : descriptor.get.call(receiver);
  if (isObject$7(prototype = getPrototypeOf$1(target))) return get(prototype, propertyKey, receiver);
}

$$M({ target: 'Reflect', stat: true }, {
  get: get
});

var $$L = _export;
var DESCRIPTORS$6 = descriptors;
var anObject$f = anObject$y;
var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor;

// `Reflect.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-reflect.getownpropertydescriptor
$$L({ target: 'Reflect', stat: true, sham: !DESCRIPTORS$6 }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return getOwnPropertyDescriptorModule$2.f(anObject$f(target), propertyKey);
  }
});

var $$K = _export;
var anObject$e = anObject$y;
var objectGetPrototypeOf = objectGetPrototypeOf$1;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

// `Reflect.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-reflect.getprototypeof
$$K({ target: 'Reflect', stat: true, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(target) {
    return objectGetPrototypeOf(anObject$e(target));
  }
});

var $$J = _export;

// `Reflect.has` method
// https://tc39.es/ecma262/#sec-reflect.has
$$J({ target: 'Reflect', stat: true }, {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

var $$I = _export;
var anObject$d = anObject$y;

// eslint-disable-next-line es/no-object-isextensible -- safe
var objectIsExtensible = Object.isExtensible;

// `Reflect.isExtensible` method
// https://tc39.es/ecma262/#sec-reflect.isextensible
$$I({ target: 'Reflect', stat: true }, {
  isExtensible: function isExtensible(target) {
    anObject$d(target);
    return objectIsExtensible ? objectIsExtensible(target) : true;
  }
});

var $$H = _export;
var ownKeys = ownKeys$3;

// `Reflect.ownKeys` method
// https://tc39.es/ecma262/#sec-reflect.ownkeys
$$H({ target: 'Reflect', stat: true }, {
  ownKeys: ownKeys
});

var $$G = _export;
var getBuiltIn$1 = getBuiltIn$d;
var anObject$c = anObject$y;
var FREEZING = freezing;

// `Reflect.preventExtensions` method
// https://tc39.es/ecma262/#sec-reflect.preventextensions
$$G({ target: 'Reflect', stat: true, sham: !FREEZING }, {
  preventExtensions: function preventExtensions(target) {
    anObject$c(target);
    try {
      var objectPreventExtensions = getBuiltIn$1('Object', 'preventExtensions');
      if (objectPreventExtensions) objectPreventExtensions(target);
      return true;
    } catch (error) {
      return false;
    }
  }
});

var $$F = _export;
var anObject$b = anObject$y;
var isObject$6 = isObject$y;
var has$3 = has$k;
var fails$j = fails$_;
var definePropertyModule$1 = objectDefineProperty;
var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
var getPrototypeOf = objectGetPrototypeOf$1;
var createPropertyDescriptor$2 = createPropertyDescriptor$9;

// `Reflect.set` method
// https://tc39.es/ecma262/#sec-reflect.set
function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDescriptor = getOwnPropertyDescriptorModule$1.f(anObject$b(target), propertyKey);
  var existingDescriptor, prototype;
  if (!ownDescriptor) {
    if (isObject$6(prototype = getPrototypeOf(target))) {
      return set(prototype, propertyKey, V, receiver);
    }
    ownDescriptor = createPropertyDescriptor$2(0);
  }
  if (has$3(ownDescriptor, 'value')) {
    if (ownDescriptor.writable === false || !isObject$6(receiver)) return false;
    if (existingDescriptor = getOwnPropertyDescriptorModule$1.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      definePropertyModule$1.f(receiver, propertyKey, existingDescriptor);
    } else definePropertyModule$1.f(receiver, propertyKey, createPropertyDescriptor$2(0, V));
    return true;
  }
  return ownDescriptor.set === undefined ? false : (ownDescriptor.set.call(receiver, V), true);
}

// MS Edge 17-18 Reflect.set allows setting the property to object
// with non-writable property on the prototype
var MS_EDGE_BUG = fails$j(function () {
  var Constructor = function () { /* empty */ };
  var object = definePropertyModule$1.f(new Constructor(), 'a', { configurable: true });
  // eslint-disable-next-line es/no-reflect -- required for testing
  return Reflect.set(Constructor.prototype, 'a', 1, object) !== false;
});

$$F({ target: 'Reflect', stat: true, forced: MS_EDGE_BUG }, {
  set: set
});

var $$E = _export;
var anObject$a = anObject$y;
var aPossiblePrototype = aPossiblePrototype$2;
var objectSetPrototypeOf = objectSetPrototypeOf$1;

// `Reflect.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-reflect.setprototypeof
if (objectSetPrototypeOf) $$E({ target: 'Reflect', stat: true }, {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    anObject$a(target);
    aPossiblePrototype(proto);
    try {
      objectSetPrototypeOf(target, proto);
      return true;
    } catch (error) {
      return false;
    }
  }
});

var $$D = _export;
var global$f = global$K;
var setToStringTag$2 = setToStringTag$b;

$$D({ global: true }, { Reflect: {} });

// Reflect[@@toStringTag] property
// https://tc39.es/ecma262/#sec-reflect-@@tostringtag
setToStringTag$2(global$f.Reflect, 'Reflect', true);

var isObject$5 = isObject$y;
var classof$4 = classofRaw$1;
var wellKnownSymbol$a = wellKnownSymbol$w;

var MATCH$2 = wellKnownSymbol$a('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject$5(it) && ((isRegExp = it[MATCH$2]) !== undefined ? !!isRegExp : classof$4(it) == 'RegExp');
};

var anObject$9 = anObject$y;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags$1 = function () {
  var that = anObject$9(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var regexpStickyHelpers = {};

var fails$i = fails$_;

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
var RE = function (s, f) {
  return RegExp(s, f);
};

regexpStickyHelpers.UNSUPPORTED_Y = fails$i(function () {
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

regexpStickyHelpers.BROKEN_CARET = fails$i(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var fails$h = fails$_;

var regexpUnsupportedDotAll = fails$h(function () {
  // babel-minify transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var re = RegExp('.', (typeof '').charAt(0));
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});

var fails$g = fails$_;

var regexpUnsupportedNcg = fails$g(function () {
  // babel-minify transpiles RegExp('.', 'g') -> /./g and it causes SyntaxError
  var re = RegExp('(?<a>b)', (typeof '').charAt(5));
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});

var DESCRIPTORS$5 = descriptors;
var global$e = global$K;
var isForced = isForced_1;
var inheritIfRequired$1 = inheritIfRequired$4;
var createNonEnumerableProperty$5 = createNonEnumerableProperty$h;
var defineProperty$2 = objectDefineProperty.f;
var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
var isRegExp$4 = isRegexp;
var getFlags = regexpFlags$1;
var stickyHelpers$2 = regexpStickyHelpers;
var redefine$4 = redefine$g.exports;
var fails$f = fails$_;
var has$2 = has$k;
var enforceInternalState = internalState.enforce;
var setSpecies$1 = setSpecies$6;
var wellKnownSymbol$9 = wellKnownSymbol$w;
var UNSUPPORTED_DOT_ALL$2 = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;

var MATCH$1 = wellKnownSymbol$9('match');
var NativeRegExp = global$e.RegExp;
var RegExpPrototype$6 = NativeRegExp.prototype;
// TODO: Use only propper RegExpIdentifierName
var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var UNSUPPORTED_Y$3 = stickyHelpers$2.UNSUPPORTED_Y;

var BASE_FORCED = DESCRIPTORS$5 &&
  (!CORRECT_NEW || UNSUPPORTED_Y$3 || UNSUPPORTED_DOT_ALL$2 || UNSUPPORTED_NCG$1 || fails$f(function () {
    re2[MATCH$1] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
  }));

var handleDotAll = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var brackets = false;
  var chr;
  for (; index <= length; index++) {
    chr = string.charAt(index);
    if (chr === '\\') {
      result += chr + string.charAt(++index);
      continue;
    }
    if (!brackets && chr === '.') {
      result += '[\\s\\S]';
    } else {
      if (chr === '[') {
        brackets = true;
      } else if (chr === ']') {
        brackets = false;
      } result += chr;
    }
  } return result;
};

var handleNCG = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var named = [];
  var names = {};
  var brackets = false;
  var ncg = false;
  var groupid = 0;
  var groupname = '';
  var chr;
  for (; index <= length; index++) {
    chr = string.charAt(index);
    if (chr === '\\') {
      chr = chr + string.charAt(++index);
    } else if (chr === ']') {
      brackets = false;
    } else if (!brackets) switch (true) {
      case chr === '[':
        brackets = true;
        break;
      case chr === '(':
        if (IS_NCG.test(string.slice(index + 1))) {
          index += 2;
          ncg = true;
        }
        result += chr;
        groupid++;
        continue;
      case chr === '>' && ncg:
        if (groupname === '' || has$2(names, groupname)) {
          throw new SyntaxError('Invalid capture group name');
        }
        names[groupname] = true;
        named.push([groupname, groupid]);
        ncg = false;
        groupname = '';
        continue;
    }
    if (ncg) groupname += chr;
    else result += chr;
  } return [result, named];
};

// `RegExp` constructor
// https://tc39.es/ecma262/#sec-regexp-constructor
if (isForced('RegExp', BASE_FORCED)) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegExp$4(pattern);
    var flagsAreUndefined = flags === undefined;
    var groups = [];
    var rawPattern = pattern;
    var rawFlags, dotAll, sticky, handled, result, state;

    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
      return pattern;
    }

    if (patternIsRegExp || pattern instanceof RegExpWrapper) {
      pattern = pattern.source;
      if (flagsAreUndefined) flags = 'flags' in rawPattern ? rawPattern.flags : getFlags.call(rawPattern);
    }

    pattern = pattern === undefined ? '' : String(pattern);
    flags = flags === undefined ? '' : String(flags);
    rawPattern = pattern;

    if (UNSUPPORTED_DOT_ALL$2 && 'dotAll' in re1) {
      dotAll = !!flags && flags.indexOf('s') > -1;
      if (dotAll) flags = flags.replace(/s/g, '');
    }

    rawFlags = flags;

    if (UNSUPPORTED_Y$3 && 'sticky' in re1) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    if (UNSUPPORTED_NCG$1) {
      handled = handleNCG(pattern);
      pattern = handled[0];
      groups = handled[1];
    }

    result = inheritIfRequired$1(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$6, RegExpWrapper);

    if (dotAll || sticky || groups.length) {
      state = enforceInternalState(result);
      if (dotAll) {
        state.dotAll = true;
        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
      }
      if (sticky) state.sticky = true;
      if (groups.length) state.groups = groups;
    }

    if (pattern !== rawPattern) try {
      // fails in old engines, but we have no alternatives for unsupported regex syntax
      createNonEnumerableProperty$5(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
    } catch (error) { /* empty */ }

    return result;
  };

  var proxy = function (key) {
    key in RegExpWrapper || defineProperty$2(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };

  for (var keys = getOwnPropertyNames$1(NativeRegExp), index = 0; keys.length > index;) {
    proxy(keys[index++]);
  }

  RegExpPrototype$6.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype$6;
  redefine$4(global$e, 'RegExp', RegExpWrapper);
}

// https://tc39.es/ecma262/#sec-get-regexp-@@species
setSpecies$1('RegExp');

var DESCRIPTORS$4 = descriptors;
var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
var defineProperty$1 = objectDefineProperty.f;
var getInternalState$5 = internalState.get;
var RegExpPrototype$5 = RegExp.prototype;

// `RegExp.prototype.dotAll` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.dotall
if (DESCRIPTORS$4 && UNSUPPORTED_DOT_ALL$1) {
  defineProperty$1(RegExpPrototype$5, 'dotAll', {
    configurable: true,
    get: function () {
      if (this === RegExpPrototype$5) return undefined;
      // We can't use InternalStateModule.getterFor because
      // we don't add metadata for regexps created by a literal.
      if (this instanceof RegExp) {
        return !!getInternalState$5(this).dotAll;
      }
      throw TypeError('Incompatible receiver, RegExp required');
    }
  });
}

/* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var regexpFlags = regexpFlags$1;
var stickyHelpers$1 = regexpStickyHelpers;
var shared = shared$5.exports;
var create$2 = objectCreate;
var getInternalState$4 = internalState.get;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;

var nativeExec = RegExp.prototype.exec;
var nativeReplace = shared('native-string-replace', String.prototype.replace);

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y$2 = stickyHelpers$1.UNSUPPORTED_Y || stickyHelpers$1.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2 || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  // eslint-disable-next-line max-statements -- TODO
  patchedExec = function exec(str) {
    var re = this;
    var state = getInternalState$4(re);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = patchedExec.call(raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y$2 && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create$2(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

var regexpExec$3 = patchedExec;

var $$C = _export;
var exec = regexpExec$3;

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$$C({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});

var DESCRIPTORS$3 = descriptors;
var objectDefinePropertyModule = objectDefineProperty;
var regExpFlags = regexpFlags$1;
var fails$e = fails$_;

var FORCED$6 = DESCRIPTORS$3 && fails$e(function () {
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  return Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags').get.call({ dotAll: true, sticky: true }) !== 'sy';
});

// `RegExp.prototype.flags` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
if (FORCED$6) objectDefinePropertyModule.f(RegExp.prototype, 'flags', {
  configurable: true,
  get: regExpFlags
});

var DESCRIPTORS$2 = descriptors;
var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y;
var defineProperty = objectDefineProperty.f;
var getInternalState$3 = internalState.get;
var RegExpPrototype$4 = RegExp.prototype;

// `RegExp.prototype.sticky` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.sticky
if (DESCRIPTORS$2 && UNSUPPORTED_Y$1) {
  defineProperty(RegExpPrototype$4, 'sticky', {
    configurable: true,
    get: function () {
      if (this === RegExpPrototype$4) return undefined;
      // We can't use InternalStateModule.getterFor because
      // we don't add metadata for regexps created by a literal.
      if (this instanceof RegExp) {
        return !!getInternalState$3(this).sticky;
      }
      throw TypeError('Incompatible receiver, RegExp required');
    }
  });
}

// TODO: Remove from `core-js@4` since it's moved to entry points

var $$B = _export;
var isObject$4 = isObject$y;

var DELEGATES_TO_EXEC = function () {
  var execCalled = false;
  var re = /[ac]/;
  re.exec = function () {
    execCalled = true;
    return /./.exec.apply(this, arguments);
  };
  return re.test('abc') === true && execCalled;
}();

var nativeTest = /./.test;

// `RegExp.prototype.test` method
// https://tc39.es/ecma262/#sec-regexp.prototype.test
$$B({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
  test: function (str) {
    if (typeof this.exec !== 'function') {
      return nativeTest.call(this, str);
    }
    var result = this.exec(str);
    if (result !== null && !isObject$4(result)) {
      throw new Error('RegExp exec method returned something other than an Object or null');
    }
    return !!result;
  }
});

var redefine$3 = redefine$g.exports;
var anObject$8 = anObject$y;
var fails$d = fails$_;
var flags = regexpFlags$1;

var TO_STRING = 'toString';
var RegExpPrototype$3 = RegExp.prototype;
var nativeToString = RegExpPrototype$3[TO_STRING];

var NOT_GENERIC = fails$d(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine$3(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject$8(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype$3) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}

var collection$2 = collection$4;
var collectionStrong = collectionStrong$2;

// `Set` constructor
// https://tc39.es/ecma262/#sec-set-objects
collection$2('Set', function (init) {
  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

var toInteger$3 = toInteger$e;
var requireObjectCoercible$b = requireObjectCoercible$h;

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible$b($this));
    var position = toInteger$3(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

var $$A = _export;
var codeAt$1 = stringMultibyte.codeAt;

// `String.prototype.codePointAt` method
// https://tc39.es/ecma262/#sec-string.prototype.codepointat
$$A({ target: 'String', proto: true }, {
  codePointAt: function codePointAt(pos) {
    return codeAt$1(this, pos);
  }
});

var isRegExp$3 = isRegexp;

var notARegexp = function (it) {
  if (isRegExp$3(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};

var wellKnownSymbol$8 = wellKnownSymbol$w;

var MATCH = wellKnownSymbol$8('match');

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};

var $$z = _export;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var toLength$b = toLength$v;
var notARegExp$2 = notARegexp;
var requireObjectCoercible$a = requireObjectCoercible$h;
var correctIsRegExpLogic$2 = correctIsRegexpLogic;

// eslint-disable-next-line es/no-string-prototype-endswith -- safe
var $endsWith = ''.endsWith;
var min$4 = Math.min;

var CORRECT_IS_REGEXP_LOGIC$1 = correctIsRegExpLogic$2('endsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG$1 = !CORRECT_IS_REGEXP_LOGIC$1 && !!function () {
  var descriptor = getOwnPropertyDescriptor$1(String.prototype, 'endsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.endsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.endswith
$$z({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG$1 && !CORRECT_IS_REGEXP_LOGIC$1 }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = String(requireObjectCoercible$a(this));
    notARegExp$2(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength$b(that.length);
    var end = endPosition === undefined ? len : min$4(toLength$b(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

var $$y = _export;
var toAbsoluteIndex$1 = toAbsoluteIndex$8;

var fromCharCode$1 = String.fromCharCode;
// eslint-disable-next-line es/no-string-fromcodepoint -- required for testing
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
var INCORRECT_LENGTH = !!$fromCodePoint && $fromCodePoint.length != 1;

// `String.fromCodePoint` method
// https://tc39.es/ecma262/#sec-string.fromcodepoint
$$y({ target: 'String', stat: true, forced: INCORRECT_LENGTH }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  fromCodePoint: function fromCodePoint(x) {
    var elements = [];
    var length = arguments.length;
    var i = 0;
    var code;
    while (length > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex$1(code, 0x10FFFF) !== code) throw RangeError(code + ' is not a valid code point');
      elements.push(code < 0x10000
        ? fromCharCode$1(code)
        : fromCharCode$1(((code -= 0x10000) >> 10) + 0xD800, code % 0x400 + 0xDC00)
      );
    } return elements.join('');
  }
});

var $$x = _export;
var notARegExp$1 = notARegexp;
var requireObjectCoercible$9 = requireObjectCoercible$h;
var correctIsRegExpLogic$1 = correctIsRegexpLogic;

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$$x({ target: 'String', proto: true, forced: !correctIsRegExpLogic$1('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible$9(this))
      .indexOf(notARegExp$1(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});

var charAt$1 = stringMultibyte.charAt;
var InternalStateModule$5 = internalState;
var defineIterator = defineIterator$3;

var STRING_ITERATOR = 'String Iterator';
var setInternalState$5 = InternalStateModule$5.set;
var getInternalState$2 = InternalStateModule$5.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState$5(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$2(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt$1(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

// TODO: Remove from `core-js@4` since it's moved to entry points

var redefine$2 = redefine$g.exports;
var regexpExec$2 = regexpExec$3;
var fails$c = fails$_;
var wellKnownSymbol$7 = wellKnownSymbol$w;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$h;

var SPECIES = wellKnownSymbol$7('species');
var RegExpPrototype$2 = RegExp.prototype;

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$7(KEY);

  var DELEGATES_TO_SYMBOL = !fails$c(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$c(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var $exec = regexp.exec;
      if ($exec === regexpExec$2 || $exec === RegExpPrototype$2.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });

    redefine$2(String.prototype, KEY, methods[0]);
    redefine$2(RegExpPrototype$2, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty$4(RegExpPrototype$2[SYMBOL], 'sham', true);
};

var charAt = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
var advanceStringIndex$4 = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};

var classof$3 = classofRaw$1;
var regexpExec$1 = regexpExec$3;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof$3(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec$1.call(R, S);
};

var fixRegExpWellKnownSymbolLogic$3 = fixRegexpWellKnownSymbolLogic;
var anObject$7 = anObject$y;
var toLength$a = toLength$v;
var requireObjectCoercible$8 = requireObjectCoercible$h;
var advanceStringIndex$3 = advanceStringIndex$4;
var regExpExec$3 = regexpExecAbstract;

// @@match logic
fixRegExpWellKnownSymbolLogic$3('match', function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible$8(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var res = maybeCallNative(nativeMatch, this, string);
      if (res.done) return res.value;

      var rx = anObject$7(this);
      var S = String(string);

      if (!rx.global) return regExpExec$3(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec$3(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex$3(S, toLength$a(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

/* eslint-disable es/no-string-prototype-matchall -- safe */
var $$w = _export;
var createIteratorConstructor$1 = createIteratorConstructor$3;
var requireObjectCoercible$7 = requireObjectCoercible$h;
var toLength$9 = toLength$v;
var aFunction$1 = aFunction$g;
var anObject$6 = anObject$y;
var classof$2 = classofRaw$1;
var isRegExp$2 = isRegexp;
var getRegExpFlags$1 = regexpFlags$1;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$h;
var fails$b = fails$_;
var wellKnownSymbol$6 = wellKnownSymbol$w;
var speciesConstructor$5 = speciesConstructor$9;
var advanceStringIndex$2 = advanceStringIndex$4;
var InternalStateModule$4 = internalState;
var IS_PURE$1 = isPure;

var MATCH_ALL = wellKnownSymbol$6('matchAll');
var REGEXP_STRING = 'RegExp String';
var REGEXP_STRING_ITERATOR = REGEXP_STRING + ' Iterator';
var setInternalState$4 = InternalStateModule$4.set;
var getInternalState$1 = InternalStateModule$4.getterFor(REGEXP_STRING_ITERATOR);
var RegExpPrototype$1 = RegExp.prototype;
var regExpBuiltinExec = RegExpPrototype$1.exec;
var nativeMatchAll = ''.matchAll;

var WORKS_WITH_NON_GLOBAL_REGEX = !!nativeMatchAll && !fails$b(function () {
  'a'.matchAll(/./);
});

var regExpExec$2 = function (R, S) {
  var exec = R.exec;
  var result;
  if (typeof exec == 'function') {
    result = exec.call(R, S);
    if (typeof result != 'object') throw TypeError('Incorrect exec result');
    return result;
  } return regExpBuiltinExec.call(R, S);
};

// eslint-disable-next-line max-len -- ignore
var $RegExpStringIterator = createIteratorConstructor$1(function RegExpStringIterator(regexp, string, global, fullUnicode) {
  setInternalState$4(this, {
    type: REGEXP_STRING_ITERATOR,
    regexp: regexp,
    string: string,
    global: global,
    unicode: fullUnicode,
    done: false
  });
}, REGEXP_STRING, function next() {
  var state = getInternalState$1(this);
  if (state.done) return { value: undefined, done: true };
  var R = state.regexp;
  var S = state.string;
  var match = regExpExec$2(R, S);
  if (match === null) return { value: undefined, done: state.done = true };
  if (state.global) {
    if (String(match[0]) == '') R.lastIndex = advanceStringIndex$2(S, toLength$9(R.lastIndex), state.unicode);
    return { value: match, done: false };
  }
  state.done = true;
  return { value: match, done: false };
});

var $matchAll = function (string) {
  var R = anObject$6(this);
  var S = String(string);
  var C, flagsValue, flags, matcher, global, fullUnicode;
  C = speciesConstructor$5(R, RegExp);
  flagsValue = R.flags;
  if (flagsValue === undefined && R instanceof RegExp && !('flags' in RegExpPrototype$1)) {
    flagsValue = getRegExpFlags$1.call(R);
  }
  flags = flagsValue === undefined ? '' : String(flagsValue);
  matcher = new C(C === RegExp ? R.source : R, flags);
  global = !!~flags.indexOf('g');
  fullUnicode = !!~flags.indexOf('u');
  matcher.lastIndex = toLength$9(R.lastIndex);
  return new $RegExpStringIterator(matcher, S, global, fullUnicode);
};

// `String.prototype.matchAll` method
// https://tc39.es/ecma262/#sec-string.prototype.matchall
$$w({ target: 'String', proto: true, forced: WORKS_WITH_NON_GLOBAL_REGEX }, {
  matchAll: function matchAll(regexp) {
    var O = requireObjectCoercible$7(this);
    var flags, S, matcher, rx;
    if (regexp != null) {
      if (isRegExp$2(regexp)) {
        flags = String(requireObjectCoercible$7('flags' in RegExpPrototype$1
          ? regexp.flags
          : getRegExpFlags$1.call(regexp)
        ));
        if (!~flags.indexOf('g')) throw TypeError('`.matchAll` does not allow non-global regexes');
      }
      if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll.apply(O, arguments);
      matcher = regexp[MATCH_ALL];
      if (matcher === undefined && IS_PURE$1 && classof$2(regexp) == 'RegExp') matcher = $matchAll;
      if (matcher != null) return aFunction$1(matcher).call(regexp, O);
    } else if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll.apply(O, arguments);
    S = String(O);
    rx = new RegExp(regexp, 'g');
    return rx[MATCH_ALL](S);
  }
});

MATCH_ALL in RegExpPrototype$1 || createNonEnumerableProperty$3(RegExpPrototype$1, MATCH_ALL, $matchAll);

// https://github.com/zloirock/core-js/issues/280
var userAgent$1 = engineUserAgent;

// eslint-disable-next-line unicorn/no-unsafe-regex -- safe
var stringPadWebkitBug = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(userAgent$1);

var $$v = _export;
var $padEnd = stringPad.end;
var WEBKIT_BUG$1 = stringPadWebkitBug;

// `String.prototype.padEnd` method
// https://tc39.es/ecma262/#sec-string.prototype.padend
$$v({ target: 'String', proto: true, forced: WEBKIT_BUG$1 }, {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $padEnd(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $$u = _export;
var $padStart = stringPad.start;
var WEBKIT_BUG = stringPadWebkitBug;

// `String.prototype.padStart` method
// https://tc39.es/ecma262/#sec-string.prototype.padstart
$$u({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $$t = _export;
var toIndexedObject = toIndexedObject$d;
var toLength$8 = toLength$v;

// `String.raw` method
// https://tc39.es/ecma262/#sec-string.raw
$$t({ target: 'String', stat: true }, {
  raw: function raw(template) {
    var rawTemplate = toIndexedObject(template.raw);
    var literalSegments = toLength$8(rawTemplate.length);
    var argumentsLength = arguments.length;
    var elements = [];
    var i = 0;
    while (literalSegments > i) {
      elements.push(String(rawTemplate[i++]));
      if (i < argumentsLength) elements.push(String(arguments[i]));
    } return elements.join('');
  }
});

var $$s = _export;
var repeat = stringRepeat;

// `String.prototype.repeat` method
// https://tc39.es/ecma262/#sec-string.prototype.repeat
$$s({ target: 'String', proto: true }, {
  repeat: repeat
});

var toObject$2 = toObject$o;

var floor$3 = Math.floor;
var replace$1 = ''.replace;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
var getSubstitution$2 = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject$2(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace$1.call(replacement, symbols, function (match, ch) {
    var capture;
    switch (ch.charAt(0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return str.slice(0, position);
      case "'": return str.slice(tailPos);
      case '<':
        capture = namedCaptures[ch.slice(1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor$3(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};

var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
var fails$a = fails$_;
var anObject$5 = anObject$y;
var toLength$7 = toLength$v;
var toInteger$2 = toInteger$e;
var requireObjectCoercible$6 = requireObjectCoercible$h;
var advanceStringIndex$1 = advanceStringIndex$4;
var getSubstitution$1 = getSubstitution$2;
var regExpExec$1 = regexpExecAbstract;
var wellKnownSymbol$5 = wellKnownSymbol$w;

var REPLACE$1 = wellKnownSymbol$5('replace');
var max$2 = Math.max;
var min$3 = Math.min;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE$1]) {
    return /./[REPLACE$1]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$a(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic$2('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible$6(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE$1];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      if (
        typeof replaceValue === 'string' &&
        replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1 &&
        replaceValue.indexOf('$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, this, string, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject$5(this);
      var S = String(string);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec$1(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$7(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max$2(min$3(toInteger$2(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution$1(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

var $$r = _export;
var requireObjectCoercible$5 = requireObjectCoercible$h;
var isRegExp$1 = isRegexp;
var getRegExpFlags = regexpFlags$1;
var getSubstitution = getSubstitution$2;
var wellKnownSymbol$4 = wellKnownSymbol$w;

var REPLACE = wellKnownSymbol$4('replace');
var RegExpPrototype = RegExp.prototype;
var max$1 = Math.max;

var stringIndexOf = function (string, searchValue, fromIndex) {
  if (fromIndex > string.length) return -1;
  if (searchValue === '') return fromIndex;
  return string.indexOf(searchValue, fromIndex);
};

// `String.prototype.replaceAll` method
// https://tc39.es/ecma262/#sec-string.prototype.replaceall
$$r({ target: 'String', proto: true }, {
  replaceAll: function replaceAll(searchValue, replaceValue) {
    var O = requireObjectCoercible$5(this);
    var IS_REG_EXP, flags, replacer, string, searchString, functionalReplace, searchLength, advanceBy, replacement;
    var position = 0;
    var endOfLastMatch = 0;
    var result = '';
    if (searchValue != null) {
      IS_REG_EXP = isRegExp$1(searchValue);
      if (IS_REG_EXP) {
        flags = String(requireObjectCoercible$5('flags' in RegExpPrototype
          ? searchValue.flags
          : getRegExpFlags.call(searchValue)
        ));
        if (!~flags.indexOf('g')) throw TypeError('`.replaceAll` does not allow non-global regexes');
      }
      replacer = searchValue[REPLACE];
      if (replacer !== undefined) {
        return replacer.call(searchValue, O, replaceValue);
      }
    }
    string = String(O);
    searchString = String(searchValue);
    functionalReplace = typeof replaceValue === 'function';
    if (!functionalReplace) replaceValue = String(replaceValue);
    searchLength = searchString.length;
    advanceBy = max$1(1, searchLength);
    position = stringIndexOf(string, searchString, 0);
    while (position !== -1) {
      if (functionalReplace) {
        replacement = String(replaceValue(searchString, position, string));
      } else {
        replacement = getSubstitution(searchString, string, position, [], undefined, replaceValue);
      }
      result += string.slice(endOfLastMatch, position) + replacement;
      endOfLastMatch = position + searchLength;
      position = stringIndexOf(string, searchString, position + advanceBy);
    }
    if (endOfLastMatch < string.length) {
      result += string.slice(endOfLastMatch);
    }
    return result;
  }
});

var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
var anObject$4 = anObject$y;
var requireObjectCoercible$4 = requireObjectCoercible$h;
var sameValue = sameValue$1;
var regExpExec = regexpExecAbstract;

// @@search logic
fixRegExpWellKnownSymbolLogic$1('search', function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible$4(this);
      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function (string) {
      var res = maybeCallNative(nativeSearch, this, string);
      if (res.done) return res.value;

      var rx = anObject$4(this);
      var S = String(string);

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var isRegExp = isRegexp;
var anObject$3 = anObject$y;
var requireObjectCoercible$3 = requireObjectCoercible$h;
var speciesConstructor$4 = speciesConstructor$9;
var advanceStringIndex = advanceStringIndex$4;
var toLength$6 = toLength$v;
var callRegExpExec = regexpExecAbstract;
var regexpExec = regexpExec$3;
var stickyHelpers = regexpStickyHelpers;
var fails$9 = fails$_;

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var arrayPush = [].push;
var min$2 = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$9(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

// @@split logic
fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible$3(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible$3(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var res = maybeCallNative(internalSplit, this, string, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject$3(this);
      var S = String(string);
      var C = speciesConstructor$4(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y ? 'g' : 'y');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? S.slice(q) : S);
        var e;
        if (
          z === null ||
          (e = min$2(toLength$6(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

var $$q = _export;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var toLength$5 = toLength$v;
var notARegExp = notARegexp;
var requireObjectCoercible$2 = requireObjectCoercible$h;
var correctIsRegExpLogic = correctIsRegexpLogic;

// eslint-disable-next-line es/no-string-prototype-startswith -- safe
var $startsWith = ''.startsWith;
var min$1 = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith
$$q({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = String(requireObjectCoercible$2(this));
    notARegExp(searchString);
    var index = toLength$5(min$1(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

var $$p = _export;
var requireObjectCoercible$1 = requireObjectCoercible$h;
var toInteger$1 = toInteger$e;

var slice$1 = ''.slice;
var max = Math.max;
var min = Math.min;

// `String.prototype.substr` method
// https://tc39.es/ecma262/#sec-string.prototype.substr
$$p({ target: 'String', proto: true }, {
  substr: function substr(start, length) {
    var that = String(requireObjectCoercible$1(this));
    var size = that.length;
    var intStart = toInteger$1(start);
    var intLength, intEnd;
    if (intStart === Infinity) intStart = 0;
    if (intStart < 0) intStart = max(size + intStart, 0);
    intLength = length === undefined ? size : toInteger$1(length);
    if (intLength <= 0 || intLength === Infinity) return '';
    intEnd = min(intStart + intLength, size);
    return intStart >= intEnd ? '' : slice$1.call(that, intStart, intEnd);
  }
});

var fails$8 = fails$_;
var whitespaces = whitespaces$4;

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
var stringTrimForced = function (METHOD_NAME) {
  return fails$8(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};

var $$o = _export;
var $trim = stringTrim.trim;
var forcedStringTrimMethod$2 = stringTrimForced;

// `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim
$$o({ target: 'String', proto: true, forced: forcedStringTrimMethod$2('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});

var $$n = _export;
var $trimEnd = stringTrim.end;
var forcedStringTrimMethod$1 = stringTrimForced;

var FORCED$5 = forcedStringTrimMethod$1('trimEnd');

var trimEnd = FORCED$5 ? function trimEnd() {
  return $trimEnd(this);
// eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
} : ''.trimEnd;

// `String.prototype.{ trimEnd, trimRight }` methods
// https://tc39.es/ecma262/#sec-string.prototype.trimend
// https://tc39.es/ecma262/#String.prototype.trimright
$$n({ target: 'String', proto: true, forced: FORCED$5 }, {
  trimEnd: trimEnd,
  trimRight: trimEnd
});

var $$m = _export;
var $trimStart = stringTrim.start;
var forcedStringTrimMethod = stringTrimForced;

var FORCED$4 = forcedStringTrimMethod('trimStart');

var trimStart = FORCED$4 ? function trimStart() {
  return $trimStart(this);
// eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
} : ''.trimStart;

// `String.prototype.{ trimStart, trimLeft }` methods
// https://tc39.es/ecma262/#sec-string.prototype.trimstart
// https://tc39.es/ecma262/#String.prototype.trimleft
$$m({ target: 'String', proto: true, forced: FORCED$4 }, {
  trimStart: trimStart,
  trimLeft: trimStart
});

var requireObjectCoercible = requireObjectCoercible$h;

var quot = /"/g;

// `CreateHTML` abstract operation
// https://tc39.es/ecma262/#sec-createhtml
var createHtml = function (string, tag, attribute, value) {
  var S = String(requireObjectCoercible(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};

var fails$7 = fails$_;

// check the existence of a method, lowercase
// of a tag and escaping quotes in arguments
var stringHtmlForced = function (METHOD_NAME) {
  return fails$7(function () {
    var test = ''[METHOD_NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  });
};

var $$l = _export;
var createHTML$c = createHtml;
var forcedStringHTMLMethod$c = stringHtmlForced;

// `String.prototype.anchor` method
// https://tc39.es/ecma262/#sec-string.prototype.anchor
$$l({ target: 'String', proto: true, forced: forcedStringHTMLMethod$c('anchor') }, {
  anchor: function anchor(name) {
    return createHTML$c(this, 'a', 'name', name);
  }
});

var $$k = _export;
var createHTML$b = createHtml;
var forcedStringHTMLMethod$b = stringHtmlForced;

// `String.prototype.big` method
// https://tc39.es/ecma262/#sec-string.prototype.big
$$k({ target: 'String', proto: true, forced: forcedStringHTMLMethod$b('big') }, {
  big: function big() {
    return createHTML$b(this, 'big', '', '');
  }
});

var $$j = _export;
var createHTML$a = createHtml;
var forcedStringHTMLMethod$a = stringHtmlForced;

// `String.prototype.blink` method
// https://tc39.es/ecma262/#sec-string.prototype.blink
$$j({ target: 'String', proto: true, forced: forcedStringHTMLMethod$a('blink') }, {
  blink: function blink() {
    return createHTML$a(this, 'blink', '', '');
  }
});

var $$i = _export;
var createHTML$9 = createHtml;
var forcedStringHTMLMethod$9 = stringHtmlForced;

// `String.prototype.bold` method
// https://tc39.es/ecma262/#sec-string.prototype.bold
$$i({ target: 'String', proto: true, forced: forcedStringHTMLMethod$9('bold') }, {
  bold: function bold() {
    return createHTML$9(this, 'b', '', '');
  }
});

var $$h = _export;
var createHTML$8 = createHtml;
var forcedStringHTMLMethod$8 = stringHtmlForced;

// `String.prototype.fixed` method
// https://tc39.es/ecma262/#sec-string.prototype.fixed
$$h({ target: 'String', proto: true, forced: forcedStringHTMLMethod$8('fixed') }, {
  fixed: function fixed() {
    return createHTML$8(this, 'tt', '', '');
  }
});

var $$g = _export;
var createHTML$7 = createHtml;
var forcedStringHTMLMethod$7 = stringHtmlForced;

// `String.prototype.fontcolor` method
// https://tc39.es/ecma262/#sec-string.prototype.fontcolor
$$g({ target: 'String', proto: true, forced: forcedStringHTMLMethod$7('fontcolor') }, {
  fontcolor: function fontcolor(color) {
    return createHTML$7(this, 'font', 'color', color);
  }
});

var $$f = _export;
var createHTML$6 = createHtml;
var forcedStringHTMLMethod$6 = stringHtmlForced;

// `String.prototype.fontsize` method
// https://tc39.es/ecma262/#sec-string.prototype.fontsize
$$f({ target: 'String', proto: true, forced: forcedStringHTMLMethod$6('fontsize') }, {
  fontsize: function fontsize(size) {
    return createHTML$6(this, 'font', 'size', size);
  }
});

var $$e = _export;
var createHTML$5 = createHtml;
var forcedStringHTMLMethod$5 = stringHtmlForced;

// `String.prototype.italics` method
// https://tc39.es/ecma262/#sec-string.prototype.italics
$$e({ target: 'String', proto: true, forced: forcedStringHTMLMethod$5('italics') }, {
  italics: function italics() {
    return createHTML$5(this, 'i', '', '');
  }
});

var $$d = _export;
var createHTML$4 = createHtml;
var forcedStringHTMLMethod$4 = stringHtmlForced;

// `String.prototype.link` method
// https://tc39.es/ecma262/#sec-string.prototype.link
$$d({ target: 'String', proto: true, forced: forcedStringHTMLMethod$4('link') }, {
  link: function link(url) {
    return createHTML$4(this, 'a', 'href', url);
  }
});

var $$c = _export;
var createHTML$3 = createHtml;
var forcedStringHTMLMethod$3 = stringHtmlForced;

// `String.prototype.small` method
// https://tc39.es/ecma262/#sec-string.prototype.small
$$c({ target: 'String', proto: true, forced: forcedStringHTMLMethod$3('small') }, {
  small: function small() {
    return createHTML$3(this, 'small', '', '');
  }
});

var $$b = _export;
var createHTML$2 = createHtml;
var forcedStringHTMLMethod$2 = stringHtmlForced;

// `String.prototype.strike` method
// https://tc39.es/ecma262/#sec-string.prototype.strike
$$b({ target: 'String', proto: true, forced: forcedStringHTMLMethod$2('strike') }, {
  strike: function strike() {
    return createHTML$2(this, 'strike', '', '');
  }
});

var $$a = _export;
var createHTML$1 = createHtml;
var forcedStringHTMLMethod$1 = stringHtmlForced;

// `String.prototype.sub` method
// https://tc39.es/ecma262/#sec-string.prototype.sub
$$a({ target: 'String', proto: true, forced: forcedStringHTMLMethod$1('sub') }, {
  sub: function sub() {
    return createHTML$1(this, 'sub', '', '');
  }
});

var $$9 = _export;
var createHTML = createHtml;
var forcedStringHTMLMethod = stringHtmlForced;

// `String.prototype.sup` method
// https://tc39.es/ecma262/#sec-string.prototype.sup
$$9({ target: 'String', proto: true, forced: forcedStringHTMLMethod('sup') }, {
  sup: function sup() {
    return createHTML(this, 'sup', '', '');
  }
});

var typedArrayConstructor = {exports: {}};

/* eslint-disable no-new -- required for testing */

var global$d = global$K;
var fails$6 = fails$_;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$4;
var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

var ArrayBuffer$2 = global$d.ArrayBuffer;
var Int8Array$2 = global$d.Int8Array;

var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails$6(function () {
  Int8Array$2(1);
}) || !fails$6(function () {
  new Int8Array$2(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array$2();
  new Int8Array$2(null);
  new Int8Array$2(1.5);
  new Int8Array$2(iterable);
}, true) || fails$6(function () {
  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
  return new Int8Array$2(new ArrayBuffer$2(2), 1, undefined).length !== 1;
});

var toInteger = toInteger$e;

var toPositiveInteger$1 = function (it) {
  var result = toInteger(it);
  if (result < 0) throw RangeError("The argument can't be less than 0");
  return result;
};

var toPositiveInteger = toPositiveInteger$1;

var toOffset$2 = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};

var toObject$1 = toObject$o;
var toLength$4 = toLength$v;
var getIteratorMethod$2 = getIteratorMethod$5;
var isArrayIteratorMethod = isArrayIteratorMethod$3;
var bind$1 = functionBindContext;
var aTypedArrayConstructor$5 = arrayBufferViewCore.aTypedArrayConstructor;

var typedArrayFrom$2 = function from(source /* , mapfn, thisArg */) {
  var O = toObject$1(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod$2(O);
  var i, length, result, step, iterator, next;
  if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    O = [];
    while (!(step = next.call(iterator)).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = bind$1(mapfn, arguments[2], 2);
  }
  length = toLength$4(O.length);
  result = new (aTypedArrayConstructor$5(this))(length);
  for (i = 0; length > i; i++) {
    result[i] = mapping ? mapfn(O[i], i) : O[i];
  }
  return result;
};

var $$8 = _export;
var global$c = global$K;
var DESCRIPTORS$1 = descriptors;
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS$2 = typedArrayConstructorsRequireWrappers;
var ArrayBufferViewCore$n = arrayBufferViewCore;
var ArrayBufferModule = arrayBuffer;
var anInstance$3 = anInstance$8;
var createPropertyDescriptor$1 = createPropertyDescriptor$9;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$h;
var toLength$3 = toLength$v;
var toIndex = toIndex$2;
var toOffset$1 = toOffset$2;
var toPrimitive = toPrimitive$b;
var has$1 = has$k;
var classof$1 = classof$b;
var isObject$3 = isObject$y;
var create$1 = objectCreate;
var setPrototypeOf = objectSetPrototypeOf$1;
var getOwnPropertyNames = objectGetOwnPropertyNames.f;
var typedArrayFrom$1 = typedArrayFrom$2;
var forEach$1 = arrayIteration.forEach;
var setSpecies = setSpecies$6;
var definePropertyModule = objectDefineProperty;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var InternalStateModule$3 = internalState;
var inheritIfRequired = inheritIfRequired$4;

var getInternalState = InternalStateModule$3.get;
var setInternalState$3 = InternalStateModule$3.set;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var round = Math.round;
var RangeError$1 = global$c.RangeError;
var ArrayBuffer$1 = ArrayBufferModule.ArrayBuffer;
var DataView$1 = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore$n.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_TAG = ArrayBufferViewCore$n.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore$n.TypedArray;
var TypedArrayPrototype = ArrayBufferViewCore$n.TypedArrayPrototype;
var aTypedArrayConstructor$4 = ArrayBufferViewCore$n.aTypedArrayConstructor;
var isTypedArray = ArrayBufferViewCore$n.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var fromList = function (C, list) {
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor$4(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var addGetter = function (it, key) {
  nativeDefineProperty(it, key, { get: function () {
    return getInternalState(this)[key];
  } });
};

var isArrayBuffer = function (it) {
  var klass;
  return it instanceof ArrayBuffer$1 || (klass = classof$1(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
};

var isTypedArrayIndex = function (target, key) {
  return isTypedArray(target)
    && typeof key != 'symbol'
    && key in target
    && String(+key) == String(key);
};

var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
  return isTypedArrayIndex(target, key = toPrimitive(key, true))
    ? createPropertyDescriptor$1(2, target[key])
    : nativeGetOwnPropertyDescriptor(target, key);
};

var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
  if (isTypedArrayIndex(target, key = toPrimitive(key, true))
    && isObject$3(descriptor)
    && has$1(descriptor, 'value')
    && !has$1(descriptor, 'get')
    && !has$1(descriptor, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable
    && (!has$1(descriptor, 'writable') || descriptor.writable)
    && (!has$1(descriptor, 'enumerable') || descriptor.enumerable)
  ) {
    target[key] = descriptor.value;
    return target;
  } return nativeDefineProperty(target, key, descriptor);
};

if (DESCRIPTORS$1) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $$8({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  typedArrayConstructor.exports = function (TYPE, wrapper, CLAMPED) {
    var BYTES = TYPE.match(/\d+$/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global$c[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState(that);
      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance$3(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject$3(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer$1(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset$1(offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError$1(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError$1(WRONG_LENGTH);
          } else {
            byteLength = toLength$3($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError$1(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return typedArrayFrom$1.call(TypedArrayConstructor, data);
        }
        setInternalState$3(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView$1(buffer)
        });
        while (index < length) addElement(that, index++);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create$1(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS$2) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance$3(dummy, TypedArrayConstructor, CONSTRUCTOR_NAME);
        return inheritIfRequired(function () {
          if (!isObject$3(data)) return new NativeTypedArrayConstructor(toIndex(data));
          if (isArrayBuffer(data)) return $length !== undefined
            ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES), $length)
            : typedArrayOffset !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES))
              : new NativeTypedArrayConstructor(data);
          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
          return typedArrayFrom$1.call(TypedArrayConstructor, data);
        }(), dummy, TypedArrayConstructor);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      forEach$1(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty$2(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty$2(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty$2(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

    $$8({
      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
    }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty$2(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty$2(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else typedArrayConstructor.exports = function () { /* empty */ };

var createTypedArrayConstructor$8 = typedArrayConstructor.exports;

// `Float32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor$8('Float32', function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var createTypedArrayConstructor$7 = typedArrayConstructor.exports;

// `Float64Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor$7('Float64', function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var createTypedArrayConstructor$6 = typedArrayConstructor.exports;

// `Int8Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor$6('Int8', function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var createTypedArrayConstructor$5 = typedArrayConstructor.exports;

// `Int16Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor$5('Int16', function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var createTypedArrayConstructor$4 = typedArrayConstructor.exports;

// `Int32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor$4('Int32', function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var createTypedArrayConstructor$3 = typedArrayConstructor.exports;

// `Uint8Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor$3('Uint8', function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var createTypedArrayConstructor$2 = typedArrayConstructor.exports;

// `Uint8ClampedArray` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor$2('Uint8', function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

var createTypedArrayConstructor$1 = typedArrayConstructor.exports;

// `Uint16Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor$1('Uint16', function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var createTypedArrayConstructor = typedArrayConstructor.exports;

// `Uint32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint32', function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var ArrayBufferViewCore$m = arrayBufferViewCore;
var $copyWithin = arrayCopyWithin;

var aTypedArray$l = ArrayBufferViewCore$m.aTypedArray;
var exportTypedArrayMethod$m = ArrayBufferViewCore$m.exportTypedArrayMethod;

// `%TypedArray%.prototype.copyWithin` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin
exportTypedArrayMethod$m('copyWithin', function copyWithin(target, start /* , end */) {
  return $copyWithin.call(aTypedArray$l(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
});

var ArrayBufferViewCore$l = arrayBufferViewCore;
var $every = arrayIteration.every;

var aTypedArray$k = ArrayBufferViewCore$l.aTypedArray;
var exportTypedArrayMethod$l = ArrayBufferViewCore$l.exportTypedArrayMethod;

// `%TypedArray%.prototype.every` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.every
exportTypedArrayMethod$l('every', function every(callbackfn /* , thisArg */) {
  return $every(aTypedArray$k(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

var ArrayBufferViewCore$k = arrayBufferViewCore;
var $fill = arrayFill$1;

var aTypedArray$j = ArrayBufferViewCore$k.aTypedArray;
var exportTypedArrayMethod$k = ArrayBufferViewCore$k.exportTypedArrayMethod;

// `%TypedArray%.prototype.fill` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
// eslint-disable-next-line no-unused-vars -- required for `.length`
exportTypedArrayMethod$k('fill', function fill(value /* , start, end */) {
  return $fill.apply(aTypedArray$j(this), arguments);
});

var aTypedArrayConstructor$3 = arrayBufferViewCore.aTypedArrayConstructor;
var speciesConstructor$3 = speciesConstructor$9;

var typedArrayFromSpeciesAndList = function (instance, list) {
  var C = speciesConstructor$3(instance, instance.constructor);
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor$3(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var ArrayBufferViewCore$j = arrayBufferViewCore;
var $filter = arrayIteration.filter;
var fromSpeciesAndList = typedArrayFromSpeciesAndList;

var aTypedArray$i = ArrayBufferViewCore$j.aTypedArray;
var exportTypedArrayMethod$j = ArrayBufferViewCore$j.exportTypedArrayMethod;

// `%TypedArray%.prototype.filter` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.filter
exportTypedArrayMethod$j('filter', function filter(callbackfn /* , thisArg */) {
  var list = $filter(aTypedArray$i(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  return fromSpeciesAndList(this, list);
});

var ArrayBufferViewCore$i = arrayBufferViewCore;
var $find = arrayIteration.find;

var aTypedArray$h = ArrayBufferViewCore$i.aTypedArray;
var exportTypedArrayMethod$i = ArrayBufferViewCore$i.exportTypedArrayMethod;

// `%TypedArray%.prototype.find` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.find
exportTypedArrayMethod$i('find', function find(predicate /* , thisArg */) {
  return $find(aTypedArray$h(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

var ArrayBufferViewCore$h = arrayBufferViewCore;
var $findIndex = arrayIteration.findIndex;

var aTypedArray$g = ArrayBufferViewCore$h.aTypedArray;
var exportTypedArrayMethod$h = ArrayBufferViewCore$h.exportTypedArrayMethod;

// `%TypedArray%.prototype.findIndex` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findindex
exportTypedArrayMethod$h('findIndex', function findIndex(predicate /* , thisArg */) {
  return $findIndex(aTypedArray$g(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

var ArrayBufferViewCore$g = arrayBufferViewCore;
var $forEach = arrayIteration.forEach;

var aTypedArray$f = ArrayBufferViewCore$g.aTypedArray;
var exportTypedArrayMethod$g = ArrayBufferViewCore$g.exportTypedArrayMethod;

// `%TypedArray%.prototype.forEach` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.foreach
exportTypedArrayMethod$g('forEach', function forEach(callbackfn /* , thisArg */) {
  $forEach(aTypedArray$f(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS$1 = typedArrayConstructorsRequireWrappers;
var exportTypedArrayStaticMethod$1 = arrayBufferViewCore.exportTypedArrayStaticMethod;
var typedArrayFrom = typedArrayFrom$2;

// `%TypedArray%.from` method
// https://tc39.es/ecma262/#sec-%typedarray%.from
exportTypedArrayStaticMethod$1('from', typedArrayFrom, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS$1);

var ArrayBufferViewCore$f = arrayBufferViewCore;
var $includes = arrayIncludes.includes;

var aTypedArray$e = ArrayBufferViewCore$f.aTypedArray;
var exportTypedArrayMethod$f = ArrayBufferViewCore$f.exportTypedArrayMethod;

// `%TypedArray%.prototype.includes` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.includes
exportTypedArrayMethod$f('includes', function includes(searchElement /* , fromIndex */) {
  return $includes(aTypedArray$e(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});

var ArrayBufferViewCore$e = arrayBufferViewCore;
var $indexOf = arrayIncludes.indexOf;

var aTypedArray$d = ArrayBufferViewCore$e.aTypedArray;
var exportTypedArrayMethod$e = ArrayBufferViewCore$e.exportTypedArrayMethod;

// `%TypedArray%.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof
exportTypedArrayMethod$e('indexOf', function indexOf(searchElement /* , fromIndex */) {
  return $indexOf(aTypedArray$d(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});

var global$b = global$K;
var ArrayBufferViewCore$d = arrayBufferViewCore;
var ArrayIterators = es_array_iterator;
var wellKnownSymbol$3 = wellKnownSymbol$w;

var ITERATOR$3 = wellKnownSymbol$3('iterator');
var Uint8Array$1 = global$b.Uint8Array;
var arrayValues = ArrayIterators.values;
var arrayKeys = ArrayIterators.keys;
var arrayEntries = ArrayIterators.entries;
var aTypedArray$c = ArrayBufferViewCore$d.aTypedArray;
var exportTypedArrayMethod$d = ArrayBufferViewCore$d.exportTypedArrayMethod;
var nativeTypedArrayIterator = Uint8Array$1 && Uint8Array$1.prototype[ITERATOR$3];

var CORRECT_ITER_NAME = !!nativeTypedArrayIterator
  && (nativeTypedArrayIterator.name == 'values' || nativeTypedArrayIterator.name == undefined);

var typedArrayValues = function values() {
  return arrayValues.call(aTypedArray$c(this));
};

// `%TypedArray%.prototype.entries` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries
exportTypedArrayMethod$d('entries', function entries() {
  return arrayEntries.call(aTypedArray$c(this));
});
// `%TypedArray%.prototype.keys` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys
exportTypedArrayMethod$d('keys', function keys() {
  return arrayKeys.call(aTypedArray$c(this));
});
// `%TypedArray%.prototype.values` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.values
exportTypedArrayMethod$d('values', typedArrayValues, !CORRECT_ITER_NAME);
// `%TypedArray%.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype-@@iterator
exportTypedArrayMethod$d(ITERATOR$3, typedArrayValues, !CORRECT_ITER_NAME);

var ArrayBufferViewCore$c = arrayBufferViewCore;

var aTypedArray$b = ArrayBufferViewCore$c.aTypedArray;
var exportTypedArrayMethod$c = ArrayBufferViewCore$c.exportTypedArrayMethod;
var $join = [].join;

// `%TypedArray%.prototype.join` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.join
// eslint-disable-next-line no-unused-vars -- required for `.length`
exportTypedArrayMethod$c('join', function join(separator) {
  return $join.apply(aTypedArray$b(this), arguments);
});

var ArrayBufferViewCore$b = arrayBufferViewCore;
var $lastIndexOf = arrayLastIndexOf;

var aTypedArray$a = ArrayBufferViewCore$b.aTypedArray;
var exportTypedArrayMethod$b = ArrayBufferViewCore$b.exportTypedArrayMethod;

// `%TypedArray%.prototype.lastIndexOf` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof
// eslint-disable-next-line no-unused-vars -- required for `.length`
exportTypedArrayMethod$b('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
  return $lastIndexOf.apply(aTypedArray$a(this), arguments);
});

var ArrayBufferViewCore$a = arrayBufferViewCore;
var $map = arrayIteration.map;
var speciesConstructor$2 = speciesConstructor$9;

var aTypedArray$9 = ArrayBufferViewCore$a.aTypedArray;
var aTypedArrayConstructor$2 = ArrayBufferViewCore$a.aTypedArrayConstructor;
var exportTypedArrayMethod$a = ArrayBufferViewCore$a.exportTypedArrayMethod;

// `%TypedArray%.prototype.map` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.map
exportTypedArrayMethod$a('map', function map(mapfn /* , thisArg */) {
  return $map(aTypedArray$9(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
    return new (aTypedArrayConstructor$2(speciesConstructor$2(O, O.constructor)))(length);
  });
});

var ArrayBufferViewCore$9 = arrayBufferViewCore;
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = typedArrayConstructorsRequireWrappers;

var aTypedArrayConstructor$1 = ArrayBufferViewCore$9.aTypedArrayConstructor;
var exportTypedArrayStaticMethod = ArrayBufferViewCore$9.exportTypedArrayStaticMethod;

// `%TypedArray%.of` method
// https://tc39.es/ecma262/#sec-%typedarray%.of
exportTypedArrayStaticMethod('of', function of(/* ...items */) {
  var index = 0;
  var length = arguments.length;
  var result = new (aTypedArrayConstructor$1(this))(length);
  while (length > index) result[index] = arguments[index++];
  return result;
}, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);

var ArrayBufferViewCore$8 = arrayBufferViewCore;
var $reduce = arrayReduce.left;

var aTypedArray$8 = ArrayBufferViewCore$8.aTypedArray;
var exportTypedArrayMethod$9 = ArrayBufferViewCore$8.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduce` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduce
exportTypedArrayMethod$9('reduce', function reduce(callbackfn /* , initialValue */) {
  return $reduce(aTypedArray$8(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
});

var ArrayBufferViewCore$7 = arrayBufferViewCore;
var $reduceRight = arrayReduce.right;

var aTypedArray$7 = ArrayBufferViewCore$7.aTypedArray;
var exportTypedArrayMethod$8 = ArrayBufferViewCore$7.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduceRicht` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright
exportTypedArrayMethod$8('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
  return $reduceRight(aTypedArray$7(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
});

var ArrayBufferViewCore$6 = arrayBufferViewCore;

var aTypedArray$6 = ArrayBufferViewCore$6.aTypedArray;
var exportTypedArrayMethod$7 = ArrayBufferViewCore$6.exportTypedArrayMethod;
var floor$2 = Math.floor;

// `%TypedArray%.prototype.reverse` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reverse
exportTypedArrayMethod$7('reverse', function reverse() {
  var that = this;
  var length = aTypedArray$6(that).length;
  var middle = floor$2(length / 2);
  var index = 0;
  var value;
  while (index < middle) {
    value = that[index];
    that[index++] = that[--length];
    that[length] = value;
  } return that;
});

var ArrayBufferViewCore$5 = arrayBufferViewCore;
var toLength$2 = toLength$v;
var toOffset = toOffset$2;
var toObject = toObject$o;
var fails$5 = fails$_;

var aTypedArray$5 = ArrayBufferViewCore$5.aTypedArray;
var exportTypedArrayMethod$6 = ArrayBufferViewCore$5.exportTypedArrayMethod;

var FORCED$3 = fails$5(function () {
  // eslint-disable-next-line es/no-typed-arrays -- required for testing
  new Int8Array(1).set({});
});

// `%TypedArray%.prototype.set` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod$6('set', function set(arrayLike /* , offset */) {
  aTypedArray$5(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var length = this.length;
  var src = toObject(arrayLike);
  var len = toLength$2(src.length);
  var index = 0;
  if (len + offset > length) throw RangeError('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, FORCED$3);

var ArrayBufferViewCore$4 = arrayBufferViewCore;
var speciesConstructor$1 = speciesConstructor$9;
var fails$4 = fails$_;

var aTypedArray$4 = ArrayBufferViewCore$4.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore$4.aTypedArrayConstructor;
var exportTypedArrayMethod$5 = ArrayBufferViewCore$4.exportTypedArrayMethod;
var $slice$1 = [].slice;

var FORCED$2 = fails$4(function () {
  // eslint-disable-next-line es/no-typed-arrays -- required for testing
  new Int8Array(1).slice();
});

// `%TypedArray%.prototype.slice` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice
exportTypedArrayMethod$5('slice', function slice(start, end) {
  var list = $slice$1.call(aTypedArray$4(this), start, end);
  var C = speciesConstructor$1(this, this.constructor);
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
}, FORCED$2);

var ArrayBufferViewCore$3 = arrayBufferViewCore;
var $some = arrayIteration.some;

var aTypedArray$3 = ArrayBufferViewCore$3.aTypedArray;
var exportTypedArrayMethod$4 = ArrayBufferViewCore$3.exportTypedArrayMethod;

// `%TypedArray%.prototype.some` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.some
exportTypedArrayMethod$4('some', function some(callbackfn /* , thisArg */) {
  return $some(aTypedArray$3(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});

var ArrayBufferViewCore$2 = arrayBufferViewCore;
var global$a = global$K;
var fails$3 = fails$_;
var aFunction = aFunction$g;
var toLength$1 = toLength$v;
var internalSort = arraySort;
var FF = engineFfVersion;
var IE_OR_EDGE = engineIsIeOrEdge;
var V8 = engineV8Version;
var WEBKIT = engineWebkitVersion;

var aTypedArray$2 = ArrayBufferViewCore$2.aTypedArray;
var exportTypedArrayMethod$3 = ArrayBufferViewCore$2.exportTypedArrayMethod;
var Uint16Array = global$a.Uint16Array;
var nativeSort = Uint16Array && Uint16Array.prototype.sort;

// WebKit
var ACCEPT_INCORRECT_ARGUMENTS = !!nativeSort && !fails$3(function () {
  var array = new Uint16Array(2);
  array.sort(null);
  array.sort({});
});

var STABLE_SORT = !!nativeSort && !fails$3(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 74;
  if (FF) return FF < 67;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 602;

  var array = new Uint16Array(516);
  var expected = Array(516);
  var index, mod;

  for (index = 0; index < 516; index++) {
    mod = index % 4;
    array[index] = 515 - index;
    expected[index] = index - 2 * mod + 3;
  }

  array.sort(function (a, b) {
    return (a / 4 | 0) - (b / 4 | 0);
  });

  for (index = 0; index < 516; index++) {
    if (array[index] !== expected[index]) return true;
  }
});

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    // eslint-disable-next-line no-self-compare -- NaN check
    if (y !== y) return -1;
    // eslint-disable-next-line no-self-compare -- NaN check
    if (x !== x) return 1;
    if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
    return x > y;
  };
};

// `%TypedArray%.prototype.sort` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort
exportTypedArrayMethod$3('sort', function sort(comparefn) {
  var array = this;
  if (comparefn !== undefined) aFunction(comparefn);
  if (STABLE_SORT) return nativeSort.call(array, comparefn);

  aTypedArray$2(array);
  var arrayLength = toLength$1(array.length);
  var items = Array(arrayLength);
  var index;

  for (index = 0; index < arrayLength; index++) {
    items[index] = array[index];
  }

  items = internalSort(array, getSortCompare(comparefn));

  for (index = 0; index < arrayLength; index++) {
    array[index] = items[index];
  }

  return array;
}, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);

var ArrayBufferViewCore$1 = arrayBufferViewCore;
var toLength = toLength$v;
var toAbsoluteIndex = toAbsoluteIndex$8;
var speciesConstructor = speciesConstructor$9;

var aTypedArray$1 = ArrayBufferViewCore$1.aTypedArray;
var exportTypedArrayMethod$2 = ArrayBufferViewCore$1.exportTypedArrayMethod;

// `%TypedArray%.prototype.subarray` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.subarray
exportTypedArrayMethod$2('subarray', function subarray(begin, end) {
  var O = aTypedArray$1(this);
  var length = O.length;
  var beginIndex = toAbsoluteIndex(begin, length);
  return new (speciesConstructor(O, O.constructor))(
    O.buffer,
    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
    toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
  );
});

var global$9 = global$K;
var ArrayBufferViewCore = arrayBufferViewCore;
var fails$2 = fails$_;

var Int8Array$1 = global$9.Int8Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$1 = ArrayBufferViewCore.exportTypedArrayMethod;
var $toLocaleString = [].toLocaleString;
var $slice = [].slice;

// iOS Safari 6.x fails here
var TO_LOCALE_STRING_BUG = !!Int8Array$1 && fails$2(function () {
  $toLocaleString.call(new Int8Array$1(1));
});

var FORCED$1 = fails$2(function () {
  return [1, 2].toLocaleString() != new Int8Array$1([1, 2]).toLocaleString();
}) || !fails$2(function () {
  Int8Array$1.prototype.toLocaleString.call([1, 2]);
});

// `%TypedArray%.prototype.toLocaleString` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring
exportTypedArrayMethod$1('toLocaleString', function toLocaleString() {
  return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice.call(aTypedArray(this)) : aTypedArray(this), arguments);
}, FORCED$1);

var exportTypedArrayMethod = arrayBufferViewCore.exportTypedArrayMethod;
var fails$1 = fails$_;
var global$8 = global$K;

var Uint8Array = global$8.Uint8Array;
var Uint8ArrayPrototype = Uint8Array && Uint8Array.prototype || {};
var arrayToString = [].toString;
var arrayJoin = [].join;

if (fails$1(function () { arrayToString.call({}); })) {
  arrayToString = function toString() {
    return arrayJoin.call(this);
  };
}

var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;

// `%TypedArray%.prototype.toString` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tostring
exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);

var $$7 = _export;

var fromCharCode = String.fromCharCode;
var hex2 = /^[\da-f]{2}$/i;
var hex4 = /^[\da-f]{4}$/i;

// `unescape` method
// https://tc39.es/ecma262/#sec-unescape-string
$$7({ global: true }, {
  unescape: function unescape(string) {
    var str = String(string);
    var result = '';
    var length = str.length;
    var index = 0;
    var chr, slice;
    while (index < length) {
      chr = str.charAt(index++);
      if (chr === '%') {
        if (str.charAt(index) === 'u') {
          slice = str.slice(index + 1, index + 5);
          if (hex4.test(slice)) {
            result += fromCharCode(parseInt(slice, 16));
            index += 5;
            continue;
          }
        } else {
          slice = str.slice(index, index + 2);
          if (hex2.test(slice)) {
            result += fromCharCode(parseInt(slice, 16));
            index += 2;
            continue;
          }
        }
      }
      result += chr;
    } return result;
  }
});

var redefineAll$2 = redefineAll$6;
var getWeakData = internalMetadata.exports.getWeakData;
var anObject$2 = anObject$y;
var isObject$2 = isObject$y;
var anInstance$2 = anInstance$8;
var iterate = iterate$8;
var ArrayIterationModule = arrayIteration;
var $has = has$k;
var InternalStateModule$2 = internalState;

var setInternalState$2 = InternalStateModule$2.set;
var internalStateGetterFor = InternalStateModule$2.getterFor;
var find$1 = ArrayIterationModule.find;
var findIndex = ArrayIterationModule.findIndex;
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find$1(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) this.entries.splice(index, 1);
    return !!~index;
  }
};

var collectionWeak$2 = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance$2(that, C, CONSTRUCTOR_NAME);
      setInternalState$2(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject$2(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    redefineAll$2(C.prototype, {
      // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
      // https://tc39.es/ecma262/#sec-weakset.prototype.delete
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject$2(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && $has(data, state.id) && delete data[state.id];
      },
      // `{ WeakMap, WeakSet }.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.has
      // https://tc39.es/ecma262/#sec-weakset.prototype.has
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject$2(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && $has(data, state.id);
      }
    });

    redefineAll$2(C.prototype, IS_MAP ? {
      // `WeakMap.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.get
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject$2(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // `WeakMap.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.set
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // `WeakSet.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-weakset.prototype.add
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return C;
  }
};

var global$7 = global$K;
var redefineAll$1 = redefineAll$6;
var InternalMetadataModule = internalMetadata.exports;
var collection$1 = collection$4;
var collectionWeak$1 = collectionWeak$2;
var isObject$1 = isObject$y;
var enforceIternalState = internalState.enforce;
var NATIVE_WEAK_MAP = nativeWeakMap;

var IS_IE11 = !global$7.ActiveXObject && 'ActiveXObject' in global$7;
// eslint-disable-next-line es/no-object-isextensible -- safe
var isExtensible = Object.isExtensible;
var InternalWeakMap;

var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.es/ecma262/#sec-weakmap-constructor
var $WeakMap = collection$1('WeakMap', wrapper, collectionWeak$1);

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalWeakMap = collectionWeak$1.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.REQUIRED = true;
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = WeakMapPrototype['delete'];
  var nativeHas = WeakMapPrototype.has;
  var nativeGet = WeakMapPrototype.get;
  var nativeSet = WeakMapPrototype.set;
  redefineAll$1(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject$1(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete.call(this, key) || state.frozen['delete'](key);
      } return nativeDelete.call(this, key);
    },
    has: function has(key) {
      if (isObject$1(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) || state.frozen.has(key);
      } return nativeHas.call(this, key);
    },
    get: function get(key) {
      if (isObject$1(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
      } return nativeGet.call(this, key);
    },
    set: function set(key, value) {
      if (isObject$1(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
      } else nativeSet.call(this, key, value);
      return this;
    }
  });
}

var collection = collection$4;
var collectionWeak = collectionWeak$2;

// `WeakSet` constructor
// https://tc39.es/ecma262/#sec-weakset-constructor
collection('WeakSet', function (init) {
  return function WeakSet() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionWeak);

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

var global$6 = global$K;
var DOMIterables$1 = domIterables;
var forEach = arrayForEach;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$h;

for (var COLLECTION_NAME$1 in DOMIterables$1) {
  var Collection$1 = global$6[COLLECTION_NAME$1];
  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype$1 && CollectionPrototype$1.forEach !== forEach) try {
    createNonEnumerableProperty$1(CollectionPrototype$1, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype$1.forEach = forEach;
  }
}

var global$5 = global$K;
var DOMIterables = domIterables;
var ArrayIteratorMethods = es_array_iterator;
var createNonEnumerableProperty = createNonEnumerableProperty$h;
var wellKnownSymbol$2 = wellKnownSymbol$w;

var ITERATOR$2 = wellKnownSymbol$2('iterator');
var TO_STRING_TAG = wellKnownSymbol$2('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global$5[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR$2, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR$2] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}

var $$6 = _export;
var global$4 = global$K;
var task = task$2;

var FORCED = !global$4.setImmediate || !global$4.clearImmediate;

// http://w3c.github.io/setImmediate/
$$6({ global: true, bind: true, enumerable: true, forced: FORCED }, {
  // `setImmediate` method
  // http://w3c.github.io/setImmediate/#si-setImmediate
  setImmediate: task.set,
  // `clearImmediate` method
  // http://w3c.github.io/setImmediate/#si-clearImmediate
  clearImmediate: task.clear
});

var $$5 = _export;
var global$3 = global$K;
var microtask = microtask$2;
var IS_NODE = engineIsNode;

var process = global$3.process;

// `queueMicrotask` method
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-queuemicrotask
$$5({ global: true, enumerable: true, noTargetGet: true }, {
  queueMicrotask: function queueMicrotask(fn) {
    var domain = IS_NODE && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

var $$4 = _export;
var global$2 = global$K;
var userAgent = engineUserAgent;

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var wrap = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
$$4({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global$2.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global$2.setInterval)
});

var fails = fails$_;
var wellKnownSymbol$1 = wellKnownSymbol$w;
var IS_PURE = isPure;

var ITERATOR$1 = wellKnownSymbol$1('iterator');

var nativeUrl = !fails(function () {
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var searchParams = url.searchParams;
  var result = '';
  url.pathname = 'c%20d';
  searchParams.forEach(function (value, key) {
    searchParams['delete']('b');
    result += key + value;
  });
  return (IS_PURE && !url.toJSON)
    || !searchParams.sort
    || url.href !== 'http://a/c%20d?a=1&c=3'
    || searchParams.get('c') !== '3'
    || String(new URLSearchParams('?a=1')) !== 'a=1'
    || !searchParams[ITERATOR$1]
    // throws in Edge
    || new URL('https://a@b').username !== 'a'
    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
    // not punycoded in Edge
    || new URL('http://тест').host !== 'xn--e1aybc'
    // not escaped in Chrome 62-
    || new URL('http://a#б').hash !== '#%D0%B1'
    // fails in Chrome 66-
    || result !== 'a1c3'
    // throws in Safari
    || new URL('http://x', undefined).host !== 'x';
});

// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'
var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;
var floor$1 = Math.floor;
var stringFromCharCode = String.fromCharCode;

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = string.charCodeAt(counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = string.charCodeAt(counter++);
      if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
};

/**
 * Converts a digit/integer into a basic code point.
 */
var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor$1(delta / damp) : delta >> 1;
  delta += floor$1(delta / numPoints);
  for (; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor$1(delta / baseMinusTMin);
  }
  return floor$1(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
// eslint-disable-next-line max-statements -- TODO
var encode = function (input) {
  var output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  var inputLength = input.length;

  // Initialize the state.
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;

  // Handle the basic code points.
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 0x80) {
      output.push(stringFromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.
  var handledCPCount = basicLength; // number of code points that have been handled;

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    output.push(delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor$1((maxInt - delta) / handledCPCountPlusOne)) {
      throw RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw RangeError(OVERFLOW_ERROR);
      }
      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        for (var k = base; /* no condition */; k += base) {
          var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor$1(qMinusT / baseMinusT);
        }

        output.push(stringFromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }

    ++delta;
    ++n;
  }
  return output.join('');
};

var stringPunycodeToAscii = function (input) {
  var encoded = [];
  var labels = input.toLowerCase().replace(regexSeparators, '\u002E').split('.');
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
  }
  return encoded.join('.');
};

var anObject$1 = anObject$y;
var getIteratorMethod$1 = getIteratorMethod$5;

var getIterator$1 = function (it) {
  var iteratorMethod = getIteratorMethod$1(it);
  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  } return anObject$1(iteratorMethod.call(it));
};

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

var $$3 = _export;
var getBuiltIn = getBuiltIn$d;
var USE_NATIVE_URL$1 = nativeUrl;
var redefine$1 = redefine$g.exports;
var redefineAll = redefineAll$6;
var setToStringTag$1 = setToStringTag$b;
var createIteratorConstructor = createIteratorConstructor$3;
var InternalStateModule$1 = internalState;
var anInstance$1 = anInstance$8;
var hasOwn = has$k;
var bind = functionBindContext;
var classof = classof$b;
var anObject = anObject$y;
var isObject = isObject$y;
var create = objectCreate;
var createPropertyDescriptor = createPropertyDescriptor$9;
var getIterator = getIterator$1;
var getIteratorMethod = getIteratorMethod$5;
var wellKnownSymbol = wellKnownSymbol$w;

var $fetch = getBuiltIn('fetch');
var Headers = getBuiltIn('Headers');
var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState$1 = InternalStateModule$1.set;
var getInternalParamsState = InternalStateModule$1.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule$1.getterFor(URL_SEARCH_PARAMS_ITERATOR);

var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = it.replace(plus, ' ');
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = result.replace(percentSequence(bytes--), percentDecode);
    }
    return result;
  }
};

var find = /[!'()~]|%20/g;

var replace = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replace[match];
};

var serialize = function (it) {
  return encodeURIComponent(it).replace(find, replacer);
};

var parseSearchParams = function (result, query) {
  if (query) {
    var attributes = query.split('&');
    var index = 0;
    var attribute, entry;
    while (index < attributes.length) {
      attribute = attributes[index++];
      if (attribute.length) {
        entry = attribute.split('=');
        result.push({
          key: deserialize(entry.shift()),
          value: deserialize(entry.join('='))
        });
      }
    }
  }
};

var updateSearchParams = function (query) {
  this.entries.length = 0;
  parseSearchParams(this.entries, query);
};

var validateArgumentsLength = function (passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState$1(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params).entries),
    kind: kind
  });
}, 'Iterator', function next() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;
  if (!step.done) {
    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
  } return step;
});

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance$1(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var that = this;
  var entries = [];
  var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;

  setInternalState$1(that, {
    type: URL_SEARCH_PARAMS,
    entries: entries,
    updateURL: function () { /* empty */ },
    updateSearchParams: updateSearchParams
  });

  if (init !== undefined) {
    if (isObject(init)) {
      iteratorMethod = getIteratorMethod(init);
      if (typeof iteratorMethod === 'function') {
        iterator = iteratorMethod.call(init);
        next = iterator.next;
        while (!(step = next.call(iterator)).done) {
          entryIterator = getIterator(anObject(step.value));
          entryNext = entryIterator.next;
          if (
            (first = entryNext.call(entryIterator)).done ||
            (second = entryNext.call(entryIterator)).done ||
            !entryNext.call(entryIterator).done
          ) throw TypeError('Expected sequence with length 2');
          entries.push({ key: first.value + '', value: second.value + '' });
        }
      } else for (key in init) if (hasOwn(init, key)) entries.push({ key: key, value: init[key] + '' });
    } else {
      parseSearchParams(entries, typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : init + '');
    }
  }
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

redefineAll(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength(arguments.length, 2);
    var state = getInternalParamsState(this);
    state.entries.push({ key: name + '', value: value + '' });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = name + '';
    var index = 0;
    while (index < entries.length) {
      if (entries[index].key === key) entries.splice(index, 1);
      else index++;
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) result.push(entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = name + '';
    var index = 0;
    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = name + '';
    var val = value + '';
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) entries.splice(index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) entries.push({ key: key, value: val });
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    var entries = state.entries;
    // Array#sort is not stable in some engines
    var slice = entries.slice();
    var entry, entriesIndex, sliceIndex;
    entries.length = 0;
    for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
      entry = slice[sliceIndex];
      for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
        if (entries[entriesIndex].key > entry.key) {
          entries.splice(entriesIndex, 0, entry);
          break;
        }
      }
      if (entriesIndex === sliceIndex) entries.push(entry);
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
redefine$1(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries);

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
redefine$1(URLSearchParamsPrototype, 'toString', function toString() {
  var entries = getInternalParamsState(this).entries;
  var result = [];
  var index = 0;
  var entry;
  while (index < entries.length) {
    entry = entries[index++];
    result.push(serialize(entry.key) + '=' + serialize(entry.value));
  } return result.join('&');
}, { enumerable: true });

setToStringTag$1(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$$3({ global: true, forced: !USE_NATIVE_URL$1 }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` for correct work with polyfilled `URLSearchParams`
// https://github.com/zloirock/core-js/issues/674
if (!USE_NATIVE_URL$1 && typeof $fetch == 'function' && typeof Headers == 'function') {
  $$3({ global: true, enumerable: true, forced: true }, {
    fetch: function fetch(input /* , init */) {
      var args = [input];
      var init, body, headers;
      if (arguments.length > 1) {
        init = arguments[1];
        if (isObject(init)) {
          body = init.body;
          if (classof(body) === URL_SEARCH_PARAMS) {
            headers = init.headers ? new Headers(init.headers) : new Headers();
            if (!headers.has('content-type')) {
              headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            }
            init = create(init, {
              body: createPropertyDescriptor(0, String(body)),
              headers: createPropertyDescriptor(0, headers)
            });
          }
        }
        args.push(init);
      } return $fetch.apply(this, args);
    }
  });
}

var web_urlSearchParams = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

var $$2 = _export;
var DESCRIPTORS = descriptors;
var USE_NATIVE_URL = nativeUrl;
var global$1 = global$K;
var defineProperties = objectDefineProperties;
var redefine = redefine$g.exports;
var anInstance = anInstance$8;
var has = has$k;
var assign = objectAssign;
var arrayFrom = arrayFrom$1;
var codeAt = stringMultibyte.codeAt;
var toASCII = stringPunycodeToAscii;
var setToStringTag = setToStringTag$b;
var URLSearchParamsModule = web_urlSearchParams;
var InternalStateModule = internalState;

var NativeURL = global$1.URL;
var URLSearchParams$1 = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;
var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var floor = Math.floor;
var pow = Math.pow;

var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';

var ALPHA = /[A-Za-z]/;
// eslint-disable-next-line regexp/no-obscure-range -- safe
var ALPHANUMERIC = /[\d+-.A-Za-z]/;
var DIGIT = /\d/;
var HEX_START = /^0x/i;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\dA-Fa-f]+$/;
/* eslint-disable no-control-regex -- safe */
var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g;
var TAB_AND_NEW_LINE = /[\t\n\r]/g;
/* eslint-enable no-control-regex -- safe */
var EOF;

var parseHost = function (url, input) {
  var result, codePoints, index;
  if (input.charAt(0) == '[') {
    if (input.charAt(input.length - 1) != ']') return INVALID_HOST;
    result = parseIPv6(input.slice(1, -1));
    if (!result) return INVALID_HOST;
    url.host = result;
  // opaque host
  } else if (!isSpecial(url)) {
    if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
    result = '';
    codePoints = arrayFrom(input);
    for (index = 0; index < codePoints.length; index++) {
      result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
    }
    url.host = result;
  } else {
    input = toASCII(input);
    if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
    result = parseIPv4(input);
    if (result === null) return INVALID_HOST;
    url.host = result;
  }
};

var parseIPv4 = function (input) {
  var parts = input.split('.');
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] == '') {
    parts.pop();
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;
    if (part.length > 1 && part.charAt(0) == '0') {
      radix = HEX_START.test(part) ? 16 : 8;
      part = part.slice(radix == 8 ? 1 : 2);
    }
    if (part === '') {
      number = 0;
    } else {
      if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
      number = parseInt(part, radix);
    }
    numbers.push(number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index == partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = numbers.pop();
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};

// eslint-disable-next-line max-statements -- TODO
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var char = function () {
    return input.charAt(pointer);
  };

  if (char() == ':') {
    if (input.charAt(1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (char()) {
    if (pieceIndex == 8) return;
    if (char() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && HEX.test(char())) {
      value = value * 16 + parseInt(char(), 16);
      pointer++;
      length++;
    }
    if (char() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (char()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (char() == '.' && numbersSeen < 4) pointer++;
          else return;
        }
        if (!DIGIT.test(char())) return;
        while (DIGIT.test(char())) {
          number = parseInt(char(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece == 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }
      if (numbersSeen != 4) return;
      break;
    } else if (char() == ':') {
      pointer++;
      if (!char()) return;
    } else if (char()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }
  return maxIndex;
};

var serializeHost = function (host) {
  var result, index, compress, ignore0;
  // ipv4
  if (typeof host == 'number') {
    result = [];
    for (index = 0; index < 4; index++) {
      result.unshift(host % 256);
      host = floor(host / 256);
    } return result.join('.');
  // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += host[index].toString(16);
        if (index < 7) result += ':';
      }
    }
    return '[' + result + ']';
  } return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1, '?': 1, '{': 1, '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
});

var percentEncode = function (char, set) {
  var code = codeAt(char, 0);
  return code > 0x20 && code < 0x7F && !has(set, char) ? char : encodeURIComponent(char);
};

var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

var isSpecial = function (url) {
  return has(specialSchemes, url.scheme);
};

var includesCredentials = function (url) {
  return url.username != '' || url.password != '';
};

var cannotHaveUsernamePasswordPort = function (url) {
  return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
};

var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length == 2 && ALPHA.test(string.charAt(0))
    && ((second = string.charAt(1)) == ':' || (!normalized && second == '|'));
};

var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (
    string.length == 2 ||
    ((third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#')
  );
};

var shortenURLsPath = function (url) {
  var path = url.path;
  var pathSize = path.length;
  if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
    path.pop();
  }
};

var isSingleDot = function (segment) {
  return segment === '.' || segment.toLowerCase() === '%2e';
};

var isDoubleDot = function (segment) {
  segment = segment.toLowerCase();
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

// eslint-disable-next-line max-statements -- TODO
var parseURL = function (url, input, stateOverride, base) {
  var state = stateOverride || SCHEME_START;
  var pointer = 0;
  var buffer = '';
  var seenAt = false;
  var seenBracket = false;
  var seenPasswordToken = false;
  var codePoints, char, bufferCodePoints, failure;

  if (!stateOverride) {
    url.scheme = '';
    url.username = '';
    url.password = '';
    url.host = null;
    url.port = null;
    url.path = [];
    url.query = null;
    url.fragment = null;
    url.cannotBeABaseURL = false;
    input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
  }

  input = input.replace(TAB_AND_NEW_LINE, '');

  codePoints = arrayFrom(input);

  while (pointer <= codePoints.length) {
    char = codePoints[pointer];
    switch (state) {
      case SCHEME_START:
        if (char && ALPHA.test(char)) {
          buffer += char.toLowerCase();
          state = SCHEME;
        } else if (!stateOverride) {
          state = NO_SCHEME;
          continue;
        } else return INVALID_SCHEME;
        break;

      case SCHEME:
        if (char && (ALPHANUMERIC.test(char) || char == '+' || char == '-' || char == '.')) {
          buffer += char.toLowerCase();
        } else if (char == ':') {
          if (stateOverride && (
            (isSpecial(url) != has(specialSchemes, buffer)) ||
            (buffer == 'file' && (includesCredentials(url) || url.port !== null)) ||
            (url.scheme == 'file' && !url.host)
          )) return;
          url.scheme = buffer;
          if (stateOverride) {
            if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
            return;
          }
          buffer = '';
          if (url.scheme == 'file') {
            state = FILE;
          } else if (isSpecial(url) && base && base.scheme == url.scheme) {
            state = SPECIAL_RELATIVE_OR_AUTHORITY;
          } else if (isSpecial(url)) {
            state = SPECIAL_AUTHORITY_SLASHES;
          } else if (codePoints[pointer + 1] == '/') {
            state = PATH_OR_AUTHORITY;
            pointer++;
          } else {
            url.cannotBeABaseURL = true;
            url.path.push('');
            state = CANNOT_BE_A_BASE_URL_PATH;
          }
        } else if (!stateOverride) {
          buffer = '';
          state = NO_SCHEME;
          pointer = 0;
          continue;
        } else return INVALID_SCHEME;
        break;

      case NO_SCHEME:
        if (!base || (base.cannotBeABaseURL && char != '#')) return INVALID_SCHEME;
        if (base.cannotBeABaseURL && char == '#') {
          url.scheme = base.scheme;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          url.cannotBeABaseURL = true;
          state = FRAGMENT;
          break;
        }
        state = base.scheme == 'file' ? FILE : RELATIVE;
        continue;

      case SPECIAL_RELATIVE_OR_AUTHORITY:
        if (char == '/' && codePoints[pointer + 1] == '/') {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          pointer++;
        } else {
          state = RELATIVE;
          continue;
        } break;

      case PATH_OR_AUTHORITY:
        if (char == '/') {
          state = AUTHORITY;
          break;
        } else {
          state = PATH;
          continue;
        }

      case RELATIVE:
        url.scheme = base.scheme;
        if (char == EOF) {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
        } else if (char == '/' || (char == '\\' && isSpecial(url))) {
          state = RELATIVE_SLASH;
        } else if (char == '?') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.query = base.query;
          url.fragment = '';
          state = FRAGMENT;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          url.path = base.path.slice();
          url.path.pop();
          state = PATH;
          continue;
        } break;

      case RELATIVE_SLASH:
        if (isSpecial(url) && (char == '/' || char == '\\')) {
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        } else if (char == '/') {
          state = AUTHORITY;
        } else {
          url.username = base.username;
          url.password = base.password;
          url.host = base.host;
          url.port = base.port;
          state = PATH;
          continue;
        } break;

      case SPECIAL_AUTHORITY_SLASHES:
        state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
        if (char != '/' || buffer.charAt(pointer + 1) != '/') continue;
        pointer++;
        break;

      case SPECIAL_AUTHORITY_IGNORE_SLASHES:
        if (char != '/' && char != '\\') {
          state = AUTHORITY;
          continue;
        } break;

      case AUTHORITY:
        if (char == '@') {
          if (seenAt) buffer = '%40' + buffer;
          seenAt = true;
          bufferCodePoints = arrayFrom(buffer);
          for (var i = 0; i < bufferCodePoints.length; i++) {
            var codePoint = bufferCodePoints[i];
            if (codePoint == ':' && !seenPasswordToken) {
              seenPasswordToken = true;
              continue;
            }
            var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
            if (seenPasswordToken) url.password += encodedCodePoints;
            else url.username += encodedCodePoints;
          }
          buffer = '';
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (seenAt && buffer == '') return INVALID_AUTHORITY;
          pointer -= arrayFrom(buffer).length + 1;
          buffer = '';
          state = HOST;
        } else buffer += char;
        break;

      case HOST:
      case HOSTNAME:
        if (stateOverride && url.scheme == 'file') {
          state = FILE_HOST;
          continue;
        } else if (char == ':' && !seenBracket) {
          if (buffer == '') return INVALID_HOST;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PORT;
          if (stateOverride == HOSTNAME) return;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url))
        ) {
          if (isSpecial(url) && buffer == '') return INVALID_HOST;
          if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) return;
          failure = parseHost(url, buffer);
          if (failure) return failure;
          buffer = '';
          state = PATH_START;
          if (stateOverride) return;
          continue;
        } else {
          if (char == '[') seenBracket = true;
          else if (char == ']') seenBracket = false;
          buffer += char;
        } break;

      case PORT:
        if (DIGIT.test(char)) {
          buffer += char;
        } else if (
          char == EOF || char == '/' || char == '?' || char == '#' ||
          (char == '\\' && isSpecial(url)) ||
          stateOverride
        ) {
          if (buffer != '') {
            var port = parseInt(buffer, 10);
            if (port > 0xFFFF) return INVALID_PORT;
            url.port = (isSpecial(url) && port === specialSchemes[url.scheme]) ? null : port;
            buffer = '';
          }
          if (stateOverride) return;
          state = PATH_START;
          continue;
        } else return INVALID_PORT;
        break;

      case FILE:
        url.scheme = 'file';
        if (char == '/' || char == '\\') state = FILE_SLASH;
        else if (base && base.scheme == 'file') {
          if (char == EOF) {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
          } else if (char == '?') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.host = base.host;
            url.path = base.path.slice();
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
              url.host = base.host;
              url.path = base.path.slice();
              shortenURLsPath(url);
            }
            state = PATH;
            continue;
          }
        } else {
          state = PATH;
          continue;
        } break;

      case FILE_SLASH:
        if (char == '/' || char == '\\') {
          state = FILE_HOST;
          break;
        }
        if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
          if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);
          else url.host = base.host;
        }
        state = PATH;
        continue;

      case FILE_HOST:
        if (char == EOF || char == '/' || char == '\\' || char == '?' || char == '#') {
          if (!stateOverride && isWindowsDriveLetter(buffer)) {
            state = PATH;
          } else if (buffer == '') {
            url.host = '';
            if (stateOverride) return;
            state = PATH_START;
          } else {
            failure = parseHost(url, buffer);
            if (failure) return failure;
            if (url.host == 'localhost') url.host = '';
            if (stateOverride) return;
            buffer = '';
            state = PATH_START;
          } continue;
        } else buffer += char;
        break;

      case PATH_START:
        if (isSpecial(url)) {
          state = PATH;
          if (char != '/' && char != '\\') continue;
        } else if (!stateOverride && char == '?') {
          url.query = '';
          state = QUERY;
        } else if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          state = PATH;
          if (char != '/') continue;
        } break;

      case PATH:
        if (
          char == EOF || char == '/' ||
          (char == '\\' && isSpecial(url)) ||
          (!stateOverride && (char == '?' || char == '#'))
        ) {
          if (isDoubleDot(buffer)) {
            shortenURLsPath(url);
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else if (isSingleDot(buffer)) {
            if (char != '/' && !(char == '\\' && isSpecial(url))) {
              url.path.push('');
            }
          } else {
            if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
              if (url.host) url.host = '';
              buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
            }
            url.path.push(buffer);
          }
          buffer = '';
          if (url.scheme == 'file' && (char == EOF || char == '?' || char == '#')) {
            while (url.path.length > 1 && url.path[0] === '') {
              url.path.shift();
            }
          }
          if (char == '?') {
            url.query = '';
            state = QUERY;
          } else if (char == '#') {
            url.fragment = '';
            state = FRAGMENT;
          }
        } else {
          buffer += percentEncode(char, pathPercentEncodeSet);
        } break;

      case CANNOT_BE_A_BASE_URL_PATH:
        if (char == '?') {
          url.query = '';
          state = QUERY;
        } else if (char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case QUERY:
        if (!stateOverride && char == '#') {
          url.fragment = '';
          state = FRAGMENT;
        } else if (char != EOF) {
          if (char == "'" && isSpecial(url)) url.query += '%27';
          else if (char == '#') url.query += '%23';
          else url.query += percentEncode(char, C0ControlPercentEncodeSet);
        } break;

      case FRAGMENT:
        if (char != EOF) url.fragment += percentEncode(char, fragmentPercentEncodeSet);
        break;
    }

    pointer++;
  }
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance(this, URLConstructor, 'URL');
  var base = arguments.length > 1 ? arguments[1] : undefined;
  var urlString = String(url);
  var state = setInternalState(that, { type: 'URL' });
  var baseState, failure;
  if (base !== undefined) {
    if (base instanceof URLConstructor) baseState = getInternalURLState(base);
    else {
      failure = parseURL(baseState = {}, String(base));
      if (failure) throw TypeError(failure);
    }
  }
  failure = parseURL(state, urlString, null, baseState);
  if (failure) throw TypeError(failure);
  var searchParams = state.searchParams = new URLSearchParams$1();
  var searchParamsState = getInternalSearchParamsState(searchParams);
  searchParamsState.updateSearchParams(state.query);
  searchParamsState.updateURL = function () {
    state.query = String(searchParams) || null;
  };
  if (!DESCRIPTORS) {
    that.href = serializeURL.call(that);
    that.origin = getOrigin.call(that);
    that.protocol = getProtocol.call(that);
    that.username = getUsername.call(that);
    that.password = getPassword.call(that);
    that.host = getHost.call(that);
    that.hostname = getHostname.call(that);
    that.port = getPort.call(that);
    that.pathname = getPathname.call(that);
    that.search = getSearch.call(that);
    that.searchParams = getSearchParams.call(that);
    that.hash = getHash.call(that);
  }
};

var URLPrototype = URLConstructor.prototype;

var serializeURL = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var username = url.username;
  var password = url.password;
  var host = url.host;
  var port = url.port;
  var path = url.path;
  var query = url.query;
  var fragment = url.fragment;
  var output = scheme + ':';
  if (host !== null) {
    output += '//';
    if (includesCredentials(url)) {
      output += username + (password ? ':' + password : '') + '@';
    }
    output += serializeHost(host);
    if (port !== null) output += ':' + port;
  } else if (scheme == 'file') output += '//';
  output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
  if (query !== null) output += '?' + query;
  if (fragment !== null) output += '#' + fragment;
  return output;
};

var getOrigin = function () {
  var url = getInternalURLState(this);
  var scheme = url.scheme;
  var port = url.port;
  if (scheme == 'blob') try {
    return new URLConstructor(scheme.path[0]).origin;
  } catch (error) {
    return 'null';
  }
  if (scheme == 'file' || !isSpecial(url)) return 'null';
  return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
};

var getProtocol = function () {
  return getInternalURLState(this).scheme + ':';
};

var getUsername = function () {
  return getInternalURLState(this).username;
};

var getPassword = function () {
  return getInternalURLState(this).password;
};

var getHost = function () {
  var url = getInternalURLState(this);
  var host = url.host;
  var port = url.port;
  return host === null ? ''
    : port === null ? serializeHost(host)
    : serializeHost(host) + ':' + port;
};

var getHostname = function () {
  var host = getInternalURLState(this).host;
  return host === null ? '' : serializeHost(host);
};

var getPort = function () {
  var port = getInternalURLState(this).port;
  return port === null ? '' : String(port);
};

var getPathname = function () {
  var url = getInternalURLState(this);
  var path = url.path;
  return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
};

var getSearch = function () {
  var query = getInternalURLState(this).query;
  return query ? '?' + query : '';
};

var getSearchParams = function () {
  return getInternalURLState(this).searchParams;
};

var getHash = function () {
  var fragment = getInternalURLState(this).fragment;
  return fragment ? '#' + fragment : '';
};

var accessorDescriptor = function (getter, setter) {
  return { get: getter, set: setter, configurable: true, enumerable: true };
};

if (DESCRIPTORS) {
  defineProperties(URLPrototype, {
    // `URL.prototype.href` accessors pair
    // https://url.spec.whatwg.org/#dom-url-href
    href: accessorDescriptor(serializeURL, function (href) {
      var url = getInternalURLState(this);
      var urlString = String(href);
      var failure = parseURL(url, urlString);
      if (failure) throw TypeError(failure);
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.origin` getter
    // https://url.spec.whatwg.org/#dom-url-origin
    origin: accessorDescriptor(getOrigin),
    // `URL.prototype.protocol` accessors pair
    // https://url.spec.whatwg.org/#dom-url-protocol
    protocol: accessorDescriptor(getProtocol, function (protocol) {
      var url = getInternalURLState(this);
      parseURL(url, String(protocol) + ':', SCHEME_START);
    }),
    // `URL.prototype.username` accessors pair
    // https://url.spec.whatwg.org/#dom-url-username
    username: accessorDescriptor(getUsername, function (username) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(username));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.username = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.password` accessors pair
    // https://url.spec.whatwg.org/#dom-url-password
    password: accessorDescriptor(getPassword, function (password) {
      var url = getInternalURLState(this);
      var codePoints = arrayFrom(String(password));
      if (cannotHaveUsernamePasswordPort(url)) return;
      url.password = '';
      for (var i = 0; i < codePoints.length; i++) {
        url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
      }
    }),
    // `URL.prototype.host` accessors pair
    // https://url.spec.whatwg.org/#dom-url-host
    host: accessorDescriptor(getHost, function (host) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(host), HOST);
    }),
    // `URL.prototype.hostname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hostname
    hostname: accessorDescriptor(getHostname, function (hostname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      parseURL(url, String(hostname), HOSTNAME);
    }),
    // `URL.prototype.port` accessors pair
    // https://url.spec.whatwg.org/#dom-url-port
    port: accessorDescriptor(getPort, function (port) {
      var url = getInternalURLState(this);
      if (cannotHaveUsernamePasswordPort(url)) return;
      port = String(port);
      if (port == '') url.port = null;
      else parseURL(url, port, PORT);
    }),
    // `URL.prototype.pathname` accessors pair
    // https://url.spec.whatwg.org/#dom-url-pathname
    pathname: accessorDescriptor(getPathname, function (pathname) {
      var url = getInternalURLState(this);
      if (url.cannotBeABaseURL) return;
      url.path = [];
      parseURL(url, pathname + '', PATH_START);
    }),
    // `URL.prototype.search` accessors pair
    // https://url.spec.whatwg.org/#dom-url-search
    search: accessorDescriptor(getSearch, function (search) {
      var url = getInternalURLState(this);
      search = String(search);
      if (search == '') {
        url.query = null;
      } else {
        if ('?' == search.charAt(0)) search = search.slice(1);
        url.query = '';
        parseURL(url, search, QUERY);
      }
      getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
    }),
    // `URL.prototype.searchParams` getter
    // https://url.spec.whatwg.org/#dom-url-searchparams
    searchParams: accessorDescriptor(getSearchParams),
    // `URL.prototype.hash` accessors pair
    // https://url.spec.whatwg.org/#dom-url-hash
    hash: accessorDescriptor(getHash, function (hash) {
      var url = getInternalURLState(this);
      hash = String(hash);
      if (hash == '') {
        url.fragment = null;
        return;
      }
      if ('#' == hash.charAt(0)) hash = hash.slice(1);
      url.fragment = '';
      parseURL(url, hash, FRAGMENT);
    })
  });
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
redefine(URLPrototype, 'toJSON', function toJSON() {
  return serializeURL.call(this);
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
redefine(URLPrototype, 'toString', function toString() {
  return serializeURL.call(this);
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  if (nativeCreateObjectURL) redefine(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
    return nativeCreateObjectURL.apply(NativeURL, arguments);
  });
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  if (nativeRevokeObjectURL) redefine(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
    return nativeRevokeObjectURL.apply(NativeURL, arguments);
  });
}

setToStringTag(URLConstructor, 'URL');

$$2({ global: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
  URL: URLConstructor
});

var $$1 = _export;

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
$$1({ target: 'URL', proto: true, enumerable: true }, {
  toJSON: function toJSON() {
    return URL.prototype.toString.call(this);
  }
});

var runtime = {exports: {}};

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (module) {
var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
}(runtime));

var MODULE_ID = "fvtt-encounter-stats";
var OPT_ENABLE = "enable";
var ROLL_HOOK = {
  MIDI_QOL: "midi-qol",
  BETTERROLLS5E: "betterrolls5e",
  BEYOND_20: "beyond20",
  DEFAULT: "default"
};
var ATTACKTYPES = {
  INFO: "info",
  ATTACK: "attack",
  DAMAGE_FORMULA: "damage-formula",
  DAMAGE: "damage",
  NONE: "none"
};
var ATTACK_DATA_TEMPLATE = {
  id: null,
  actionType: null,
  round: null,
  tokenId: null,
  actorId: null,
  advantage: false,
  isCritical: false,
  isFumble: false,
  disadvantage: false,
  attackTotal: 0,
  damageTotal: 0,
  item: {
    name: null,
    itemLink: null
  }
};
var HEALTH_DATA_TEMPLATE = {
  id: null,
  round: null,
  tokenId: null,
  actorId: null,
  max: 0,
  diff: 0,
  previous: 0,
  current: 0,
  isdamage: false,
  isheal: false
};

function CreateFolder() {
  return _CreateFolder.apply(this, arguments);
}

function _CreateFolder() {
  _CreateFolder = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var folder;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            folder = GetFolder();

            if (folder) {
              _context.next = 4;
              break;
            }

            _context.next = 4;
            return Folder.create({
              name: "fvtt-encounter-stats",
              type: "JournalEntry",
              parent: null,
              "flags.fvtt-encounter-stats.parent": true
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _CreateFolder.apply(this, arguments);
}

function GetFolder() {
  var folder = game.folders.find(function (f) {
    return f.getFlag("fvtt-encounter-stats", "parent") === true;
  });
  return folder;
}

function CreateJournal(_x) {
  return _CreateJournal.apply(this, arguments);
}

function _CreateJournal() {
  _CreateJournal = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(encounterId) {
    var d, renderSheet, folder, article, content;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            d = new Date();
            renderSheet = false;
            folder = GetFolder();
            article = {
              title: d.toISOString()
            };
            content = {
              html: ""
            };
            _context.next = 7;
            return JournalEntry.create({
              name: article.title,
              content: content.html,
              folder: folder ? folder.id : null,
              "flags.fvtt-encounter-stats.encounterId": encounterId
            }, {
              renderSheet: renderSheet
            });

          case 7:
            ui.notifications.info("fvtt-encounter-stats article ".concat(article.title));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _CreateJournal.apply(this, arguments);
}

function UpdateJournal(_x2, _x3) {
  return _UpdateJournal.apply(this, arguments);
}

function _UpdateJournal() {
  _UpdateJournal = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(html, article) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return article.update({
              name: article.title,
              content: html
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _UpdateJournal.apply(this, arguments);
}

function GetArticle(_x4) {
  return _GetArticle.apply(this, arguments);
}

function _GetArticle() {
  _GetArticle = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(encounterId) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", game.journal.find(function (e) {
              return e.getFlag("fvtt-encounter-stats", "encounterId") === encounterId;
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _GetArticle.apply(this, arguments);
}

var STORAGE_NAME = "fvtt-encounter-stats-data";
function GetItemFromLocalStorage() {
  return JSON.parse(window.localStorage.getItem(STORAGE_NAME));
}
function SaveToLocalStorageStat(data) {
  window.localStorage.setItem(STORAGE_NAME, JSON.stringify(data));
}
function TruncateLocalStorage() {
  window.localStorage.removeItem(STORAGE_NAME);
}

function IsValidRollEvent(attackType) {
  var validTypes = ["mwak", "rwak", "msak", "rsak", "save", "heal"];
  return validTypes.indexOf(attackType) > -1;
}
function IsValidAttack(attackType) {
  var validTypes = ["mwak", "rwak", "msak", "rsak", "save"];
  return validTypes.indexOf(attackType) > -1;
}
function IsHealingSpell(attackType) {
  var validTypes = ["heal"];
  return validTypes.indexOf(attackType) > -1;
}

function getItemId(content) {
  var re = /(data-item-id="([a-zA-Z0-9]+)")/;
  var match = re.exec(content);
  return match;
}

function ChatType(_x) {
  return _ChatType.apply(this, arguments);
}

function _ChatType() {
  _ChatType = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
    var _data$data, _data$data2, _data$data2$flags, _data$data3, _data$data3$flavor;

    var match;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(data !== null && data !== void 0 && (_data$data = data.data) !== null && _data$data !== void 0 && _data$data.content)) {
              _context.next = 4;
              break;
            }

            match = getItemId(data.data.content);

            if (!match) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", ATTACKTYPES.INFO);

          case 4:
            if (!(data._roll && (_data$data2 = data.data) !== null && _data$data2 !== void 0 && (_data$data2$flags = _data$data2.flags) !== null && _data$data2$flags !== void 0 && _data$data2$flags.dnd5e)) {
              _context.next = 10;
              break;
            }

            _context.t0 = data.data.flags.dnd5e.roll.type;
            _context.next = _context.t0 === "attack" ? 8 : _context.t0 === "damage" ? 9 : 10;
            break;

          case 8:
            return _context.abrupt("return", ATTACKTYPES.ATTACK);

          case 9:
            return _context.abrupt("return", ATTACKTYPES.DAMAGE);

          case 10:
            if (!(((_data$data3 = data.data) === null || _data$data3 === void 0 ? void 0 : (_data$data3$flavor = _data$data3.flavor) === null || _data$data3$flavor === void 0 ? void 0 : _data$data3$flavor.toLowerCase().indexOf("other formula")) > -1)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", ATTACKTYPES.DAMAGE_FORMULA);

          case 12:
            return _context.abrupt("return", ATTACKTYPES.NONE);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ChatType.apply(this, arguments);
}

function getIndex(_x2) {
  return _getIndex.apply(this, arguments);
}

function _getIndex() {
  _getIndex = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {
    var _ref$name, name, itemPacks, _iterator, _step, key, pack, pack_index, item_index;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref$name = _ref.name, name = _ref$name === void 0 ? "" : _ref$name;
            itemPacks = game.packs.filter(function (f) {
              return f.metadata.entity === "Item";
            }).map(function (m) {
              return "".concat(m.metadata["package"], ".").concat(m.metadata.name);
            });
            _iterator = _createForOfIteratorHelper(itemPacks);
            _context2.prev = 3;

            _iterator.s();

          case 5:
            if ((_step = _iterator.n()).done) {
              _context2.next = 21;
              break;
            }

            key = _step.value;
            pack = game.packs.get(key);

            if (!(pack.index.length > 1)) {
              _context2.next = 12;
              break;
            }

            _context2.t0 = pack.index;
            _context2.next = 15;
            break;

          case 12:
            _context2.next = 14;
            return pack.getIndex();

          case 14:
            _context2.t0 = _context2.sent;

          case 15:
            pack_index = _context2.t0;
            item_index = pack_index.find(function (i) {
              return i.name.toLowerCase() === name.toLowerCase();
            });

            if (!item_index) {
              _context2.next = 19;
              break;
            }

            return _context2.abrupt("return", {
              link: "@Compendium[".concat(key, ".").concat(item_index._id, "]{").concat(item_index.name, "}"),
              name: item_index.name
            });

          case 19:
            _context2.next = 5;
            break;

          case 21:
            _context2.next = 26;
            break;

          case 23:
            _context2.prev = 23;
            _context2.t1 = _context2["catch"](3);

            _iterator.e(_context2.t1);

          case 26:
            _context2.prev = 26;

            _iterator.f();

            return _context2.finish(26);

          case 29:
            return _context2.abrupt("return", undefined);

          case 30:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 23, 26, 29]]);
  }));
  return _getIndex.apply(this, arguments);
}

function GetCombatantStats(stat, actorId) {
  if (!(stat !== null && stat !== void 0 && stat.combatants)) return;
  return stat.combatants.find(function (f) {
    return f.id === actorId;
  });
}
function GetItemData(_x3, _x4, _x5) {
  return _GetItemData.apply(this, arguments);
}

function _GetItemData() {
  _GetItemData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(attackData, actorId, content) {
    var itemId,
        match,
        actor,
        getItem,
        itemData,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            itemId = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : null;

            if (!itemId) {
              match = getItemId(content);

              if (match) {
                itemId = match[2];
              }
            }

            actor = game.actors.get(actorId);
            _context3.next = 5;
            return actor.items.find(function (i) {
              return i._id === itemId;
            });

          case 5:
            getItem = _context3.sent;
            attackData.actionType = getItem.data.data.actionType;
            _context3.next = 9;
            return getIndex({
              name: getItem.data.name
            });

          case 9:
            itemData = _context3.sent;

            if (itemData) {
              attackData.item.name = itemData.name;
              attackData.item.itemLink = itemData.link;
            }

            return _context3.abrupt("return", attackData);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _GetItemData.apply(this, arguments);
}

function nullChecks(attackData) {
  if (isNaN(attackData.attackTotal) || attackData.attackTotal === null || attackData.attackTotal === undefined) {
    attackData.attackTotal = 0;
  }

  if (isNaN(attackData.damageTotal) || attackData.damageTotal === null || attackData.damageTotal === undefined) {
    attackData.damageTotal = 0;
  }

  return attackData;
}
function CombatantStats(_x6) {
  return _CombatantStats.apply(this, arguments);
}

function _CombatantStats() {
  _CombatantStats = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(combatantStat) {
    var damageTotalArray;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            damageTotalArray = combatantStat.events.filter(function (f) {
              return IsValidAttack(f.actionType);
            }).map(function (m) {
              return m.damageTotal;
            });
            combatantStat.summaryList = _getSummaryStatsFromArray(damageTotalArray);
            return _context4.abrupt("return", combatantStat);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _CombatantStats.apply(this, arguments);
}

function _add(accumulator, a) {
  return accumulator + a;
}

function _getSummaryStatsFromArray(arr) {
  return {
    min: Math.min.apply(Math, _toConsumableArray(arr)),
    max: Math.max.apply(Math, _toConsumableArray(arr)),
    avg: Math.round(arr.reduce(_add, 0) / arr.length),
    total: arr.reduce(_add, 0)
  };
}

function Generate(data) {
  var markup = "\n  <div class=\"fvtt-enc-stats\">\n    <hr />\n    <div class=\"fvtt-enc-stats_top\">\n      <div class=\"fvtt-enc-stats_actor_statlist flexrow\">\n        <div class=\"fvtt-enc-stats_actor_stat\">\n          <div class=\"fvtt-enc-stats_actor_stat-key\">".concat(game.i18n.format("FVTTEncounterStats.template.most_damage_overall"), "</div>\n          <div class=\"fvtt-enc-stats_actor_stat-value\">").concat(data.top.maxDamage, "</div>\n        </div>\n        <div class=\"fvtt-enc-stats_actor_stat\">\n          <div class=\"fvtt-enc-stats_actor_stat-key\">").concat(game.i18n.format("FVTTEncounterStats.template.highest_average_damage"), "</div>\n          <div class=\"fvtt-enc-stats_actor_stat-value\">").concat(data.top.highestAvgDamage, "</div>\n        </div>\n        <div class=\"fvtt-enc-stats_actor_stat\">\n          <div class=\"fvtt-enc-stats_actor_stat-key\">").concat(game.i18n.format("FVTTEncounterStats.template.highest_damage_in_1_hit"), "</div>\n          <div class=\"fvtt-enc-stats_actor_stat-value\">").concat(data.top.highestMaxDamage, "</div>\n        </div>\n      </div>\n    </div>\n    <div class=\"fvtt-enc-stats_combatants\">\n    <div>").concat(data.combatants.filter(function (f) {
    return f.type === "character";
  }).map(function (combatant) {
    return GenerateCombatant(combatant);
  }).join(""), "</div>\n      <h2 class=\"fvtt-enc-stats_enemies\">\n      ").concat(game.i18n.format("FVTTEncounterStats.template.enemies"), "\n      </h2>\n      <div>").concat(data.combatants.filter(function (f) {
    return f.type === "npc";
  }).map(function (combatant) {
    return GenerateCombatant(combatant);
  }).join(""), "</div></div></div>\n  ");
  return markup;
}

function GenerateCombatant(combatant) {
  var markup = "\n  <div class=\"fvtt-enc-stats_combatant\" data-fvtt-id=\"".concat(combatant.id, "\">\n    <div class=\"fvtt-enc-stats_combatants_overview\">\n      <header class=\"fvtt-enc-stats_combatants_actor flexrow\">\n        <div class=\"fvtt-enc-stats_combatants_actor_image flexcol\">\n          <img src=\"").concat(combatant.img, "\" alt=\"").concat(combatant.name, "\" />\n        </div>\n        <div class=\"fvtt-enc-stats_actor_stats\">\n          <h1 class=\"fvtt-enc-stats_actor_stats_name\">").concat(combatant.name, "</h1>\n          <div class=\"fvtt-enc-stats_actor_statlist flexrow\">\n            <div class=\"fvtt-enc-stats_actor_stat\">\n              <div class=\"fvtt-enc-stats_actor_stat-key\">").concat(game.i18n.format("FVTTEncounterStats.template.startinghp"), "</div>\n              <div class=\"fvtt-enc-stats_actor_stat-value\">\n                <span>").concat(combatant.hp, "</span><span class=\"sep\">/</span><span>").concat(combatant.max, "</span></div>\n            </div>\n            <div class=\"fvtt-enc-stats_actor_stat\">\n              <div class=\"fvtt-enc-stats_actor_stat-key\">").concat(game.i18n.format("FVTTEncounterStats.template.finalhp"), "</div>\n              <div class=\"fvtt-enc-stats_actor_stat-value\">\n                <span>").concat(combatant.health.length > 0 ? combatant.health[combatant.health.length - 1].current : combatant.hp, "</span><span class=\"sep\">/</span><span>").concat(combatant.max, "</span></div>\n            </div>\n            <div class=\"fvtt-enc-stats_actor_stat\">\n              <div class=\"fvtt-enc-stats_actor_stat-key\">").concat(game.i18n.format("FVTTEncounterStats.template.ac"), "</div>\n              <div class=\"fvtt-enc-stats_actor_stat-value\"><span>").concat(combatant.ac, "</span></div>\n            </div>\n            <div class=\"fvtt-enc-stats_actor_stat\">\n              <div class=\"fvtt-enc-stats_actor_stat-key\">").concat(game.i18n.format("FVTTEncounterStats.template.damage_total"), "</div>\n              <div class=\"fvtt-enc-stats_actor_stat-value\"><span>").concat(combatant.summaryList.total, "</span></div>\n            </div>\n            <div class=\"fvtt-enc-stats_actor_stat\">\n              <div class=\"fvtt-enc-stats_actor_stat-key\">").concat(game.i18n.format("FVTTEncounterStats.template.min_damage"), "</div>\n              <div class=\"fvtt-enc-stats_actor_stat-value\"><span>").concat(combatant.summaryList.min, "</span></div>\n            </div>\n            <div class=\"fvtt-enc-stats_actor_stat\">\n              <div class=\"fvtt-enc-stats_actor_stat-key\">").concat(game.i18n.format("FVTTEncounterStats.template.max_damage"), "</div>\n              <div class=\"fvtt-enc-stats_actor_stat-value\"><span>").concat(combatant.summaryList.max, "</span></div>\n            </div>\n            <div class=\"fvtt-enc-stats_actor_stat\">\n              <div class=\"fvtt-enc-stats_actor_stat-key\">").concat(game.i18n.format("FVTTEncounterStats.template.avg_damage"), "</div>\n              <div class=\"fvtt-enc-stats_actor_stat-value\"><span>").concat(combatant.summaryList.avg, "</span></div>\n            </div>\n          </div>\n        </div>\n      </header>\n      <section class=\"fvtt-enc-stats_combatants_data\">\n        <section class=\"fvtt-enc-stats_combatants_health\">\n          <div class=\"fvtt-enc-stats_title3\">").concat(game.i18n.format("FVTTEncounterStats.template.health"), "</div>\n          <div class=\"flexcol\">\n            <ol class=\"items-list flexcol\">\n              <li class=\"items-header flexrow\">\n                <div class=\"item-name item-round\">").concat(game.i18n.format("FVTTEncounterStats.template.round"), "</div>\n                <div class=\"item-name\">").concat(game.i18n.format("FVTTEncounterStats.template.hp"), "</div>\n              </li>\n              <ol class=\"item-list\">\n                ").concat(combatant.health.map(function (event) {
    return GenerateHealtRow(event);
  }).join(""), "\n                      \n              </ol>\n            </ol>\n          </div>\n        </section>\n        <section class=\"fvtt-enc-stats_combatants_attacks\">\n          <div class=\"fvtt-enc-stats_title3\">").concat(game.i18n.format("FVTTEncounterStats.template.attacks"), "</div>\n          <div class=\"flexcol\">\n            <ol class=\"items-list flexcol\">\n              <li class=\"items-header flexrow\">\n                <div class=\"item-name item-round\">").concat(game.i18n.format("FVTTEncounterStats.template.round"), "</div>\n                <div class=\"item-name item-weapon\">").concat(game.i18n.format("FVTTEncounterStats.template.weapon_spell_name"), "</div>\n                <div class=\"item-name\">").concat(game.i18n.format("FVTTEncounterStats.template.type"), "</div>\n                <div class=\"item-name\">").concat(game.i18n.format("FVTTEncounterStats.template.rolltype"), "</div>\n                <div class=\"item-name\">").concat(game.i18n.format("FVTTEncounterStats.template.attack_total"), "</div>\n                <div class=\"item-name\">").concat(game.i18n.format("FVTTEncounterStats.template.damage_total"), "</div>\n              </li>\n              <ol class=\"item-list\">\n                ").concat(combatant.events.map(function (event) {
    return GenerateAttackRow(event);
  }).join(""), "\n                      \n              </ol>\n            </ol>\n          </div>\n        </section>\n      </section>\n    </div>\n  </div>\n  ");
  return markup;
}

function GenerateAttackRow(event) {
  var markup = "\n  <li class=\"item flexrow\">\n    <div class=\"item-name item-round\">".concat(event.round, "</div>\n    <div class=\"item-name item-weapon\">").concat(event.item.itemLink ? event.item.itemLink : event.item.name, "</div>\n    <div class=\"item-name\">").concat(getAttackTypeFAIcon(event.actionType), "</div>\n    <div class=\"item-name\">").concat(event.advantage ? "advantage" : event.disadvantage ? "disadvantage" : "normal", "</div>\n    <div class=\"item-name\">").concat(event.attackTotal, " ").concat(event.isCritical ? " (c)" : "", "</div>\n    <div class=\"item-name ").concat(getHealOrDamageClass(event.actionType), "\">").concat(event.damageTotal, "</div>\n  </li>");
  return markup;
}

function getHealOrDamageClass(attackType) {
  if (IsHealingSpell(attackType)) return "blue";
  if (IsValidAttack(attackType)) return "red";
}

function getAttackTypeFAIcon(attackType) {
  var iconName = "dice-d20";
  var iconDescription = game.i18n.format("FVTTEncounterStats.actiontypes.other");

  switch (attackType) {
    case "heal":
      iconName = "heart";
      iconDescription = game.i18n.format("FVTTEncounterStats.actiontypes.heal");
      break;

    case "msak":
      iconName = "scroll";
      iconDescription = game.i18n.format("FVTTEncounterStats.actiontypes.msak");
      break;

    case "rsak":
      iconName = "scroll";
      iconDescription = game.i18n.format("FVTTEncounterStats.actiontypes.rsak");
      break;

    case "mwak":
      iconName = "fist-raised";
      iconDescription = game.i18n.format("FVTTEncounterStats.actiontypes.mwak");
      break;

    case "rwak":
      iconName = "fist-raised";
      iconDescription = game.i18n.format("FVTTEncounterStats.actiontypes.rwak");
      break;

    case "save":
      iconName = "shield-alt";
      iconDescription = game.i18n.format("FVTTEncounterStats.actiontypes.save");
      break;
  }

  return "<i title=\"".concat(iconDescription, "\" class=\"fas fa-").concat(iconName, "\"></i>");
}

function GenerateHealtRow(event) {
  var markup = "\n  <li class=\"item flexrow\">\n    <div class=\"item-name item-round\">".concat(event.round, "</div>\n    <div class=\"item-name\">").concat(event.current, " (").concat(event.isheal ? "+" : "-").concat(event.diff, ")</div>\n  </li>");
  return markup;
}

function GetStat() {
  return GetItemFromLocalStorage();
}
function SaveStat(_x) {
  return _SaveStat.apply(this, arguments);
}

function _SaveStat() {
  _SaveStat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
    var markup, article;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            SaveToLocalStorageStat(data);
            markup = Generate(data);
            _context.next = 4;
            return GetArticle(data.encounterId);

          case 4:
            article = _context.sent;
            _context.next = 7;
            return UpdateJournal(markup, article);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _SaveStat.apply(this, arguments);
}

function RemoveStat() {
  TruncateLocalStorage();
}

function Default(_x, _x2, _x3) {
  return _Default.apply(this, arguments);
}

function _Default() {
  _Default = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(stat, attackData, data) {
    var combatantStat, chatType;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(data.data.content.indexOf("beyond20-message") > -1)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            combatantStat = GetCombatantStats(stat, data.data.speaker.actor);

            if (combatantStat) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return");

          case 5:
            attackData.actorId = data.data.speaker.actor;
            _context.next = 8;
            return ChatType(data);

          case 8:
            chatType = _context.sent;

            if (!(chatType === ATTACKTYPES.NONE)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return");

          case 11:
            if (!(chatType === ATTACKTYPES.INFO)) {
              _context.next = 16;
              break;
            }

            _context.next = 14;
            return GetItemData(attackData, attackData.actorId, data.data.content);

          case 14:
            attackData = _context.sent;
            combatantStat.events.push(attackData);

          case 16:
            if (chatType === ATTACKTYPES.ATTACK || chatType === ATTACKTYPES.DAMAGE || chatType === ATTACKTYPES.DAMAGE_FORMULA) {
              attackData = combatantStat.events[combatantStat.events.length - 1];

              if (chatType === ATTACKTYPES.ATTACK) {
                attackData.attackTotal = data._roll.total;
                attackData.advantage = data._roll.options.advantageMode === 1 ? true : false;
                attackData.disadvantage = data._roll.options.advantageMode === -1 ? true : false;
              }

              if (chatType === ATTACKTYPES.DAMAGE || chatType === ATTACKTYPES.DAMAGE_FORMULA) {
                attackData.damageTotal = data._roll.total;

                if (data._roll.options.critical != null) {
                  attackData.isCritical = data._roll.options.critical;
                }
              }
            }

            nullChecks(attackData);
            CombatantStats(combatantStat);
            return _context.abrupt("return", stat);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _Default.apply(this, arguments);
}

function BetterRollsFor5e(_x, _x2, _x3, _x4) {
  return _BetterRollsFor5e.apply(this, arguments);
}

function _BetterRollsFor5e() {
  _BetterRollsFor5e = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(stat, attackData, $html, isNew) {
    var combatantStat, $attackRollData, $damageRollData, damageTotal, attackTotal;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            combatantStat = GetCombatantStats(stat, $html.attr("data-actor-id"));

            if (combatantStat) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            attackData.actorId = $html.attr("data-actor-id");

            if (isNew) {
              _context.next = 8;
              break;
            }

            attackData = combatantStat.events[combatantStat.events.length - 1];
            _context.next = 11;
            break;

          case 8:
            _context.next = 10;
            return GetItemData(attackData, attackData.actorId, $html, $html.attr("data-item-id"));

          case 10:
            attackData = _context.sent;

          case 11:
            $html.find(".die-icon").remove();
            $attackRollData = $html.find('[data-type="attack"]');
            $damageRollData = $html.find('[data-type="damage"]');
            damageTotal = $damageRollData.find(".red-base-die").not(".ignored").map(function () {
              return parseInt($(this).attr("data-value"));
            }).get().reduce(_add, 0);
            attackTotal = parseInt($attackRollData.find(".dice-total").not(".ignored").text().trim());
            if (isNaN(attackTotal)) attackTotal = 0;
            if (isNaN(damageTotal)) damageTotal = 0;
            attackData.advantage = $attackRollData.attr("data-rollState") === "highest" ? true : false;
            attackData.isCritical = $html.attr("data-critical") === "true" ? true : false;
            attackData.isFumble = false;
            attackData.disadvantage = $attackRollData.attr("data-rollState") === "lowest" ? true : false;
            attackData.attackTotal = attackTotal;
            attackData.damageTotal = damageTotal;
            attackData.itemId = $html.attr("data-item-id");
            nullChecks(attackData);

            if (isNew) {
              combatantStat.events.push(attackData);
            }

            CombatantStats(combatantStat);
            return _context.abrupt("return", stat);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _BetterRollsFor5e.apply(this, arguments);
}

function MidiQol(_x, _x2, _x3) {
  return _MidiQol.apply(this, arguments);
}

function _MidiQol() {
  _MidiQol = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(stat, attackData, workflow) {
    var combatantStat;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            combatantStat = GetCombatantStats(stat, workflow.actor._id);

            if (combatantStat) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            attackData.id = workflow._id;
            attackData.actorId = workflow.actor._id;
            _context.next = 7;
            return GetItemData(attackData, attackData.actorId, null, workflow.item._id);

          case 7:
            attackData = _context.sent;

            if (IsValidAttack(attackData.actionType)) {
              if (workflow.attackRoll) {
                attackData.attackTotal = workflow.attackRoll.total;
                attackData.advantage = workflow.attackRoll.options.advantageMode === 1 ? true : false;
                attackData.disadvantage = workflow.attackRoll.options.advantageMode === -1 ? true : false;
              }
            }

            if (IsValidRollEvent(attackData.actionType)) {
              if (workflow.damageRoll) {
                attackData.damageTotal = workflow.damageRoll.total;
                attackData.isCritical = workflow.damageRoll.options.critical;
              }
            }

            nullChecks(attackData);

            if (combatantStat.events.find(function (f) {
              return f.id === attackData.id;
            })) {
              combatantStat.events[combatantStat.events.length - 1] = attackData;
            } else {
              combatantStat.events.push(attackData);
            }

            CombatantStats(combatantStat);
            return _context.abrupt("return", stat);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _MidiQol.apply(this, arguments);
}

function Beyond20(_x, _x2, _x3) {
  return _Beyond.apply(this, arguments);
}

function _Beyond() {
  _Beyond = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(stat, attackData, data) {
    var combatantStat, rollContent, attackRollData, damageCritNumber, damageOne, damageTwo, advantageCheck, attackRolls, rollsArray, i, roll;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(data.data.content.indexOf("beyond20-message") === -1)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            combatantStat = GetCombatantStats(stat, data.data.speaker.actor);

            if (combatantStat) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return");

          case 5:
            attackData.actorId = data.data.speaker.actor;
            rollContent = $(data.data.content);
            attackRollData = rollContent.find(".beyond20-roll-result").first();
            attackData.isCritical = rollContent.html().indexOf("Critical Damage") > -1;
            attackData.item.name = rollContent.find("details > summary > a").text().trim();

            if (!attackData.isCritical) {
              attackData.attackTotal = parseInt(attackRollData.find(".beyond20-roll-detail-normal").not(".beyond20-roll-detail-discarded").not(".beyond20-roll-total").first().text().trim());
              attackData.damageTotal = parseInt(rollContent.find(".beyond20-roll-result").last().find(".beyond20-roll-total.dice-total").text().trim());
            } else {
              damageCritNumber = rollContent.find(".beyond20-roll-detail-normal").length;
              damageOne = $(rollContent.find(".beyond20-roll-detail-normal")[damageCritNumber - 1]).text().trim();
              damageTwo = $(rollContent.find(".beyond20-roll-detail-normal")[damageCritNumber - 2]).text().trim();
              attackData.damageTotal = parseInt(damageOne) + parseInt(damageTwo);
              attackData.attackTotal = parseInt(attackRollData.find(".beyond20-roll-detail-crit").text().trim());
            }

            advantageCheck = attackRollData.find(".beyond20-roll-cell").length > 1;

            if (advantageCheck) {
              attackRolls = attackRollData.find(".beyond20-tooltip");
              rollsArray = [];

              for (i = 0; i < attackRolls.length; i++) {
                roll = $(attackRolls[i]).children().first();
                rollsArray.push({
                  value: roll.text().trim(),
                  isIgnored: roll.hasClass("beyond20-roll-detail-discarded")
                });
              }

              if (rollsArray.find(function (f) {
                return f.isIgnored;
              }).value < rollsArray.find(function (f) {
                return !f.isIgnored;
              }).value) {
                attackData.advantage = true;
              } else {
                attackData.disadvantage = true;
              }
            }

            combatantStat.events.push(attackData);
            nullChecks(attackData);
            CombatantStats(combatantStat);
            return _context.abrupt("return", stat);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _Beyond.apply(this, arguments);
}

function AddAttack(_x, _x2) {
  return _AddAttack.apply(this, arguments);
}

function _AddAttack() {
  _AddAttack = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data, type) {
    var isNew,
        stat,
        attackData,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isNew = _args.length > 2 && _args[2] !== undefined ? _args[2] : false;
            stat = GetStat();
            attackData = duplicate(ATTACK_DATA_TEMPLATE);
            attackData.round = stat.round;
            _context.t0 = type;
            _context.next = _context.t0 === ROLL_HOOK.BETTERROLLS5E ? 7 : _context.t0 === ROLL_HOOK.MIDI_QOL ? 11 : _context.t0 === ROLL_HOOK.BEYOND_20 ? 15 : _context.t0 === ROLL_HOOK.DEFAULT ? 19 : 23;
            break;

          case 7:
            _context.next = 9;
            return BetterRollsFor5e(stat, attackData, data, isNew);

          case 9:
            stat = _context.sent;
            return _context.abrupt("break", 24);

          case 11:
            _context.next = 13;
            return MidiQol(stat, attackData, data);

          case 13:
            stat = _context.sent;
            return _context.abrupt("break", 24);

          case 15:
            _context.next = 17;
            return Beyond20(stat, attackData, data);

          case 17:
            stat = _context.sent;
            return _context.abrupt("break", 24);

          case 19:
            _context.next = 21;
            return Default(stat, attackData, data);

          case 21:
            stat = _context.sent;
            return _context.abrupt("break", 24);

          case 23:
            return _context.abrupt("return");

          case 24:
            if (stat) {
              _context.next = 26;
              break;
            }

            return _context.abrupt("return");

          case 26:
            stat.top = _getTopStats(stat);
            _context.next = 29;
            return SaveStat(stat);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _AddAttack.apply(this, arguments);
}

function AddCombatants(_x3, _x4) {
  return _AddCombatants.apply(this, arguments);
}

function _AddCombatants() {
  _AddCombatants = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(combatants, tokenImage) {
    var combatant, stat, newCombatants;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            combatant = combatants.data;

            if (_isValidCombatant(combatant.type)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return");

          case 3:
            stat = GetStat();
            newCombatants = {
              name: combatant.name,
              id: combatant._id,
              img: tokenImage ? tokenImage : combatant.img,
              type: combatant.type,
              hp: combatant.data.attributes.hp.value,
              max: combatant.data.attributes.hp.max,
              ac: combatant.data.attributes.ac.value,
              events: [],
              health: [],
              summaryList: {
                min: "0",
                max: "0",
                avg: "0",
                total: "0"
              }
            };

            if (stat.combatants.find(function (f) {
              return f.id === newCombatants.id;
            })) {
              _context2.next = 9;
              break;
            }

            stat.combatants.push(newCombatants);
            _context2.next = 9;
            return SaveStat(stat);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _AddCombatants.apply(this, arguments);
}

function _isValidCombatant(type) {
  return type === "character" || type === "npc";
}

function _getTopStats(data) {
  var result = data.combatants.map(function (m) {
    return {
      name: m.name,
      min: m.summaryList.min,
      max: m.summaryList.max,
      avg: m.summaryList.avg,
      total: m.summaryList.total
    };
  });
  var maxDamage = result.reduce(function (max, obj) {
    return obj.total > max.total ? obj : max;
  });
  var highestAvgDamage = result.reduce(function (max, obj) {
    return obj.avg > max.avg ? obj : max;
  });
  var highestMaxDamage = result.reduce(function (max, obj) {
    return obj.max > max.max ? obj : max;
  });
  return {
    maxDamage: "".concat(maxDamage.name, "<br />").concat(maxDamage.total),
    highestAvgDamage: "".concat(highestAvgDamage.name, "<br />").concat(highestAvgDamage.avg),
    highestMaxDamage: "".concat(highestMaxDamage.name, "<br />").concat(highestMaxDamage.max)
  };
}

function UpdateHealth(_x) {
  return _UpdateHealth.apply(this, arguments);
}

function _UpdateHealth() {
  _UpdateHealth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
    var stat, healthData, combatantStat;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            stat = GetStat();
            healthData = duplicate(HEALTH_DATA_TEMPLATE);
            combatantStat = GetCombatantStats(stat, data.data._id);

            if (combatantStat) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return");

          case 5:
            healthData.round = stat.round;
            healthData.actorId = data.data._id;
            healthData.max = data.data.data.attributes.hp.max;
            healthData.current = data.data.data.attributes.hp.value;

            if (combatantStat.health.length > 0) {
              healthData.previous = combatantStat.health[combatantStat.health.length - 1].current;
            } else {
              healthData.previous = combatantStat.hp;
            }

            if (healthData.current > healthData.previous) {
              healthData.diff = healthData.current - healthData.previous;
              healthData.isheal = true;
            } else if (healthData.current < healthData.previous) {
              healthData.diff = healthData.previous - healthData.current;
              healthData.isdamage = true;
            }

            if (healthData.diff > 0) {
              combatantStat.health.push(healthData);
            }

            _context.next = 14;
            return SaveStat(stat);

          case 14:
            return _context.abrupt("return", stat);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _UpdateHealth.apply(this, arguments);
}

function _createCombat(_x) {
  return _createCombat2.apply(this, arguments);
}

function _createCombat2() {
  _createCombat2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
    var encounterId, stat;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            encounterId = data.data._id;

            if (encounterId) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", "");

          case 3:
            stat = {
              encounterId: encounterId,
              round: 1,
              combatants: [],
              top: {
                maxDamage: "",
                highestAvgDamage: "",
                highestMaxDamage: ""
              }
            };
            _context.next = 6;
            return CreateJournal(encounterId);

          case 6:
            _context.next = 8;
            return SaveStat(stat);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createCombat2.apply(this, arguments);
}

function _addCombatants(_x2) {
  return _addCombatants2.apply(this, arguments);
}

function _addCombatants2() {
  _addCombatants2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data) {
    var combatantsList, i, _canvas$tokens$get, _canvas$tokens$get$da, actorId, tokenImage;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (data.combat) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
            combatantsList = data.combat.data._source.combatants;

            for (i = 0; i < combatantsList.length; i++) {
              actorId = combatantsList[i].actorId;
              tokenImage = (_canvas$tokens$get = canvas.tokens.get(combatantsList[i].tokenId)) === null || _canvas$tokens$get === void 0 ? void 0 : (_canvas$tokens$get$da = _canvas$tokens$get.data) === null || _canvas$tokens$get$da === void 0 ? void 0 : _canvas$tokens$get$da.img;
              AddCombatants(game.actors.get(actorId), tokenImage);
            }

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _addCombatants2.apply(this, arguments);
}

function _updateRound(_x3) {
  return _updateRound2.apply(this, arguments);
}

function _updateRound2() {
  _updateRound2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(currentRound) {
    var stat;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (currentRound) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return");

          case 2:
            stat = GetStat();

            if (!(stat.round !== currentRound)) {
              _context3.next = 7;
              break;
            }

            stat.round = currentRound;
            _context3.next = 7;
            return SaveStat(stat);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _updateRound2.apply(this, arguments);
}

function OnRenderCombatTracker(_x4) {
  return _OnRenderCombatTracker.apply(this, arguments);
}

function _OnRenderCombatTracker() {
  _OnRenderCombatTracker = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(arg3) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _addCombatants(arg3);

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _OnRenderCombatTracker.apply(this, arguments);
}

function OnCreateCombat(_x5) {
  return _OnCreateCombat.apply(this, arguments);
}

function _OnCreateCombat() {
  _OnCreateCombat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(arg1) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _createCombat(arg1);

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _OnCreateCombat.apply(this, arguments);
}

function OnDeleteCombat() {
  return _OnDeleteCombat.apply(this, arguments);
}

function _OnDeleteCombat() {
  _OnDeleteCombat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            RemoveStat();

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _OnDeleteCombat.apply(this, arguments);
}

function OnCreateChatMessage(_x6) {
  return _OnCreateChatMessage.apply(this, arguments);
}

function _OnCreateChatMessage() {
  _OnCreateChatMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(attackData) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (_isInCombat()) {
              _context7.next = 2;
              break;
            }

            return _context7.abrupt("return");

          case 2:
            AddAttack(attackData, ROLL_HOOK.DEFAULT);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _OnCreateChatMessage.apply(this, arguments);
}

function OnBeyond20(_x7) {
  return _OnBeyond.apply(this, arguments);
}

function _OnBeyond() {
  _OnBeyond = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(workflow) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (_isInCombat()) {
              _context8.next = 2;
              break;
            }

            return _context8.abrupt("return");

          case 2:
            AddAttack(workflow, ROLL_HOOK.BEYOND_20);

          case 3:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _OnBeyond.apply(this, arguments);
}

function OnMidiRollComplete(_x8) {
  return _OnMidiRollComplete.apply(this, arguments);
}

function _OnMidiRollComplete() {
  _OnMidiRollComplete = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(workflow) {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            if (_isInCombat()) {
              _context9.next = 2;
              break;
            }

            return _context9.abrupt("return");

          case 2:
            AddAttack(workflow, ROLL_HOOK.MIDI_QOL);

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _OnMidiRollComplete.apply(this, arguments);
}

function OnUpdateBetterRolls(_x9, _x10) {
  return _OnUpdateBetterRolls.apply(this, arguments);
}

function _OnUpdateBetterRolls() {
  _OnUpdateBetterRolls = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(attackData, isNew) {
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            if (_isInCombat()) {
              _context10.next = 2;
              break;
            }

            return _context10.abrupt("return");

          case 2:
            AddAttack(attackData, ROLL_HOOK.BETTERROLLS5E, isNew);

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _OnUpdateBetterRolls.apply(this, arguments);
}

function OnUpdateHealth(_x11) {
  return _OnUpdateHealth.apply(this, arguments);
}

function _OnUpdateHealth() {
  _OnUpdateHealth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(data) {
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            if (_isInCombat()) {
              _context11.next = 2;
              break;
            }

            return _context11.abrupt("return");

          case 2:
            UpdateHealth(data);

          case 3:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _OnUpdateHealth.apply(this, arguments);
}

function OnUpdateCombat(_x12) {
  return _OnUpdateCombat.apply(this, arguments);
}

function _OnUpdateCombat() {
  _OnUpdateCombat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(round) {
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _updateRound(round);

          case 1:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _OnUpdateCombat.apply(this, arguments);
}

function _isInCombat() {
  var stat = GetStat();
  return stat;
}

var SOCKET_NAME = "module.fvtt-encounter-stats";

function _setupSockerListeners() {
  game.socket.on(SOCKET_NAME, function (payload) {
    switch (payload.event) {
      case "updateActor":
        OnUpdateHealth(payload.data);
        break;

      case "midi-qol.RollComplete":
        OnMidiRollComplete(payload.data);
        break;

      case "messageBetterRolls":
      case "updateBetterRolls":
        OnUpdateBetterRolls($(payload.data), payload.isNew);
        break;
    }
  });
}

function SetupHooks() {
  return _SetupHooks.apply(this, arguments);
}

function _SetupHooks() {
  _SetupHooks = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
    var _game$modules$get, _game$modules$get2, _game$modules$get3, _game$modules$get4, _game$modules$get5;

    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            if (game.user.isGM) {
              _setupSockerListeners();

              window.Hooks.on("renderCombatTracker", /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(arg1, arg2, data) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          OnRenderCombatTracker(data);

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x, _x2, _x3) {
                  return _ref.apply(this, arguments);
                };
              }());
              window.Hooks.on("createCombat", /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data, arg2, arg3) {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          OnCreateCombat(data);

                        case 1:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function (_x4, _x5, _x6) {
                  return _ref2.apply(this, arguments);
                };
              }());
              window.Hooks.on("deleteCombat", /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data, arg2, arg3) {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          OnDeleteCombat(data);

                        case 1:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                return function (_x7, _x8, _x9) {
                  return _ref3.apply(this, arguments);
                };
              }());
              window.Hooks.on("updateCombat", /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(arg1, data, arg3) {
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          OnUpdateCombat(data.round);

                        case 1:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }));

                return function (_x10, _x11, _x12) {
                  return _ref4.apply(this, arguments);
                };
              }());
              window.Hooks.on("updateActor", /*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(data, diff) {
                  var _diff$data, _diff$data$attributes;

                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          if ((_diff$data = diff.data) !== null && _diff$data !== void 0 && (_diff$data$attributes = _diff$data.attributes) !== null && _diff$data$attributes !== void 0 && _diff$data$attributes.hp) {
                            OnUpdateHealth(data);
                          }

                        case 1:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));

                return function (_x13, _x14) {
                  return _ref5.apply(this, arguments);
                };
              }());

              if ((_game$modules$get = game.modules.get("midi-qol")) !== null && _game$modules$get !== void 0 && _game$modules$get.active) {
                window.Hooks.on("midi-qol.RollComplete", /*#__PURE__*/function () {
                  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(workflow) {
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            OnMidiRollComplete(workflow);

                          case 1:
                          case "end":
                            return _context6.stop();
                        }
                      }
                    }, _callee6);
                  }));

                  return function (_x15) {
                    return _ref6.apply(this, arguments);
                  };
                }());
              } else if ((_game$modules$get2 = game.modules.get("betterrolls5e")) !== null && _game$modules$get2 !== void 0 && _game$modules$get2.active) {
                window.Hooks.on("messageBetterRolls", /*#__PURE__*/function () {
                  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(data, options, user) {
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            OnUpdateBetterRolls($(options.content), true);

                          case 1:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7);
                  }));

                  return function (_x16, _x17, _x18) {
                    return _ref7.apply(this, arguments);
                  };
                }());
                window.Hooks.on("updateBetterRolls", /*#__PURE__*/function () {
                  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(data, html, user) {
                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            OnUpdateBetterRolls($(html), false);

                          case 1:
                          case "end":
                            return _context8.stop();
                        }
                      }
                    }, _callee8);
                  }));

                  return function (_x19, _x20, _x21) {
                    return _ref8.apply(this, arguments);
                  };
                }());
              } else {
                window.Hooks.on("createChatMessage", /*#__PURE__*/function () {
                  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(data, options, user) {
                    return regeneratorRuntime.wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            OnCreateChatMessage(data);

                          case 1:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9);
                  }));

                  return function (_x22, _x23, _x24) {
                    return _ref9.apply(this, arguments);
                  };
                }());
              }

              if ((_game$modules$get3 = game.modules.get("beyond20")) !== null && _game$modules$get3 !== void 0 && _game$modules$get3.active) {
                window.Hooks.on("createChatMessage", /*#__PURE__*/function () {
                  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(data, options, user) {
                    return regeneratorRuntime.wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            OnBeyond20(data);

                          case 1:
                          case "end":
                            return _context10.stop();
                        }
                      }
                    }, _callee10);
                  }));

                  return function (_x25, _x26, _x27) {
                    return _ref10.apply(this, arguments);
                  };
                }());
              }
            } else {
              window.Hooks.on("updateActor", /*#__PURE__*/function () {
                var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(data, diff) {
                  var _diff$data2, _diff$data2$attribute;

                  return regeneratorRuntime.wrap(function _callee11$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
                        case 0:
                          if ((_diff$data2 = diff.data) !== null && _diff$data2 !== void 0 && (_diff$data2$attribute = _diff$data2.attributes) !== null && _diff$data2$attribute !== void 0 && _diff$data2$attribute.hp) {
                            game.socket.emit(SOCKET_NAME, {
                              event: "updateActor",
                              data: data
                            });
                          }

                        case 1:
                        case "end":
                          return _context11.stop();
                      }
                    }
                  }, _callee11);
                }));

                return function (_x28, _x29) {
                  return _ref11.apply(this, arguments);
                };
              }());

              if ((_game$modules$get4 = game.modules.get("midi-qol")) !== null && _game$modules$get4 !== void 0 && _game$modules$get4.active) {
                window.Hooks.on("midi-qol.RollComplete", /*#__PURE__*/function () {
                  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(workflow) {
                    return regeneratorRuntime.wrap(function _callee12$(_context12) {
                      while (1) {
                        switch (_context12.prev = _context12.next) {
                          case 0:
                            game.socket.emit(SOCKET_NAME, {
                              event: "midi-qol.RollComplete",
                              data: workflow
                            });

                          case 1:
                          case "end":
                            return _context12.stop();
                        }
                      }
                    }, _callee12);
                  }));

                  return function (_x30) {
                    return _ref12.apply(this, arguments);
                  };
                }());
              } else if ((_game$modules$get5 = game.modules.get("betterrolls5e")) !== null && _game$modules$get5 !== void 0 && _game$modules$get5.active) {
                window.Hooks.on("messageBetterRolls", /*#__PURE__*/function () {
                  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(data, options, user) {
                    return regeneratorRuntime.wrap(function _callee13$(_context13) {
                      while (1) {
                        switch (_context13.prev = _context13.next) {
                          case 0:
                            game.socket.emit(SOCKET_NAME, {
                              event: "messageBetterRolls",
                              data: options.content,
                              isNew: true
                            });

                          case 1:
                          case "end":
                            return _context13.stop();
                        }
                      }
                    }, _callee13);
                  }));

                  return function (_x31, _x32, _x33) {
                    return _ref13.apply(this, arguments);
                  };
                }());
                window.Hooks.on("updateBetterRolls", /*#__PURE__*/function () {
                  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(data, html, user) {
                    return regeneratorRuntime.wrap(function _callee14$(_context14) {
                      while (1) {
                        switch (_context14.prev = _context14.next) {
                          case 0:
                            game.socket.emit(SOCKET_NAME, {
                              event: "updateBetterRolls",
                              data: html,
                              isNew: false
                            });

                          case 1:
                          case "end":
                            return _context14.stop();
                        }
                      }
                    }, _callee14);
                  }));

                  return function (_x34, _x35, _x36) {
                    return _ref14.apply(this, arguments);
                  };
                }());
              }
            }

          case 1:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return _SetupHooks.apply(this, arguments);
}

Hooks.once("init", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          game.settings.register("".concat(MODULE_ID), "".concat(OPT_ENABLE), {
            name: game.i18n.format("FVTTEncounterStats.opt_enable_name"),
            hint: game.i18n.format("FVTTEncounterStats.opt_enable_hint"),
            scope: "world",
            config: true,
            "default": true,
            type: Boolean
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
Hooks.once("ready", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (game.settings.get("".concat(MODULE_ID), "".concat(OPT_ENABLE))) {
            _context2.next = 2;
            break;
          }

          return _context2.abrupt("return");

        case 2:
          if (game.user.isGM) {
            CreateFolder();
          }

          SetupHooks();

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
//# sourceMappingURL=module.js.map

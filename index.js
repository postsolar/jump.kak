// output-es/runtime.js
function fail() {
  throw new Error("Failed pattern match");
}
function intDiv(x, y) {
  if (y > 0)
    return Math.floor(x / y);
  if (y < 0)
    return -Math.floor(x / -y);
  return 0;
}

// output-es/Type.Proxy/index.js
var $$$Proxy = () => ({ tag: "Proxy" });
var $$Proxy = /* @__PURE__ */ $$$Proxy();

// output-es/Data.Functor/foreign.js
var arrayMap = function(f) {
  return function(arr) {
    var l = arr.length;
    var result = new Array(l);
    for (var i = 0; i < l; i++) {
      result[i] = f(arr[i]);
    }
    return result;
  };
};

// output-es/Data.Functor/index.js
var functorArray = { map: arrayMap };

// output-es/Control.Bind/foreign.js
var arrayBind = function(arr) {
  return function(f) {
    var result = [];
    for (var i = 0, l = arr.length; i < l; i++) {
      Array.prototype.push.apply(result, f(arr[i]));
    }
    return result;
  };
};

// output-es/Control.Bind/index.js
var identity = (x) => x;

// output-es/Record.Unsafe/foreign.js
var unsafeGet = function(label) {
  return function(rec) {
    return rec[label];
  };
};

// output-es/Data.Show/foreign.js
var showIntImpl = function(n) {
  return n.toString();
};

// output-es/Data.Ordering/index.js
var $Ordering = (tag) => tag;
var LT = /* @__PURE__ */ $Ordering("LT");
var GT = /* @__PURE__ */ $Ordering("GT");
var EQ = /* @__PURE__ */ $Ordering("EQ");

// output-es/Data.Maybe/index.js
var $Maybe = (tag, _1) => ({ tag, _1 });
var Nothing = /* @__PURE__ */ $Maybe("Nothing");
var Just = (value0) => $Maybe("Just", value0);
var isNothing = (v2) => {
  if (v2.tag === "Nothing") {
    return true;
  }
  if (v2.tag === "Just") {
    return false;
  }
  fail();
};
var functorMaybe = {
  map: (v) => (v1) => {
    if (v1.tag === "Just") {
      return $Maybe("Just", v(v1._1));
    }
    return Nothing;
  }
};
var applyMaybe = {
  apply: (v) => (v1) => {
    if (v.tag === "Just") {
      if (v1.tag === "Just") {
        return $Maybe("Just", v._1(v1._1));
      }
      return Nothing;
    }
    if (v.tag === "Nothing") {
      return Nothing;
    }
    fail();
  },
  Functor0: () => functorMaybe
};
var applicativeMaybe = { pure: Just, Apply0: () => applyMaybe };

// output-es/Control.Monad.ST.Uncurried/foreign.js
var runSTFn2 = function runSTFn22(fn) {
  return function(a) {
    return function(b) {
      return function() {
        return fn(a, b);
      };
    };
  };
};

// output-es/Data.Array.ST/foreign.js
var pushImpl = function(a, xs) {
  return xs.push(a);
};

// output-es/Data.Array.ST/index.js
var push = /* @__PURE__ */ runSTFn2(pushImpl);

// output-es/Data.Foldable/foreign.js
var foldrArray = function(f) {
  return function(init) {
    return function(xs) {
      var acc = init;
      var len = xs.length;
      for (var i = len - 1; i >= 0; i--) {
        acc = f(xs[i])(acc);
      }
      return acc;
    };
  };
};
var foldlArray = function(f) {
  return function(init) {
    return function(xs) {
      var acc = init;
      var len = xs.length;
      for (var i = 0; i < len; i++) {
        acc = f(acc)(xs[i]);
      }
      return acc;
    };
  };
};

// output-es/Data.Foldable/index.js
var foldableArray = {
  foldr: foldrArray,
  foldl: foldlArray,
  foldMap: (dictMonoid) => {
    const mempty = dictMonoid.mempty;
    return (f) => foldableArray.foldr((x) => (acc) => dictMonoid.Semigroup0().append(f(x))(acc))(mempty);
  }
};

// output-es/Data.Tuple/index.js
var $Tuple = (_1, _2) => ({ tag: "Tuple", _1, _2 });
var Tuple = (value0) => (value1) => $Tuple(value0, value1);
var snd = (v) => v._2;
var fst = (v) => v._1;

// output-es/Data.FunctorWithIndex/foreign.js
var mapWithIndexArray = function(f) {
  return function(xs) {
    var l = xs.length;
    var result = Array(l);
    for (var i = 0; i < l; i++) {
      result[i] = f(i)(xs[i]);
    }
    return result;
  };
};

// output-es/Data.Eq/foreign.js
var refEq = function(r1) {
  return function(r2) {
    return r1 === r2;
  };
};
var eqIntImpl = refEq;

// output-es/Data.Eq/index.js
var eqInt = { eq: eqIntImpl };

// output-es/Data.Ord/foreign.js
var unsafeCompareImpl = function(lt) {
  return function(eq) {
    return function(gt) {
      return function(x) {
        return function(y) {
          return x < y ? lt : x === y ? eq : gt;
        };
      };
    };
  };
};
var ordIntImpl = unsafeCompareImpl;

// output-es/Data.Ord/index.js
var ordInt = { compare: /* @__PURE__ */ ordIntImpl(LT)(EQ)(GT), Eq0: () => eqInt };

// output-es/Unsafe.Coerce/foreign.js
var unsafeCoerce = function(x) {
  return x;
};

// output-es/Data.Traversable/foreign.js
var traverseArrayImpl = /* @__PURE__ */ function() {
  function array1(a) {
    return [a];
  }
  function array2(a) {
    return function(b) {
      return [a, b];
    };
  }
  function array3(a) {
    return function(b) {
      return function(c) {
        return [a, b, c];
      };
    };
  }
  function concat2(xs) {
    return function(ys) {
      return xs.concat(ys);
    };
  }
  return function(apply) {
    return function(map) {
      return function(pure) {
        return function(f) {
          return function(array) {
            function go(bot, top) {
              switch (top - bot) {
                case 0:
                  return pure([]);
                case 1:
                  return map(array1)(f(array[bot]));
                case 2:
                  return apply(map(array2)(f(array[bot])))(f(array[bot + 1]));
                case 3:
                  return apply(apply(map(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                default:
                  var pivot = bot + Math.floor((top - bot) / 4) * 2;
                  return apply(map(concat2)(go(bot, pivot)))(go(pivot, top));
              }
            }
            return go(0, array.length);
          };
        };
      };
    };
  };
}();

// output-es/Data.Traversable/index.js
var identity3 = (x) => x;
var traversableArray = {
  traverse: (dictApplicative) => {
    const Apply0 = dictApplicative.Apply0();
    return traverseArrayImpl(Apply0.apply)(Apply0.Functor0().map)(dictApplicative.pure);
  },
  sequence: (dictApplicative) => traversableArray.traverse(dictApplicative)(identity3),
  Functor0: () => functorArray,
  Foldable1: () => foldableArray
};

// output-es/Data.Array/foreign.js
var replicateFill = function(count, value) {
  if (count < 1) {
    return [];
  }
  var result = new Array(count);
  return result.fill(value);
};
var replicatePolyfill = function(count, value) {
  var result = [];
  var n = 0;
  for (var i = 0; i < count; i++) {
    result[n++] = value;
  }
  return result;
};
var replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
var unconsImpl = function(empty2, next, xs) {
  return xs.length === 0 ? empty2({}) : next(xs[0])(xs.slice(1));
};
var findIndexImpl = function(just, nothing, f, xs) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (f(xs[i]))
      return just(i);
  }
  return nothing;
};
var sliceImpl = function(s, e, l) {
  return l.slice(s, e);
};

// output-es/Data.Array/index.js
var snoc = (xs) => (x) => (() => {
  const $0 = push(x);
  return () => {
    const result = [...xs];
    $0(result)();
    return result;
  };
})()();
var splitAt = (v) => (v1) => {
  if (v <= 0) {
    return { before: [], after: v1 };
  }
  return { before: sliceImpl(0, v, v1), after: sliceImpl(v, v1.length, v1) };
};
var last = (xs) => {
  const $0 = xs.length - 1 | 0;
  if ($0 >= 0 && $0 < xs.length) {
    return $Maybe("Just", xs[$0]);
  }
  return Nothing;
};
var unsnoc = (xs) => applyMaybe.apply(xs.length === 0 ? Nothing : $Maybe(
  "Just",
  (() => {
    const $0 = sliceImpl(0, xs.length - 1 | 0, xs);
    return (v1) => ({ init: $0, last: v1 });
  })()
))(last(xs));
var elem = (dictEq) => (a) => (arr) => {
  const $0 = findIndexImpl(Just, Nothing, (v) => dictEq.eq(v)(a), arr);
  if ($0.tag === "Nothing") {
    return false;
  }
  if ($0.tag === "Just") {
    return true;
  }
  fail();
};

// output-es/Data.Number/foreign.js
var isFiniteImpl = isFinite;
var floor = Math.floor;

// output-es/Data.Int/foreign.js
var fromNumberImpl = function(just) {
  return function(nothing) {
    return function(n) {
      return (n | 0) === n ? just(n) : nothing;
    };
  };
};
var toNumber = function(n) {
  return n;
};
var fromStringAsImpl = function(just) {
  return function(nothing) {
    return function(radix) {
      var digits;
      if (radix < 11) {
        digits = "[0-" + (radix - 1).toString() + "]";
      } else if (radix === 11) {
        digits = "[0-9a]";
      } else {
        digits = "[0-9a-" + String.fromCharCode(86 + radix) + "]";
      }
      var pattern = new RegExp("^[\\+\\-]?" + digits + "+$", "i");
      return function(s) {
        if (pattern.test(s)) {
          var i = parseInt(s, radix);
          return (i | 0) === i ? just(i) : nothing;
        } else {
          return nothing;
        }
      };
    };
  };
};

// output-es/Data.Int/index.js
var fromStringAs = /* @__PURE__ */ fromStringAsImpl(Just)(Nothing);
var fromString = /* @__PURE__ */ fromStringAs(10);
var fromNumber = /* @__PURE__ */ fromNumberImpl(Just)(Nothing);
var unsafeClamp = (x) => {
  if (!isFiniteImpl(x)) {
    return 0;
  }
  if (x >= toNumber(2147483647)) {
    return 2147483647;
  }
  if (x <= toNumber(-2147483648)) {
    return -2147483648;
  }
  const $0 = fromNumber(x);
  if ($0.tag === "Nothing") {
    return 0;
  }
  if ($0.tag === "Just") {
    return $0._1;
  }
  fail();
};

// output-es/Data.CodePoint.Unicode.Internal/index.js
var $UnicodeCategory = (tag) => tag;
var NUMCAT_LU = /* @__PURE__ */ $UnicodeCategory("NUMCAT_LU");
var NUMCAT_LL = /* @__PURE__ */ $UnicodeCategory("NUMCAT_LL");
var NUMCAT_LT = /* @__PURE__ */ $UnicodeCategory("NUMCAT_LT");
var NUMCAT_LM = /* @__PURE__ */ $UnicodeCategory("NUMCAT_LM");
var NUMCAT_LO = /* @__PURE__ */ $UnicodeCategory("NUMCAT_LO");
var NUMCAT_MN = /* @__PURE__ */ $UnicodeCategory("NUMCAT_MN");
var NUMCAT_MC = /* @__PURE__ */ $UnicodeCategory("NUMCAT_MC");
var NUMCAT_ME = /* @__PURE__ */ $UnicodeCategory("NUMCAT_ME");
var NUMCAT_ND = /* @__PURE__ */ $UnicodeCategory("NUMCAT_ND");
var NUMCAT_NL = /* @__PURE__ */ $UnicodeCategory("NUMCAT_NL");
var NUMCAT_NO = /* @__PURE__ */ $UnicodeCategory("NUMCAT_NO");
var NUMCAT_PC = /* @__PURE__ */ $UnicodeCategory("NUMCAT_PC");
var NUMCAT_PD = /* @__PURE__ */ $UnicodeCategory("NUMCAT_PD");
var NUMCAT_PS = /* @__PURE__ */ $UnicodeCategory("NUMCAT_PS");
var NUMCAT_PE = /* @__PURE__ */ $UnicodeCategory("NUMCAT_PE");
var NUMCAT_PI = /* @__PURE__ */ $UnicodeCategory("NUMCAT_PI");
var NUMCAT_PF = /* @__PURE__ */ $UnicodeCategory("NUMCAT_PF");
var NUMCAT_PO = /* @__PURE__ */ $UnicodeCategory("NUMCAT_PO");
var NUMCAT_SM = /* @__PURE__ */ $UnicodeCategory("NUMCAT_SM");
var NUMCAT_SC = /* @__PURE__ */ $UnicodeCategory("NUMCAT_SC");
var NUMCAT_SK = /* @__PURE__ */ $UnicodeCategory("NUMCAT_SK");
var NUMCAT_SO = /* @__PURE__ */ $UnicodeCategory("NUMCAT_SO");
var NUMCAT_ZS = /* @__PURE__ */ $UnicodeCategory("NUMCAT_ZS");
var NUMCAT_ZL = /* @__PURE__ */ $UnicodeCategory("NUMCAT_ZL");
var NUMCAT_ZP = /* @__PURE__ */ $UnicodeCategory("NUMCAT_ZP");
var NUMCAT_CC = /* @__PURE__ */ $UnicodeCategory("NUMCAT_CC");
var NUMCAT_CF = /* @__PURE__ */ $UnicodeCategory("NUMCAT_CF");
var NUMCAT_CS = /* @__PURE__ */ $UnicodeCategory("NUMCAT_CS");
var NUMCAT_CO = /* @__PURE__ */ $UnicodeCategory("NUMCAT_CO");
var NUMCAT_CN = /* @__PURE__ */ $UnicodeCategory("NUMCAT_CN");
var rule1 = { category: 2, unicodeCat: NUMCAT_ZS, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule162 = { category: 67108864, unicodeCat: NUMCAT_ZP, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule161 = { category: 33554432, unicodeCat: NUMCAT_ZL, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule13 = { category: 8192, unicodeCat: NUMCAT_SO, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule170 = { category: 8192, unicodeCat: NUMCAT_SO, possible: 1, updist: 0, lowdist: 26, titledist: 0 };
var rule171 = { category: 8192, unicodeCat: NUMCAT_SO, possible: 1, updist: -26, lowdist: 0, titledist: -26 };
var rule6 = { category: 64, unicodeCat: NUMCAT_SM, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule10 = { category: 1024, unicodeCat: NUMCAT_SK, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule3 = { category: 8, unicodeCat: NUMCAT_SC, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule4 = { category: 16, unicodeCat: NUMCAT_PS, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule2 = { category: 4, unicodeCat: NUMCAT_PO, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule15 = { category: 32768, unicodeCat: NUMCAT_PI, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule19 = { category: 262144, unicodeCat: NUMCAT_PF, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule5 = { category: 32, unicodeCat: NUMCAT_PE, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule7 = { category: 128, unicodeCat: NUMCAT_PD, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule11 = { category: 2048, unicodeCat: NUMCAT_PC, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule17 = { category: 131072, unicodeCat: NUMCAT_NO, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule128 = { category: 16777216, unicodeCat: NUMCAT_NL, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule168 = { category: 16777216, unicodeCat: NUMCAT_NL, possible: 1, updist: 0, lowdist: 16, titledist: 0 };
var rule169 = { category: 16777216, unicodeCat: NUMCAT_NL, possible: 1, updist: -16, lowdist: 0, titledist: -16 };
var rule8 = { category: 256, unicodeCat: NUMCAT_ND, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule92 = { category: 2097152, unicodeCat: NUMCAT_MN, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule93 = { category: 2097152, unicodeCat: NUMCAT_MN, possible: 1, updist: 84, lowdist: 0, titledist: 84 };
var rule119 = { category: 4194304, unicodeCat: NUMCAT_ME, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule124 = { category: 8388608, unicodeCat: NUMCAT_MC, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var nullrule = { category: 512, unicodeCat: NUMCAT_CN, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule104 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 8, titledist: 0 };
var rule107 = { category: 512, unicodeCat: NUMCAT_LU, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule115 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -60, titledist: 0 };
var rule117 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -7, titledist: 0 };
var rule118 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 80, titledist: 0 };
var rule120 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 15, titledist: 0 };
var rule122 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 48, titledist: 0 };
var rule125 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 7264, titledist: 0 };
var rule127 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 38864, titledist: 0 };
var rule137 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -3008, titledist: 0 };
var rule142 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -7615, titledist: 0 };
var rule144 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -8, titledist: 0 };
var rule153 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -74, titledist: 0 };
var rule156 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -86, titledist: 0 };
var rule157 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -100, titledist: 0 };
var rule158 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -112, titledist: 0 };
var rule159 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -128, titledist: 0 };
var rule160 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -126, titledist: 0 };
var rule163 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -7517, titledist: 0 };
var rule164 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -8383, titledist: 0 };
var rule165 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -8262, titledist: 0 };
var rule166 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 28, titledist: 0 };
var rule172 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -10743, titledist: 0 };
var rule173 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -3814, titledist: 0 };
var rule174 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -10727, titledist: 0 };
var rule177 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -10780, titledist: 0 };
var rule178 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -10749, titledist: 0 };
var rule179 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -10783, titledist: 0 };
var rule180 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -10782, titledist: 0 };
var rule181 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -10815, titledist: 0 };
var rule183 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -35332, titledist: 0 };
var rule184 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -42280, titledist: 0 };
var rule186 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -42308, titledist: 0 };
var rule187 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -42319, titledist: 0 };
var rule188 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -42315, titledist: 0 };
var rule189 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -42305, titledist: 0 };
var rule190 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -42258, titledist: 0 };
var rule191 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -42282, titledist: 0 };
var rule192 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -42261, titledist: 0 };
var rule193 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 928, titledist: 0 };
var rule194 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -48, titledist: 0 };
var rule195 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -42307, titledist: 0 };
var rule196 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -35384, titledist: 0 };
var rule201 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 40, titledist: 0 };
var rule203 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 34, titledist: 0 };
var rule22 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 1, titledist: 0 };
var rule24 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -199, titledist: 0 };
var rule26 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -121, titledist: 0 };
var rule29 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 210, titledist: 0 };
var rule30 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 206, titledist: 0 };
var rule31 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 205, titledist: 0 };
var rule32 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 79, titledist: 0 };
var rule33 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 202, titledist: 0 };
var rule34 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 203, titledist: 0 };
var rule35 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 207, titledist: 0 };
var rule37 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 211, titledist: 0 };
var rule38 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 209, titledist: 0 };
var rule40 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 213, titledist: 0 };
var rule42 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 214, titledist: 0 };
var rule43 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 218, titledist: 0 };
var rule44 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 217, titledist: 0 };
var rule45 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 219, titledist: 0 };
var rule47 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 2, titledist: 1 };
var rule51 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -97, titledist: 0 };
var rule52 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -56, titledist: 0 };
var rule53 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -130, titledist: 0 };
var rule54 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 10795, titledist: 0 };
var rule55 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -163, titledist: 0 };
var rule56 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 10792, titledist: 0 };
var rule58 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: -195, titledist: 0 };
var rule59 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 69, titledist: 0 };
var rule60 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 71, titledist: 0 };
var rule9 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 32, titledist: 0 };
var rule94 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 116, titledist: 0 };
var rule95 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 38, titledist: 0 };
var rule96 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 37, titledist: 0 };
var rule97 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 64, titledist: 0 };
var rule98 = { category: 512, unicodeCat: NUMCAT_LU, possible: 1, updist: 0, lowdist: 63, titledist: 0 };
var rule151 = { category: 524288, unicodeCat: NUMCAT_LT, possible: 1, updist: 0, lowdist: -8, titledist: 0 };
var rule154 = { category: 524288, unicodeCat: NUMCAT_LT, possible: 1, updist: 0, lowdist: -9, titledist: 0 };
var rule48 = { category: 524288, unicodeCat: NUMCAT_LT, possible: 1, updist: -1, lowdist: 1, titledist: 0 };
var rule14 = { category: 16384, unicodeCat: NUMCAT_LO, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule91 = { category: 1048576, unicodeCat: NUMCAT_LM, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule100 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -37, lowdist: 0, titledist: -37 };
var rule101 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -31, lowdist: 0, titledist: -31 };
var rule102 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -64, lowdist: 0, titledist: -64 };
var rule103 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -63, lowdist: 0, titledist: -63 };
var rule105 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -62, lowdist: 0, titledist: -62 };
var rule106 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -57, lowdist: 0, titledist: -57 };
var rule108 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -47, lowdist: 0, titledist: -47 };
var rule109 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -54, lowdist: 0, titledist: -54 };
var rule110 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -8, lowdist: 0, titledist: -8 };
var rule111 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -86, lowdist: 0, titledist: -86 };
var rule112 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -80, lowdist: 0, titledist: -80 };
var rule113 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 7, lowdist: 0, titledist: 7 };
var rule114 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -116, lowdist: 0, titledist: -116 };
var rule116 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -96, lowdist: 0, titledist: -96 };
var rule12 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -32, lowdist: 0, titledist: -32 };
var rule121 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -15, lowdist: 0, titledist: -15 };
var rule123 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -48, lowdist: 0, titledist: -48 };
var rule126 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 3008, lowdist: 0, titledist: 0 };
var rule129 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -6254, lowdist: 0, titledist: -6254 };
var rule130 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -6253, lowdist: 0, titledist: -6253 };
var rule131 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -6244, lowdist: 0, titledist: -6244 };
var rule132 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -6242, lowdist: 0, titledist: -6242 };
var rule133 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -6243, lowdist: 0, titledist: -6243 };
var rule134 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -6236, lowdist: 0, titledist: -6236 };
var rule135 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -6181, lowdist: 0, titledist: -6181 };
var rule136 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 35266, lowdist: 0, titledist: 35266 };
var rule138 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 35332, lowdist: 0, titledist: 35332 };
var rule139 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 3814, lowdist: 0, titledist: 3814 };
var rule140 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 35384, lowdist: 0, titledist: 35384 };
var rule141 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -59, lowdist: 0, titledist: -59 };
var rule143 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 8, lowdist: 0, titledist: 8 };
var rule145 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 74, lowdist: 0, titledist: 74 };
var rule146 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 86, lowdist: 0, titledist: 86 };
var rule147 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 100, lowdist: 0, titledist: 100 };
var rule148 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 128, lowdist: 0, titledist: 128 };
var rule149 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 112, lowdist: 0, titledist: 112 };
var rule150 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 126, lowdist: 0, titledist: 126 };
var rule152 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 9, lowdist: 0, titledist: 9 };
var rule155 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -7205, lowdist: 0, titledist: -7205 };
var rule167 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -28, lowdist: 0, titledist: -28 };
var rule175 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -10795, lowdist: 0, titledist: -10795 };
var rule176 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -10792, lowdist: 0, titledist: -10792 };
var rule18 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 743, lowdist: 0, titledist: 743 };
var rule182 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -7264, lowdist: 0, titledist: -7264 };
var rule185 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 48, lowdist: 0, titledist: 48 };
var rule197 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -928, lowdist: 0, titledist: -928 };
var rule198 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -38864, lowdist: 0, titledist: -38864 };
var rule20 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule202 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -40, lowdist: 0, titledist: -40 };
var rule204 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -34, lowdist: 0, titledist: -34 };
var rule21 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 121, lowdist: 0, titledist: 121 };
var rule23 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -1, lowdist: 0, titledist: -1 };
var rule25 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -232, lowdist: 0, titledist: -232 };
var rule27 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -300, lowdist: 0, titledist: -300 };
var rule28 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 195, lowdist: 0, titledist: 195 };
var rule36 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 97, lowdist: 0, titledist: 97 };
var rule39 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 163, lowdist: 0, titledist: 163 };
var rule41 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 130, lowdist: 0, titledist: 130 };
var rule46 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 56, lowdist: 0, titledist: 56 };
var rule49 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -2, lowdist: 0, titledist: -1 };
var rule50 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -79, lowdist: 0, titledist: -79 };
var rule57 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 10815, lowdist: 0, titledist: 10815 };
var rule61 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 10783, lowdist: 0, titledist: 10783 };
var rule62 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 10780, lowdist: 0, titledist: 10780 };
var rule63 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 10782, lowdist: 0, titledist: 10782 };
var rule64 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -210, lowdist: 0, titledist: -210 };
var rule65 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -206, lowdist: 0, titledist: -206 };
var rule66 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -205, lowdist: 0, titledist: -205 };
var rule67 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -202, lowdist: 0, titledist: -202 };
var rule68 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -203, lowdist: 0, titledist: -203 };
var rule69 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 42319, lowdist: 0, titledist: 42319 };
var rule70 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 42315, lowdist: 0, titledist: 42315 };
var rule71 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -207, lowdist: 0, titledist: -207 };
var rule72 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 42280, lowdist: 0, titledist: 42280 };
var rule73 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 42308, lowdist: 0, titledist: 42308 };
var rule74 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -209, lowdist: 0, titledist: -209 };
var rule75 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -211, lowdist: 0, titledist: -211 };
var rule76 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 10743, lowdist: 0, titledist: 10743 };
var rule77 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 42305, lowdist: 0, titledist: 42305 };
var rule78 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 10749, lowdist: 0, titledist: 10749 };
var rule79 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -213, lowdist: 0, titledist: -213 };
var rule80 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -214, lowdist: 0, titledist: -214 };
var rule81 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 10727, lowdist: 0, titledist: 10727 };
var rule82 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -218, lowdist: 0, titledist: -218 };
var rule83 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 42307, lowdist: 0, titledist: 42307 };
var rule84 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 42282, lowdist: 0, titledist: 42282 };
var rule85 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -69, lowdist: 0, titledist: -69 };
var rule86 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -217, lowdist: 0, titledist: -217 };
var rule87 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -71, lowdist: 0, titledist: -71 };
var rule88 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -219, lowdist: 0, titledist: -219 };
var rule89 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 42261, lowdist: 0, titledist: 42261 };
var rule90 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: 42258, lowdist: 0, titledist: 42258 };
var rule99 = { category: 4096, unicodeCat: NUMCAT_LL, possible: 1, updist: -38, lowdist: 0, titledist: -38 };
var rule199 = { category: 134217728, unicodeCat: NUMCAT_CS, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule200 = { category: 268435456, unicodeCat: NUMCAT_CO, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule16 = { category: 65536, unicodeCat: NUMCAT_CF, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var rule0 = { category: 1, unicodeCat: NUMCAT_CC, possible: 0, updist: 0, lowdist: 0, titledist: 0 };
var bsearch = (a) => (array) => (size2) => (compare) => {
  const go = (go$a0$copy) => (go$a1$copy) => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const i = go$a0, k = go$a1;
      if (i > k || i >= array.length) {
        go$c = false;
        go$r = Nothing;
        continue;
      }
      const j = unsafeClamp(floor(toNumber(i + k | 0) / 2));
      const b = array[j];
      const v = compare(a)(b);
      if (v === "EQ") {
        go$c = false;
        go$r = $Maybe("Just", b);
        continue;
      }
      if (v === "GT") {
        go$a0 = j + 1 | 0;
        go$a1 = k;
        continue;
      }
      go$a0 = i;
      go$a1 = j - 1 | 0;
    }
    return go$r;
  };
  return go(0)(size2);
};
var blkCmp = (v) => (v1) => {
  if (v.start >= v1.start && v.start < (v1.start + v1.length | 0)) {
    return EQ;
  }
  if (v.start > v1.start) {
    return GT;
  }
  return LT;
};
var getRule = (blocks) => (unichar) => (size2) => {
  const maybeCharBlock = bsearch({ start: unichar, length: 1, convRule: nullrule })(blocks)(size2)(blkCmp);
  if (maybeCharBlock.tag === "Nothing") {
    return Nothing;
  }
  if (maybeCharBlock.tag === "Just") {
    return $Maybe("Just", maybeCharBlock._1.convRule);
  }
  fail();
};
var allchars = [
  { start: 0, length: 32, convRule: rule0 },
  { start: 32, length: 1, convRule: rule1 },
  { start: 33, length: 3, convRule: rule2 },
  { start: 36, length: 1, convRule: rule3 },
  { start: 37, length: 3, convRule: rule2 },
  { start: 40, length: 1, convRule: rule4 },
  { start: 41, length: 1, convRule: rule5 },
  { start: 42, length: 1, convRule: rule2 },
  { start: 43, length: 1, convRule: rule6 },
  { start: 44, length: 1, convRule: rule2 },
  { start: 45, length: 1, convRule: rule7 },
  { start: 46, length: 2, convRule: rule2 },
  { start: 48, length: 10, convRule: rule8 },
  { start: 58, length: 2, convRule: rule2 },
  { start: 60, length: 3, convRule: rule6 },
  { start: 63, length: 2, convRule: rule2 },
  { start: 65, length: 26, convRule: rule9 },
  { start: 91, length: 1, convRule: rule4 },
  { start: 92, length: 1, convRule: rule2 },
  { start: 93, length: 1, convRule: rule5 },
  { start: 94, length: 1, convRule: rule10 },
  { start: 95, length: 1, convRule: rule11 },
  { start: 96, length: 1, convRule: rule10 },
  { start: 97, length: 26, convRule: rule12 },
  { start: 123, length: 1, convRule: rule4 },
  { start: 124, length: 1, convRule: rule6 },
  { start: 125, length: 1, convRule: rule5 },
  { start: 126, length: 1, convRule: rule6 },
  { start: 127, length: 33, convRule: rule0 },
  { start: 160, length: 1, convRule: rule1 },
  { start: 161, length: 1, convRule: rule2 },
  { start: 162, length: 4, convRule: rule3 },
  { start: 166, length: 1, convRule: rule13 },
  { start: 167, length: 1, convRule: rule2 },
  { start: 168, length: 1, convRule: rule10 },
  { start: 169, length: 1, convRule: rule13 },
  { start: 170, length: 1, convRule: rule14 },
  { start: 171, length: 1, convRule: rule15 },
  { start: 172, length: 1, convRule: rule6 },
  { start: 173, length: 1, convRule: rule16 },
  { start: 174, length: 1, convRule: rule13 },
  { start: 175, length: 1, convRule: rule10 },
  { start: 176, length: 1, convRule: rule13 },
  { start: 177, length: 1, convRule: rule6 },
  { start: 178, length: 2, convRule: rule17 },
  { start: 180, length: 1, convRule: rule10 },
  { start: 181, length: 1, convRule: rule18 },
  { start: 182, length: 2, convRule: rule2 },
  { start: 184, length: 1, convRule: rule10 },
  { start: 185, length: 1, convRule: rule17 },
  { start: 186, length: 1, convRule: rule14 },
  { start: 187, length: 1, convRule: rule19 },
  { start: 188, length: 3, convRule: rule17 },
  { start: 191, length: 1, convRule: rule2 },
  { start: 192, length: 23, convRule: rule9 },
  { start: 215, length: 1, convRule: rule6 },
  { start: 216, length: 7, convRule: rule9 },
  { start: 223, length: 1, convRule: rule20 },
  { start: 224, length: 23, convRule: rule12 },
  { start: 247, length: 1, convRule: rule6 },
  { start: 248, length: 7, convRule: rule12 },
  { start: 255, length: 1, convRule: rule21 },
  { start: 256, length: 1, convRule: rule22 },
  { start: 257, length: 1, convRule: rule23 },
  { start: 258, length: 1, convRule: rule22 },
  { start: 259, length: 1, convRule: rule23 },
  { start: 260, length: 1, convRule: rule22 },
  { start: 261, length: 1, convRule: rule23 },
  { start: 262, length: 1, convRule: rule22 },
  { start: 263, length: 1, convRule: rule23 },
  { start: 264, length: 1, convRule: rule22 },
  { start: 265, length: 1, convRule: rule23 },
  { start: 266, length: 1, convRule: rule22 },
  { start: 267, length: 1, convRule: rule23 },
  { start: 268, length: 1, convRule: rule22 },
  { start: 269, length: 1, convRule: rule23 },
  { start: 270, length: 1, convRule: rule22 },
  { start: 271, length: 1, convRule: rule23 },
  { start: 272, length: 1, convRule: rule22 },
  { start: 273, length: 1, convRule: rule23 },
  { start: 274, length: 1, convRule: rule22 },
  { start: 275, length: 1, convRule: rule23 },
  { start: 276, length: 1, convRule: rule22 },
  { start: 277, length: 1, convRule: rule23 },
  { start: 278, length: 1, convRule: rule22 },
  { start: 279, length: 1, convRule: rule23 },
  { start: 280, length: 1, convRule: rule22 },
  { start: 281, length: 1, convRule: rule23 },
  { start: 282, length: 1, convRule: rule22 },
  { start: 283, length: 1, convRule: rule23 },
  { start: 284, length: 1, convRule: rule22 },
  { start: 285, length: 1, convRule: rule23 },
  { start: 286, length: 1, convRule: rule22 },
  { start: 287, length: 1, convRule: rule23 },
  { start: 288, length: 1, convRule: rule22 },
  { start: 289, length: 1, convRule: rule23 },
  { start: 290, length: 1, convRule: rule22 },
  { start: 291, length: 1, convRule: rule23 },
  { start: 292, length: 1, convRule: rule22 },
  { start: 293, length: 1, convRule: rule23 },
  { start: 294, length: 1, convRule: rule22 },
  { start: 295, length: 1, convRule: rule23 },
  { start: 296, length: 1, convRule: rule22 },
  { start: 297, length: 1, convRule: rule23 },
  { start: 298, length: 1, convRule: rule22 },
  { start: 299, length: 1, convRule: rule23 },
  { start: 300, length: 1, convRule: rule22 },
  { start: 301, length: 1, convRule: rule23 },
  { start: 302, length: 1, convRule: rule22 },
  { start: 303, length: 1, convRule: rule23 },
  { start: 304, length: 1, convRule: rule24 },
  { start: 305, length: 1, convRule: rule25 },
  { start: 306, length: 1, convRule: rule22 },
  { start: 307, length: 1, convRule: rule23 },
  { start: 308, length: 1, convRule: rule22 },
  { start: 309, length: 1, convRule: rule23 },
  { start: 310, length: 1, convRule: rule22 },
  { start: 311, length: 1, convRule: rule23 },
  { start: 312, length: 1, convRule: rule20 },
  { start: 313, length: 1, convRule: rule22 },
  { start: 314, length: 1, convRule: rule23 },
  { start: 315, length: 1, convRule: rule22 },
  { start: 316, length: 1, convRule: rule23 },
  { start: 317, length: 1, convRule: rule22 },
  { start: 318, length: 1, convRule: rule23 },
  { start: 319, length: 1, convRule: rule22 },
  { start: 320, length: 1, convRule: rule23 },
  { start: 321, length: 1, convRule: rule22 },
  { start: 322, length: 1, convRule: rule23 },
  { start: 323, length: 1, convRule: rule22 },
  { start: 324, length: 1, convRule: rule23 },
  { start: 325, length: 1, convRule: rule22 },
  { start: 326, length: 1, convRule: rule23 },
  { start: 327, length: 1, convRule: rule22 },
  { start: 328, length: 1, convRule: rule23 },
  { start: 329, length: 1, convRule: rule20 },
  { start: 330, length: 1, convRule: rule22 },
  { start: 331, length: 1, convRule: rule23 },
  { start: 332, length: 1, convRule: rule22 },
  { start: 333, length: 1, convRule: rule23 },
  { start: 334, length: 1, convRule: rule22 },
  { start: 335, length: 1, convRule: rule23 },
  { start: 336, length: 1, convRule: rule22 },
  { start: 337, length: 1, convRule: rule23 },
  { start: 338, length: 1, convRule: rule22 },
  { start: 339, length: 1, convRule: rule23 },
  { start: 340, length: 1, convRule: rule22 },
  { start: 341, length: 1, convRule: rule23 },
  { start: 342, length: 1, convRule: rule22 },
  { start: 343, length: 1, convRule: rule23 },
  { start: 344, length: 1, convRule: rule22 },
  { start: 345, length: 1, convRule: rule23 },
  { start: 346, length: 1, convRule: rule22 },
  { start: 347, length: 1, convRule: rule23 },
  { start: 348, length: 1, convRule: rule22 },
  { start: 349, length: 1, convRule: rule23 },
  { start: 350, length: 1, convRule: rule22 },
  { start: 351, length: 1, convRule: rule23 },
  { start: 352, length: 1, convRule: rule22 },
  { start: 353, length: 1, convRule: rule23 },
  { start: 354, length: 1, convRule: rule22 },
  { start: 355, length: 1, convRule: rule23 },
  { start: 356, length: 1, convRule: rule22 },
  { start: 357, length: 1, convRule: rule23 },
  { start: 358, length: 1, convRule: rule22 },
  { start: 359, length: 1, convRule: rule23 },
  { start: 360, length: 1, convRule: rule22 },
  { start: 361, length: 1, convRule: rule23 },
  { start: 362, length: 1, convRule: rule22 },
  { start: 363, length: 1, convRule: rule23 },
  { start: 364, length: 1, convRule: rule22 },
  { start: 365, length: 1, convRule: rule23 },
  { start: 366, length: 1, convRule: rule22 },
  { start: 367, length: 1, convRule: rule23 },
  { start: 368, length: 1, convRule: rule22 },
  { start: 369, length: 1, convRule: rule23 },
  { start: 370, length: 1, convRule: rule22 },
  { start: 371, length: 1, convRule: rule23 },
  { start: 372, length: 1, convRule: rule22 },
  { start: 373, length: 1, convRule: rule23 },
  { start: 374, length: 1, convRule: rule22 },
  { start: 375, length: 1, convRule: rule23 },
  { start: 376, length: 1, convRule: rule26 },
  { start: 377, length: 1, convRule: rule22 },
  { start: 378, length: 1, convRule: rule23 },
  { start: 379, length: 1, convRule: rule22 },
  { start: 380, length: 1, convRule: rule23 },
  { start: 381, length: 1, convRule: rule22 },
  { start: 382, length: 1, convRule: rule23 },
  { start: 383, length: 1, convRule: rule27 },
  { start: 384, length: 1, convRule: rule28 },
  { start: 385, length: 1, convRule: rule29 },
  { start: 386, length: 1, convRule: rule22 },
  { start: 387, length: 1, convRule: rule23 },
  { start: 388, length: 1, convRule: rule22 },
  { start: 389, length: 1, convRule: rule23 },
  { start: 390, length: 1, convRule: rule30 },
  { start: 391, length: 1, convRule: rule22 },
  { start: 392, length: 1, convRule: rule23 },
  { start: 393, length: 2, convRule: rule31 },
  { start: 395, length: 1, convRule: rule22 },
  { start: 396, length: 1, convRule: rule23 },
  { start: 397, length: 1, convRule: rule20 },
  { start: 398, length: 1, convRule: rule32 },
  { start: 399, length: 1, convRule: rule33 },
  { start: 400, length: 1, convRule: rule34 },
  { start: 401, length: 1, convRule: rule22 },
  { start: 402, length: 1, convRule: rule23 },
  { start: 403, length: 1, convRule: rule31 },
  { start: 404, length: 1, convRule: rule35 },
  { start: 405, length: 1, convRule: rule36 },
  { start: 406, length: 1, convRule: rule37 },
  { start: 407, length: 1, convRule: rule38 },
  { start: 408, length: 1, convRule: rule22 },
  { start: 409, length: 1, convRule: rule23 },
  { start: 410, length: 1, convRule: rule39 },
  { start: 411, length: 1, convRule: rule20 },
  { start: 412, length: 1, convRule: rule37 },
  { start: 413, length: 1, convRule: rule40 },
  { start: 414, length: 1, convRule: rule41 },
  { start: 415, length: 1, convRule: rule42 },
  { start: 416, length: 1, convRule: rule22 },
  { start: 417, length: 1, convRule: rule23 },
  { start: 418, length: 1, convRule: rule22 },
  { start: 419, length: 1, convRule: rule23 },
  { start: 420, length: 1, convRule: rule22 },
  { start: 421, length: 1, convRule: rule23 },
  { start: 422, length: 1, convRule: rule43 },
  { start: 423, length: 1, convRule: rule22 },
  { start: 424, length: 1, convRule: rule23 },
  { start: 425, length: 1, convRule: rule43 },
  { start: 426, length: 2, convRule: rule20 },
  { start: 428, length: 1, convRule: rule22 },
  { start: 429, length: 1, convRule: rule23 },
  { start: 430, length: 1, convRule: rule43 },
  { start: 431, length: 1, convRule: rule22 },
  { start: 432, length: 1, convRule: rule23 },
  { start: 433, length: 2, convRule: rule44 },
  { start: 435, length: 1, convRule: rule22 },
  { start: 436, length: 1, convRule: rule23 },
  { start: 437, length: 1, convRule: rule22 },
  { start: 438, length: 1, convRule: rule23 },
  { start: 439, length: 1, convRule: rule45 },
  { start: 440, length: 1, convRule: rule22 },
  { start: 441, length: 1, convRule: rule23 },
  { start: 442, length: 1, convRule: rule20 },
  { start: 443, length: 1, convRule: rule14 },
  { start: 444, length: 1, convRule: rule22 },
  { start: 445, length: 1, convRule: rule23 },
  { start: 446, length: 1, convRule: rule20 },
  { start: 447, length: 1, convRule: rule46 },
  { start: 448, length: 4, convRule: rule14 },
  { start: 452, length: 1, convRule: rule47 },
  { start: 453, length: 1, convRule: rule48 },
  { start: 454, length: 1, convRule: rule49 },
  { start: 455, length: 1, convRule: rule47 },
  { start: 456, length: 1, convRule: rule48 },
  { start: 457, length: 1, convRule: rule49 },
  { start: 458, length: 1, convRule: rule47 },
  { start: 459, length: 1, convRule: rule48 },
  { start: 460, length: 1, convRule: rule49 },
  { start: 461, length: 1, convRule: rule22 },
  { start: 462, length: 1, convRule: rule23 },
  { start: 463, length: 1, convRule: rule22 },
  { start: 464, length: 1, convRule: rule23 },
  { start: 465, length: 1, convRule: rule22 },
  { start: 466, length: 1, convRule: rule23 },
  { start: 467, length: 1, convRule: rule22 },
  { start: 468, length: 1, convRule: rule23 },
  { start: 469, length: 1, convRule: rule22 },
  { start: 470, length: 1, convRule: rule23 },
  { start: 471, length: 1, convRule: rule22 },
  { start: 472, length: 1, convRule: rule23 },
  { start: 473, length: 1, convRule: rule22 },
  { start: 474, length: 1, convRule: rule23 },
  { start: 475, length: 1, convRule: rule22 },
  { start: 476, length: 1, convRule: rule23 },
  { start: 477, length: 1, convRule: rule50 },
  { start: 478, length: 1, convRule: rule22 },
  { start: 479, length: 1, convRule: rule23 },
  { start: 480, length: 1, convRule: rule22 },
  { start: 481, length: 1, convRule: rule23 },
  { start: 482, length: 1, convRule: rule22 },
  { start: 483, length: 1, convRule: rule23 },
  { start: 484, length: 1, convRule: rule22 },
  { start: 485, length: 1, convRule: rule23 },
  { start: 486, length: 1, convRule: rule22 },
  { start: 487, length: 1, convRule: rule23 },
  { start: 488, length: 1, convRule: rule22 },
  { start: 489, length: 1, convRule: rule23 },
  { start: 490, length: 1, convRule: rule22 },
  { start: 491, length: 1, convRule: rule23 },
  { start: 492, length: 1, convRule: rule22 },
  { start: 493, length: 1, convRule: rule23 },
  { start: 494, length: 1, convRule: rule22 },
  { start: 495, length: 1, convRule: rule23 },
  { start: 496, length: 1, convRule: rule20 },
  { start: 497, length: 1, convRule: rule47 },
  { start: 498, length: 1, convRule: rule48 },
  { start: 499, length: 1, convRule: rule49 },
  { start: 500, length: 1, convRule: rule22 },
  { start: 501, length: 1, convRule: rule23 },
  { start: 502, length: 1, convRule: rule51 },
  { start: 503, length: 1, convRule: rule52 },
  { start: 504, length: 1, convRule: rule22 },
  { start: 505, length: 1, convRule: rule23 },
  { start: 506, length: 1, convRule: rule22 },
  { start: 507, length: 1, convRule: rule23 },
  { start: 508, length: 1, convRule: rule22 },
  { start: 509, length: 1, convRule: rule23 },
  { start: 510, length: 1, convRule: rule22 },
  { start: 511, length: 1, convRule: rule23 },
  { start: 512, length: 1, convRule: rule22 },
  { start: 513, length: 1, convRule: rule23 },
  { start: 514, length: 1, convRule: rule22 },
  { start: 515, length: 1, convRule: rule23 },
  { start: 516, length: 1, convRule: rule22 },
  { start: 517, length: 1, convRule: rule23 },
  { start: 518, length: 1, convRule: rule22 },
  { start: 519, length: 1, convRule: rule23 },
  { start: 520, length: 1, convRule: rule22 },
  { start: 521, length: 1, convRule: rule23 },
  { start: 522, length: 1, convRule: rule22 },
  { start: 523, length: 1, convRule: rule23 },
  { start: 524, length: 1, convRule: rule22 },
  { start: 525, length: 1, convRule: rule23 },
  { start: 526, length: 1, convRule: rule22 },
  { start: 527, length: 1, convRule: rule23 },
  { start: 528, length: 1, convRule: rule22 },
  { start: 529, length: 1, convRule: rule23 },
  { start: 530, length: 1, convRule: rule22 },
  { start: 531, length: 1, convRule: rule23 },
  { start: 532, length: 1, convRule: rule22 },
  { start: 533, length: 1, convRule: rule23 },
  { start: 534, length: 1, convRule: rule22 },
  { start: 535, length: 1, convRule: rule23 },
  { start: 536, length: 1, convRule: rule22 },
  { start: 537, length: 1, convRule: rule23 },
  { start: 538, length: 1, convRule: rule22 },
  { start: 539, length: 1, convRule: rule23 },
  { start: 540, length: 1, convRule: rule22 },
  { start: 541, length: 1, convRule: rule23 },
  { start: 542, length: 1, convRule: rule22 },
  { start: 543, length: 1, convRule: rule23 },
  { start: 544, length: 1, convRule: rule53 },
  { start: 545, length: 1, convRule: rule20 },
  { start: 546, length: 1, convRule: rule22 },
  { start: 547, length: 1, convRule: rule23 },
  { start: 548, length: 1, convRule: rule22 },
  { start: 549, length: 1, convRule: rule23 },
  { start: 550, length: 1, convRule: rule22 },
  { start: 551, length: 1, convRule: rule23 },
  { start: 552, length: 1, convRule: rule22 },
  { start: 553, length: 1, convRule: rule23 },
  { start: 554, length: 1, convRule: rule22 },
  { start: 555, length: 1, convRule: rule23 },
  { start: 556, length: 1, convRule: rule22 },
  { start: 557, length: 1, convRule: rule23 },
  { start: 558, length: 1, convRule: rule22 },
  { start: 559, length: 1, convRule: rule23 },
  { start: 560, length: 1, convRule: rule22 },
  { start: 561, length: 1, convRule: rule23 },
  { start: 562, length: 1, convRule: rule22 },
  { start: 563, length: 1, convRule: rule23 },
  { start: 564, length: 6, convRule: rule20 },
  { start: 570, length: 1, convRule: rule54 },
  { start: 571, length: 1, convRule: rule22 },
  { start: 572, length: 1, convRule: rule23 },
  { start: 573, length: 1, convRule: rule55 },
  { start: 574, length: 1, convRule: rule56 },
  { start: 575, length: 2, convRule: rule57 },
  { start: 577, length: 1, convRule: rule22 },
  { start: 578, length: 1, convRule: rule23 },
  { start: 579, length: 1, convRule: rule58 },
  { start: 580, length: 1, convRule: rule59 },
  { start: 581, length: 1, convRule: rule60 },
  { start: 582, length: 1, convRule: rule22 },
  { start: 583, length: 1, convRule: rule23 },
  { start: 584, length: 1, convRule: rule22 },
  { start: 585, length: 1, convRule: rule23 },
  { start: 586, length: 1, convRule: rule22 },
  { start: 587, length: 1, convRule: rule23 },
  { start: 588, length: 1, convRule: rule22 },
  { start: 589, length: 1, convRule: rule23 },
  { start: 590, length: 1, convRule: rule22 },
  { start: 591, length: 1, convRule: rule23 },
  { start: 592, length: 1, convRule: rule61 },
  { start: 593, length: 1, convRule: rule62 },
  { start: 594, length: 1, convRule: rule63 },
  { start: 595, length: 1, convRule: rule64 },
  { start: 596, length: 1, convRule: rule65 },
  { start: 597, length: 1, convRule: rule20 },
  { start: 598, length: 2, convRule: rule66 },
  { start: 600, length: 1, convRule: rule20 },
  { start: 601, length: 1, convRule: rule67 },
  { start: 602, length: 1, convRule: rule20 },
  { start: 603, length: 1, convRule: rule68 },
  { start: 604, length: 1, convRule: rule69 },
  { start: 605, length: 3, convRule: rule20 },
  { start: 608, length: 1, convRule: rule66 },
  { start: 609, length: 1, convRule: rule70 },
  { start: 610, length: 1, convRule: rule20 },
  { start: 611, length: 1, convRule: rule71 },
  { start: 612, length: 1, convRule: rule20 },
  { start: 613, length: 1, convRule: rule72 },
  { start: 614, length: 1, convRule: rule73 },
  { start: 615, length: 1, convRule: rule20 },
  { start: 616, length: 1, convRule: rule74 },
  { start: 617, length: 1, convRule: rule75 },
  { start: 618, length: 1, convRule: rule73 },
  { start: 619, length: 1, convRule: rule76 },
  { start: 620, length: 1, convRule: rule77 },
  { start: 621, length: 2, convRule: rule20 },
  { start: 623, length: 1, convRule: rule75 },
  { start: 624, length: 1, convRule: rule20 },
  { start: 625, length: 1, convRule: rule78 },
  { start: 626, length: 1, convRule: rule79 },
  { start: 627, length: 2, convRule: rule20 },
  { start: 629, length: 1, convRule: rule80 },
  { start: 630, length: 7, convRule: rule20 },
  { start: 637, length: 1, convRule: rule81 },
  { start: 638, length: 2, convRule: rule20 },
  { start: 640, length: 1, convRule: rule82 },
  { start: 641, length: 1, convRule: rule20 },
  { start: 642, length: 1, convRule: rule83 },
  { start: 643, length: 1, convRule: rule82 },
  { start: 644, length: 3, convRule: rule20 },
  { start: 647, length: 1, convRule: rule84 },
  { start: 648, length: 1, convRule: rule82 },
  { start: 649, length: 1, convRule: rule85 },
  { start: 650, length: 2, convRule: rule86 },
  { start: 652, length: 1, convRule: rule87 },
  { start: 653, length: 5, convRule: rule20 },
  { start: 658, length: 1, convRule: rule88 },
  { start: 659, length: 1, convRule: rule20 },
  { start: 660, length: 1, convRule: rule14 },
  { start: 661, length: 8, convRule: rule20 },
  { start: 669, length: 1, convRule: rule89 },
  { start: 670, length: 1, convRule: rule90 },
  { start: 671, length: 17, convRule: rule20 },
  { start: 688, length: 18, convRule: rule91 },
  { start: 706, length: 4, convRule: rule10 },
  { start: 710, length: 12, convRule: rule91 },
  { start: 722, length: 14, convRule: rule10 },
  { start: 736, length: 5, convRule: rule91 },
  { start: 741, length: 7, convRule: rule10 },
  { start: 748, length: 1, convRule: rule91 },
  { start: 749, length: 1, convRule: rule10 },
  { start: 750, length: 1, convRule: rule91 },
  { start: 751, length: 17, convRule: rule10 },
  { start: 768, length: 69, convRule: rule92 },
  { start: 837, length: 1, convRule: rule93 },
  { start: 838, length: 42, convRule: rule92 },
  { start: 880, length: 1, convRule: rule22 },
  { start: 881, length: 1, convRule: rule23 },
  { start: 882, length: 1, convRule: rule22 },
  { start: 883, length: 1, convRule: rule23 },
  { start: 884, length: 1, convRule: rule91 },
  { start: 885, length: 1, convRule: rule10 },
  { start: 886, length: 1, convRule: rule22 },
  { start: 887, length: 1, convRule: rule23 },
  { start: 890, length: 1, convRule: rule91 },
  { start: 891, length: 3, convRule: rule41 },
  { start: 894, length: 1, convRule: rule2 },
  { start: 895, length: 1, convRule: rule94 },
  { start: 900, length: 2, convRule: rule10 },
  { start: 902, length: 1, convRule: rule95 },
  { start: 903, length: 1, convRule: rule2 },
  { start: 904, length: 3, convRule: rule96 },
  { start: 908, length: 1, convRule: rule97 },
  { start: 910, length: 2, convRule: rule98 },
  { start: 912, length: 1, convRule: rule20 },
  { start: 913, length: 17, convRule: rule9 },
  { start: 931, length: 9, convRule: rule9 },
  { start: 940, length: 1, convRule: rule99 },
  { start: 941, length: 3, convRule: rule100 },
  { start: 944, length: 1, convRule: rule20 },
  { start: 945, length: 17, convRule: rule12 },
  { start: 962, length: 1, convRule: rule101 },
  { start: 963, length: 9, convRule: rule12 },
  { start: 972, length: 1, convRule: rule102 },
  { start: 973, length: 2, convRule: rule103 },
  { start: 975, length: 1, convRule: rule104 },
  { start: 976, length: 1, convRule: rule105 },
  { start: 977, length: 1, convRule: rule106 },
  { start: 978, length: 3, convRule: rule107 },
  { start: 981, length: 1, convRule: rule108 },
  { start: 982, length: 1, convRule: rule109 },
  { start: 983, length: 1, convRule: rule110 },
  { start: 984, length: 1, convRule: rule22 },
  { start: 985, length: 1, convRule: rule23 },
  { start: 986, length: 1, convRule: rule22 },
  { start: 987, length: 1, convRule: rule23 },
  { start: 988, length: 1, convRule: rule22 },
  { start: 989, length: 1, convRule: rule23 },
  { start: 990, length: 1, convRule: rule22 },
  { start: 991, length: 1, convRule: rule23 },
  { start: 992, length: 1, convRule: rule22 },
  { start: 993, length: 1, convRule: rule23 },
  { start: 994, length: 1, convRule: rule22 },
  { start: 995, length: 1, convRule: rule23 },
  { start: 996, length: 1, convRule: rule22 },
  { start: 997, length: 1, convRule: rule23 },
  { start: 998, length: 1, convRule: rule22 },
  { start: 999, length: 1, convRule: rule23 },
  { start: 1e3, length: 1, convRule: rule22 },
  { start: 1001, length: 1, convRule: rule23 },
  { start: 1002, length: 1, convRule: rule22 },
  { start: 1003, length: 1, convRule: rule23 },
  { start: 1004, length: 1, convRule: rule22 },
  { start: 1005, length: 1, convRule: rule23 },
  { start: 1006, length: 1, convRule: rule22 },
  { start: 1007, length: 1, convRule: rule23 },
  { start: 1008, length: 1, convRule: rule111 },
  { start: 1009, length: 1, convRule: rule112 },
  { start: 1010, length: 1, convRule: rule113 },
  { start: 1011, length: 1, convRule: rule114 },
  { start: 1012, length: 1, convRule: rule115 },
  { start: 1013, length: 1, convRule: rule116 },
  { start: 1014, length: 1, convRule: rule6 },
  { start: 1015, length: 1, convRule: rule22 },
  { start: 1016, length: 1, convRule: rule23 },
  { start: 1017, length: 1, convRule: rule117 },
  { start: 1018, length: 1, convRule: rule22 },
  { start: 1019, length: 1, convRule: rule23 },
  { start: 1020, length: 1, convRule: rule20 },
  { start: 1021, length: 3, convRule: rule53 },
  { start: 1024, length: 16, convRule: rule118 },
  { start: 1040, length: 32, convRule: rule9 },
  { start: 1072, length: 32, convRule: rule12 },
  { start: 1104, length: 16, convRule: rule112 },
  { start: 1120, length: 1, convRule: rule22 },
  { start: 1121, length: 1, convRule: rule23 },
  { start: 1122, length: 1, convRule: rule22 },
  { start: 1123, length: 1, convRule: rule23 },
  { start: 1124, length: 1, convRule: rule22 },
  { start: 1125, length: 1, convRule: rule23 },
  { start: 1126, length: 1, convRule: rule22 },
  { start: 1127, length: 1, convRule: rule23 },
  { start: 1128, length: 1, convRule: rule22 },
  { start: 1129, length: 1, convRule: rule23 },
  { start: 1130, length: 1, convRule: rule22 },
  { start: 1131, length: 1, convRule: rule23 },
  { start: 1132, length: 1, convRule: rule22 },
  { start: 1133, length: 1, convRule: rule23 },
  { start: 1134, length: 1, convRule: rule22 },
  { start: 1135, length: 1, convRule: rule23 },
  { start: 1136, length: 1, convRule: rule22 },
  { start: 1137, length: 1, convRule: rule23 },
  { start: 1138, length: 1, convRule: rule22 },
  { start: 1139, length: 1, convRule: rule23 },
  { start: 1140, length: 1, convRule: rule22 },
  { start: 1141, length: 1, convRule: rule23 },
  { start: 1142, length: 1, convRule: rule22 },
  { start: 1143, length: 1, convRule: rule23 },
  { start: 1144, length: 1, convRule: rule22 },
  { start: 1145, length: 1, convRule: rule23 },
  { start: 1146, length: 1, convRule: rule22 },
  { start: 1147, length: 1, convRule: rule23 },
  { start: 1148, length: 1, convRule: rule22 },
  { start: 1149, length: 1, convRule: rule23 },
  { start: 1150, length: 1, convRule: rule22 },
  { start: 1151, length: 1, convRule: rule23 },
  { start: 1152, length: 1, convRule: rule22 },
  { start: 1153, length: 1, convRule: rule23 },
  { start: 1154, length: 1, convRule: rule13 },
  { start: 1155, length: 5, convRule: rule92 },
  { start: 1160, length: 2, convRule: rule119 },
  { start: 1162, length: 1, convRule: rule22 },
  { start: 1163, length: 1, convRule: rule23 },
  { start: 1164, length: 1, convRule: rule22 },
  { start: 1165, length: 1, convRule: rule23 },
  { start: 1166, length: 1, convRule: rule22 },
  { start: 1167, length: 1, convRule: rule23 },
  { start: 1168, length: 1, convRule: rule22 },
  { start: 1169, length: 1, convRule: rule23 },
  { start: 1170, length: 1, convRule: rule22 },
  { start: 1171, length: 1, convRule: rule23 },
  { start: 1172, length: 1, convRule: rule22 },
  { start: 1173, length: 1, convRule: rule23 },
  { start: 1174, length: 1, convRule: rule22 },
  { start: 1175, length: 1, convRule: rule23 },
  { start: 1176, length: 1, convRule: rule22 },
  { start: 1177, length: 1, convRule: rule23 },
  { start: 1178, length: 1, convRule: rule22 },
  { start: 1179, length: 1, convRule: rule23 },
  { start: 1180, length: 1, convRule: rule22 },
  { start: 1181, length: 1, convRule: rule23 },
  { start: 1182, length: 1, convRule: rule22 },
  { start: 1183, length: 1, convRule: rule23 },
  { start: 1184, length: 1, convRule: rule22 },
  { start: 1185, length: 1, convRule: rule23 },
  { start: 1186, length: 1, convRule: rule22 },
  { start: 1187, length: 1, convRule: rule23 },
  { start: 1188, length: 1, convRule: rule22 },
  { start: 1189, length: 1, convRule: rule23 },
  { start: 1190, length: 1, convRule: rule22 },
  { start: 1191, length: 1, convRule: rule23 },
  { start: 1192, length: 1, convRule: rule22 },
  { start: 1193, length: 1, convRule: rule23 },
  { start: 1194, length: 1, convRule: rule22 },
  { start: 1195, length: 1, convRule: rule23 },
  { start: 1196, length: 1, convRule: rule22 },
  { start: 1197, length: 1, convRule: rule23 },
  { start: 1198, length: 1, convRule: rule22 },
  { start: 1199, length: 1, convRule: rule23 },
  { start: 1200, length: 1, convRule: rule22 },
  { start: 1201, length: 1, convRule: rule23 },
  { start: 1202, length: 1, convRule: rule22 },
  { start: 1203, length: 1, convRule: rule23 },
  { start: 1204, length: 1, convRule: rule22 },
  { start: 1205, length: 1, convRule: rule23 },
  { start: 1206, length: 1, convRule: rule22 },
  { start: 1207, length: 1, convRule: rule23 },
  { start: 1208, length: 1, convRule: rule22 },
  { start: 1209, length: 1, convRule: rule23 },
  { start: 1210, length: 1, convRule: rule22 },
  { start: 1211, length: 1, convRule: rule23 },
  { start: 1212, length: 1, convRule: rule22 },
  { start: 1213, length: 1, convRule: rule23 },
  { start: 1214, length: 1, convRule: rule22 },
  { start: 1215, length: 1, convRule: rule23 },
  { start: 1216, length: 1, convRule: rule120 },
  { start: 1217, length: 1, convRule: rule22 },
  { start: 1218, length: 1, convRule: rule23 },
  { start: 1219, length: 1, convRule: rule22 },
  { start: 1220, length: 1, convRule: rule23 },
  { start: 1221, length: 1, convRule: rule22 },
  { start: 1222, length: 1, convRule: rule23 },
  { start: 1223, length: 1, convRule: rule22 },
  { start: 1224, length: 1, convRule: rule23 },
  { start: 1225, length: 1, convRule: rule22 },
  { start: 1226, length: 1, convRule: rule23 },
  { start: 1227, length: 1, convRule: rule22 },
  { start: 1228, length: 1, convRule: rule23 },
  { start: 1229, length: 1, convRule: rule22 },
  { start: 1230, length: 1, convRule: rule23 },
  { start: 1231, length: 1, convRule: rule121 },
  { start: 1232, length: 1, convRule: rule22 },
  { start: 1233, length: 1, convRule: rule23 },
  { start: 1234, length: 1, convRule: rule22 },
  { start: 1235, length: 1, convRule: rule23 },
  { start: 1236, length: 1, convRule: rule22 },
  { start: 1237, length: 1, convRule: rule23 },
  { start: 1238, length: 1, convRule: rule22 },
  { start: 1239, length: 1, convRule: rule23 },
  { start: 1240, length: 1, convRule: rule22 },
  { start: 1241, length: 1, convRule: rule23 },
  { start: 1242, length: 1, convRule: rule22 },
  { start: 1243, length: 1, convRule: rule23 },
  { start: 1244, length: 1, convRule: rule22 },
  { start: 1245, length: 1, convRule: rule23 },
  { start: 1246, length: 1, convRule: rule22 },
  { start: 1247, length: 1, convRule: rule23 },
  { start: 1248, length: 1, convRule: rule22 },
  { start: 1249, length: 1, convRule: rule23 },
  { start: 1250, length: 1, convRule: rule22 },
  { start: 1251, length: 1, convRule: rule23 },
  { start: 1252, length: 1, convRule: rule22 },
  { start: 1253, length: 1, convRule: rule23 },
  { start: 1254, length: 1, convRule: rule22 },
  { start: 1255, length: 1, convRule: rule23 },
  { start: 1256, length: 1, convRule: rule22 },
  { start: 1257, length: 1, convRule: rule23 },
  { start: 1258, length: 1, convRule: rule22 },
  { start: 1259, length: 1, convRule: rule23 },
  { start: 1260, length: 1, convRule: rule22 },
  { start: 1261, length: 1, convRule: rule23 },
  { start: 1262, length: 1, convRule: rule22 },
  { start: 1263, length: 1, convRule: rule23 },
  { start: 1264, length: 1, convRule: rule22 },
  { start: 1265, length: 1, convRule: rule23 },
  { start: 1266, length: 1, convRule: rule22 },
  { start: 1267, length: 1, convRule: rule23 },
  { start: 1268, length: 1, convRule: rule22 },
  { start: 1269, length: 1, convRule: rule23 },
  { start: 1270, length: 1, convRule: rule22 },
  { start: 1271, length: 1, convRule: rule23 },
  { start: 1272, length: 1, convRule: rule22 },
  { start: 1273, length: 1, convRule: rule23 },
  { start: 1274, length: 1, convRule: rule22 },
  { start: 1275, length: 1, convRule: rule23 },
  { start: 1276, length: 1, convRule: rule22 },
  { start: 1277, length: 1, convRule: rule23 },
  { start: 1278, length: 1, convRule: rule22 },
  { start: 1279, length: 1, convRule: rule23 },
  { start: 1280, length: 1, convRule: rule22 },
  { start: 1281, length: 1, convRule: rule23 },
  { start: 1282, length: 1, convRule: rule22 },
  { start: 1283, length: 1, convRule: rule23 },
  { start: 1284, length: 1, convRule: rule22 },
  { start: 1285, length: 1, convRule: rule23 },
  { start: 1286, length: 1, convRule: rule22 },
  { start: 1287, length: 1, convRule: rule23 },
  { start: 1288, length: 1, convRule: rule22 },
  { start: 1289, length: 1, convRule: rule23 },
  { start: 1290, length: 1, convRule: rule22 },
  { start: 1291, length: 1, convRule: rule23 },
  { start: 1292, length: 1, convRule: rule22 },
  { start: 1293, length: 1, convRule: rule23 },
  { start: 1294, length: 1, convRule: rule22 },
  { start: 1295, length: 1, convRule: rule23 },
  { start: 1296, length: 1, convRule: rule22 },
  { start: 1297, length: 1, convRule: rule23 },
  { start: 1298, length: 1, convRule: rule22 },
  { start: 1299, length: 1, convRule: rule23 },
  { start: 1300, length: 1, convRule: rule22 },
  { start: 1301, length: 1, convRule: rule23 },
  { start: 1302, length: 1, convRule: rule22 },
  { start: 1303, length: 1, convRule: rule23 },
  { start: 1304, length: 1, convRule: rule22 },
  { start: 1305, length: 1, convRule: rule23 },
  { start: 1306, length: 1, convRule: rule22 },
  { start: 1307, length: 1, convRule: rule23 },
  { start: 1308, length: 1, convRule: rule22 },
  { start: 1309, length: 1, convRule: rule23 },
  { start: 1310, length: 1, convRule: rule22 },
  { start: 1311, length: 1, convRule: rule23 },
  { start: 1312, length: 1, convRule: rule22 },
  { start: 1313, length: 1, convRule: rule23 },
  { start: 1314, length: 1, convRule: rule22 },
  { start: 1315, length: 1, convRule: rule23 },
  { start: 1316, length: 1, convRule: rule22 },
  { start: 1317, length: 1, convRule: rule23 },
  { start: 1318, length: 1, convRule: rule22 },
  { start: 1319, length: 1, convRule: rule23 },
  { start: 1320, length: 1, convRule: rule22 },
  { start: 1321, length: 1, convRule: rule23 },
  { start: 1322, length: 1, convRule: rule22 },
  { start: 1323, length: 1, convRule: rule23 },
  { start: 1324, length: 1, convRule: rule22 },
  { start: 1325, length: 1, convRule: rule23 },
  { start: 1326, length: 1, convRule: rule22 },
  { start: 1327, length: 1, convRule: rule23 },
  { start: 1329, length: 38, convRule: rule122 },
  { start: 1369, length: 1, convRule: rule91 },
  { start: 1370, length: 6, convRule: rule2 },
  { start: 1376, length: 1, convRule: rule20 },
  { start: 1377, length: 38, convRule: rule123 },
  { start: 1415, length: 2, convRule: rule20 },
  { start: 1417, length: 1, convRule: rule2 },
  { start: 1418, length: 1, convRule: rule7 },
  { start: 1421, length: 2, convRule: rule13 },
  { start: 1423, length: 1, convRule: rule3 },
  { start: 1425, length: 45, convRule: rule92 },
  { start: 1470, length: 1, convRule: rule7 },
  { start: 1471, length: 1, convRule: rule92 },
  { start: 1472, length: 1, convRule: rule2 },
  { start: 1473, length: 2, convRule: rule92 },
  { start: 1475, length: 1, convRule: rule2 },
  { start: 1476, length: 2, convRule: rule92 },
  { start: 1478, length: 1, convRule: rule2 },
  { start: 1479, length: 1, convRule: rule92 },
  { start: 1488, length: 27, convRule: rule14 },
  { start: 1519, length: 4, convRule: rule14 },
  { start: 1523, length: 2, convRule: rule2 },
  { start: 1536, length: 6, convRule: rule16 },
  { start: 1542, length: 3, convRule: rule6 },
  { start: 1545, length: 2, convRule: rule2 },
  { start: 1547, length: 1, convRule: rule3 },
  { start: 1548, length: 2, convRule: rule2 },
  { start: 1550, length: 2, convRule: rule13 },
  { start: 1552, length: 11, convRule: rule92 },
  { start: 1563, length: 1, convRule: rule2 },
  { start: 1564, length: 1, convRule: rule16 },
  { start: 1566, length: 2, convRule: rule2 },
  { start: 1568, length: 32, convRule: rule14 },
  { start: 1600, length: 1, convRule: rule91 },
  { start: 1601, length: 10, convRule: rule14 },
  { start: 1611, length: 21, convRule: rule92 },
  { start: 1632, length: 10, convRule: rule8 },
  { start: 1642, length: 4, convRule: rule2 },
  { start: 1646, length: 2, convRule: rule14 },
  { start: 1648, length: 1, convRule: rule92 },
  { start: 1649, length: 99, convRule: rule14 },
  { start: 1748, length: 1, convRule: rule2 },
  { start: 1749, length: 1, convRule: rule14 },
  { start: 1750, length: 7, convRule: rule92 },
  { start: 1757, length: 1, convRule: rule16 },
  { start: 1758, length: 1, convRule: rule13 },
  { start: 1759, length: 6, convRule: rule92 },
  { start: 1765, length: 2, convRule: rule91 },
  { start: 1767, length: 2, convRule: rule92 },
  { start: 1769, length: 1, convRule: rule13 },
  { start: 1770, length: 4, convRule: rule92 },
  { start: 1774, length: 2, convRule: rule14 },
  { start: 1776, length: 10, convRule: rule8 },
  { start: 1786, length: 3, convRule: rule14 },
  { start: 1789, length: 2, convRule: rule13 },
  { start: 1791, length: 1, convRule: rule14 },
  { start: 1792, length: 14, convRule: rule2 },
  { start: 1807, length: 1, convRule: rule16 },
  { start: 1808, length: 1, convRule: rule14 },
  { start: 1809, length: 1, convRule: rule92 },
  { start: 1810, length: 30, convRule: rule14 },
  { start: 1840, length: 27, convRule: rule92 },
  { start: 1869, length: 89, convRule: rule14 },
  { start: 1958, length: 11, convRule: rule92 },
  { start: 1969, length: 1, convRule: rule14 },
  { start: 1984, length: 10, convRule: rule8 },
  { start: 1994, length: 33, convRule: rule14 },
  { start: 2027, length: 9, convRule: rule92 },
  { start: 2036, length: 2, convRule: rule91 },
  { start: 2038, length: 1, convRule: rule13 },
  { start: 2039, length: 3, convRule: rule2 },
  { start: 2042, length: 1, convRule: rule91 },
  { start: 2045, length: 1, convRule: rule92 },
  { start: 2046, length: 2, convRule: rule3 },
  { start: 2048, length: 22, convRule: rule14 },
  { start: 2070, length: 4, convRule: rule92 },
  { start: 2074, length: 1, convRule: rule91 },
  { start: 2075, length: 9, convRule: rule92 },
  { start: 2084, length: 1, convRule: rule91 },
  { start: 2085, length: 3, convRule: rule92 },
  { start: 2088, length: 1, convRule: rule91 },
  { start: 2089, length: 5, convRule: rule92 },
  { start: 2096, length: 15, convRule: rule2 },
  { start: 2112, length: 25, convRule: rule14 },
  { start: 2137, length: 3, convRule: rule92 },
  { start: 2142, length: 1, convRule: rule2 },
  { start: 2144, length: 11, convRule: rule14 },
  { start: 2208, length: 21, convRule: rule14 },
  { start: 2230, length: 18, convRule: rule14 },
  { start: 2259, length: 15, convRule: rule92 },
  { start: 2274, length: 1, convRule: rule16 },
  { start: 2275, length: 32, convRule: rule92 },
  { start: 2307, length: 1, convRule: rule124 },
  { start: 2308, length: 54, convRule: rule14 },
  { start: 2362, length: 1, convRule: rule92 },
  { start: 2363, length: 1, convRule: rule124 },
  { start: 2364, length: 1, convRule: rule92 },
  { start: 2365, length: 1, convRule: rule14 },
  { start: 2366, length: 3, convRule: rule124 },
  { start: 2369, length: 8, convRule: rule92 },
  { start: 2377, length: 4, convRule: rule124 },
  { start: 2381, length: 1, convRule: rule92 },
  { start: 2382, length: 2, convRule: rule124 },
  { start: 2384, length: 1, convRule: rule14 },
  { start: 2385, length: 7, convRule: rule92 },
  { start: 2392, length: 10, convRule: rule14 },
  { start: 2402, length: 2, convRule: rule92 },
  { start: 2404, length: 2, convRule: rule2 },
  { start: 2406, length: 10, convRule: rule8 },
  { start: 2416, length: 1, convRule: rule2 },
  { start: 2417, length: 1, convRule: rule91 },
  { start: 2418, length: 15, convRule: rule14 },
  { start: 2433, length: 1, convRule: rule92 },
  { start: 2434, length: 2, convRule: rule124 },
  { start: 2437, length: 8, convRule: rule14 },
  { start: 2447, length: 2, convRule: rule14 },
  { start: 2451, length: 22, convRule: rule14 },
  { start: 2474, length: 7, convRule: rule14 },
  { start: 2482, length: 1, convRule: rule14 },
  { start: 2486, length: 4, convRule: rule14 },
  { start: 2492, length: 1, convRule: rule92 },
  { start: 2493, length: 1, convRule: rule14 },
  { start: 2494, length: 3, convRule: rule124 },
  { start: 2497, length: 4, convRule: rule92 },
  { start: 2503, length: 2, convRule: rule124 },
  { start: 2507, length: 2, convRule: rule124 },
  { start: 2509, length: 1, convRule: rule92 },
  { start: 2510, length: 1, convRule: rule14 },
  { start: 2519, length: 1, convRule: rule124 },
  { start: 2524, length: 2, convRule: rule14 },
  { start: 2527, length: 3, convRule: rule14 },
  { start: 2530, length: 2, convRule: rule92 },
  { start: 2534, length: 10, convRule: rule8 },
  { start: 2544, length: 2, convRule: rule14 },
  { start: 2546, length: 2, convRule: rule3 },
  { start: 2548, length: 6, convRule: rule17 },
  { start: 2554, length: 1, convRule: rule13 },
  { start: 2555, length: 1, convRule: rule3 },
  { start: 2556, length: 1, convRule: rule14 },
  { start: 2557, length: 1, convRule: rule2 },
  { start: 2558, length: 1, convRule: rule92 },
  { start: 2561, length: 2, convRule: rule92 },
  { start: 2563, length: 1, convRule: rule124 },
  { start: 2565, length: 6, convRule: rule14 },
  { start: 2575, length: 2, convRule: rule14 },
  { start: 2579, length: 22, convRule: rule14 },
  { start: 2602, length: 7, convRule: rule14 },
  { start: 2610, length: 2, convRule: rule14 },
  { start: 2613, length: 2, convRule: rule14 },
  { start: 2616, length: 2, convRule: rule14 },
  { start: 2620, length: 1, convRule: rule92 },
  { start: 2622, length: 3, convRule: rule124 },
  { start: 2625, length: 2, convRule: rule92 },
  { start: 2631, length: 2, convRule: rule92 },
  { start: 2635, length: 3, convRule: rule92 },
  { start: 2641, length: 1, convRule: rule92 },
  { start: 2649, length: 4, convRule: rule14 },
  { start: 2654, length: 1, convRule: rule14 },
  { start: 2662, length: 10, convRule: rule8 },
  { start: 2672, length: 2, convRule: rule92 },
  { start: 2674, length: 3, convRule: rule14 },
  { start: 2677, length: 1, convRule: rule92 },
  { start: 2678, length: 1, convRule: rule2 },
  { start: 2689, length: 2, convRule: rule92 },
  { start: 2691, length: 1, convRule: rule124 },
  { start: 2693, length: 9, convRule: rule14 },
  { start: 2703, length: 3, convRule: rule14 },
  { start: 2707, length: 22, convRule: rule14 },
  { start: 2730, length: 7, convRule: rule14 },
  { start: 2738, length: 2, convRule: rule14 },
  { start: 2741, length: 5, convRule: rule14 },
  { start: 2748, length: 1, convRule: rule92 },
  { start: 2749, length: 1, convRule: rule14 },
  { start: 2750, length: 3, convRule: rule124 },
  { start: 2753, length: 5, convRule: rule92 },
  { start: 2759, length: 2, convRule: rule92 },
  { start: 2761, length: 1, convRule: rule124 },
  { start: 2763, length: 2, convRule: rule124 },
  { start: 2765, length: 1, convRule: rule92 },
  { start: 2768, length: 1, convRule: rule14 },
  { start: 2784, length: 2, convRule: rule14 },
  { start: 2786, length: 2, convRule: rule92 },
  { start: 2790, length: 10, convRule: rule8 },
  { start: 2800, length: 1, convRule: rule2 },
  { start: 2801, length: 1, convRule: rule3 },
  { start: 2809, length: 1, convRule: rule14 },
  { start: 2810, length: 6, convRule: rule92 },
  { start: 2817, length: 1, convRule: rule92 },
  { start: 2818, length: 2, convRule: rule124 },
  { start: 2821, length: 8, convRule: rule14 },
  { start: 2831, length: 2, convRule: rule14 },
  { start: 2835, length: 22, convRule: rule14 },
  { start: 2858, length: 7, convRule: rule14 },
  { start: 2866, length: 2, convRule: rule14 },
  { start: 2869, length: 5, convRule: rule14 },
  { start: 2876, length: 1, convRule: rule92 },
  { start: 2877, length: 1, convRule: rule14 },
  { start: 2878, length: 1, convRule: rule124 },
  { start: 2879, length: 1, convRule: rule92 },
  { start: 2880, length: 1, convRule: rule124 },
  { start: 2881, length: 4, convRule: rule92 },
  { start: 2887, length: 2, convRule: rule124 },
  { start: 2891, length: 2, convRule: rule124 },
  { start: 2893, length: 1, convRule: rule92 },
  { start: 2901, length: 2, convRule: rule92 },
  { start: 2903, length: 1, convRule: rule124 },
  { start: 2908, length: 2, convRule: rule14 },
  { start: 2911, length: 3, convRule: rule14 },
  { start: 2914, length: 2, convRule: rule92 },
  { start: 2918, length: 10, convRule: rule8 },
  { start: 2928, length: 1, convRule: rule13 },
  { start: 2929, length: 1, convRule: rule14 },
  { start: 2930, length: 6, convRule: rule17 },
  { start: 2946, length: 1, convRule: rule92 },
  { start: 2947, length: 1, convRule: rule14 },
  { start: 2949, length: 6, convRule: rule14 },
  { start: 2958, length: 3, convRule: rule14 },
  { start: 2962, length: 4, convRule: rule14 },
  { start: 2969, length: 2, convRule: rule14 },
  { start: 2972, length: 1, convRule: rule14 },
  { start: 2974, length: 2, convRule: rule14 },
  { start: 2979, length: 2, convRule: rule14 },
  { start: 2984, length: 3, convRule: rule14 },
  { start: 2990, length: 12, convRule: rule14 },
  { start: 3006, length: 2, convRule: rule124 },
  { start: 3008, length: 1, convRule: rule92 },
  { start: 3009, length: 2, convRule: rule124 },
  { start: 3014, length: 3, convRule: rule124 },
  { start: 3018, length: 3, convRule: rule124 },
  { start: 3021, length: 1, convRule: rule92 },
  { start: 3024, length: 1, convRule: rule14 },
  { start: 3031, length: 1, convRule: rule124 },
  { start: 3046, length: 10, convRule: rule8 },
  { start: 3056, length: 3, convRule: rule17 },
  { start: 3059, length: 6, convRule: rule13 },
  { start: 3065, length: 1, convRule: rule3 },
  { start: 3066, length: 1, convRule: rule13 },
  { start: 3072, length: 1, convRule: rule92 },
  { start: 3073, length: 3, convRule: rule124 },
  { start: 3076, length: 1, convRule: rule92 },
  { start: 3077, length: 8, convRule: rule14 },
  { start: 3086, length: 3, convRule: rule14 },
  { start: 3090, length: 23, convRule: rule14 },
  { start: 3114, length: 16, convRule: rule14 },
  { start: 3133, length: 1, convRule: rule14 },
  { start: 3134, length: 3, convRule: rule92 },
  { start: 3137, length: 4, convRule: rule124 },
  { start: 3142, length: 3, convRule: rule92 },
  { start: 3146, length: 4, convRule: rule92 },
  { start: 3157, length: 2, convRule: rule92 },
  { start: 3160, length: 3, convRule: rule14 },
  { start: 3168, length: 2, convRule: rule14 },
  { start: 3170, length: 2, convRule: rule92 },
  { start: 3174, length: 10, convRule: rule8 },
  { start: 3191, length: 1, convRule: rule2 },
  { start: 3192, length: 7, convRule: rule17 },
  { start: 3199, length: 1, convRule: rule13 },
  { start: 3200, length: 1, convRule: rule14 },
  { start: 3201, length: 1, convRule: rule92 },
  { start: 3202, length: 2, convRule: rule124 },
  { start: 3204, length: 1, convRule: rule2 },
  { start: 3205, length: 8, convRule: rule14 },
  { start: 3214, length: 3, convRule: rule14 },
  { start: 3218, length: 23, convRule: rule14 },
  { start: 3242, length: 10, convRule: rule14 },
  { start: 3253, length: 5, convRule: rule14 },
  { start: 3260, length: 1, convRule: rule92 },
  { start: 3261, length: 1, convRule: rule14 },
  { start: 3262, length: 1, convRule: rule124 },
  { start: 3263, length: 1, convRule: rule92 },
  { start: 3264, length: 5, convRule: rule124 },
  { start: 3270, length: 1, convRule: rule92 },
  { start: 3271, length: 2, convRule: rule124 },
  { start: 3274, length: 2, convRule: rule124 },
  { start: 3276, length: 2, convRule: rule92 },
  { start: 3285, length: 2, convRule: rule124 },
  { start: 3294, length: 1, convRule: rule14 },
  { start: 3296, length: 2, convRule: rule14 },
  { start: 3298, length: 2, convRule: rule92 },
  { start: 3302, length: 10, convRule: rule8 },
  { start: 3313, length: 2, convRule: rule14 },
  { start: 3328, length: 2, convRule: rule92 },
  { start: 3330, length: 2, convRule: rule124 },
  { start: 3332, length: 9, convRule: rule14 },
  { start: 3342, length: 3, convRule: rule14 },
  { start: 3346, length: 41, convRule: rule14 },
  { start: 3387, length: 2, convRule: rule92 },
  { start: 3389, length: 1, convRule: rule14 },
  { start: 3390, length: 3, convRule: rule124 },
  { start: 3393, length: 4, convRule: rule92 },
  { start: 3398, length: 3, convRule: rule124 },
  { start: 3402, length: 3, convRule: rule124 },
  { start: 3405, length: 1, convRule: rule92 },
  { start: 3406, length: 1, convRule: rule14 },
  { start: 3407, length: 1, convRule: rule13 },
  { start: 3412, length: 3, convRule: rule14 },
  { start: 3415, length: 1, convRule: rule124 },
  { start: 3416, length: 7, convRule: rule17 },
  { start: 3423, length: 3, convRule: rule14 },
  { start: 3426, length: 2, convRule: rule92 },
  { start: 3430, length: 10, convRule: rule8 },
  { start: 3440, length: 9, convRule: rule17 },
  { start: 3449, length: 1, convRule: rule13 },
  { start: 3450, length: 6, convRule: rule14 },
  { start: 3457, length: 1, convRule: rule92 },
  { start: 3458, length: 2, convRule: rule124 },
  { start: 3461, length: 18, convRule: rule14 },
  { start: 3482, length: 24, convRule: rule14 },
  { start: 3507, length: 9, convRule: rule14 },
  { start: 3517, length: 1, convRule: rule14 },
  { start: 3520, length: 7, convRule: rule14 },
  { start: 3530, length: 1, convRule: rule92 },
  { start: 3535, length: 3, convRule: rule124 },
  { start: 3538, length: 3, convRule: rule92 },
  { start: 3542, length: 1, convRule: rule92 },
  { start: 3544, length: 8, convRule: rule124 },
  { start: 3558, length: 10, convRule: rule8 },
  { start: 3570, length: 2, convRule: rule124 },
  { start: 3572, length: 1, convRule: rule2 },
  { start: 3585, length: 48, convRule: rule14 },
  { start: 3633, length: 1, convRule: rule92 },
  { start: 3634, length: 2, convRule: rule14 },
  { start: 3636, length: 7, convRule: rule92 },
  { start: 3647, length: 1, convRule: rule3 },
  { start: 3648, length: 6, convRule: rule14 },
  { start: 3654, length: 1, convRule: rule91 },
  { start: 3655, length: 8, convRule: rule92 },
  { start: 3663, length: 1, convRule: rule2 },
  { start: 3664, length: 10, convRule: rule8 },
  { start: 3674, length: 2, convRule: rule2 },
  { start: 3713, length: 2, convRule: rule14 },
  { start: 3716, length: 1, convRule: rule14 },
  { start: 3718, length: 5, convRule: rule14 },
  { start: 3724, length: 24, convRule: rule14 },
  { start: 3749, length: 1, convRule: rule14 },
  { start: 3751, length: 10, convRule: rule14 },
  { start: 3761, length: 1, convRule: rule92 },
  { start: 3762, length: 2, convRule: rule14 },
  { start: 3764, length: 9, convRule: rule92 },
  { start: 3773, length: 1, convRule: rule14 },
  { start: 3776, length: 5, convRule: rule14 },
  { start: 3782, length: 1, convRule: rule91 },
  { start: 3784, length: 6, convRule: rule92 },
  { start: 3792, length: 10, convRule: rule8 },
  { start: 3804, length: 4, convRule: rule14 },
  { start: 3840, length: 1, convRule: rule14 },
  { start: 3841, length: 3, convRule: rule13 },
  { start: 3844, length: 15, convRule: rule2 },
  { start: 3859, length: 1, convRule: rule13 },
  { start: 3860, length: 1, convRule: rule2 },
  { start: 3861, length: 3, convRule: rule13 },
  { start: 3864, length: 2, convRule: rule92 },
  { start: 3866, length: 6, convRule: rule13 },
  { start: 3872, length: 10, convRule: rule8 },
  { start: 3882, length: 10, convRule: rule17 },
  { start: 3892, length: 1, convRule: rule13 },
  { start: 3893, length: 1, convRule: rule92 },
  { start: 3894, length: 1, convRule: rule13 },
  { start: 3895, length: 1, convRule: rule92 },
  { start: 3896, length: 1, convRule: rule13 },
  { start: 3897, length: 1, convRule: rule92 },
  { start: 3898, length: 1, convRule: rule4 },
  { start: 3899, length: 1, convRule: rule5 },
  { start: 3900, length: 1, convRule: rule4 },
  { start: 3901, length: 1, convRule: rule5 },
  { start: 3902, length: 2, convRule: rule124 },
  { start: 3904, length: 8, convRule: rule14 },
  { start: 3913, length: 36, convRule: rule14 },
  { start: 3953, length: 14, convRule: rule92 },
  { start: 3967, length: 1, convRule: rule124 },
  { start: 3968, length: 5, convRule: rule92 },
  { start: 3973, length: 1, convRule: rule2 },
  { start: 3974, length: 2, convRule: rule92 },
  { start: 3976, length: 5, convRule: rule14 },
  { start: 3981, length: 11, convRule: rule92 },
  { start: 3993, length: 36, convRule: rule92 },
  { start: 4030, length: 8, convRule: rule13 },
  { start: 4038, length: 1, convRule: rule92 },
  { start: 4039, length: 6, convRule: rule13 },
  { start: 4046, length: 2, convRule: rule13 },
  { start: 4048, length: 5, convRule: rule2 },
  { start: 4053, length: 4, convRule: rule13 },
  { start: 4057, length: 2, convRule: rule2 },
  { start: 4096, length: 43, convRule: rule14 },
  { start: 4139, length: 2, convRule: rule124 },
  { start: 4141, length: 4, convRule: rule92 },
  { start: 4145, length: 1, convRule: rule124 },
  { start: 4146, length: 6, convRule: rule92 },
  { start: 4152, length: 1, convRule: rule124 },
  { start: 4153, length: 2, convRule: rule92 },
  { start: 4155, length: 2, convRule: rule124 },
  { start: 4157, length: 2, convRule: rule92 },
  { start: 4159, length: 1, convRule: rule14 },
  { start: 4160, length: 10, convRule: rule8 },
  { start: 4170, length: 6, convRule: rule2 },
  { start: 4176, length: 6, convRule: rule14 },
  { start: 4182, length: 2, convRule: rule124 },
  { start: 4184, length: 2, convRule: rule92 },
  { start: 4186, length: 4, convRule: rule14 },
  { start: 4190, length: 3, convRule: rule92 },
  { start: 4193, length: 1, convRule: rule14 },
  { start: 4194, length: 3, convRule: rule124 },
  { start: 4197, length: 2, convRule: rule14 },
  { start: 4199, length: 7, convRule: rule124 },
  { start: 4206, length: 3, convRule: rule14 },
  { start: 4209, length: 4, convRule: rule92 },
  { start: 4213, length: 13, convRule: rule14 },
  { start: 4226, length: 1, convRule: rule92 },
  { start: 4227, length: 2, convRule: rule124 },
  { start: 4229, length: 2, convRule: rule92 },
  { start: 4231, length: 6, convRule: rule124 },
  { start: 4237, length: 1, convRule: rule92 },
  { start: 4238, length: 1, convRule: rule14 },
  { start: 4239, length: 1, convRule: rule124 },
  { start: 4240, length: 10, convRule: rule8 },
  { start: 4250, length: 3, convRule: rule124 },
  { start: 4253, length: 1, convRule: rule92 },
  { start: 4254, length: 2, convRule: rule13 },
  { start: 4256, length: 38, convRule: rule125 },
  { start: 4295, length: 1, convRule: rule125 },
  { start: 4301, length: 1, convRule: rule125 },
  { start: 4304, length: 43, convRule: rule126 },
  { start: 4347, length: 1, convRule: rule2 },
  { start: 4348, length: 1, convRule: rule91 },
  { start: 4349, length: 3, convRule: rule126 },
  { start: 4352, length: 329, convRule: rule14 },
  { start: 4682, length: 4, convRule: rule14 },
  { start: 4688, length: 7, convRule: rule14 },
  { start: 4696, length: 1, convRule: rule14 },
  { start: 4698, length: 4, convRule: rule14 },
  { start: 4704, length: 41, convRule: rule14 },
  { start: 4746, length: 4, convRule: rule14 },
  { start: 4752, length: 33, convRule: rule14 },
  { start: 4786, length: 4, convRule: rule14 },
  { start: 4792, length: 7, convRule: rule14 },
  { start: 4800, length: 1, convRule: rule14 },
  { start: 4802, length: 4, convRule: rule14 },
  { start: 4808, length: 15, convRule: rule14 },
  { start: 4824, length: 57, convRule: rule14 },
  { start: 4882, length: 4, convRule: rule14 },
  { start: 4888, length: 67, convRule: rule14 },
  { start: 4957, length: 3, convRule: rule92 },
  { start: 4960, length: 9, convRule: rule2 },
  { start: 4969, length: 20, convRule: rule17 },
  { start: 4992, length: 16, convRule: rule14 },
  { start: 5008, length: 10, convRule: rule13 },
  { start: 5024, length: 80, convRule: rule127 },
  { start: 5104, length: 6, convRule: rule104 },
  { start: 5112, length: 6, convRule: rule110 },
  { start: 5120, length: 1, convRule: rule7 },
  { start: 5121, length: 620, convRule: rule14 },
  { start: 5741, length: 1, convRule: rule13 },
  { start: 5742, length: 1, convRule: rule2 },
  { start: 5743, length: 17, convRule: rule14 },
  { start: 5760, length: 1, convRule: rule1 },
  { start: 5761, length: 26, convRule: rule14 },
  { start: 5787, length: 1, convRule: rule4 },
  { start: 5788, length: 1, convRule: rule5 },
  { start: 5792, length: 75, convRule: rule14 },
  { start: 5867, length: 3, convRule: rule2 },
  { start: 5870, length: 3, convRule: rule128 },
  { start: 5873, length: 8, convRule: rule14 },
  { start: 5888, length: 13, convRule: rule14 },
  { start: 5902, length: 4, convRule: rule14 },
  { start: 5906, length: 3, convRule: rule92 },
  { start: 5920, length: 18, convRule: rule14 },
  { start: 5938, length: 3, convRule: rule92 },
  { start: 5941, length: 2, convRule: rule2 },
  { start: 5952, length: 18, convRule: rule14 },
  { start: 5970, length: 2, convRule: rule92 },
  { start: 5984, length: 13, convRule: rule14 },
  { start: 5998, length: 3, convRule: rule14 },
  { start: 6002, length: 2, convRule: rule92 },
  { start: 6016, length: 52, convRule: rule14 },
  { start: 6068, length: 2, convRule: rule92 },
  { start: 6070, length: 1, convRule: rule124 },
  { start: 6071, length: 7, convRule: rule92 },
  { start: 6078, length: 8, convRule: rule124 },
  { start: 6086, length: 1, convRule: rule92 },
  { start: 6087, length: 2, convRule: rule124 },
  { start: 6089, length: 11, convRule: rule92 },
  { start: 6100, length: 3, convRule: rule2 },
  { start: 6103, length: 1, convRule: rule91 },
  { start: 6104, length: 3, convRule: rule2 },
  { start: 6107, length: 1, convRule: rule3 },
  { start: 6108, length: 1, convRule: rule14 },
  { start: 6109, length: 1, convRule: rule92 },
  { start: 6112, length: 10, convRule: rule8 },
  { start: 6128, length: 10, convRule: rule17 },
  { start: 6144, length: 6, convRule: rule2 },
  { start: 6150, length: 1, convRule: rule7 },
  { start: 6151, length: 4, convRule: rule2 },
  { start: 6155, length: 3, convRule: rule92 },
  { start: 6158, length: 1, convRule: rule16 },
  { start: 6160, length: 10, convRule: rule8 },
  { start: 6176, length: 35, convRule: rule14 },
  { start: 6211, length: 1, convRule: rule91 },
  { start: 6212, length: 53, convRule: rule14 },
  { start: 6272, length: 5, convRule: rule14 },
  { start: 6277, length: 2, convRule: rule92 },
  { start: 6279, length: 34, convRule: rule14 },
  { start: 6313, length: 1, convRule: rule92 },
  { start: 6314, length: 1, convRule: rule14 },
  { start: 6320, length: 70, convRule: rule14 },
  { start: 6400, length: 31, convRule: rule14 },
  { start: 6432, length: 3, convRule: rule92 },
  { start: 6435, length: 4, convRule: rule124 },
  { start: 6439, length: 2, convRule: rule92 },
  { start: 6441, length: 3, convRule: rule124 },
  { start: 6448, length: 2, convRule: rule124 },
  { start: 6450, length: 1, convRule: rule92 },
  { start: 6451, length: 6, convRule: rule124 },
  { start: 6457, length: 3, convRule: rule92 },
  { start: 6464, length: 1, convRule: rule13 },
  { start: 6468, length: 2, convRule: rule2 },
  { start: 6470, length: 10, convRule: rule8 },
  { start: 6480, length: 30, convRule: rule14 },
  { start: 6512, length: 5, convRule: rule14 },
  { start: 6528, length: 44, convRule: rule14 },
  { start: 6576, length: 26, convRule: rule14 },
  { start: 6608, length: 10, convRule: rule8 },
  { start: 6618, length: 1, convRule: rule17 },
  { start: 6622, length: 34, convRule: rule13 },
  { start: 6656, length: 23, convRule: rule14 },
  { start: 6679, length: 2, convRule: rule92 },
  { start: 6681, length: 2, convRule: rule124 },
  { start: 6683, length: 1, convRule: rule92 },
  { start: 6686, length: 2, convRule: rule2 },
  { start: 6688, length: 53, convRule: rule14 },
  { start: 6741, length: 1, convRule: rule124 },
  { start: 6742, length: 1, convRule: rule92 },
  { start: 6743, length: 1, convRule: rule124 },
  { start: 6744, length: 7, convRule: rule92 },
  { start: 6752, length: 1, convRule: rule92 },
  { start: 6753, length: 1, convRule: rule124 },
  { start: 6754, length: 1, convRule: rule92 },
  { start: 6755, length: 2, convRule: rule124 },
  { start: 6757, length: 8, convRule: rule92 },
  { start: 6765, length: 6, convRule: rule124 },
  { start: 6771, length: 10, convRule: rule92 },
  { start: 6783, length: 1, convRule: rule92 },
  { start: 6784, length: 10, convRule: rule8 },
  { start: 6800, length: 10, convRule: rule8 },
  { start: 6816, length: 7, convRule: rule2 },
  { start: 6823, length: 1, convRule: rule91 },
  { start: 6824, length: 6, convRule: rule2 },
  { start: 6832, length: 14, convRule: rule92 },
  { start: 6846, length: 1, convRule: rule119 },
  { start: 6847, length: 2, convRule: rule92 },
  { start: 6912, length: 4, convRule: rule92 },
  { start: 6916, length: 1, convRule: rule124 },
  { start: 6917, length: 47, convRule: rule14 },
  { start: 6964, length: 1, convRule: rule92 },
  { start: 6965, length: 1, convRule: rule124 },
  { start: 6966, length: 5, convRule: rule92 },
  { start: 6971, length: 1, convRule: rule124 },
  { start: 6972, length: 1, convRule: rule92 },
  { start: 6973, length: 5, convRule: rule124 },
  { start: 6978, length: 1, convRule: rule92 },
  { start: 6979, length: 2, convRule: rule124 },
  { start: 6981, length: 7, convRule: rule14 },
  { start: 6992, length: 10, convRule: rule8 },
  { start: 7002, length: 7, convRule: rule2 },
  { start: 7009, length: 10, convRule: rule13 },
  { start: 7019, length: 9, convRule: rule92 },
  { start: 7028, length: 9, convRule: rule13 },
  { start: 7040, length: 2, convRule: rule92 },
  { start: 7042, length: 1, convRule: rule124 },
  { start: 7043, length: 30, convRule: rule14 },
  { start: 7073, length: 1, convRule: rule124 },
  { start: 7074, length: 4, convRule: rule92 },
  { start: 7078, length: 2, convRule: rule124 },
  { start: 7080, length: 2, convRule: rule92 },
  { start: 7082, length: 1, convRule: rule124 },
  { start: 7083, length: 3, convRule: rule92 },
  { start: 7086, length: 2, convRule: rule14 },
  { start: 7088, length: 10, convRule: rule8 },
  { start: 7098, length: 44, convRule: rule14 },
  { start: 7142, length: 1, convRule: rule92 },
  { start: 7143, length: 1, convRule: rule124 },
  { start: 7144, length: 2, convRule: rule92 },
  { start: 7146, length: 3, convRule: rule124 },
  { start: 7149, length: 1, convRule: rule92 },
  { start: 7150, length: 1, convRule: rule124 },
  { start: 7151, length: 3, convRule: rule92 },
  { start: 7154, length: 2, convRule: rule124 },
  { start: 7164, length: 4, convRule: rule2 },
  { start: 7168, length: 36, convRule: rule14 },
  { start: 7204, length: 8, convRule: rule124 },
  { start: 7212, length: 8, convRule: rule92 },
  { start: 7220, length: 2, convRule: rule124 },
  { start: 7222, length: 2, convRule: rule92 },
  { start: 7227, length: 5, convRule: rule2 },
  { start: 7232, length: 10, convRule: rule8 },
  { start: 7245, length: 3, convRule: rule14 },
  { start: 7248, length: 10, convRule: rule8 },
  { start: 7258, length: 30, convRule: rule14 },
  { start: 7288, length: 6, convRule: rule91 },
  { start: 7294, length: 2, convRule: rule2 },
  { start: 7296, length: 1, convRule: rule129 },
  { start: 7297, length: 1, convRule: rule130 },
  { start: 7298, length: 1, convRule: rule131 },
  { start: 7299, length: 2, convRule: rule132 },
  { start: 7301, length: 1, convRule: rule133 },
  { start: 7302, length: 1, convRule: rule134 },
  { start: 7303, length: 1, convRule: rule135 },
  { start: 7304, length: 1, convRule: rule136 },
  { start: 7312, length: 43, convRule: rule137 },
  { start: 7357, length: 3, convRule: rule137 },
  { start: 7360, length: 8, convRule: rule2 },
  { start: 7376, length: 3, convRule: rule92 },
  { start: 7379, length: 1, convRule: rule2 },
  { start: 7380, length: 13, convRule: rule92 },
  { start: 7393, length: 1, convRule: rule124 },
  { start: 7394, length: 7, convRule: rule92 },
  { start: 7401, length: 4, convRule: rule14 },
  { start: 7405, length: 1, convRule: rule92 },
  { start: 7406, length: 6, convRule: rule14 },
  { start: 7412, length: 1, convRule: rule92 },
  { start: 7413, length: 2, convRule: rule14 },
  { start: 7415, length: 1, convRule: rule124 },
  { start: 7416, length: 2, convRule: rule92 },
  { start: 7418, length: 1, convRule: rule14 },
  { start: 7424, length: 44, convRule: rule20 },
  { start: 7468, length: 63, convRule: rule91 },
  { start: 7531, length: 13, convRule: rule20 },
  { start: 7544, length: 1, convRule: rule91 },
  { start: 7545, length: 1, convRule: rule138 },
  { start: 7546, length: 3, convRule: rule20 },
  { start: 7549, length: 1, convRule: rule139 },
  { start: 7550, length: 16, convRule: rule20 },
  { start: 7566, length: 1, convRule: rule140 },
  { start: 7567, length: 12, convRule: rule20 },
  { start: 7579, length: 37, convRule: rule91 },
  { start: 7616, length: 58, convRule: rule92 },
  { start: 7675, length: 5, convRule: rule92 },
  { start: 7680, length: 1, convRule: rule22 },
  { start: 7681, length: 1, convRule: rule23 },
  { start: 7682, length: 1, convRule: rule22 },
  { start: 7683, length: 1, convRule: rule23 },
  { start: 7684, length: 1, convRule: rule22 },
  { start: 7685, length: 1, convRule: rule23 },
  { start: 7686, length: 1, convRule: rule22 },
  { start: 7687, length: 1, convRule: rule23 },
  { start: 7688, length: 1, convRule: rule22 },
  { start: 7689, length: 1, convRule: rule23 },
  { start: 7690, length: 1, convRule: rule22 },
  { start: 7691, length: 1, convRule: rule23 },
  { start: 7692, length: 1, convRule: rule22 },
  { start: 7693, length: 1, convRule: rule23 },
  { start: 7694, length: 1, convRule: rule22 },
  { start: 7695, length: 1, convRule: rule23 },
  { start: 7696, length: 1, convRule: rule22 },
  { start: 7697, length: 1, convRule: rule23 },
  { start: 7698, length: 1, convRule: rule22 },
  { start: 7699, length: 1, convRule: rule23 },
  { start: 7700, length: 1, convRule: rule22 },
  { start: 7701, length: 1, convRule: rule23 },
  { start: 7702, length: 1, convRule: rule22 },
  { start: 7703, length: 1, convRule: rule23 },
  { start: 7704, length: 1, convRule: rule22 },
  { start: 7705, length: 1, convRule: rule23 },
  { start: 7706, length: 1, convRule: rule22 },
  { start: 7707, length: 1, convRule: rule23 },
  { start: 7708, length: 1, convRule: rule22 },
  { start: 7709, length: 1, convRule: rule23 },
  { start: 7710, length: 1, convRule: rule22 },
  { start: 7711, length: 1, convRule: rule23 },
  { start: 7712, length: 1, convRule: rule22 },
  { start: 7713, length: 1, convRule: rule23 },
  { start: 7714, length: 1, convRule: rule22 },
  { start: 7715, length: 1, convRule: rule23 },
  { start: 7716, length: 1, convRule: rule22 },
  { start: 7717, length: 1, convRule: rule23 },
  { start: 7718, length: 1, convRule: rule22 },
  { start: 7719, length: 1, convRule: rule23 },
  { start: 7720, length: 1, convRule: rule22 },
  { start: 7721, length: 1, convRule: rule23 },
  { start: 7722, length: 1, convRule: rule22 },
  { start: 7723, length: 1, convRule: rule23 },
  { start: 7724, length: 1, convRule: rule22 },
  { start: 7725, length: 1, convRule: rule23 },
  { start: 7726, length: 1, convRule: rule22 },
  { start: 7727, length: 1, convRule: rule23 },
  { start: 7728, length: 1, convRule: rule22 },
  { start: 7729, length: 1, convRule: rule23 },
  { start: 7730, length: 1, convRule: rule22 },
  { start: 7731, length: 1, convRule: rule23 },
  { start: 7732, length: 1, convRule: rule22 },
  { start: 7733, length: 1, convRule: rule23 },
  { start: 7734, length: 1, convRule: rule22 },
  { start: 7735, length: 1, convRule: rule23 },
  { start: 7736, length: 1, convRule: rule22 },
  { start: 7737, length: 1, convRule: rule23 },
  { start: 7738, length: 1, convRule: rule22 },
  { start: 7739, length: 1, convRule: rule23 },
  { start: 7740, length: 1, convRule: rule22 },
  { start: 7741, length: 1, convRule: rule23 },
  { start: 7742, length: 1, convRule: rule22 },
  { start: 7743, length: 1, convRule: rule23 },
  { start: 7744, length: 1, convRule: rule22 },
  { start: 7745, length: 1, convRule: rule23 },
  { start: 7746, length: 1, convRule: rule22 },
  { start: 7747, length: 1, convRule: rule23 },
  { start: 7748, length: 1, convRule: rule22 },
  { start: 7749, length: 1, convRule: rule23 },
  { start: 7750, length: 1, convRule: rule22 },
  { start: 7751, length: 1, convRule: rule23 },
  { start: 7752, length: 1, convRule: rule22 },
  { start: 7753, length: 1, convRule: rule23 },
  { start: 7754, length: 1, convRule: rule22 },
  { start: 7755, length: 1, convRule: rule23 },
  { start: 7756, length: 1, convRule: rule22 },
  { start: 7757, length: 1, convRule: rule23 },
  { start: 7758, length: 1, convRule: rule22 },
  { start: 7759, length: 1, convRule: rule23 },
  { start: 7760, length: 1, convRule: rule22 },
  { start: 7761, length: 1, convRule: rule23 },
  { start: 7762, length: 1, convRule: rule22 },
  { start: 7763, length: 1, convRule: rule23 },
  { start: 7764, length: 1, convRule: rule22 },
  { start: 7765, length: 1, convRule: rule23 },
  { start: 7766, length: 1, convRule: rule22 },
  { start: 7767, length: 1, convRule: rule23 },
  { start: 7768, length: 1, convRule: rule22 },
  { start: 7769, length: 1, convRule: rule23 },
  { start: 7770, length: 1, convRule: rule22 },
  { start: 7771, length: 1, convRule: rule23 },
  { start: 7772, length: 1, convRule: rule22 },
  { start: 7773, length: 1, convRule: rule23 },
  { start: 7774, length: 1, convRule: rule22 },
  { start: 7775, length: 1, convRule: rule23 },
  { start: 7776, length: 1, convRule: rule22 },
  { start: 7777, length: 1, convRule: rule23 },
  { start: 7778, length: 1, convRule: rule22 },
  { start: 7779, length: 1, convRule: rule23 },
  { start: 7780, length: 1, convRule: rule22 },
  { start: 7781, length: 1, convRule: rule23 },
  { start: 7782, length: 1, convRule: rule22 },
  { start: 7783, length: 1, convRule: rule23 },
  { start: 7784, length: 1, convRule: rule22 },
  { start: 7785, length: 1, convRule: rule23 },
  { start: 7786, length: 1, convRule: rule22 },
  { start: 7787, length: 1, convRule: rule23 },
  { start: 7788, length: 1, convRule: rule22 },
  { start: 7789, length: 1, convRule: rule23 },
  { start: 7790, length: 1, convRule: rule22 },
  { start: 7791, length: 1, convRule: rule23 },
  { start: 7792, length: 1, convRule: rule22 },
  { start: 7793, length: 1, convRule: rule23 },
  { start: 7794, length: 1, convRule: rule22 },
  { start: 7795, length: 1, convRule: rule23 },
  { start: 7796, length: 1, convRule: rule22 },
  { start: 7797, length: 1, convRule: rule23 },
  { start: 7798, length: 1, convRule: rule22 },
  { start: 7799, length: 1, convRule: rule23 },
  { start: 7800, length: 1, convRule: rule22 },
  { start: 7801, length: 1, convRule: rule23 },
  { start: 7802, length: 1, convRule: rule22 },
  { start: 7803, length: 1, convRule: rule23 },
  { start: 7804, length: 1, convRule: rule22 },
  { start: 7805, length: 1, convRule: rule23 },
  { start: 7806, length: 1, convRule: rule22 },
  { start: 7807, length: 1, convRule: rule23 },
  { start: 7808, length: 1, convRule: rule22 },
  { start: 7809, length: 1, convRule: rule23 },
  { start: 7810, length: 1, convRule: rule22 },
  { start: 7811, length: 1, convRule: rule23 },
  { start: 7812, length: 1, convRule: rule22 },
  { start: 7813, length: 1, convRule: rule23 },
  { start: 7814, length: 1, convRule: rule22 },
  { start: 7815, length: 1, convRule: rule23 },
  { start: 7816, length: 1, convRule: rule22 },
  { start: 7817, length: 1, convRule: rule23 },
  { start: 7818, length: 1, convRule: rule22 },
  { start: 7819, length: 1, convRule: rule23 },
  { start: 7820, length: 1, convRule: rule22 },
  { start: 7821, length: 1, convRule: rule23 },
  { start: 7822, length: 1, convRule: rule22 },
  { start: 7823, length: 1, convRule: rule23 },
  { start: 7824, length: 1, convRule: rule22 },
  { start: 7825, length: 1, convRule: rule23 },
  { start: 7826, length: 1, convRule: rule22 },
  { start: 7827, length: 1, convRule: rule23 },
  { start: 7828, length: 1, convRule: rule22 },
  { start: 7829, length: 1, convRule: rule23 },
  { start: 7830, length: 5, convRule: rule20 },
  { start: 7835, length: 1, convRule: rule141 },
  { start: 7836, length: 2, convRule: rule20 },
  { start: 7838, length: 1, convRule: rule142 },
  { start: 7839, length: 1, convRule: rule20 },
  { start: 7840, length: 1, convRule: rule22 },
  { start: 7841, length: 1, convRule: rule23 },
  { start: 7842, length: 1, convRule: rule22 },
  { start: 7843, length: 1, convRule: rule23 },
  { start: 7844, length: 1, convRule: rule22 },
  { start: 7845, length: 1, convRule: rule23 },
  { start: 7846, length: 1, convRule: rule22 },
  { start: 7847, length: 1, convRule: rule23 },
  { start: 7848, length: 1, convRule: rule22 },
  { start: 7849, length: 1, convRule: rule23 },
  { start: 7850, length: 1, convRule: rule22 },
  { start: 7851, length: 1, convRule: rule23 },
  { start: 7852, length: 1, convRule: rule22 },
  { start: 7853, length: 1, convRule: rule23 },
  { start: 7854, length: 1, convRule: rule22 },
  { start: 7855, length: 1, convRule: rule23 },
  { start: 7856, length: 1, convRule: rule22 },
  { start: 7857, length: 1, convRule: rule23 },
  { start: 7858, length: 1, convRule: rule22 },
  { start: 7859, length: 1, convRule: rule23 },
  { start: 7860, length: 1, convRule: rule22 },
  { start: 7861, length: 1, convRule: rule23 },
  { start: 7862, length: 1, convRule: rule22 },
  { start: 7863, length: 1, convRule: rule23 },
  { start: 7864, length: 1, convRule: rule22 },
  { start: 7865, length: 1, convRule: rule23 },
  { start: 7866, length: 1, convRule: rule22 },
  { start: 7867, length: 1, convRule: rule23 },
  { start: 7868, length: 1, convRule: rule22 },
  { start: 7869, length: 1, convRule: rule23 },
  { start: 7870, length: 1, convRule: rule22 },
  { start: 7871, length: 1, convRule: rule23 },
  { start: 7872, length: 1, convRule: rule22 },
  { start: 7873, length: 1, convRule: rule23 },
  { start: 7874, length: 1, convRule: rule22 },
  { start: 7875, length: 1, convRule: rule23 },
  { start: 7876, length: 1, convRule: rule22 },
  { start: 7877, length: 1, convRule: rule23 },
  { start: 7878, length: 1, convRule: rule22 },
  { start: 7879, length: 1, convRule: rule23 },
  { start: 7880, length: 1, convRule: rule22 },
  { start: 7881, length: 1, convRule: rule23 },
  { start: 7882, length: 1, convRule: rule22 },
  { start: 7883, length: 1, convRule: rule23 },
  { start: 7884, length: 1, convRule: rule22 },
  { start: 7885, length: 1, convRule: rule23 },
  { start: 7886, length: 1, convRule: rule22 },
  { start: 7887, length: 1, convRule: rule23 },
  { start: 7888, length: 1, convRule: rule22 },
  { start: 7889, length: 1, convRule: rule23 },
  { start: 7890, length: 1, convRule: rule22 },
  { start: 7891, length: 1, convRule: rule23 },
  { start: 7892, length: 1, convRule: rule22 },
  { start: 7893, length: 1, convRule: rule23 },
  { start: 7894, length: 1, convRule: rule22 },
  { start: 7895, length: 1, convRule: rule23 },
  { start: 7896, length: 1, convRule: rule22 },
  { start: 7897, length: 1, convRule: rule23 },
  { start: 7898, length: 1, convRule: rule22 },
  { start: 7899, length: 1, convRule: rule23 },
  { start: 7900, length: 1, convRule: rule22 },
  { start: 7901, length: 1, convRule: rule23 },
  { start: 7902, length: 1, convRule: rule22 },
  { start: 7903, length: 1, convRule: rule23 },
  { start: 7904, length: 1, convRule: rule22 },
  { start: 7905, length: 1, convRule: rule23 },
  { start: 7906, length: 1, convRule: rule22 },
  { start: 7907, length: 1, convRule: rule23 },
  { start: 7908, length: 1, convRule: rule22 },
  { start: 7909, length: 1, convRule: rule23 },
  { start: 7910, length: 1, convRule: rule22 },
  { start: 7911, length: 1, convRule: rule23 },
  { start: 7912, length: 1, convRule: rule22 },
  { start: 7913, length: 1, convRule: rule23 },
  { start: 7914, length: 1, convRule: rule22 },
  { start: 7915, length: 1, convRule: rule23 },
  { start: 7916, length: 1, convRule: rule22 },
  { start: 7917, length: 1, convRule: rule23 },
  { start: 7918, length: 1, convRule: rule22 },
  { start: 7919, length: 1, convRule: rule23 },
  { start: 7920, length: 1, convRule: rule22 },
  { start: 7921, length: 1, convRule: rule23 },
  { start: 7922, length: 1, convRule: rule22 },
  { start: 7923, length: 1, convRule: rule23 },
  { start: 7924, length: 1, convRule: rule22 },
  { start: 7925, length: 1, convRule: rule23 },
  { start: 7926, length: 1, convRule: rule22 },
  { start: 7927, length: 1, convRule: rule23 },
  { start: 7928, length: 1, convRule: rule22 },
  { start: 7929, length: 1, convRule: rule23 },
  { start: 7930, length: 1, convRule: rule22 },
  { start: 7931, length: 1, convRule: rule23 },
  { start: 7932, length: 1, convRule: rule22 },
  { start: 7933, length: 1, convRule: rule23 },
  { start: 7934, length: 1, convRule: rule22 },
  { start: 7935, length: 1, convRule: rule23 },
  { start: 7936, length: 8, convRule: rule143 },
  { start: 7944, length: 8, convRule: rule144 },
  { start: 7952, length: 6, convRule: rule143 },
  { start: 7960, length: 6, convRule: rule144 },
  { start: 7968, length: 8, convRule: rule143 },
  { start: 7976, length: 8, convRule: rule144 },
  { start: 7984, length: 8, convRule: rule143 },
  { start: 7992, length: 8, convRule: rule144 },
  { start: 8e3, length: 6, convRule: rule143 },
  { start: 8008, length: 6, convRule: rule144 },
  { start: 8016, length: 1, convRule: rule20 },
  { start: 8017, length: 1, convRule: rule143 },
  { start: 8018, length: 1, convRule: rule20 },
  { start: 8019, length: 1, convRule: rule143 },
  { start: 8020, length: 1, convRule: rule20 },
  { start: 8021, length: 1, convRule: rule143 },
  { start: 8022, length: 1, convRule: rule20 },
  { start: 8023, length: 1, convRule: rule143 },
  { start: 8025, length: 1, convRule: rule144 },
  { start: 8027, length: 1, convRule: rule144 },
  { start: 8029, length: 1, convRule: rule144 },
  { start: 8031, length: 1, convRule: rule144 },
  { start: 8032, length: 8, convRule: rule143 },
  { start: 8040, length: 8, convRule: rule144 },
  { start: 8048, length: 2, convRule: rule145 },
  { start: 8050, length: 4, convRule: rule146 },
  { start: 8054, length: 2, convRule: rule147 },
  { start: 8056, length: 2, convRule: rule148 },
  { start: 8058, length: 2, convRule: rule149 },
  { start: 8060, length: 2, convRule: rule150 },
  { start: 8064, length: 8, convRule: rule143 },
  { start: 8072, length: 8, convRule: rule151 },
  { start: 8080, length: 8, convRule: rule143 },
  { start: 8088, length: 8, convRule: rule151 },
  { start: 8096, length: 8, convRule: rule143 },
  { start: 8104, length: 8, convRule: rule151 },
  { start: 8112, length: 2, convRule: rule143 },
  { start: 8114, length: 1, convRule: rule20 },
  { start: 8115, length: 1, convRule: rule152 },
  { start: 8116, length: 1, convRule: rule20 },
  { start: 8118, length: 2, convRule: rule20 },
  { start: 8120, length: 2, convRule: rule144 },
  { start: 8122, length: 2, convRule: rule153 },
  { start: 8124, length: 1, convRule: rule154 },
  { start: 8125, length: 1, convRule: rule10 },
  { start: 8126, length: 1, convRule: rule155 },
  { start: 8127, length: 3, convRule: rule10 },
  { start: 8130, length: 1, convRule: rule20 },
  { start: 8131, length: 1, convRule: rule152 },
  { start: 8132, length: 1, convRule: rule20 },
  { start: 8134, length: 2, convRule: rule20 },
  { start: 8136, length: 4, convRule: rule156 },
  { start: 8140, length: 1, convRule: rule154 },
  { start: 8141, length: 3, convRule: rule10 },
  { start: 8144, length: 2, convRule: rule143 },
  { start: 8146, length: 2, convRule: rule20 },
  { start: 8150, length: 2, convRule: rule20 },
  { start: 8152, length: 2, convRule: rule144 },
  { start: 8154, length: 2, convRule: rule157 },
  { start: 8157, length: 3, convRule: rule10 },
  { start: 8160, length: 2, convRule: rule143 },
  { start: 8162, length: 3, convRule: rule20 },
  { start: 8165, length: 1, convRule: rule113 },
  { start: 8166, length: 2, convRule: rule20 },
  { start: 8168, length: 2, convRule: rule144 },
  { start: 8170, length: 2, convRule: rule158 },
  { start: 8172, length: 1, convRule: rule117 },
  { start: 8173, length: 3, convRule: rule10 },
  { start: 8178, length: 1, convRule: rule20 },
  { start: 8179, length: 1, convRule: rule152 },
  { start: 8180, length: 1, convRule: rule20 },
  { start: 8182, length: 2, convRule: rule20 },
  { start: 8184, length: 2, convRule: rule159 },
  { start: 8186, length: 2, convRule: rule160 },
  { start: 8188, length: 1, convRule: rule154 },
  { start: 8189, length: 2, convRule: rule10 },
  { start: 8192, length: 11, convRule: rule1 },
  { start: 8203, length: 5, convRule: rule16 },
  { start: 8208, length: 6, convRule: rule7 },
  { start: 8214, length: 2, convRule: rule2 },
  { start: 8216, length: 1, convRule: rule15 },
  { start: 8217, length: 1, convRule: rule19 },
  { start: 8218, length: 1, convRule: rule4 },
  { start: 8219, length: 2, convRule: rule15 },
  { start: 8221, length: 1, convRule: rule19 },
  { start: 8222, length: 1, convRule: rule4 },
  { start: 8223, length: 1, convRule: rule15 },
  { start: 8224, length: 8, convRule: rule2 },
  { start: 8232, length: 1, convRule: rule161 },
  { start: 8233, length: 1, convRule: rule162 },
  { start: 8234, length: 5, convRule: rule16 },
  { start: 8239, length: 1, convRule: rule1 },
  { start: 8240, length: 9, convRule: rule2 },
  { start: 8249, length: 1, convRule: rule15 },
  { start: 8250, length: 1, convRule: rule19 },
  { start: 8251, length: 4, convRule: rule2 },
  { start: 8255, length: 2, convRule: rule11 },
  { start: 8257, length: 3, convRule: rule2 },
  { start: 8260, length: 1, convRule: rule6 },
  { start: 8261, length: 1, convRule: rule4 },
  { start: 8262, length: 1, convRule: rule5 },
  { start: 8263, length: 11, convRule: rule2 },
  { start: 8274, length: 1, convRule: rule6 },
  { start: 8275, length: 1, convRule: rule2 },
  { start: 8276, length: 1, convRule: rule11 },
  { start: 8277, length: 10, convRule: rule2 },
  { start: 8287, length: 1, convRule: rule1 },
  { start: 8288, length: 5, convRule: rule16 },
  { start: 8294, length: 10, convRule: rule16 },
  { start: 8304, length: 1, convRule: rule17 },
  { start: 8305, length: 1, convRule: rule91 },
  { start: 8308, length: 6, convRule: rule17 },
  { start: 8314, length: 3, convRule: rule6 },
  { start: 8317, length: 1, convRule: rule4 },
  { start: 8318, length: 1, convRule: rule5 },
  { start: 8319, length: 1, convRule: rule91 },
  { start: 8320, length: 10, convRule: rule17 },
  { start: 8330, length: 3, convRule: rule6 },
  { start: 8333, length: 1, convRule: rule4 },
  { start: 8334, length: 1, convRule: rule5 },
  { start: 8336, length: 13, convRule: rule91 },
  { start: 8352, length: 32, convRule: rule3 },
  { start: 8400, length: 13, convRule: rule92 },
  { start: 8413, length: 4, convRule: rule119 },
  { start: 8417, length: 1, convRule: rule92 },
  { start: 8418, length: 3, convRule: rule119 },
  { start: 8421, length: 12, convRule: rule92 },
  { start: 8448, length: 2, convRule: rule13 },
  { start: 8450, length: 1, convRule: rule107 },
  { start: 8451, length: 4, convRule: rule13 },
  { start: 8455, length: 1, convRule: rule107 },
  { start: 8456, length: 2, convRule: rule13 },
  { start: 8458, length: 1, convRule: rule20 },
  { start: 8459, length: 3, convRule: rule107 },
  { start: 8462, length: 2, convRule: rule20 },
  { start: 8464, length: 3, convRule: rule107 },
  { start: 8467, length: 1, convRule: rule20 },
  { start: 8468, length: 1, convRule: rule13 },
  { start: 8469, length: 1, convRule: rule107 },
  { start: 8470, length: 2, convRule: rule13 },
  { start: 8472, length: 1, convRule: rule6 },
  { start: 8473, length: 5, convRule: rule107 },
  { start: 8478, length: 6, convRule: rule13 },
  { start: 8484, length: 1, convRule: rule107 },
  { start: 8485, length: 1, convRule: rule13 },
  { start: 8486, length: 1, convRule: rule163 },
  { start: 8487, length: 1, convRule: rule13 },
  { start: 8488, length: 1, convRule: rule107 },
  { start: 8489, length: 1, convRule: rule13 },
  { start: 8490, length: 1, convRule: rule164 },
  { start: 8491, length: 1, convRule: rule165 },
  { start: 8492, length: 2, convRule: rule107 },
  { start: 8494, length: 1, convRule: rule13 },
  { start: 8495, length: 1, convRule: rule20 },
  { start: 8496, length: 2, convRule: rule107 },
  { start: 8498, length: 1, convRule: rule166 },
  { start: 8499, length: 1, convRule: rule107 },
  { start: 8500, length: 1, convRule: rule20 },
  { start: 8501, length: 4, convRule: rule14 },
  { start: 8505, length: 1, convRule: rule20 },
  { start: 8506, length: 2, convRule: rule13 },
  { start: 8508, length: 2, convRule: rule20 },
  { start: 8510, length: 2, convRule: rule107 },
  { start: 8512, length: 5, convRule: rule6 },
  { start: 8517, length: 1, convRule: rule107 },
  { start: 8518, length: 4, convRule: rule20 },
  { start: 8522, length: 1, convRule: rule13 },
  { start: 8523, length: 1, convRule: rule6 },
  { start: 8524, length: 2, convRule: rule13 },
  { start: 8526, length: 1, convRule: rule167 },
  { start: 8527, length: 1, convRule: rule13 },
  { start: 8528, length: 16, convRule: rule17 },
  { start: 8544, length: 16, convRule: rule168 },
  { start: 8560, length: 16, convRule: rule169 },
  { start: 8576, length: 3, convRule: rule128 },
  { start: 8579, length: 1, convRule: rule22 },
  { start: 8580, length: 1, convRule: rule23 },
  { start: 8581, length: 4, convRule: rule128 },
  { start: 8585, length: 1, convRule: rule17 },
  { start: 8586, length: 2, convRule: rule13 },
  { start: 8592, length: 5, convRule: rule6 },
  { start: 8597, length: 5, convRule: rule13 },
  { start: 8602, length: 2, convRule: rule6 },
  { start: 8604, length: 4, convRule: rule13 },
  { start: 8608, length: 1, convRule: rule6 },
  { start: 8609, length: 2, convRule: rule13 },
  { start: 8611, length: 1, convRule: rule6 },
  { start: 8612, length: 2, convRule: rule13 },
  { start: 8614, length: 1, convRule: rule6 },
  { start: 8615, length: 7, convRule: rule13 },
  { start: 8622, length: 1, convRule: rule6 },
  { start: 8623, length: 31, convRule: rule13 },
  { start: 8654, length: 2, convRule: rule6 },
  { start: 8656, length: 2, convRule: rule13 },
  { start: 8658, length: 1, convRule: rule6 },
  { start: 8659, length: 1, convRule: rule13 },
  { start: 8660, length: 1, convRule: rule6 },
  { start: 8661, length: 31, convRule: rule13 },
  { start: 8692, length: 268, convRule: rule6 },
  { start: 8960, length: 8, convRule: rule13 },
  { start: 8968, length: 1, convRule: rule4 },
  { start: 8969, length: 1, convRule: rule5 },
  { start: 8970, length: 1, convRule: rule4 },
  { start: 8971, length: 1, convRule: rule5 },
  { start: 8972, length: 20, convRule: rule13 },
  { start: 8992, length: 2, convRule: rule6 },
  { start: 8994, length: 7, convRule: rule13 },
  { start: 9001, length: 1, convRule: rule4 },
  { start: 9002, length: 1, convRule: rule5 },
  { start: 9003, length: 81, convRule: rule13 },
  { start: 9084, length: 1, convRule: rule6 },
  { start: 9085, length: 30, convRule: rule13 },
  { start: 9115, length: 25, convRule: rule6 },
  { start: 9140, length: 40, convRule: rule13 },
  { start: 9180, length: 6, convRule: rule6 },
  { start: 9186, length: 69, convRule: rule13 },
  { start: 9280, length: 11, convRule: rule13 },
  { start: 9312, length: 60, convRule: rule17 },
  { start: 9372, length: 26, convRule: rule13 },
  { start: 9398, length: 26, convRule: rule170 },
  { start: 9424, length: 26, convRule: rule171 },
  { start: 9450, length: 22, convRule: rule17 },
  { start: 9472, length: 183, convRule: rule13 },
  { start: 9655, length: 1, convRule: rule6 },
  { start: 9656, length: 9, convRule: rule13 },
  { start: 9665, length: 1, convRule: rule6 },
  { start: 9666, length: 54, convRule: rule13 },
  { start: 9720, length: 8, convRule: rule6 },
  { start: 9728, length: 111, convRule: rule13 },
  { start: 9839, length: 1, convRule: rule6 },
  { start: 9840, length: 248, convRule: rule13 },
  { start: 10088, length: 1, convRule: rule4 },
  { start: 10089, length: 1, convRule: rule5 },
  { start: 10090, length: 1, convRule: rule4 },
  { start: 10091, length: 1, convRule: rule5 },
  { start: 10092, length: 1, convRule: rule4 },
  { start: 10093, length: 1, convRule: rule5 },
  { start: 10094, length: 1, convRule: rule4 },
  { start: 10095, length: 1, convRule: rule5 },
  { start: 10096, length: 1, convRule: rule4 },
  { start: 10097, length: 1, convRule: rule5 },
  { start: 10098, length: 1, convRule: rule4 },
  { start: 10099, length: 1, convRule: rule5 },
  { start: 10100, length: 1, convRule: rule4 },
  { start: 10101, length: 1, convRule: rule5 },
  { start: 10102, length: 30, convRule: rule17 },
  { start: 10132, length: 44, convRule: rule13 },
  { start: 10176, length: 5, convRule: rule6 },
  { start: 10181, length: 1, convRule: rule4 },
  { start: 10182, length: 1, convRule: rule5 },
  { start: 10183, length: 31, convRule: rule6 },
  { start: 10214, length: 1, convRule: rule4 },
  { start: 10215, length: 1, convRule: rule5 },
  { start: 10216, length: 1, convRule: rule4 },
  { start: 10217, length: 1, convRule: rule5 },
  { start: 10218, length: 1, convRule: rule4 },
  { start: 10219, length: 1, convRule: rule5 },
  { start: 10220, length: 1, convRule: rule4 },
  { start: 10221, length: 1, convRule: rule5 },
  { start: 10222, length: 1, convRule: rule4 },
  { start: 10223, length: 1, convRule: rule5 },
  { start: 10224, length: 16, convRule: rule6 },
  { start: 10240, length: 256, convRule: rule13 },
  { start: 10496, length: 131, convRule: rule6 },
  { start: 10627, length: 1, convRule: rule4 },
  { start: 10628, length: 1, convRule: rule5 },
  { start: 10629, length: 1, convRule: rule4 },
  { start: 10630, length: 1, convRule: rule5 },
  { start: 10631, length: 1, convRule: rule4 },
  { start: 10632, length: 1, convRule: rule5 },
  { start: 10633, length: 1, convRule: rule4 },
  { start: 10634, length: 1, convRule: rule5 },
  { start: 10635, length: 1, convRule: rule4 },
  { start: 10636, length: 1, convRule: rule5 },
  { start: 10637, length: 1, convRule: rule4 },
  { start: 10638, length: 1, convRule: rule5 },
  { start: 10639, length: 1, convRule: rule4 },
  { start: 10640, length: 1, convRule: rule5 },
  { start: 10641, length: 1, convRule: rule4 },
  { start: 10642, length: 1, convRule: rule5 },
  { start: 10643, length: 1, convRule: rule4 },
  { start: 10644, length: 1, convRule: rule5 },
  { start: 10645, length: 1, convRule: rule4 },
  { start: 10646, length: 1, convRule: rule5 },
  { start: 10647, length: 1, convRule: rule4 },
  { start: 10648, length: 1, convRule: rule5 },
  { start: 10649, length: 63, convRule: rule6 },
  { start: 10712, length: 1, convRule: rule4 },
  { start: 10713, length: 1, convRule: rule5 },
  { start: 10714, length: 1, convRule: rule4 },
  { start: 10715, length: 1, convRule: rule5 },
  { start: 10716, length: 32, convRule: rule6 },
  { start: 10748, length: 1, convRule: rule4 },
  { start: 10749, length: 1, convRule: rule5 },
  { start: 10750, length: 258, convRule: rule6 },
  { start: 11008, length: 48, convRule: rule13 },
  { start: 11056, length: 21, convRule: rule6 },
  { start: 11077, length: 2, convRule: rule13 },
  { start: 11079, length: 6, convRule: rule6 },
  { start: 11085, length: 39, convRule: rule13 },
  { start: 11126, length: 32, convRule: rule13 },
  { start: 11159, length: 105, convRule: rule13 },
  { start: 11264, length: 47, convRule: rule122 },
  { start: 11312, length: 47, convRule: rule123 },
  { start: 11360, length: 1, convRule: rule22 },
  { start: 11361, length: 1, convRule: rule23 },
  { start: 11362, length: 1, convRule: rule172 },
  { start: 11363, length: 1, convRule: rule173 },
  { start: 11364, length: 1, convRule: rule174 },
  { start: 11365, length: 1, convRule: rule175 },
  { start: 11366, length: 1, convRule: rule176 },
  { start: 11367, length: 1, convRule: rule22 },
  { start: 11368, length: 1, convRule: rule23 },
  { start: 11369, length: 1, convRule: rule22 },
  { start: 11370, length: 1, convRule: rule23 },
  { start: 11371, length: 1, convRule: rule22 },
  { start: 11372, length: 1, convRule: rule23 },
  { start: 11373, length: 1, convRule: rule177 },
  { start: 11374, length: 1, convRule: rule178 },
  { start: 11375, length: 1, convRule: rule179 },
  { start: 11376, length: 1, convRule: rule180 },
  { start: 11377, length: 1, convRule: rule20 },
  { start: 11378, length: 1, convRule: rule22 },
  { start: 11379, length: 1, convRule: rule23 },
  { start: 11380, length: 1, convRule: rule20 },
  { start: 11381, length: 1, convRule: rule22 },
  { start: 11382, length: 1, convRule: rule23 },
  { start: 11383, length: 5, convRule: rule20 },
  { start: 11388, length: 2, convRule: rule91 },
  { start: 11390, length: 2, convRule: rule181 },
  { start: 11392, length: 1, convRule: rule22 },
  { start: 11393, length: 1, convRule: rule23 },
  { start: 11394, length: 1, convRule: rule22 },
  { start: 11395, length: 1, convRule: rule23 },
  { start: 11396, length: 1, convRule: rule22 },
  { start: 11397, length: 1, convRule: rule23 },
  { start: 11398, length: 1, convRule: rule22 },
  { start: 11399, length: 1, convRule: rule23 },
  { start: 11400, length: 1, convRule: rule22 },
  { start: 11401, length: 1, convRule: rule23 },
  { start: 11402, length: 1, convRule: rule22 },
  { start: 11403, length: 1, convRule: rule23 },
  { start: 11404, length: 1, convRule: rule22 },
  { start: 11405, length: 1, convRule: rule23 },
  { start: 11406, length: 1, convRule: rule22 },
  { start: 11407, length: 1, convRule: rule23 },
  { start: 11408, length: 1, convRule: rule22 },
  { start: 11409, length: 1, convRule: rule23 },
  { start: 11410, length: 1, convRule: rule22 },
  { start: 11411, length: 1, convRule: rule23 },
  { start: 11412, length: 1, convRule: rule22 },
  { start: 11413, length: 1, convRule: rule23 },
  { start: 11414, length: 1, convRule: rule22 },
  { start: 11415, length: 1, convRule: rule23 },
  { start: 11416, length: 1, convRule: rule22 },
  { start: 11417, length: 1, convRule: rule23 },
  { start: 11418, length: 1, convRule: rule22 },
  { start: 11419, length: 1, convRule: rule23 },
  { start: 11420, length: 1, convRule: rule22 },
  { start: 11421, length: 1, convRule: rule23 },
  { start: 11422, length: 1, convRule: rule22 },
  { start: 11423, length: 1, convRule: rule23 },
  { start: 11424, length: 1, convRule: rule22 },
  { start: 11425, length: 1, convRule: rule23 },
  { start: 11426, length: 1, convRule: rule22 },
  { start: 11427, length: 1, convRule: rule23 },
  { start: 11428, length: 1, convRule: rule22 },
  { start: 11429, length: 1, convRule: rule23 },
  { start: 11430, length: 1, convRule: rule22 },
  { start: 11431, length: 1, convRule: rule23 },
  { start: 11432, length: 1, convRule: rule22 },
  { start: 11433, length: 1, convRule: rule23 },
  { start: 11434, length: 1, convRule: rule22 },
  { start: 11435, length: 1, convRule: rule23 },
  { start: 11436, length: 1, convRule: rule22 },
  { start: 11437, length: 1, convRule: rule23 },
  { start: 11438, length: 1, convRule: rule22 },
  { start: 11439, length: 1, convRule: rule23 },
  { start: 11440, length: 1, convRule: rule22 },
  { start: 11441, length: 1, convRule: rule23 },
  { start: 11442, length: 1, convRule: rule22 },
  { start: 11443, length: 1, convRule: rule23 },
  { start: 11444, length: 1, convRule: rule22 },
  { start: 11445, length: 1, convRule: rule23 },
  { start: 11446, length: 1, convRule: rule22 },
  { start: 11447, length: 1, convRule: rule23 },
  { start: 11448, length: 1, convRule: rule22 },
  { start: 11449, length: 1, convRule: rule23 },
  { start: 11450, length: 1, convRule: rule22 },
  { start: 11451, length: 1, convRule: rule23 },
  { start: 11452, length: 1, convRule: rule22 },
  { start: 11453, length: 1, convRule: rule23 },
  { start: 11454, length: 1, convRule: rule22 },
  { start: 11455, length: 1, convRule: rule23 },
  { start: 11456, length: 1, convRule: rule22 },
  { start: 11457, length: 1, convRule: rule23 },
  { start: 11458, length: 1, convRule: rule22 },
  { start: 11459, length: 1, convRule: rule23 },
  { start: 11460, length: 1, convRule: rule22 },
  { start: 11461, length: 1, convRule: rule23 },
  { start: 11462, length: 1, convRule: rule22 },
  { start: 11463, length: 1, convRule: rule23 },
  { start: 11464, length: 1, convRule: rule22 },
  { start: 11465, length: 1, convRule: rule23 },
  { start: 11466, length: 1, convRule: rule22 },
  { start: 11467, length: 1, convRule: rule23 },
  { start: 11468, length: 1, convRule: rule22 },
  { start: 11469, length: 1, convRule: rule23 },
  { start: 11470, length: 1, convRule: rule22 },
  { start: 11471, length: 1, convRule: rule23 },
  { start: 11472, length: 1, convRule: rule22 },
  { start: 11473, length: 1, convRule: rule23 },
  { start: 11474, length: 1, convRule: rule22 },
  { start: 11475, length: 1, convRule: rule23 },
  { start: 11476, length: 1, convRule: rule22 },
  { start: 11477, length: 1, convRule: rule23 },
  { start: 11478, length: 1, convRule: rule22 },
  { start: 11479, length: 1, convRule: rule23 },
  { start: 11480, length: 1, convRule: rule22 },
  { start: 11481, length: 1, convRule: rule23 },
  { start: 11482, length: 1, convRule: rule22 },
  { start: 11483, length: 1, convRule: rule23 },
  { start: 11484, length: 1, convRule: rule22 },
  { start: 11485, length: 1, convRule: rule23 },
  { start: 11486, length: 1, convRule: rule22 },
  { start: 11487, length: 1, convRule: rule23 },
  { start: 11488, length: 1, convRule: rule22 },
  { start: 11489, length: 1, convRule: rule23 },
  { start: 11490, length: 1, convRule: rule22 },
  { start: 11491, length: 1, convRule: rule23 },
  { start: 11492, length: 1, convRule: rule20 },
  { start: 11493, length: 6, convRule: rule13 },
  { start: 11499, length: 1, convRule: rule22 },
  { start: 11500, length: 1, convRule: rule23 },
  { start: 11501, length: 1, convRule: rule22 },
  { start: 11502, length: 1, convRule: rule23 },
  { start: 11503, length: 3, convRule: rule92 },
  { start: 11506, length: 1, convRule: rule22 },
  { start: 11507, length: 1, convRule: rule23 },
  { start: 11513, length: 4, convRule: rule2 },
  { start: 11517, length: 1, convRule: rule17 },
  { start: 11518, length: 2, convRule: rule2 },
  { start: 11520, length: 38, convRule: rule182 },
  { start: 11559, length: 1, convRule: rule182 },
  { start: 11565, length: 1, convRule: rule182 },
  { start: 11568, length: 56, convRule: rule14 },
  { start: 11631, length: 1, convRule: rule91 },
  { start: 11632, length: 1, convRule: rule2 },
  { start: 11647, length: 1, convRule: rule92 },
  { start: 11648, length: 23, convRule: rule14 },
  { start: 11680, length: 7, convRule: rule14 },
  { start: 11688, length: 7, convRule: rule14 },
  { start: 11696, length: 7, convRule: rule14 },
  { start: 11704, length: 7, convRule: rule14 },
  { start: 11712, length: 7, convRule: rule14 },
  { start: 11720, length: 7, convRule: rule14 },
  { start: 11728, length: 7, convRule: rule14 },
  { start: 11736, length: 7, convRule: rule14 },
  { start: 11744, length: 32, convRule: rule92 },
  { start: 11776, length: 2, convRule: rule2 },
  { start: 11778, length: 1, convRule: rule15 },
  { start: 11779, length: 1, convRule: rule19 },
  { start: 11780, length: 1, convRule: rule15 },
  { start: 11781, length: 1, convRule: rule19 },
  { start: 11782, length: 3, convRule: rule2 },
  { start: 11785, length: 1, convRule: rule15 },
  { start: 11786, length: 1, convRule: rule19 },
  { start: 11787, length: 1, convRule: rule2 },
  { start: 11788, length: 1, convRule: rule15 },
  { start: 11789, length: 1, convRule: rule19 },
  { start: 11790, length: 9, convRule: rule2 },
  { start: 11799, length: 1, convRule: rule7 },
  { start: 11800, length: 2, convRule: rule2 },
  { start: 11802, length: 1, convRule: rule7 },
  { start: 11803, length: 1, convRule: rule2 },
  { start: 11804, length: 1, convRule: rule15 },
  { start: 11805, length: 1, convRule: rule19 },
  { start: 11806, length: 2, convRule: rule2 },
  { start: 11808, length: 1, convRule: rule15 },
  { start: 11809, length: 1, convRule: rule19 },
  { start: 11810, length: 1, convRule: rule4 },
  { start: 11811, length: 1, convRule: rule5 },
  { start: 11812, length: 1, convRule: rule4 },
  { start: 11813, length: 1, convRule: rule5 },
  { start: 11814, length: 1, convRule: rule4 },
  { start: 11815, length: 1, convRule: rule5 },
  { start: 11816, length: 1, convRule: rule4 },
  { start: 11817, length: 1, convRule: rule5 },
  { start: 11818, length: 5, convRule: rule2 },
  { start: 11823, length: 1, convRule: rule91 },
  { start: 11824, length: 10, convRule: rule2 },
  { start: 11834, length: 2, convRule: rule7 },
  { start: 11836, length: 4, convRule: rule2 },
  { start: 11840, length: 1, convRule: rule7 },
  { start: 11841, length: 1, convRule: rule2 },
  { start: 11842, length: 1, convRule: rule4 },
  { start: 11843, length: 13, convRule: rule2 },
  { start: 11856, length: 2, convRule: rule13 },
  { start: 11858, length: 1, convRule: rule2 },
  { start: 11904, length: 26, convRule: rule13 },
  { start: 11931, length: 89, convRule: rule13 },
  { start: 12032, length: 214, convRule: rule13 },
  { start: 12272, length: 12, convRule: rule13 },
  { start: 12288, length: 1, convRule: rule1 },
  { start: 12289, length: 3, convRule: rule2 },
  { start: 12292, length: 1, convRule: rule13 },
  { start: 12293, length: 1, convRule: rule91 },
  { start: 12294, length: 1, convRule: rule14 },
  { start: 12295, length: 1, convRule: rule128 },
  { start: 12296, length: 1, convRule: rule4 },
  { start: 12297, length: 1, convRule: rule5 },
  { start: 12298, length: 1, convRule: rule4 },
  { start: 12299, length: 1, convRule: rule5 },
  { start: 12300, length: 1, convRule: rule4 },
  { start: 12301, length: 1, convRule: rule5 },
  { start: 12302, length: 1, convRule: rule4 },
  { start: 12303, length: 1, convRule: rule5 },
  { start: 12304, length: 1, convRule: rule4 },
  { start: 12305, length: 1, convRule: rule5 },
  { start: 12306, length: 2, convRule: rule13 },
  { start: 12308, length: 1, convRule: rule4 },
  { start: 12309, length: 1, convRule: rule5 },
  { start: 12310, length: 1, convRule: rule4 },
  { start: 12311, length: 1, convRule: rule5 },
  { start: 12312, length: 1, convRule: rule4 },
  { start: 12313, length: 1, convRule: rule5 },
  { start: 12314, length: 1, convRule: rule4 },
  { start: 12315, length: 1, convRule: rule5 },
  { start: 12316, length: 1, convRule: rule7 },
  { start: 12317, length: 1, convRule: rule4 },
  { start: 12318, length: 2, convRule: rule5 },
  { start: 12320, length: 1, convRule: rule13 },
  { start: 12321, length: 9, convRule: rule128 },
  { start: 12330, length: 4, convRule: rule92 },
  { start: 12334, length: 2, convRule: rule124 },
  { start: 12336, length: 1, convRule: rule7 },
  { start: 12337, length: 5, convRule: rule91 },
  { start: 12342, length: 2, convRule: rule13 },
  { start: 12344, length: 3, convRule: rule128 },
  { start: 12347, length: 1, convRule: rule91 },
  { start: 12348, length: 1, convRule: rule14 },
  { start: 12349, length: 1, convRule: rule2 },
  { start: 12350, length: 2, convRule: rule13 },
  { start: 12353, length: 86, convRule: rule14 },
  { start: 12441, length: 2, convRule: rule92 },
  { start: 12443, length: 2, convRule: rule10 },
  { start: 12445, length: 2, convRule: rule91 },
  { start: 12447, length: 1, convRule: rule14 },
  { start: 12448, length: 1, convRule: rule7 },
  { start: 12449, length: 90, convRule: rule14 },
  { start: 12539, length: 1, convRule: rule2 },
  { start: 12540, length: 3, convRule: rule91 },
  { start: 12543, length: 1, convRule: rule14 },
  { start: 12549, length: 43, convRule: rule14 },
  { start: 12593, length: 94, convRule: rule14 },
  { start: 12688, length: 2, convRule: rule13 },
  { start: 12690, length: 4, convRule: rule17 },
  { start: 12694, length: 10, convRule: rule13 },
  { start: 12704, length: 32, convRule: rule14 },
  { start: 12736, length: 36, convRule: rule13 },
  { start: 12784, length: 16, convRule: rule14 },
  { start: 12800, length: 31, convRule: rule13 },
  { start: 12832, length: 10, convRule: rule17 },
  { start: 12842, length: 30, convRule: rule13 },
  { start: 12872, length: 8, convRule: rule17 },
  { start: 12880, length: 1, convRule: rule13 },
  { start: 12881, length: 15, convRule: rule17 },
  { start: 12896, length: 32, convRule: rule13 },
  { start: 12928, length: 10, convRule: rule17 },
  { start: 12938, length: 39, convRule: rule13 },
  { start: 12977, length: 15, convRule: rule17 },
  { start: 12992, length: 320, convRule: rule13 },
  { start: 13312, length: 6592, convRule: rule14 },
  { start: 19904, length: 64, convRule: rule13 },
  { start: 19968, length: 20989, convRule: rule14 },
  { start: 40960, length: 21, convRule: rule14 },
  { start: 40981, length: 1, convRule: rule91 },
  { start: 40982, length: 1143, convRule: rule14 },
  { start: 42128, length: 55, convRule: rule13 },
  { start: 42192, length: 40, convRule: rule14 },
  { start: 42232, length: 6, convRule: rule91 },
  { start: 42238, length: 2, convRule: rule2 },
  { start: 42240, length: 268, convRule: rule14 },
  { start: 42508, length: 1, convRule: rule91 },
  { start: 42509, length: 3, convRule: rule2 },
  { start: 42512, length: 16, convRule: rule14 },
  { start: 42528, length: 10, convRule: rule8 },
  { start: 42538, length: 2, convRule: rule14 },
  { start: 42560, length: 1, convRule: rule22 },
  { start: 42561, length: 1, convRule: rule23 },
  { start: 42562, length: 1, convRule: rule22 },
  { start: 42563, length: 1, convRule: rule23 },
  { start: 42564, length: 1, convRule: rule22 },
  { start: 42565, length: 1, convRule: rule23 },
  { start: 42566, length: 1, convRule: rule22 },
  { start: 42567, length: 1, convRule: rule23 },
  { start: 42568, length: 1, convRule: rule22 },
  { start: 42569, length: 1, convRule: rule23 },
  { start: 42570, length: 1, convRule: rule22 },
  { start: 42571, length: 1, convRule: rule23 },
  { start: 42572, length: 1, convRule: rule22 },
  { start: 42573, length: 1, convRule: rule23 },
  { start: 42574, length: 1, convRule: rule22 },
  { start: 42575, length: 1, convRule: rule23 },
  { start: 42576, length: 1, convRule: rule22 },
  { start: 42577, length: 1, convRule: rule23 },
  { start: 42578, length: 1, convRule: rule22 },
  { start: 42579, length: 1, convRule: rule23 },
  { start: 42580, length: 1, convRule: rule22 },
  { start: 42581, length: 1, convRule: rule23 },
  { start: 42582, length: 1, convRule: rule22 },
  { start: 42583, length: 1, convRule: rule23 },
  { start: 42584, length: 1, convRule: rule22 },
  { start: 42585, length: 1, convRule: rule23 },
  { start: 42586, length: 1, convRule: rule22 },
  { start: 42587, length: 1, convRule: rule23 },
  { start: 42588, length: 1, convRule: rule22 },
  { start: 42589, length: 1, convRule: rule23 },
  { start: 42590, length: 1, convRule: rule22 },
  { start: 42591, length: 1, convRule: rule23 },
  { start: 42592, length: 1, convRule: rule22 },
  { start: 42593, length: 1, convRule: rule23 },
  { start: 42594, length: 1, convRule: rule22 },
  { start: 42595, length: 1, convRule: rule23 },
  { start: 42596, length: 1, convRule: rule22 },
  { start: 42597, length: 1, convRule: rule23 },
  { start: 42598, length: 1, convRule: rule22 },
  { start: 42599, length: 1, convRule: rule23 },
  { start: 42600, length: 1, convRule: rule22 },
  { start: 42601, length: 1, convRule: rule23 },
  { start: 42602, length: 1, convRule: rule22 },
  { start: 42603, length: 1, convRule: rule23 },
  { start: 42604, length: 1, convRule: rule22 },
  { start: 42605, length: 1, convRule: rule23 },
  { start: 42606, length: 1, convRule: rule14 },
  { start: 42607, length: 1, convRule: rule92 },
  { start: 42608, length: 3, convRule: rule119 },
  { start: 42611, length: 1, convRule: rule2 },
  { start: 42612, length: 10, convRule: rule92 },
  { start: 42622, length: 1, convRule: rule2 },
  { start: 42623, length: 1, convRule: rule91 },
  { start: 42624, length: 1, convRule: rule22 },
  { start: 42625, length: 1, convRule: rule23 },
  { start: 42626, length: 1, convRule: rule22 },
  { start: 42627, length: 1, convRule: rule23 },
  { start: 42628, length: 1, convRule: rule22 },
  { start: 42629, length: 1, convRule: rule23 },
  { start: 42630, length: 1, convRule: rule22 },
  { start: 42631, length: 1, convRule: rule23 },
  { start: 42632, length: 1, convRule: rule22 },
  { start: 42633, length: 1, convRule: rule23 },
  { start: 42634, length: 1, convRule: rule22 },
  { start: 42635, length: 1, convRule: rule23 },
  { start: 42636, length: 1, convRule: rule22 },
  { start: 42637, length: 1, convRule: rule23 },
  { start: 42638, length: 1, convRule: rule22 },
  { start: 42639, length: 1, convRule: rule23 },
  { start: 42640, length: 1, convRule: rule22 },
  { start: 42641, length: 1, convRule: rule23 },
  { start: 42642, length: 1, convRule: rule22 },
  { start: 42643, length: 1, convRule: rule23 },
  { start: 42644, length: 1, convRule: rule22 },
  { start: 42645, length: 1, convRule: rule23 },
  { start: 42646, length: 1, convRule: rule22 },
  { start: 42647, length: 1, convRule: rule23 },
  { start: 42648, length: 1, convRule: rule22 },
  { start: 42649, length: 1, convRule: rule23 },
  { start: 42650, length: 1, convRule: rule22 },
  { start: 42651, length: 1, convRule: rule23 },
  { start: 42652, length: 2, convRule: rule91 },
  { start: 42654, length: 2, convRule: rule92 },
  { start: 42656, length: 70, convRule: rule14 },
  { start: 42726, length: 10, convRule: rule128 },
  { start: 42736, length: 2, convRule: rule92 },
  { start: 42738, length: 6, convRule: rule2 },
  { start: 42752, length: 23, convRule: rule10 },
  { start: 42775, length: 9, convRule: rule91 },
  { start: 42784, length: 2, convRule: rule10 },
  { start: 42786, length: 1, convRule: rule22 },
  { start: 42787, length: 1, convRule: rule23 },
  { start: 42788, length: 1, convRule: rule22 },
  { start: 42789, length: 1, convRule: rule23 },
  { start: 42790, length: 1, convRule: rule22 },
  { start: 42791, length: 1, convRule: rule23 },
  { start: 42792, length: 1, convRule: rule22 },
  { start: 42793, length: 1, convRule: rule23 },
  { start: 42794, length: 1, convRule: rule22 },
  { start: 42795, length: 1, convRule: rule23 },
  { start: 42796, length: 1, convRule: rule22 },
  { start: 42797, length: 1, convRule: rule23 },
  { start: 42798, length: 1, convRule: rule22 },
  { start: 42799, length: 1, convRule: rule23 },
  { start: 42800, length: 2, convRule: rule20 },
  { start: 42802, length: 1, convRule: rule22 },
  { start: 42803, length: 1, convRule: rule23 },
  { start: 42804, length: 1, convRule: rule22 },
  { start: 42805, length: 1, convRule: rule23 },
  { start: 42806, length: 1, convRule: rule22 },
  { start: 42807, length: 1, convRule: rule23 },
  { start: 42808, length: 1, convRule: rule22 },
  { start: 42809, length: 1, convRule: rule23 },
  { start: 42810, length: 1, convRule: rule22 },
  { start: 42811, length: 1, convRule: rule23 },
  { start: 42812, length: 1, convRule: rule22 },
  { start: 42813, length: 1, convRule: rule23 },
  { start: 42814, length: 1, convRule: rule22 },
  { start: 42815, length: 1, convRule: rule23 },
  { start: 42816, length: 1, convRule: rule22 },
  { start: 42817, length: 1, convRule: rule23 },
  { start: 42818, length: 1, convRule: rule22 },
  { start: 42819, length: 1, convRule: rule23 },
  { start: 42820, length: 1, convRule: rule22 },
  { start: 42821, length: 1, convRule: rule23 },
  { start: 42822, length: 1, convRule: rule22 },
  { start: 42823, length: 1, convRule: rule23 },
  { start: 42824, length: 1, convRule: rule22 },
  { start: 42825, length: 1, convRule: rule23 },
  { start: 42826, length: 1, convRule: rule22 },
  { start: 42827, length: 1, convRule: rule23 },
  { start: 42828, length: 1, convRule: rule22 },
  { start: 42829, length: 1, convRule: rule23 },
  { start: 42830, length: 1, convRule: rule22 },
  { start: 42831, length: 1, convRule: rule23 },
  { start: 42832, length: 1, convRule: rule22 },
  { start: 42833, length: 1, convRule: rule23 },
  { start: 42834, length: 1, convRule: rule22 },
  { start: 42835, length: 1, convRule: rule23 },
  { start: 42836, length: 1, convRule: rule22 },
  { start: 42837, length: 1, convRule: rule23 },
  { start: 42838, length: 1, convRule: rule22 },
  { start: 42839, length: 1, convRule: rule23 },
  { start: 42840, length: 1, convRule: rule22 },
  { start: 42841, length: 1, convRule: rule23 },
  { start: 42842, length: 1, convRule: rule22 },
  { start: 42843, length: 1, convRule: rule23 },
  { start: 42844, length: 1, convRule: rule22 },
  { start: 42845, length: 1, convRule: rule23 },
  { start: 42846, length: 1, convRule: rule22 },
  { start: 42847, length: 1, convRule: rule23 },
  { start: 42848, length: 1, convRule: rule22 },
  { start: 42849, length: 1, convRule: rule23 },
  { start: 42850, length: 1, convRule: rule22 },
  { start: 42851, length: 1, convRule: rule23 },
  { start: 42852, length: 1, convRule: rule22 },
  { start: 42853, length: 1, convRule: rule23 },
  { start: 42854, length: 1, convRule: rule22 },
  { start: 42855, length: 1, convRule: rule23 },
  { start: 42856, length: 1, convRule: rule22 },
  { start: 42857, length: 1, convRule: rule23 },
  { start: 42858, length: 1, convRule: rule22 },
  { start: 42859, length: 1, convRule: rule23 },
  { start: 42860, length: 1, convRule: rule22 },
  { start: 42861, length: 1, convRule: rule23 },
  { start: 42862, length: 1, convRule: rule22 },
  { start: 42863, length: 1, convRule: rule23 },
  { start: 42864, length: 1, convRule: rule91 },
  { start: 42865, length: 8, convRule: rule20 },
  { start: 42873, length: 1, convRule: rule22 },
  { start: 42874, length: 1, convRule: rule23 },
  { start: 42875, length: 1, convRule: rule22 },
  { start: 42876, length: 1, convRule: rule23 },
  { start: 42877, length: 1, convRule: rule183 },
  { start: 42878, length: 1, convRule: rule22 },
  { start: 42879, length: 1, convRule: rule23 },
  { start: 42880, length: 1, convRule: rule22 },
  { start: 42881, length: 1, convRule: rule23 },
  { start: 42882, length: 1, convRule: rule22 },
  { start: 42883, length: 1, convRule: rule23 },
  { start: 42884, length: 1, convRule: rule22 },
  { start: 42885, length: 1, convRule: rule23 },
  { start: 42886, length: 1, convRule: rule22 },
  { start: 42887, length: 1, convRule: rule23 },
  { start: 42888, length: 1, convRule: rule91 },
  { start: 42889, length: 2, convRule: rule10 },
  { start: 42891, length: 1, convRule: rule22 },
  { start: 42892, length: 1, convRule: rule23 },
  { start: 42893, length: 1, convRule: rule184 },
  { start: 42894, length: 1, convRule: rule20 },
  { start: 42895, length: 1, convRule: rule14 },
  { start: 42896, length: 1, convRule: rule22 },
  { start: 42897, length: 1, convRule: rule23 },
  { start: 42898, length: 1, convRule: rule22 },
  { start: 42899, length: 1, convRule: rule23 },
  { start: 42900, length: 1, convRule: rule185 },
  { start: 42901, length: 1, convRule: rule20 },
  { start: 42902, length: 1, convRule: rule22 },
  { start: 42903, length: 1, convRule: rule23 },
  { start: 42904, length: 1, convRule: rule22 },
  { start: 42905, length: 1, convRule: rule23 },
  { start: 42906, length: 1, convRule: rule22 },
  { start: 42907, length: 1, convRule: rule23 },
  { start: 42908, length: 1, convRule: rule22 },
  { start: 42909, length: 1, convRule: rule23 },
  { start: 42910, length: 1, convRule: rule22 },
  { start: 42911, length: 1, convRule: rule23 },
  { start: 42912, length: 1, convRule: rule22 },
  { start: 42913, length: 1, convRule: rule23 },
  { start: 42914, length: 1, convRule: rule22 },
  { start: 42915, length: 1, convRule: rule23 },
  { start: 42916, length: 1, convRule: rule22 },
  { start: 42917, length: 1, convRule: rule23 },
  { start: 42918, length: 1, convRule: rule22 },
  { start: 42919, length: 1, convRule: rule23 },
  { start: 42920, length: 1, convRule: rule22 },
  { start: 42921, length: 1, convRule: rule23 },
  { start: 42922, length: 1, convRule: rule186 },
  { start: 42923, length: 1, convRule: rule187 },
  { start: 42924, length: 1, convRule: rule188 },
  { start: 42925, length: 1, convRule: rule189 },
  { start: 42926, length: 1, convRule: rule186 },
  { start: 42927, length: 1, convRule: rule20 },
  { start: 42928, length: 1, convRule: rule190 },
  { start: 42929, length: 1, convRule: rule191 },
  { start: 42930, length: 1, convRule: rule192 },
  { start: 42931, length: 1, convRule: rule193 },
  { start: 42932, length: 1, convRule: rule22 },
  { start: 42933, length: 1, convRule: rule23 },
  { start: 42934, length: 1, convRule: rule22 },
  { start: 42935, length: 1, convRule: rule23 },
  { start: 42936, length: 1, convRule: rule22 },
  { start: 42937, length: 1, convRule: rule23 },
  { start: 42938, length: 1, convRule: rule22 },
  { start: 42939, length: 1, convRule: rule23 },
  { start: 42940, length: 1, convRule: rule22 },
  { start: 42941, length: 1, convRule: rule23 },
  { start: 42942, length: 1, convRule: rule22 },
  { start: 42943, length: 1, convRule: rule23 },
  { start: 42946, length: 1, convRule: rule22 },
  { start: 42947, length: 1, convRule: rule23 },
  { start: 42948, length: 1, convRule: rule194 },
  { start: 42949, length: 1, convRule: rule195 },
  { start: 42950, length: 1, convRule: rule196 },
  { start: 42951, length: 1, convRule: rule22 },
  { start: 42952, length: 1, convRule: rule23 },
  { start: 42953, length: 1, convRule: rule22 },
  { start: 42954, length: 1, convRule: rule23 },
  { start: 42997, length: 1, convRule: rule22 },
  { start: 42998, length: 1, convRule: rule23 },
  { start: 42999, length: 1, convRule: rule14 },
  { start: 43e3, length: 2, convRule: rule91 },
  { start: 43002, length: 1, convRule: rule20 },
  { start: 43003, length: 7, convRule: rule14 },
  { start: 43010, length: 1, convRule: rule92 },
  { start: 43011, length: 3, convRule: rule14 },
  { start: 43014, length: 1, convRule: rule92 },
  { start: 43015, length: 4, convRule: rule14 },
  { start: 43019, length: 1, convRule: rule92 },
  { start: 43020, length: 23, convRule: rule14 },
  { start: 43043, length: 2, convRule: rule124 },
  { start: 43045, length: 2, convRule: rule92 },
  { start: 43047, length: 1, convRule: rule124 },
  { start: 43048, length: 4, convRule: rule13 },
  { start: 43052, length: 1, convRule: rule92 },
  { start: 43056, length: 6, convRule: rule17 },
  { start: 43062, length: 2, convRule: rule13 },
  { start: 43064, length: 1, convRule: rule3 },
  { start: 43065, length: 1, convRule: rule13 },
  { start: 43072, length: 52, convRule: rule14 },
  { start: 43124, length: 4, convRule: rule2 },
  { start: 43136, length: 2, convRule: rule124 },
  { start: 43138, length: 50, convRule: rule14 },
  { start: 43188, length: 16, convRule: rule124 },
  { start: 43204, length: 2, convRule: rule92 },
  { start: 43214, length: 2, convRule: rule2 },
  { start: 43216, length: 10, convRule: rule8 },
  { start: 43232, length: 18, convRule: rule92 },
  { start: 43250, length: 6, convRule: rule14 },
  { start: 43256, length: 3, convRule: rule2 },
  { start: 43259, length: 1, convRule: rule14 },
  { start: 43260, length: 1, convRule: rule2 },
  { start: 43261, length: 2, convRule: rule14 },
  { start: 43263, length: 1, convRule: rule92 },
  { start: 43264, length: 10, convRule: rule8 },
  { start: 43274, length: 28, convRule: rule14 },
  { start: 43302, length: 8, convRule: rule92 },
  { start: 43310, length: 2, convRule: rule2 },
  { start: 43312, length: 23, convRule: rule14 },
  { start: 43335, length: 11, convRule: rule92 },
  { start: 43346, length: 2, convRule: rule124 },
  { start: 43359, length: 1, convRule: rule2 },
  { start: 43360, length: 29, convRule: rule14 },
  { start: 43392, length: 3, convRule: rule92 },
  { start: 43395, length: 1, convRule: rule124 },
  { start: 43396, length: 47, convRule: rule14 },
  { start: 43443, length: 1, convRule: rule92 },
  { start: 43444, length: 2, convRule: rule124 },
  { start: 43446, length: 4, convRule: rule92 },
  { start: 43450, length: 2, convRule: rule124 },
  { start: 43452, length: 2, convRule: rule92 },
  { start: 43454, length: 3, convRule: rule124 },
  { start: 43457, length: 13, convRule: rule2 },
  { start: 43471, length: 1, convRule: rule91 },
  { start: 43472, length: 10, convRule: rule8 },
  { start: 43486, length: 2, convRule: rule2 },
  { start: 43488, length: 5, convRule: rule14 },
  { start: 43493, length: 1, convRule: rule92 },
  { start: 43494, length: 1, convRule: rule91 },
  { start: 43495, length: 9, convRule: rule14 },
  { start: 43504, length: 10, convRule: rule8 },
  { start: 43514, length: 5, convRule: rule14 },
  { start: 43520, length: 41, convRule: rule14 },
  { start: 43561, length: 6, convRule: rule92 },
  { start: 43567, length: 2, convRule: rule124 },
  { start: 43569, length: 2, convRule: rule92 },
  { start: 43571, length: 2, convRule: rule124 },
  { start: 43573, length: 2, convRule: rule92 },
  { start: 43584, length: 3, convRule: rule14 },
  { start: 43587, length: 1, convRule: rule92 },
  { start: 43588, length: 8, convRule: rule14 },
  { start: 43596, length: 1, convRule: rule92 },
  { start: 43597, length: 1, convRule: rule124 },
  { start: 43600, length: 10, convRule: rule8 },
  { start: 43612, length: 4, convRule: rule2 },
  { start: 43616, length: 16, convRule: rule14 },
  { start: 43632, length: 1, convRule: rule91 },
  { start: 43633, length: 6, convRule: rule14 },
  { start: 43639, length: 3, convRule: rule13 },
  { start: 43642, length: 1, convRule: rule14 },
  { start: 43643, length: 1, convRule: rule124 },
  { start: 43644, length: 1, convRule: rule92 },
  { start: 43645, length: 1, convRule: rule124 },
  { start: 43646, length: 50, convRule: rule14 },
  { start: 43696, length: 1, convRule: rule92 },
  { start: 43697, length: 1, convRule: rule14 },
  { start: 43698, length: 3, convRule: rule92 },
  { start: 43701, length: 2, convRule: rule14 },
  { start: 43703, length: 2, convRule: rule92 },
  { start: 43705, length: 5, convRule: rule14 },
  { start: 43710, length: 2, convRule: rule92 },
  { start: 43712, length: 1, convRule: rule14 },
  { start: 43713, length: 1, convRule: rule92 },
  { start: 43714, length: 1, convRule: rule14 },
  { start: 43739, length: 2, convRule: rule14 },
  { start: 43741, length: 1, convRule: rule91 },
  { start: 43742, length: 2, convRule: rule2 },
  { start: 43744, length: 11, convRule: rule14 },
  { start: 43755, length: 1, convRule: rule124 },
  { start: 43756, length: 2, convRule: rule92 },
  { start: 43758, length: 2, convRule: rule124 },
  { start: 43760, length: 2, convRule: rule2 },
  { start: 43762, length: 1, convRule: rule14 },
  { start: 43763, length: 2, convRule: rule91 },
  { start: 43765, length: 1, convRule: rule124 },
  { start: 43766, length: 1, convRule: rule92 },
  { start: 43777, length: 6, convRule: rule14 },
  { start: 43785, length: 6, convRule: rule14 },
  { start: 43793, length: 6, convRule: rule14 },
  { start: 43808, length: 7, convRule: rule14 },
  { start: 43816, length: 7, convRule: rule14 },
  { start: 43824, length: 35, convRule: rule20 },
  { start: 43859, length: 1, convRule: rule197 },
  { start: 43860, length: 7, convRule: rule20 },
  { start: 43867, length: 1, convRule: rule10 },
  { start: 43868, length: 4, convRule: rule91 },
  { start: 43872, length: 9, convRule: rule20 },
  { start: 43881, length: 1, convRule: rule91 },
  { start: 43882, length: 2, convRule: rule10 },
  { start: 43888, length: 80, convRule: rule198 },
  { start: 43968, length: 35, convRule: rule14 },
  { start: 44003, length: 2, convRule: rule124 },
  { start: 44005, length: 1, convRule: rule92 },
  { start: 44006, length: 2, convRule: rule124 },
  { start: 44008, length: 1, convRule: rule92 },
  { start: 44009, length: 2, convRule: rule124 },
  { start: 44011, length: 1, convRule: rule2 },
  { start: 44012, length: 1, convRule: rule124 },
  { start: 44013, length: 1, convRule: rule92 },
  { start: 44016, length: 10, convRule: rule8 },
  { start: 44032, length: 11172, convRule: rule14 },
  { start: 55216, length: 23, convRule: rule14 },
  { start: 55243, length: 49, convRule: rule14 },
  { start: 55296, length: 896, convRule: rule199 },
  { start: 56192, length: 128, convRule: rule199 },
  { start: 56320, length: 1024, convRule: rule199 },
  { start: 57344, length: 6400, convRule: rule200 },
  { start: 63744, length: 366, convRule: rule14 },
  { start: 64112, length: 106, convRule: rule14 },
  { start: 64256, length: 7, convRule: rule20 },
  { start: 64275, length: 5, convRule: rule20 },
  { start: 64285, length: 1, convRule: rule14 },
  { start: 64286, length: 1, convRule: rule92 },
  { start: 64287, length: 10, convRule: rule14 },
  { start: 64297, length: 1, convRule: rule6 },
  { start: 64298, length: 13, convRule: rule14 },
  { start: 64312, length: 5, convRule: rule14 },
  { start: 64318, length: 1, convRule: rule14 },
  { start: 64320, length: 2, convRule: rule14 },
  { start: 64323, length: 2, convRule: rule14 },
  { start: 64326, length: 108, convRule: rule14 },
  { start: 64434, length: 16, convRule: rule10 },
  { start: 64467, length: 363, convRule: rule14 },
  { start: 64830, length: 1, convRule: rule5 },
  { start: 64831, length: 1, convRule: rule4 },
  { start: 64848, length: 64, convRule: rule14 },
  { start: 64914, length: 54, convRule: rule14 },
  { start: 65008, length: 12, convRule: rule14 },
  { start: 65020, length: 1, convRule: rule3 },
  { start: 65021, length: 1, convRule: rule13 },
  { start: 65024, length: 16, convRule: rule92 },
  { start: 65040, length: 7, convRule: rule2 },
  { start: 65047, length: 1, convRule: rule4 },
  { start: 65048, length: 1, convRule: rule5 },
  { start: 65049, length: 1, convRule: rule2 },
  { start: 65056, length: 16, convRule: rule92 },
  { start: 65072, length: 1, convRule: rule2 },
  { start: 65073, length: 2, convRule: rule7 },
  { start: 65075, length: 2, convRule: rule11 },
  { start: 65077, length: 1, convRule: rule4 },
  { start: 65078, length: 1, convRule: rule5 },
  { start: 65079, length: 1, convRule: rule4 },
  { start: 65080, length: 1, convRule: rule5 },
  { start: 65081, length: 1, convRule: rule4 },
  { start: 65082, length: 1, convRule: rule5 },
  { start: 65083, length: 1, convRule: rule4 },
  { start: 65084, length: 1, convRule: rule5 },
  { start: 65085, length: 1, convRule: rule4 },
  { start: 65086, length: 1, convRule: rule5 },
  { start: 65087, length: 1, convRule: rule4 },
  { start: 65088, length: 1, convRule: rule5 },
  { start: 65089, length: 1, convRule: rule4 },
  { start: 65090, length: 1, convRule: rule5 },
  { start: 65091, length: 1, convRule: rule4 },
  { start: 65092, length: 1, convRule: rule5 },
  { start: 65093, length: 2, convRule: rule2 },
  { start: 65095, length: 1, convRule: rule4 },
  { start: 65096, length: 1, convRule: rule5 },
  { start: 65097, length: 4, convRule: rule2 },
  { start: 65101, length: 3, convRule: rule11 },
  { start: 65104, length: 3, convRule: rule2 },
  { start: 65108, length: 4, convRule: rule2 },
  { start: 65112, length: 1, convRule: rule7 },
  { start: 65113, length: 1, convRule: rule4 },
  { start: 65114, length: 1, convRule: rule5 },
  { start: 65115, length: 1, convRule: rule4 },
  { start: 65116, length: 1, convRule: rule5 },
  { start: 65117, length: 1, convRule: rule4 },
  { start: 65118, length: 1, convRule: rule5 },
  { start: 65119, length: 3, convRule: rule2 },
  { start: 65122, length: 1, convRule: rule6 },
  { start: 65123, length: 1, convRule: rule7 },
  { start: 65124, length: 3, convRule: rule6 },
  { start: 65128, length: 1, convRule: rule2 },
  { start: 65129, length: 1, convRule: rule3 },
  { start: 65130, length: 2, convRule: rule2 },
  { start: 65136, length: 5, convRule: rule14 },
  { start: 65142, length: 135, convRule: rule14 },
  { start: 65279, length: 1, convRule: rule16 },
  { start: 65281, length: 3, convRule: rule2 },
  { start: 65284, length: 1, convRule: rule3 },
  { start: 65285, length: 3, convRule: rule2 },
  { start: 65288, length: 1, convRule: rule4 },
  { start: 65289, length: 1, convRule: rule5 },
  { start: 65290, length: 1, convRule: rule2 },
  { start: 65291, length: 1, convRule: rule6 },
  { start: 65292, length: 1, convRule: rule2 },
  { start: 65293, length: 1, convRule: rule7 },
  { start: 65294, length: 2, convRule: rule2 },
  { start: 65296, length: 10, convRule: rule8 },
  { start: 65306, length: 2, convRule: rule2 },
  { start: 65308, length: 3, convRule: rule6 },
  { start: 65311, length: 2, convRule: rule2 },
  { start: 65313, length: 26, convRule: rule9 },
  { start: 65339, length: 1, convRule: rule4 },
  { start: 65340, length: 1, convRule: rule2 },
  { start: 65341, length: 1, convRule: rule5 },
  { start: 65342, length: 1, convRule: rule10 },
  { start: 65343, length: 1, convRule: rule11 },
  { start: 65344, length: 1, convRule: rule10 },
  { start: 65345, length: 26, convRule: rule12 },
  { start: 65371, length: 1, convRule: rule4 },
  { start: 65372, length: 1, convRule: rule6 },
  { start: 65373, length: 1, convRule: rule5 },
  { start: 65374, length: 1, convRule: rule6 },
  { start: 65375, length: 1, convRule: rule4 },
  { start: 65376, length: 1, convRule: rule5 },
  { start: 65377, length: 1, convRule: rule2 },
  { start: 65378, length: 1, convRule: rule4 },
  { start: 65379, length: 1, convRule: rule5 },
  { start: 65380, length: 2, convRule: rule2 },
  { start: 65382, length: 10, convRule: rule14 },
  { start: 65392, length: 1, convRule: rule91 },
  { start: 65393, length: 45, convRule: rule14 },
  { start: 65438, length: 2, convRule: rule91 },
  { start: 65440, length: 31, convRule: rule14 },
  { start: 65474, length: 6, convRule: rule14 },
  { start: 65482, length: 6, convRule: rule14 },
  { start: 65490, length: 6, convRule: rule14 },
  { start: 65498, length: 3, convRule: rule14 },
  { start: 65504, length: 2, convRule: rule3 },
  { start: 65506, length: 1, convRule: rule6 },
  { start: 65507, length: 1, convRule: rule10 },
  { start: 65508, length: 1, convRule: rule13 },
  { start: 65509, length: 2, convRule: rule3 },
  { start: 65512, length: 1, convRule: rule13 },
  { start: 65513, length: 4, convRule: rule6 },
  { start: 65517, length: 2, convRule: rule13 },
  { start: 65529, length: 3, convRule: rule16 },
  { start: 65532, length: 2, convRule: rule13 },
  { start: 65536, length: 12, convRule: rule14 },
  { start: 65549, length: 26, convRule: rule14 },
  { start: 65576, length: 19, convRule: rule14 },
  { start: 65596, length: 2, convRule: rule14 },
  { start: 65599, length: 15, convRule: rule14 },
  { start: 65616, length: 14, convRule: rule14 },
  { start: 65664, length: 123, convRule: rule14 },
  { start: 65792, length: 3, convRule: rule2 },
  { start: 65799, length: 45, convRule: rule17 },
  { start: 65847, length: 9, convRule: rule13 },
  { start: 65856, length: 53, convRule: rule128 },
  { start: 65909, length: 4, convRule: rule17 },
  { start: 65913, length: 17, convRule: rule13 },
  { start: 65930, length: 2, convRule: rule17 },
  { start: 65932, length: 3, convRule: rule13 },
  { start: 65936, length: 13, convRule: rule13 },
  { start: 65952, length: 1, convRule: rule13 },
  { start: 66e3, length: 45, convRule: rule13 },
  { start: 66045, length: 1, convRule: rule92 },
  { start: 66176, length: 29, convRule: rule14 },
  { start: 66208, length: 49, convRule: rule14 },
  { start: 66272, length: 1, convRule: rule92 },
  { start: 66273, length: 27, convRule: rule17 },
  { start: 66304, length: 32, convRule: rule14 },
  { start: 66336, length: 4, convRule: rule17 },
  { start: 66349, length: 20, convRule: rule14 },
  { start: 66369, length: 1, convRule: rule128 },
  { start: 66370, length: 8, convRule: rule14 },
  { start: 66378, length: 1, convRule: rule128 },
  { start: 66384, length: 38, convRule: rule14 },
  { start: 66422, length: 5, convRule: rule92 },
  { start: 66432, length: 30, convRule: rule14 },
  { start: 66463, length: 1, convRule: rule2 },
  { start: 66464, length: 36, convRule: rule14 },
  { start: 66504, length: 8, convRule: rule14 },
  { start: 66512, length: 1, convRule: rule2 },
  { start: 66513, length: 5, convRule: rule128 },
  { start: 66560, length: 40, convRule: rule201 },
  { start: 66600, length: 40, convRule: rule202 },
  { start: 66640, length: 78, convRule: rule14 },
  { start: 66720, length: 10, convRule: rule8 },
  { start: 66736, length: 36, convRule: rule201 },
  { start: 66776, length: 36, convRule: rule202 },
  { start: 66816, length: 40, convRule: rule14 },
  { start: 66864, length: 52, convRule: rule14 },
  { start: 66927, length: 1, convRule: rule2 },
  { start: 67072, length: 311, convRule: rule14 },
  { start: 67392, length: 22, convRule: rule14 },
  { start: 67424, length: 8, convRule: rule14 },
  { start: 67584, length: 6, convRule: rule14 },
  { start: 67592, length: 1, convRule: rule14 },
  { start: 67594, length: 44, convRule: rule14 },
  { start: 67639, length: 2, convRule: rule14 },
  { start: 67644, length: 1, convRule: rule14 },
  { start: 67647, length: 23, convRule: rule14 },
  { start: 67671, length: 1, convRule: rule2 },
  { start: 67672, length: 8, convRule: rule17 },
  { start: 67680, length: 23, convRule: rule14 },
  { start: 67703, length: 2, convRule: rule13 },
  { start: 67705, length: 7, convRule: rule17 },
  { start: 67712, length: 31, convRule: rule14 },
  { start: 67751, length: 9, convRule: rule17 },
  { start: 67808, length: 19, convRule: rule14 },
  { start: 67828, length: 2, convRule: rule14 },
  { start: 67835, length: 5, convRule: rule17 },
  { start: 67840, length: 22, convRule: rule14 },
  { start: 67862, length: 6, convRule: rule17 },
  { start: 67871, length: 1, convRule: rule2 },
  { start: 67872, length: 26, convRule: rule14 },
  { start: 67903, length: 1, convRule: rule2 },
  { start: 67968, length: 56, convRule: rule14 },
  { start: 68028, length: 2, convRule: rule17 },
  { start: 68030, length: 2, convRule: rule14 },
  { start: 68032, length: 16, convRule: rule17 },
  { start: 68050, length: 46, convRule: rule17 },
  { start: 68096, length: 1, convRule: rule14 },
  { start: 68097, length: 3, convRule: rule92 },
  { start: 68101, length: 2, convRule: rule92 },
  { start: 68108, length: 4, convRule: rule92 },
  { start: 68112, length: 4, convRule: rule14 },
  { start: 68117, length: 3, convRule: rule14 },
  { start: 68121, length: 29, convRule: rule14 },
  { start: 68152, length: 3, convRule: rule92 },
  { start: 68159, length: 1, convRule: rule92 },
  { start: 68160, length: 9, convRule: rule17 },
  { start: 68176, length: 9, convRule: rule2 },
  { start: 68192, length: 29, convRule: rule14 },
  { start: 68221, length: 2, convRule: rule17 },
  { start: 68223, length: 1, convRule: rule2 },
  { start: 68224, length: 29, convRule: rule14 },
  { start: 68253, length: 3, convRule: rule17 },
  { start: 68288, length: 8, convRule: rule14 },
  { start: 68296, length: 1, convRule: rule13 },
  { start: 68297, length: 28, convRule: rule14 },
  { start: 68325, length: 2, convRule: rule92 },
  { start: 68331, length: 5, convRule: rule17 },
  { start: 68336, length: 7, convRule: rule2 },
  { start: 68352, length: 54, convRule: rule14 },
  { start: 68409, length: 7, convRule: rule2 },
  { start: 68416, length: 22, convRule: rule14 },
  { start: 68440, length: 8, convRule: rule17 },
  { start: 68448, length: 19, convRule: rule14 },
  { start: 68472, length: 8, convRule: rule17 },
  { start: 68480, length: 18, convRule: rule14 },
  { start: 68505, length: 4, convRule: rule2 },
  { start: 68521, length: 7, convRule: rule17 },
  { start: 68608, length: 73, convRule: rule14 },
  { start: 68736, length: 51, convRule: rule97 },
  { start: 68800, length: 51, convRule: rule102 },
  { start: 68858, length: 6, convRule: rule17 },
  { start: 68864, length: 36, convRule: rule14 },
  { start: 68900, length: 4, convRule: rule92 },
  { start: 68912, length: 10, convRule: rule8 },
  { start: 69216, length: 31, convRule: rule17 },
  { start: 69248, length: 42, convRule: rule14 },
  { start: 69291, length: 2, convRule: rule92 },
  { start: 69293, length: 1, convRule: rule7 },
  { start: 69296, length: 2, convRule: rule14 },
  { start: 69376, length: 29, convRule: rule14 },
  { start: 69405, length: 10, convRule: rule17 },
  { start: 69415, length: 1, convRule: rule14 },
  { start: 69424, length: 22, convRule: rule14 },
  { start: 69446, length: 11, convRule: rule92 },
  { start: 69457, length: 4, convRule: rule17 },
  { start: 69461, length: 5, convRule: rule2 },
  { start: 69552, length: 21, convRule: rule14 },
  { start: 69573, length: 7, convRule: rule17 },
  { start: 69600, length: 23, convRule: rule14 },
  { start: 69632, length: 1, convRule: rule124 },
  { start: 69633, length: 1, convRule: rule92 },
  { start: 69634, length: 1, convRule: rule124 },
  { start: 69635, length: 53, convRule: rule14 },
  { start: 69688, length: 15, convRule: rule92 },
  { start: 69703, length: 7, convRule: rule2 },
  { start: 69714, length: 20, convRule: rule17 },
  { start: 69734, length: 10, convRule: rule8 },
  { start: 69759, length: 3, convRule: rule92 },
  { start: 69762, length: 1, convRule: rule124 },
  { start: 69763, length: 45, convRule: rule14 },
  { start: 69808, length: 3, convRule: rule124 },
  { start: 69811, length: 4, convRule: rule92 },
  { start: 69815, length: 2, convRule: rule124 },
  { start: 69817, length: 2, convRule: rule92 },
  { start: 69819, length: 2, convRule: rule2 },
  { start: 69821, length: 1, convRule: rule16 },
  { start: 69822, length: 4, convRule: rule2 },
  { start: 69837, length: 1, convRule: rule16 },
  { start: 69840, length: 25, convRule: rule14 },
  { start: 69872, length: 10, convRule: rule8 },
  { start: 69888, length: 3, convRule: rule92 },
  { start: 69891, length: 36, convRule: rule14 },
  { start: 69927, length: 5, convRule: rule92 },
  { start: 69932, length: 1, convRule: rule124 },
  { start: 69933, length: 8, convRule: rule92 },
  { start: 69942, length: 10, convRule: rule8 },
  { start: 69952, length: 4, convRule: rule2 },
  { start: 69956, length: 1, convRule: rule14 },
  { start: 69957, length: 2, convRule: rule124 },
  { start: 69959, length: 1, convRule: rule14 },
  { start: 69968, length: 35, convRule: rule14 },
  { start: 70003, length: 1, convRule: rule92 },
  { start: 70004, length: 2, convRule: rule2 },
  { start: 70006, length: 1, convRule: rule14 },
  { start: 70016, length: 2, convRule: rule92 },
  { start: 70018, length: 1, convRule: rule124 },
  { start: 70019, length: 48, convRule: rule14 },
  { start: 70067, length: 3, convRule: rule124 },
  { start: 70070, length: 9, convRule: rule92 },
  { start: 70079, length: 2, convRule: rule124 },
  { start: 70081, length: 4, convRule: rule14 },
  { start: 70085, length: 4, convRule: rule2 },
  { start: 70089, length: 4, convRule: rule92 },
  { start: 70093, length: 1, convRule: rule2 },
  { start: 70094, length: 1, convRule: rule124 },
  { start: 70095, length: 1, convRule: rule92 },
  { start: 70096, length: 10, convRule: rule8 },
  { start: 70106, length: 1, convRule: rule14 },
  { start: 70107, length: 1, convRule: rule2 },
  { start: 70108, length: 1, convRule: rule14 },
  { start: 70109, length: 3, convRule: rule2 },
  { start: 70113, length: 20, convRule: rule17 },
  { start: 70144, length: 18, convRule: rule14 },
  { start: 70163, length: 25, convRule: rule14 },
  { start: 70188, length: 3, convRule: rule124 },
  { start: 70191, length: 3, convRule: rule92 },
  { start: 70194, length: 2, convRule: rule124 },
  { start: 70196, length: 1, convRule: rule92 },
  { start: 70197, length: 1, convRule: rule124 },
  { start: 70198, length: 2, convRule: rule92 },
  { start: 70200, length: 6, convRule: rule2 },
  { start: 70206, length: 1, convRule: rule92 },
  { start: 70272, length: 7, convRule: rule14 },
  { start: 70280, length: 1, convRule: rule14 },
  { start: 70282, length: 4, convRule: rule14 },
  { start: 70287, length: 15, convRule: rule14 },
  { start: 70303, length: 10, convRule: rule14 },
  { start: 70313, length: 1, convRule: rule2 },
  { start: 70320, length: 47, convRule: rule14 },
  { start: 70367, length: 1, convRule: rule92 },
  { start: 70368, length: 3, convRule: rule124 },
  { start: 70371, length: 8, convRule: rule92 },
  { start: 70384, length: 10, convRule: rule8 },
  { start: 70400, length: 2, convRule: rule92 },
  { start: 70402, length: 2, convRule: rule124 },
  { start: 70405, length: 8, convRule: rule14 },
  { start: 70415, length: 2, convRule: rule14 },
  { start: 70419, length: 22, convRule: rule14 },
  { start: 70442, length: 7, convRule: rule14 },
  { start: 70450, length: 2, convRule: rule14 },
  { start: 70453, length: 5, convRule: rule14 },
  { start: 70459, length: 2, convRule: rule92 },
  { start: 70461, length: 1, convRule: rule14 },
  { start: 70462, length: 2, convRule: rule124 },
  { start: 70464, length: 1, convRule: rule92 },
  { start: 70465, length: 4, convRule: rule124 },
  { start: 70471, length: 2, convRule: rule124 },
  { start: 70475, length: 3, convRule: rule124 },
  { start: 70480, length: 1, convRule: rule14 },
  { start: 70487, length: 1, convRule: rule124 },
  { start: 70493, length: 5, convRule: rule14 },
  { start: 70498, length: 2, convRule: rule124 },
  { start: 70502, length: 7, convRule: rule92 },
  { start: 70512, length: 5, convRule: rule92 },
  { start: 70656, length: 53, convRule: rule14 },
  { start: 70709, length: 3, convRule: rule124 },
  { start: 70712, length: 8, convRule: rule92 },
  { start: 70720, length: 2, convRule: rule124 },
  { start: 70722, length: 3, convRule: rule92 },
  { start: 70725, length: 1, convRule: rule124 },
  { start: 70726, length: 1, convRule: rule92 },
  { start: 70727, length: 4, convRule: rule14 },
  { start: 70731, length: 5, convRule: rule2 },
  { start: 70736, length: 10, convRule: rule8 },
  { start: 70746, length: 2, convRule: rule2 },
  { start: 70749, length: 1, convRule: rule2 },
  { start: 70750, length: 1, convRule: rule92 },
  { start: 70751, length: 3, convRule: rule14 },
  { start: 70784, length: 48, convRule: rule14 },
  { start: 70832, length: 3, convRule: rule124 },
  { start: 70835, length: 6, convRule: rule92 },
  { start: 70841, length: 1, convRule: rule124 },
  { start: 70842, length: 1, convRule: rule92 },
  { start: 70843, length: 4, convRule: rule124 },
  { start: 70847, length: 2, convRule: rule92 },
  { start: 70849, length: 1, convRule: rule124 },
  { start: 70850, length: 2, convRule: rule92 },
  { start: 70852, length: 2, convRule: rule14 },
  { start: 70854, length: 1, convRule: rule2 },
  { start: 70855, length: 1, convRule: rule14 },
  { start: 70864, length: 10, convRule: rule8 },
  { start: 71040, length: 47, convRule: rule14 },
  { start: 71087, length: 3, convRule: rule124 },
  { start: 71090, length: 4, convRule: rule92 },
  { start: 71096, length: 4, convRule: rule124 },
  { start: 71100, length: 2, convRule: rule92 },
  { start: 71102, length: 1, convRule: rule124 },
  { start: 71103, length: 2, convRule: rule92 },
  { start: 71105, length: 23, convRule: rule2 },
  { start: 71128, length: 4, convRule: rule14 },
  { start: 71132, length: 2, convRule: rule92 },
  { start: 71168, length: 48, convRule: rule14 },
  { start: 71216, length: 3, convRule: rule124 },
  { start: 71219, length: 8, convRule: rule92 },
  { start: 71227, length: 2, convRule: rule124 },
  { start: 71229, length: 1, convRule: rule92 },
  { start: 71230, length: 1, convRule: rule124 },
  { start: 71231, length: 2, convRule: rule92 },
  { start: 71233, length: 3, convRule: rule2 },
  { start: 71236, length: 1, convRule: rule14 },
  { start: 71248, length: 10, convRule: rule8 },
  { start: 71264, length: 13, convRule: rule2 },
  { start: 71296, length: 43, convRule: rule14 },
  { start: 71339, length: 1, convRule: rule92 },
  { start: 71340, length: 1, convRule: rule124 },
  { start: 71341, length: 1, convRule: rule92 },
  { start: 71342, length: 2, convRule: rule124 },
  { start: 71344, length: 6, convRule: rule92 },
  { start: 71350, length: 1, convRule: rule124 },
  { start: 71351, length: 1, convRule: rule92 },
  { start: 71352, length: 1, convRule: rule14 },
  { start: 71360, length: 10, convRule: rule8 },
  { start: 71424, length: 27, convRule: rule14 },
  { start: 71453, length: 3, convRule: rule92 },
  { start: 71456, length: 2, convRule: rule124 },
  { start: 71458, length: 4, convRule: rule92 },
  { start: 71462, length: 1, convRule: rule124 },
  { start: 71463, length: 5, convRule: rule92 },
  { start: 71472, length: 10, convRule: rule8 },
  { start: 71482, length: 2, convRule: rule17 },
  { start: 71484, length: 3, convRule: rule2 },
  { start: 71487, length: 1, convRule: rule13 },
  { start: 71680, length: 44, convRule: rule14 },
  { start: 71724, length: 3, convRule: rule124 },
  { start: 71727, length: 9, convRule: rule92 },
  { start: 71736, length: 1, convRule: rule124 },
  { start: 71737, length: 2, convRule: rule92 },
  { start: 71739, length: 1, convRule: rule2 },
  { start: 71840, length: 32, convRule: rule9 },
  { start: 71872, length: 32, convRule: rule12 },
  { start: 71904, length: 10, convRule: rule8 },
  { start: 71914, length: 9, convRule: rule17 },
  { start: 71935, length: 8, convRule: rule14 },
  { start: 71945, length: 1, convRule: rule14 },
  { start: 71948, length: 8, convRule: rule14 },
  { start: 71957, length: 2, convRule: rule14 },
  { start: 71960, length: 24, convRule: rule14 },
  { start: 71984, length: 6, convRule: rule124 },
  { start: 71991, length: 2, convRule: rule124 },
  { start: 71995, length: 2, convRule: rule92 },
  { start: 71997, length: 1, convRule: rule124 },
  { start: 71998, length: 1, convRule: rule92 },
  { start: 71999, length: 1, convRule: rule14 },
  { start: 72e3, length: 1, convRule: rule124 },
  { start: 72001, length: 1, convRule: rule14 },
  { start: 72002, length: 1, convRule: rule124 },
  { start: 72003, length: 1, convRule: rule92 },
  { start: 72004, length: 3, convRule: rule2 },
  { start: 72016, length: 10, convRule: rule8 },
  { start: 72096, length: 8, convRule: rule14 },
  { start: 72106, length: 39, convRule: rule14 },
  { start: 72145, length: 3, convRule: rule124 },
  { start: 72148, length: 4, convRule: rule92 },
  { start: 72154, length: 2, convRule: rule92 },
  { start: 72156, length: 4, convRule: rule124 },
  { start: 72160, length: 1, convRule: rule92 },
  { start: 72161, length: 1, convRule: rule14 },
  { start: 72162, length: 1, convRule: rule2 },
  { start: 72163, length: 1, convRule: rule14 },
  { start: 72164, length: 1, convRule: rule124 },
  { start: 72192, length: 1, convRule: rule14 },
  { start: 72193, length: 10, convRule: rule92 },
  { start: 72203, length: 40, convRule: rule14 },
  { start: 72243, length: 6, convRule: rule92 },
  { start: 72249, length: 1, convRule: rule124 },
  { start: 72250, length: 1, convRule: rule14 },
  { start: 72251, length: 4, convRule: rule92 },
  { start: 72255, length: 8, convRule: rule2 },
  { start: 72263, length: 1, convRule: rule92 },
  { start: 72272, length: 1, convRule: rule14 },
  { start: 72273, length: 6, convRule: rule92 },
  { start: 72279, length: 2, convRule: rule124 },
  { start: 72281, length: 3, convRule: rule92 },
  { start: 72284, length: 46, convRule: rule14 },
  { start: 72330, length: 13, convRule: rule92 },
  { start: 72343, length: 1, convRule: rule124 },
  { start: 72344, length: 2, convRule: rule92 },
  { start: 72346, length: 3, convRule: rule2 },
  { start: 72349, length: 1, convRule: rule14 },
  { start: 72350, length: 5, convRule: rule2 },
  { start: 72384, length: 57, convRule: rule14 },
  { start: 72704, length: 9, convRule: rule14 },
  { start: 72714, length: 37, convRule: rule14 },
  { start: 72751, length: 1, convRule: rule124 },
  { start: 72752, length: 7, convRule: rule92 },
  { start: 72760, length: 6, convRule: rule92 },
  { start: 72766, length: 1, convRule: rule124 },
  { start: 72767, length: 1, convRule: rule92 },
  { start: 72768, length: 1, convRule: rule14 },
  { start: 72769, length: 5, convRule: rule2 },
  { start: 72784, length: 10, convRule: rule8 },
  { start: 72794, length: 19, convRule: rule17 },
  { start: 72816, length: 2, convRule: rule2 },
  { start: 72818, length: 30, convRule: rule14 },
  { start: 72850, length: 22, convRule: rule92 },
  { start: 72873, length: 1, convRule: rule124 },
  { start: 72874, length: 7, convRule: rule92 },
  { start: 72881, length: 1, convRule: rule124 },
  { start: 72882, length: 2, convRule: rule92 },
  { start: 72884, length: 1, convRule: rule124 },
  { start: 72885, length: 2, convRule: rule92 },
  { start: 72960, length: 7, convRule: rule14 },
  { start: 72968, length: 2, convRule: rule14 },
  { start: 72971, length: 38, convRule: rule14 },
  { start: 73009, length: 6, convRule: rule92 },
  { start: 73018, length: 1, convRule: rule92 },
  { start: 73020, length: 2, convRule: rule92 },
  { start: 73023, length: 7, convRule: rule92 },
  { start: 73030, length: 1, convRule: rule14 },
  { start: 73031, length: 1, convRule: rule92 },
  { start: 73040, length: 10, convRule: rule8 },
  { start: 73056, length: 6, convRule: rule14 },
  { start: 73063, length: 2, convRule: rule14 },
  { start: 73066, length: 32, convRule: rule14 },
  { start: 73098, length: 5, convRule: rule124 },
  { start: 73104, length: 2, convRule: rule92 },
  { start: 73107, length: 2, convRule: rule124 },
  { start: 73109, length: 1, convRule: rule92 },
  { start: 73110, length: 1, convRule: rule124 },
  { start: 73111, length: 1, convRule: rule92 },
  { start: 73112, length: 1, convRule: rule14 },
  { start: 73120, length: 10, convRule: rule8 },
  { start: 73440, length: 19, convRule: rule14 },
  { start: 73459, length: 2, convRule: rule92 },
  { start: 73461, length: 2, convRule: rule124 },
  { start: 73463, length: 2, convRule: rule2 },
  { start: 73648, length: 1, convRule: rule14 },
  { start: 73664, length: 21, convRule: rule17 },
  { start: 73685, length: 8, convRule: rule13 },
  { start: 73693, length: 4, convRule: rule3 },
  { start: 73697, length: 17, convRule: rule13 },
  { start: 73727, length: 1, convRule: rule2 },
  { start: 73728, length: 922, convRule: rule14 },
  { start: 74752, length: 111, convRule: rule128 },
  { start: 74864, length: 5, convRule: rule2 },
  { start: 74880, length: 196, convRule: rule14 },
  { start: 77824, length: 1071, convRule: rule14 },
  { start: 78896, length: 9, convRule: rule16 },
  { start: 82944, length: 583, convRule: rule14 },
  { start: 92160, length: 569, convRule: rule14 },
  { start: 92736, length: 31, convRule: rule14 },
  { start: 92768, length: 10, convRule: rule8 },
  { start: 92782, length: 2, convRule: rule2 },
  { start: 92880, length: 30, convRule: rule14 },
  { start: 92912, length: 5, convRule: rule92 },
  { start: 92917, length: 1, convRule: rule2 },
  { start: 92928, length: 48, convRule: rule14 },
  { start: 92976, length: 7, convRule: rule92 },
  { start: 92983, length: 5, convRule: rule2 },
  { start: 92988, length: 4, convRule: rule13 },
  { start: 92992, length: 4, convRule: rule91 },
  { start: 92996, length: 1, convRule: rule2 },
  { start: 92997, length: 1, convRule: rule13 },
  { start: 93008, length: 10, convRule: rule8 },
  { start: 93019, length: 7, convRule: rule17 },
  { start: 93027, length: 21, convRule: rule14 },
  { start: 93053, length: 19, convRule: rule14 },
  { start: 93760, length: 32, convRule: rule9 },
  { start: 93792, length: 32, convRule: rule12 },
  { start: 93824, length: 23, convRule: rule17 },
  { start: 93847, length: 4, convRule: rule2 },
  { start: 93952, length: 75, convRule: rule14 },
  { start: 94031, length: 1, convRule: rule92 },
  { start: 94032, length: 1, convRule: rule14 },
  { start: 94033, length: 55, convRule: rule124 },
  { start: 94095, length: 4, convRule: rule92 },
  { start: 94099, length: 13, convRule: rule91 },
  { start: 94176, length: 2, convRule: rule91 },
  { start: 94178, length: 1, convRule: rule2 },
  { start: 94179, length: 1, convRule: rule91 },
  { start: 94180, length: 1, convRule: rule92 },
  { start: 94192, length: 2, convRule: rule124 },
  { start: 94208, length: 6136, convRule: rule14 },
  { start: 100352, length: 1238, convRule: rule14 },
  { start: 101632, length: 9, convRule: rule14 },
  { start: 110592, length: 287, convRule: rule14 },
  { start: 110928, length: 3, convRule: rule14 },
  { start: 110948, length: 4, convRule: rule14 },
  { start: 110960, length: 396, convRule: rule14 },
  { start: 113664, length: 107, convRule: rule14 },
  { start: 113776, length: 13, convRule: rule14 },
  { start: 113792, length: 9, convRule: rule14 },
  { start: 113808, length: 10, convRule: rule14 },
  { start: 113820, length: 1, convRule: rule13 },
  { start: 113821, length: 2, convRule: rule92 },
  { start: 113823, length: 1, convRule: rule2 },
  { start: 113824, length: 4, convRule: rule16 },
  { start: 118784, length: 246, convRule: rule13 },
  { start: 119040, length: 39, convRule: rule13 },
  { start: 119081, length: 60, convRule: rule13 },
  { start: 119141, length: 2, convRule: rule124 },
  { start: 119143, length: 3, convRule: rule92 },
  { start: 119146, length: 3, convRule: rule13 },
  { start: 119149, length: 6, convRule: rule124 },
  { start: 119155, length: 8, convRule: rule16 },
  { start: 119163, length: 8, convRule: rule92 },
  { start: 119171, length: 2, convRule: rule13 },
  { start: 119173, length: 7, convRule: rule92 },
  { start: 119180, length: 30, convRule: rule13 },
  { start: 119210, length: 4, convRule: rule92 },
  { start: 119214, length: 59, convRule: rule13 },
  { start: 119296, length: 66, convRule: rule13 },
  { start: 119362, length: 3, convRule: rule92 },
  { start: 119365, length: 1, convRule: rule13 },
  { start: 119520, length: 20, convRule: rule17 },
  { start: 119552, length: 87, convRule: rule13 },
  { start: 119648, length: 25, convRule: rule17 },
  { start: 119808, length: 26, convRule: rule107 },
  { start: 119834, length: 26, convRule: rule20 },
  { start: 119860, length: 26, convRule: rule107 },
  { start: 119886, length: 7, convRule: rule20 },
  { start: 119894, length: 18, convRule: rule20 },
  { start: 119912, length: 26, convRule: rule107 },
  { start: 119938, length: 26, convRule: rule20 },
  { start: 119964, length: 1, convRule: rule107 },
  { start: 119966, length: 2, convRule: rule107 },
  { start: 119970, length: 1, convRule: rule107 },
  { start: 119973, length: 2, convRule: rule107 },
  { start: 119977, length: 4, convRule: rule107 },
  { start: 119982, length: 8, convRule: rule107 },
  { start: 119990, length: 4, convRule: rule20 },
  { start: 119995, length: 1, convRule: rule20 },
  { start: 119997, length: 7, convRule: rule20 },
  { start: 120005, length: 11, convRule: rule20 },
  { start: 120016, length: 26, convRule: rule107 },
  { start: 120042, length: 26, convRule: rule20 },
  { start: 120068, length: 2, convRule: rule107 },
  { start: 120071, length: 4, convRule: rule107 },
  { start: 120077, length: 8, convRule: rule107 },
  { start: 120086, length: 7, convRule: rule107 },
  { start: 120094, length: 26, convRule: rule20 },
  { start: 120120, length: 2, convRule: rule107 },
  { start: 120123, length: 4, convRule: rule107 },
  { start: 120128, length: 5, convRule: rule107 },
  { start: 120134, length: 1, convRule: rule107 },
  { start: 120138, length: 7, convRule: rule107 },
  { start: 120146, length: 26, convRule: rule20 },
  { start: 120172, length: 26, convRule: rule107 },
  { start: 120198, length: 26, convRule: rule20 },
  { start: 120224, length: 26, convRule: rule107 },
  { start: 120250, length: 26, convRule: rule20 },
  { start: 120276, length: 26, convRule: rule107 },
  { start: 120302, length: 26, convRule: rule20 },
  { start: 120328, length: 26, convRule: rule107 },
  { start: 120354, length: 26, convRule: rule20 },
  { start: 120380, length: 26, convRule: rule107 },
  { start: 120406, length: 26, convRule: rule20 },
  { start: 120432, length: 26, convRule: rule107 },
  { start: 120458, length: 28, convRule: rule20 },
  { start: 120488, length: 25, convRule: rule107 },
  { start: 120513, length: 1, convRule: rule6 },
  { start: 120514, length: 25, convRule: rule20 },
  { start: 120539, length: 1, convRule: rule6 },
  { start: 120540, length: 6, convRule: rule20 },
  { start: 120546, length: 25, convRule: rule107 },
  { start: 120571, length: 1, convRule: rule6 },
  { start: 120572, length: 25, convRule: rule20 },
  { start: 120597, length: 1, convRule: rule6 },
  { start: 120598, length: 6, convRule: rule20 },
  { start: 120604, length: 25, convRule: rule107 },
  { start: 120629, length: 1, convRule: rule6 },
  { start: 120630, length: 25, convRule: rule20 },
  { start: 120655, length: 1, convRule: rule6 },
  { start: 120656, length: 6, convRule: rule20 },
  { start: 120662, length: 25, convRule: rule107 },
  { start: 120687, length: 1, convRule: rule6 },
  { start: 120688, length: 25, convRule: rule20 },
  { start: 120713, length: 1, convRule: rule6 },
  { start: 120714, length: 6, convRule: rule20 },
  { start: 120720, length: 25, convRule: rule107 },
  { start: 120745, length: 1, convRule: rule6 },
  { start: 120746, length: 25, convRule: rule20 },
  { start: 120771, length: 1, convRule: rule6 },
  { start: 120772, length: 6, convRule: rule20 },
  { start: 120778, length: 1, convRule: rule107 },
  { start: 120779, length: 1, convRule: rule20 },
  { start: 120782, length: 50, convRule: rule8 },
  { start: 120832, length: 512, convRule: rule13 },
  { start: 121344, length: 55, convRule: rule92 },
  { start: 121399, length: 4, convRule: rule13 },
  { start: 121403, length: 50, convRule: rule92 },
  { start: 121453, length: 8, convRule: rule13 },
  { start: 121461, length: 1, convRule: rule92 },
  { start: 121462, length: 14, convRule: rule13 },
  { start: 121476, length: 1, convRule: rule92 },
  { start: 121477, length: 2, convRule: rule13 },
  { start: 121479, length: 5, convRule: rule2 },
  { start: 121499, length: 5, convRule: rule92 },
  { start: 121505, length: 15, convRule: rule92 },
  { start: 122880, length: 7, convRule: rule92 },
  { start: 122888, length: 17, convRule: rule92 },
  { start: 122907, length: 7, convRule: rule92 },
  { start: 122915, length: 2, convRule: rule92 },
  { start: 122918, length: 5, convRule: rule92 },
  { start: 123136, length: 45, convRule: rule14 },
  { start: 123184, length: 7, convRule: rule92 },
  { start: 123191, length: 7, convRule: rule91 },
  { start: 123200, length: 10, convRule: rule8 },
  { start: 123214, length: 1, convRule: rule14 },
  { start: 123215, length: 1, convRule: rule13 },
  { start: 123584, length: 44, convRule: rule14 },
  { start: 123628, length: 4, convRule: rule92 },
  { start: 123632, length: 10, convRule: rule8 },
  { start: 123647, length: 1, convRule: rule3 },
  { start: 124928, length: 197, convRule: rule14 },
  { start: 125127, length: 9, convRule: rule17 },
  { start: 125136, length: 7, convRule: rule92 },
  { start: 125184, length: 34, convRule: rule203 },
  { start: 125218, length: 34, convRule: rule204 },
  { start: 125252, length: 7, convRule: rule92 },
  { start: 125259, length: 1, convRule: rule91 },
  { start: 125264, length: 10, convRule: rule8 },
  { start: 125278, length: 2, convRule: rule2 },
  { start: 126065, length: 59, convRule: rule17 },
  { start: 126124, length: 1, convRule: rule13 },
  { start: 126125, length: 3, convRule: rule17 },
  { start: 126128, length: 1, convRule: rule3 },
  { start: 126129, length: 4, convRule: rule17 },
  { start: 126209, length: 45, convRule: rule17 },
  { start: 126254, length: 1, convRule: rule13 },
  { start: 126255, length: 15, convRule: rule17 },
  { start: 126464, length: 4, convRule: rule14 },
  { start: 126469, length: 27, convRule: rule14 },
  { start: 126497, length: 2, convRule: rule14 },
  { start: 126500, length: 1, convRule: rule14 },
  { start: 126503, length: 1, convRule: rule14 },
  { start: 126505, length: 10, convRule: rule14 },
  { start: 126516, length: 4, convRule: rule14 },
  { start: 126521, length: 1, convRule: rule14 },
  { start: 126523, length: 1, convRule: rule14 },
  { start: 126530, length: 1, convRule: rule14 },
  { start: 126535, length: 1, convRule: rule14 },
  { start: 126537, length: 1, convRule: rule14 },
  { start: 126539, length: 1, convRule: rule14 },
  { start: 126541, length: 3, convRule: rule14 },
  { start: 126545, length: 2, convRule: rule14 },
  { start: 126548, length: 1, convRule: rule14 },
  { start: 126551, length: 1, convRule: rule14 },
  { start: 126553, length: 1, convRule: rule14 },
  { start: 126555, length: 1, convRule: rule14 },
  { start: 126557, length: 1, convRule: rule14 },
  { start: 126559, length: 1, convRule: rule14 },
  { start: 126561, length: 2, convRule: rule14 },
  { start: 126564, length: 1, convRule: rule14 },
  { start: 126567, length: 4, convRule: rule14 },
  { start: 126572, length: 7, convRule: rule14 },
  { start: 126580, length: 4, convRule: rule14 },
  { start: 126585, length: 4, convRule: rule14 },
  { start: 126590, length: 1, convRule: rule14 },
  { start: 126592, length: 10, convRule: rule14 },
  { start: 126603, length: 17, convRule: rule14 },
  { start: 126625, length: 3, convRule: rule14 },
  { start: 126629, length: 5, convRule: rule14 },
  { start: 126635, length: 17, convRule: rule14 },
  { start: 126704, length: 2, convRule: rule6 },
  { start: 126976, length: 44, convRule: rule13 },
  { start: 127024, length: 100, convRule: rule13 },
  { start: 127136, length: 15, convRule: rule13 },
  { start: 127153, length: 15, convRule: rule13 },
  { start: 127169, length: 15, convRule: rule13 },
  { start: 127185, length: 37, convRule: rule13 },
  { start: 127232, length: 13, convRule: rule17 },
  { start: 127245, length: 161, convRule: rule13 },
  { start: 127462, length: 29, convRule: rule13 },
  { start: 127504, length: 44, convRule: rule13 },
  { start: 127552, length: 9, convRule: rule13 },
  { start: 127568, length: 2, convRule: rule13 },
  { start: 127584, length: 6, convRule: rule13 },
  { start: 127744, length: 251, convRule: rule13 },
  { start: 127995, length: 5, convRule: rule10 },
  { start: 128e3, length: 728, convRule: rule13 },
  { start: 128736, length: 13, convRule: rule13 },
  { start: 128752, length: 13, convRule: rule13 },
  { start: 128768, length: 116, convRule: rule13 },
  { start: 128896, length: 89, convRule: rule13 },
  { start: 128992, length: 12, convRule: rule13 },
  { start: 129024, length: 12, convRule: rule13 },
  { start: 129040, length: 56, convRule: rule13 },
  { start: 129104, length: 10, convRule: rule13 },
  { start: 129120, length: 40, convRule: rule13 },
  { start: 129168, length: 30, convRule: rule13 },
  { start: 129200, length: 2, convRule: rule13 },
  { start: 129280, length: 121, convRule: rule13 },
  { start: 129402, length: 82, convRule: rule13 },
  { start: 129485, length: 135, convRule: rule13 },
  { start: 129632, length: 14, convRule: rule13 },
  { start: 129648, length: 5, convRule: rule13 },
  { start: 129656, length: 3, convRule: rule13 },
  { start: 129664, length: 7, convRule: rule13 },
  { start: 129680, length: 25, convRule: rule13 },
  { start: 129712, length: 7, convRule: rule13 },
  { start: 129728, length: 3, convRule: rule13 },
  { start: 129744, length: 7, convRule: rule13 },
  { start: 129792, length: 147, convRule: rule13 },
  { start: 129940, length: 55, convRule: rule13 },
  { start: 130032, length: 10, convRule: rule8 },
  { start: 131072, length: 42718, convRule: rule14 },
  { start: 173824, length: 4149, convRule: rule14 },
  { start: 177984, length: 222, convRule: rule14 },
  { start: 178208, length: 5762, convRule: rule14 },
  { start: 183984, length: 7473, convRule: rule14 },
  { start: 194560, length: 542, convRule: rule14 },
  { start: 196608, length: 4939, convRule: rule14 },
  { start: 917505, length: 1, convRule: rule16 },
  { start: 917536, length: 96, convRule: rule16 },
  { start: 917760, length: 240, convRule: rule92 },
  { start: 983040, length: 65534, convRule: rule200 },
  { start: 1048576, length: 65534, convRule: rule200 }
];
var checkAttr = (categories) => ($$char) => {
  const maybeConversionRule = getRule(allchars)($$char)($$char < 256 ? 63 : 3396);
  if (maybeConversionRule.tag === "Nothing") {
    return false;
  }
  if (maybeConversionRule.tag === "Just") {
    const $0 = maybeConversionRule._1.category;
    const $1 = findIndexImpl(Just, Nothing, (v) => v === $0, categories);
    if ($1.tag === "Nothing") {
      return false;
    }
    if ($1.tag === "Just") {
      return true;
    }
  }
  fail();
};

// output-es/Data.CodePoint.Unicode/index.js
var isAlphaNum = (x) => checkAttr([524288, 512, 4096, 1048576, 16384, 8388608, 4194304, 2097152, 131072, 256, 16777216])(x);

// output-es/Data.FoldableWithIndex/index.js
var foldableWithIndexArray = {
  foldrWithIndex: (f) => (z) => {
    const $0 = foldrArray((v) => {
      const $02 = v._1;
      const $12 = v._2;
      return (y) => f($02)($12)(y);
    })(z);
    const $1 = mapWithIndexArray(Tuple);
    return (x) => $0($1(x));
  },
  foldlWithIndex: (f) => (z) => {
    const $0 = foldlArray((y) => (v) => f(v._1)(y)(v._2))(z);
    const $1 = mapWithIndexArray(Tuple);
    return (x) => $0($1(x));
  },
  foldMapWithIndex: (dictMonoid) => {
    const mempty = dictMonoid.mempty;
    return (f) => foldableWithIndexArray.foldrWithIndex((i) => (x) => (acc) => dictMonoid.Semigroup0().append(f(i)(x))(acc))(mempty);
  },
  Foldable0: () => foldableArray
};

// output-es/Data.Bounded/foreign.js
var topChar = String.fromCharCode(65535);
var bottomChar = String.fromCharCode(0);
var topNumber = Number.POSITIVE_INFINITY;
var bottomNumber = Number.NEGATIVE_INFINITY;

// output-es/Data.Unfoldable1/foreign.js
var unfoldr1ArrayImpl = function(isNothing2) {
  return function(fromJust3) {
    return function(fst2) {
      return function(snd2) {
        return function(f) {
          return function(b) {
            var result = [];
            var value = b;
            while (true) {
              var tuple = f(value);
              result.push(fst2(tuple));
              var maybe = snd2(tuple);
              if (isNothing2(maybe))
                return result;
              value = fromJust3(maybe);
            }
          };
        };
      };
    };
  };
};

// output-es/Data.Unfoldable1/index.js
var fromJust = (v) => {
  if (v.tag === "Just") {
    return v._1;
  }
  fail();
};
var unfoldable1Array = { unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(fromJust)(fst)(snd) };

// output-es/Data.Enum/foreign.js
function toCharCode(c) {
  return c.charCodeAt(0);
}
function fromCharCode(c) {
  return String.fromCharCode(c);
}

// output-es/Data.EuclideanRing/foreign.js
var intMod = function(x) {
  return function(y) {
    if (y === 0)
      return 0;
    var yy = Math.abs(y);
    return (x % yy + yy) % yy;
  };
};

// output-es/Data.String.Unsafe/foreign.js
var charAt = function(i) {
  return function(s) {
    if (i >= 0 && i < s.length)
      return s.charAt(i);
    throw new Error("Data.String.Unsafe.charAt: Invalid index.");
  };
};

// output-es/Data.String.CodeUnits/foreign.js
var singleton = function(c) {
  return c;
};
var length2 = function(s) {
  return s.length;
};
var drop = function(n) {
  return function(s) {
    return s.substring(n);
  };
};
var slice = function(b) {
  return function(e) {
    return function(s) {
      return s.slice(b, e);
    };
  };
};

// output-es/Data.String.Common/foreign.js
var split = function(sep) {
  return function(s) {
    return s.split(sep);
  };
};

// output-es/Data.Unfoldable/foreign.js
var unfoldrArrayImpl = function(isNothing2) {
  return function(fromJust3) {
    return function(fst2) {
      return function(snd2) {
        return function(f) {
          return function(b) {
            var result = [];
            var value = b;
            while (true) {
              var maybe = f(value);
              if (isNothing2(maybe))
                return result;
              var tuple = fromJust3(maybe);
              result.push(fst2(tuple));
              value = snd2(tuple);
            }
          };
        };
      };
    };
  };
};

// output-es/Data.Unfoldable/index.js
var fromJust2 = (v) => {
  if (v.tag === "Just") {
    return v._1;
  }
  fail();
};
var unfoldableArray = {
  unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(fromJust2)(fst)(snd),
  Unfoldable10: () => unfoldable1Array
};

// output-es/Data.String.CodePoints/foreign.js
var hasArrayFrom = typeof Array.from === "function";
var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
var hasCodePointAt = typeof String.prototype.codePointAt === "function";
var _unsafeCodePointAt0 = function(fallback) {
  return hasCodePointAt ? function(str) {
    return str.codePointAt(0);
  } : fallback;
};
var _fromCodePointArray = function(singleton3) {
  return hasFromCodePoint ? function(cps) {
    if (cps.length < 1e4) {
      return String.fromCodePoint.apply(String, cps);
    }
    return cps.map(singleton3).join("");
  } : function(cps) {
    return cps.map(singleton3).join("");
  };
};
var _singleton = function(fallback) {
  return hasFromCodePoint ? String.fromCodePoint : fallback;
};
var _toCodePointArray = function(fallback) {
  return function(unsafeCodePointAt02) {
    if (hasArrayFrom) {
      return function(str) {
        return Array.from(str, unsafeCodePointAt02);
      };
    }
    return fallback;
  };
};

// output-es/Data.String.CodePoints/index.js
var uncons = (s) => {
  const v = length2(s);
  if (v === 0) {
    return Nothing;
  }
  if (v === 1) {
    return $Maybe("Just", { head: toCharCode(charAt(0)(s)), tail: "" });
  }
  const cu1 = toCharCode(charAt(1)(s));
  const cu0 = toCharCode(charAt(0)(s));
  if (55296 <= cu0 && cu0 <= 56319 && 56320 <= cu1 && cu1 <= 57343) {
    return $Maybe("Just", { head: (((cu0 - 55296 | 0) * 1024 | 0) + (cu1 - 56320 | 0) | 0) + 65536 | 0, tail: drop(2)(s) });
  }
  return $Maybe("Just", { head: cu0, tail: drop(1)(s) });
};
var unconsButWithTuple = (s) => {
  const $0 = uncons(s);
  if ($0.tag === "Just") {
    return $Maybe("Just", $Tuple($0._1.head, $0._1.tail));
  }
  return Nothing;
};
var toCodePointArrayFallback = (s) => unfoldableArray.unfoldr(unconsButWithTuple)(s);
var unsafeCodePointAt0Fallback = (s) => {
  const cu0 = toCharCode(charAt(0)(s));
  if (55296 <= cu0 && cu0 <= 56319 && length2(s) > 1) {
    const cu1 = toCharCode(charAt(1)(s));
    if (56320 <= cu1 && cu1 <= 57343) {
      return (((cu0 - 55296 | 0) * 1024 | 0) + (cu1 - 56320 | 0) | 0) + 65536 | 0;
    }
  }
  return cu0;
};
var unsafeCodePointAt0 = /* @__PURE__ */ _unsafeCodePointAt0(unsafeCodePointAt0Fallback);
var toCodePointArray = /* @__PURE__ */ _toCodePointArray(toCodePointArrayFallback)(unsafeCodePointAt0);
var fromCharCode2 = (x) => singleton((() => {
  if (x >= 0 && x <= 65535) {
    return fromCharCode(x);
  }
  if (x < 0) {
    return "\0";
  }
  return "\uFFFF";
})());
var singletonFallback = (v) => {
  if (v <= 65535) {
    return fromCharCode2(v);
  }
  return fromCharCode2(intDiv(v - 65536 | 0, 1024) + 55296 | 0) + fromCharCode2(intMod(v - 65536 | 0)(1024) + 56320 | 0);
};
var fromCodePointArray = /* @__PURE__ */ _fromCodePointArray(singletonFallback);
var singleton2 = /* @__PURE__ */ _singleton(singletonFallback);
var eqCodePoint = { eq: (x) => (y) => x === y };

// output-es/Effect.Console/foreign.js
var log2 = function(s) {
  return function() {
    console.log(s);
  };
};

// output-es/Effect.Exception/foreign.js
function error2(msg) {
  return new Error(msg);
}
function throwException(e) {
  return function() {
    throw e;
  };
}

// output-es/Foreign.Object/foreign.js
function _lookup(no, yes, k, m) {
  return k in m ? yes(m[k]) : no;
}
function toArrayWithKey(f) {
  return function(m) {
    var r = [];
    for (var k in m) {
      if (hasOwnProperty.call(m, k)) {
        r.push(f(k)(m[k]));
      }
    }
    return r;
  };
}
var keys = Object.keys || toArrayWithKey(function(k) {
  return function() {
    return k;
  };
});

// output-es/Node.Encoding/foreign.js
import { Buffer } from "node:buffer";
var byteLengthImpl = (str, enc) => Buffer.byteLength(str, enc);

// output-es/Node.Encoding/index.js
var $Encoding = (tag) => tag;
var UTF8 = /* @__PURE__ */ $Encoding("UTF8");
var byteLength = (str) => (enc) => byteLengthImpl(
  str,
  (() => {
    if (enc === "ASCII") {
      return "ascii";
    }
    if (enc === "UTF8") {
      return "utf8";
    }
    if (enc === "UTF16LE") {
      return "utf16le";
    }
    if (enc === "UCS2") {
      return "ucs2";
    }
    if (enc === "Base64") {
      return "base64";
    }
    if (enc === "Base64Url") {
      return "base64url";
    }
    if (enc === "Latin1") {
      return "latin1";
    }
    if (enc === "Binary") {
      return "binary";
    }
    if (enc === "Hex") {
      return "hex";
    }
    fail();
  })()
);

// output-es/Node.Process/foreign.js
import process from "process";
var abortImpl = process.abort ? () => process.abort() : null;
var channelRefImpl = process.channel && process.channel.ref ? () => process.channel.ref() : null;
var channelUnrefImpl = process.channel && process.channel.unref ? () => process.channel.unref() : null;
var debugPort = process.debugPort;
var disconnectImpl = process.disconnect ? () => process.disconnect() : null;
var unsafeGetEnv = () => process.env;
var pid = process.pid;
var platformStr = process.platform;
var ppid = process.ppid;
var stdin = process.stdin;
var stdout = process.stdout;
var stderr = process.stderr;
var stdinIsTTY = process.stdinIsTTY;
var stdoutIsTTY = process.stdoutIsTTY;
var stderrIsTTY = process.stderrIsTTY;
var version = process.version;

// output-es/Partial/foreign.js
var _crashWith = function(msg) {
  throw new Error(msg);
};

// output-es/Foreign/foreign.js
var isArray = Array.isArray || function(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
};

// output-es/Record.Builder/foreign.js
function unsafeInsert(l) {
  return function(a) {
    return function(rec) {
      rec[l] = a;
      return rec;
    };
  };
}

// output-es/Record.Builder/index.js
var insert = () => () => (dictIsSymbol) => (l) => (a) => (r1) => unsafeInsert(dictIsSymbol.reflectSymbol(l))(a)(r1);

// output-es/Yoga.JSON/foreign.js
function replacer(key, value) {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
}
var _unsafeStringify = (data) => JSON.stringify(data, replacer);

// output-es/Yoga.JSON/index.js
var identity5 = (x) => x;
var writeForeignString = { writeImpl: unsafeCoerce };
var writeForeignInt = { writeImpl: unsafeCoerce };
var writeForeignFieldsNilRowR = { writeImplFields: (v) => (v1) => identity5 };
var writeForeignBoolean = { writeImpl: unsafeCoerce };
var writeJSON = (dictWriteForeign) => (x) => _unsafeStringify(dictWriteForeign.writeImpl(x));
var writeForeignFieldsCons = (dictIsSymbol) => (dictWriteForeign) => (dictWriteForeignFields) => () => () => () => ({
  writeImplFields: (v) => (rec) => {
    const $0 = insert()()(dictIsSymbol)($$Proxy)(dictWriteForeign.writeImpl(unsafeGet(dictIsSymbol.reflectSymbol($$Proxy))(rec)));
    const $1 = dictWriteForeignFields.writeImplFields($$Proxy)(rec);
    return (x) => $0($1(x));
  }
});

// output-es/Main/index.js
var $SelectionDescriptionOrientation = (tag) => tag;
var min2 = (x) => (y) => {
  const v = ordInt.compare(x)(y);
  if (v === "LT") {
    return x;
  }
  if (v === "EQ") {
    return x;
  }
  if (v === "GT") {
    return y;
  }
  fail();
};
var traverse = /* @__PURE__ */ (() => traversableArray.traverse(applicativeMaybe))();
var Forward = /* @__PURE__ */ $SelectionDescriptionOrientation("Forward");
var Backward = /* @__PURE__ */ $SelectionDescriptionOrientation("Backward");
var getLabels = (v) => {
  const $0 = v.labelCharset;
  const nextLabel = (v1) => {
    const nextIndexes = (v1._2 + 1 | 0) >= $0.length ? $Tuple(v1._1 + 1 | 0, 0) : $Tuple(v1._1, v1._2 + 1 | 0);
    if (v1._2 >= 0 && v1._2 < $0.length) {
      if (v1._1 >= 0 && v1._1 < $0.length) {
        return $Tuple(fromCodePointArray([$0[v1._1], $0[v1._2]]), nextIndexes);
      }
      return _crashWith("Index error");
    }
    return _crashWith("Index error");
  };
  const lineNrOffset = min2(v.bufferSelection.startLine)(v.bufferSelection.endLine);
  const generateLabels = (generateLabels$a0$copy) => (generateLabels$a1$copy) => (generateLabels$a2$copy) => (generateLabels$a3$copy) => {
    let generateLabels$a0 = generateLabels$a0$copy;
    let generateLabels$a1 = generateLabels$a1$copy;
    let generateLabels$a2 = generateLabels$a2$copy;
    let generateLabels$a3 = generateLabels$a3$copy;
    let generateLabels$c = true;
    let generateLabels$r;
    while (generateLabels$c) {
      const v1 = generateLabels$a0, v2 = generateLabels$a1, v3 = generateLabels$a2, v4 = generateLabels$a3;
      if (v1.length === 0 && v2.length === 0) {
        generateLabels$c = false;
        generateLabels$r = v4;
        continue;
      }
      const v5 = nextLabel(v3);
      const v6 = unsnoc(v1);
      if (v6.tag === "Just") {
        const acc$p = [v6._1.last(v5._1), ...v4];
        const v7 = unconsImpl((v$1) => Nothing, (x) => (xs) => $Maybe("Just", { head: x, tail: xs }), v2);
        if (v7.tag === "Just") {
          const v8 = nextLabel(v5._2);
          generateLabels$a0 = v6._1.init;
          generateLabels$a1 = v7._1.tail;
          generateLabels$a2 = v8._2;
          generateLabels$a3 = snoc(acc$p)(v7._1.head(v8._1));
          continue;
        }
        if (v7.tag === "Nothing") {
          generateLabels$a0 = v6._1.init;
          generateLabels$a1 = [];
          generateLabels$a2 = v5._2;
          generateLabels$a3 = acc$p;
          continue;
        }
        fail();
      }
      if (v6.tag === "Nothing") {
        const v7 = unconsImpl((v$1) => Nothing, (x) => (xs) => $Maybe("Just", { head: x, tail: xs }), v2);
        if (v7.tag === "Just") {
          generateLabels$a0 = [];
          generateLabels$a1 = v7._1.tail;
          generateLabels$a2 = v5._2;
          generateLabels$a3 = snoc(v4)(v7._1.head(v5._1));
          continue;
        }
        if (v7.tag === "Nothing") {
          generateLabels$c = false;
          generateLabels$r = v4;
          continue;
        }
      }
      fail();
    }
    return generateLabels$r;
  };
  const cursorLine = (() => {
    if (v.bufferSelection.orientation === "Forward") {
      return v.clientSelection.endLine;
    }
    if (v.bufferSelection.orientation === "Backward") {
      return v.clientSelection.startLine;
    }
    fail();
  })();
  const cursorColumn = (() => {
    if (v.bufferSelection.orientation === "Forward") {
      return v.clientSelection.endColumn;
    }
    if (v.bufferSelection.orientation === "Backward") {
      return v.clientSelection.startColumn;
    }
    fail();
  })();
  const $1 = splitAt((cursorLine - lineNrOffset | 0) + 1 | 0)(mapWithIndexArray((lineNr) => (line) => foldableWithIndexArray.foldlWithIndex((column) => (v1) => (codepoint) => {
    const $12 = v1.bytePosition;
    return {
      prev: $Maybe("Just", codepoint),
      bytePosition: $12 + byteLength(singleton2(codepoint))(UTF8) | 0,
      acc: (() => {
        const $2 = lineNr + lineNrOffset | 0;
        const orientation = (() => {
          if ($2 > cursorLine) {
            return Forward;
          }
          if ($2 === cursorLine && column > cursorColumn) {
            return Forward;
          }
          return Backward;
        })();
        const selectionDescription = ((orientation === "Forward" ? v.clientSelection.orientation === "Forward" : orientation === "Backward" && v.clientSelection.orientation === "Backward") || !v.autoFlipSelection ? showIntImpl(v.clientSelection.startLine) + "." + showIntImpl(v.clientSelection.startColumn) + "," : showIntImpl(v.clientSelection.endLine) + "." + showIntImpl(v.clientSelection.endColumn) + ",") + showIntImpl(lineNr + lineNrOffset | 0) + "." + showIntImpl(column + 1 | 0);
        const jumpPosition = (label) => ({
          label,
          labelByteLength: byteLength(slice(column)(column + toCodePointArray(label).length | 0)(line))(UTF8),
          labelBytePosition: $12,
          line: lineNr + lineNrOffset | 0,
          selectionDescription,
          jumpOrientationForward: orientation === "Forward"
        });
        if (v1.prev.tag === "Nothing") {
          if (isAlphaNum(codepoint) || elem(eqCodePoint)(codepoint)(v.extraWordCharacters)) {
            return snoc(v1.acc)(jumpPosition);
          }
          return v1.acc;
        }
        if (v1.prev.tag === "Just") {
          if (isAlphaNum(v1.prev._1) || elem(eqCodePoint)(v1.prev._1)(v.extraWordCharacters)) {
            return v1.acc;
          }
          if (isAlphaNum(codepoint) || elem(eqCodePoint)(codepoint)(v.extraWordCharacters)) {
            return snoc(v1.acc)(jumpPosition);
          }
          return v1.acc;
        }
        fail();
      })()
    };
  })({ prev: Nothing, bytePosition: 1, acc: [] })(toCodePointArray(line)).acc)(split("\n")(v.bufferContent)));
  return generateLabels(arrayBind($1.before)(identity))(arrayBind($1.after)(identity))($Tuple(0, 0))([]);
};
var kakouneEnvironment = /* @__PURE__ */ (() => {
  const $0 = throwException(error2("[ERROR] JumpMode: couldn't find $kak_opt_jumpAutoFlipOnExtend in the environment\n"));
  const $1 = throwException(error2("[ERROR] JumpMode: couldn't find $kak_opt_jumpContents in the environment\n"));
  const $2 = throwException(error2("[ERROR] JumpMode: couldn't find $kak_opt_jumpContentsRange in the environment\n"));
  const $3 = throwException(error2("[ERROR] JumpMode: couldn't find $kak_selection_desc in the environment\n"));
  const $4 = throwException(error2("[ERROR] JumpMode: couldn't find $kak_opt_jumpExtraWordCharacters in the environment\n"));
  const $5 = throwException(error2("[ERROR] JumpMode: couldn't find $kak_opt_jumpLabelsCharacters in the environment\n"));
  const $6 = throwException(error2("[ERROR] JumpMode: invalid labels characters set\n"));
  return () => {
    const a$p = unsafeGetEnv();
    const $7 = _lookup(Nothing, Just, "kak_opt_jumpAutoFlipOnExtend", a$p);
    const v = (() => {
      if ($7.tag === "Nothing") {
        return $0();
      }
      if ($7.tag === "Just") {
        return $7._1;
      }
      fail();
    })();
    const a$p$1 = (() => {
      if (v === "true") {
        return true;
      }
      if (v === "false") {
        return false;
      }
      return throwException(error2("[ERROR] JumpMode: couldn't parse Boolean: " + v + "\n"))();
    })();
    const a$p$2 = unsafeGetEnv();
    const $8 = _lookup(Nothing, Just, "kak_opt_jumpContents", a$p$2);
    const a$p$3 = (() => {
      if ($8.tag === "Nothing") {
        return $1();
      }
      if ($8.tag === "Just") {
        return $8._1;
      }
      fail();
    })();
    const a$p$4 = unsafeGetEnv();
    const $9 = _lookup(Nothing, Just, "kak_opt_jumpContentsRange", a$p$4);
    const $10 = (() => {
      if ($9.tag === "Nothing") {
        return $2();
      }
      if ($9.tag === "Just") {
        return $9._1;
      }
      fail();
    })();
    const v$1 = traverse(fromString)(arrayBind(split(",")($10))(split(".")));
    const a$p$5 = v$1.tag === "Just" && v$1._1.length === 4 ? {
      startLine: v$1._1[0],
      startColumn: v$1._1[1],
      endLine: v$1._1[2],
      endColumn: v$1._1[3],
      orientation: v$1._1[2] > v$1._1[0] || v$1._1[2] === v$1._1[0] && v$1._1[3] > v$1._1[1] ? Forward : Backward
    } : throwException(error2("[ERROR] JumpMode: couldn't parse selection description: " + $10 + "\n"))();
    const a$p$6 = unsafeGetEnv();
    const $11 = _lookup(Nothing, Just, "kak_selection_desc", a$p$6);
    const $12 = (() => {
      if ($11.tag === "Nothing") {
        return $3();
      }
      if ($11.tag === "Just") {
        return $11._1;
      }
      fail();
    })();
    const v$2 = traverse(fromString)(arrayBind(split(",")($12))(split(".")));
    const a$p$7 = v$2.tag === "Just" && v$2._1.length === 4 ? {
      startLine: v$2._1[0],
      startColumn: v$2._1[1],
      endLine: v$2._1[2],
      endColumn: v$2._1[3],
      orientation: v$2._1[2] > v$2._1[0] || v$2._1[2] === v$2._1[0] && v$2._1[3] > v$2._1[1] ? Forward : Backward
    } : throwException(error2("[ERROR] JumpMode: couldn't parse selection description: " + $12 + "\n"))();
    const a$p$8 = unsafeGetEnv();
    const $13 = _lookup(Nothing, Just, "kak_opt_jumpExtraWordCharacters", a$p$8);
    const a$p$9 = (() => {
      if ($13.tag === "Nothing") {
        return $4();
      }
      if ($13.tag === "Just") {
        return $13._1;
      }
      fail();
    })();
    const a$p$10 = unsafeGetEnv();
    const $14 = _lookup(Nothing, Just, "kak_opt_jumpLabelsCharacters", a$p$10);
    const $15 = (() => {
      if ($14.tag === "Nothing") {
        return $5();
      }
      if ($14.tag === "Just") {
        return $14._1;
      }
      fail();
    })();
    const $16 = toCodePointArray($15);
    const a$p$11 = $16.length >= 10 ? $16 : $6();
    return {
      autoFlipSelection: a$p$1,
      bufferContent: a$p$3,
      bufferSelection: a$p$5,
      clientSelection: a$p$7,
      extraWordCharacters: toCodePointArray(a$p$9),
      labelCharset: a$p$11
    };
  };
})();
var main = /* @__PURE__ */ (() => {
  const $0 = writeJSON((() => {
    const $02 = writeForeignFieldsCons({ reflectSymbol: () => "jumpOrientationForward" })(writeForeignBoolean)(writeForeignFieldsCons({
      reflectSymbol: () => "label"
    })(writeForeignString)(writeForeignFieldsCons({ reflectSymbol: () => "labelByteLength" })(writeForeignInt)(writeForeignFieldsCons({
      reflectSymbol: () => "labelBytePosition"
    })(writeForeignInt)(writeForeignFieldsCons({ reflectSymbol: () => "line" })(writeForeignInt)(writeForeignFieldsCons({
      reflectSymbol: () => "selectionDescription"
    })(writeForeignString)(writeForeignFieldsNilRowR)()()())()()())()()())()()())()()())()()();
    return { writeImpl: (xs) => arrayMap((rec) => $02.writeImplFields($$Proxy)(rec)({}))(xs) };
  })());
  return () => {
    const $1 = kakouneEnvironment();
    return log2($0(getLabels($1)))();
  };
})();

// <stdin>
main();

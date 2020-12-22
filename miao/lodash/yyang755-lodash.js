var yyang755 = (function () {
  function chunk(ary, size) {
    var res = [];
    var i = 0;
    var c = 0;
    for (var i = 0; i < Math.ceil(ary.length / size); i++) {
      res[i] = [];
    }
    for (let j = 0; j < ary.length; j++) {
      if (c < size) {
        res[i].push(ary[j]);
        c++;
      }
      if (c == size) {
        i++;
        c = 0;
      }
    }
    return res;
  }

  function compact(ary) {
    var res = [];
    for (let i = 0; i < ary.length; i++) {
      if (ary[i]) {
        res.push(ary[i]);
      }
    }
    return res;
  }

  function concat(ary, ...args) {
    var res = [...ary];
    for (let i = 0; i < args.length; i++) {
      if (Array.isArray(args[i])) {
        res.push(...args[i]);
      } else {
        res.push(args[i]);
      }
      return res;
    }
  }

  //过滤数组中与其他数组相同的部分
  function difference(ary, ...args) {
    var res = [];
    var grounp = concat([], ...args);
    //var res = [].concat(...ary)
    for (let i = 0; i < ary.length; i++) {
      if (grounp.indexOf(ary[i]) == -1) {
        res.push(ary[i]);
      }
    }
    //return ary.filter(it => indexOf(it) == -1)
    return res;
  }

  //先传进函数之后筛选第一个不相同参数
  function differenceBy(ary, ...args) {
    var func = args[args.length - 1];
    var res = 0;
    if (typeof func == "function") {
    }
  }

  function drop(ary, n) {
    var res = [];
    if (n == undefined) {
      ary.shift(ary[0]);
      return ary;
    }
    for (let i = n; i < ary.length; i++) {
      res.push(ary[i]);
    }
    return res;
  }

  function dropRight(ary, n) {
    if (n == undefined) {
      ary.pop();
      return ary;
    }
    for (let i = ary.length; i > n; i--) {
      ary.pop();
    }
    return ary;
  }

  function ary(f, n = f.length) {
    return function (...args) {};
  }

  //https://xiaoxiami.gitbook.io/lodash/function/before
  function before(n, func) {
    return function (...args) {
      if (c < n) {
        return (result = func.call(this, ...args));
        c++;
      } else {
        return result;
      }
    };
  }

  function after(n, func) {
    var c = 0;
    return function (...args) {
      c++;
      if (c > n) {
        return (result = func.call(this, ...args));
        c++;
      }
    };
  }

  function flip(func) {
    return function (...args) {
      return func(...args.reverse());
    };
  }
  //创建一个针对断言函数func结果取反的函数。func断言函数被调用的时候，this绑定到创建的函数，并传入对应参数。
  function negate(predicate) {
    return function (...args) {
      return !predicate(...args);
    };
  }

  function spread(func) {
    return function (ary) {
      return func.f(this, ary);
    };
  }

  return {
    chunk,
    compact,
    concat,
    difference,
    differenceBy,
    drop,
    dropRight,
    after,
    before,
    flip,
    negate,
    spread,
  };
})();

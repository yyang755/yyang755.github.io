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
      } else res.push(args[i]);
    }
    return res;
  }
  //过滤数组中与其他数组相同的部分
  function difference(ary, ...args) {
    var res = [];
    var grounp = concat(ary, ...args);
    for (let i = 0; i < ary.length; i++) {
      if (grounp.indexOf(ary[i]) == -1) {
        res.push(ary[i]);
      }
    }
    return res;
  }
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

  return {
    chunk,
    compact,
    concat,
    difference,
    differenceBy,
    drop,
  };
})();

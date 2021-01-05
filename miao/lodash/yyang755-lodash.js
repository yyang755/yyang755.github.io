//多调试 多写注释
//http://02f9az.coding-pages.com/lodash-oj8/
//http://lodash.think2011.net/chunk
var yyang755 = (function () {
  function chunk(ary, size) {
    var result = [];
    var count = -1;
    for (var i = 0; i < ary.length; i++) {
      if (i % size == 0) {
        result.push(ary[i]); // 外层push
        count++;
      } else {
        result[count].push(ary[i]); // 内层push
      }
    }
    return result;
    // var res = [];
    // var i = 0;
    // var c = 0;
    // for (var i = 0; i < Math.ceil(ary.length / size); i++) {
    //   res[i] = [];
    // }
    // for (let j = 0; j < ary.length; j++) {
    //   if (c < size) {
    //     (res[i]).push(ary[j]);外层
    //     c++;
    //   }
    //   if (c == size) {
    //     i++;
    //     c = 0;
    //   }
    // }
    // return res;
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
  //结果可能是二维数组 所以展开运算符
  function concat(ary, ...values) {
    var res = [...ary];
    for (var i = 0; i < values.length; i++) {
      //遍历两种情况
      //ary.isary() 用于确定传递的值是否是一个 ary。
      if (ary.isary(values[i])) {
        res.push(...values[i]); //二维数组
      } else {
        res.push(values[i]);
      }
    }
    return res;
  }

  //过滤数组中与其他数组（可能多个数组）相同的部分，不需要额外考虑二维数组，indexOf都能直接判断
  function difference(ary, ...values) {
    var res = [];
    var grounp = [].concat(...values); //多个数组变成整合成一个数组
    for (var i = 0; i < ary.length; i++) {
      if (grounp.indexOf(ary[i]) == -1) {
        res.push(ary[i]);
      }
    }
    //return ary.filter(it => res.indexOf(it) == -1)一步到位
    return res;
  }

  //先传进函数之后筛选第一个不相同参数
  function differenceBy(ary, ...values) {}
  //drop删除
  function drop(ary, n) {
    var res = [];
    if (n == null) {
      ary.shift(ary[0]);
      return ary;
    }
    for (let i = n; i < ary.length; i++) {
      res.push(ary[i]);
    }
    return res;
    //return ary.splice(0, n)
  }

  function dropRight(ary, n) {
    if (n == null) {
      ary.pop();
      return ary;
    }
    if (n == 0) {
      return ary;
    }
    return ary.slice(0, -n); //0到倒数第n个
  }

  function fill(ary, value, start = 0, end = ary.length) {
    //   if (start < 0 && start >= -ary.length) {考虑完全写法借鉴   如果 start 是个负数, 则开始索引会被自动计算成为 length+start mdn  其中 length 是 this 对象的 length 属性值
    //     start = start + ary.length
    // } else if (start < -ary.length) {
    //     start = 0
    // } else if (start >= ary.length) {
    //     return ary
    // }
    //如果 end 是个负数, 则结束索引会被自动计算成为 length+end。
    // if (end < 0 && end >= -ary.length) {
    //     end = end + ary.length
    // } else if (end < -ary.length) {
    //     return ary
    // } else if (end >= ary.length) {
    //     end = ary.length
    // }
    for (var i = start; i < end; i++) {
      ary[i] = value;
    }
    return ary;
  }
  //遍历集合中的元素，返回<最先>经 predicate 检查为真值的元素下标。
  function findIndex(collection, predicate, fromIndex = 0) {
    if (fromIndex < 0) {
      return -1;
    }
    predicate = _iteratee(predicate);
    for (let i = fromIndex; i < collection.length; i++) {
      if (predicate(collection[i])) {
        return i;
      }
    }
    return -1; //程序失败
  }

  function findLastIndex(
    collection,
    predicate,
    fromIndex = collection.length - 1
  ) {
    predicate = _iteratee(predicate);
    for (let i = fromIndex; i >= 0; i--) {
      if (predicate(collection[i])) {
        return i;
      }
    }
    return -1; //程序失败
  }

  //https://xiaoxiami.gitbook.io/lodash/function/before
  function before(n, func) {
    return function (...values) {
      if (c < n) {
        return (result = func.call(this, ...values));
        c++;
      } else {
        return result;
      }
    };
  }

  function after(n, func) {
    var c = 0;
    return function (...values) {
      c++;
      if (c > n) {
        return (result = func.call(this, ...values));
        c++;
      }
    };
  }

  function flip(func) {
    return function (...values) {
      return func(...values.reverse());
    };
  }
  //创建一个针对断言函数func结果取反的函数。func断言函数被调用的时候，this绑定到创建的函数，并传入对应参数。
  function negate(predicate) {
    return function (...values) {
      return !predicate(...values);
    };
  }

  function spread(func) {
    return function (ary) {
      return func.f(this, ary);
    };
  }

  function forOwn(obj, iterator) {
    var hasOwn = Object.prototype.hasOwnProperty;
    for (var key in obj) {
      if (hasOwn.call(obj, key)) {
        if (iterator(obj[key], key, obj) === false) {
          break;
        }
      }
    }
    return obj;
  }

  return {
    chunk,
    compact,
    concat,
    difference,
    differenceBy,
    drop,
    dropRight,
    fill,
    findIndex,
    findLastIndex,
    ary,
    after,
    before,
    flip,
    negate,
    spread,
    forOwn,
  };
})();

//多调试 多写注释
//http://02f9az.coding-pages.com/lodash-oj8/
//http://lodash.think2011.net/chunk
var yyang755 = function () {
  function chunk(array, size) {
    var result = [];
    var count = -1;
    for (var i = 0; i < array.length; i++) {
      if (i % size == 0) {
        result.push([array[i]]); // 外层push,把数组直接push进去
        count++;
      } else {
        result[count].push(array[i]); // 内层push
      }
    }
    return result;
    // var res = [];
    // var i = 0;
    // var c = 0;
    // for (var i = 0; i < Math.ceil(array.length / size); i++) {
    //   res[i] = [];二维数组
    // }
    // for (let j = 0; j < array.length; j++) {
    //   if (c < size) {
    //     (res[i]).push(array[j]);外层
    //     c++;
    //   }
    //   if (c == size) {
    //     i++;
    //     c = 0;
    //   }
    // }
    // return res;
  }

  function compact(array) {
    var res = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        res.push(array[i]);
      }
    }
    return res;
  }
  //结果可能是二维数组 所以展开运算符
  function concat(array, ...values) {
    var res = [...array];
    for (var i = 0; i < values.length; i++) {
      //遍历两种情况
      //array.isarray() 用于确定传递的值是否是一个 array。
      if (array.isarray(values[i])) {
        res.push(...values[i]); //二维数组
      } else {
        res.push(values[i]);
      }
    }
    return res;
  }
  //过滤数组中与其他数组（可能多个数组）相同的部分，不需要额外考虑二维数组，indexOf都能直接判断
  function difference(array, ...values) {
    var res = [];
    var grounp = [].concat(...values); //多个数组变成整合成一个数组
    for (var i = 0; i < array.length; i++) {
      if (grounp.indexOf(array[i]) == -1) {
        res.push(array[i]);
      }
    }
    //return array.filter(it => res.indexOf(it) == -1)一步到位
    return res;
  }

  //先传进函数之后筛选第一个不相同参数
  function differenceBy(array, ...values) { }
  //drop删除
  function drop(array, n) {
    var res = [];
    if (n == null) {
      array.shift(array[0]);
      return array;
    }
    for (let i = n; i < array.length; i++) {
      res.push(array[i]);
    }
    return res;
    //return array.splice(0, n)
  }

  function dropRight(array, n) {
    if (n == null) {
      array.pop();
      return array;
    }
    if (n == 0) {
      return array;
    }
    return array.slice(0, -n); //0到倒数第n个
  }

  function fill(array, value, start = 0, end = array.length) {
    //   if (start < 0 && start >= -array.length) {考虑完全写法借鉴   如果 start 是个负数, 则开始索引会被自动计算成为 length+start mdn  其中 length 是 this 对象的 length 属性值
    //     start = start + array.length
    // } else if (start < -array.length) {
    //     start = 0
    // } else if (start >= array.length) {
    //     return array
    // }
    //如果 end 是个负数, 则结束索引会被自动计算成为 length+end。
    // if (end < 0 && end >= -array.length) {
    //     end = end + array.length
    // } else if (end < -array.length) {
    //     return array
    // } else if (end >= array.length) {
    //     end = array.length
    // }
    for (var i = start; i < end; i++) {
      array[i] = value;
    }
    return array;
  }
  //遍历集合中的元素，返回<最先>经 predicate 检查为真值的元素下标。
  function findIndex(array, predicate, fromIndex = 0) {
    var f = iteratee(predicate);
    for (let i = fromIndex; i < array.length; i++) {
      if (f(array[i])) {
        break
      }
    }
    return i;
  }

  function findLastIndex(array, predicate, fromIndex = array.length - 1
  ) {
    var f = iteratee(predicate);
    for (let i = fromIndex; i >= 0; i--) {
      if (f(array[i])) {
        break;
      }
    }
    return i;
  }
  
  function flatten(array) {
    return [].concat(...array)
  }

  function flattendeep(array) {
    while (array.some(item => Array.isArray(item))) {
      array = [].concat(array)
    }
    return array

    let res = []
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            let ary = flattenDeep(array[i])
            for (let j = 0; j < ary.length; j++) {
                res.push(ary[j])
            }
        } else {
            res.push(array[i])
        }
    }
    return res
  }


  function get(object, path, defaultValues) {
    var names = path.split('.')
    for (var name of names) {
      if (name in Object(object)) {
        object = object[name]
      } else
        return defaultValues
    }
    return object
  }

  function property(path) {
    // return bind(get, null, window, path)
    return function (obj) {
      return get(obj, path)
    }
  }

  function isMatch(obj, src) {
    for (let key in src) {
      if (src[key] && typeof src[key] === 'object') {
        if (!isMatch(obj[key], src[key])) {
          return false
        }
      } else {
        if (obj[key] !== src[key]) {
          return false
        }
      }
    }
    return true
  }

  function matches(src) {
    return bind(isMatch, null, window, src)
  }

  function matchesProperty(path, srcValue) {
    if (Array.isArray(path)) {
      srcValue = path[1]
      path = path[0]
    }
    return (obj) => {
      return obj[path] == srcValue
    }
  }

  function bind(f, thisArg, ...partials) {
    return function (...args) {
      var copy = partials.slice()
      for (var i = 0; i < copy.length; i++) {
        if (copy[i] === window) {
          copy[i] = args.shift()
        }
      }
      return f.call(thisArg, ...copy, ...args)
    }
  }

  function iteratee(predicate) {
    if (typeof predicate === 'function') {
      return predicate
    }
    if (typeof predicate === 'string') {
      return property(predicate)
    }
    if (Array.isArray(predicate)) {
      return matchesProperty(predicate)
    }
    if (typeof predicate === 'object') {
      return matches(predicate)
    }
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

  // 反向版 _.before。 这个方法创建一个新函数，当调用 N 次或者多次之后将触发 func 方法。
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

  // 创建一个调用 func 的函数。 this 绑定到这个函数上。 把参数作为数组传入，类似于 Function#apply
  // 注意: 这个方法基于 spread operator
  function spread(func) {
    return function (array) {
      return func.f(this, array);
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
    flatten,
    flattendeep,
    flattendepth,
    get,
    property,
    isMatch,
    matchesProperty,
    bind,
    matches,
    iteratee,
    after,
    before,
    flip,
    negate,
    spread,
    forOwn,
  };
}();

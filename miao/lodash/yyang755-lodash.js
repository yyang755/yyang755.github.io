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
      //Array.isArray() 用于确定传递的值是否是一个 array。
      if (Array.isArray(values[i])) {
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

    // let res = []
    // for (let i = 0; i < array.length; i++) {
    //     if (Array.isArray(array[i])) {
    //         let ary = flattenDeep(array[i])
    //         for (let j = 0; j < ary.length; j++) {
    //             res.push(ary[j])
    //         }
    //     } else {
    //         res.push(array[i])
    //     }
    // }
    // return res
  }

  function flattendepth(array, depth = 1) {
    var c = 0
    while (array.some(item => Array.isArray(item))) {
      array = [].concat(...array)
      c++
    }
    if (c == depth) {
      return array
    }
  }

  function isArguments(value) {
    return Object.prototype.toString.call(value) == '[object Argument]'
    //return typeJudge(values) === "[object Arguments]"
  }
  function isArray(value) {
    return Object.prototype.toString.call(value) == '[object Array]'
  }

  function isBoolean(value) {
    return typeJudge(value) == '[object Boolean]'

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

  function fromPairs(pairs) {
    var result = {}
    for (var array of pairs) {
      result[array[0]] = array[1]
      //result[pairs[i][0]] = pairs[i][1]
      //从二维数组中取出一维数组使得一维数组中的第二个元素对应对象中的第一个属性值
    }
    return result
  }

  function head(array) {
    return array[0]
    //return (array && array.length) ? array[0] : undefined;
  }

  function indexOf(array, value, fromIndex) {
    if (fromIndex) {
      if (fromIndex < 0) {
        fromIndex += array.length
      }
      for (let i = fromIndex; i < array.length; i++) {
        if (array[i] === value) {
          return i
        }
      }
    }
    if (!fromIndex) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
          return i
        }
      }
      return -1
    }
  }


  function initial(array) {//倒数第一是-1
    return array.slice(0, array.lengthv - 1)//array.splice(-1)  array.pop()

  }
  //求交集
  function intersection(...arrays) {
    let result = []
    for (let i = 0; i < arrays[0].length; i++) {
      for (let j = 1; j < arrays.length; j++) {
        if (!arrays[j].includes(arrays[0][i])) {
          break
        }
        if (j == arrays.length - 1) {
          result.push(arrays[0][i])
        }
      }
      return result
    }
  }

  function join(array, separator = ',') {
    let res = ''
    for (let i = 0; i < array.length; i++) {
      res += array[i] + '' + separator
    }
    return res.slice(0, res.length - 1)
  }

  //迭代反向  下标没有反向还是原来顺序 fromIndex和检索结果也是
  //  'canal'.lastIndexOf('a');     // returns 3 （没有指明fromIndex则从末尾l处开始反向检索到的第一个a出现在l的后面，即index为3的位置）
  //  'canal'.lastIndexOf('a', 2);  // returns 1（指明fromIndex为2则从n处反向向回检索到其后面就是a，即index为1的位置）
  //  'canal'.lastIndexOf('a', 0);  // returns -1(指明fromIndex为0则从c处向左回向检索a发现没有，故返回-1)
  function lastIndexOf(array, value,) {
    if (fromIndex) {
      if (fromIndex < 0) {
        fromIndex += array.length
      }
      for (let i = fromIndex; i >= 0; i--) {
        if (array[i] === value) {
          return i
        }
      }
    }
    if (!fromIndex) {
      for (let i = array.lenghth - 1; i > 0; i--) {
        if (array[i] === value) {
          return i
        }
      }
      return -1
    }
  }

  function nth(array, n) {
    if (n >= 0) {
      return array[n]
    } else {
      return array[n + array.length]
    }
  }

  function pull(array, values) {
    for (var key of values) {
      while (array.includes(key)) {
        array.splice(array.indexOf(key), 1)
      }
    }
    return array
  }
  //这里values只能是数组
  function pullAll(array, values) {
    for (var key of values) {
      while (array.includes(key)) {
        array.splice(array.indexOf(key), 1)
      }
    }
    return array
  }
  //函数不清楚控制台试一试
  function pullAllBy(ary, vals, itee) {
    itee = iteratee(itee)
    //let same = itee(vals.shift())//取出第一项返回
    for (let i = 0; i < ary.length; i++) {
      for (let j = 0; j < vals.length; j++) {
        if (itee(ary[i]) == itee(vals[j])) {
          ary.splice(i, 1)//从i起取出几项返回，但一般要的是ary
        }
      }
      return ary
    }
  }
  function pullAllWith(array, values, comparator) {
    for (var i = 0; i < values.length; i++) {
      for (var j = 0; j < array.length; j++) {
        if (comparator(array[j], values[i])) {
          array.splice(j, 1)
        }
      }
    }
    return array

    // itee = iteratee(itee)
    // while (vals[0] !== undefined) {
    //     let same = vals.shift()
    //     for (let i = 0; i < ary.length; i++) {
    //         if (itee(same, ary[i])) {
    //             ary.splice(i, 1)
    //             i--
    //         }
    //     }
    // }
    // return ary
  }

  function reverse(array) {
    var result = []
    for (var i = array.length - 1; i > 0; i--) {
      result.push(array[i])
    }
    return result
  }

  function sortedIndex(array, value) {//二分
    var left = 0
    var right = array.length - 1
    if (right == left) {
      if (array[left] < value) {
        return 1
      }
      return 0
    }

    while (right != left) {
      var mid = (left + right) >> 1
      if (array[mid] >= value) {
        right = mid
      } else {
        left = mid + 1//mid已经验证
      }
    }
    return right
  }

  // Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组。
  // Set对象是值的集合，你可以按照插入的顺序迭代它的元素。 Set中的元素只会出现一次，即 Set 中的元素是唯一的。
  function union(...array) {
    return Array.from(new Set([].concat(...array)))
    //return [...new Set([].concat(...arrays))]
  }

  // includes检查 值 是否在 集合中，如果集合是字符串，那么检查 值 是否在字符串中。
  function includes(collection, value, fromIndex = 0) {
    fromIndex = fromIndex >= 0 ? fromIndex : collection.length + fromIndex
    if (_isObject(collection)) {
      for (let key in collection) {
        if (collection[key] === value) return true
      }
    } else if (isArray(collection)) {
      for (let i = fromIndex; i < collection.length; i++) {
        if (collection[i] === value) return true
      }
    } else if (isString(collection)) {
      if (collection.includes(value)) return true
    }
    return false
  }

  function typeJudge(val) {
    var judge = Object.prototype.toString
    return judge.call(val)
  }

  // if (typeJudge(val) == "[object Function]") { return res}
  // if (typeJudge(val) == "[object Object]") { return res}
  // if (typeJudge(val) == "[object Array]") { return res}
  // if (typeJudge(val) == "[object String]") { return res}
  // if (typeJudge(val) == "[object Number]") {return res}
  // if (typeJudge(val) == "[object Boolean]") { return }
  // if (typeJudge(val) == "[object Null]") {return }
  // if (typeJudge(val) == "[object Undefined]") {return }

  function without(array, values) {
    return array.filter(it => !values.includes(it))
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
    flattenDeep,
    flattenDepth,
    fromPairs,
    head,
    indexOf,
    initial,
    intersection,
    nth,
    pull,
    lastIndexOf,
    pullAll,
    pullAllBy,
    pullAllWith,
    reverse,
    sortedIndex,
    union,
    without,
    xor,
    zip,
    countBy,
    every,
    filter,
    find,
    flatMap,
    flatMapDepth,
    forEach,
    grounpBy,
    keyBy,
    map,
    partition,
    includes,
    typeJudge,
    join,
    last,
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
}()

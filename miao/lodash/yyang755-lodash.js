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
  //function differenceBy(array, ...values) { }
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
    if (fromIndex < 0) return -1
    predicate = iteratee(predicate)
    for (let i = fromIndex; i < array.length; i++) {
      if (predicate(array[i])) return i
    }
    return -1
  }

  function findLastIndex(collection, predicate, fromIndex = collection.length - 1
  ) {
    predicate = iteratee(predicate);
    for (let i = fromIndex; i >= 0; i--) {
      if (predicate(collection[i])) {
        return i
      }
    }
  }

  function flatten(array) {
    return [].concat(...array)
  }

  function flattenDeep(array) {
    while (array.some(item => Array.isArray(item))) {
      array = [].concat(...array)//...
    }
    return array

    // let res = []
    // for (let i = 0; i < array.length; i++) {
    //     if (Array.isArray(array[i])) {
    //         let array = flattenDeep(array[i])
    //         for (let j = 0; j < array.length; j++) {
    //             res.push(array[j])
    //         }
    //     } else {
    //         res.push(array[i])
    //     }
    // }
    // return res
  }

  function flattenDepth(array, depth = 1) {
    var c = 0
    while (array.some(item => Array.isArray(item))) {
      array = [].concat(...array)
      c++
      if (c == depth) {
        return array
      }
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

  // 获取数组中除了最后一个元素之外的所有元素
  function initial(array) {//倒数第一是-1 即负数加length等于正常index（即正数index）
    return array.slice(0, array.length - 1)//array.splice(-1)  array.pop()

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

  //迭代反向 ,下标没有反向还是原来顺序 fromIndex和检索结果也是
  //  'canal'.lastIndexOf('a');     // returns 3 （没有指明fromIndex则从末尾l处开始反向检索到的第一个a出现在l的后面，即index为3的位置）
  //  'canal'.lastIndexOf('a', 2);  // returns 1（指明fromIndex为2则从n处反向向回检索到其后面就是a，即index为1的位置）
  //  'canal'.lastIndexOf('a', 0);  // returns -1(指明fromIndex为0则从c处向左回向检索a发现没有，故返回-1)
  function lastIndexOf(array, value, fromIndex) {
    if (fromIndex) {
      if (fromIndex < 0) {
        fromIndex += array.length
      }
      for (let i = fromIndex; i >= 0; i--) {
        if (array[i] === value) {
          return i
        }
      }
      return -1//
    }
    if (!fromIndex) {
      for (let i = array.length - 1; i > 0; i--) {
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

  function pull(array, ...values) {//...不加...调试的时候只有一个元素
    for (var key of values) {
      while (array.includes(key)) {
        array.splice(array.indexOf(key), 1)
      }
    }
    return array
  }

  //这里values只能是数组
  function pullAll(array, values) {
    for (let key of values) {
      while (array.includes(key)) {
        array.splice(array.indexOf(key), 1)
      }
    }
    return array
  }

  //函数不清楚控制台试一试
  function pullAllBy(array, values, itee) {//function pullAllBy(array, ...values, itee)扩展运算符只能在末尾
    //错误：Line 323: Rest element must be last element
    itee = iteratee(itee)
    var result = []
    //let same = itee(values.shift())//取出第一项返回
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < values.length; j++) {
        if (itee(array[i]) == itee(values[j])) {
          //array.splice(i, 1)//从i起取出几项返回，但一般要的是array
          result.push(array[i])
        }
      }
    }
    return pullAll(array, result)//array.
  }
  pullAll
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
    // while (values[0] !== undefined) {
    //     let same = values.shift()
    //     for (let i = 0; i < array.length; i++) {
    //         if (itee(same, array[i])) {
    //             array.splice(i, 1)
    //             i--
    //         }
    //     }
    // }
    // return array
  }

  function reverse(array) {
    var result = []
    for (var i = array.length - 1; i >= 0; i--) {//=
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
    fromIndex = fromIndex >= 0 ? fromIndex : collection.length + fromIndex//
    if (typeJudge(collection) == "[object Object]") {
      for (let key in collection) {//in
        if (collection[key] === value) return true
      }
    } else if (typeJudge(collection) == "[object Array]") {
      for (let i = fromIndex; i < collection.length; i++) {
        if (collection[i] === value) return true
      }
    } else if (typeJudge(collection) == "[object String]") {
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

  function without(array, ...values) {//...
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
      return f.call(thisArg, copy, ...args)
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
    return function (...values) {//return后面是一个函数，很好理解，大多是接一个函数，然后返回一个函数
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

  function xor(...arrays) {//...多个数组，
    var array = [].concat(...arrays)//.flatten()
    for (let i = 0; i < array.length; i++) {
      if (array.lastIndexOf(array[i] != i)) {
        array = pull(array, array[i])//
        //i = 0
        i--
      }
    }
    return array
  }

  function zip(...arrays) {
    var result = []
    var m = arrays.length
    var n = arrays[0].length
    // var n = arrays.reduce((a, b) => {//得到最长的数组长度
    //   if (a.length > b.length) return a
    //   else {
    //     return b
    //   }
    //}, 0)//, 0
    for (let i = 0; i < n; i++) {
      result.push([])
    }
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        result[j][i] = arrays[i][j]//内外相反
      }
    }
    return result
  }

  // 这个函数会处理每一个元素
  //   [iteratee=_.identity] (Function|Object|string)
  //   [predicate=_.identity] (Function|Object|string)
  function every(collection, predicate) {
    predicate = iteratee(predicate)
    for (let i = 0; i < collection.length; i++) {
      if (!predicate(collection[i])) {
        return false//返回布尔值
      }
    }
    return true
  }

  function filter(collection, predicate) {
    var result = []
    predicate = iteratee(predicate)
    for (let i = 0; i < collection.length; i++) {
      if (predicate(collection[i])) {
        result.push(collection[i])//返回所有元素集合
      }
    }
    return result
  }

  function isInside(node, target) {//判断是否是父子节点祖先
    for (; node !== null; node = node.parentNode) {
      if (node == target) {
        return true
      }
      return false
    }
  }
  function swapNode(a, b) {
    if (isInside(a, b) && isInside(b, a)) {
      throw new Error('a or b contains the other node, can not execute swap')
    }
    var dummy = document.creatTextNode('a')
    b.parentNode.insertBefore(dummy, b)
    a.parentNode.insertBefore(b, a)
    dummy.parentNode.insertBefore(a, dummy)
    dummy.parentNode.removeChild(dummy)
  }

  // findIndex() 方法，它返回数组中找到的元素的索引，而不是其值。
  // 如果你需要找到一个元素的位置或者一个元素是否存在于数组中，使用Array.prototype.indexOf() 或 Array.prototype.includes()。
  //遍历集合中的元素，返回`最先`经 predicate 检查为真值的元素。
  function find(collection, predicate, fromIndex = 0) {
    predicate = iteratee(predicate)
    for (let i = fromIndex; i < collection.length; i++) {
      if (iteratee(collection[i])) {
        return collection[i]//返回元素
      }
    }
    return undefined
  }
  function findLast(collection, predicate, fromIndex = collection.length - 1) {
    predicate = iteratee(predicate)
    for (let i = collection.length; i > 0; i--) {
      if (iteratee(collection[i])) {
        return collection[i]
      }
    }
    return undefined
  }

  function flatMap(collection, predicate) {
    var result = []
    //predicate = iteratee(predicate)  ?
    for (let i = 0; i < collection.length; i++) {
      result.push(predicate(collection[i]))
    }
    return flattenDeep(result)
  }

  function flatMapDeep(collection, predicate) {
    var result = []
    //predicate = iteratee(predicate)
    for (let i = 0; i < collection.length; i++) {
      result.push(predicate(collection[i]))
    }
    return flattenDeep(result)
  }

  function flatMapDepth(collection, predicate) {
    var result = []
    //predicate = iteratee(predicate)
    for (let i = 0; i < collection.length; i++) {
      result.push(predicate(collection[i]))
    }
    return flattenDepth(result)
  }
  // 注意: 与其他集合方法一样，对象的 length 属性也会被遍历，避免这种情况，可以用 .forIn 或者 .forOwn 代替。
  function forEach(collection, iteratee) {
    for (var key in collection) {
      //iteratee = iteratee(iteratee)
      iteratee(collection[key], key, collection)
    }
    return collection
  }

  function grounpBy() {

  }

  function map(collection, predicate) {
    var result = []
    iteratee = iteratee(predicate)
    if (typeJudge(collection) == "[object Array]") {
      for (let i = 0; i < collection.length; i++) {
        result.push(iteratee(collection[i], i, collection))
      }
    }
    if (typeof collection == 'object') {
      for (var key in collection) {//in
        result.push(iteratee(collection[key], key, collection))
      }
    }
    return result
  }
  // 创建一个拆分为两部分的数组。 第一部分是 predicate 检查为真值的，第二部分是 predicate 检查为假值的。
  function partition(collection, predicate) {
    var result = [[], []]
    predicate = iteratee(predicate)
    for (let i = 0; i < collection.length; i++) {
      if (predicate(collection[i]) == true) {
        result[0].push(collection[i])
      }
      else if (predicate(collection[i]) == false) {
        result[1].push(collection[i])
      }
    }
    return result
  }

  function reduce(collection, iteratee, accumulator) {
    //var result = accumulator
    var start = 0
    if (typeJudge(collection) == "[object Object]") {
      if (accumulator == undefined) {
        accumulator = {}
      }
      for (let key in collection) {
        accumulator = iteratee(accumulator, collection[key], key, collection)
      }
    }
    if (accumulator == undefined) {
      accumulator = collection[0]
      start = 1
    }
    for (var i = start; i < collection.length; i++) {
      accumulator = iteratee(accumulator, collection[i], i, collection)
    }
    return accumulator
  }

  function reduceRight(collection, iteratee, accumulator) {
    var start = collection.length - 1
    if (accumulator == undefined) {
      accumulator = collection[collection.length - 1]
      start = collection.length - 2// - 2
    }
    for (var i = start; i >= 0; i--) {
      accumulator = iteratee(accumulator, collection[i], i, collection)
    }
    return accumulator
  }

  function sampleSize(collection, n = 0) {
    var result = []
    if (n == 0) {
      return result
    }
    for (let i = 0; i < n; i++) {
      result.push(collection[Math.floor(Math.random() * collection.length)])
    }
    return result
  }

  // 从集合中随机获得元素 
  // | 或	两个位都为0时，结果才为0  与或非
  // ^	异或	两个位相同为0，相异为1
  function sample(collection) {
    var idx = Math.floor(Math.random() * collection.length)
    return collection[idx]
    //return collection.splice(idx, 1)
  }


  function shuffle(collection) {
    return sampleSize(collection, collection.length)
  }

  // Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。
  function size(collection) {
    if (typeof collection == 'object') {
      return Object.keys(collection).length
    }
    return collection.length
    //return collection.length || Object.keys(collection).length
  }

  function some(collection, predicate) {
    predicate = iteratee(predicate)  //
    for (let i = 0; i < collection.length; i++) {
      if (predicate(collection[i]) == true) {
        return true
      }
    }
    return false
  }

  function defer(func, ...args) {
    var id = setTimeout(func, 1, ...args)
    return id - 1
  }

  function delay(func, wait, ...args) {
    var id = setTimeout(func, wait, ...args)
    return id - 1
  }

  function isDate(value) {
    return typeJudge(value) == "[object Date]"
    //return value instanceof Date
  }

  function isElement(value) {
    return typeJudge(value) == "[object HTMLBodyElement]"
  }
  function isEmpty(value) {
    if (typeJudge(value) == "[object String]" && value.length > 0) {
      return false
    }
    if (typeJudge(value) == "[object Array]" && value.length > 0) {
      return false
    }
    var tem = []
    if (typeJudge(value) == "[object Object]") {
      for (var key in value) {
        tem.push(key)
      }
      if (tem.length > 0) {
        return false
      }
    }
    return true
  }

  function isError(value) {
    return typeJudge(value) == "[object Error]"
  }

  // 检查 value 是否是 finite number。
  function isFinite(value) {
    if (typeJudge(value) !== "[object Number]") return false
    if (value == Infinity || value == - Infinity) {
      return false
    }
    return true
  }

  function isFunction(value) {
    return typeJudge(value) == "[object Function]"
  }
  // valueOf() 方法返回指定对象的原始值。
  function isNaN(value) {
    if (typeof value == "object") {
      value = value.valueof()
    }
    return value !== value
  }

  // 检查 value 是否是 null 或者 undefined。
  function isNil(value) {
    return value == null
  }

  function isNull(value) {
    return value == null && value !== undefined
    //return value === null
  }

  function isNumber(value) {
    return typeJudge(value) == "[object Number]"
  }

  function isObject(val) {
    return typeJudge(val) == "[object Object]" || typeJudge(val) == "[object Array]" || typeJudge(val) == "[object Function]"
  }

  function isRegExp(value) {
    return typeJudge(value) == "[object RegExp]"
  }

  function isString(value) {
    return typeJudge(value) == "[object String]"
  }

  function isUndefined(value) {//un
    return value === undefined
  }

  function toArray(value) {
    var result = []
    for (var key in value) {
      result.push(value[key])//key
    }
    return result
  }

  function ceil(number, precision = 0) {
    return Math.ceil(number * (10 ** precision)) / (10 ** precision)// 先化为只有一位小数的数，以利用mathceil方法然后还原    ()
  }

  function max(array) {
    var max = -Infinity
    if (!array.length) {
      return undefined
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i] > max) max = array[i]
    }
    return max
  }

  function maxBy(array, predicate) {
    var max = -Infinity
    var predicate = iteratee(predicate)
    if (!array.length) {
      return undefined
    }
    for (let i = 0; i < array.length; i++) {
      if (predicate(array[i]) > max) max = predicate(array[i])
    }
    return max
  }

  function min(array) {
    var min = Infinity
    if (!array.length) {
      return undefined
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i] < min) {
        min = array[i]
      }
    }
    return min
  }

  function minBy(array, predicate) {
    var min = Infinity
    predicate = iteratee(predicate)
    if (!array.length) {
      return undefined
    }
    for (let i = 0; i < array.length; i++) {
      if (predicate(array[i]) < min) {
        min = predicate(array[i])
      }
    }
    return min
  }

  function round(number, precision = 0) {
    return Math.round(number * (10 ** precision)) / (10 ** precision)
  }

  function isFloat(value) {
    return isNumber(value) && Math.floor(value) !== value
  }

  function random(min = 0, max = 1, floating) {
    if (max == undefined) {//只有min时
      max = min
      min = 0
    }
    // if (max >= 0 && max <= 1 || max == undefined && min >= 0 && min <= 1) {
    //   return tem
    // }

    //   else if (typeof max == "boolean") {
    //     floating = max
    //     max = min
    //     min = 0
    // }
    var tem = Math.random() * (max - min) + min
    if (floating || isFloat(min) || isFloat(max)) {
      return tem
    }
    return Math.floor(tem)
  }

  function split(string, separator, limit) {
    var result = []
    for (let i = 0; i < string.length; i++) {
      if (string[i] !== separator) {
        result.push(string[i])
      }
    }
    return result.slice(0, limit)
  }

  function reject(collection, predicate) {
    var result = []
    for (let i = 0; i < collection.length; i++) {
      if (predicate(collection[i] == false)) {
        result.push(collection[i])
      }
    }
    return result
    //return collection.filter(it => !predicate(it))
  }

  function isEqual(value, other) {
    if (value === other) return true
    if (value !== value && other !== other) return true
    if (value === null) {
      return other === null
    }
    var a = typeof value
    var b = typeof other
    if (a === b) {
      if (a == 'object') {
        var c = Object.keys(value).length
        var d = Object.keys(other).length
        if (c === d) {
          for (var key in a) {
            if (a[key] !== b[key]) {
              return false
            }
          }
          return true
        }
      }
      return false
    }
  }

  // 返回一个 function 对象自身可枚举属性名的数组。
  function functions(object) {
    var result = []
    var keys = Object.keys(object)//提出属性名
    for (var key in keys) {//遍历属性名
      if (isFunction(object(key))) {
        result.push(key)
      }
    }
    return key
  }

  function keys(object) {
    var result = []
    for (var key in object) {
      if (object.hasOwnProperty(key)) {//
        result.push(key)
      }
    }
    return result
  }

  function keysIn() {
    var result = []
    for (var key in object) {
      result.push(key)
    }
    return result
  }
  // 反向版 _.mapValues。 这个方法创建一个对象，对象的值与源对象相同，但 key 是通过 iteratee 产生的。
  function mapKeys(object, itee) {
    var result = {}
    itee = iteratee(itee)//
    var keys = Object.keys(object)
    for (var key of keys) {
      result[itee(object[key], key, object)] = object(key)
    }
    return result
  }
  // 创建一个对象，对象的key相同，值是通过 iteratee 产生的。 iteratee 会传入3个参数： (value, key, object)
  function mapValues(object, itee) {
    var result = {}
    itee = iteratee(itee)
    var keys = Object.keys(object)//函数Object
    for (var key of keys) {
      result[key] = itee(object[key], key, object)
    }
    return result
  }

  function substract(minuend, substrahend) {
    return minuend - substract
  }

  function sum(array) {
    var sum = 0
    //for (let val of arr)
    for (let i = 0; i < array.length; i++) {
      sum += array[i]
    }
    return sum
    // return array.reduce(function(sum, it) {
    //   return sum + it
    // }, 0)
    // return array.reduce((sum,it) => sum + it, 0)
  }

  function sumBy(array, itee) {
    itee = iteratee(itee)
    return array.reduce((sum, it) => sum + itee(it), 0)
  }

  function clamp(number, min, max) {
    if (min > max) {
      return min
    }
    if (min < max) {
      return max
    }
    if (min = max) {
      return number
    }
  }
  // 分配来源对象的可枚举属性到目标对象上。
  function assign(object, ...source) {
    source.forEach(it => {
      for (let key of Object.keys(it)) {
        object[key] = it[key]
      }
    })
    return object
  }

  function assignIn(object, ...source) {
    for (let key of source) {
      for (let i in key) {
        object[i] = source[i]
      }
    }
    return object
  }
  //get //match
  function at(object, paths) {
    var result = []
    if (isString(paths)) {
      return result.push(get(object, paths))
    } else {
      paths.forEach(path => {
        result.push(get(object, path))
      })
    }
    return result
  }

  function escape(string) {
    return string.replace(/[\&\<\>\'\"]/g, x => {
      if (x == '&') {
        return '&amp;'
      }
      if (x == '<') {
        return '&lt;'
      }
      if (x == '>') {
        return '&gt;'
      }
      if (x == "'") {//'用""  "相反
        return '&#39;'
      }
      if (x == '"') {
        return '&quot;'
      }
    })
  }

  function pad(string = '', length = 0, chars = ' ') {
    if (length <= string.length) {
      return string
    }
    var left = Math.floor(Math.ceil((length - string.length) / chars.length) / 2)
    for (let i = 0; i < left; i++) {
      string = chars + string
    }
    while (string.length < length) {
      string = string + chars
    }
    return string.slice(0, length)
  }

  function padStart(string = '', length = 0, chars = ' ') {
    var temp = string
    if (length <= string.length) {
      return string
    }
    while (string.length < length) {
      string = chars + string//
    }
    return string.slice(0, length - temp.length) + temp
  }

  function padEnd(string = '', length = 0, chars = ' ') {
    if (length <= string) {
      return string
    }
    while (string.length < length) {
      string += chars
    }
    return string.slice(0, length)
  }

  function parseInt(string, radix = 10) {
    return Number.parseInt(string, radix)
  }

  function repeat(string, n) {
    var result = ''
    for (let i = 0; i < n; i++) {
      result += string
    }
    return result
  }

  function unescape(string) {
    return str.replace(/&amp;|&lt;| &gt;|&quot;|&#39/g,
      x => {
        if (x == "&amp;")
          return "&";
        if (x == "&lt;")
          return "<";
        if (x == "&gt;")
          return ">";
        if (x == "&quot;")
          return '"'
        if (x == "&#39")
          return "'"
      })

    //   return string.replace(
    //     /(&amp;)|(&lt;)|(&gt;)|(&quot;)|(&#39;)|(&#96;)/g,
    //     (match) => {
    //         switch (match) {
    //             case "&amp;":
    //                 return "&"
    //             case "&lt;":
    //                 return "<"
    //             case "&gt;":
    //                 return ">"
    //             case "&quot;":
    //                 return '"'
    //             case "&#39;":
    //                 return "'"
    //             case "&#96;":
    //                 return "`"
    //             default:
    //                 return match
    //         }
    //     }
    // )
  }

  // arguments 是一个对应于传递给函数的参数的类数组对象。
  function range(start = 0, end, step = 1) {
    if (arguments == 0) return []//传进去的是0
    if (arguments.length == 1) [start, end] = [0, start]//只传一个值,按题意来写
    if (step == undefined && end < 0) step = -1
    var result = []
    if (step == 0) {
      for (let i = start; i < end; i++) {
        result.push(start)
      }
    }
    if (start < end) {
      for (let i = start; i > end; i += step) {
        result.push(i)
      }
    } else {
      for (let i = start; i < end; i += step) {
        result.push(i)
      }
    }
    return result
  }

  function rangeRight(...args) {
    return range(...args).reverse()
  }

  function times(n, iteratee) {
    var result = []
    for (let i = 0; i < n; i++) {
      result.push(iteratee(i))
    }
    return result
  }

  function uniqueId(prefix = '') {
    return prefix + Date.now()
  }

  // var object = { 'user': 'fred' };
  // var getter = _.constant(object);

  // getter() === object;
  // // => true
  function constant(value) {
    return function () {
      return value
    }
  }
  //创建一个最多接受 N 个参数，忽略多余参数的方法。
  function ary(func, n = func.length) {
    return function (...args) {
      return func(...args.slice(0, n))
    }
  }

  function ary(func, n = func.length) {
    return function (...args) {
      return func(...args.slice(0))
    }
  }

  function once(func) {
    var flag = true
    var result = null
    return function (...args) {
      if (flag == true) {
        result = func(...args)
        flag = false
      }
      return result
    }
  }

  return {
    chunk,
    compact,
    concat,
    difference,
    reject,
    range,
    rangeRight,
    parseInt,
    repeat,
    escape,
    unescape,
    keys,
    keysIn,
    assign,
    assignIn,
    clamp,
    sum,
    sumBy,
    substract,
    some,
    once,
    ary,
    constant,
    uniqueId,
    times,
    at,
    pad,
    padEnd,
    padStart,
    size,
    delay,
    random,
    shuffle,
    isDate,
    isElement,
    isEmpty,
    isError,
    isString,
    isRegExp,
    isNumber,
    isFloat,
    isNull,
    isNaN,
    isNil,
    isUndefined,
    isFunction,
    defer,
    toArray,
    isFinite,
    isObject,
    split,
    ceil,
    max,
    maxBy,
    min,
    minBy,
    round,
    //differenceBy,
    sample,
    sampleSize,
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
    isBoolean,
    isArray,
    isArguments,
    //countBy,
    every,
    filter,
    find,
    flatMap,
    flatMapDeep,
    flatMapDepth,
    forEach,
    //grounpBy,
    //keyBy,
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
    reduce,
    reduceRight,
    after,
    before,
    flip,
    negate,
    spread,
    forOwn,
  };
}()

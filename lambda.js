var _ = require("underscore")

function fail(thing) { throw new Error(thing); } 
function warn(thing) { console.log(["WARNING:", thing].join(' ')); }
function note(thing) { console.log(["NOTE:", thing].join(' ')); }

function doWhen(cond, action) 
{ 
  if(truthy(cond))
    return action(); 
  else
    return undefined
}

// The function existy is meant to define the existence of something. 
// JavaScript has two values —null and undefined— that signify nonexistence.

function existy(x)
{
  return x != null;
}

// The truthy function is used to determine if something should be considered a synonym
// for true

function truthy(x)
{
  return (x !== false) && existy(x);
}

function cat() 
{
  var head = _.first(arguments);

  if(existy(head))
    return head.concat.apply(head, _.rest(arguments))
  else
    return []
}

function construct(head, tail)
{
  return cat([head], _.toArray(tail));
}

function mapcat(fun, coll)
{
  return cat.apply(null, _.map(coll, fun));
}

// the func‐ tion complement took a predicate function 
// and returned a new function that returned its opposite truthiness

function complement(PRED) 
{
  return function()
  {
    return !PRED.apply(null, _.toArray(arguments));
  }
}

function isEven(n)
{
  return (n%2) === 0
}

var isOdd = complement(isEven);

function plucker(FIELD)
{
  return function(obj)
  {
    return (obj && obj[FIELD]);
  }
}

// var best = {title: "Infinite Jest", author: "DFW"};
// var getTitle = plucker('title');
// getTitle(best);
//=> "Infinite Jest"

function finder(valueFun, bestFun, coll)
{
  return _.reduce(coll, function(best, current)
  {
    var bestValue = valueFun(best);
    var currentValue = valueFun(current);

    return (bestValue === bestFun(bestValue, currentValue) ? best : current);
  })
}

// finder(_.identity, Math.max, [1,2,3,4,5]); 
//=> 5

// finder(plucker('age'), Math.max, people);
//=> {name: "Fred", age: 65}

function best(fun, coll)
{
  return _.reduce(coll, function(x, y)
  {
    return fun(x, y) ? x : y;
  })
}

// best(function(x,y) { return x > y }, [1,2,3,4,5]); //=> 5

function repeat(times, VALUE)
{
  return _.map(_.range(times), function() { return VALUE; })
}

// repeat(4, "Major");
//=> ["Major", "Major", "Major", "Major"]

function repeatedly(times, fun)
{
  return _.map(_.range(times), fun);
}

// repeatedly(3, function() { return Math.floor((Math.random()*10)+1);});
//=> [1, 3, 8]

function iterateUntil(fun, check, init)
{
  var ret = [];
  var result = fun(init);

  while(check(result))
  {
    ret.push(result);
    result = fun(result);
  }

  return ret;
}

// iterateUntil(function(n) { return n+n }, function(n) { return n <= 1024 },1);
//=> [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]

function always(VALUE)
{
  return function()
  {
    return VALUE;
  }
}

// The always function is what’s known as a combinator

// takes a method and returns a function that will invoke that method on any object given

function invoker(NAME, METHOD)
{
  return function(target /* args... */)
  {
    if(!existy(target)) fail("Must provide a target")

    var targetMethod = target[NAME];
    var args = _.rest(arguments);

    return doWhen((existy(targetMethod) && METHOD === targetMethod), function()
    {
      return targetMethod.apply(target, args);
    })
  }
}

// var rev = invoker('reverse', Array.prototype.reverse);
// _.map([[1,2,3]], rev);
//=> [[3,2,1]]































































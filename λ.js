exports.existy = function(fun)
{
  return function(array)
  {
    return fun.apply(null, array);
  }
}
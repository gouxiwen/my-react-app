function f1(arg) {
  console.log(arg)
  return arg + 'f1'
}
function f2(arg) {
  console.log(arg)
  return arg + 'f2'
}
function f3(arg) {
  console.log(arg)
  return arg + 'f3'
}
// f1(f2(f3('omg')))
compose(f1,f2,f3)('omg')

function compose(...funs) {
  if(funs.length === 0) {
    return arg => arg;
  }
  if(funs.length === 1) {
    return funs[0]
  }
  return funs.reduce((previousValue, currentValue) => {
    console.log(currentValue)
    return (...args) => {
      console.log(args)
      return previousValue(currentValue(...args))
    }
  })
}
// 第一次迭代previousValue是f1，currentValue是f2
// 返回 (..arg) => previousValue(currentValue(...args))
// 即返回 (..arg) => f1(f2(...arg))
// 第二次迭代previousValue是(..arg) => f1(f2(...arg))，currentValue是f3
// 返回 (..arg) => previousValue(currentValue(...args))
// 即返回 (..arg) => f1(f2(f3(...arg)))，迭代完成
// 最终返回(..arg) => f1(f2(f3(...arg)))，..arg就是compose外部传进来的'omg'

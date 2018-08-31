function randomElemFromArr(arr) {
  return arr[(Math.random() * arr.length) | 0]
}

function getArrayOfConstants(len, gen) {
  const initArray = Array.apply(null, new Array(len))
  return initArray.map(y => gen())
}

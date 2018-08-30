function randomElemFromArr(arr) {
  return arr[(Math.random() * arr.length) | 0]
}

function getArrayOfConstants(len, data) {
  const initArray = Array.apply(null, new Array(len))
  return initArray.map(y => return data)
}

function checkKey(e) {
  e = e || window.event

  if ([37, 38, 39, 40].includes(e.keyCode) {
    box.move(e.keyCode - 37)
    box.populate()
    drawBox(box)
  }
}

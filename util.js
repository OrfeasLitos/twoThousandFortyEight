function randomElemFromArr(arr) {
  return arr[(Math.random() * arr.length) | 0]
}

function getArrayOfConstants(len, gen) {
  const initArray = Array.apply(null, new Array(len))
  return initArray.map(y => gen())
}

function checkKey(e) {
  e = e || window.event

  if ([37, 38, 39, 40].includes(e.keyCode)) {
    const justMoved = box.move(e.keyCode - 37)
    if (justMoved) {
      box.populate()
    }
    drawBox(box)
  }
}

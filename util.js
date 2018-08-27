function randomElemFromArr(arr) {
  return arr[(Math.random() * arr.length) | 0]
}

Array.prototype.flat = function() {
  return this.reduce((acc, val) => acc.concat(val), [])
}

function checkKey(e) {
  e = e || window.event

  if (e.keyCode === 37) {
    box.moveLeft()
  }

  else if (e.keyCode === 38) {
    box.moveUp()
  }

  else if (e.keyCode === 39) {
    box.moveRight()
  }

  else if (e.keyCode === 40) {
    box.moveDown()
  }

  if ([37, 38, 39, 40].includes(e.keyCode)) {
    box.populate()
    drawBox(box)
  }
}

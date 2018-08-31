function onkeydown(e) {
  e = e || window.event

  if ([37, 38, 39, 40].includes(e.keyCode)) {
    const justMoved = box.move(e.keyCode - 37)
    if (justMoved) {
      box.populate()
    }
    drawBox(box)
  }
}

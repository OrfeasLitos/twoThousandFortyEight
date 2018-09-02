function onkeydown(e) {
  e = e || window.event

  if ([37, 38, 39, 40].includes(e.keyCode)) {
    const justMoved = game.move(e.keyCode - 37)
    if (justMoved) {
      game.populate()
    }
    drawGame(game)
  }
}

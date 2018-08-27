function drawBox(box) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (box.full) {
    ctx.fillText('Game Over', canvas.width / 2,
                 canvas.height / 2 - 15)
    ctx.fillText(`score: ${box.score}`, canvas.width / 2,
                 canvas.height / 2 + 15)
    return
  }
  for (x = 0; x < box.dim; x++) {
    for (y = 0; y < box.dim; y++) {
      drawSquare(box.getSquare(x, y), x, y)
    }
  }
}

function drawSquare(square, x, y) {
  ctx.moveTo(W*x, H*y)
  ctx.lineTo(W*(x + 1), H*y)
  ctx.lineTo(W*(x + 1), H*(y + 1))
  ctx.lineTo(W*x, H*(y + 1))
  ctx.lineTo(W*x, H*y)
  ctx.stroke()
  if (square.num !== 0) {
    ctx.fillText(square.num, W*(x + 0.5), H*(y + 0.5))
  }
}

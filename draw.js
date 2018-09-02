const TEXTSIZE = 50
const W = canvas.width / N, H = canvas.height / N

const ctx = canvas.getContext('2d')
ctx.font = TEXTSIZE + 'px Arial'
ctx.textAlign = 'center'

function drawBox(box) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (box.gameOver) {
    ctx.fillText('Game Over', canvas.width / 2,
                 (canvas.height - TEXTSIZE) / 2)
    ctx.fillText(`score: ${box.score}`, canvas.width / 2,
                 (canvas.height + TEXTSIZE) / 2)
    return
  }
  for (let x = 0; x < box.N; x++) {
    for (let y = 0; y < box.N; y++) {
      drawSquare(box.model[x][y], y, x)
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
  if (square !== 0) {
    ctx.fillText(square, W*(x + 0.5), H*(y + 0.5))
  }
}

const TEXTSIZE = 50
const W = canvas.width / N, H = canvas.height / N

const ctx = canvas.getContext('2d')
ctx.font = TEXTSIZE + 'px Arial'
ctx.textAlign = 'center'

function drawGame(game) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (game.gameOver) {
    ctx.fillText('Game Over', canvas.width / 2,
                 (canvas.height - TEXTSIZE) / 2)
    ctx.fillText(`score: ${game.score}`, canvas.width / 2,
                 (canvas.height + TEXTSIZE) / 2)
    return
  }
  for (let x = 0; x < game.N; x++) {
    for (let y = 0; y < game.N; y++) {
      drawSquare(game.model[x][y], y, x)
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

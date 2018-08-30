const canvas = document.getElementById('canvas')
const DIM = 4
const TEXTSIZE = 50
const W = canvas.width / DIM, H = canvas.height / DIM

const ctx = canvas.getContext('2d')
ctx.font = TEXTSIZE + 'px Arial'
ctx.textAlign = 'center'

const box = new Box(DIM)
box.populate()
drawBox(box)
document.onkeydown = checkKey

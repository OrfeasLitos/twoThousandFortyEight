const canvas = document.getElementById('canvas')
const DIM = 4
const W = canvas.width / DIM, H = canvas.height / DIM

const ctx = canvas.getContext('2d')
ctx.font = '50px Arial'
ctx.textAlign = 'center'

const box = new Box(DIM)
box.populate()
drawBox(box)
document.onkeydown = checkKey

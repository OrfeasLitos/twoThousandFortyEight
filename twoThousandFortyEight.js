// TODO: fix multiple collisions
class Box {
  constructor(H) {
    this.full = false
    this.dim = H
    this.lines = []
    this.score = 0
    for (let i = 0; i < H; i++) {
      this.lines[i] = []
      for (let j = 0; j < H; j++) {
        this.lines[i][j] = new Square()
      }
    }
  }

  unsetMerges() {
    for (let x = 0; x < this.dim; x++) {
      for (let y = 0; y < this.dim; y++) {
        this.getSquare(x, y).merged = false
      }
    }
  }

  populate() {
    this.unsetMerges()
    const num = randomElemFromArr([2, 4])
    if (this.getEmptySquares().length === 0) {
      this.full = true
      return
    }
    const newSquare = randomElemFromArr(this.getEmptySquares())
    newSquare.num = num
  }

  getEmptySquares() {
    return this.lines.flat().filter(square => !square.full)
  }

  print() {
    let res = '';
    for (let y = 0; y < this.dim; y++) {
      for (let x = 0; x < this.dim; x++) {
        res += this.getSquare(x, y).num
      }
      if (y !== this.dim - 1) {
        res += '\n'
      }
    }
    console.log(res)
  }

  getSquare(x, y) {
    return this.lines[x][y]
  }

  // down
  canMoveDown(x, y) {
    if (y === this.dim - 1) {
      return false
    }
    const next = this.getSquare(x, y + 1)
    if (next.full && next.num !== this.getSquare(x, y).num) {
      return false
    }
    return true
  }

  collideDownSquare(x, y) {
    if (!this.canMoveDown(x, y)) {
      return
    }

    let next = y + 1
    while (next < this.dim && !this.getSquare(x, next).full) {
      next++
    }

    if (next === this.dim) { // goes to top
      this.getSquare(x, this.dim - 1).num = this.getSquare(x, y).num
      this.getSquare(x, y).num = 0
      return
    }

    if (this.getSquare(x, y).num ===
        this.getSquare(x, next).num &&
        !this.getSquare(x, next).merged) { // merge
      this.getSquare(x, next).num *= 2
      this.getSquare(x, y).num = 0
      this.score += this.getSquare(y, next).num
      this.getSquare(y, next).merged = true
      return
    }

    this.getSquare(x, next - 1).num = this.getSquare(x, y).num
    this.getSquare(x, y).num = 0
  }

  moveDown() {
    for (let x = 0; x < this.dim; x++) {
      for (let y = this.dim - 1; y >= 0; y--) {
        if (this.getSquare(x, y).full) {
          this.collideDownSquare(x, y)
        }
      }
    }
  }

  // left
  canMoveLeft(x, y) {
    if (x === 0) {
      return false
    }
    const next = this.getSquare(x - 1, y)
    if (next.full && next.num !== this.getSquare(x, y).num) {
      return false
    }
    return true
  }

  collideLeftSquare(x, y) {
    if (!this.canMoveLeft(x, y)) {
      return
    }

    let next = x - 1
    while (next >= 0 && !this.getSquare(next, y).full) {
      next--
    }

    if (next === -1) { // goes to the left
      this.getSquare(0, y).num = this.getSquare(x, y).num
      this.getSquare(x, y).num = 0
      return
    }

    if (this.getSquare(x, y).num ===
        this.getSquare(next, y).num &&
        !this.getSquare(next, y).merged) { // merge
      this.getSquare(next, y).num *= 2
      this.getSquare(x, y).num = 0
      this.score += this.getSquare(next, y).num
      this.getSquare(next, y).merged = true
      return
    }

    this.getSquare(next + 1, y).num = this.getSquare(x, y).num
    this.getSquare(x, y).num = 0
  }

  moveLeft() {
    for (let y = 0; y < this.dim; y++) {
      for (let x = 0; x < this.dim; x++) {
        if (this.getSquare(x, y).full) {
          this.collideLeftSquare(x, y)
        }
      }
    }
  }

  // right
  canMoveRight(x, y) {
    if (x === this.dim - 1) {
      return false
    }
    const next = this.getSquare(x + 1, y)
    if (next.full && next.num !== this.getSquare(x, y).num) {
      return false
    }
    return true
  }

  collideRightSquare(x, y) {
    if (!this.canMoveRight(x, y)) {
      return
    }

    let next = x + 1
    while (next < this.dim && !this.getSquare(next, y).full) {
      next++
    }

    if (next === this.dim) { // goes to the right
      this.getSquare(this.dim - 1, y).num = this.getSquare(x, y).num
      this.getSquare(x, y).num = 0
      return
    }

    if (this.getSquare(x, y).num ===
        this.getSquare(next, y).num &&
        !this.getSquare(next, y).merged) { // merge
      this.getSquare(next, y).num *= 2
      this.getSquare(x, y).num = 0
      this.score += this.getSquare(next, y).num
      this.getSquare(next, y).merged = true
      return
    }

    this.getSquare(next - 1, y).num = this.getSquare(x, y).num
    this.getSquare(x, y).num = 0
  }

  moveRight() {
    for (let y = 0; y < this.dim; y++) {
      for (let x = this.dim - 1; x >= 0; x--) {
        if (this.getSquare(x, y).full) {
          this.collideRightSquare(x, y)
        }
      }
    }
  }

  // up
  canMoveUp(x, y) {
    if (y === 0) {
      return false
    }
    const next = this.getSquare(x, y - 1)
    if (next.full && next.num !== this.getSquare(x, y).num) {
      return false
    }
    return true
  }

  collideUpSquare(x, y) {
    if (!this.canMoveUp(x, y)) {
      return
    }

    let next = y - 1
    while (next >= 0 && !this.getSquare(x, next).full) {
      next--
    }

    if (next === -1) { // goes to top
      this.getSquare(x, 0).num = this.getSquare(x, y).num
      this.getSquare(x, y).num = 0
      return
    }

    if (this.getSquare(x, y).num ===
        this.getSquare(x, next).num &&
        !this.getSquare(x, next).merged) { // merge
      this.getSquare(x, next).num *= 2
      this.getSquare(x, y).num = 0
      this.score += this.getSquare(y, next).num
      this.getSquare(x, next).merged = true
      return
    }

    this.getSquare(x, next + 1).num = this.getSquare(x, y).num
    this.getSquare(x, y).num = 0
  }

  moveUp() {
    for (let x = 0; x < this.dim; x++) {
      for (let y = 0; y < this.dim; y++) {
        if (this.getSquare(x, y).full) {
          this.collideUpSquare(x, y)
        }
      }
    }
  }
}

class Square {
  constructor(n = 0) {
    this.num = n
    this.merged = false
  }

  set num(n) {
    this.n = n
    this.full = (n) ? true : false
  }

  get num() {
    return this.n
  }
}

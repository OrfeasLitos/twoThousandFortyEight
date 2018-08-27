class Box {
  constructor(H) {
    this.full = false
    this.dim = H
    this.lines = []
    for (let i = 0; i < H; i++) {
      this.lines[i] = []
      for (let j = 0; j < H; j++) {
        this.lines[i][j] = new Square()
      }
    }
  }

  populate() {
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
    for (let line in this.lines) {
      for (let square in this.lines[line]) {
        console.log(this.lines[line][square])
      }
    }
  }

  getSquare(x, y) {
    return this.lines[x][y]
  }

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
        this.getSquare(x, next).num) { // merge
      this.getSquare(x, next).num *= 2
      this.getSquare(x, y).num = 0
      return
    }

    this.getSquare(x, next - 1).num = this.getSquare(x, y).num
    this.getSquare(x, y).num = 0
  }

  moveDown() {
    for (let i = 0; i < this.dim; i++) {
      for (let j = this.dim - 1; j >= 0; j--) {
        if (this.lines[i][j].full) {
          this.collideDownSquare(i, j)
        }
      }
    }
  }
//
//  canMoveUp(x, y) {
//    if (y === 0) {
//      return false
//    }
//    const next = this.getSquare(x, y - 1)
//    if (next.full && next.num !== this.getSquare(x, y).num) {
//      return false
//    }
//    return true
//  }
//
//  collideUpSquare(x, y) {
//    if (!this.canMoveUp(x, y)) {
//      return
//    }
//
//    let next = y - 1
//    while (next >= 0 && !this.getSquare(x, next).full) {
//      next--
//    }
//
//    if (next === -1) { // goes to top
//      this.getSquare(x, 0).num = this.getSquare(x, y).num
//      this.getSquare(x, y).num = 0
//      return
//    }
//
//    if (this.getSquare(x, y).num ===
//        this.getSquare(x, next).num) { // merge
//      this.getSquare(x, next).num *= 2
//      this.getSquare(x, y).num = 0
//      return
//    }
//
//    this.getSquare(x, next + 1).num = this.getSquare(x, y).num
//    this.getSquare(x, y).num = 0
//  }
//
//  moveUp() {
//    for (let i = 0; i < this.dim; i++) {
//      for (let j = 0; j < this.dim; j++) {
//        if (this.lines[i][j].full) {
//          this.collideUpSquare(i, j)
//        }
//      }
//    }
//  }
//
//  canMoveUp(x, y) {
//    if (y === 0) {
//      return false
//    }
//    const next = this.getSquare(x, y - 1)
//    if (next.full && next.num !== this.getSquare(x, y).num) {
//      return false
//    }
//    return true
//  }
//
//  collideUpSquare(x, y) {
//    if (!this.canMoveUp(x, y)) {
//      return
//    }
//
//    let next = y - 1
//    while (next >= 0 && !this.getSquare(x, next).full) {
//      next--
//    }
//
//    if (next === -1) { // goes to top
//      this.getSquare(x, 0).num = this.getSquare(x, y).num
//      this.getSquare(x, y).num = 0
//      return
//    }
//
//    if (this.getSquare(x, y).num ===
//        this.getSquare(x, next).num) { // merge
//      this.getSquare(x, next).num *= 2
//      this.getSquare(x, y).num = 0
//      return
//    }
//
//    this.getSquare(x, next + 1).num = this.getSquare(x, y).num
//    this.getSquare(x, y).num = 0
//  }
//
//  moveUp() {
//    for (let i = 0; i < this.dim; i++) {
//      for (let j = 0; j < this.dim; j++) {
//        if (this.lines[i][j].full) {
//          this.collideUpSquare(i, j)
//        }
//      }
//    }
//  }
//
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
        this.getSquare(x, next).num) { // merge
      this.getSquare(x, next).num *= 2
      this.getSquare(x, y).num = 0
      return
    }

    this.getSquare(x, next + 1).num = this.getSquare(x, y).num
    this.getSquare(x, y).num = 0
  }

  moveUp() {
    for (let i = 0; i < this.dim; i++) {
      for (let j = 0; j < this.dim; j++) {
        if (this.lines[i][j].full) {
          this.collideUpSquare(i, j)
        }
      }
    }
  }
}

class Square {
  constructor(n = 0) {
    this.num = n
  }

  set num(n) {
    this.n = n
    this.full = (n) ? true : false
  }

  get num() {
    return this.n
  }
}

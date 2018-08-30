class Box {
  constructor(dim) {
    this.full = false
    this.dim = dim
    this.score = 0

    this.squares = getArrayOfConstants(
      this.dim * this.dim, new Square(0)
    )
    this.rows = this.squares.reduce(
      (acc, cur, i, arr) => {
        if (i % this.dim === 0) {
          acc.push(arr.slice(i, i + this.dim))
        }
        return acc
      }, []
    )
    this.columns = this.squares.reduce(
      (acc, cur) => {
        acc[i % this.dim].push(cur)
        return acc
      }, getArrayOfConstants(this.dim, [])
    )
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
    return this.squares.filter(square => !square.full)
  }

  print() {
    let res = '';
    for (let row = 0; row < this.dim; y++) {
      for (let column = 0; column < this.dim; x++) {
        res += this.getSquare(row, column).num
      }
      if (y !== this.dim - 1) {
        res += '\n'
      }
    }
    console.log(res)
  }

  getSquare(row, column) {
    return this.squares[this.dim * column + row]
  }

  move(dir) {
    switch (dir) {
      case 0:
        for (row of this.rows) {
          this.score += row.move(-1)
        }
        break
      case 1:
        for (column of this.columns) {
          this.score += column.move(-1)
        }
        break
      case 2:
        for (row of this.rows) {
          this.score += row.move(1)
        }
        break
      case 3:
        for (column of this.columns) {
          this.score += column.move(1)
        }
        break
      default:
        throw new RangeError("Box.move() accepts 0 - 3")
    }
  }
}

class Vector {
  constructor(content) {
    if (typeof content[0] === 'number') {
      this.squares = content.map(x => new Square(x))
    }
    this.size = content.length
    // Add walls
    this.content.unshift(new Square(-1))
    this.content.push(new Square(-1))
  }

  withinWalls(idx) {
    return 0 < idx <= this.size
  }

  move(dir) {
    let nextIdx
    let curIdx
    let score = 0

    if (dir === -1) {
      nextIdx = 0
      curIdx = 1
    }
    else if (dir === 1) {
      nextIdx = this.size + 1
      curIdx = this.size
    }
    else {
      throw new RangeError("move() accepts only -1 or 1")
    }

    while (this.withinWalls(curIdx)) {
      const curSquare = this.squares[curIdx]
      const nextSquare = this.squares[nextIdx]

      if (curSquare.full) { // there is something to move
        if (curSquare.num === nextSquare.num) { // merge
          curSquare.num = 0
          nextSquare.num *= 2
          score += nextSquare.num
        }
        else if (curIdx + dir !== nextIdx) { // there's moving space
          this.squares[nextIdx - dir].num = curSquare.num
          curSquare.num = 0
          nextIdx -= dir
        }
        else { // no move
          nextIdx -= dir
        }
      }
      curIdx -= dir
    }

    return score
  }
}

class Square {
  constructor(row, col, n = 0) {
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

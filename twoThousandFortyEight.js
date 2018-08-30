class Box {
  constructor(dim) {
    this.full = false
    this.dim = dim
    this.score = 0

    this.squares = getArrayOfConstants(
      this.dim * this.dim, () => new Square(0)
    )
    const rows = this.squares.reduce(
      (acc, cur, i, arr) => {
        if (i % this.dim === 0) {
          acc.push(arr.slice(i, i + this.dim))
        }
        return acc
      }, []
    )
    this.rows = rows.map(x => new Vector(x))
    const columns = this.squares.reduce(
      (acc, cur, i) => {
        acc[i % this.dim].push(cur)
        return acc
      }, getArrayOfConstants(this.dim, () => [])
    )
    this.columns = columns.map(x => new Vector(x))
  }

  unsetMerges() {
    this.squares.map(square => square.merged = false)
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
        for (let row of this.rows) {
          this.score += row.move(-1)
        }
        break
      case 1:
        for (let column of this.columns) {
          this.score += column.move(-1)
        }
        break
      case 2:
        for (let row of this.rows) {
          this.score += row.move(1)
        }
        break
      case 3:
        for (let column of this.columns) {
          this.score += column.move(1)
        }
        break
      default:
        throw new RangeError("Box.move() accepts 0 - 3")
    }
  }
}

class Vector {
  constructor(squares) {
    this.size = squares.length
    this.squares = squares
    // Add walls
    this.squares.unshift(new Square(-1))
    this.squares.push(new Square(-1))
  }

  isWithinWalls(idx) {
    return 0 < idx && idx <= this.size
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

    while (this.isWithinWalls(curIdx)) {
      const curSquare = this.squares[curIdx]
      const nextSquare = this.squares[nextIdx]

      if (curSquare.full) { // there is something to move
        if (curSquare.num === nextSquare.num &&
            !nextSquare.merged) { // merge
          curSquare.num = 0
          nextSquare.merged = true
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

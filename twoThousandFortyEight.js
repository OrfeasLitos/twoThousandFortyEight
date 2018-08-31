const N = 4

class Box {
  constructor(dim) {
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

  get hasMerge() {
    const columnsNrows = this.columns.concat(this.rows)
    return columnsNrows.reduce((acc, vec) => {
          if (acc) {
            return true
          }
          return vec.hasMerge
        }, false)
  }

  get full() {
    return this.getEmptySquares().length === 0
  }


  populate() {
    this.unsetMerges()
    const num = choice([2, 4])
    const newSquare = choice(this.getEmptySquares())
    newSquare.num = num
  }

  getEmptySquares() {
    return this.squares.filter(square => !square.full)
  }

  print() {
    let res = '';
    for (let row = 0; row < this.dim; row++) {
      for (let column = 0; column < this.dim; column++) {
        res += this.getSquare(row, column).num
        res += '  '
      }
      if (row !== this.dim - 1) {
        res += '\n'
      }
    }
    console.log(res)
  }

  getSquare(row, column) {
    return this.squares[this.dim * column + row]
  }

  moveVector(vec, dir) {
    const res = vec.move(dir)
    this.score += res[0]
    return res[1]
  }

  move(dir) {
    let res = 0
    switch (dir) {
      case 0:
      case 2:
        for (let row of this.rows) {
          res += this.moveVector(row, dir - 1)
        }
        break
      case 1:
      case 3:
        for (let column of this.columns) {
          res += this.moveVector(column, dir - 2)
        }
        break
      default:
        throw new RangeError("Box.move() accepts 0 - 3")
    }
    return res
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

  get hasMerge() {
    return this.squares.reduce((acc, square, i, vec) => {

      // merge already found
      if (acc) {
        return true
      }

      // top/left wall, no merges
      if (i === 0) {
        return false
      }

      // down/right wall, pass on previous result
      if (i === this.size + 1) {
        return acc
      }

      // found available merge!
      if (square.num === vec[i + 1].num) {
        return true
      }

      // no merge here
      return false
    }, false) // no merges initially
  }

  move(dir) {
    let nextIdx
    let curIdx
    let score = 0
    let justMoved = false

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
          justMoved = true
        }
        else if (curIdx + dir !== nextIdx) { // there's moving space
          this.squares[nextIdx - dir].num = curSquare.num
          curSquare.num = 0
          nextIdx -= dir
          justMoved = true
        }
        else { // no move
          nextIdx -= dir
        }
      }
      curIdx -= dir
    }

    return [score, justMoved]
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

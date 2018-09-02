const N = 4

class Game {
  constructor() {
    this.score = 0
    this.model = []
    for (let i = 0; i < N; i++) {
      this.model.push(Array(N).fill(0))
    }
  }

  populate() {
    const freeIndices = []
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (this.model[i][j] === 0) {
          freeIndices.push({i, j})
        }
      }
    }
    const indices = _.sample(freeIndices)
    this.model[indices.i][indices.j] = _.sample([2, 4])
  }

  get gameOver() {
    return this.full && !this.hasMerge
  }

  print() {
    let str = ''
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        str = str + this.model[i][j] + '  '
      }
      if (i !== N - 1) {
        str += '\n'
      }
    }
    console.log(str)
  }

  get hasMerge() {
    let i
    for (i = 0; i < this.N - 1; i++) {
      for (let j = 0; j < this.N - 1; j++) {
        if (this.model[i][j] == this.model[i][j + 1] ||
            this.model[i][j] == this.model[i + 1][j]) {
          return true
        }
      }
    }
    for (let j = 0; j < this.N - 1; j++) {
      if (this.model[i][j] == this.model[i][j + 1]) {
        return true
      }
    }
    return false
  }

  get full() {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (this.model[i][j] == 0) {
          return false
        }
      }
    }
    return true
  }

  move(dir) {
    let model = _.clone(this.model)
    model = this.rotate(model, 4 - dir)
    model = this.squash(model)
    model = this.rotate(model, dir)
    let changed = !(_.isEqual(model, this.model))
    this.model = model
    return changed
  }

  rotate(matrix, n) {
    for (let i = 0; i < n; i++) {
      matrix = this._rotateOnce(matrix)
    }
    return matrix
  }

  _rotateOnce(matrix) {
    const rotated = []
    for (let i = 0; i < matrix.length; i++) {
      rotated.push(Array(matrix.length))
      for (let j = 0; j < matrix.length; j++) {
        rotated[i][j] = matrix[matrix.length - 1 - j][i]
      }
    }
    return rotated
  }

  squash(matrix) {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i] = this.squashRow(matrix[i])
    }
    return matrix
  }

  squashRow(row) {
    const nums = row.filter(x => x), res = []
    let x
    for (x = 1; x <= nums.length; x++) {
      if (nums[x] == nums[x - 1]) {
        res.push(nums[x - 1] * 2)
        this.score += nums[x - 1] * 2
        x++
      }
      else {
        res.push(nums[x - 1])
      }
    }
    if (x == -1) {
      res.push(nums[nums.length - 1])
    }
    return res.concat(Array(row.length - res.length).fill(0))
  }
}

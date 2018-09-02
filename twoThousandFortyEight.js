const N = 4

class Box {
  constructor(N) {
    this.N = N
    this.model = []
    for (let i = 0; i < this.N; i++) {
      this.model.push(Array(this.N).fill(0))
    }
  }

  populate() {
    const freeIndices = []
    for (let i = 0; i < this.N; i++) {
      for (let j = 0; j < this.N; j++) {
        if (this.model[i][j] === 0) {
          freeIndices.push([i, j])
        }
      }
    }
    const indices = choice(freeIndices)
    this.model[indices[0]][indices[1]] = choice([2, 4])
  }

  get gameOver() {
    return this.full && !this.hasMerge
  }

  print() {
    let str = ''
    for (let i = 0; i < this.N; i++) {
      for (let j = 0; j < this.N; j++) {
        str = str + this.model[i][j] + '  '
      }
      if (i !== this.N - 1) {
        str += '\n'
      }
    }
    console.log(str)
  }

  get hasMerge() {
    for (let i = 0; i < this.N - 1; i++) {
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
    for (let i = 0; i < this.N; i++) {
      for (let j = 0; j < this.N; j++) {
        if (this.model[i][j] == 0) {
          return false
        }
      }
    }
    return true
  }

  move(dir) {
    let model = _.clone(this.model)
    if (dir == 0) {
      model = this.rotate(model, 2)
      model = this.squash(model)
      model = this.rotate(model, 2)
    }
    else if (dir == 1) {
      model = this.rotate(model, 1)
      model = this.squash(model)
      model = this.rotate(model, 3)
    }
    else if (dir == 2) {
    console.log("aa");
      model = this.squash(model)
    }
    else if (dir == 3) {
      model = this.rotate(model, 3)
      model = this.squash(model)
      model = this.rotate(model, 1)
    }
    let changed = (_.isEqual(model, this.model)) ? false : true
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
      matrix[i] = this._squash(matrix[i])
    }
    return matrix
  }

  _squash(row) {
    const nums = row.filter(x => x), res = []
    let x
    for (x = nums.length - 2; x >= 0; x--) {
      if (nums[x] == nums[x + 1]) {
        res.push(nums[x + 1] * 2)
        this.score += nums[x + 1] * 2
        x--
      }
      else {
        res.push(nums[x + 1])
      }
    }
    if (x == -1) {
      res.push(nums[0])
    }
    return Array(row.length - res.length).fill(0).concat(res.reverse())
  }
}

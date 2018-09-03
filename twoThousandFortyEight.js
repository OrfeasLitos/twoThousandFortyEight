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

  toString() {
    let str = ''
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        str = str + this.model[i][j] + '  '
      }
      if (i !== N - 1) {
        str += '\n'
      }
    }
    return str
  }

  get hasMerge() {
    const noLeftMerge = _.isEqual(squash(this.model).matrix, this.model)
    const noUpMerge = _.isEqual(squash(rotate(this.model, 1)).matrix, rotate(this.model, 1))
    return !noLeftMerge || !noUpMerge
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
    let model = _.clone(this.model), score
    model = rotate(model, 4 - dir);
    ({matrix: model, score} = squash(model))
    this.score += score
    model = rotate(model, dir)
    let changed = !(_.isEqual(model, this.model))
    this.model = model
    return changed
  }
}

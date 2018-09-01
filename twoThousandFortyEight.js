const N = 4

class Box {
  constructor(N) {
    this.N = N
    this.model = []
    for (let i = 0; i < this.N; i++) {
      this.model.push(Array(this.N).fill(0))
    }
    //this.model = Array(this.N * this.N)
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
    const newIdx = choice(freeIndices)
    this.model[newIdx] = choice([2, 4])
  }

  get gameOver() {
    return this.full && !this.hasMerge
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
    let model = this.model
    if (dir % 2) { // up or down
      model = transpose(model)
    }
    for (let i = 0; i < this.N; i++) {
      if (dir % 4 == 0) { // left or down
        model[i] = this.squash(model[i].reverse()).reverse()
      }
      else {
        model [i] = this.squash(model[i])
      }
    }
    if (dir % 2) { // up or down
      this.model = transpose(model)
    }
    else {
      this.model = model
    }
  }

  squash(row) {
    const nums = row.filter(x => x), res = []
    let score = 0
    for (let x = nums.length - 2; x >= 0; x--) {
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
    return Array(row.length - nums.length).fill(0).concat(res.reverse())
  }
}

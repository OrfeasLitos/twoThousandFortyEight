function rotate(matrix, n) {
  for (let i = 0; i < n; i++) {
    matrix = _rotateOnce(matrix)
  }
  return matrix
}

function _rotateOnce(matrix) {
  const rotated = []
  for (let i = 0; i < matrix.length; i++) {
    rotated.push(Array(matrix.length))
    for (let j = 0; j < matrix.length; j++) {
      rotated[i][j] = matrix[matrix.length - 1 - j][i]
    }
  }
  return rotated
}

function squash(matrix) {
  let totalScore = 0, score
  for (let i = 0; i < matrix.length; i++) {
    ({row: matrix[i], score} = squashRow(matrix[i]))
    totalScore += score
  }
  return {matrix, score: totalScore}
}

function squashRow(line) {
  const nums = line.filter(x => x), res = []
  let x, score = 0
  for (x = 1; x <= nums.length; x++) {
    if (nums[x] == nums[x - 1]) {
      res.push(nums[x - 1] * 2)
      score += nums[x - 1] * 2
      x++
    }
    else {
      res.push(nums[x - 1])
    }
  }
  if (x == -1) {
    res.push(nums[nums.length - 1])
  }
  return {row: res.concat(Array(line.length - res.length).fill(0)), score}
}

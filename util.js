function choice(arr) {
  return arr[(Math.random() * arr.length) | 0]
}

function sum(arr) {
  return arr.reduce((acc, cur) => acc + cur, 0)
}

function flat(arr) {
  return arr.reduce((acc, cur) => {
    acc.concat(cur)
    return acc
  }, [])
}

function transpose(matrix) {
  const N = matrix.length
  const result = []
  for (let i = 0; i < N; i++) {
    result.push(Array(N))
    for (let j = 0; j < N; j++) {
      result[i][j] = matrix[j][i]
    }
  }
  return result
}

function test() {
  console.log(_.isEqual(squashRow([2, 2, 2, 2, 2]).row, [4, 4, 2, 0, 0]));
  console.log(_.isEqual(squashRow([1, 2, 3, 4]).row, [1, 2, 3, 4]));
  console.log(_.isEqual(squashRow([0, 0, 0, 0]).row, [0, 0, 0, 0]));
  console.log(_.isEqual(squashRow([0, 0, 0, 1]).row, [1, 0, 0, 0]));
  console.log(_.isEqual(squashRow([4, 4, 2, 2]).row, [8, 4, 0, 0]));
  console.log(_.isEqual(squashRow([4, 2, 2, 2]).row, [4, 4, 2, 0]));
  console.log(_.isEqual(squashRow([8, 8, 4, 4, 4, 2, 2]).row, [16, 8, 4, 4, 0, 0, 0]));
  console.log(_.isEqual(squashRow([2, 2, 4]).row, [4, 4, 0]));
}

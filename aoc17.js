let input = require('fs').readFileSync('input/aoc17.txt', 'utf8').split`\r\n`

let H = input.length - 1
let W = input[0].length - 1
let B = input.map(e => [...e].map(e => +e))

let p = (min, max) => {
  let Q = [[0, 0, 0, 0], [0, 0, 0, 1]]
  let M = B.map(e => e.map(_ => [1 / 0, 1 / 0]))
  for (let [i, j, c, d] of Q) {
    for (let s = c, t = 0; d > 0 && t++ < max && i + t <= H;) s += B[i + t][j], t >= min && s < M[i + t][j][0] && (M[i + t][j][0] = s, Q.push([i + t, j, s, 0]))
    for (let s = c, t = 0; d > 0 && t++ < max && i - t >= 0;) s += B[i - t][j], t >= min && s < M[i - t][j][0] && (M[i - t][j][0] = s, Q.push([i - t, j, s, 0]))
    for (let s = c, t = 0; d < 1 && t++ < max && j + t <= W;) s += B[i][j + t], t >= min && s < M[i][j + t][1] && (M[i][j + t][1] = s, Q.push([i, j + t, s, 1]))
    for (let s = c, t = 0; d < 1 && t++ < max && j - t >= 0;) s += B[i][j - t], t >= min && s < M[i][j - t][1] && (M[i][j - t][1] = s, Q.push([i, j - t, s, 1]))
  }
  return Math.min(...M[H][W])
}

console.log({ p1: p(1, 3) })
console.log({ p2: p(4, 10) })
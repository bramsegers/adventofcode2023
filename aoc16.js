let input = require('fs').readFileSync('input/aoc16.txt', 'utf8').split`\r\n`

let C = input
let H = C.length - 1
let W = C[0].length - 1

let Y = [-1, 0, 1, 0]
let X = [0, 1, 0, -1]

let M = {
  '/' : [[1], [0], [3], [2]],
  '\\': [[3], [2], [1], [0]],
  '|' : [[0], [0, 2], [2], [0, 2]],
  '-' : [[1, 3], [1], [1, 3], [3]],
}

let bfs = (i, j, k) => {
  let c, u = new Set
  let n, v = new Set
  let q = [[i, j, k]]
  for ([i, j, k] of q)
    (c = C[i] && C[i][j]) && (n = (i << 16) + (j << 8), !v
    .has(n + k)) && (v.add(n + k), u.add(n), (M[c] ? M[c][k] : [k])
    .map(d => q.push([i + Y[d], j + X[d], d])))
  return u.size
}

let p1 = bfs(0, 0, 1)

let p2 = 0
for (let i = 0; i <= H; i++) p2 = Math.max(p2, bfs(i, 0, 1), bfs(i, W, 3))
for (let j = 0; j <= W; j++) p2 = Math.max(p2, bfs(0, j, 2), bfs(H, j, 0))


console.log({ p1 })
console.log({ p2 })
let input = require('fs').readFileSync('input/aoc11.txt', 'utf8').split`\r\n`

let G = input.map(e=>[...e])
let M = e => !/#/.test(e[0])
let R = G.map((e, i) => [e, i]).filter(M)
let C = G[0].map((_, j) => [G.map(e => e[j]), j]).filter(M)

let p = m => {
  let f = (a, i) => a.reduce((a, b) => a + (m - 1) * (b[1] <= i), 0)
  let t = G.reduce((r, e, i) => (i += f(R, i), [...e].map((c, j) => c != '#' || r.push([i, j + f(C, j)])), r), [])
  return t.reduce((r, e, i) => (t.slice(i + 1).map(f => r += Math.abs(e[0] - f[0]) + Math.abs(e[1] - f[1])), r), 0)
}

console.log({ p1: p(2) })
console.log({ p2: p(1e6) })
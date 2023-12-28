let input = require('fs').readFileSync('input/aoc21.txt', 'utf8').split`\r\n`

let G = input
let S = G.length
let M = S >> 1

let ps = []
let s1 = 64
let s2 = 26501365

let mod = (n) => (n %= S) < 0 ? n + S : n
let occ = (y, x) => G[mod(y)][mod(x)] == '#'
let nbs = (y, x) => [[y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]]

let sft = 16
let off = 0x1fff
let msk = 0xffff
let key = (y, x) => ((y + off) << sft) + x + off
let val = (s) => [(s >> sft) - off, (s & msk) - off]


let P = [key(M, M)]
let Q = new Set(P)
let V = new Set(P)
let C = [1, 0]

for (let s = 0; s < 3 * S;) {
  for (let p of (P = new Set, Q))
    for (let [y, x] of nbs(...val(p)))
      occ(y, x) || V.has(p = key(y, x)) || P.add(p) && V.add(p)
  P = C[++s & 1] += (Q = P).size
  s != s1 && s % S != M || ps.push(P)
}


let [p1, pa, pb, pc] = ps
let a = pc / 2 - pa / 2 - pb + pa
let b = pb - pa - a
let c = pa
let x = (s2 - M) / S
let p2 = a * x * x + b * x + c


console.log({ p1 })
console.log({ p2 })
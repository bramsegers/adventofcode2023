let input = require('fs').readFileSync('input/aoc12.txt', 'utf8').split`\r\n`

let arrm1 = input.map(e => ([a, b] = e.split` `, [a, b.split`,`.map(e => +e)]))
let arrm5 = arrm1.map(([a, b]) => [Array(5).fill(a).join`?`, Array(5).fill(b).flat()])


let f = (i, j, a, b, m) => {
  let c = a[i], k = (i << 8) + j, u, v
  if (!c) return !b[j]; if (k in m) return m[k]
  v = c != '.' && a[u = i + b[j]] && /^[^.]+[^#]$/.test(a.slice(i, u + 1))
  return m[k] = (c != '#' ? f(i + 1, j, a, b, m) : 0) + (v ? f(u + 1, j + 1, a, b, m) : 0)
}

let p = a => a.reduce((r, [a, b]) => r + f(0, 0, a + '.', b, {}), 0)


console.log({ p1: p(arrm1) })
console.log({ p2: p(arrm5) })
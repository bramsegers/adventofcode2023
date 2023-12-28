let input = require('fs').readFileSync('input/aoc18.txt', 'utf8').split`\r\n`

let p1 = input.map(e => e.split` `)
let p2 = p1.map(e => ['RDLU'[e[2][7]], '0x' + e[2].slice(2, 7)])

let area = a => {
  let x = 0, y = 0
  let e = a.map(([d, n]) => [x += n * ((d == 'R') - (d == 'L')), y += n * ((d == 'D') - (d == 'U'))])
  let r = e.reduce((r, [p, q], i) => ([x, y] = e[i + 1] || e[0], r + p * y - q * x + a[i][1] * 1), 0)
  return r / 2 + 1
}

console.log({ p1: area(p1) })
console.log({ p2: area(p2) })
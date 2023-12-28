let input = require('fs').readFileSync('input/aoc09.txt', 'utf8').split`\r\n`

let seq = input.map(e => e.match(/-?\d+/g).map(e => +e))

let p1 = 0
let p2 = 0

seq.map((a, c, t) => {
  for (c = [a]; a.some(e => e);) c.push(a =
  a.reduce((b, e, i) => (i && b.push(e - a[i - 1]), b), []))
  for (t = 0; a = c.pop(); t = a[0] - t) p1 += a.pop(); p2 += t
})

console.log({ p1 })
console.log({ p2 })
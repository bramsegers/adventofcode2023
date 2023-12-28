let input = require('fs').readFileSync('input/aoc15.txt', 'utf8').split`,`

String.prototype.hash = function (p, q) { return [...this].reduce((h, c) => p * (h + c.charCodeAt()) % q, 0) }

let p1 = input
. reduce((a, b) => a + b
. hash(17, 256), 0)

let p2 = input
. reduce((b, e) => ([s, n] = e
. match(/[a-z\d]+/g), b[h = s
. hash(17, 256)] ||= [], n ? (f = b[h]
. find(e => e[0] == s)) ? f[1] = n : b[h]
. push([s, n]) : b[h] = b[h]
. filter(e => e[0] != s), b), [])
. reduce((a, b, i) => ++i && a + b
. reduce((a, e, j) => a + i * ++j * e[1], 0), 0)

console.log({ p1 })
console.log({ p2 })
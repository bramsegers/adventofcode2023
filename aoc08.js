let input = require('fs').readFileSync('input/aoc08.txt', 'utf8').split`\r\n`

let ins = (input.shift() + input.shift()).split``.map(e => +(e == 'R'))
let map = (input).reduce((m, b) => ([a, b, c] = b.match(/[\dA-Z]+/g), m[a] = [b, c], m), {})
let loc = (s, m) => { for (i = 0; ;) if (m.test(s = map[s][ins[i++ % ins.length]])) return i }

let p1 = loc('AAA', /ZZZ/)

let lcm = (a, b) => a / gcd(a, b) * b
let gcd = (a, b) => b ? gcd(b, a % b) : a

let p2 = Object.keys(map).filter(e => /..A/.test(e)).reduce((a, b) => lcm(a, loc(b, /..Z/)), 1)

console.log({ p1 })
console.log({ p2 })
let input = require('fs').readFileSync('input/aoc07.txt', 'utf8').split`\r\n`
let hands = input.map(e => [(e = e.split` `)[0], +e[1]])

let rank1 = [...'23456789TJQKA']
let rank2 = [...'J23456789TQKA']

let val = [rank1, rank2].map(t => h => [...h].reduce((r, e) => 13 * r + t.indexOf(e), 0))
let typ = (a, b) => ([a, b] = Object.values([...a].reduce((f, c) => (f[c] = -~f[c], f), { 0: 0 })).sort((a, b) => b - a), 2 * a + b)
let max = (a, r) => (r = 0, f = h => /J/.test(h) ? rank2.map(c => c == 'J' || f(h.replace('J', c))) : (h = typ(h), r = r > h ? r : h), f(a), r)
let sum = (f, i) => hands.map(([a, b]) => [a, b, f(a), val[i](a)]).sort((a, b) => a[2] - b[2] || a[3] - b[3]).reduce((a, b, i) => a + b[1] * ++i, 0)

console.log({ p1: sum(typ, 0) })
console.log({ p2: sum(max, 1) })
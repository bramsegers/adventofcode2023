let input = require('fs').readFileSync('input/aoc02.txt', 'utf8').split`\r\n`

let games = input.map(e => e.split`: `[1].split`; `.map(e => e.split`, `.reduce((c, e) => (e = e.split` `, c[e[1]] = +e[0], c), { red: 0, green: 0, blue: 0 })))

let p1 = games.reduce((a, g, i) => a + (i + 1) * g.every(s => s.red <= 12 && s.green <= 13 && s.blue <= 14), 0)
let p2 = games.reduce((a, g) => a + ([r, g, b] = g.reduce(([r, g, b], s) => [(m = Math.max)(r, s.red), m(g, s.green), m(b, s.blue)], [0, 0, 0]), r * g * b), 0)

console.log({ p1 })
console.log({ p2 })
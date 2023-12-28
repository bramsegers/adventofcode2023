let input = require('fs').readFileSync('input/aoc13.txt', 'utf8').split`\r\n\r\n`
let grids = input.map(e => e.split`\r\n`)

let diff = (a, b) => a && b ? (a[0] != b[0]) + diff(a.slice(1), b.slice(1)) : 0
let rotr = (a, b) => (b = Array(a[0]).fill``, a.map(e => [...e].map((c, j) => b[j] = c + b[j])), b)
let mirr = (a, b) => a.findIndex((_, i) => a[++i] && diff(a.slice(0, i).reverse().join``, a.slice(i).join``) == b) + 1
let summ = p => grids.reduce((a, e) => a + (100 * mirr(e, p) || mirr(rotr(e), p)), 0)

console.log({ p1: summ(0) })
console.log({ p2: summ(1) })
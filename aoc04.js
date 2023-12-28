let input
= require('fs')
. readFileSync('input/aoc04.txt','utf8')
. split`\r\n`

let wins = input
. map(c => (c = c
. split`:`[1]
. split`|`
. map(e => e
. match(/\d+/g)
. map(e => +e)), [c[0]
. reduce((r,e) => r + c[1]
. includes(e), 0), 1]))

let p1 = wins.reduce((a,[p]) => p-- ? a + 2 ** p : a, 0)
let p2 = wins.reduce((a,[p,q],i) => {while (p-- && (r = wins[++i])) r[1] += q; return a + q}, 0)

console.log({p1})
console.log({p2})
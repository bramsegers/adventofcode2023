let input = require('fs').readFileSync('input/aoc01.txt','utf8').split`\r\n`

let num = 'one two three four five six seven eight nine'.split` `
let sum = s => s.reduce((t,s) => t + 10 * (s = s.replace(/\D/g,''))[0] + s % 10, 0)
let rpl = s => num.reduce((s,n,i) => s.replace(RegExp(n, 'g'), _ => n[0] + (i + 1) + n.slice(-1)), s)


console.log({p1: sum(input)})
console.log({p2: sum(input.map(rpl))})
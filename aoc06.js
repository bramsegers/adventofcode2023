let input = require('fs').readFileSync('input/aoc06.txt','utf8').split`\r\n`

let [time, dist] = input.map(e => e.match(/\d+/g).map(e => +e))

let ways = (t,d) => {
  let s = (t * t - 4 * d) ** 0.5
  let a = Math.floor((t - s) / 2)
  let b = Math.ceil((t + s) / 2)
  return b - a - 1
}

let p1 = time.reduce((p, t, i) => p * ways(t, dist[i]), 1)
let p2 = ways(...[time, dist].map(e => +e.join``))

console.log({p1})
console.log({p2})
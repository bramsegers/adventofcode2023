let input = require('fs').readFileSync('input/aoc22.txt', 'utf8').split`\r\n`

let A = input.map(e => e.match(/\d+/g).map(e => +e))
let B = Array(10 * 10).fill(1)

let p1 = 0
let p2 = 0


let set = ([x, y, z, a, b, c], v) => {
  for (let i = x; i <= a; i++)
    for (let j = y; j <= b; j++)
      B[100 * z + 10 * i + j] = v,
      B[100 * c + 10 * i + j] = v
}


let drop = ([x, y, z, a, b, c]) => {
  for (let n = 1; ; n++)
    for (let i = x; i <= a; i++)
      for (let j = y; j <= b; j++)
        if (B[100 * (z - n) + 10 * i + j])
          return n - 1
}


A.sort((a, b) => a[2] - b[2])
  .map(e => {
    d = drop(e)
    e[2] -= d
    e[5] -= d
    set(e, 1)
  })


A.map(e => {
  set(e, p = 0)
  A.map(e => ((
    d = drop(e = [...e])) && (
      set(e, 0),
      e[2] -= d,
      e[5] -= d,
      set(e, 1),
      p++), e)
  ).map(e => set(e, 0))
  A.map(e => set(e, 1))
  p1 += !p
  p2 += p
})


console.log({ p1 })
console.log({ p2 })
let input = require('fs').readFileSync('input/aoc19.txt', 'utf8').split`\r\n\r\n`.map(e => e.split`\r\n`)

let parts = input[1].map(e => e.match(/\d+/g).map(e => +e))
let flows = input[0].reduce((f, e) => (e = e.split(/{|}/), f[e[0]] = e[1].split`,`.map(e => ('1:' + e).split`:`.slice(-2)), f), {})

let I = (a, b, p, q) => (a = a > p ? a : p, b = b < q ? b : q, a <= b && [a, b])
let A = (n, x, m, a, s) => n == 'A' || (n != 'R' && A(flows[n].find(e => eval(e[0]))[1], x, m, a, s))

let p1 = parts.reduce((r, [x, m, a, s]) => r + A('in', x, m, a, s) * (x + m + a + s), r = 0)

let p2 = ((min = 1, max = 4000) => {
  let Q = [['in', min, max, min, max, min, max, min, max]]
  for (let [n, x1, x2, m1, m2, a1, a2, s1, s2] of Q)
    n == 'A' ? r += (x2 - x1 + 1) * (m2 - m1 + 1) * (a2 - a1 + 1) * (s2 - s1 + 1) :
    n != 'R' && flows[n].map(([p, q]) => {
      if (p == '1') { Q.push([q, x1, x2, m1, m2, a1, a2, s1, s2]); return; }
      let [t, c, n] = p.match(/\D|\d+/g)
      let [u, v, y, z] = c == '<' ? [min, n - 1, +n, max] : [+n + 1, max, min, +n]
      let [x, m, a, s] = [[x1, x2], [m1, m2], [a1, a2], [s1, s2]]
      if (t == 'x') x = I(x1, x2, u, v), [x1, x2] = I(x1, x2, y, z)
      if (t == 'm') m = I(m1, m2, u, v), [m1, m2] = I(m1, m2, y, z)
      if (t == 'a') a = I(a1, a2, u, v), [a1, a2] = I(a1, a2, y, z)
      if (t == 's') s = I(s1, s2, u, v), [s1, s2] = I(s1, s2, y, z)
      if (t && x && m && a && s) Q.push([q, ...x, ...m, ...a, ...s])
    })
  return r
})()

console.log({ p1 })
console.log({ p2 })
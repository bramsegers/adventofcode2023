let input = require('fs').readFileSync('input/aoc23.txt', 'utf8').split`\r\n`

let M = input.map(e => [...e])
let H = M.length
let W = M[0].length


let dfs1 = (a, b) => {
  if (a < 0 || a == b) return 0
  let [i, j] = c(a), t = M[i][j], r = M[i][j] = 0
  if (t == '^' || t == '.') r = Math.max(r, 1 + dfs1(p(i - 1, j), b))
  if (t == 'v' || t == '.') r = Math.max(r, 1 + dfs1(p(i + 1, j), b))
  if (t == '<' || t == '.') r = Math.max(r, 1 + dfs1(p(i, j - 1), b))
  if (t == '>' || t == '.') r = Math.max(r, 1 + dfs1(p(i, j + 1), b))
  M[i][j] = t
  return r
}


let dfs2 = (a, b, s, k) => {
  let [i, j, t] = c(b)
  if (!M[i] || (t = M[i][j]) == '#') return
  if ((a != b && C.includes(b))) return s[b] = k
  M[i][j] = '#'
  dfs2(a, p(i - 1, j), s, k + 1)
  dfs2(a, p(i + 1, j), s, k + 1)
  dfs2(a, p(i, j - 1), s, k + 1)
  dfs2(a, p(i, j + 1), s, k + 1)
  M[i][j] = t
}


let dfs3 = (a, b, s = new Set([a])) => {
  if (a == b) return 0
  let r = -1 / 0
  for (let k in S[a]) s.has(k) || (s.add(k),
    r = Math.max(r, S[a][k] + dfs3(k, b, s)),
    s.delete(k))
  return r
}


let p = (i, j) => i * W + j
let c = (i) => [i / W | 0, i % W]
let q = (i) => p(i, M[i].indexOf('.'))
let v = (i, j) => M[i] ? M[i][j] != '#' : 2
let x = (i, j) => v(i, j) && v(i - 1, j) + v(i + 1, j) + v(i, j - 1) + v(i, j + 1) > 2
let C = M.reduce((c, e, i) => (e.map((_, j) => x(i, j) && c.push(p(i, j))), c), [])
let S = C.reduce((s, i) => (dfs2(i, i, s[i] = {}, 0), s), {})


console.log({ p1: dfs1(q(0), q(H - 1)) })
console.log({ p2: dfs3(q(0), q(H - 1)) })